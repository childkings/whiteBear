<template>
  <div class="container">
    <div class="content_box">
      <div class="search_box_father" v-if="!routerS.isWindow">
        <div class="tips_box">
          <el-cascader :options="routerS.label_search_list" :show-all-levels="false" :props="{value: 'id', emitPath: true}" v-model="selectLabelCascader" @change="selectChange"/>
        </div>
        <div class="search_box">
          <input type="text" v-model="searchText" @focus="inputChange = true" @blur="inputChange = false" @input="searchInput" :placeholder="inputChange ? '搜索文章、专栏、用户': '努力是给予探索者的明灯'">
          <div class="select_icon_box" @click="searchClick">
            <span class="icon-search"></span>
          </div>
        </div>
      </div>
      <div class="type_select_box" v-if="baseMessage == 0">
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
      <div class="floor_box">
        <SkeletonVue :isLoad="isLoad" v-if="dataState">
          <template #default="{data}">
            <!-- <h1>{{ data }}</h1> -->
            <div v-for="item in data" :key="item.id" class="article_item">
              <div class="article_subject">
                <div class="top_box">
                  <div class="top_left">
                    <div class="name_box">
                      {{ item.user_name }}
                    </div>
                    <div class="time_box">
                      {{ item.time }}
                    </div>
                  </div>
                  <div class="top_right">
                    <div class="label_item" v-for="i in item.labels">{{ i.name }}</div>
                  </div>
                </div>
                <div class="bottom_box">
                  <div class="title_box">{{ item.title }}</div>
                  <div class="other_box">
                    <div class="article_base">
                      <div class="content_base">{{ item.content }}</div>
                      <div class="action_box">
                        <div class="up_box">
                          <span class="icon-thumbs-up icon_margin" :style="{color: item.up_state ? 'rgb(113, 168, 246)': 'rgb(119, 119, 119)'}"></span>
                          <span class="up_number" :style="{color: item.up_state ? 'rgb(113, 168, 246)': 'rgb(119, 119, 119)'}">{{ item.up_number }}</span>
                        </div>
                        <div class="comment_box">
                          <span class="icon-message-square icon_margin"></span>
                          <span class="comment_number">{{ item.comment_number }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="img_box">
                      <img :src="item.img_url" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </SkeletonVue>
        <SkeletonVue :isLoad="isLoad" v-else>
          <template #default="{data}">
            <div class="search_user_box">
              <div v-for="item in data" :key="item.id" class="article_item">
                <div class="article_subject">
                  <div class="base_message">
                    <div class="img_box">
                      <img :src="item.img_url" alt="">
                    </div>
                    <div class="user_base">
                      <div class="user_name">{{ item.user_name }}</div>
                      <div class="user_autograph">{{ item.autograph }}</div>
                    </div>
                  </div>
                  <el-button type="success" plain>关注</el-button>
                </div>
              </div>
            </div>
          </template>
        </SkeletonVue>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routerStore } from '@/store/index';
import { indexVue } from '@/types/index'
import { request } from '@/types/request'
import SkeletonVue from '@/components/Skeleton.vue'
// import http from '@/utils/server'
import bus from '@/utils/bus'
import { Ref } from 'vue';
import { LocationQueryValue } from 'vue-router';

const routerS = routerStore()
const route = useRoute()

// 传递到底部组件必须值--provide('requestDataObj', 。。。)请求对象、isLoad动态渲染变量
const dataState:Ref<boolean> = ref(true)
const isLoad:Ref<boolean> = ref(true)
const baseMessage = ref(0)
const requestObj:request.asyncRequest = reactive({url: '/tempList', params: {id: 0, children: 0,searchText: ''}, requestType: 'get'})
// const provideRef:request.asyncRequest = reactive(requestObjList.value[0])
provide('requestDataObj', requestObj)
requestObj.params.searchText = route.query.searchText
// onMounted(()=> {
//   searchFn(route.query.searchText)
// })
const searchFn = (searchText: LocationQueryValue | LocationQueryValue[])=> {
  isLoad.value = !isLoad.value
  requestObj.params.searchText = searchText
  // dataState.value = true
}
bus.on('getNewSearchText', (searchText)=> {
  searchFn(searchText)
})
const apiFn = (requestTypeObj: request.requestParams) => {
  baseMessage.value = requestTypeObj.id
  // console.log(requestObj.value[0])
  if(baseMessage.value == 0) {
    requestObj.url = '/tempList'
    dataState.value = true
    // provideRef.url = requestObjList.value[0].url
    // provideRef.params = requestObjList.value[0].params
    // provideRef.requestType = requestObjList.value[0].requestType
  } else {
    requestObj.url = '/tempUser'
    dataState.value = false
    // provideRef.url = requestObjList.value[1].url
    // provideRef.params = requestObjList.value[1].params
    // provideRef.requestType = requestObjList.value[1].requestType
  }
}
bus.on('getRequestApiData', (requestTypeObj: request.requestParams)=> {
  // console.log(requestTypeObj)
  apiFn(requestTypeObj)
  // baseMessage.value = requestTypeObj.id
  // // console.log(requestObj.value[0])
  // if(baseMessage.value == 0) {
  //   requestObj.url = '/tempList'
  //   dataState.value = true
  //   // provideRef.url = requestObjList.value[0].url
  //   // provideRef.params = requestObjList.value[0].params
  //   // provideRef.requestType = requestObjList.value[0].requestType
  // } else {
  //   requestObj.url = '/tempUser'
  //   dataState.value = false
  //   // provideRef.url = requestObjList.value[1].url
  //   // provideRef.params = requestObjList.value[1].params
  //   // provideRef.requestType = requestObjList.value[1].requestType
  // }
})

