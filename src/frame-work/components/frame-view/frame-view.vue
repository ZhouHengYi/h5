<template>
    <transition>
        <div class="frame-view"
             :class="{ 'no-head':hiddenHead, 'is-mp':isMpClient }"
             :style="{zIndex:z}">
            <div class="frame-view-header"
                 v-if="!hiddenHead && !isMpClient"
                 :style="{backgroundColor:bgColor}">
                <div class="btns-left">
                    <i class="kb-icon icon-chevron-left"
                       @click="handleBackButtonClick"></i>
                </div>
                <div class="job-title">
                    <slot name="jobTitle"></slot>
                </div>
                <div class="title">{{title}}
                </div>
                <div class="btns-right"
                     @click="handleRightButtonClick">
                    <slot name="btns-right"></slot>
                </div>

            </div>
            <div ref="content"
                 class="frame-view-content"
                 @scroll.passive="handleContentScroll"
                 :style="{backgroundColor:contentColor}">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
    import UA from "@/resources/mixins/ua";
    import '@/resources/plugins/back';

    @Component
    export default class FrameView extends Mixins(UA) {
        @Prop()
        title?: string

        @Prop({
            default: 120
        })
        z!: string | number

        @Prop()
        bgColor?: string
        @Prop()
        contentColor?: string
        @Prop({
            default: false,
            type: Boolean
        })
        hiddenHead?: boolean;

        @Prop()
        backHander!: () => void;

        @Prop()
        rightHander!: () => void;

        handleContentScroll(evt: UIEvent) {
            this.$emit('scroll', evt);

            const el: HTMLElement = (<HTMLElement>evt.target);

            if (el && (el.scrollHeight - el.scrollTop - el.clientHeight <= 10)) {
                this.$emit('scrollEnd');
            }
        }

        handleBackButtonClick() {
            if (typeof (this.backHander) === 'function') {
                this.backHander();

            } else {
                this.$back();
            }
        }


        handleRightButtonClick() {
            if (typeof (this.rightHander) === 'function') {
                this.rightHander();
            }
        }

    }
</script>
<style lang="scss" scoped>
    .frame-view {
        position: relative;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100vw;
        &.no-head {
            padding-top: 40px;
            padding-bottom: 40px;
            z-index: 2;
            padding: 0;
            .frame-view-content {
                height: 100%;
            }
        }

        &.is-mp {
            .frame-view-content {
                height: 100%;
            }
        }

        .frame-view-header {
            position: relative;
            height: 96px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            .title {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
                font-weight: 700;
                z-index: 48;
                font-size: 34px;
            }

            [class^="btns-"] {
                position: relative;
                z-index: 49;
            }
            .btns-right {
                right: 10px;
            }
        }

        .frame-view-content {
            width: 100%;
            height: calc(100% - 96px);
            overflow-y: auto;
            -webkit-overflow-scrolling: auto;
        }
    }
</style>
