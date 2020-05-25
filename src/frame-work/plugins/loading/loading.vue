<template>
    <div class="loading-dialog"
         v-if="isActive">
        <div class="bg"></div>
        <div class="loading-wrapper">
            <div class="loading-content">
                <div class="icon">
                    <i class="back"></i>
                    <i class="front"></i>
                </div>
            </div>
            <div class="text-content"
                 v-if="text">
                {{text}}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    @Component
    export default class Loading extends Vue {
        isActive: boolean = false;
        text?: string = "";
        active(text: any) {
            this.text = text;
            this.isActive = true;
        }
        disband() {
            this.isActive = false;
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/styles/utils/@theme-color";

    .loading-dialog {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(75, 75, 75, 0);
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 130;

        .bg {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.1);
        }

        .loading-wrapper {
            width: 240px;
            height: 230px;
            padding: 20px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .loading-content {
                border-radius: 16px;
                width: 240px;
                height: 160px;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon {
                    position: relative;
                    height: 72px;
                    width: 72px;
                    animation: spin 1.68s cubic-bezier(0.66, 0.38, 0.32, 0.73)
                        infinite;

                    i.back {
                        position: absolute;
                        left: 0;
                        top: 0;
                        display: block;
                        width: 100%;
                        height: 100%;
                        border: 10px solid #ddd;
                        border-radius: 50%;
                        opacity: 0.52;
                    }

                    i.front {
                        position: absolute;
                        left: 0;
                        top: 0;
                        display: block;
                        width: 100%;
                        height: 50%;
                        overflow: hidden;

                        &::after {
                            content: "";
                            position: absolute;
                            left: 0;
                            top: 0;
                            display: block;
                            width: 100%;
                            height: 200%;
                            border: 10px solid $main-color;
                            border-radius: 50%;
                        }
                    }
                }
            }
            .text-content {
                flex-shrink: 0;
                font-size: 26px;
                line-height: 70px;
                color: #ffffff;
                text-align: center;
                padding: 0 18px;
            }
        }
    }

    @keyframes spin {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
