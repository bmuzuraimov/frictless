<template>
  <ToastMessage
    :visible="showToast"
    :message="toastMessage"
    :toastType="toastType"
    @close="showToast = false"
  />
  <div class="flex h-screen flex-row justify-center">
    <v-otp-input
      @change="confirmCode"
      :model-value="code ? code.toString() : ''"
      variant="filled"
    ></v-otp-input>
  </div>
</template>

<script lang="ts">
import ToastMessage from '@/components/common/home/ToastMessage.vue'
import axios from 'axios'
export default {
  components: {
    ToastMessage
  },
  data() {
    return {
      code: this.$route.query.code,
      email: this.$route.query.email,
      showToast: false,
      toastMessage: '',
      toastType: ''
    }
  },
  mounted() {
    this.confirmCode()
  },
  methods: {
    async confirmCode() {
      if (this.code && this.email && this.code.length === 6) {
        try {
          const response = await axios.post('/api/auth/confirm-code', {
            confirm_code: this.code,
            crypted_email: this.email
          })
          if (response.data.success) {
            this.toastType = 'success';
            this.toastMessage = "Your account has been verified successfully!";
            this.showToast = true;
            setTimeout(() => {
              this.showToast = false;
              this.$router.push('/login')
            }, 3000)
          } else {
            alert(response.data.message)
          }
        } catch (error) {
          alert(error)
        }
      }
    }
  }
}
</script>
