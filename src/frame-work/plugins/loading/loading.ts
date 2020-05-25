import { PluginObject } from 'vue';
import { globalMountVueComponent, ExtendVueConstructor } from 'utils/dev';
import myLoading from './loading.vue';

const Loading: PluginObject<{ noAdditional: boolean }> = {
    install(Vue, options) {
        const noAdditional = options && options.noAdditional;

        let myTpl = globalMountVueComponent(myLoading, noAdditional);
        document.body.appendChild(myTpl.$el);

        Vue.prototype.$loading = (text: string) => {
            return myTpl.active(text);
        };
        Vue.prototype.$loading.clear = () => {
            (myTpl as any).disband();
        };
    },
};
export default Loading;
