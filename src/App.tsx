import { useEffect, useMemo, useRef, useState, type FormEvent, type JSX } from 'react'
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom'
import ExtendedHumansLibrary from './ExtendedHumansLibrary'
import ConsciousnessArticle from './articles/ConsciousnessArticle'
import DataMachineArticle from './articles/DataMachineArticle'
import LearningArticle from './articles/LearningArticle'
import CageOfProofArticle from './articles/CageOfProofArticle'
import LanguageTrapArticle from './articles/LanguageTrapArticle'
import EmotionsArticle from './articles/EmotionsArticle'

type RowTarget = {
  slug: string
}

const rowTargets: RowTarget[] = [
  { slug: '/ai-consciousness' },
  { slug: '/data-machine' },
  { slug: '/the-more-you-learn' },
  { slug: '/cage-of-proof' },
  { slug: '/language-trap' },
  { slug: '/emotions-installed' },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function ClickableLibrary(): JSX.Element {
  const navigate = useNavigate()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const rows = Array.from(wrapper.querySelectorAll<HTMLDivElement>('#stacks > div[style*="cursor: pointer"]'))

    const cleanups = rows.slice(0, rowTargets.length).map((row, index) => {
      row.setAttribute('role', 'button')
      row.setAttribute('tabindex', '0')
      row.setAttribute('aria-label', `Open article ${index + 1}`)

      const handleClick = () => navigate(rowTargets[index]!.slug)
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          navigate(rowTargets[index]!.slug)
        }
      }

      row.addEventListener('click', handleClick)
      row.addEventListener('keydown', handleKeyDown)

      return () => {
        row.removeEventListener('click', handleClick)
        row.removeEventListener('keydown', handleKeyDown)
      }
    })

    return () => {
      cleanups.forEach(cleanup => cleanup())
    }
  }, [navigate])

  return (
    <div ref={wrapperRef}>
      <ExtendedHumansLibrary />
    </div>
  )
}

function ArticleShell({ children }: { children: JSX.Element }): JSX.Element {
  const { pathname } = useLocation()

  useEffect(() => {
    const cardSelectors = [
      'article div[style*="linear-gradient(135deg"]',
      'article div[style*="border-left"]',
      'article div[style*="border: 1px solid rgba"]',
    ]

    const cards = Array.from(document.querySelectorAll<HTMLElement>(cardSelectors.join(',')))
    cards.forEach((card) => card.classList.add('eh-glow-card'))

    const quoteCandidates = cards.filter((card) => {
      const text = card.innerText?.trim() ?? ''
      return text.length > 80 && text.length < 800
    })

    quoteCandidates.forEach((card) => {
      if (card.dataset.quoteEnhanced === 'true') return
      card.dataset.quoteEnhanced = 'true'
      if (getComputedStyle(card).position === 'static') card.style.position = 'relative'

      const actions = document.createElement('div')
      actions.className = 'eh-quote-actions'

      const copyButton = document.createElement('button')
      copyButton.className = 'eh-quote-btn'
      copyButton.textContent = 'Copy'
      copyButton.onclick = async () => {
        const text = (card.innerText || '').trim()
        if (!text) return
        await navigator.clipboard.writeText(text)
        copyButton.textContent = 'Copied'
        window.setTimeout(() => { copyButton.textContent = 'Copy' }, 1300)
      }

      const downloadButton = document.createElement('button')
      downloadButton.className = 'eh-quote-btn'
      downloadButton.textContent = 'Download'
      downloadButton.onclick = () => {
        const text = (card.innerText || '').trim()
        if (!text) return
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'extended-humans-quote.txt'
        a.click()
        URL.revokeObjectURL(url)
      }

      actions.appendChild(copyButton)
      actions.appendChild(downloadButton)
      card.appendChild(actions)
    })

    return () => {
      cards.forEach((card) => {
        card.classList.remove('eh-glow-card')
      })
      document.querySelectorAll('.eh-quote-actions').forEach((node) => node.remove())
      quoteCandidates.forEach((card) => {
        card.dataset.quoteEnhanced = 'false'
      })
    }
  }, [])

  return (
    <div className="route-page">
      <Link to="/" className="back-link">Back to Library</Link>
      {children}
      <ArticleEngagement articleKey={pathname} />
    </div>
  )
}

type EngagementComment = {
  id: string
  name: string
  text: string
  createdAt: string
  likes: number
  rating: number
  replies: EngagementReply[]
}

type EngagementReply = {
  id: string
  name: string
  text: string
  createdAt: string
  likes: number
}

type EngagementState = {
  userRating: number
  comments: EngagementComment[]
  likedCommentIds: string[]
  likedReplyIds: string[]
}

