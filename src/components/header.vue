<template>
  <div class="container">
    <div class="header_body">
      <div class="header_subject">
        <div class="header_center" v-if="routerS.headerState">
          <div class="header_left">
            <div class="logo_box"></div>
            <div class="view_list" v-if="routerS.isWindow">
              <div class="view_item" v-for="(item, index) in viewChangeList" :key="item.id" v-show="item.state" @click="viewChangeFn(item.id)">
                <div class="view_text">
                  <RouterLink :to="item.to"  :style="{color: item.select ? 'rgb(125, 171, 235)': 'rgb(67, 67, 67)'}">{{ item.name }}</RouterLink>
                </div> 
              </div>
            </div>
            <div class="tips_box">
              <el-cascader :options="label_list" :show-all-levels="false" :props="{value: 'id', emitPath: true}" v-model="selectLabelCascader" @change="selectChange"/>
            </div>
          </div>
          <div class="header_right">
            <div :class="inputChange ? ['search_box', 'search_box_select']: ['search_box']" @click="phoneSearch">
              <input type="text" @focus="inputChange = true" @blur="inputChange = false" :placeholder="inputChange ? '搜索文章、专栏、用户': '努力是给予探索者的明灯'">
              <div class="select_icon_box">
                <span class="icon-search"></span>
              </div>
            </div>
            <div class="my_box">
              <div class="create_box" v-if="routerS.isWindow">
                <el-button type="primary" color="rgb(125, 171, 235)"><span style="color: white">创作中心&nbsp;&nbsp;<span class="icon-chevron-down"></span></span></el-button>
              </div>
              <div class="my_base">
                <el-button type="primary" plain color="rgb(125, 171, 235)">登陆 / 注册</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="none_box" v-else>
        </div>
      </div>
      <div class="label_box" v-if="routerS.isWindow">
        <div class="label_item" v-for="(item, index) in label_list" :key="item.id" @click="labelItemFn(item)" :style="{color: item.id == labelSelect.id ? 'rgb(113, 168, 246)': 'rgb(119, 119, 119)'}">
          <span v-if="item.children && item.children.length != 0">
            <el-popover
              placement="bottom-start"
              :width="350"
              trigger="hover"
              :show-after="300"
            >
              <div class="label_class_popover" style="display: flex;flex-wrap: wrap;">
                <div v-for="i in item.children" @click="labelItemChildFn(i, item)" :style="{backgroundColor: i.id == labelSelect.children ? 'rgb(125, 171, 235)':'rgb(244, 245, 245)', padding: '4px 8px',cursor: 'pointer',borderRadius: '40%', marginRight: '15px', marginBottom: '10px', color: i.id == labelSelect.children ? 'white': ''}">{{ i.label }}</div>
              </div>
              <template #reference>
                <div>{{ item.label }}</div>
              </template>
            </el-popover>
          </span>
          <span v-else>
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <footer class="footer_body" v-if="routerS.footerState && !routerS.isWindow">
        <div v-for="item in bottomBarList" :key="item.id" :style="{color: routerS.fullpath == item.to ? 'rgb(125, 171, 235)': '#666'}">
          <div>
            <span :class="item.icon"></span>
          </div>
          <RouterLink :to="item.to" :style="{color: routerS.fullpath == item.to ? 'rgb(125, 171, 235)': '#666', fontSize: '13px', marginTop: '2px'}">{{ item.name }}</RouterLink>
        </div>
      </footer>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { routerStore } from '@/store';
import { indexVue } from '@/types/index'
import type { Ref } from 'vue'
import bus from '@/utils/bus'

const routerS = routerStore()
const router = useRouter()

const viewChangeList:indexVue.viewChangeList = ref([
  {id: 1, name: '首页', state: true, select: true, to: '/index'},
  {id: 2, name: '浮冰', state: true, select: false, to: '/chat'},
  {id: 3, name: '捕鱼', state: false, select: false, to: ''}
])
const viewChangeFn = (id: number) => {
  viewChangeList.value.forEach((item) => {
    if(item.id == id) {
      item.select = true
    } else {
      item.select = false
    }
  })
}

const label_list:indexVue.labelList = ref([
  {id: 0, label: '综合'},
  {id: 1, label: '考研',
    children: [
      {id: 1, label: '哲学'},
      {id: 2, label: '经济学'}, 
      {id: 3, label: '法学'},
      {id: 4, label: '教育学'},
      {id: 5, label: '文学'},
      {id: 6, label: '历史学', },
      {id: 7, label: '理学', },
      {id: 8, label: '工学', },
      {id: 9, label: '农学', },
      {id: 10, label: '医学', },
      {id: 11, label: '军事学', },
      {id: 12, label: '管理学', },
      {id: 13, label: '艺术学', },
    ]
  },
  {id: 2, label: '考公', 
    children: [
      {id: 1, label: '申论'},
    ]
  },
  {id: 3, label: '高考', 
    children: [
      {id: 1, label: '文科', },
      {id: 2, label: '理科', },
      {id: 3, label: '艺术科', }
    ]
  },
  {id: 4, label: '编程', 
    children: [
      {id: 1, label: '前端', },
      {id: 2, label: '后端', },
      {id: 3, label: '游戏', }
    ]
  }
])
let labelSelect:Ref<indexVue.labelSelect> = ref({
  id: 0,
  children: 0
})
// let labelSelectItemFn = (...args: any)=>{
//   bus.emit('labelSelectItem', ...args)
// }
let labelItemFn = (item: indexVue.labelItem) => {
  labelSelect.value.id = item.id
  item.children ? labelSelect.value.children = 1: false
  // labelSelectItemFn(labelSelect.value)
}
let labelItemChildFn = (i: indexVue.labelClassItem, item: indexVue.labelItem) => {
  labelSelect.value.id = item.id
  labelSelect.value.children = i.id
  // labelSelectItemFn(labelSelect.value)
}

