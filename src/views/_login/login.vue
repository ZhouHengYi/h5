<template>
    <div class="login">
        <div class="dev-login"
             v-if="isDev">
            <div class="tips"
                 @click="randomMoblie">开发者专属<br><small>简单</small>登录</div>

            <div class="form-item">
                <input placeholder="手机号"
                       v-model="form.mobile">
            </div>

            <div class="form-item">
                <input placeholder="验证码 "
                       v-model="form.captcha"
                       maxlength="4">
            </div>

            <div class="form-item">
                <kb-checks v-for="(radio, index) in list"
                           :key="index"
                           type="radio"
                           :value="radio.value"
                           v-model="type">
                    {{ radio.label }}
                </kb-checks>
            </div>

            <button @click="handleSubmitBtnClick">戳我</button>
            <button @click="handleLoginoutBtnClick">退出登录</button>

            <div v-if="error"
                 class="error">{{error}}</div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Mixins, Watch } from "vue-property-decorator";
    import Dev from '@/resources/mixins/env';

    import kbChecks from '@/resources/components/kb-checks/index.vue';

    @Component({
        components: {
            kbChecks
        }
    })
    export default class AppLogin extends Mixins(Dev) {
        form = {
            mobile: '',
            captcha: ''
        };

        type = '';
        list = [
            { label: 'Business', value: 'b_app' },
            { label: 'User', value: 'c_app' },
        ];

        error = '';

        @Watch('form', { deep: true })
        watchForm() {
            this.error = '';
        }

        getMoble() {
            var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");

            let i = parseInt(String(10 * Math.random()));

            let prefix = prefixArray[i];

            for (let j = 0; j < 8; j++) {

                prefix = prefix + Math.floor(Math.random() * 10);

            }

            return prefix;
        }

        randomMoblie() {
            this.form = {
                mobile: this.getMoble(),
                captcha: '1234'
            }
        }

        handleSubmitBtnClick() {
            if (!this.form.mobile || !this.form.captcha) {
                this.error = '没输完账号密码戳个锤子';
            }
            else {
                const params = {
                    ...this.form,
                    client_type: 1,
                    login_type: 1
                };
                
                this.$request('login', params).then(({ data }) => {
                    const { token } = data;
                    this.$store.dispatch('account/update', { token, clientType: this.type });
                    window.localStorage.setItem('token', token);
                })
            }
        }

        handleLoginoutBtnClick(){
            this.$store.dispatch('logout');
        }
    }
</script>
<style lang="scss" scoped>
    .dev-login {
        text-align: center;
        padding-top: 188px;

        .tips {
            font-size: 42px;
            padding-bottom: 48px;
        }

        .form-item {
            line-height: 88px;
            input {
                width: 310px;
                padding: 0 8px;
                line-height: 56px;
                border: 2px solid #000;
            }
        }

        button {
            margin: 30px auto;
            width: 310px;
            line-height: 56px;
            cursor: pointer;
            border: 2px solid #000;
            background-color: #fff;
            display: block;
        }

        .error {
            font-size: 20px;
            line-height: 64px;
        }
    }
</style>