const searchText:Ref<string> = ref('')
let inputChange = ref(false)
let setTime:number | NodeJS.Timeout | null = null
const searchClick = ()=> {
  searchFn(searchText.value)
}
const searchInput = ()=>{
  if(setTime) {
    clearTimeout(setTime)
    setTime = setTimeout(()=>{
      searchFn(searchText.value)
    }, 500)
  } else {
    setTime = setTimeout(()=>{
      searchFn(searchText.value)
    }, 500)
  }
}
let selectLabelCascader:Ref<number[]> = ref([0])
let selectChange = () => {
  apiFn({id: selectLabelCascader.value})
}

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
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    width: 950px;
    background-color: #fff;
    // margin-top: 20px;
    margin: 20px auto 0;
    .search_box_father {
      position: sticky;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 8vh;
      .tips_box {
        margin: 0 20px;
      }
      .search_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 262px;
        height: 34px;
        padding: 0 2px;
        border: 1px solid rgb(206, 206, 206);
        border-radius: 5px;
        background-color: #fff;
        transition: width .3s;
        margin-right: 20px;
        > input {
          width: 180px;
          height: 90%;
          border: none;
          color: #666;
        };
        > input:focus {
          outline: none;
        }
        .select_icon_box {
          height: 90%;
          width: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgb(242, 243, 245);
          border-radius: 5px;
          cursor: pointer;
          >span {
            color: #666;
          }
        }
      }
    }
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
    .floor_box {
      padding-bottom: 12px;
      .article_item {
        padding: 12px 20px 0px 20px;
        cursor: pointer;
        .article_subject {
          padding-bottom: 13px;
          border-bottom: 1px solid rgb(220, 220, 220);
          .top_box {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: rgb(119, 119, 119);
            // margin-bottom: 12px;
            .top_left {
              display: flex;
              .name_box {
                padding-right: 6px;
                color: rgb(48, 48, 48);
              }
              .time_box {
                padding-left: 7px;
                border-left: 1px solid rgb(220, 220, 220);
              }
            }
            .top_right {
              display: flex;
              div {
                padding: 2px 4px;
                background-color: rgb(242, 242, 242);
                margin-left: 5px;
              }
            }
          }
          .bottom_box {
            // .article_base {
            //   flex: 1;
            // }
            .title_box {
              width: 100%;
              font-weight: 700;
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;
              margin: 14px 0 12px;
            }
            .other_box {
              display: flex;
              .article_base {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .content_base {
                  -webkit-line-clamp: 2;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  font-size: 13px;
                  color: rgb(119, 119, 119);
                }
                .action_box {
                  margin-top: 20px;
                  display: flex;
                  span {
                    font-size: 14px;
                    margin-right: 26px;
                    color: rgb(119, 119, 119);
                  }
                  .icon_margin {
                    margin-right: 4px;
                  }
                }
              }
              .img_box {
                width: 120px;
                height: 80px;
                min-width: 120px;
                margin-left: 16px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
      .article_item:hover {
        background-color: rgb(248, 248, 248);
      }
      .search_user_box {
        display: flex;
        flex-wrap: wrap;
        .article_item {
          width: 33%;
          .article_subject {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .base_message {
              display: flex;
              align-items: center;
              .img_box {
                width: 45px;
                width: 45px;
                margin-right: 15px;
                img {
                  width: 100%;
                  border-radius: 22.5px;
                }
              }
              .user_base {
                flex: 1;
                .user_name {
                  font-size: 15px;
                  font-weight: 700;
                  margin-bottom: 5px;
                }
                .user_autograph {
                  font-size: 13px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  color: rgb(132, 132, 132);
                }
              }
            }
          }
        }
      }
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
      .floor_box {
        .search_user_box {
          .article_item {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>