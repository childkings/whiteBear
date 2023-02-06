<template>
  <Suspense>
    <template #default>
      <SkeletonVue>
        <template #default="{ data }">
          <slot :data="data"></slot>
        </template>
      </SkeletonVue>
    </template>
    <template #fallback>
      <el-skeleton :rows="4" />
    </template>
  </Suspense>
</template>

<script lang="ts" setup>

const SkeletonVue = defineAsyncComponent({
  loader: ()=> import('@/components/async.vue')
})

</script>