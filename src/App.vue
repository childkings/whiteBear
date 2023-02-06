<template>
  <headerCom v-show="routerS.fullpath != '/login'"></headerCom>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import headerCom from '@com/header.vue'
import useScreenTest from '@/hooks/useScreenTest.js'
import { routerStore } from '@/store/index' 
const routerS = routerStore()
useScreenTest()
</script>