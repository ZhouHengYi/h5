<template>
    <div :class="`kb-checks kb-checks-${this.type}`">
        <label @click="ripple" class="full">
            <span class="tips">
                <slot></slot>
            </span>
            <span ref="inputWapper"
                  class="input-wapper">
                <input :type="this.type"
                       v-model="currentValue"
                       :name="name"
                       :value="value" />
                <i class="blank"
                   :class="`icon-${this.type}-blank`"></i>
                <i class="checked"
                   :class="`icon-${this.type}-checked`"></i>
            </span>
        </label>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop, Mixins } from "vue-property-decorator";
    import TwoWay from '@/resources/mixins/two-way';

    @Component
    export default class Checks extends Mixins(TwoWay) {
        @Prop({
            type: String,
            default: 'radio'
        })
        type!: 'radio' | 'checkbox';

        @Prop()
        name?: string

        @Prop()
        value?: any


        ripple(event: MouseEvent) {
            const inputWapper = <HTMLElement>this.$refs.inputWapper

            if ((<HTMLElement>event.target).nodeName === 'INPUT') {
                const ripple = document.createElement('b');
                ripple.classList.add('kb-checks-ripple');

                inputWapper.appendChild(ripple);

                setTimeout(() => {
                    this.$refs.inputWapper && ripple && inputWapper.removeChild(ripple);
                }, 500)
            }

        }
    }
</script>
<style lang="scss" scoped>
    @import "@/styles/utils/utils-scss";

    .kb-checks:not(:last-child){
        margin-right: 16px;
    }
    .kb-checks {
        display: inline-block;

        width: auto;
        vertical-align: bottom;
        @include clearfix();

        & > label {
            float: left;
            display: flex;
            align-items: center;
            height: 40px;
            cursor: pointer;
            width: auto;

            .tips {
                height: 36px;
                line-height: 36px;
                font-size: 28px;
                padding-left: 4px;
                // padding-right: 16px;
            }

            .input-wapper {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 8px;
                order: -1;

                input {
                    display: none;

                    & ~ i {
                        width: 36px;
                        height: 36px;
                        line-height: 36px;
                        text-align: center;

                        &::before {
                            font-size: 36px;
                            line-height: 36px;
                        }
                    }
                    &:not(:checked) ~ i {
                        &.blank {
                            display: inline;
                        }
                        &.checked {
                            display: none;
                        }
                    }
                    &:checked ~ i {
                        &.blank {
                            display: none;
                        }
                        &.checked {
                            display: inline;
                        }
                    }
                }
            }
        }

        /deep/ .kb-checks-ripple {
            position: absolute;
            left: 10px;
            top: 10px;
            width: 12px;
            height: 12px;
            background: rgba(0, 0, 0, 0.35);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: checks-ripple 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94);

            @keyframes checks-ripple {
                to {
                    transform: scale(8.6);
                    opacity: 0;
                }
            }
        }
    }
</style>
