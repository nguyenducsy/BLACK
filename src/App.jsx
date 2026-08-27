import { useState } from 'react'
import { ArrowUpRight, Check, Eye, EyeOff, Menu, Sparkles, X } from 'lucide-react'

const features = [
  {
    number: '01',
    title: 'See the signal',
    text: 'Turn scattered information into a calm, clear picture of what matters next.',
  },
  {
    number: '02',
    title: 'Move with intent',
    text: 'Build momentum with thoughtful prompts that meet you exactly where you are.',
  },
  {
    number: '03',
    title: 'Keep your north',
    text: 'Come back to the decisions, ideas, and people that make the work meaningful.',
  },
]

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="site-shell">
      <nav className="nav-bar" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Northstar home">
          <span className="wordmark-mark"><Sparkles size={15} strokeWidth={2.5} /></span>
          MRIS
        </a>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#approach" onClick={() => setMenuOpen(false)}>TRANG CHỦ</a>
          <a href="#stories" onClick={() => setMenuOpen(false)}>LIÊN HỆ</a>
          <button className="mobile-login" onClick={() => { setShowLogin(true); setMenuOpen(false) }}>ĐĂNG NHẬP<ArrowUpRight size={15} /></button>
        </div>
        <button className="nav-login" onClick={() => setShowLogin(true)}>ĐĂNG NHẬP<ArrowUpRight size={15} /></button>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />A more considered way forward</p>
          <h1>Make space<br /><em>for what's next.</em></h1>
          <p className="hero-description">Northstar brings your thoughts, plans, and possibilities into focus, so you can spend less time navigating the noise and more time making meaningful progress.</p>
          <button className="primary-button" onClick={() => setShowLogin(true)}>Find your north <ArrowUpRight size={18} /></button>
        </div>
        <div className="hero-art" aria-label="Abstract illustration of a sunlit horizon" role="img">
          <div className="sun" />
          <div className="horizon-line" />
          <div className="hill hill-back" />
          <div className="hill hill-front" />
          <div className="art-caption">A clearer view<br /><span>01 / 03</span></div>
        </div>
        <div className="scroll-note"><span className="scroll-line" />Scroll to explore</div>
      </section>

      <section className="statement" id="approach">
        <p className="eyebrow">Our approach</p>
        <h2>The best direction<br /><em>is already within you.</em></h2>
        <p className="statement-text">We make tools for the quiet work behind every good decision: noticing, reflecting, and choosing with care.</p>
      </section>

      <section className="feature-grid" id="stories">
        {features.map((feature) => (
          <article className="feature" key={feature.number}>
            <span className="feature-number">{feature.number}</span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
            <span className="feature-arrow"><ArrowUpRight size={17} /></span>
          </article>
        ))}
      </section>

      <footer className="footer">
        <span className="footer-note">Take the next right step.</span>
        <span>© 2025 Northstar</span>
        <a href="mailto:hello@northstar.example">hello@northstar.example</a>
      </footer>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </main>
  )
}

function LoginModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="close-button" aria-label="Close login" onClick={onClose}><X size={19} /></button>
        <div className="login-icon"><Sparkles size={18} /></div>
        {submitted ? (
          <div className="success-state"><div className="success-icon"><Check size={22} /></div><h2>You're on your way.</h2><p>We've received your details. This demo is ready for its next connection.</p><button className="primary-button" onClick={onClose}>Back to Northstar <ArrowUpRight size={17} /></button></div>
        ) : (
          <>
            <p className="eyebrow">Welcome back</p>
            <h2 id="login-title">Find your way in.</h2>
            <p className="login-intro">Pick up where you left off.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" required />
              <div className="password-label"><label htmlFor="password">Password</label><a href="#reset">Forgot?</a></div>
              <div className="password-input"><input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" minLength="6" required /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
              <button className="primary-button form-submit" type="submit">ĐĂNG NHẬP <ArrowUpRight size={17} /></button>
            </form>
            <p className="form-footnote">New here? <a href="#create">Create an account</a></p>
          </>
        )}
      </section>
    </div>
  )
}

export default App