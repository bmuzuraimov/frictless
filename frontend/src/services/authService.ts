import apiClient from '@/utils/api'

interface credentialInterface {
  email: string
  password: string
}

interface confirmFormInterface {
  confirm_code: string
  crypted_email: string
}

export default {
  async login(credentials: credentialInterface) {
    return await apiClient.post('/api/auth/login', credentials)
  },
  async register(credential: credentialInterface) {
    return await apiClient.post('/api/auth/register', credential)
  },
  async confirm_email(form: confirmFormInterface) {
    return await apiClient.post('/api/auth/confirm-code', form)
  },
  async setReferral(ref: string) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return await apiClient.post('/api/auth/referral', { ref, timezone })
  },
  async setWaitlist(email: string) {
    return await apiClient.post('/api/user/waitlist', { email })
  }
}
