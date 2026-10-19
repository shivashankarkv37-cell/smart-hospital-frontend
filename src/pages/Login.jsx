import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [fieldErrors, setFieldErrors] = useState({})
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name } = event.target
    setFieldErrors((currentErrors) => {
      if (!currentErrors[name]) return currentErrors
      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      return nextErrors
    })
    setMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')
    const errors = {}

    if (!email) {
      errors.email = 'Enter your email address.'
    } else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address.'
    }

    if (!password.trim()) {
      errors.password = 'Enter your password.'
    }

    setFieldErrors(errors)
    setMessage(
      Object.keys(errors).length > 0
        ? ''
        : 'Login is a preview only; authentication is not connected and no login was performed.',
    )
  }

  return (
    <section className="form-page">
      <div className="form-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Log in to CareBridge</h1>
        <p className="form-intro">Use the form preview to see the sign-in experience.</p>
        <form className="account-form" noValidate onSubmit={handleSubmit} onChange={handleChange}>
          <label htmlFor="login-email">Email address <span aria-hidden="true">*</span></label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
            aria-invalid={fieldErrors.email ? 'true' : undefined}
            aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
          />
          {fieldErrors.email && <p className="field-error" id="login-email-error">{fieldErrors.email}</p>}

          <label htmlFor="login-password">Password <span aria-hidden="true">*</span></label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={fieldErrors.password ? 'true' : undefined}
            aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
          />
          {fieldErrors.password && <p className="field-error" id="login-password-error">{fieldErrors.password}</p>}

          <button className="button form-submit" type="submit">Log in</button>
          {message && <p className="form-message" role="status">{message}</p>}
        </form>
        <p className="form-switch">New to CareBridge? <Link to="/register">Create an account</Link></p>
        <p className="form-demo-note">Demo only: your details are not sent to a server or saved.</p>
      </div>
    </section>
  )
}

export default Login
