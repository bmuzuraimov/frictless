import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    tokenVerificationCache: {
        lastChecked: Date | null;
        isValid: boolean;
    };
  }
}