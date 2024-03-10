import apiClient from '@/utils/api'

interface AccessCode {
  userId: string;
  code: string;
  redirect_uri: string;
}

export default {
  async getAccessToken(form: AccessCode) {
    return await apiClient.post('/api/notion/callback', form)
  },
}