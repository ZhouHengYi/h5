const userAgent = navigator.userAgent;

const ua = {
    isAndroidApp: /android_kbgz_app/.test(userAgent) || /android_bd_app/.test(userAgent),
    isIosApp: /ios_kbgz_app/.test(userAgent) || /com.xinrenlei.koubeigongzuobd/.test(userAgent),
    // isIosApp: /android_kbgz_app/.test(userAgent)

    // ----  微信  --------
    isWechat: /MicroMessenger/i.test(navigator.userAgent),

    // ------ 其他浏览器内核 ------
    isSafari: /Safari/.test(userAgent),

    // ------ 小程序内核 ------
    isMpWechat: /miniProgram/.test(userAgent),
};

export { ua };
