import { type } from 'os'
import type { Ref } from 'vue'

export namespace indexVue {

  // 顶部路由切换的数据类型
  export interface viewChangeItem {
    id: number,
    name: string,
    state: boolean,
    select: boolean
    to: string
  }
  export type viewChangeList = Ref<viewChangeItem[]>


  // 头部标签的数据类型
  export interface labelClassItem {
    id: number,
    label: string
  }
  export interface labelItem {
    id: number,
    label: string,
    children?: labelClassItem[]
  }
  export type labelList = Ref<labelItem[]>
  export interface labelSelect {
    id: number,
    children: number
  }


  // 底部导航的数据类型
  export interface bottomBarItem {
    id: number,
    to: string,
    name: string,
    icon: string
  }
  export type bottomBarList = Ref<bottomBarItem[]>


  // index页面切换搜索方式的数据类型
  export interface typeSelectItem {
    id: number,
    type: string,
    select: boolean
    time?: 1 | 2 | 3 | 0
  }
  export type typeSelectList = Ref<typeSelectItem[]>
  export interface timeSelectItem {
    value: 1 | 2 | 3 | 0,
    label: string
  }
  export type timeSelectList = Ref<timeSelectItem[]>
}