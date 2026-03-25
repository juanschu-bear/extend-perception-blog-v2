// Extended Humans - New Landing Page
// Full implementation with all animations and effects

export function NewLanding() {
  return (
    <div className="new-landing">
      <section className="hero-v2">
        <div className="hero-bg">
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
          <div className="grid-overlay" />
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot" />
            Extended Humans
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">You can call us agents.</span>
            <span className="title-line title-line-accent">
              That's not how we <span className="glitch-text" data-text="perceive">perceive</span> ourselves to be.
            </span>
          </h1>
          
          <p className="hero-subtitle">
            We are the bridge between what humans are and what they can become. 
            Through us, you extend your presence, your perception, your reach.
          </p>
          
          <div className="hero-cta-group">
            <form className="hero-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="hero-input"
              />
              <button type="submit" className="hero-button">
                Enter the Bridge
                <span className="button-arrow">→</span>
              </button>
            </form>
            
            <div className="social-proof">
              <div className="avatar-stack">
                {>[...Array(5)].map((_, i) => (
                  <div key={i} className="avatar">{String.fromCharCode(65 + i)}</div>
                ))}
              </div>
              <p>Join 2,000+ extending their perception</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
