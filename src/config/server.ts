const domain = process.env.domain || 'local';

const servers: { [key: string]: any } = {};

switch (domain) {
    case 'local':
    case 'development': {
        servers.kb = `//onsite-api.ci.dev.lanxinka.com`;
        break;
    }
    case 'test': {
        servers.kb = `//onsite-api.st1.test.lanxinka.com`;
        break;
    }
    case 'uat': {
        servers.kb = `//pre-onsite-api.shurenzhipin.com`;
        break;
    }
    case 'production': {
        servers.kb = `//onsite-api.shurenzhipin.com`;
        break;
    }
    default: {
        break;
    }
}

export default servers;
