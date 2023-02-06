import { defineStore } from 'pinia'

export const routerStore = defineStore('base', {
  state() {
    return {
      windowHeaderState: true,
      headerState: true,
      footerState: false,
      isWindow: true,
      fullpath: '/',
    }
  },
  actions: {

  },
  getters: {

  }
})