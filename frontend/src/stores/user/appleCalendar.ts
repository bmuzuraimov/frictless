import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppleCalendar = defineStore('appleCalendar', {
  state: () => ({
    submitAppleCalendarButton: {
      text: 'Save',
      disabled: false,
      tw_class: []
    },
    formData: {
      userId: '',
      ios_email: '',
      ios_password: ''
    }
  }),
  actions: {
    async submitAppleCalendar() {
      try {
        this.submitAppleCalendarButton.disabled = true
        this.submitAppleCalendarButton.text = 'Saving...'
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const response = await axios.post('/api/user/calendar/apple', this.formData, config)
        if (response.data.success) {
          this.submitAppleCalendarButton.text = 'Saved'
        } else {
          this.submitAppleCalendarButton.disabled = false
          this.submitAppleCalendarButton.text = 'Save'
          alert('Error saving to Apple Calendar')
        }
      } catch (error:any) {
        this.submitAppleCalendarButton.disabled = false
        this.submitAppleCalendarButton.text = 'Save'
        alert(error.response.data.message)
      }
    },
    async get_ios_email(userId: string) {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/api/user/calendar/apple', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { userId }
        })
        if (response.data.success) {
          this.formData.ios_email = response.data.ios_email;
        } else {
          return ''
        }
      } catch (e) {
        return ''
      }
    }
  }
})
