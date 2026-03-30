'use client'
import { useState, useEffect, useCallback } from 'react'

type Spec = { key: string; val: string; unit?: string }
type Product = {
  id: string
  name: string
  badge: string
  img: string
  desc: string
  fullDesc: string
  type: string
  specs: Spec[]
  features: string[]
}

const PRODUCTS: Product[] = [
  {
    id: 'seven-phase',
    name: '7 Phase DC Motor',
    badge: 'Brushless',
    img: 'https://www.agnimotors.com/wp-content/uploads/2022/09/MultiPhase-600px-300x300.png',
    desc: 'Axial Flux Brushless motor designed by Cedric Lynch. Reduced maintenance, longer service life, and low cogging effect.',
    fullDesc: 'The 7 Phase DC is an Axial Flux Brushless motor designed and built by Cedric Lynch. It uses the principles of the tried and tested Agni Motors Brushed DC axial flux motor, but adds upon this by using electronics to control the commutation within the motor. The benefits of the design are reduced maintenance costs and a longer service life. An additional feature is that the 7 phase DC design works with a less complex controller compared to those required to control equivalent AC brushless motors. The 7 phase architecture also benefits from a low cogging effect.',
    type: 'Axial Flux Brushless DC',
    specs: [
      { key: 'Motor Type', val: 'Axial Flux Brushless DC' },
      { key: 'Phases', val: '7', unit: 'phase' },
      { key: 'Peak Efficiency', val: 'Up to 94', unit: '%' },
      { key: 'Voltage Range', val: '0.1V – Max', unit: 'V' },
      { key: 'Cogging', val: 'Low / Near Zero' },
      { key: 'Commutation', val: 'Electronic' },
      { key: 'Controller', val: 'Simple / Less Complex' },
      { key: 'Service Life', val: 'Extended' },
    ],
    features: [
      'Brushless design eliminates brush maintenance',
      'Low cogging torque for smooth operation from 0 RPM',
      'Compatible with simpler controllers vs equivalent AC motors',
      'Electronic commutation for precise control',
      'High torque density across the entire RPM range',
      'Suitable for regen braking with identical efficiency values',
    ],
  },
  {
    id: '119r',
    name: '119R Brushed DC',
    badge: 'Brushed',
    img: 'https://www.agnimotors.com/wp-content/uploads/2022/09/Agni-brushed-600px1-300x300.png',
    desc: 'Axial Flux Brushed DC Motor, 200mm nominal diameter. Available in two variants: 55 rpm/V and 68 rpm/V.',
    fullDesc: 'The 119R motor is an Axial Flux Brushed DC Motor with a 200 mm nominal diameter. It features brush commutation and a simple drive control architecture, making it ideal for low-voltage applications where simplicity and reliability are paramount. Two variants of the 119R are available — one with 55 rpm/V and a second with 68 rpm/V — allowing customers to select the right characteristic for their application. Proven across automotive, marine, industrial, and agricultural applications worldwide.',
    type: 'Axial Flux Brushed DC',
    specs: [
      { key: 'Motor Type', val: 'Axial Flux Brushed DC' },
      { key: 'Diameter', val: '200', unit: 'mm' },
      { key: 'Variant 1', val: '55', unit: 'rpm/V' },
      { key: 'Variant 2', val: '68', unit: 'rpm/V' },
      { key: 'Commutation', val: 'Brush' },
      { key: 'Drive Control', val: 'Simple Architecture' },
      { key: 'Peak Efficiency', val: 'Up to 94', unit: '%' },
      { key: 'Application', val: 'Low Voltage EV' },
    ],
    features: [
      'Simple brush commutation — no complex electronics required',
      '200mm nominal diameter for compact packaging',
      'Two kV variants for application flexibility (55 or 68 rpm/V)',
      'Proven in automotive, marine, agricultural, and industrial use',
      'Identical motoring and regen efficiency values',
      'Smooth operation from 0.1V to maximum voltage',
    ],
  },
  {
    id: 'torque-controller',
    name: 'AGNI Torque Controller',
    badge: '20 kW',
    img: 'https://www.agnimotors.com/wp-content/uploads/2022/09/Torque-controller-600px-300x300.png',
    desc: '20kW DC pure torque motor controller designed for Agni Axial Flux DC motors. Programmable, multi-motor capable.',
    fullDesc: 'The 20kW DC pure torque motor controller is designed to be used with Agni Motors Axial Flux DC motors in electric vehicle applications, maximising system efficiencies in both motor and regen modes. It is fully programmable and can be integrated in applications that require more than one motor-controller, enabling multi-motor configurations. The pure torque control architecture ensures optimal energy management across the full operating range, making it the ideal match for the Agni motor family.',
    type: 'DC Motor Controller',
    specs: [
      { key: 'Rated Power', val: '20', unit: 'kW' },
      { key: 'Control Mode', val: 'Pure Torque' },
      { key: 'Programmable', val: 'Yes' },
      { key: 'Multi-Motor', val: 'Yes' },
      { key: 'Regen Mode', val: 'Supported' },
      { key: 'Application', val: 'Electric Vehicle' },
      { key: 'Motor Compat.', val: 'Agni Axial Flux DC' },
      { key: 'Efficiency', val: 'Maximised' },
    ],
    features: [
      'Pure torque control maximises system efficiency in motor and regen modes',
      'Fully programmable for custom application requirements',
      'Supports multi-motor / multi-controller integration',
      'Designed specifically for Agni Axial Flux DC motors',
      'Optimised regenerative braking energy recovery',
      'Compact design suitable for EV applications',
    ],
  },
]

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = activeProduct ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeProduct])

  // Close modal on Escape
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setActiveProduct(null)
  }, [])
  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="#" className="navbar-logo-img" onClick={closeMenu}>
          <img
            src="https://www.agnimotors.com/wp-content/uploads/2022/09/agni-logo.png"
            alt="AGNI Motors"
          />
        </a>

        {/* Desktop links — only 4 items */}
        <ul className="nav-links">
          <li><a href="#racing">Racing Heritage</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#records">World Records</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-right">
          <button className="theme-toggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <><span>🌙</span>Dark</> : <><span>☀️</span>Light</>}
          </button>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu — all items */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href="#racing"   onClick={closeMenu}>Racing Heritage</a>
        <a href="#products" onClick={closeMenu}>Products</a>
        <a href="#records"  onClick={closeMenu}>World Records</a>
        <a href="#cedric"   onClick={closeMenu}>Cedric Lynch</a>
        <a href="#contact"  onClick={closeMenu}>Contact</a>
      </div>

      <main>
        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-grid-lines" />
          <div className="hero-glow" />
          <div className="hero-content">
            <div className="hero-logo-wrap">
              <img
                src="https://www.agnimotors.com/wp-content/uploads/2022/09/agni-logo.png"
                alt="AGNI Motors"
                className="hero-logo"
              />
            </div>
            <div className="hero-eyebrow">Performance Racing Heritage</div>
            <h1 className="hero-title">
              Shaping the Future of<br />
              <span className="accent">Electric Powertrains</span>
            </h1>
            <p className="hero-subtitle">
              Axial flux motor pioneers with world records on land, sea, and air. Up to 94% efficiency across the full RPM range.
            </p>
            <div className="hero-badge-row">
              <span className="hero-badge">⚡ TTXGP Champions 2009</span>
              <span className="hero-badge">🚁 First Manned Electric Helicopter</span>
              <span className="hero-badge">✈️ 283 km/h Air Speed Record</span>
              <span className="hero-badge">🌊 Atlantic Solar Crossing 2007</span>
            </div>
          </div>
        </section>

        {/* ── ACCENT STRIP ── */}
        <div className="accent-strip">
          ⚡ Axial Flux Technology &nbsp;·&nbsp; Up to 94% Efficiency &nbsp;·&nbsp; 100+ Phases &nbsp;·&nbsp; Zero Cogging &nbsp;·&nbsp; Land · Sea · Air
        </div>

        {/* ── PRODUCTS ── */}
        <section className="section products-section" id="products">
          <div className="section-inner">
            <div className="section-label">Motor Technology</div>
            <h2 className="section-title">Our Products</h2>
            <div className="section-divider" />
            <p className="products-intro">
              Three products, one vision — advanced axial flux technology for electric vehicles and industrial applications.
              Click any product to view full specifications.
            </p>

            <div className="products-grid">
              {PRODUCTS.map(p => (
                <div
                  key={p.id}
                  className="product-card"
                  onClick={() => setActiveProduct(p)}
                  onKeyDown={e => e.key === 'Enter' && setActiveProduct(p)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View specs for ${p.name}`}
                >
                  <div className="product-img-wrap">
                    <img src={p.img} alt={p.name} loading="lazy" />
                    <span className="product-badge">{p.badge}</span>
                  </div>
                  <div className="product-info">
                    <div className="product-name">{p.name}</div>
                    <div className="product-desc">{p.desc}</div>
                    <div className="product-cta">
                      <button className="btn-specs" onClick={e => { e.stopPropagation(); setActiveProduct(p); }}>
                        View Specs
                      </button>
                      <button
                        className="btn-datasheet"
                        onClick={e => { e.stopPropagation(); alert('Datasheet coming soon. Contact info@agnimotors.com'); }}
                        title="Download Datasheet"
                      >
                        📄 Datasheet
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RACING ── */}
        <section className="section racing-section" id="racing">
          <div className="section-inner">
            <div className="racing-grid">
              <div>
                <div className="section-label">Performance Racing Heritage</div>
                <h2 className="section-title">Celebration<br />of Success</h2>
                <div className="section-divider" />
                <div className="race-date-badge"><span>🏁</span> June 12th, 2009</div>
                <p className="racing-body">
                  Agni Motors created history when Agni Racing were crowned champions at the inaugural TTXGP zero-emission motorcycle race. The first ever TTXGP was held on the world's toughest race track — the <strong>Isle of Man Mountain Circuit</strong>.
                </p>
                <p className="racing-body">
                  The e-bike, powered by two Agni motors, crossed the line 1st with a time of <strong>25m 53.5s</strong> and an average speed of <strong>87.43 mph</strong>.
                </p>
                <p className="racing-body">
                  In 2010, Agni didn't just win one race — Agni dominated the arena with multiple other bikes also running the Agni Motors motor.
                </p>
                <div className="race-achievements">
                  <div className="race-item"><span className="race-icon">🏆</span><span className="race-text">TTXGP UK Championship — Series Champion</span></div>
                  <div className="race-item"><span className="race-icon">🥉</span><span className="race-text">TTXGP World Championship Series — 3rd position, powering 80% of race bikes</span></div>
                  <div className="race-item"><span className="race-icon">🥈</span><span className="race-text">TTXGP USA Series — Runners Up</span></div>
                  <div className="race-item"><span className="race-icon">🏝️</span><span className="race-text">Isle of Man TT Zero — 2nd and 4th Position</span></div>
                </div>
              </div>
              <div>
                <div className="race-stat-cards">
                  <div className="race-stat"><div className="race-stat-value">87.43</div><div className="race-stat-label">Avg MPH<br />Isle of Man</div></div>
                  <div className="race-stat"><div className="race-stat-value">25:53</div><div className="race-stat-label">Race Time<br />Finish</div></div>
                  <div className="race-stat"><div className="race-stat-value">80%</div><div className="race-stat-label">TTXGP Bikes<br />Agni Powered</div></div>
                  <div className="race-stat"><div className="race-stat-value">2×</div><div className="race-stat-label">Agni Motors<br />per E-Bike</div></div>
                  <div className="race-stat" style={{gridColumn:'1/-1'}}>
                    <div className="race-stat-value" style={{fontSize:'1.4rem'}}>TTXGP 2009</div>
                    <div className="race-stat-label">Inaugural Zero-Emission Race — 1st Place</div>
                  </div>
                </div>
                <div style={{
                  marginTop:'1.25rem', borderRadius:'12px', overflow:'hidden',
                  border:'1px solid var(--border-color)',
                  background:'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-section-alt) 100%)',
                  height:'200px', display:'flex', alignItems:'center', justifyContent:'center',
                  flexDirection:'column', gap:'0.65rem', boxShadow:'var(--shadow-card)'
                }}>
                  <div style={{fontSize:'2.8rem'}}>🏍️</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:'0.76rem',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--text-muted)',textAlign:'center'}}>Isle of Man TT Zero — Race Archive</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:'0.72rem',color:'var(--accent-blue)'}}>agnimotors.com</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WORLD RECORDS ── */}
        <section className="section records-section" id="records">
          <div className="section-inner">
            <div className="section-label">Achievements</div>
            <h2 className="section-title">World Records</h2>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:'0.97rem',maxWidth:560,lineHeight:1.7,marginTop:'0.4rem',position:'relative',zIndex:1}}>
              Numerous world firsts and records across land, sea, and air.
            </p>
            <div className="records-grid">
              <div className="record-card">
                <div className="record-number">01</div>
                <div className="record-text">Agni Motors onboard the world's first manned electric helicopter</div>
                <div className="record-year">📅 August 12, 2011</div>
              </div>
              <div className="record-card">
                <div className="record-number">02</div>
                <div className="record-text">Aircraft powered by two Agni Motors held the world speed record for an electric aircraft at <strong style={{color:'rgba(255,255,255,0.95)'}}>283 KM/H</strong></div>
                <div className="record-year">✈️ Electric Aircraft Speed Record</div>
              </div>
              <div className="record-card">
                <div className="record-number">03</div>
                <div className="record-text">Sun 21 — the first solar powered boat to cross the Atlantic Ocean</div>
                <div className="record-year">📅 May 8, 2007</div>
              </div>
              <div className="record-card">
                <div className="record-number">04</div>
                <div className="record-text">Agni powered hydroplane: <strong style={{color:'rgba(255,255,255,0.95)'}}>68.09 MPH (2005)</strong> then <strong style={{color:'rgba(255,255,255,0.95)'}}>76.80 MPH (2008)</strong> — world unlimited electric water speed record. Held until 2018.</div>
                <div className="record-year">🌊 2005–2018 World Record Holder</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CEDRIC ── */}
        <section className="section cedric-section" id="cedric">
          <div className="section-inner">
            <div className="cedric-grid">
              <div className="cedric-photo-wrapper">
                <div className="cedric-photo">
                  <img
                    src="https://www.agnimotors.com/wp-content/uploads/2022/09/Cedric-Lynch-June-2009-1.jpg"
                    alt="Cedric Lynch"
                    onError={e => {
                      const t = e.currentTarget; t.style.display = 'none'
                      const p = t.parentElement
                      if (p) p.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:1rem;padding:2rem"><div style="font-size:4rem;opacity:0.25">👤</div><div style="font-family:'Barlow Condensed',sans-serif;font-size:0.76rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--text-muted);text-align:center">Cedric Lynch<br/>Isle of Man TT Zero, June 2009</div></div>`
                    }}
                  />
                  <div className="cedric-photo-caption">Cedric Lynch — Isle of Man, June 2009</div>
                </div>
              </div>
              <div>
                <div className="section-label">Pioneer</div>
                <h2 className="section-title">Cedric Lynch</h2>
                <div className="section-divider" />
                <blockquote className="cedric-quote">
                  "Globally recognised as a ground-breaking pioneer in electric motors … just Google him!"
                </blockquote>
                <div className="cedric-bio">
                  <p>The son of a London code-breaker who worked alongside Alan Turing deciphering the messages encrypted by the German Enigma machine in WWII, Cedric's interest in the electrical and the mechanical was apparent from a young age.</p>
                  <p>At 24, he entered a competition by the Institute of Mechanical Engineers and electrical firm Lucas to create a vehicle powered by two car batteries with the longest range. With a home-made motor built in his basement, Cedric's vehicle came second out of 50 entrants.</p>
                  <p>Further competitions saw him refine and develop his motor concept into the prototype Lynch Motor, using a permanent magnet and revolutionary axial flux technology that redefined electric motor architecture. The Lynch Motor went into small-scale production in 1988.</p>
                  <p>Working with Agni Motors from 2002, Cedric racked up a host of prestigious awards. Committed to social responsibility and the democratization of sustainable motor technologies, Cedric embodies the very heart and soul of Agni Motors.</p>
                </div>
                <div className="cedric-awards">
                  <span className="award-tag">🏆 Guinness World Record</span>
                  <span className="award-tag">✈️ World Electric Aircraft Speed Record</span>
                  <span className="award-tag">🏍️ TTXGP Champion</span>
                  <span className="award-tag">🥇 Mansura Medal</span>
                  <span className="award-tag">🚁 First Manned Electric Helicopter</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="section contact-section" id="contact">
          <div className="section-inner">
            <div className="section-label">Get in Touch</div>
            <h2 className="section-title">Contact Us</h2>
            <div className="section-divider" />
            <div className="contact-grid">
              <div className="contact-info-block">
                <div className="contact-row">
                  <span className="contact-icon">📧</span>
                  <div>
                    <div className="contact-detail-label">Email</div>
                    <div className="contact-detail-value"><a href="mailto:info@agnimotors.com">info@agnimotors.com</a></div>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="contact-icon">📍</span>
                  <div>
                    <div className="contact-detail-label">Address</div>
                    <div className="contact-detail-value">
                      Shed No. 37/38, Sector 1,<br />
                      Kandla Special Economic Zone (K.S.E.Z.),<br />
                      Gandhidham – 370230, Gujarat, India
                    </div>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="contact-icon">🏭</span>
                  <div>
                    <div className="contact-detail-label">Manufacturing</div>
                    <div className="contact-detail-value">
                      Designed and Manufactured with ❤️ in UK &amp; India.<br />
                      <span style={{fontSize:'0.84rem',color:'var(--text-muted)'}}>Factory established 2002 · Kandla SEZ, Gujarat</span>
                    </div>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="contact-icon">🌐</span>
                  <div>
                    <div className="contact-detail-label">Website</div>
                    <div className="contact-detail-value">
                      <a href="https://www.agnimotors.com" target="_blank" rel="noopener noreferrer">www.agnimotors.com</a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <iframe
                  className="map-embed"
                  src="https://maps.google.com/maps?q=agni+motors+kandla+sez&t=m&z=16&output=embed&iwloc=near"
                  title="Agni Motors — Kandla SEZ"
                  frameBorder="0"
                  scrolling="no"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-left">
          Designed and Manufactured with ❤️ in UK &amp; India.<br />
          All Rights Reserved © Agni Motors Ltd
        </div>
        <div className="footer-right">AGNI Motors — Axial Flux Technology</div>
      </footer>

      {/* ── PRODUCT MODAL ── */}
      {activeProduct && (
        <div
          className="modal-overlay"
          onClick={e => { if (e.target === e.currentTarget) setActiveProduct(null) }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProduct.name} specifications`}
        >
          <div className="modal">
            <div className="modal-header">
              <div className="modal-header-img">
                <img src={activeProduct.img} alt={activeProduct.name} />
              </div>
              <div className="modal-title-block">
                <div className="modal-product-name">{activeProduct.name}</div>
                <div className="modal-product-sub">{activeProduct.type}</div>
              </div>
              <button className="modal-close" onClick={() => setActiveProduct(null)} aria-label="Close">✕</button>
            </div>

            <div className="modal-body">
              <p className="modal-desc">{activeProduct.fullDesc}</p>

              <div className="specs-title">Specifications</div>
              <div className="specs-grid">
                {activeProduct.specs.map(s => (
                  <div className="spec-item" key={s.key}>
                    <div className="spec-key">{s.key}</div>
                    <div className="spec-val">
                      {s.val}
                      {s.unit && <span className="spec-unit">{s.unit}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-features">
                <div className="specs-title">Key Features</div>
                <ul className="feature-list">
                  {activeProduct.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal-primary" onClick={() => {
                setActiveProduct(null)
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Enquire About This Product
              </button>
              <button
                className="btn-modal-secondary"
                onClick={() => alert('Datasheet coming soon. Contact info@agnimotors.com for current specs.')}
              >
                📄 Download Datasheet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
