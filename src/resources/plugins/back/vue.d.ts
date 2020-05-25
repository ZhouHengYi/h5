import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        /**
         * 回退（到底则退出webview）
         *
         * @memberof Vue
         */
        $back(): void;
    }
}
