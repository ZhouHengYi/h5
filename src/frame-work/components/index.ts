import Vue, { PluginObject } from 'vue';
import FrameView from './frame-view/frame-view.vue';

const Components: PluginObject<never> = {
    install(Vue) {
        Vue.component('frame-view', FrameView);
    },
};

Vue.use(Components);
