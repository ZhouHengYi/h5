
import {  RouteConfig } from 'vue-router';

let routers: RouteConfig[] = [];

/*********** 本地开发路由 ***********/
if (process.env.domain === 'local') {
    routers = [
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "modules/login" */ '@/views/_login/login.vue'),
        },
        {
            path: '',
            name: 'main',
            component: () => import(/* webpackChunkName: "modules/main" */ '@/views/_main/main.vue'),
        },
    ]

}

export default routers;