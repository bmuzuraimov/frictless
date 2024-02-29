import axios from 'axios'

// Create an Axios instance
const apiClient = axios.create({
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
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
    if (error.response && error.response.status === 400) {
      alert(error.response.data.message)
    } else if (error.response && error.response.status === 401) {
      alert(error.response.data.message)
    } else if (error.response && error.response.status === 403) {
      alert(error.response.data.message)
    } else if (error.response && error.response.status === 404) {
      alert(error.response.data.message)
    } else if (error.response && error.response.status === 405) {
      alert(error.response.data.message)
    } else if (error.response && error.response.status === 500) {
      alert(error.response.data.message)
    }
    return Promise.reject(error.response.data.message)
  }
)

export default apiClient
