import { PluginObject } from 'vue';
import { globalMountVueComponent } from 'utils/dev';
import myToast from './toast.vue';

const Toast: PluginObject<{ noAdditional: boolean }> = {
    install(Vue, options) {
        const noAdditional = options && options.noAdditional;
        const myTpl = globalMountVueComponent(myToast, noAdditional);
        document.body.appendChild(myTpl.$el);

        Vue.prototype.$toast = (text: string, delay?: number) => {
            return myTpl.active(text, delay);
        };
    }
};

export default Toast;
