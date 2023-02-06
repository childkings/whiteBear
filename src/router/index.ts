import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import pinia from "@/store/store";
import { routerStore } from '@/store/index';

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('@/views/index/Index.vue')
  },
  {
    path: '/search',
    component: () => import('@/views/index/Search.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/chat',
    component: () => import('@/views/Chat.vue')
  },
  {
    path: '/article',
    component: () => import('@/views/article/Article.vue')
  },
  {
    path: '/:error*',
    redirect: '/index'
  }
];

// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const windowHeaderBlack = [
  '/login',
  '/articleEdit',
]
const phoneHeaderWhite = [
  '/index',
  '/folder',
  '/my',
  '/chat'
]
const phoneBottomTabWhite = [
  '/index',
  '/folder',
  '/my',
  '/chat'
]
router.beforeEach((to, from) => {
  const routerS = routerStore()
  routerS.fullpath = to.fullPath
  if (routerS.isWindow) {
    windowHeaderBlack.some((value) => to.fullPath == value) ? routerS.windowHeaderState = false : routerS.windowHeaderState = true
  } else {
    routerS.windowHeaderState = true
    phoneHeaderWhite.some((value) => to.fullPath == value) ? routerS.headerState = true : routerS.headerState = false
    phoneBottomTabWhite.some((value) => to.fullPath == value) ? routerS.footerState = true : routerS.footerState = false
  }
})


export default router
