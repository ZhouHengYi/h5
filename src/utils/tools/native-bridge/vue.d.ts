import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        /**
         * 原生交互 V2
         */
        $nativeApp: {
            /**
             * 调用APP 提供的方法
             * @param name 方法名称
             * @param params 参数 - 如有回调, 传参 { callback: true }
             */
            handleMethods: (name: string, params?: object) => Promise<any>;

            /**
             * H5注册全局方法,供APP调用
             * @param name
             * @param autoDestoryed 回调后是否立即销毁该方法
             */
            registerWindowEvent: (name: string, callback?: any, autoDestoryed?: boolean) => void;
        },
    }
}
