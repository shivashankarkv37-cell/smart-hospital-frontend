import { Link } from 'react-router-dom'
import BackendStatus from '../components/BackendStatus.jsx'

const departments = [
  { name: 'Cardiology', description: 'Heart and circulation care', icon: '♡' },
  { name: 'Pediatrics', description: 'Care for infants and children', icon: '✳' },
  { name: 'Orthopedics', description: 'Bone, joint, and mobility care', icon: '⌁' },
  { name: 'Neurology', description: 'Brain and nervous system care', icon: '◉' },
]

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" />CARE THAT MOVES WITH YOU</p>
            <h1>Better care begins with a <span>better visit.</span></h1>
            <p className="hero-description">
              Meet the right care team, explore hospital departments, and spend less time wondering what comes next.
              We’re building a simpler way to plan your hospital visit.
            </p>
            <div className="hero-actions">
              <Link className="button" to="/doctors">Book an Appointment <span aria-hidden="true">→</span></Link>
              <Link className="button button-secondary" to="/doctors">Find a Doctor</Link>
            </div>
            <BackendStatus />
          </div>
          <div className="hero-art" aria-label="Illustration of a hospital care team" role="img">
            <div className="hero-sun" />
            <div className="hero-circle hero-circle-one" />
            <div className="hero-circle hero-circle-two" />
            <div className="hero-building">
              <span className="building-cross" aria-hidden="true">+</span>
              <span className="building-window window-one" />
              <span className="building-window window-two" />
              <span className="building-window window-three" />
              <span className="building-window window-four" />
              <span className="building-door" />
            </div>
            <div className="hero-plant plant-one"><span /><span /><i /></div>
            <div className="hero-plant plant-two"><span /><span /><i /></div>
            <div className="hero-label"><span className="label-dot" />Here for your health</div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Our care values">
        <div className="container trust-items">
          <p><span aria-hidden="true">✦</span> People-first care</p>
          <p><span aria-hidden="true">✦</span> Coordinated teams</p>
          <p><span aria-hidden="true">✦</span> A clearer care journey</p>
        </div>
      </section>

      <section className="section section-departments">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE OUR CARE</p>
              <h2>Here for every part of your health.</h2>
            </div>
            <Link className="text-link" to="/departments">View all departments <span aria-hidden="true">→</span></Link>
          </div>
          <div className="department-grid">
            {departments.map((department) => (
              <Link className="department-card" to="/departments" key={department.name}>
                <span className="department-icon" aria-hidden="true">{department.icon}</span>
                <h3>{department.name}</h3>
                <p>{department.description}</p>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section visit-section">
        <div className="container visit-grid">
          <div className="visit-illustration" aria-hidden="true">
            <div className="visit-calendar">
              <span className="calendar-top" />
              <span className="calendar-check">✓</span>
              <span className="calendar-line line-one" />
              <span className="calendar-line line-two" />
              <span className="calendar-line line-three" />
            </div>
            <div className="visit-clock">12<span>min</span></div>
            <div className="visit-sparkle">✦</div>
          </div>
          <div className="visit-copy">
            <p className="eyebrow">A MORE THOUGHTFUL VISIT</p>
            <h2>Your time matters, from check-in to follow-up.</h2>
            <p>
              This project is designed to bring appointment planning and queue updates into one clear experience.
              Those features are not active yet; today’s version is the starting point for the patient-facing website.
            </p>
            <Link className="text-link" to="/login">Explore the sign-in preview <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