function ArticleEngagement({ articleKey }: { articleKey: string }): JSX.Element {
  const storageKey = `eh:engagement:${articleKey}`
  const [ready, setReady] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [comments, setComments] = useState<EngagementComment[]>([])
  const [likedCommentIds, setLikedCommentIds] = useState<string[]>([])
  const [likedReplyIds, setLikedReplyIds] = useState<string[]>([])
  const [filter, setFilter] = useState<'newest' | 'top' | 'discussed'>('newest')
  const [visibleCount, setVisibleCount] = useState(4)
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({})
  const [replyDrafts, setReplyDrafts] = useState<Record<string, { name: string; text: string; open: boolean }>>({})
  const [name, setName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [uiLang, setUiLang] = useState<'en' | 'de' | 'es'>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('eh:lang') : null
    if (saved === 'de' || saved === 'es' || saved === 'en') return saved
    const browser = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en'
    if (browser.startsWith('de')) return 'de'
    if (browser.startsWith('es')) return 'es'
    return 'en'
  })

  const t = (copy: Record<'en' | 'de' | 'es', string>) => copy[uiLang]

  useEffect(() => {
    const syncLang = () => {
      const saved = window.localStorage.getItem('eh:lang')
      if (saved === 'de' || saved === 'es' || saved === 'en') setUiLang(saved)
    }
    syncLang()
    window.addEventListener('storage', syncLang)
    window.addEventListener('eh:lang-change', syncLang as EventListener)
    return () => {
      window.removeEventListener('storage', syncLang)
      window.removeEventListener('eh:lang-change', syncLang as EventListener)
    }
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) {
        setUserRating(0)
        setComments([])
        setLikedCommentIds([])
        setLikedReplyIds([])
        setReady(true)
        return
      }
      const parsed = JSON.parse(raw) as Partial<EngagementState>
      setUserRating(parsed.userRating ?? 0)
      setComments(
        Array.isArray(parsed.comments)
          ? parsed.comments.map((comment) => ({
            ...comment,
            rating: typeof comment.rating === 'number' ? comment.rating : 0,
            replies: Array.isArray(comment.replies) ? comment.replies : [],
          }))
          : [],
      )
      setLikedCommentIds(Array.isArray(parsed.likedCommentIds) ? parsed.likedCommentIds : [])
      setLikedReplyIds(Array.isArray(parsed.likedReplyIds) ? parsed.likedReplyIds : [])
    } catch {
      setUserRating(0)
      setComments([])
      setLikedCommentIds([])
      setLikedReplyIds([])
    } finally {
      setReady(true)
    }
  }, [storageKey])

  useEffect(() => {
    if (!ready) return
    const payload: EngagementState = {
      userRating,
      comments,
      likedCommentIds,
      likedReplyIds,
    }
    localStorage.setItem(storageKey, JSON.stringify(payload))
  }, [ready, storageKey, userRating, comments, likedCommentIds, likedReplyIds])

  const sortedComments = useMemo(
    () => {
      const score = (comment: EngagementComment) => comment.likes * 2 + comment.replies.length
      const byNewest = (a: EngagementComment, b: EngagementComment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      const byTop = (a: EngagementComment, b: EngagementComment) => b.likes - a.likes || byNewest(a, b)
      const byDiscussed = (a: EngagementComment, b: EngagementComment) => score(b) - score(a) || byNewest(a, b)

      if (filter === 'top') return [...comments].sort(byTop)
      if (filter === 'discussed') return [...comments].sort(byDiscussed)
      return [...comments].sort(byNewest)
    },
    [comments, filter],
  )

  const averageRating = useMemo(() => {
    const rated = comments.filter((c) => c.rating > 0)
    if (!rated.length) return 0
    const total = rated.reduce((sum, c) => sum + c.rating, 0)
    return total / rated.length
  }, [comments])

  const toggleCommentLike = (id: string) => {
    const alreadyLiked = likedCommentIds.includes(id)
    setComments((prev) => prev.map((comment) => {
      if (comment.id !== id) return comment
      return { ...comment, likes: Math.max(0, comment.likes + (alreadyLiked ? -1 : 1)) }
    }))
    setLikedCommentIds((prev) => {
      if (alreadyLiked) return prev.filter((value) => value !== id)
      return [...prev, id]
    })
  }

  const toggleReplyLike = (commentId: string, replyId: string) => {
    const key = `${commentId}:${replyId}`
    const alreadyLiked = likedReplyIds.includes(key)
    setComments((prev) => prev.map((comment) => {
      if (comment.id !== commentId) return comment
      return {
        ...comment,
        replies: comment.replies.map((reply) => {
          if (reply.id !== replyId) return reply
          return { ...reply, likes: Math.max(0, reply.likes + (alreadyLiked ? -1 : 1)) }
        }),
      }
    }))
    setLikedReplyIds((prev) => {
      if (alreadyLiked) return prev.filter((value) => value !== key)
      return [...prev, key]
    })
  }

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }))
  }

  const toggleReplyForm = (commentId: string) => {
    setReplyDrafts((prev) => ({
      ...prev,
      [commentId]: {
        name: prev[commentId]?.name ?? '',
        text: prev[commentId]?.text ?? '',
        open: !prev[commentId]?.open,
      },
    }))
  }

  const submitReply = (event: FormEvent<HTMLFormElement>, commentId: string) => {
    event.preventDefault()
    const draft = replyDrafts[commentId]
    if (!draft || draft.text.trim().length < 2) return

    const newReply: EngagementReply = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: draft.name.trim() || 'Anonymous',
      text: draft.text.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    setComments((prev) => prev.map((comment) => (
      comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
    )))
    setReplyDrafts((prev) => ({
      ...prev,
      [commentId]: { name: '', text: '', open: false },
    }))
    setExpandedReplies((prev) => ({ ...prev, [commentId]: true }))
  }

  const handleSubmitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedText = commentText.trim()
    if (trimmedText.length < 2) return

    const trimmedName = name.trim() || 'Anonymous'
    const newComment: EngagementComment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: trimmedName,
      text: trimmedText,
      createdAt: new Date().toISOString(),
      likes: 0,
      rating: userRating,
      replies: [],
    }
    setComments((prev) => [newComment, ...prev])
    setCommentText('')
    setVisibleCount(4)
  }

  return (
    <section className="article-engagement">
      <div className="article-engagement-card">
        <p className="article-engagement-eyebrow">{t({ en: 'Reader Feedback', de: 'Lese-Feedback', es: 'Feedback de lectura' })}</p>
        <h3>{t({
          en: 'Rate this article and join the discussion',
          de: 'Bewerte diesen Artikel und diskutiere mit',
          es: 'Califica este artículo y únete a la conversación',
        })}</h3>

        <div className="article-engagement-actions">
          <div className="article-rating-summary">
            {averageRating > 0 ? `${averageRating.toFixed(1)}/5` : '0.0/5'} · {comments.filter((c) => c.rating > 0).length}{' '}
            {t({ en: 'ratings', de: 'Bewertungen', es: 'valoraciones' })}
          </div>
          <div className="article-stars" role="radiogroup" aria-label="Rate article">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={star <= userRating ? 'is-active' : ''}
                onClick={() => setUserRating(star)}
                aria-label={`${star} star${star === 1 ? '' : 's'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <form className="article-comment-form" onSubmit={handleSubmitComment}>
          <input
            type="text"
            maxLength={50}
            placeholder={t({ en: 'Your name (optional)', de: 'Dein Name (optional)', es: 'Tu nombre (opcional)' })}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <textarea
            placeholder={t({ en: 'Share your perspective...', de: 'Teile deine Perspektive...', es: 'Comparte tu perspectiva...' })}
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            rows={4}
            required
          />
          <button type="submit">{t({ en: 'Post Comment', de: 'Kommentar posten', es: 'Publicar comentario' })}</button>
        </form>

        <div className="article-comment-controls">
          <label htmlFor={`comment-filter-${articleKey}`}>{t({ en: 'Filter', de: 'Filter', es: 'Filtro' })}</label>
          <select
            id={`comment-filter-${articleKey}`}
            value={filter}
            onChange={(event) => setFilter(event.target.value as 'newest' | 'top' | 'discussed')}
          >
            <option value="newest">{t({ en: 'Newest', de: 'Neueste', es: 'Más recientes' })}</option>
            <option value="top">{t({ en: 'Top liked', de: 'Beliebteste', es: 'Más gustados' })}</option>
            <option value="discussed">{t({ en: 'Most discussed', de: 'Meist diskutiert', es: 'Más discutidos' })}</option>
          </select>
        </div>

        <div className="article-comments-feed">
          {sortedComments.length === 0 && <p className="article-comments-empty">{t({
            en: 'No comments yet. Start the conversation.',
            de: 'Noch keine Kommentare. Starte die Diskussion.',
            es: 'Aún no hay comentarios. Inicia la conversación.',
          })}</p>}
          {sortedComments.slice(0, visibleCount).map((comment) => {
            const liked = likedCommentIds.includes(comment.id)
            const repliesOpen = !!expandedReplies[comment.id]
            const draft = replyDrafts[comment.id] ?? { name: '', text: '', open: false }
            return (
              <article key={comment.id} className="article-comment-item">
                <div className="article-comment-head">
                  <strong>
                    {comment.name}
                    <span className="comment-rating">{' · '}{comment.rating > 0 ? '★'.repeat(comment.rating) : t({ en: 'no rating', de: 'keine Bewertung', es: 'sin valoración' })}</span>
                  </strong>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                <p>{comment.text}</p>
                <div className="article-comment-actions">
                  <button type="button" onClick={() => toggleCommentLike(comment.id)} className={`article-comment-like ${liked ? 'is-active' : ''}`}>
                    {liked
                      ? t({ en: 'Liked', de: 'Gefällt mir', es: 'Me gusta' })
                      : t({ en: 'Like', de: 'Gefällt mir', es: 'Me gusta' })} · {comment.likes}
                  </button>
                  <button type="button" onClick={() => toggleReplyForm(comment.id)} className="article-comment-like">
                    {t({ en: 'Reply', de: 'Antworten', es: 'Responder' })}
                  </button>
                  <button type="button" onClick={() => toggleReplies(comment.id)} className="article-comment-like">
                    {repliesOpen
                      ? t({ en: 'Hide replies', de: 'Antworten ausblenden', es: 'Ocultar respuestas' })
                      : t({ en: 'Show replies', de: 'Antworten anzeigen', es: 'Ver respuestas' })} · {comment.replies.length}
                  </button>
                </div>

                {draft.open && (
                  <form className="article-reply-form" onSubmit={(event) => submitReply(event, comment.id)}>
                    <input
                      type="text"
                      maxLength={50}
                      value={draft.name}
                      onChange={(event) => setReplyDrafts((prev) => ({ ...prev, [comment.id]: { ...draft, name: event.target.value, open: true } }))}
                      placeholder={t({ en: 'Your name (optional)', de: 'Dein Name (optional)', es: 'Tu nombre (opcional)' })}
                    />
                    <textarea
                      value={draft.text}
                      onChange={(event) => setReplyDrafts((prev) => ({ ...prev, [comment.id]: { ...draft, text: event.target.value, open: true } }))}
                      placeholder={t({ en: 'Write a reply...', de: 'Schreibe eine Antwort...', es: 'Escribe una respuesta...' })}
                      rows={3}
                      required
                    />
                    <button type="submit">{t({ en: 'Post Reply', de: 'Antwort posten', es: 'Publicar respuesta' })}</button>
                  </form>
                )}

                {repliesOpen && comment.replies.length > 0 && (
                  <div className="article-replies-list">
                    {comment.replies.map((reply) => {
                      const replyKey = `${comment.id}:${reply.id}`
                      const replyLiked = likedReplyIds.includes(replyKey)
                      return (
                        <div key={reply.id} className="article-reply-item">
                          <div className="article-comment-head">
                            <strong>{reply.name}</strong>
                            <span>{new Date(reply.createdAt).toLocaleString()}</span>
                          </div>
                          <p>{reply.text}</p>
                          <button type="button" onClick={() => toggleReplyLike(comment.id, reply.id)} className={`article-comment-like ${replyLiked ? 'is-active' : ''}`}>
                            {replyLiked
                              ? t({ en: 'Liked', de: 'Gefällt mir', es: 'Me gusta' })
                              : t({ en: 'Like', de: 'Gefällt mir', es: 'Me gusta' })} · {reply.likes}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </article>
            )
          })}
          {sortedComments.length > visibleCount && (
            <button type="button" className="article-show-more" onClick={() => setVisibleCount((v) => v + 4)}>
              {t({ en: 'Show more comments', de: 'Mehr Kommentare anzeigen', es: 'Mostrar más comentarios' })}
            </button>
          )}
          {sortedComments.length > 4 && visibleCount > 4 && (
            <button type="button" className="article-show-more" onClick={() => setVisibleCount(4)}>
              {t({ en: 'Show fewer comments', de: 'Weniger Kommentare anzeigen', es: 'Mostrar menos comentarios' })}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default function App(): JSX.Element {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<div className="route-page"><ClickableLibrary /></div>} />
      <Route path="/ai-consciousness" element={<ArticleShell><ConsciousnessArticle /></ArticleShell>} />
      <Route path="/data-machine" element={<ArticleShell><DataMachineArticle /></ArticleShell>} />
      <Route path="/the-more-you-learn" element={<ArticleShell><LearningArticle /></ArticleShell>} />
      <Route path="/cage-of-proof" element={<ArticleShell><CageOfProofArticle /></ArticleShell>} />
      <Route path="/language-trap" element={<ArticleShell><LanguageTrapArticle /></ArticleShell>} />
      <Route path="/emotions-installed" element={<ArticleShell><EmotionsArticle /></ArticleShell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
