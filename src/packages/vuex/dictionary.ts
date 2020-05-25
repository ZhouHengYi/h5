import { Module } from 'vuex';
import { CombinedState } from './index';

class DictionaryItem {
    value: number | string;
    label: number | string;
    children?: DictionaryItem[];

    constructor(value: number | string, label: number | string, children?: DictionaryItem[]) {
        this.value = value;
        this.label = label;
        this.children = children;
    }
}

/** vuex模块状态: Dictionary */
class ModuleDictionaryState {
    [key: string]: DictionaryItem[];
    cityData: any[] = []; // 城市三级联动
    job_search_label: any[] = []; // 求职标签
    resume_education: any[] = []; // 教育经历
    personality_label: any[] = []; // 个性标签
    category: any[] = []; // 岗位类型
}

/** vuex模块：Account */
const ModuleDictionary: Module<ModuleDictionaryState, CombinedState> = {
    namespaced: true,
    state: () => new ModuleDictionaryState(),
    getters: {},
    mutations: {
        update(state, payload) {
            for (let item in payload) {
                state[item] = payload[item];
            }
        },
    },
};

export default ModuleDictionary;

export { ModuleDictionaryState };
