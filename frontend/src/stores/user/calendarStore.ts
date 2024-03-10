import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendarStore', {
  state: () => ({
    connectAppleCalendarButton: {
      text: 'Connect',
      disabled: false,
    },
    is_modal: false,
  }),
  actions: {
    toggleModal(){
        this.is_modal = !this.is_modal;
    },
  }
})
