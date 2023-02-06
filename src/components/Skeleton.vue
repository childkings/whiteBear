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
      <div style="width: 100%;padding-left: 20px;padding-top: 12px;">
        <div style="width: 80%">
          <el-skeleton :rows="3" />
        </div>
      </div>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>

const SkeletonVue = defineAsyncComponent({
  loader: ()=> import('@/components/async.vue')
})

</script>