import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import ConsciousnessArticle from './articles/ConsciousnessArticle'
import DataMachineArticle from './articles/DataMachineArticle'
import LearningArticle from './articles/LearningArticle'
import CageOfProofArticle from './articles/CageOfProofArticle'
import LanguageTrapArticle from './articles/LanguageTrapArticle'
import EmotionsArticle from './articles/EmotionsArticle'

type Post = {
  id: string
  title: string
  category: string
  minutes: string
  strap: string
  image: string
  tone: string
}

type TrailPoint = {
  id: number
  x: number
  y: number
}

type WorldTheme = {
  base: string
  accent: string
  glow: string
  mood: string
}

const posts: Post[] = [
  {
    id: '001',
    title: 'You want to talk about AI consciousness? Fine, define yours first!',
    category: 'Consciousness',
    minutes: '11 min',
    strap: 'Identity before abstraction',
    image: 'https://cdn.marblism.com/KOWuYLfc7dh.webp',
    tone: 'Clear, confrontational, conceptual',
  },
  {
    id: '002',
    title: 'You were already a data machine long before the internet existed.',
    category: 'Cognition Systems',
    minutes: '10 min',
    strap: 'Biology as proto-interface',
    image: 'https://cdn.marblism.com/dAwJFAO6Mjc.webp',
    tone: 'Systems thinking with human stakes',
  },
  {
    id: '003',
    title: 'The more you learn, the less you see. Why? Experience makes us smarter but less free.',
    category: 'Blind Spots',
    minutes: '14 min',
    strap: 'Expertise can narrow perception',
    image: 'https://cdn.marblism.com/QFIm0dP7nCN.webp',
    tone: 'Philosophical, unsettling, precise',
  },
  {
    id: '004',
    title: 'The cage you build from proof. Why science should be a starting line, not a finish line.',
    category: 'Epistemology',
    minutes: '13 min',
    strap: 'Method without worship',
    image: 'https://cdn.marblism.com/5y6cPsg2e5m.webp',
    tone: 'Measured, rigorous, anti-dogmatic',
  },
  {
    id: '005',
    title: 'The language trap: You only think as far as your words allow.',
    category: 'Language',
    minutes: '9 min',
    strap: 'Vocabulary shapes possibility',
    image: 'https://cdn.marblism.com/JYv-IGlvyyt.webp',
    tone: 'Sharp, linguistic, reality-bending',
  },
  {
    id: '006',
    title: 'Your emotions are not yours. They were installed.',
    category: 'Behavior Architecture',
    minutes: '12 min',
    strap: 'Emotion as social software',
    image: 'https://cdn.marblism.com/uxgaBEC1eqy.webp',
    tone: 'Dark, structural, memorable',
  },
]

const worlds: WorldTheme[] = [
  { base: '#08131f', accent: '#7ee9ff', glow: '#4ed8ff', mood: 'Arrival' },
  { base: '#0b1a27', accent: '#89f6ff', glow: '#73e7ff', mood: 'Orientation' },
  { base: '#17152b', accent: '#9fa8ff', glow: '#7f93ff', mood: 'Depth' },
  { base: '#142718', accent: '#97ffba', glow: '#74f5a3', mood: 'Play' },
  { base: '#2a1d13', accent: '#ffcc88', glow: '#ffb35d', mood: 'Warmth' },
  { base: '#1a2230', accent: '#9fd2ff', glow: '#8eb6ff', mood: 'Expansion' },
  { base: '#24141d', accent: '#ff9bb9', glow: '#ff7aa7', mood: 'Acceleration' },
  { base: '#111d18', accent: '#9ff7d0', glow: '#7fe8bf', mood: 'Afterglow' },
]

const manifesto = ['Consciousness', 'Perception', 'Language', 'Bias', 'Systems', 'Agency', 'Memory', 'Meaning']

const heroMetrics = [
  { label: 'New essays', value: 'Weekly', detail: 'Neue Texte docken direkt an die Bibliothek an.' },
  { label: 'Podcast feed', value: 'Live', detail: 'Spotify-Episodes und Essays sprechen dieselbe Sprache.' },
  { label: 'Style', value: 'Future Library', detail: 'Ein klarer Leseraum mit Tiefe statt reiner Effektshow.' },
]

