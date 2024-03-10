import { defineStore } from 'pinia';
import notionService from '@/services/notionService';

interface ButtonState {
  text: string;
  disabled: boolean;
}

interface PollingState {
  active: boolean;
  intervalId: number | null;
}

interface AccessCode {
  userId: string;
  code: string;
  redirect_uri: string;
}

export const useNotionStore = defineStore('notionStore', {
  state: (): {
    button: ButtonState;
    polling: PollingState;
  } => ({
    button: {
      text: 'Link Notion',
      disabled: false,
    },
    polling: {
      active: false,
      intervalId: null,
    },
  }),
  actions: {
    async getAccessToken(form: AccessCode) {
      try {
        const response = await notionService.getAccessToken(form);
        if (response.data.success) {
          localStorage.setItem('notionLinked', 'true');
          window.close();
        }else{
          alert(response.data.message);
        }
      } catch (error: any) {
        alert(error.response.data.message);
        localStorage.setItem('notionAuthStatus', 'failed');
        localStorage.setItem('notionAuthTab', 'false');
        window.close();
      }
    },
    checkNotionLinkStatus() {
      const isLinked = localStorage.getItem('notionLinked');
      if (isLinked) {
        this.button.text = 'Linked';
        this.button.disabled = true;
        localStorage.removeItem('notionLinked');
        if (this.polling.active) {
          if (this.polling.intervalId !== null) {
            clearInterval(this.polling.intervalId);
          }
          this.polling.active = false;
        }
      }
    },
    handleNotionOauth2() {
      this.button.disabled = true;
      this.button.text = 'Linking...';
      try {
        window.open(import.meta.env.VITE_NOTION_TEMPLATE_URL, '_blank');
        if (this.polling.active && this.polling.intervalId !== null) {
          clearInterval(this.polling.intervalId);
        }
        this.polling.intervalId = setInterval(() => this.checkNotionLinkStatus(), 1000) as unknown as number;
        this.polling.active = true;
      } catch (error) {
        console.error('Error linking Notion', error);
        this.button.text = 'Link Notion';
        this.button.disabled = false;
        if (this.polling.active && this.polling.intervalId !== null) {
          clearInterval(this.polling.intervalId);
        }
        this.polling.active = false;
      }
    }
  }
});
