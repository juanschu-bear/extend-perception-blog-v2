import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import './App.css'

type Post = {
  id: string
  title: string
  category: string
  minutes: string
}

type TrailPoint = {
  id: number
  x: number
  y: number
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

const chapters = [
  {
    id: 'chapter-1',
    label: 'Chapter 01',
    title: 'Perception Is Not Neutral',
    body: 'The world you experience is a rendered model, not raw reality.',
    image: 'https://cdn.marblism.com/KOWuYLfc7dh.webp',
  },
  {
    id: 'chapter-2',
    label: 'Chapter 02',
    title: 'Language Builds Invisible Walls',
    body: 'Your vocabulary defines the boundaries of your available thoughts.',
    image: 'https://cdn.marblism.com/JYv-IGlvyyt.webp',
  },
  {
    id: 'chapter-3',
    label: 'Chapter 03',
    title: 'Systems Install Emotions',
    body: 'Many emotional states are responses to architecture, not identity.',
    image: 'https://cdn.marblism.com/uxgaBEC1eqy.webp',
  },
] as const

const chapterThemes = [
  { base: '#07141f', accent: '#7fe8ff' },
  { base: '#120c1f', accent: '#7b95ff' },
  { base: '#121b10', accent: '#7dffa9' },
]

function App() {
  const [mouse, setMouse] = useState({ x: 50, y: 20 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [clarity, setClarity] = useState(35)
  const [foundSignals, setFoundSignals] = useState<string[]>([])
  const [quizChoice, setQuizChoice] = useState<string | null>(null)
  const [corridorProgress, setCorridorProgress] = useState(0)
  const [activeChapter, setActiveChapter] = useState(0)
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])

  const corridorRef = useRef<HTMLElement | null>(null)
  const chapterRefs = useRef<(HTMLElement | null)[]>([])
  const magneticRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let pointId = 0

    const handleMove = (event: MouseEvent) => {
      const x = event.clientX
      const y = event.clientY

      setMouse({
        x: (x / window.innerWidth) * 100,
        y: (y / window.innerHeight) * 100,
      })

      setTrailPoints(prev => [{ id: pointId++, x, y }, ...prev].slice(0, 18))

      const target = (event.target as HTMLElement | null)?.closest('[data-magnetic]') as HTMLElement | null

      if (magneticRef.current && magneticRef.current !== target) {
        magneticRef.current.style.transform = ''
      }

      if (target) {
        magneticRef.current = target
        const rect = target.getBoundingClientRect()
        const offsetX = (x - (rect.left + rect.width / 2)) * 0.18
        const offsetY = (y - (rect.top + rect.height / 2)) * 0.18
        target.style.transform = `translate(${offsetX}px, ${offsetY}px)`
      } else {
        magneticRef.current = null
      }
    }

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      const progress = total <= 0 ? 0 : Math.min(100, Math.max(0, (current / total) * 100))
      setScrollProgress(progress)

      if (corridorRef.current) {
        const rect = corridorRef.current.getBoundingClientRect()
        const raw = (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
        setCorridorProgress(Math.min(1, Math.max(0, raw)))
      }

      const centerY = window.innerHeight * 0.5
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      chapterRefs.current.forEach((node, index) => {
        if (!node) return
        const rect = node.getBoundingClientRect()
        const nodeCenter = rect.top + rect.height / 2
        const distance = Math.abs(centerY - nodeCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveChapter(closestIndex)
    }

    const handleLeave = () => {
      if (magneticRef.current) {
        magneticRef.current.style.transform = ''
        magneticRef.current = null
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mouseleave', handleLeave)
    handleScroll()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mouseleave', handleLeave)
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

  const adventureScore = useMemo(() => {
    const quizPoints = quizChoice === 'A' ? 35 : quizChoice ? 20 : 0
    return Math.min(100, signalScore * 20 + quizPoints + Math.round(clarity * 0.25))
  }, [clarity, signalScore, quizChoice])

  const onSignalClick = (id: string) => {
    setFoundSignals(prev => (prev.includes(id) ? prev : [...prev, id]))
  }

  const theme = chapterThemes[activeChapter] ?? chapterThemes[0]

  return (
    <div className="app" style={{ '--chapter-base': theme.base, '--chapter-accent': theme.accent } as CSSProperties}>
      <div className="progress" style={{ width: `${scrollProgress}%` }} />
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-radial" style={{ left: `${mouse.x}%`, top: `${mouse.y}%` }} aria-hidden="true" />

      <div className="cursor-layer" aria-hidden="true">
        <div className="cursor-core" style={{ left: `${mouse.x}%`, top: `${mouse.y}%` }} />
        {trailPoints.map((point, index) => (
          <span
            key={point.id}
            className="trail-dot"
            style={{
              left: point.x,
              top: point.y,
              opacity: Math.max(0, 0.8 - index * 0.05),
              transform: `translate(-50%, -50%) scale(${Math.max(0.25, 1 - index * 0.05)})`,
            }}
          />
        ))}
      </div>

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
          <a href="#corridor" className="btn btn-primary" data-magnetic>Enter 3D Corridor</a>
          <a href="#lab" className="btn btn-ghost" data-magnetic>Perception Lab</a>
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

      <section id="corridor" className="panel corridor-panel" ref={corridorRef}>
        <div className="panel-head corridor-head">
          <h2>3D Essay Corridor</h2>
          <span>scroll to travel through the archive</span>
        </div>

        <div className="corridor-sticky">
          <div className="corridor-stage">
            {posts.map((post, index) => {
              const total = posts.length - 1 || 1
              const normalized = index / total
              const delta = (normalized - corridorProgress) * posts.length
              const z = 560 - Math.abs(delta) * 760
              const x = delta * 180
              const y = Math.abs(delta) * 24
              const rotateY = delta * -16
              const opacity = Math.max(0.2, 1 - Math.abs(delta) * 0.36)
              const active = Math.abs(delta) < 0.5

              return (
                <article
                  key={post.id}
                  className={`corridor-card${active ? ' active' : ''}`}
                  style={{
                    opacity,
                    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg)`,
                  }}
                  data-magnetic
                >
                  <p className="meta">{post.id} · {post.category}</p>
                  <h3>{post.title}</h3>
                  <p className="corridor-min">Read essay ({post.minutes})</p>
                </article>
              )
            })}
          </div>
          <p className="corridor-hint">Keep scrolling to move deeper into the essay vault.</p>
        </div>
      </section>

      <section className="panel chapter-panel">
        <div className="panel-head">
          <h2>Chapter Transitions</h2>
          <span>environment shifts by narrative layer</span>
        </div>
        <div className="chapters">
          {chapters.map((chapter, index) => (
            <article
              id={chapter.id}
              key={chapter.id}
              className={`chapter${activeChapter === index ? ' active' : ''}`}
              ref={el => {
                chapterRefs.current[index] = el
              }}
            >
              <img src={chapter.image} alt={chapter.title} />
              <div className="chapter-overlay" />
              <div className="chapter-copy">
                <p className="step">{chapter.label}</p>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
              </div>
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
                    data-magnetic
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
            <article key={card.title} className="visual-card" style={{ animationDelay: `${index * 120}ms` }} data-magnetic>
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
          <button onClick={() => setQuizChoice('A')} className={quizChoice === 'A' ? 'active' : ''} data-magnetic>A. Framing and language constraints</button>
          <button onClick={() => setQuizChoice('B')} className={quizChoice === 'B' ? 'active' : ''} data-magnetic>B. More data and stronger evidence</button>
          <button onClick={() => setQuizChoice('C')} className={quizChoice === 'C' ? 'active' : ''} data-magnetic>C. Better speaking confidence alone</button>
        </div>
        {quizFeedback && <p className="quiz-feedback">{quizFeedback}</p>}
      </section>

      <section className="panel adventure-panel">
        <div className="panel-head">
          <h2>Adventure Progress</h2>
          <span>unlock your reader state</span>
        </div>

        <div className="adventure-track">
          <div className="adventure-fill" style={{ width: `${adventureScore}%` }} />
        </div>
        <p className="adventure-text">Perception XP: {adventureScore}/100</p>

        <div className="adventure-milestones">
          <div className={adventureScore >= 25 ? 'on' : ''}>25 · Surface Breaker</div>
          <div className={adventureScore >= 50 ? 'on' : ''}>50 · Pattern Reader</div>
          <div className={adventureScore >= 75 ? 'on' : ''}>75 · Frame Hacker</div>
          <div className={adventureScore >= 100 ? 'on' : ''}>100 · Cognitive Cartographer</div>
        </div>
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
        <p>Separate v2 repository • extended interactive adventure build</p>
      </footer>
    </div>
  )
}

export default App
