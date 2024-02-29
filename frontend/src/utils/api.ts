import axios from 'axios'

// Create an Axios instance
const apiClient = axios.create({
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json'
    // Additional headers
  }
})

// Request interceptor for API token
apiClient.interceptors.request.use(
  (config) => {
    // Ideally, retrieve your token from a store or local storage
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle global errors
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response
  },
  (error) => {
    // Handle errors
    if (error.response && error.response.status === 401) {
        // For instance, logout the user or redirect to login if unauthorized
        alert('Unauthenticated')
    }
    return Promise.reject(error)
  }
)

export default apiClient
