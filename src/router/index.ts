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
    path: '/books',
    component: () => import('@/views/my/Books.vue')
  },
  {
    path: '/my',
    component: () => import('@/views/my/My.vue')
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
const windowHeaderViceWhite = [
  '/index',
  '/search',
  // '/chat'
]
const phoneHeaderWhite = [
  '/index',
  '/books',
  '/my',
  '/chat'
]
const phoneBottomTabWhite = [
  '/index',
  '/books',
  '/my',
  '/chat'
]
router.beforeEach((to, from, next) => {
  const routerS = routerStore()
  routerS.fullpath = to.fullPath.split('?')[0]
  routerS.labelSelect = {
    id: 0,
    children: 0
  }
  if (routerS.isWindow) {
    windowHeaderBlack.find((value) => routerS.fullpath == value) ? routerS.windowHeaderState = false : routerS.windowHeaderState = true
    windowHeaderViceWhite.find((value) => routerS.fullpath == value) ? routerS.windowHeaderViceState = true : routerS.windowHeaderViceState = false
    routerS.viewChangeFn(routerS.fullpath)
  } else {
    routerS.windowHeaderState = true
    phoneHeaderWhite.find((value) => routerS.fullpath == value) ? routerS.headerState = true : routerS.headerState = false
    phoneBottomTabWhite.find((value) => routerS.fullpath == value) ? routerS.footerState = true : routerS.footerState = false
  }
  next()
})


export default router
