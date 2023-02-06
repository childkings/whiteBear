type callbackType = (...args: any[]) => void
interface EventFace {
  on: (name: string, callback: callbackType) => void
  emit: (name: string, ...args: any[]) => void
}
interface List {
  [key: string]: callbackType[]
}

class EventBus implements EventFace {
  list: List
  constructor() {
    this.list = {}
  }
  on(name: string, callback: callbackType) {
    const temp = this.list[name] ? this.list[name] : []
    temp.push(callback)
    this.list[name] = temp
  }
  emit(name: string, ...args: any[]) {
    if (this.list[name]) {
      this.list[name].forEach((item) => {
        item(...args)
      })
    } else {
      console.log('该事件未监听')
    }
  }
}

export default new EventBus()