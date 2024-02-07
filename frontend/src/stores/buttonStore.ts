import { defineStore } from 'pinia'
import axios from 'axios'

export const useButtonStore = defineStore('buttonStore', {
  state: () => ({
    scheduleButton: {
      text: 'Schedule Plan',
      disabled: false,
      tw_class: [
        'flex',
        'flex-row',
        'items-center',
        'justify-center',
        'p-5',
        'rounded-lg',
        'border',
        'hover:bg-gray-50'
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
    submitAppleCalendarButton: {
      text: 'Save',
      disabled: false,
      tw_class: [
      ]
    }
  }),
  actions: {
    async submitAppleCalendar(formData: object) {
        try{
            this.submitAppleCalendarButton.disabled = true;
            this.submitAppleCalendarButton.text = 'Saving...';
            const response = await axios.post('/api/calendar/apple', formData);
            if(response.data.success){
                this.submitAppleCalendarButton.text = 'Saved';
            }else{
                this.submitAppleCalendarButton.disabled = false;
                this.submitAppleCalendarButton.text = 'Save';
              alert('Error saving to Apple Calendar');
            }
          }catch(e){
            alert('Error saving to Apple Calendar');
          }
    },
      async get_ios_email(userId: string) {
        try{
            const response = await axios.get('/api/calendar/apple', { params: { userId } });
            if(response.data.success){
                return response.data.email;
            }else{
                return '';
            }
          }catch(e){
            return '';
          }
    },
    async schedule(userId: string) {
      this.scheduleButton.disabled = true
      this.scheduleButton.text = 'Scheduling...'
      this.scheduleButton.tw_class.push('bg-grey-50')
      try {
        const response = await axios.post('/api/schedule', { userId })
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
