import { Vue, Component, Prop, Model } from 'vue-property-decorator';

/** Mixin：环境 */
@Component
export default class Env extends Vue {
    get isDev() {
        return process.env.domain === 'local';
    }
}
