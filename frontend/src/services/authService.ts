import apiClient from '@/utils/api'

interface credentialInterface {
    email: string;
    password: string;
}

export default {
    async login(credentials: credentialInterface) {
        const response = await apiClient.post('/api/auth/login', credentials)
        return response.data
    },
    async register(credential: credentialInterface) {
        const response = await apiClient.post('/api/auth/sign-up', credential)
        return response.data
    },
}