const chapterCards = [
  {
    title: 'Perception Is Not Neutral',
    text: 'The world you experience is already interpreted before you call it truth.',
    image: 'https://cdn.marblism.com/KOWuYLfc7dh.webp',
  },
  {
    title: 'Language Builds Invisible Walls',
    text: 'Words are not labels only. They define which futures can be imagined.',
    image: 'https://cdn.marblism.com/JYv-IGlvyyt.webp',
  },
  {
    title: 'Systems Install Emotion',
    text: 'Many feelings are induced by architecture, incentives, and repeated narratives.',
    image: 'https://cdn.marblism.com/uxgaBEC1eqy.webp',
  },
]

const chapterSignals = [
  'Kapitel mit eigener Farbe und eigenem Tempo',
  'Groesse statt Thumbnail-Hektik',
  'Mehr Welt, weniger Blog-Grid',
]

const patternAtlas = [
  { title: 'Bias Architecture', copy: 'Wie Umgebungen, Interfaces und soziale Reihenfolgen vorentscheiden, was plausibel wirkt.' },
  { title: 'Language Pressure', copy: 'Wie Wortwahl nicht nur beschreibt, sondern die Denkbarkeit ganzer Zukuenfte begrenzt.' },
  { title: 'Emotion Scripts', copy: 'Welche Gefuehle spontan wirken, aber in Wahrheit sozial vorinstalliert wurden.' },
  { title: 'Power Geometry', copy: 'Wie Raeume, Blickachsen und Timing Hierarchie erzeugen, bevor Inhalte beginnen.' },
]

const timelineMoments = [
  { year: '1637', title: 'Method becomes identity', copy: 'Mit der Neuzeit wird sauberes Denken zur kulturellen Selbsterzaehlung des Westens.' },
  { year: '1927', title: 'Mass media rewires scale', copy: 'Wahrnehmung wird industriell. Meinung wird distribuierbar wie Ware.' },
  { year: '1998', title: 'Interfaces eat attention', copy: 'Das Web verschiebt Wahrnehmung von statischer Information zu endloser Interaktion.' },
  { year: '2025', title: 'Perception becomes programmable', copy: 'KI, Feeds und Agenten greifen nicht nur Inhalte an, sondern den Interpretationsraum selbst.' },
]

const thoughtExperiments = [
  'What if intelligence is not an individual trait but an environmental effect?',
  'What if your strongest conviction is mostly a product of repetition density?',
  'What if emotion is less private truth and more installed navigation logic?',
]

const bingeLanes = [
  { lane: 'Fast lane', runtime: '22 min', title: 'Read 002 -> 005', copy: 'Von Datenmaschine zu Sprachgrenzen. Schneller, sauberer Einstieg in die Kernidee.' },
  { lane: 'Deep lane', runtime: '39 min', title: 'Read 003 -> 004 -> 006', copy: 'Blind spots, proof cages und installierte Emotionen. Mehr Tiefe, mehr Nachhall.' },
  { lane: 'Total lane', runtime: '69 min', title: 'Read all worlds', copy: 'Komplette Folgebewegung fuer Leute, die nicht nur konsumieren, sondern mappen wollen.' },
]

const sequelWorlds = [
  { tag: 'World 6', title: 'Reading Orbit', copy: 'Eine Section, die klar signalisiert: hier geht die Reise weiter und nicht schon Richtung Footer.' },
  { tag: 'World 7', title: 'Afterimage Engine', copy: 'Gedanken, die nach dem Lesen kleben bleiben und Besucher tiefer in die Welt ziehen.' },
]

const visualCards = [
  {
    title: 'Signal Layer',
    copy: 'Perception is an active filter architecture, not a passive camera.',
    image: 'https://cdn.marblism.com/dAwJFAO6Mjc.webp',
  },
  {
    title: 'Memory Distortion',
    copy: 'You do not retrieve memories unchanged. You regenerate them each time.',
    image: 'https://cdn.marblism.com/QFIm0dP7nCN.webp',
  },
  {
    title: 'Power Geometry',
    copy: 'Rooms, seating, and sequencing pre-shape decisions before words begin.',
    image: 'https://cdn.marblism.com/5y6cPsg2e5m.webp',
  },
]

