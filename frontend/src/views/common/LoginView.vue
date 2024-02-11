<template>
  <ToastSuccess
    :visible="showToast"
    :message="toastMessage"
    :toastType="toastType"
    @close="showToast = false"
  >
  </ToastSuccess>
  <main class="w-full h-screen flex flex-col items-center justify-center bg-gray-50 px-2 sm:px-4">
    <div class="w-full font-ourfit space-y-4 text-gray-600 sm:max-w-md md:max-w-lg">
      <div class="backdrop-blur-sm bg-white/20 shadow-lg p-6 space-y-6 sm:p-8 sm:rounded-lg">
        <div class="text-center">
          <img src="@/assets/images/logo.png" width="120" class="mx-auto" />
          <div class="mt-4 space-y-3">
            <h3 class="text-primary-700 text-xl font-bold md:text-2xl">
              {{ isSigningUp ? 'Sign up for a new account' : 'Log in to your account' }}
            </h3>
          </div>
        </div>
        <form @submit.prevent="authenticate" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              v-model="user.email"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              v-model="user.password"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              :disabled="isLoading"
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {{
                isLoading
                  ? isSigningUp
                    ? 'Signing up...'
                    : 'Signing in...'
                  : isSigningUp
                    ? 'Sign up'
                    : 'Sign in'
              }}
            </button>
          </div>
        </form>
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500"> Or continue with </span>
          </div>
        </div>
        <div>
          <button
            class="w-full flex items-center justify-center gap-x-2 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <img
              src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
              alt="Google"
              class="w-4 h-4"
            />
            Continue with Google
          </button>
        </div>
        <p class="text-sm text-center md:text-base">
          {{ isSigningUp ? 'Already have an account?' : "Don't have an account?" }}
          <a
            href="javascript:void(0)"
            class="font-medium text-secondary-600 hover:text-secondary-500"
            @click="toggleSignup"
            >{{ isSigningUp ? 'Log in' : 'Sign up' }}</a
          >
        </p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import ToastSuccess from '@/components/common/home/ToastSuccess.vue'
import axios from 'axios'

export default {
  name: 'AuthForm',
  components: {
    ToastSuccess
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        timezone: ''
      },
      isLoading: false,
      isSigningUp: false,
      showToast: false,
      toastMessage: '',
      toastType: ''
    }
  },
  methods: {
    async authenticate() {
      this.isLoading = true
      const url = this.isSigningUp ? '/api/auth/sign-up' : '/api/auth/login'
      try {
        this.user.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const response = await axios.post(url, this.user);
        this.showToast = true
        this.toastMessage = response.data.message
        this.toastType = 'success'
        if (this.isSigningUp && response.data.success) {
          setTimeout(() => {
            this.$router.push('/confirm-code?email=' + this.user.email)
          }, 1000)
        } else if (!this.isSigningUp && response.data.success) {
          localStorage.setItem('token', response.data.token)
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1000)
        }
      } catch (error) {
        this.showToast = true
          this.toastMessage = (error as any).response.data.message;
          this.toastType = 'error'
        setTimeout(() => {
          this.showToast = false
        }, 3000)
      } finally {
        this.isLoading = false
      }
    },
    toggleSignup() {
      this.isSigningUp = !this.isSigningUp
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$router.push('/dashboard')
    }
  }
}
</script>
