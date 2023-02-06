import { createPinia } from 'pinia'
import piniaPlugin from '@/store/lasting'
const pinia = createPinia()
// pinia.use(piniaPlugin({
//   key: "pinia"
// }))
export default pinia