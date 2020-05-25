import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        /**
         * 加载动画
         *
         * @memberof Vue
         */
        $loading: {
            (): void;
            clear: () => void;
        };
    }
}
