<template>
  <slot :data="data"></slot>
</template>

<script lang="ts" setup>
import http from '@/utils/server'
import {request} from '@/types/request'

const request:request.asyncRequest | undefined = inject('dataListRequest')
const requestType = request!.requestType
// http[requestType]
const {data} = await http.dynamicType(requestType, request!.url, request?.params) as any
console.log(data)
</script>