import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Post = {
  id: string
  title: string
  category: string
  minutes: string
}

const posts: Post[] = [
  {
    id: '001',
    title: 'You want to talk about AI consciousness? Fine, define yours first!',
    category: 'Consciousness',
    minutes: '11 min',
  },
  {
    id: '002',
    title: 'You were already a data machine long before the internet existed.',
    category: 'Cognition Systems',
    minutes: '10 min',
  },
  {
    id: '003',
    title: 'The more you learn, the less you see. Why? Experience makes us smarter but less free.',
    category: 'Blind Spots',
    minutes: '14 min',
  },
  {
    id: '004',
    title: 'The cage you build from proof. Why science should be a starting line, not a finish line.',
    category: 'Epistemology',
    minutes: '13 min',
  },
  {
    id: '005',
    title: 'The language trap: You only think as far as your words allow.',
    category: 'Language',
    minutes: '9 min',
  },
  {
    id: '006',
    title: 'Your emotions are not yours. They were installed.',
    category: 'Behavior Architecture',
    minutes: '12 min',
  },
]

const visualCards = [
  {
    title: 'Signal Layer',
    copy: 'Perception is not passive. It is an active filter architecture.',
    image: 'https://cdn.marblism.com/dAwJFAO6Mjc.webp',
  },
  {
    title: 'Memory Distortion',
    copy: 'You do not remember events. You remember reconstructions.',
    image: 'https://cdn.marblism.com/QFIm0dP7nCN.webp',
  },
  {
    title: 'Power Geometry',
    copy: 'Rooms are never neutral. Positioning is a hidden language.',
    image: 'https://cdn.marblism.com/5y6cPsg2e5m.webp',
  },
]

const manifesto = ['Consciousness', 'Perception', 'Language', 'Bias', 'Systems', 'Agency', 'Memory', 'Meaning']

const signalTargets = [
  { id: 's1', label: 'Hidden Premise', left: '12%', top: '22%' },
  { id: 's2', label: 'Bias Trigger', left: '74%', top: '33%' },
  { id: 's3', label: 'Power Cue', left: '46%', top: '68%' },
] as const

const noiseTerms = [
  'certainty', 'objective', 'neutral', 'evidence', 'proof', 'logic', 'normal', 'rational',
  'common-sense', 'facts', 'consensus', 'expertise', 'authority', 'model', 'data', 'truth',
  'signal', 'noise', 'intent', 'position', 'meaning', 'language', 'prediction', 'emotion',
]

