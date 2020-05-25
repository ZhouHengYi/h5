import { Module } from 'vuex';
import { CombinedState } from './index';

class ModuleHistoryState {
    list: string[] = [];
}

const ModuleHistory: Module<ModuleHistoryState, CombinedState> = {
    namespaced: true,
    state: () => new ModuleHistoryState(),
    getters: {},
    mutations: {
        setList(state, payload) {
            state.list = payload;
        },
    },
    actions: {
        change({ state, commit }, path) {
            const result = [...state.list];
            const length = result.length;

            if (path && path != '/') {
                const index = result.indexOf(path);
                if (index >= 0) {
                    result.splice(index + 1, length - index - 1);
                } else {
                    result.push(path);
                }
            }

            commit('setList', result);
        },
    },
};

export default ModuleHistory;
export { ModuleHistoryState };
