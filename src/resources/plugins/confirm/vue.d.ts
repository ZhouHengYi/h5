import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        /**
         * 确认弹窗
         *
         * @memberof Vue
         */
        $confirm(activeData: any): any;
    }
}
