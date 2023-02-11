<template>
  <Suspense v-if="isLoad">
    <template #default>
      <SkeletonVue>
        <template #default="{ data }">
          <slot :data="data"></slot>
        </template>
      </SkeletonVue>
    </template>
    <template #fallback>
      <div style="width: 100%;padding-left: 20px;padding-top: 12px;">
        <div style="width: 80%">
          <el-skeleton :rows="3" />
        </div>
      </div>
    </template>
  </Suspense>
  <Suspense v-else>
    <template #default>
      <SkeletonVue>
        <template #default="{ data }">
          <slot :data="data"></slot>
        </template>
      </SkeletonVue>
    </template>
    <template #fallback>
      <div style="width: 100%;padding-left: 20px;padding-top: 12px;">
        <div style="width: 80%">
          <el-skeleton :rows="3" />
        </div>
      </div>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { routerStore } from '@/store/index';
// import type { Ref } from 'vue'

const routerS = routerStore()
defineProps<{
  isLoad: boolean
}>()
const SkeletonVue = defineAsyncComponent({
  loader: ()=> import('@/components/Async.vue')
})

</script>