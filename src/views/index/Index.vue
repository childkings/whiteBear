<template>
  <div class="container">
    <div class="content_box">
      <div class="type_select_box">
        <div v-for="item in typeSelectList" :key="item.id"  :style="{color: item.select ? 'rgb(113, 168, 246)': 'rgb(119, 119, 119)'}" @click="typeSelectChange(item.id)">
          {{ item.type }}
        </div>
        <div class="up_time_box" v-show="typeSelectList[2].select">
          <el-select v-model="typeSelectList[2].time" class="m-2" placeholder="Select" size="small">
            <el-option
              v-for="item in timeSelectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="content_subject">
        <SkeletonVue>
          <template #default="{data}">
            <h1>{{ data }}</h1>
          </template>
        </SkeletonVue>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routerStore } from '@/store/index';
import { indexVue } from '@/types/index'
import SkeletonVue from '@/components/Skeleton.vue'
// import http from '@/utils/server'
// import bus from '@/utils/bus'
// import { Ref } from 'vue';

const routerS = routerStore()
provide('dataListRequest', {url: '/tempList', params: {}, requestType: 'get'})

const typeSelectList:indexVue.typeSelectList = ref(
  [
    {
      id: 1, type: '推荐', select: true
    },
    {
      id: 2, type: '最新', select: false
    },
    {
      id: 3, type: '热榜', select: false, time: 1 as 1
    }
  ]
)

const timeSelectList: indexVue.timeSelectList = ref([
  {value: 1 as 1, label: '3天内'},
  {value: 2 as 2, label: '7天内'},
  {value: 3 as 3, label: '30天内'},
  {value: 0 as 0, label: '全部'}
])

let typeSelectChange = (id: number)=>{
  typeSelectList.value.forEach((item)=>{
    if(item.id == id) {
      item.select = true
    } else {
      item.select = false
    }
  })
}
// bus.on('labelSelectItem', (item: indexVue.labelClassItem[] | [])=>{
//   console.log(item)
// })
// router.getRouterPath()
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .content_box {
    width: 950px;
    background-color: #fff;
    // margin-top: 20px;
    margin: 20px auto 0;
    .type_select_box {
      display: flex;
      align-items: center;
      height: 50px;
      width: 100%;
      padding: 15px 12px;
      border-bottom: 1px solid rgb(235, 235, 235);
      // .label_class_popover {
      //   // >div {
      //   //   display: inline-block;
      //   // }
      // }
      .up_time_box {
        width: 114px;
      }
    }
    .type_select_box > div {
      padding: 0 14px;
      font-size: 14px;
      cursor: pointer;
    }
    .type_select_box > div:hover {
      color: rgb(113, 168, 246)!important;
    }
    .type_select_box > div:nth-child(2) {
      border-width: 0 1px;
      border-color: rgb(220, 220, 220);
      border-style: solid;
    }
  }
  // width: 950px;
  // background-color: #fff;
  // margin-top: 20px;
}

:deep(.el-select-dropdown__item.selected) {
  color: black
}
@media screen and (max-width: 951px) {
  .container {
    width: 100%;
    .content_box {
      width: 100%;
    }
  }
}
</style>