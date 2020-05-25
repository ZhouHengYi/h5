import * as fs from 'fs';
import * as path from 'path';
import VirtualModulesPlugin from 'webpack-virtual-modules';

import env from './env';

// 获取所有模块
const getModulesCount = () => fs.readdirSync('./src-modules').length;

// 获取编译模块
const modules = env.modules || '';

// 返回模块虚拟
let buildDynamicModules = [];

if (modules && env.domain === 'local') {  // 本地环境

    buildDynamicModules = modules.split(',').map((module, index) => {

        console.log(`编译模块(${index + 1})：${module}\n`);

        fs.access(path.join(__dirname, `../../src-modules/${module}`), function (err) {
            if (err) {
                console.log(`\n\n注意：${module} 模块不存在!\n`);
                process.exit(0);
            }
        });
        return `require.context("@src-modules/${module}", true, /index\.ts$/)`
    });

}
else {
    // 正式环境 或 未指定编译模块
    console.log(`全部模块，总共：${getModulesCount()} 个 \n`);
    buildDynamicModules.push(`require.context("@src-modules", true, /index\.ts$/)`);
}

// 创建虚拟模块文件（hack）
const virtualModules = new VirtualModulesPlugin({
    'node_modules/vue-dynamic-modules.js': `module.exports = [${buildDynamicModules.join(',')}];`
});

export default virtualModules;