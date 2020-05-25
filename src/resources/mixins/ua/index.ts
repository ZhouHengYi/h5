import { Vue, Component } from 'vue-property-decorator';
import { ua } from '@/utils/tools';

/** Mixin：环境 */
@Component
export default class Ua extends Vue {
    /** 是否为安卓应用 */
    get isAndroidApp() {
        return ua.isAndroidApp;
    }

    /** 是否为IOS应用 */
    get isIosApp() {
        return ua.isIosApp;
    }

    /** 是否为小程序应用 */
    get isMpClient() {
        return ua.isMpWechat;
    }
}
