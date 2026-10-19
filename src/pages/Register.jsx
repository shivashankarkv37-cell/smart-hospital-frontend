import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/api.js'

const fieldLabels = {
  fullName: 'Full name',
  email: 'Email address',
  phone: 'Phone number',
  password: 'Password',
  confirmPassword: 'Confirm password',
}

function validateRegistration(values) {
  const errors = {}
  const fullName = values.fullName.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()

  if (!fullName) {
    errors.fullName = 'Enter your full name.'
  } else if (fullName.length < 2 || fullName.length > 100) {
    errors.fullName = 'Name must be between 2 and 100 characters.'
  } else if (!/^\p{L}[\p{L} .'-]*$/u.test(fullName)) {
    errors.fullName = 'Use letters, spaces, periods, apostrophes, or hyphens only.'
  }

  if (!email) {
    errors.email = 'Enter your email address.'
  } else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!phone) {
    errors.phone = 'Enter your phone number.'
  } else if (!/^\+?[1-9]\d{7,14}$/.test(phone)) {
    errors.phone = 'Use 8–15 digits, optionally starting with +. Do not include spaces.'
  }

  if (!values.password.trim()) {
    errors.password = 'Enter a password.'
  } else if (values.password.length < 8 || values.password.length > 72) {
    errors.password = 'Password must be between 8 and 72 characters.'
  } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(values.password)) {
    errors.password = 'Password must contain at least one letter and one number.'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

function Register() {
  const formRef = useRef(null)
  const submitLock = useRef(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitLock.current) return

    const formData = new FormData(event.currentTarget)
    const values = {
      fullName: String(formData.get('fullName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      password: String(formData.get('password') ?? ''),
      confirmPassword: String(formData.get('confirmPassword') ?? ''),
    }
    const validationErrors = validateRegistration(values)

    setFieldErrors(validationErrors)
    setMessage('')
    if (Object.keys(validationErrors).length > 0) return

    submitLock.current = true
    setIsSubmitting(true)

    try {
      await registerUser({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      })
      formRef.current?.reset()
      setFieldErrors({})
      setMessageType('success')
      setMessage('Your account has been created. You can now log in.')
    } catch (error) {
      const status = error.response?.status
      const responseData = error.response?.data

      if (status === 400 && responseData?.errors && typeof responseData.errors === 'object') {
        const backendFieldErrors = {}
        for (const [field, errorMessage] of Object.entries(responseData.errors)) {
          if (fieldLabels[field] && typeof errorMessage === 'string') {
            backendFieldErrors[field] = errorMessage
          }
        }
        setFieldErrors(backendFieldErrors)
        setMessage(
          Object.keys(backendFieldErrors).length > 0
            ? 'Please correct the highlighted fields.'
            : responseData.message || 'The server rejected the submitted details.',
        )
        setMessageType('error')
      } else if (status === 409) {
        setFieldErrors({ email: 'An account with this email already exists. Try logging in.' })
        setMessage('')
      } else if (status === 401 || status === 403) {
        setMessage('The server did not authorize this registration. Please try again or contact support.')
        setMessageType('error')
      } else if (!error.response) {
        setMessage('Could not reach the hospital server. Check that Spring Boot is running and try again.')
        setMessageType('error')
      } else {
        setMessage('The server could not complete registration. Please try again later.')
        setMessageType('error')
      }
    } finally {
      submitLock.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <section className="form-page">
      <div className="form-card form-card-wide">
        <p className="eyebrow">GET STARTED</p>
        <h1>Create your account</h1>
        <p className="form-intro">Create a patient account to get started.</p>
        <form ref={formRef} className="account-form" noValidate onSubmit={handleSubmit} onChange={handleChange}>
          <label htmlFor="register-name">Full name <span aria-hidden="true">*</span></label>
          <input
            id="register-name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            maxLength={100}
            disabled={isSubmitting}
            aria-invalid={fieldErrors.fullName ? 'true' : undefined}
            aria-describedby={fieldErrors.fullName ? 'register-name-error' : undefined}
          />
          {fieldErrors.fullName && <p className="field-error" id="register-name-error">{fieldErrors.fullName}</p>}

          <label htmlFor="register-email">Email address <span aria-hidden="true">*</span></label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
            disabled={isSubmitting}
            aria-invalid={fieldErrors.email ? 'true' : undefined}
            aria-describedby={fieldErrors.email ? 'register-email-error' : undefined}
          />
          {fieldErrors.email && <p className="field-error" id="register-email-error">{fieldErrors.email}</p>}

          <label htmlFor="register-phone">Phone number <span aria-hidden="true">*</span></label>
          <input
            id="register-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Your phone number"
            disabled={isSubmitting}
            aria-invalid={fieldErrors.phone ? 'true' : undefined}
            aria-describedby={fieldErrors.phone ? 'register-phone-error' : undefined}
          />
          {fieldErrors.phone && <p className="field-error" id="register-phone-error">{fieldErrors.phone}</p>}

          <label htmlFor="register-password">Password <span aria-hidden="true">*</span></label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            disabled={isSubmitting}
            aria-invalid={fieldErrors.password ? 'true' : undefined}
            aria-describedby={fieldErrors.password ? 'register-password-error' : 'register-password-hint'}
          />
          {fieldErrors.password
            ? <p className="field-error" id="register-password-error">{fieldErrors.password}</p>
            : <p className="field-hint" id="register-password-hint">Use 8–72 characters, with at least one letter and one number.</p>}

          <label htmlFor="confirm-password">Confirm password <span aria-hidden="true">*</span></label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Enter the password again"
            disabled={isSubmitting}
            aria-invalid={fieldErrors.confirmPassword ? 'true' : undefined}
            aria-describedby={fieldErrors.confirmPassword ? 'register-confirm-password-error' : undefined}
          />
          {fieldErrors.confirmPassword && (
            <p className="field-error" id="register-confirm-password-error">{fieldErrors.confirmPassword}</p>
          )}

          <button className="button form-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
          {message && (
            <p className={`form-message form-message-${messageType}`} role={messageType === 'error' ? 'alert' : 'status'}>
              {message}
            </p>
          )}
        </form>
        <p className="form-switch">Already have an account? <Link to="/login">Log in</Link></p>
        <p className="form-demo-note">Your details are submitted to the hospital API. Passwords are not saved in this browser.</p>
      </div>
    </section>
  )
}

export default Register
