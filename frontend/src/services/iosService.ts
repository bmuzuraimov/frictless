import apiClient from '@/utils/api'

interface credentialInterface {
  userId: string
  email: string
  password: string
}

export default {
  async set_ios_credentials(credentials: credentialInterface) {
    return await apiClient.post('/api/user/calendar/ios', credentials)
  },
}