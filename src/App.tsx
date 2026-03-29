import { useEffect, useMemo, useRef, useState, type Dispatch, type FormEvent, type JSX, type SetStateAction } from 'react'
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom'
import { toPng } from 'html-to-image'
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
        const cardClone = card.cloneNode(true) as HTMLElement
        cardClone.querySelectorAll('.eh-quote-actions').forEach((node) => node.remove())
        const text = (cardClone.innerText || '').trim()
        if (!text) return
        await navigator.clipboard.writeText(text)
        copyButton.textContent = 'Copied'
        window.setTimeout(() => { copyButton.textContent = 'Copy' }, 1300)
      }

      const downloadButton = document.createElement('button')
      downloadButton.className = 'eh-quote-btn'
      downloadButton.textContent = 'Download'
      downloadButton.onclick = async () => {
        const clonedCard = card.cloneNode(true) as HTMLElement
        clonedCard.querySelectorAll('.eh-quote-actions').forEach((node) => node.remove())
        clonedCard.style.margin = '0'
        clonedCard.style.width = `${card.clientWidth}px`
        const wrapper = document.createElement('div')
        wrapper.style.position = 'fixed'
        wrapper.style.left = '-10000px'
        wrapper.style.top = '0'
        wrapper.style.padding = '0'
        wrapper.style.background = '#0B0A0F'
        wrapper.appendChild(clonedCard)
        document.body.appendChild(wrapper)

        try {
          const titleGuess = ((clonedCard.querySelector('h2,h3,strong,.card-label') as HTMLElement | null)?.innerText || '').trim()
          const slugPart = window.location.pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '-')
          const cardPart = titleGuess
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .slice(0, 48)
          const dataUrl = await toPng(clonedCard, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: '#0B0A0F',
          })
          const link = document.createElement('a')
          link.href = dataUrl
          const fileName = `extended-humans-${slugPart || 'article'}-${cardPart || 'quote'}.png`
          link.download = fileName
          link.click()
        } finally {
          document.body.removeChild(wrapper)
        }
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
      <ArticleShareBar />
      <ArticleEngagement articleKey={pathname} />
    </div>
  )
}

