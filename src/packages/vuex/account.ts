import { Module } from 'vuex';
import { CombinedState } from './index';
import { ua } from 'utils/tools';

class ModuleAccountState {
    token = '';
    mobile = '';
    clientType = 'h5';
}

const ModuleAccount: Module<ModuleAccountState, CombinedState> = {
    namespaced: true,
    state: () => new ModuleAccountState(),
    getters: {},
    mutations: {
        setToken(state, payload) {
            state.token = payload;
        },
        setMobile(state, payload) {
            state.mobile = payload;
        },
        setClientType(state, payload) {
            state.clientType = payload;
        },
    },
    actions: {
        update({ commit }, { token, clientType, mobile }) {
            return new Promise((resolve, reject) => {
                token && commit('setToken', token);
                clientType && commit('setClientType', clientType);
                mobile && commit('setMobile', mobile);
                resolve();
            });
        },
        clear({ commit }) {
            return new Promise((resolve, reject) => {
                commit('setToken', '');
                resolve();
            });
        },
    },
};

export default ModuleAccount;
export { ModuleAccountState };
