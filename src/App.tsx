import { useEffect, useRef, type JSX } from 'react'
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
  return (
    <div className="route-page">
      <Link to="/" className="back-link">Back to Library</Link>
      {children}
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
