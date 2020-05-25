import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';

import store from '@/packages/vuex';
import routes from './routes';

Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push;
const VueRouterReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function push(location: string) {
    return (VueRouterPush.call(this, location) as any).catch((err: any) => err);
};
VueRouter.prototype.replace = function replace(location: string) {
    return (VueRouterReplace.call(this, location) as any).catch((err: any) => err);
};

const options: RouterOptions = {
    mode: 'history',
    routes: routes
};

const router = new VueRouter(options);

router.beforeEach((to, form, next) => {
    const path = to.fullPath;
    store.dispatch('history/change', path);
    next();
});

export default router;
