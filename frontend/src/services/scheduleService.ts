import apiClient from '@/utils/api'

export default {
  async schedule(userId: string) {
    return await apiClient.post('/api/notion/schedule', { userId })
  },
}