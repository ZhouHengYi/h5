<template>
    <div v-if="showViews">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <transition name="fade"
                    mode="in-out">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Mixins, Watch } from "vue-property-decorator";
    import UA from "@/resources/mixins/ua";

    import 'utils/tools/native-bridge';
    import Env from "./resources/mixins/env";

    @Component
    export default class App extends Mixins(UA, Env) {

        get inApp() {
            return this.isAndroidApp || this.isIosApp;
        }

        get isNotLogin() {
            return this.$route.name != "login";
        }

        showViews = false; // 页面是否可以展示

        /**
         * app内初始化方法
         */
        initApp() {

            // IOS 快捷跳转
            if (this.isIosApp || this.isDev) {
                // 调用 H5 路由
                this.$nativeApp.registerWindowEvent('awakeH5Route', (res: any) => {
                    this.$store.commit('history/setList', []);
                    this.getToken();
                    this.$router.replace(res.url);
                    this.showViews = true;
                });

                this.$nativeApp.registerWindowEvent('quitWebView', (res: any) => {
                    this.showViews = false;
                    this.$router.replace('/')
                });
            }
            // Android
        }

        /**
         * 不同环境，不同方式，获取token后，展示页面
         */
        getToken() {
            if (this.inApp) {
                this.$nativeApp.handleMethods("getUserInfo").then((res) => {
                    const { token, client_type, mobile } = res;
                    this.$store.dispatch("account/update", { token, clientType: res.client_type, mobile });
                    this.showViews = true;
                });
            }
            /***** 小程序 内部打开页面必须有token token传参方式待定 *****/
            else if (this.isMpClient) {
                this.showViews = true;
            }
            /***** 其他环境 *****/
            else {
                this.$store.dispatch('account/update', { token: window.localStorage.getItem('token') });
                this.showViews = true;
            }
        }

        /** 本地开发 监听vuex中的token */
        @Watch("$store.state.account.token")
        watchStateToken(newVal: any) {
            if (process.env.domain == 'local') {
                if (!newVal && this.isNotLogin) {
                    // vuex中没有token，且不在登录页
                    this.$store.dispatch("logout");
                }
                else if (newVal && !this.isNotLogin) {
                    this.$router.replace({ name: "main" });
                }
            }

        }

        @Watch('showViews')
        watchShowViews(newVal: boolean) {
            newVal && this.$loading.clear();
        }

        created() {
            this.$loading();
            this.getToken();
            this.inApp && this.initApp();
        }
    }
</script>
<style lang="scss" scoped>
</style>
