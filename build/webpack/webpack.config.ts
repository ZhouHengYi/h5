import * as path from 'path';
import * as webpack from 'webpack';
import Webpackbar from 'webpackbar';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import HtmlPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import virtualModules from './virtual-modules';

import env from './env';

const isProduction = (env.domain !== "local"); // 非本地开发环境

const styleLoader = isProduction ? MiniCssExtractPlugin.loader : "style-loader";

const config: webpack.Configuration = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        // path: path.resolve('dist'),
        publicPath: '/',
        // filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
        alias: {
            '@': path.resolve("src"),
            '@src-modules': path.resolve("src-modules"),
            'utils': path.resolve("src/utils"),
        }
    },
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            maxInitialRequests: 30,
            maxAsyncRequests: 30,
            minSize: 2048,
            cacheGroups: {
                default: {
                    priority: -20,
                    reuseExistingChunk: true,
                    minChunks: 20,
                },
                'vendors/library': {
                    name: 'vendors/library',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                'vendors/vue-bucket': {
                    name: 'vendors/vue-bucket',
                    test: /[\\/]node_modules[\\/](vue|vue-router|vuex|vue-class-component)[\\/]/,
                    priority: -1
                },
            }

        },
        runtimeChunk: {
            name: 'vendors/manifest',
        },
        removeAvailableModules: false
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules(?![/|\\](dom7|swiper))/
            },
            {
                test: /\.ts$/,
                exclude: /node_modules(?![/|\\](.*by-tools.*))/g,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                include: /images/,
                loader: "url-loader",
                query: {
                    esModule: false,
                    limit: 1,
                    name: "asset/images/[hash:16].[ext]"
                },
            },
            {
                test: /\.scss$/,
                use: [
                    styleLoader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: !isProduction
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: !isProduction
                        }
                    },
                ],
            },
            {
                test: /\.(ttf|woff2?|eot|svg)$/,
                loader: "url-loader",
                query: {
                    limit: 1,
                    name: "asset/fonts/[name].[hash:7].[ext]"
                }
            }
        ]
    },
    plugins: [
        virtualModules,
        new Webpackbar({
            reporters: ['profile'],
            profile: true
        }),
        new VueLoaderPlugin(),
        new HtmlPlugin({
            filename: "index.html",
            template: path.resolve("src/index.html"),
            showErrors: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                domain: JSON.stringify(env.domain),
            },
        }),
    ]
};

export default config;