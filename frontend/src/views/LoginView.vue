<template>
  <ToastSuccess
    :visible="showToast"
    :message="toastMessage"
    :toastType="toastType"
    @close="showToast = false"
  >
  </ToastSuccess>
  <main class="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
    <div class="w-full font-ourfit space-y-6 text-gray-600 sm:max-w-md">
      <div class="text-center">
        <img src="@/assets/images/logo.png" width="150" class="mx-auto" />
        <div class="mt-5 space-y-2">
          <h3 class="text-primary-700 text-2xl font-bold sm:text-3xl">
            {{ isSigningUp ? 'Sign up for a new account' : 'Log in to your account' }}
          </h3>
          <p>
            {{ isSigningUp ? 'Already have an account?' : "Don't have an account?" }}
            <a
              href="javascript:void(0)"
              class="font-medium text-indigo-600 hover:text-indigo-500"
              @click="toggleSignup"
              >{{ isSigningUp ? 'Log in' : 'Sign up' }}</a
            >
          </p>
        </div>
      </div>
      <div class="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
        <div class="mt-5">
          <button
            class="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <img
              src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
              alt="Google"
              class="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>
        <div class="relative">
          <span class="block w-full h-px bg-gray-300"></span>
          <p class="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
            Or continue with
          </p>
        </div>
        <form @submit.prevent="authenticate" class="space-y-5">
          <div>
            <label class="font-medium">Email</label>
            <input
              type="email"
              v-model="user.email"
              required
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label class="font-medium">Password</label>
            <input
              type="password"
              v-model="user.password"
              required
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            :disabled="isLoading"
            type="submit"
            class="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
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
        </form>
      </div>
      <div class="text-center">
        <a href="javascript:void(0)" class="hover:text-indigo-600">Forgot password?</a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import ToastSuccess from '@/components/home/ToastSuccess.vue'
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
        password: ''
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
      const url = this.isSigningUp ? '/api/sign-up' : '/api/login'

      try {
        const response = await axios.post(url, this.user)
        this.showToast = true
        this.toastMessage = response.data.message
        this.toastType = response.data.success ? 'success' : 'error'
        if (this.isSigningUp && response.data.success) {
          setTimeout(() => {
            this.$router.push('/confirm-code?email=' + this.user.email)
          }, 1000)
        } else if (!this.isSigningUp && response.data.success) {
          localStorage.setItem('token', response.data.token);
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1000)
        }
      } catch (error) {
        alert(error)
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