function ArticleShareBar(): JSX.Element {
  const [uiLang, setUiLang] = useState<'en' | 'de' | 'es'>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('eh:lang') : null
    if (saved === 'de' || saved === 'es' || saved === 'en') return saved
    return 'en'
  })
  const [toast, setToast] = useState('')
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

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Extended Humans',
          text: t({
            en: 'Read this Extended Humans article.',
            de: 'Lies diesen Extended Humans Artikel.',
            es: 'Lee este artículo de Extended Humans.',
          }),
          url,
        })
        return
      } catch {
        // fallback to copy
      }
    }
    await navigator.clipboard.writeText(url)
    setToast(t({ en: 'Link copied.', de: 'Link kopiert.', es: 'Enlace copiado.' }))
    window.setTimeout(() => setToast(''), 1400)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setToast(t({ en: 'Link copied.', de: 'Link kopiert.', es: 'Enlace copiado.' }))
    window.setTimeout(() => setToast(''), 1400)
  }

  return (
    <section className="article-share-block" aria-label="Share article">
      <div className="article-share-divider" />
      <div className="article-share-card">
        <p>
          <img src="/extended-humans-icon.png" alt="" aria-hidden="true" className="article-inline-icon" />
          {t({ en: 'Share this article', de: 'Diesen Artikel teilen', es: 'Compartir este artículo' })}
        </p>
        <div className="article-share-buttons">
          <button type="button" className="article-share-btn" onClick={handleShare}>
            <span aria-hidden="true">↗</span>
            {t({ en: 'Share', de: 'Teilen', es: 'Compartir' })}
          </button>
          <button type="button" className="article-share-btn" onClick={handleCopy}>
            <span aria-hidden="true">⧉</span>
            {t({ en: 'Copy link', de: 'Link kopieren', es: 'Copiar enlace' })}
          </button>
        </div>
        {toast && <small>{toast}</small>}
      </div>
    </section>
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
  replies: EngagementReply[]
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
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editText, setEditText] = useState('')
  const [editRating, setEditRating] = useState(4)
  const [uiLang, setUiLang] = useState<'en' | 'de' | 'es'>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('eh:lang') : null
    if (saved === 'de' || saved === 'es' || saved === 'en') return saved
    const browser = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en'
    if (browser.startsWith('de')) return 'de'
    if (browser.startsWith('es')) return 'es'
    return 'en'
  })

  const t = (copy: Record<'en' | 'de' | 'es', string>) => copy[uiLang]

  const normalizeReplies = (items: unknown): EngagementReply[] => {
    if (!Array.isArray(items)) return []
    return items.map((item) => {
      const reply = item as Partial<EngagementReply>
      return {
        id: typeof reply.id === 'string' ? reply.id : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: typeof reply.name === 'string' ? reply.name : t({ en: 'Anonymous', de: 'Anonym', es: 'Anónimo' }),
        text: typeof reply.text === 'string' ? reply.text : '',
        createdAt: typeof reply.createdAt === 'string' ? reply.createdAt : new Date().toISOString(),
        likes: typeof reply.likes === 'number' ? reply.likes : 0,
        replies: normalizeReplies((reply as { replies?: unknown }).replies),
      }
    })
  }

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
            rating: typeof comment.rating === 'number' && comment.rating > 0
              ? comment.rating
              : (typeof parsed.userRating === 'number' && parsed.userRating > 0 ? parsed.userRating : 4),
            replies: normalizeReplies((comment as { replies?: unknown }).replies),
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
    const key = replyId
    const alreadyLiked = likedReplyIds.includes(key)

    const updateLikes = (replies: EngagementReply[]): EngagementReply[] => replies.map((reply) => {
      if (reply.id === replyId) {
        return { ...reply, likes: Math.max(0, reply.likes + (alreadyLiked ? -1 : 1)) }
      }
      return { ...reply, replies: updateLikes(reply.replies) }
    })

    setComments((prev) => prev.map((comment) => {
      if (comment.id !== commentId) return comment
      return { ...comment, replies: updateLikes(comment.replies) }
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
    submitNestedReply(event, commentId, null)
  }

  const submitNestedReply = (event: FormEvent<HTMLFormElement>, commentId: string, targetReplyId: string | null) => {
    event.preventDefault()
    const draftKey = targetReplyId ? `${commentId}:${targetReplyId}` : commentId
    const draft = replyDrafts[draftKey]
    if (!draft || draft.text.trim().length < 2) return

    const newReply: EngagementReply = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: draft.name.trim() || 'Anonymous',
      text: draft.text.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    }

    const insertReply = (replies: EngagementReply[]): EngagementReply[] => replies.map((reply) => {
      if (reply.id === targetReplyId) {
        return { ...reply, replies: [...reply.replies, newReply] }
      }
      return { ...reply, replies: insertReply(reply.replies) }
    })

    setComments((prev) => prev.map((comment) => (
      comment.id === commentId
        ? {
          ...comment,
          replies: targetReplyId ? insertReply(comment.replies) : [...comment.replies, newReply],
        }
        : comment
    )))
    setReplyDrafts((prev) => ({
      ...prev,
      [draftKey]: { name: '', text: '', open: false },
    }))
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: true,
      ...(targetReplyId ? { [targetReplyId]: true } : {}),
    }))
  }

  const handleSubmitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedText = commentText.trim()
    if (trimmedText.length < 2) return

    const trimmedName = name.trim() || t({ en: 'Anonymous', de: 'Anonym', es: 'Anónimo' })
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

  const startEditing = (comment: EngagementComment) => {
    setEditingCommentId(comment.id)
    setEditName(comment.name)
    setEditText(comment.text)
    setEditRating(comment.rating > 0 ? comment.rating : 4)
  }

  const cancelEditing = () => {
    setEditingCommentId(null)
    setEditName('')
    setEditText('')
    setEditRating(4)
  }

  const saveEditing = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingCommentId) return
    const text = editText.trim()
    if (text.length < 2) return

    setComments((prev) => prev.map((comment) => (
      comment.id === editingCommentId
        ? {
          ...comment,
          name: editName.trim() || t({ en: 'Anonymous', de: 'Anonym', es: 'Anónimo' }),
          text,
          rating: editRating,
        }
        : comment
    )))
    cancelEditing()
  }

  const deleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId))
    setLikedCommentIds((prev) => prev.filter((id) => id !== commentId))
    setLikedReplyIds((prev) => prev.filter((id) => !id.startsWith(`${commentId}:`)))
    setExpandedReplies((prev) => {
      const clone = { ...prev }
      delete clone[commentId]
      return clone
    })
    setReplyDrafts((prev) => {
      const clone = { ...prev }
      delete clone[commentId]
      return clone
    })
    if (editingCommentId === commentId) cancelEditing()
  }


  return (
    <section className="article-engagement">
      <div className="article-engagement-card">
        <p className="article-engagement-eyebrow">
          <img src="/extended-humans-icon.png" alt="" aria-hidden="true" className="article-inline-icon" />
          {t({ en: 'Reader Feedback', de: 'Lese-Feedback', es: 'Feedback de lectura' })}
        </p>
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
          <span className="article-rating-question">{t({ en: 'How many stars?', de: 'Wie viele Sterne?', es: '¿Cuántas estrellas?' })}</span>
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
                    <span className="comment-rating">{' · '}{'★'.repeat(comment.rating > 0 ? comment.rating : 4)}</span>
                  </strong>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                {editingCommentId === comment.id ? (
                  <form className="article-reply-form" onSubmit={saveEditing}>
                    <input
                      type="text"
                      maxLength={50}
                      value={editName}
                      onChange={(event) => setEditName(event.target.value)}
                      placeholder={t({ en: 'Your name (optional)', de: 'Dein Name (optional)', es: 'Tu nombre (opcional)' })}
                    />
                    <textarea
                      value={editText}
                      onChange={(event) => setEditText(event.target.value)}
                      rows={4}
                      required
                    />
                    <div className="article-edit-stars">
                      <span>{t({ en: 'Rating', de: 'Bewertung', es: 'Valoración' })}</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" className={`article-comment-like ${star <= editRating ? 'is-active' : ''}`} onClick={() => setEditRating(star)}>
                          {'★'}
                        </button>
                      ))}
                    </div>
                    <div className="article-comment-actions">
                      <button type="submit" className="article-comment-like">{t({ en: 'Save', de: 'Speichern', es: 'Guardar' })}</button>
                      <button type="button" className="article-comment-like" onClick={cancelEditing}>{t({ en: 'Cancel', de: 'Abbrechen', es: 'Cancelar' })}</button>
                    </div>
                  </form>
                ) : (
                  <p>{comment.text}</p>
                )}
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
                  <button type="button" onClick={() => startEditing(comment)} className="article-comment-like">
                    {t({ en: 'Edit', de: 'Bearbeiten', es: 'Editar' })}
                  </button>
                  <button type="button" onClick={() => deleteComment(comment.id)} className="article-comment-like">
                    {t({ en: 'Delete', de: 'Löschen', es: 'Eliminar' })}
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
                  <ReplyThread
                    replies={comment.replies}
                    commentId={comment.id}
                    t={t}
                    likedReplyIds={likedReplyIds}
                    expandedReplies={expandedReplies}
                    replyDrafts={replyDrafts}
                    toggleReplyLike={toggleReplyLike}
                    toggleReplies={toggleReplies}
                    toggleReplyForm={toggleReplyForm}
                    setReplyDrafts={setReplyDrafts}
                    submitNestedReply={submitNestedReply}
                  />
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