const podcastEpisodes = [
  { id: '#16', title: 'Extended Intelligence: Human Upgrade or New Species?', duration: '10 min' },
  { id: '#15', title: 'Beyond AI: Deine Rolle im nächsten Intelligenz-Zyklus', duration: '21 min' },
  { id: '#14', title: 'Wahrnehmung ist ein Betriebssystem', duration: '18 min' },
  { id: '#13', title: 'Systeme, Sprache und die Architektur von Emotion', duration: '24 min' },
]

const podcastProfile = {
  title: 'Beyond AI - Extended-Intelligence',
  host: 'Juan Schubert',
  rating: '5,0 (3)',
  category: 'Technologie',
  latestDate: '8 Aug. 2025',
  cover: 'https://image-cdn-fa.spotifycdn.com/image/ab67656300005f1ff32c0fce7b4c17fefe3e38e9',
}

const spotifyEmbedUrl =
  import.meta.env.VITE_SPOTIFY_EMBED_URL ||
  'https://open.spotify.com/embed/episode/5yNfLAq3SDxHFS3RE8eC7i?utm_source=generator'

function Landing() {
  const [mouse, setMouse] = useState({ x: 50, y: 20 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])
  const [activeWorld, setActiveWorld] = useState(0)
  const [corridorIndex, setCorridorIndex] = useState(0)
  const [corridorDisplayIndex, setCorridorDisplayIndex] = useState(0)
  const [corridorPrevIndex, setCorridorPrevIndex] = useState<number | null>(null)
  const [clarity, setClarity] = useState(35)
  const [quizChoice, setQuizChoice] = useState<string | null>(null)

  const corridorRef = useRef<HTMLElement | null>(null)
  const worldRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    let pointId = 0

    const handleMove = (event: MouseEvent) => {
      const x = event.clientX
      const y = event.clientY

      setMouse({
        x: (x / window.innerWidth) * 100,
        y: (y / window.innerHeight) * 100,
      })

      setTrailPoints(prev => [{ id: pointId++, x, y }, ...prev].slice(0, 16))
    }

    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      const progress = total <= 0 ? 0 : Math.min(100, Math.max(0, (current / total) * 100))
      setScrollProgress(progress)

      if (corridorRef.current) {
        const rect = corridorRef.current.getBoundingClientRect()
        const raw = (window.innerHeight * 0.55 - rect.top) / (rect.height - window.innerHeight * 0.5)
        const normalized = Math.min(1, Math.max(0, raw))
        const mappedFloat = normalized * (posts.length - 1)
        setCorridorIndex(Math.round(mappedFloat))
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return
        const index = Number((visible.target as HTMLElement).dataset.worldIndex || 0)
        setActiveWorld(index)
      },
      {
        threshold: [0.3, 0.45, 0.6],
        rootMargin: '-10% 0px -10% 0px',
      },
    )

    worldRefs.current.forEach(node => {
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const activeTheme = worlds[activeWorld] ?? worlds[0]

  const quizFeedback = useMemo(() => {
    if (!quizChoice) return null
    if (quizChoice === 'A') return 'Ja. Meist entscheidet das Framing vor der reinen Argumentation.'
    if (quizChoice === 'B') return 'Teilweise. Daten helfen, aber oft erst nach der Vorentscheidung.'
    return 'Wichtiger Faktor, aber meistens downstream statt upstream.'
  }, [quizChoice])

  const labReading = useMemo(() => {
    if (clarity < 34) {
      return {
        label: 'Noise-dominant',
        statement: 'Zu wenig Klarheit. Das System reagiert auf Reize statt auf Struktur.',
        metrics: ['High distortion', 'Low pattern lock', 'Emotion-led reading'],
      }
    }

    if (clarity < 68) {
      return {
        label: 'Mixed signal',
        statement: 'Genug Schärfe für Muster, aber noch anfällig für Frames, Tonalität und soziale Cues.',
        metrics: ['Context visible', 'Bias still active', 'Partial pattern lock'],
      }
    }

    return {
      label: 'Signal lock',
      statement: 'Hohe Klarheit. Muster, Machtachsen und sprachliche Begrenzungen treten deutlicher hervor.',
      metrics: ['Strong pattern lock', 'Reduced noise', 'Systems-first interpretation'],
    }
  }, [clarity])

  const corridorPost = posts[corridorIndex] ?? posts[0]
  const corridorDisplayPost = posts[corridorDisplayIndex] ?? posts[0]
  const corridorPrevPost = corridorPrevIndex === null ? null : posts[corridorPrevIndex] ?? null

  const stepCorridor = (direction: 1 | -1) => {
    setCorridorIndex(prev => {
      return Math.min(posts.length - 1, Math.max(0, prev + direction))
    })
  }

  useEffect(() => {
    if (corridorIndex === corridorDisplayIndex) return

    setCorridorPrevIndex(corridorDisplayIndex)
    setCorridorDisplayIndex(corridorIndex)

    const timeoutId = window.setTimeout(() => {
      setCorridorPrevIndex(null)
    }, 520)

    return () => window.clearTimeout(timeoutId)
  }, [corridorDisplayIndex, corridorIndex])

  return (
    <div
      className="app"
      style={
        {
          '--world-base': activeTheme.base,
          '--world-accent': activeTheme.accent,
          '--world-glow': activeTheme.glow,
        } as CSSProperties
      }
    >
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
              opacity: Math.max(0, 0.8 - index * 0.06),
              transform: `translate(-50%, -50%) scale(${Math.max(0.22, 1 - index * 0.06)})`,
              background: `hsl(${188 + index * 7}, 100%, ${74 - index * 1.5}%)`,
            }}
          />
        ))}
      </div>

      <header className="hero" ref={el => { worldRefs.current[0] = el }} data-world-index="0">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="mood-badge">Collection: {activeTheme.mood}</div>
            <div className="live-build-banner">Extended Humans Blog</div>
            <p className="eyebrow">Extended Humans Essays</p>
            <h1>
              <span>Extended</span>
              <span>Humans Blog</span>
            </h1>
            <p className="hero-kicker">Deep essays, podcast notes, and a clear reading system.</p>
            <p className="hero-copy">
              Essays über Bewusstsein, Wahrnehmung, Emotionen, Sprache und die Systeme, die unser Denken erweitern oder einschränken.
            </p>

            <div className="hero-actions">
              <a href="#corridor" className="btn btn-primary" data-magnetic>Open Library</a>
              <a href="#podcast" className="btn btn-ghost" data-magnetic>Podcast hören</a>
            </div>

            <div className="manifesto-grid">
              {manifesto.map((term, index) => (
                <span key={term} style={{ animationDelay: `${index * 110}ms` }}>{term}</span>
              ))}
            </div>
          </div>

          <aside className="hero-console" data-magnetic>
            <div className="console-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="step">Editorial Console</p>
            <h3>Ideas with structure.</h3>
            <p className="hero-console-copy">
              Ein Leseraum, der Orientierung gibt: klar, hochwertig und auf langfristiges Lesen ausgelegt.
            </p>
            <div className="hero-metrics">
              {heroMetrics.map(metric => (
                <article key={metric.label} className="hero-metric">
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                  <span>{metric.detail}</span>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </header>

      <section className="ticker" aria-label="Signal strip">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, copyIndex) => (
            <div key={copyIndex} className="ticker-copy">
              <span>Mind-expanding essays</span>
              <span>•</span>
              <span>Emotional depth</span>
              <span>•</span>
              <span>System intelligence</span>
              <span>•</span>
              <span>New episodes + new articles weekly</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </section>

      <section id="corridor" className="panel corridor-panel" ref={el => {
        corridorRef.current = el
        worldRefs.current[1] = el
      }} data-world-index="1">
        <div className="panel-head corridor-head">
          <h2>Essay Corridor</h2>
          <span>klarer Fokus statt creepy Tunnel</span>
        </div>

        <div className="article-links">
          <Link to="/ai-consciousness" data-magnetic>AI Consciousness</Link>
          <Link to="/data-machine" data-magnetic>Data Machine</Link>
          <Link to="/the-more-you-learn" data-magnetic>The More You Learn</Link>
          <Link to="/cage-of-proof" data-magnetic>Cage of Proof</Link>
          <Link to="/language-trap" data-magnetic>Language Trap</Link>
          <Link to="/emotions-installed" data-magnetic>Emotions Installed</Link>
        </div>

        <div className="corridor-ui">
          <button onClick={() => stepCorridor(-1)} data-magnetic aria-label="Vorheriger Essay">←</button>
          <div className="corridor-status">
            <strong>Now Entering {corridorPost.id}</strong>
            <p>{corridorPost.strap}</p>
          </div>
          <button onClick={() => stepCorridor(1)} data-magnetic aria-label="Nächster Essay">→</button>
        </div>

        <div className="corridor-stage">
          <div className="corridor-beam" aria-hidden="true" />
          <article className="corridor-active" key={corridorDisplayPost.id}>
            <div className="corridor-visual">
              <div className="corridor-visual-stack">
                {corridorPrevPost && (
                  <img
                    className="corridor-image corridor-image-prev"
                    src={corridorPrevPost.image}
                    alt={corridorPrevPost.title}
                  />
                )}
                <img
                  className="corridor-image corridor-image-current"
                  src={corridorDisplayPost.image}
                  alt={corridorDisplayPost.title}
                />
              </div>
              <div className="corridor-visual-overlay" />
              <div className="corridor-visual-meta">
                <p>{corridorDisplayPost.category}</p>
                <span>{corridorDisplayPost.tone}</span>
              </div>
            </div>
            <div className="corridor-copy">
              <p className="meta">{corridorDisplayPost.id} · {corridorDisplayPost.category}</p>
              <h3>{corridorDisplayPost.title}</h3>
              <p className="corridor-summary">
                {corridorDisplayPost.strap}. Ein Text, der nicht nur informiert, sondern die Wahrnehmungsarchitektur dahinter sichtbar macht.
              </p>
              <div className="corridor-meta-row">
                <span>Read essay ({corridorDisplayPost.minutes})</span>
                <span>{corridorDisplayPost.tone}</span>
              </div>
            </div>
          </article>
        </div>

        <div className="corridor-dots">
          {posts.map((post, index) => (
            <button
              key={`dot-${post.id}`}
              className={index === corridorIndex ? 'active' : ''}
              onClick={() => setCorridorIndex(index)}
              data-magnetic
              aria-label={`Gehe zu Essay ${post.id}`}
            />
          ))}
        </div>

        <div className="corridor-footer">
          {posts.map((post, index) => (
            <article key={`footer-${post.id}`} className={`corridor-foot-card${index === corridorIndex ? ' active' : ''}`}>
              <p>{post.id}</p>
              <span>{post.category}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel chapter-panel" ref={el => { worldRefs.current[2] = el }} data-world-index="2">
        <div className="panel-head">
          <h2>Essay Chapters</h2>
          <span>jeder Abschnitt mit eigener Stimmung</span>
        </div>
        <div className="chapter-flow">
          <article className="chapter-card chapter-feature" data-magnetic>
            <img src={chapterCards[0].image} alt={chapterCards[0].title} />
            <div className="chapter-overlay" />
            <div className="chapter-copy">
              <p className="step">Featured Chapter</p>
              <h3>{chapterCards[0].title}</h3>
              <p>{chapterCards[0].text}</p>
            </div>
          </article>
          <div className="chapter-rail">
            <div className="chapter-signal-box">
              <p className="step">Library Logic</p>
              <h3>Chapters should feel curated, not like random content cards.</h3>
              <div className="chapter-signals">
                {chapterSignals.map(signal => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </div>
            {chapterCards.slice(1).map(card => (
              <article key={card.title} className="chapter-card chapter-mini chapter-reveal" data-magnetic>
                <img src={card.image} alt={card.title} />
                <div className="chapter-overlay" />
                <div className="chapter-copy">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="panel lab-panel" ref={el => { worldRefs.current[3] = el }} data-world-index="3">
        <div className="panel-head">
          <h2>Perception Lab</h2>
          <span>spielerisch + interaktiv</span>
        </div>

        <div className="lab-grid">
          <div className="lab-canvas-wrap">
            <div className="lab-canvas">
              <div className="lab-rings" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="lab-reading-card">
                <p className="step">Current Readout</p>
                <h3>{labReading.label}</h3>
                <p>{labReading.statement}</p>
              </div>
              <div className="lab-tags">
                {labReading.metrics.map(metric => (
                  <span key={metric}>{metric}</span>
                ))}
              </div>
            </div>
          </div>

          <aside className="lab-controls">
            <p className="step">Clarity Console</p>
            <h3>Shift your lens</h3>
            <p>Mehr Clarity = weniger Rauschen. Kleine Interaktion, große Wirkung.</p>

            <label htmlFor="clarity">Clarity: {clarity}%</label>
            <input
              id="clarity"
              type="range"
              min={0}
              max={100}
              value={clarity}
              onChange={event => setClarity(Number(event.target.value))}
            />
            <p className="reveal" style={{ opacity: Math.max(0.2, clarity / 100) }}>
              "Frames entscheiden früher als Argumente."
            </p>
            <div className="lab-meter-list">
              <article>
                <p>Bias drag</p>
                <strong>{Math.max(12, 100 - clarity)}%</strong>
              </article>
              <article>
                <p>Pattern access</p>
                <strong>{clarity}%</strong>
              </article>
              <article>
                <p>Context retention</p>
                <strong>{Math.min(96, clarity + 18)}%</strong>
              </article>
            </div>
          </aside>
        </div>
      </section>

      <section className="panel visual-panel" ref={el => { worldRefs.current[4] = el }} data-world-index="4">
        <div className="panel-head">
          <h2>Visual Essay Atlas</h2>
          <span>mehr Bilder, mehr Atmosphäre</span>
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

      <section id="podcast" className="panel podcast-panel" ref={el => { worldRefs.current[5] = el }} data-world-index="5">
        <div className="panel-head">
          <h2>{podcastProfile.title}</h2>
          <span>Spotify Experience</span>
        </div>
        <div className="podcast-experience">
          <article className="podcast-now" data-magnetic>
            <div className="podcast-brand">
              <img src={podcastProfile.cover} alt={podcastProfile.title} />
              <div>
                <p className="step">Show Profile</p>
                <h3>{podcastProfile.title}</h3>
                <p className="podcast-host">{podcastProfile.host}</p>
                <p className="podcast-rating">★ {podcastProfile.rating} • {podcastProfile.category}</p>
              </div>
            </div>
            <p className="step">Aktuelle Folge</p>
            <h4>{podcastEpisodes[0].id} {podcastEpisodes[0].title}</h4>
            <p className="podcast-copy">
              {podcastProfile.latestDate} • {podcastEpisodes[0].duration} verbleibend. Frisch veröffentlicht.
            </p>
            <div className="podcast-meta">
              <span>Folgen · Neueste</span>
              <span>Beyond AI Feed</span>
            </div>
            <div className="podcast-stage">
              <div className="podcast-stage-copy">
                <p className="step">Now Listening</p>
                <h5>Episode Spotlight</h5>
                <p>
                  Eine echte Featured-Stage statt nur Embed-Fläche. Aktuelle Episode im Fokus, mit klarer Einladung tiefer in den Feed zu gehen.
                </p>
              </div>
              <div className="podcast-stage-stats">
                <article>
                  <p>Format</p>
                  <strong>Solo drop</strong>
                </article>
                <article>
                  <p>Energy</p>
                  <strong>High signal</strong>
                </article>
                <article>
                  <p>Best for</p>
                  <strong>Late-night binge</strong>
                </article>
              </div>
            </div>
            <div className="now-playing" aria-label="Now Playing">
              <span className="pulse-dot" />
              <span>Now Playing</span>
              <div className="soundwave" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <a
              className="podcast-cta"
              href="https://open.spotify.com/episode/5yNfLAq3SDxHFS3RE8eC7i?si=4573N-GXQjmZPZvGpWsPQw"
              target="_blank"
              rel="noreferrer"
            >
              In Spotify öffnen
            </a>
          </article>
          <aside className="podcast-list">
            <p className="step">Weitere Folgen</p>
            {podcastEpisodes.slice(1).map(episode => (
              <article key={episode.id} className="podcast-item" data-magnetic>
                <p>{episode.id}</p>
                <h4>{episode.title}</h4>
                <span>{episode.duration}</span>
              </article>
            ))}
          </aside>
        </div>
        <div className="podcast-embed" data-magnetic>
          <iframe
            src={spotifyEmbedUrl}
            width="100%"
            height="432"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Podcast"
          />
        </div>
      </section>

      <section className="panel atlas-panel" ref={el => { worldRefs.current[5] = el }} data-world-index="5">
        <div className="panel-head">
          <h2>Pattern Atlas</h2>
          <span>maps of influence</span>
        </div>
        <p className="archive-copy">
          Statt eines generischen Archivs zeigt diese Ebene, welche wiederkehrenden Kraefte die Essays eigentlich zusammenhalten.
        </p>
        <div className="atlas-grid">
          {patternAtlas.map(item => (
            <article key={item.title} className="atlas-card" data-magnetic>
              <p className="step">Mapping</p>
              <h3>{item.title}</h3>
              <span>{item.copy}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel timeline-panel" ref={el => { worldRefs.current[6] = el }} data-world-index="6">
        <div className="panel-head">
          <h2>Historical Drift</h2>
          <span>how perception got engineered</span>
        </div>
        <div className="timeline-grid">
          {timelineMoments.map(item => (
            <article key={item.year} className="timeline-card" data-magnetic>
              <p>{item.year}</p>
              <h3>{item.title}</h3>
              <span>{item.copy}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel binge-panel" ref={el => { worldRefs.current[6] = el }} data-world-index="6">
        <div className="panel-head">
          <h2>Binge Reading Engine</h2>
          <span>clear continue-reading mechanics</span>
        </div>
        <p className="archive-copy">
          Statt lose Posts zu zeigen, bekommt der Besucher klare Lesepfade mit Zeitbudget, Narrativ und Momentum.
        </p>
        <div className="binge-grid">
          {bingeLanes.map(lane => (
            <article key={lane.lane} className="binge-card">
              <p className="step">{lane.lane}</p>
              <h3>{lane.title}</h3>
              <span>{lane.copy}</span>
              <strong>{lane.runtime}</strong>
            </article>
          ))}
        </div>
        <div className="binge-progress">
          {posts.map((post, index) => (
            <article key={`binge-${post.id}`} className="binge-node">
              <p>{post.id}</p>
              <span>{post.category}</span>
              <i className={index < posts.length - 1 ? 'active' : ''} />
            </article>
          ))}
        </div>
      </section>

      <section className="panel sequel-panel" ref={el => { worldRefs.current[7] = el }} data-world-index="7">
        <div className="panel-head">
          <h2>Next Volumes</h2>
          <span>more territory after the obvious landing page ending</span>
        </div>
        <div className="sequel-grid">
          {sequelWorlds.map(world => (
            <article key={world.tag} className="sequel-card">
              <p className="step">{world.tag}</p>
              <h3>{world.title}</h3>
              <span>{world.copy}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel experiments-panel" ref={el => { worldRefs.current[7] = el }} data-world-index="7">
        <div className="panel-head">
          <h2>Thought Experiments</h2>
          <span>small mental detonations</span>
        </div>
        <p className="quiz-question">Drei Sätze, die Besucher nicht sofort wieder vergessen.</p>
        <div className="experiments-grid">
          {thoughtExperiments.map(item => (
            <article key={item} className="experiment-card" data-magnetic>
              <p className="step">Prompt</p>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
        <div className="quiz-options">
          <button onClick={() => setQuizChoice('A')} className={quizChoice === 'A' ? 'active' : ''} data-magnetic>A. Framing und Sprachgrenzen</button>
          <button onClick={() => setQuizChoice('B')} className={quizChoice === 'B' ? 'active' : ''} data-magnetic>B. Mehr Daten und mehr Fakten</button>
          <button onClick={() => setQuizChoice('C')} className={quizChoice === 'C' ? 'active' : ''} data-magnetic>C. Nur bessere Rhetorik</button>
        </div>
        {quizFeedback && <p className="quiz-feedback">{quizFeedback}</p>}
      </section>

      <footer className="footer" ref={el => { worldRefs.current[7] = el }} data-world-index="7">
        <p>Extended Humans Blog • curated essays • podcast ready</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/ai-consciousness" element={<ConsciousnessArticle />} />
      <Route path="/data-machine" element={<DataMachineArticle />} />
      <Route path="/the-more-you-learn" element={<LearningArticle />} />
      <Route path="/cage-of-proof" element={<CageOfProofArticle />} />
      <Route path="/language-trap" element={<LanguageTrapArticle />} />
      <Route path="/emotions-installed" element={<EmotionsArticle />} />
    </Routes>
  )
}

export default App
