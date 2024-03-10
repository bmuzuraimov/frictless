<template>
  <div class="flex h-screen flex-row justify-center">
    <v-otp-input
      :model-value="code ? code.toString() : ''"
      type="number"
      :length="6"
      variant="filled"
    ></v-otp-input>
  </div>
</template>

<script lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/common/authStore';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

    const code = computed(() => route.query.code);
    const email = computed(() => route.query.email);

    watch(code, (newCode) => {
      if (newCode && newCode.length === 6) {
        confirmCode();
      }
    }, { immediate: true });

    async function confirmCode() {
      const data = await authStore.confirm_email({
        confirm_code: code.value,
        crypted_email: email.value,
      });
      if (data.success) {
        alert('Email confirmed successfully');
        router.push('/login');
      } else {
        alert(data.message);
      }
    }

    return {
      code
    };
  }
}
</script>