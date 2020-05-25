import Vue from 'vue';
import { StoreOptions } from 'vuex';
import { ua } from 'utils/tools';
import router from '@/packages/vue-router';

class RootState {
    name = '';
}

/** vuex根模块 */
const root: StoreOptions<any> = {
    state: new RootState(),
    mutations: {},
    actions: {
        logout({ commit, dispatch }, invalidToken) {
            dispatch('account/clear');
            if (process.env.domain === 'local') {
                window.localStorage.removeItem('token');
                router.replace({ name: 'login' });
            }

            else {
                // new Vue().$native().logout(invalidToken);
            }
        },
    },
};

export default root;
export { RootState };
