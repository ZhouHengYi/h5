import Vue, { VueConstructor } from 'vue';

import router from '@/packages/vue-router';
// import store from '@/packages/vuex';

/**
 * 为独立挂载组件扩展的Vue构造器
 *
 * 此处我们认为所有独立挂载的组件中均有active方法
 */
declare interface ExtendVueConstructor extends Vue {
    active(...agrs: any): Promise<any>;
}
/**
 * 将组件独立挂载到文档末尾
 *
 * @param {VueConstructor} component 组件的构造函数
 * @returns 挂载后的实例
 */
function globalMountVueComponent(component: VueConstructor, noAdditional: boolean = false) {
    let Constructor = Vue.extend({
        router,
        // store,
        render: h => h(component),
    });

    if (noAdditional)
        Constructor = Vue.extend({
            render: h => h(component),
        });

    const myTpl = new Constructor().$mount().$children[0];
    document.body.appendChild(myTpl.$el);

    return myTpl as ExtendVueConstructor;
}

export { globalMountVueComponent, ExtendVueConstructor };
