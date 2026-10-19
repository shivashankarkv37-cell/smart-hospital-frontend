import { Link } from 'react-router-dom'

function Doctors() {
  return (
    <section className="placeholder-page">
      <div className="container placeholder-content">
        <p className="eyebrow">MEET YOUR CARE TEAM</p>
        <h1>Find a doctor</h1>
        <p>
          The doctor directory is a placeholder for Day 1. Doctor profiles and appointment booking are not connected yet.
        </p>
        <Link className="button" to="/">Back to home</Link>
      </div>
    </section>
  )
}

export default Doctors
