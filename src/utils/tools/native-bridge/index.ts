import { ua } from 'utils/tools';
import Vue from 'vue';

const app = {
    /**
     * 调用APP 提供的方法
     * @param name 方法名称
     * @param params 参数 - 如有回调, 传参 { callback: true }
     */
    handleMethods: function (name: string, params: any = {}) {
        return new Promise((resolve, reject) => {
            if (ua.isAndroidApp) {
                try {
                    let result: any;
                    // 过滤不需要的参数
                    params.callback && Reflect.deleteProperty(params, 'callback');

                    if (Object.keys(params).length > 0) {
                        result = (window as any).control[name](JSON.stringify(params));
                    }
                    else {
                        result = (window as any).control[name]();
                    }

                    try {
                        resolve(JSON.parse(result));
                    }
                    catch{
                        resolve();
                    }

                }
                catch (e) {
                    console.error(name + 'fail', e);
                    this.awakeAppUpdate();
                }

            }
            else if (ua.isIosApp) {
                const functionName = `ios_${name}${new Date().getTime()}`;
                // 注册回调
                Reflect.defineProperty(window, functionName, {
                    enumerable: false,
                    value: function (res: any) {
                        resolve(res || '');
                        // Reflect.deleteProperty(window, functionName);
                    },
                });

                params.callback = functionName;

                try {
                    (window as any).webkit.messageHandlers[name].postMessage(JSON.stringify(params));
                }
                catch (e) {
                    console.log(`调用${name}方法失败`);
                    this.awakeAppUpdate();
                    reject(e)
                }

            }
            else {
                console.log('此功能需要访问 APP 才能使用');
            }
        });
    },
    /**
     * H5注册全局方法,供APP调用
     * @param name
     * @param callback 方法名称
     * @param autoDestoryed 回调后是否立即销毁该方法
     */
    registerWindowEvent: function (name: string, callback: any, autoDestoryed = true) {
        try {
            Reflect.defineProperty(window, name, {
                enumerable: false,
                value: function (value: any) {
                    callback(value);
                    autoDestoryed && Reflect.deleteProperty(window, name);
                },
            });
        }
        catch (e) {
            console.log(e);
        }
    },

    /**
     * 唤起APP强制更新弹窗
     */
    awakeAppUpdate: () => {
        console.error('唤起APP强制更新弹窗');
    }
}

Vue.prototype.$nativeApp = app;

