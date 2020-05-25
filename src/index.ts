
import Vue from "vue";
import router from './packages/vue-router';

/***************** 样式相关 ***************/
import 'amfe-flexible';
import '../_intermediate/iconfonts/kb-icon.scss';
import '@/styles/index.scss';

/***************** package ***************/
import './packages/maple-request';
import store from './packages/vuex';

/***************** 虚拟模块 ***************/
import * as dynamicModules from 'vue-dynamic-modules';

/***************** 公共 components plugins ***************/
import './frame-work';

import App from './app.vue';

const loadDynamicModule = function (vue: Vue) {
    //  获取webpack-virtual-modules模块数据
    for (const curModule of dynamicModules) {
        curModule.keys().map((key: any) => {
            // 解析module
            const router = curModule(key).default;
            // 动态添加router
            vue.$router.addRoutes(router);
        });
    }
}

// 初始化
const _VUE_INSTANCE_ = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    mounted() {
        // eruda.init && eruda.init();
    }
});

// 开发环境启用模块化编译，不用再考虑编译慢的问题
loadDynamicModule(_VUE_INSTANCE_);