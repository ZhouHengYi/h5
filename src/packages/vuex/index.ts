import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

Vue.use(Vuex);

import root, { RootState } from './root';
import ModuleAccount, { ModuleAccountState } from './account';
import ModuleHistory, { ModuleHistoryState } from './history';
import ModuleDictionary, { ModuleDictionaryState } from './dictionary';

class CombinedState extends RootState {
    account = new class extends ModuleAccountState { }();
    history = new class extends ModuleHistoryState { }();
    dictionary = new class extends ModuleDictionaryState { }();
}

const options: StoreOptions<CombinedState> = {
    ...root,
    modules: {
        account: ModuleAccount,
        history: ModuleHistory,
        dictionary: ModuleDictionary,
    },
};

const store = new Vuex.Store(options);

export default store;

export { CombinedState }