type ReplyThreadProps = {
  replies: EngagementReply[]
  commentId: string
  t: (copy: Record<'en' | 'de' | 'es', string>) => string
  likedReplyIds: string[]
  expandedReplies: Record<string, boolean>
  replyDrafts: Record<string, { name: string; text: string; open: boolean }>
  toggleReplyLike: (commentId: string, replyId: string) => void
  toggleReplies: (commentId: string) => void
  toggleReplyForm: (commentId: string) => void
  setReplyDrafts: Dispatch<SetStateAction<Record<string, { name: string; text: string; open: boolean }>>>
  submitNestedReply: (event: FormEvent<HTMLFormElement>, commentId: string, targetReplyId: string | null) => void
}

function ReplyThread({
  replies,
  commentId,
  t,
  likedReplyIds,
  expandedReplies,
  replyDrafts,
  toggleReplyLike,
  toggleReplies,
  toggleReplyForm,
  setReplyDrafts,
  submitNestedReply,
}: ReplyThreadProps): JSX.Element {
  return (
    <div className="article-replies-list">
      {replies.map((reply) => {
        const replyLiked = likedReplyIds.includes(reply.id)
        const nestedOpen = !!expandedReplies[reply.id]
        const draftKey = `${commentId}:${reply.id}`
        const draft = replyDrafts[draftKey] ?? { name: '', text: '', open: false }

        return (
          <div key={reply.id} className="article-reply-item">
            <div className="article-comment-head">
              <strong>{reply.name}</strong>
              <span>{new Date(reply.createdAt).toLocaleString()}</span>
            </div>
            <p>{reply.text}</p>
            <div className="article-comment-actions">
              <button type="button" onClick={() => toggleReplyLike(commentId, reply.id)} className={`article-reply-action ${replyLiked ? 'is-active' : ''}`}>
                {replyLiked
                  ? t({ en: 'Liked', de: 'Gefällt mir', es: 'Me gusta' })
                  : t({ en: 'Like', de: 'Gefällt mir', es: 'Me gusta' })} · {reply.likes}
              </button>
              <button type="button" onClick={() => toggleReplyForm(draftKey)} className="article-reply-action">
                {t({ en: 'Reply', de: 'Antworten', es: 'Responder' })}
              </button>
              <button type="button" onClick={() => toggleReplies(reply.id)} className="article-reply-action">
                {nestedOpen
                  ? t({ en: 'Hide replies', de: 'Antworten ausblenden', es: 'Ocultar respuestas' })
                  : t({ en: 'Show replies', de: 'Antworten anzeigen', es: 'Ver respuestas' })} · {reply.replies.length}
              </button>
            </div>

            {draft.open && (
              <form className="article-reply-form" onSubmit={(event) => submitNestedReply(event, commentId, reply.id)}>
                <input
                  type="text"
                  maxLength={50}
                  value={draft.name}
                  onChange={(event) => setReplyDrafts((prev) => ({ ...prev, [draftKey]: { ...draft, name: event.target.value, open: true } }))}
                  placeholder={t({ en: 'Your name (optional)', de: 'Dein Name (optional)', es: 'Tu nombre (opcional)' })}
                />
                <textarea
                  value={draft.text}
                  onChange={(event) => setReplyDrafts((prev) => ({ ...prev, [draftKey]: { ...draft, text: event.target.value, open: true } }))}
                  placeholder={t({ en: 'Write a reply...', de: 'Schreibe eine Antwort...', es: 'Escribe una respuesta...' })}
                  rows={3}
                  required
                />
                <button type="submit">{t({ en: 'Post Reply', de: 'Antwort posten', es: 'Publicar respuesta' })}</button>
              </form>
            )}

            {nestedOpen && reply.replies.length > 0 && (
              <ReplyThread
                replies={reply.replies}
                commentId={commentId}
                t={t}
                likedReplyIds={likedReplyIds}
                expandedReplies={expandedReplies}
                replyDrafts={replyDrafts}
                toggleReplyLike={toggleReplyLike}
                toggleReplies={toggleReplies}
                toggleReplyForm={toggleReplyForm}
                setReplyDrafts={setReplyDrafts}
                submitNestedReply={submitNestedReply}
              />
            )}
          </div>
        )
      })}
    </div>
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
