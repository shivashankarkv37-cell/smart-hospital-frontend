import { useEffect, useState } from 'react'
import { getHealth } from '../services/api.js'

function BackendStatus() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    getHealth()
      .then(() => {
        if (isMounted) {
          setStatus('connected')
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus('unavailable')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const statusDetails = {
    loading: { label: 'Checking backend…', className: 'status-loading' },
    connected: { label: 'Backend Connected', className: 'status-connected' },
    unavailable: { label: 'Backend Unavailable', className: 'status-unavailable' },
  }
  const currentStatus = statusDetails[status]

  return (
    <div className={`backend-status ${currentStatus.className}`} role="status" aria-live="polite">
      <span className="status-indicator" aria-hidden="true" />
      <span>{currentStatus.label}</span>
      {status === 'unavailable' && (
        <span className="status-hint">Start the Spring Boot API to check the connection.</span>
      )}
    </div>
  )
}

export default BackendStatus
