<template>
  <slot :data="data"></slot>
</template>

<script lang="ts" setup>
import http from '@/utils/server'
import { request } from '@/types/request'
import { Ref } from 'vue';
import { routerStore } from '@/store/index';

const routerS = routerStore()
const requestObj:Ref<request.asyncRequest | undefined> = ref<request.asyncRequest>({
  url: '',
  requestType: 'get',
  params: {}
})
const data:request.requestParams = ref([])
requestObj.value = (inject('requestDataObj') as request.asyncRequest)
const requestFn = async() => {
  data.value = []
  // routerS.isLoad = true
  const temp = await http.dynamicType(requestObj.value!.url, requestObj.value!.requestType, requestObj.value?.params) as any
  data.value = temp.data
  routerS.isLoad = false
}
await requestFn()
// await watch(requestObj, ()=>{
//   requestFn()
// }, {
//   deep: true
// })
</script>