import Vue from 'vue';
import { PluginObject } from 'vue';
import { globalMountVueComponent } from 'utils/dev';

import myConfirm from './index.vue';

const Confirm: PluginObject<never> = {
    install(Vue) {
        const myTpl = globalMountVueComponent(myConfirm);

        Vue.prototype.$confirm = function(this: Vue, activeData: any) {
            return myTpl.active(activeData);
        };
    }
};

Vue.use(Confirm);