import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        /**
         * 消息框
         *
         * @memberof Vue
         */
        $toast(message: string, delay?: number): void;
    }
}
