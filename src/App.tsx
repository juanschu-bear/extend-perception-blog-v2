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
}

type EngagementState = {
  articleLikes: number
  userLikedArticle: boolean
  userRating: number
  comments: EngagementComment[]
  likedCommentIds: string[]
}

function ArticleEngagement({ articleKey }: { articleKey: string }): JSX.Element {
  const storageKey = `eh:engagement:${articleKey}`
  const [ready, setReady] = useState(false)
  const [articleLikes, setArticleLikes] = useState(0)
  const [userLikedArticle, setUserLikedArticle] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [comments, setComments] = useState<EngagementComment[]>([])
  const [likedCommentIds, setLikedCommentIds] = useState<string[]>([])
  const [name, setName] = useState('')
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) {
        setArticleLikes(0)
        setUserLikedArticle(false)
        setUserRating(0)
        setComments([])
        setLikedCommentIds([])
        setReady(true)
        return
      }
      const parsed = JSON.parse(raw) as Partial<EngagementState>
      setArticleLikes(parsed.articleLikes ?? 0)
      setUserLikedArticle(parsed.userLikedArticle ?? false)
      setUserRating(parsed.userRating ?? 0)
      setComments(Array.isArray(parsed.comments) ? parsed.comments : [])
      setLikedCommentIds(Array.isArray(parsed.likedCommentIds) ? parsed.likedCommentIds : [])
    } catch {
      setArticleLikes(0)
      setUserLikedArticle(false)
      setUserRating(0)
      setComments([])
      setLikedCommentIds([])
    } finally {
      setReady(true)
    }
  }, [storageKey])

  useEffect(() => {
    if (!ready) return
    const payload: EngagementState = {
      articleLikes,
      userLikedArticle,
      userRating,
      comments,
      likedCommentIds,
    }
    localStorage.setItem(storageKey, JSON.stringify(payload))
  }, [ready, storageKey, articleLikes, userLikedArticle, userRating, comments, likedCommentIds])

  const sortedComments = useMemo(
    () => [...comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [comments],
  )

  const toggleArticleLike = () => {
    if (userLikedArticle) {
      setUserLikedArticle(false)
      setArticleLikes((v) => Math.max(0, v - 1))
      return
    }
    setUserLikedArticle(true)
    setArticleLikes((v) => v + 1)
  }

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
    }
    setComments((prev) => [newComment, ...prev])
    setCommentText('')
  }

  return (
    <section className="article-engagement">
      <div className="article-engagement-card">
        <p className="article-engagement-eyebrow">Reader Feedback</p>
        <h3>Rate this article and join the discussion</h3>

        <div className="article-engagement-actions">
          <button type="button" className={`article-like-btn ${userLikedArticle ? 'is-active' : ''}`} onClick={toggleArticleLike}>
            {userLikedArticle ? 'Liked' : 'Like'} · {articleLikes}
          </button>
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
            placeholder="Your name (optional)"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <textarea
            placeholder="Share your perspective..."
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            rows={4}
            required
          />
          <button type="submit">Post Comment</button>
        </form>

        <div className="article-comments-feed">
          {sortedComments.length === 0 && <p className="article-comments-empty">No comments yet. Start the conversation.</p>}
          {sortedComments.map((comment) => {
            const liked = likedCommentIds.includes(comment.id)
            return (
              <article key={comment.id} className="article-comment-item">
                <div className="article-comment-head">
                  <strong>{comment.name}</strong>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
                <p>{comment.text}</p>
                <button type="button" onClick={() => toggleCommentLike(comment.id)} className={`article-comment-like ${liked ? 'is-active' : ''}`}>
                  {liked ? 'Liked' : 'Like'} · {comment.likes}
                </button>
              </article>
            )
          })}
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
