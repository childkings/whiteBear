import { Ref } from 'vue';
import { loginVue } from '@/types/login'
import { routerStore } from '@/store/index'

export default function () {
  let type: Ref<loginVue.loginVueState> = ref('login')
  let windowBase: Ref<number> = ref(950)
  let viewWidth = ref(0)
  let account: Ref<string> = ref('')
  let email: Ref<string> = ref('')
  let password: Ref<string> = ref('')
  const routerS = routerStore()
  function stateChange() {
    if (type.value == 'login') {
      type.value = 'register'
    } else {
      type.value = 'login'
    }
  }
  function isWindowFn() {
    viewWidth.value = document.documentElement.clientWidth
    routerS.isWindow = viewWidth.value > windowBase.value
  }
  onMounted(() => {
    isWindowFn()
    window.addEventListener('resize', () => {
      isWindowFn()
    })
  })
  return {
    type, windowBase, viewWidth, account, email, password, stateChange
  }
}