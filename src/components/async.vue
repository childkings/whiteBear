<template>
  <slot :data="data"></slot>
</template>

<script lang="ts" setup>
import http from '@/utils/server'
import { request } from '@/types/request'
import { Ref } from 'vue';

const requestObj:Ref<request.asyncRequest | undefined> = ref<request.asyncRequest>({
  url: '',
  requestType: 'get',
  params: {}
})
const data:request.requestParams = ref([])
requestObj.value = (inject('requestDataObj') as request.asyncRequestRef).value
const requestFn = async() => {
  data.value = []
  const temp = await http.dynamicType(requestObj.value!.url, requestObj.value!.requestType, requestObj.value?.params) as any
  data.value = temp.data
}
await requestFn()
</script>