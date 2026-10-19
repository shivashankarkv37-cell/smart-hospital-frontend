import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div>
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark" aria-hidden="true">+</span>
            <span>CareBridge<span className="brand-subtitle">HOSPITAL</span></span>
          </Link>
          <p className="footer-note">
            A student portfolio demonstration. Hospital details and services shown here are sample content.
          </p>
        </div>
        <div className="footer-contact">
          <h2>Contact &amp; support</h2>
          <p>For urgent emergencies, contact your local emergency service.</p>
          <a href="mailto:support@carebridge.example">support@carebridge.example</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© CareBridge Hospital</span>
        <span>Designed for a healthier, simpler visit.</span>
      </div>
    </footer>
  )
}

export default Footer
