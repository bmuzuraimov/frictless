<template>
  <div class="flex h-screen flex-row justify-center">
    <v-otp-input :model-value="code ? code.toString() : ''" variant="filled"></v-otp-input>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  data() {
    return {
      code: this.$route.query.code,
      email: this.$route.query.email
    }
  },
  mounted() {
    this.confirmCode()
  },
  methods: {
    async confirmCode() {
      if (this.code || this.email || (this.code && this.code.length === 6)) {
        try {
          const response = await axios.post('/api/confirm-code', {
            confirm_code: this.code,
            crypted_email: this.email
          })
          if (response.data.success) {
            this.$router.push('/login')
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