let inputChange = ref(false)
let selectLabelCascader:Ref<number[]> = ref([0])
let phoneSearch = ()=>{
  if(!routerS.isWindow) {
    router.push('/search')
  }
}
let bottomBarList:indexVue.bottomBarList = ref([
  {id: 1, to: '/index', name: '首页', icon: 'icon-home'},
  {id: 2, to: '/books', name: '书架', icon: 'icon-books'},
  {id: 3, to: '/chat', name: '浮冰', icon: 'icon-octagon'},
  {id: 4, to: '/my', name: '我的', icon: 'icon-user'}
])
let selectChange = function() {
  labelSelect.value.id = selectLabelCascader.value[0]
  selectLabelCascader.value[1] ? labelSelect.value.children = selectLabelCascader.value[1] : false
}

// console.log(routerS.footerState, !routerS.isWindow)
</script>

<style lang="less" scoped>
.header_body {
  position:fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .none_box {
    // display: flex;
    // align-items: center;
    width: 100%;
    height: 100%;
  }
  .header_subject {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgb(235, 235, 235);
    .header_center {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      .header_left, .header_right {
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
      }
      .header_right {
        justify-content: space-between;
      }
      .logo_box {
        // width: 100px;
        height: 100%;
        background-color: skyblue;
      }
      .view_list {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .view_item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 52px;
          height: 60px;
          cursor: pointer;
          .view_text {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            border-bottom: 2px solid;
            border-color: transparent;
            font-size: 14px;
            // color: rgb(67, 67, 67);
          }
          .view_text:hover {
            color: black!important;;
            border-color: rgb(125, 171, 235);
          }
        }
        
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
        transition: width .3s;
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
          >span {
            color: #666;
          }
        }
      }
      .search_box_select {
        width: 300px;
        border-color: rgb(125, 171, 235);
        .select_icon_box {
          background-color: rgb(201, 224, 255);
          >span {
            color: rgb(101, 155, 230);
          }
        }
      }
      .my_box {
        display: flex;
        justify-content: center;
        align-items: center;
        :deep(.el-button) {
          width: 100%;
          span {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        >div {
          margin-left: 20px;
        }
        // .my_base {
        //   margin-left: 20px;
        // }
      }
    }
  }
  .label_box {
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    max-width: 950px;
    // .label_class_popover {
    //   // >div {
    //   //   display: inline-block;
    //   // }
    // }
    .label_item:hover {
      color: rgb(113, 168, 246)!important;
    }
  }
  .label_box > div {
    margin: 0 12px;
    font-size: 14px;
    cursor: pointer;
  }
  .label_box > div:first-child {
    margin-left: 0;
  }
}
.footer_body {
  position: fixed;
  bottom: 0;
  height: 8vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid rgb(235, 235, 235);
  >div {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
.header_body, .footer_body {
  background-color: #fff;
}

@media screen and (min-width: 1440px) {
  .container {
    .header_body {
      .header_subject {
        .header_center {
          width: 1440px;
        }
      }
    }
  }
}
@media screen and (max-width: 1439px) {
  .container {
    .header_body {
      .header_subject {
        .header_center {
          width: 100%;
          // .view_list {
          //   // .view_item {
          //   //   display: none;
          //   // }
          // }
          .search_box_select {
            width: 262px;
          }
          .my_box {
            .my_base {
              margin-right: 10px;
            }
          }
        }
      }
      
    }
  }
}
@media screen and (min-width: 951px) {
  .container {
    height: 110px;
    .header_body {
      height: 110px;
      .logo_box {
        width: 107px;
        margin: 0 12px 0 24px;
      }
      .tips_box {
        display: none;
      }
    }
  }
}
@media screen and (max-width: 950px) {
  .container {
    height: 8vh;
    .header_body {
      height: 8vh;
      .header_subject {
        .header_center {
          .logo_box {
            min-width: 31px;
            margin-left: 5px;
          }
          .header_right {
            flex: 2;
            :deep(.el-button) {
              width: 80%;
            }
            .search_box {
              width: 0;
              flex: 1;
              max-width: 232px;
              >input {
                width: 60%;
              }
              .select_icon_box {
                height: 90%;
                width: 40%;
                max-width: 68px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgb(242, 243, 245);
                border-radius: 5px;
                >span {
                  color: #666;
                  font-size: 10%;
                }
              }
            }
          }
        }
      }
      .tips_box {
        max-width: 100px;
        padding: 0 20px 0 0;
        :deep(.el-input__wrapper) {
          box-shadow: none;
        }
        :deep(.el-input__inner) {
          min-width: 30px;
          color: rgb(125, 171, 235);
          font-weight: 700;
        }
      }
    }
  }
}
</style>