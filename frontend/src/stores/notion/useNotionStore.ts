import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotionStore = defineStore('notionStore', {
  state: () => ({
    notionButton: {
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
  }),
  actions: {
    async schedule(userId: string) {
      this.notionButton.disabled = true
      this.notionButton.text = 'Scheduling...'
      this.notionButton.tw_class.push('bg-grey-50')
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.post('/api/notion/ios_schedule', { userId }, config)
        if (response.data.success) {
          this.notionButton.tw_class = this.notionButton.tw_class.filter(
            (className) => className !== 'bg-grey-50'
          )
          this.notionButton.text = 'Plan Scheduled'
          this.notionButton.tw_class.push('border-green-500')
        }
      } catch (error) {
        this.notionButton.text = 'Schedule Plan'
        this.notionButton.tw_class.push('border-red-500')
        this.notionButton.disabled = false
        alert('Error scheduling plan');
      }
    }
  }
})
