import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
})

export function getHealth() {
  return api.get('/health')
}

export function registerUser(payload) {
  return api.post('/auth/register', payload)
}

export default api
