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
    return response
  },
  (error) => {
    if (error.response) {
      return error.response
    } else {
      return { data: { success: false, message: 'Something went wrong' } }
    }
  }
)

export default apiClient
