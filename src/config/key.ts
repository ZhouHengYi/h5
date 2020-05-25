/****** 第三方插件秘钥配置 *****/

const domain = process.env.domain;

const config: { [key: string]: any } = {};

switch (domain) {
    case 'local':
    case 'development': {
        break;
    }
    case 'test': {
        config.sentry = 'http://4cd4eea2d98d45a88e2ff6bd42187bed@sentryv2.lanxinka.com/58';
        break;
    }
    case 'uat': {
        break;
    }
    case 'production': {
        config.sentry = 'http://b4c2b0a816e446d98a4cd4816f91e7f0@sentryv2.lanxinka.com/59';
        break;
    }
    default:
        break;
}

export default config;
