import { defineStore } from 'pinia'
import scheduleService from '@/services/scheduleService'

export const useSchedulerStore = defineStore('schedulerStore', {
  state: () => ({
    button: {
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
        'overflow-hidden'
      ]
    }
  }),
  actions: {
    async schedule(userId: string) {
      this.button.disabled = true
      this.button.text = 'Scheduling...'
      this.button.tw_class.push('bg-grey-50')
      const response = await scheduleService.schedule(userId)
      if (response.data.success) {
        this.button.tw_class = this.button.tw_class.filter(
          (className) => className !== 'bg-grey-50'
        )
        this.button.text = 'Plan Scheduled'
        this.button.tw_class.push('border-green-500')
      }
    }
  }
})