function App() {
  const [mouse, setMouse] = useState({ x: 50, y: 20 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [clarity, setClarity] = useState(35)
  const [foundSignals, setFoundSignals] = useState<string[]>([])
  const [quizChoice, setQuizChoice] = useState<string | null>(null)

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      setMouse({ x, y })
    }

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      const progress = total <= 0 ? 0 : Math.min(100, Math.max(0, (current / total) * 100))
      setScrollProgress(progress)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const signalScore = foundSignals.length

  const signalBadge = useMemo(() => {
    if (signalScore >= 3) return 'Pattern Hunter unlocked'
    if (signalScore === 2) return 'Second Layer Visible'
    if (signalScore === 1) return 'Surface Broken'
    return 'No signals extracted yet'
  }, [signalScore])

  const quizFeedback = useMemo(() => {
    if (!quizChoice) return null
    if (quizChoice === 'A') return 'Correct: language frames the possibilities before logic evaluates them.'
    if (quizChoice === 'B') return 'Partly true, but the deeper issue is framing before evaluation.'
    return 'Useful, but still downstream. The hidden frame usually decides first.'
  }, [quizChoice])

  const onSignalClick = (id: string) => {
    setFoundSignals(prev => (prev.includes(id) ? prev : [...prev, id]))
  }

  return (
    <div className="app">
      <div className="progress" style={{ width: `${scrollProgress}%` }} />
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-radial" style={{ left: `${mouse.x}%`, top: `${mouse.y}%` }} aria-hidden="true" />

      <header className="hero">
        <p className="eyebrow">Extend Perception Essays</p>
        <h1>
          <span>Thinking</span>
          <span>Out Loud</span>
        </h1>
        <p className="hero-copy">
          Essays on the boundaries of human cognition, the nature of consciousness, and the
          systems we build to extend what we are.
        </p>

        <div className="hero-actions">
          <a href="#posts" className="btn btn-primary">Enter Library</a>
          <a href="#lab" className="btn btn-ghost">Perception Lab</a>
        </div>

        <div className="manifesto-grid">
          {manifesto.map((term, index) => (
            <span key={term} style={{ animationDelay: `${index * 120}ms` }}>{term}</span>
          ))}
        </div>
      </header>

      <section className="ticker" aria-label="Signal strip">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, copyIndex) => (
            <div key={copyIndex} className="ticker-copy">
              <span>Long-form cognition essays</span>
              <span>•</span>
              <span>High-friction ideas</span>
              <span>•</span>
              <span>Signal over noise</span>
              <span>•</span>
              <span>One source, multi-channel publishing</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </section>

      <section id="posts" className="panel">
        <div className="panel-head">
          <h2>Current Titles</h2>
          <span>6 essays</span>
        </div>
        <div className="cards">
          {posts.map((post, index) => (
            <article key={post.id} className="card" style={{ animationDelay: `${index * 90}ms` }}>
              <div className="card-glow" aria-hidden="true" />
              <p className="meta">{post.id} · {post.category}</p>
              <h3>{post.title}</h3>
              <a href="#" className="card-link">Read essay ({post.minutes})</a>
            </article>
          ))}
        </div>
      </section>

      <section id="lab" className="panel lab-panel">
        <div className="panel-head">
          <h2>Perception Lab</h2>
          <span>micro-gamification</span>
        </div>

        <div className="lab-grid">
          <div className="lab-canvas-wrap">
            <div className="lab-canvas">
              <div className="noise-cloud" style={{ filter: `blur(${Math.max(0, 12 - clarity / 10)}px)` }}>
                {noiseTerms.map((term, index) => (
                  <span
                    key={`${term}-${index}`}
                    style={{
                      left: `${(index * 17) % 90}%`,
                      top: `${(index * 29) % 84}%`,
                      opacity: 0.24 + (index % 5) * 0.1,
                    }}
                  >
                    {term}
                  </span>
                ))}
              </div>

              {signalTargets.map(target => {
                const found = foundSignals.includes(target.id)
                return (
                  <button
                    key={target.id}
                    className={`signal-node${found ? ' found' : ''}`}
                    style={{ left: target.left, top: target.top }}
                    onClick={() => onSignalClick(target.id)}
                    aria-label={target.label}
                  >
                    <span>{found ? '✓' : '+'}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <aside className="lab-controls">
            <p className="step">Signal Capture</p>
            <h3>Find hidden cues in the noise field</h3>
            <p className="lab-copy">Click all 3 hidden nodes. Then raise clarity to expose the quote.</p>

            <div className="score-box">
              <strong>{signalScore}/3 signals</strong>
              <span>{signalBadge}</span>
            </div>

            <label htmlFor="clarity">Clarity Filter: {clarity}%</label>
            <input
              id="clarity"
              type="range"
              min={0}
              max={100}
              value={clarity}
              onChange={(event) => setClarity(Number(event.target.value))}
            />

            <p className="reveal" style={{ opacity: Math.max(0.2, clarity / 100) }}>
              "The frame is selected before the argument begins."
            </p>
          </aside>
        </div>
      </section>

      <section className="panel visual-panel">
        <div className="panel-head">
          <h2>Visual Essay Atlas</h2>
          <span>image-driven hooks</span>
        </div>
        <div className="visual-grid">
          {visualCards.map((card, index) => (
            <article key={card.title} className="visual-card" style={{ animationDelay: `${index * 120}ms` }}>
              <img src={card.image} alt={card.title} />
              <div className="visual-overlay" />
              <div className="visual-copy">
                <p className="step">Visual Prompt</p>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel quiz-panel">
        <div className="panel-head">
          <h2>Cognition Checkpoint</h2>
          <span>reader interaction</span>
        </div>

        <p className="quiz-question">What usually decides outcomes first in high-stakes communication?</p>
        <div className="quiz-options">
          <button onClick={() => setQuizChoice('A')} className={quizChoice === 'A' ? 'active' : ''}>A. Framing and language constraints</button>
          <button onClick={() => setQuizChoice('B')} className={quizChoice === 'B' ? 'active' : ''}>B. More data and stronger evidence</button>
          <button onClick={() => setQuizChoice('C')} className={quizChoice === 'C' ? 'active' : ''}>C. Better speaking confidence alone</button>
        </div>
        {quizFeedback && <p className="quiz-feedback">{quizFeedback}</p>}
      </section>

      <section id="system" className="panel system">
        <div className="panel-head">
          <h2>Publishing System</h2>
          <span>visible pipeline</span>
        </div>
        <div className="system-grid">
          <div>
            <p className="step">1. Canonical</p>
            <h3>Write once in markdown</h3>
            <p>A single essay file becomes the canonical source for your entire distribution stack.</p>
          </div>
          <div>
            <p className="step">2. Transform</p>
            <h3>Auto-generate platform variants</h3>
            <p>Create X posts, thread variants, newsletter intros, and Medium-compatible drafts.</p>
          </div>
          <div>
            <p className="step">3. Ship</p>
            <h3>Publish with one workflow</h3>
            <p>n8n triggers website publication and channel delivery without manual copy/paste loops.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Separate v2 repository • cinematic concept pass with interactive layers</p>
      </footer>
    </div>
  )
}

export default App
