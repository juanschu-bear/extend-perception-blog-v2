import './App.css'

const posts = [
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

function App() {
  return (
    <div className="app">
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />

      <header className="hero">
        <p className="eyebrow">Extend Perception Essays</p>
        <h1>Thinking Out Loud</h1>
        <p className="hero-copy">
          Essays on the boundaries of human cognition, the nature of consciousness, and the
          systems we build to extend what we are.
        </p>
        <div className="hero-actions">
          <a href="#posts" className="btn btn-primary">Enter Library</a>
          <a href="#system" className="btn btn-ghost">See Publishing System</a>
        </div>
      </header>

      <section id="posts" className="panel">
        <div className="panel-head">
          <h2>Current Titles</h2>
          <span>6 essays</span>
        </div>
        <div className="cards">
          {posts.map((post) => (
            <article key={post.id} className="card">
              <p className="meta">{post.id} · {post.category}</p>
              <h3>{post.title}</h3>
              <a href="#" className="card-link">Read essay ({post.minutes})</a>
            </article>
          ))}
        </div>
      </section>

      <section id="system" className="panel system">
        <div className="panel-head">
          <h2>Publishing System (Visible)</h2>
          <span>from one source file</span>
        </div>
        <div className="system-grid">
          <div>
            <p className="step">1. Write Once</p>
            <h3>Canonical essay</h3>
            <p>Each article starts in one markdown file with title, metadata, and long-form text.</p>
          </div>
          <div>
            <p className="step">2. Transform</p>
            <h3>Channel outputs</h3>
            <p>Automatically generate X post, X thread, newsletter copy, and Medium-ready variant.</p>
          </div>
          <div>
            <p className="step">3. Distribute</p>
            <h3>Workflow push</h3>
            <p>n8n publishes to site + X + newsletter. Medium gets draft/manual assist if needed.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Separate v2 repository • built to evolve into full editorial engine</p>
      </footer>
    </div>
  )
}

export default App
