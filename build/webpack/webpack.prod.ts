import * as webpack from 'webpack';
import merge from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import TerserPlugin from 'terser-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';

import baseConfig from './webpack.config';
import buddha from './buddha';

const config: webpack.Configuration = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: `[name].[chunkhash].js`,
    },
    devtool: false,
    stats: false,
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `[name].[contenthash].css`
        }),
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false,
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    ...buddha
                ],
                notes: [
                    `Compile Successful!`
                ],
            },
        }),
    ],
})


export default config