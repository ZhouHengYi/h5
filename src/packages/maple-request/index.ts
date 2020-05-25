import Vue from 'vue';
import store from '@/packages/vuex';
import { mapleRequest, byfunction } from 'by-tools';

import servers from '@/config/server';
import apis from '@/config/apis';
import mockConf from '@/config/mock';

import { ua } from 'utils/tools';

const vm = new Vue();

class MapleRequestConfig extends mapleRequest.MapleRequestConfig { };

let _mockConf;
if (servers.mock) {
    _mockConf = {
        url: servers.mock,
        config: mockConf
    }
}

/***** 退出登录 *****/
const logout = byfunction.debounce(function () {
    store.dispatch('logout', true);
    localStorage.clear()
}, 750);

/***** 异常退出登录 *****/
const handleError = (code: string) => {
    if ([200001, 200003, 220001, 220001, 220010, 220013, 220105].indexOf(code) >= 0) {
        logout();
        vm.$loading.clear();
    }
}
const options: MapleRequestConfig = {
    create: {
        timeout: 20000,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            // 'Platform': 'h5-bd',
        },
        baseURL: servers.kb,
        mock: _mockConf
    },
    apis,
    interceptors: {
        request: (config: any) => {

            config.headers.Authorization = store.state.account.token;
            config.headers['client-type'] = store.state.account.clientType;

            return config;
        },
        response: (response: any) => {
            const responseData = response.data;
            const { code, data, msg } = responseData;

            if (!code) {
                return responseData;
            } else {
                vm.$toast(responseData.msg);
                handleError(code);
            }
        },
        responseError: (error: any) => {
            vm.$toast('网络错误，请稍后重试');
            vm.$loading.clear();
            // return Promise.reject(error);
        },
    },
    loading: {
        start() { },
        close() { },
    },
    pre: {
        request(data: any) { },
        response(response: any) { },
        responseError(this: Vue, error: any) {
            if (error.code) {
                handleError(error.code)
            }
        },
    },
};

Vue.use(mapleRequest.MapleRequest, options);