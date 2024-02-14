import { defineStore } from 'pinia'
import axios from 'axios'

export const useButtonStore = defineStore('buttonStore', {
  state: () => ({
    scheduleButton: {
      text: 'Schedule Plan',
      disabled: false,
      tw_class: [
        'my-8',
        'flex',
        'relative',
        'flex-row',
        'items-center',
        'justify-center',
        'p-5',
        'rounded-lg',
        'border',
        'hover:bg-gray-50',
        'overflow-hidden',
      ]
    },
    connectAppleCalendarButton: {
      text: 'Connect',
      disabled: false,
    },
    connectNotionButton: {
      text: 'Link Notion',
      disabled: false,
    },
  }),
  actions: {
    async schedule(userId: string) {
      this.scheduleButton.disabled = true
      this.scheduleButton.text = 'Scheduling...'
      this.scheduleButton.tw_class.push('bg-grey-50')
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.post('/api/notion/schedule', { userId }, config)
        if (response.data.success) {
          this.scheduleButton.tw_class = this.scheduleButton.tw_class.filter(
            (className) => className !== 'bg-grey-50'
          )
          this.scheduleButton.text = 'Plan Scheduled'
          this.scheduleButton.tw_class.push('border-green-500')
        }
      } catch (error) {
        this.scheduleButton.text = 'Schedule Plan'
        this.scheduleButton.tw_class.push('border-red-500')
        this.scheduleButton.disabled = false
        alert('Error scheduling plan');
      }
    }
  }
})
