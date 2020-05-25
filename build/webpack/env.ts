const domain = process.env.DOMAIN; // 环境
const modules = process.env.npm_config_module || ''; // 模块

export default {
    domain,
    modules,
}
