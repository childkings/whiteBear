import { defineStore } from 'pinia'
const router = useRouter()

export const routerStore = defineStore('base', {
  state() {
    return {
      windowHeaderState: true,
      headerState: true,
      footerState: false,
      isWindow: true,
      fullpath: '/',
      viewChangeList: [
        { id: 1, name: '首页', state: true, select: true, to: '/index' },
        { id: 2, name: '浮冰', state: true, select: false, to: '/chat' },
        { id: 3, name: '捕鱼', state: false, select: false, to: '/' }
      ]
    }
  },
  actions: {
    viewChangeFn(fullPath: string) {
      this.viewChangeList.forEach((item) => {
        if (item.to == fullPath) {
          item.select = true
        } else {
          item.select = false
        }
      })
    },
    viewChangeFalse() {
      this.viewChangeList.forEach((item) => {
        item.select = false
      })
    }
  },
  getters: {
  }
})