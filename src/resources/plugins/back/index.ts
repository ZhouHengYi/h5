import Vue from 'vue';
import { PluginObject } from 'vue';
import { ua } from '@/utils/tools';

const Back: PluginObject<never> = {
    install(Vue) {
        Vue.prototype.$back = function (this: Vue) {
            const historyList = this.$store.state.history.list;
            if (historyList.length > 1) {
                if (ua.isAndroidApp) {
                    this.$nativeApp.handleMethods('goBack');
                }
                else {
                    this.$router.go(-1);
                }
            } else {
                this.$nativeApp.handleMethods('quitWebView');
                Reflect.get(window, 'quitWebView') && (window as any).quitWebView();
            }
        };
    },
};

Vue.use(Back);
