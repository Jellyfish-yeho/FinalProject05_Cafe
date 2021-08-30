import Vue from 'vue'
import VueRouter from 'vue-router'
import CafeList from '@/views/CafeList.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:'/cafe/list',
        name:'CafeList',
        component:CafeList
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router