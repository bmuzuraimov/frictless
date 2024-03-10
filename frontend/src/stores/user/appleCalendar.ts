import { defineStore } from 'pinia'
import iosService from '@/services/iosService'

export const useAppleCalendar = defineStore('appleCalendar', {
  state: () => ({
    sbmt_btn: {
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
    async submitAppleCalendar(formData: any) {
      this.sbmt_btn.disabled = true
      this.sbmt_btn.text = 'Saving...'
      const response = await iosService.set_ios_credentials(formData)
      if (response.data.success) {
        this.sbmt_btn.text = 'Saved'
      } else {
        this.sbmt_btn.disabled = false
        this.sbmt_btn.text = 'Save'
        alert('Error saving to Apple Calendar')
      }
    }
  }
})
