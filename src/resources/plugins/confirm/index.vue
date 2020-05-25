<template>
    <transition name="fade">
        <fullscreen-dialog :class="exClass"
                           v-if="visible">
            <section class="confirm ">
                <p class="confirm-title"
                   v-html="title"></p>
                <p class="comfirm-content"
                   v-html="content"></p>
                <section class="confirm-bts">
                    <button @click="handleCancel"
                            v-if="!disableCancel">
                        {{ cancelText }}
                    </button>
                    <button @click="handleConfirm">{{ confirmText }}</button>
                </section>
            </section>
        </fullscreen-dialog>
    </transition>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from "vue-property-decorator";
    import FullscreenDialog from "@/resources/components/fullscreen-dialog/index.vue";

    @Component({
        components: {
            FullscreenDialog
        }
    })
    export default class Confirm extends Vue {
        hideIcon = false;
        visible = false;
        title = "";
        cancelText = "";
        confirmText = "";
        content = "";
        onAccept: any = null;
        onDecline: any = null;
        disableCancel: boolean = false;
        icon = "";
        exClass = ""; // 根节点外部样式类

        @Watch("$route.name")
        watchName() {
            if (typeof this.onDecline == "function") {
                this.handleCancel();
            }
        }

        handleCancel() {
            this.visible = false;
        }

        handleConfirm() {
            this.visible = false;
            this.onAccept();
        }

        active(activeData: any) {
            return new Promise((resolve, reject) => {
                this.visible = true;
                this.title = activeData.title;
                this.content = activeData.content;
                this.cancelText = activeData.cancelText;
                this.confirmText = activeData.confirmText;
                this.disableCancel = activeData.disableCancel;
                this.icon = activeData.icon;
                this.exClass = activeData.exClass;
                this.hideIcon = activeData.hideIcon;
                this.onAccept = () => {
                    resolve();
                };
            });
        }

    }
</script>
<style lang="scss" scoped>
    @import "@/styles/utils/@theme-color";

    .confirm {
        padding-top: 42px;
        width: 560px;
        background: #fff;
        border-radius: 32px;
        overflow: hidden;

        p {
            display: block;
            text-align: center;
            margin: 0;
            font-size: 34px;
            color: #4a4a4a;
            line-height: 42px;
            pointer-events: none;
        }

        .confirm-title {
            font-size: 38px;
            color: #3a3a3a;
            line-height: 42px;
        }

        .comfirm-content {
            margin-top: 50px;
            font-size: 28px;
            font-weight: 400;
            padding: 0 50px;
            text-align: center;
            color: #717171;
        }

        .confirm-bts {
            display: block;
            display: flex;
            margin-top: 56px;
            margin-bottom: 40px;
            justify-content: space-around;

            button {
                width: 230px;
                text-align: center;
                letter-spacing: 2px;
                padding: 12px 0px;
                font-size: 28px;
                color: #fff;
                border-radius: 32px;
            }

            button:first-child {
                background: rgba(207, 207, 207, 1);
            }

            button:last-child {
                background-color: $main-color;
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
