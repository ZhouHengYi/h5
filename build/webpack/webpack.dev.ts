import * as webpack from 'webpack';
import * as path from 'path';
import merge from 'webpack-merge';

import baseConfig from './webpack.config';

import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import buddha from './buddha';


import * as os from 'os';
const networkInterfaces = os.networkInterfaces();
const port = 14888;

let ip = "";
for (var key in networkInterfaces) {
    networkInterfaces[key].forEach(item => {
        if (!item.internal && item.family === "IPv4") {
            ip = item.address;
        }
    });
}



const config: webpack.Configuration = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: ip,
        port,
        hot: true,
        open: true,
        historyApiFallback: true,
        quiet: true,
        overlay: true,
        disableHostCheck: true
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    ...buddha
                ],
                notes: [
                    `Welcome Developer!`,
                    ``,
                    `Your app is running at http://${ip}:${port}`,
                    // `And Your requests will post to >>> dev.${env.host === 'default' ? 'ci' : env.host}`
                ],
            },
        }),
    ]
})


export default config