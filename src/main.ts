import { createApp } from 'vue'
import './style.css'
import '@/static/ico-font/style.css'
import App from './App.vue'
import pinia from '@/store/store'
// import { routerStore } from '@/store/index'
// import { ElButton, ElInput, ElPopper } from 'element-plus'
// import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/router/index'

const app = createApp(App)

app.use(pinia)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
