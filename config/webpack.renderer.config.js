const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    target: 'electron-renderer',
    entry: {
        app: './src/renderer/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                    plugins: [
                        [
                            '@babel/plugin-transform-runtime',
                            {
                                absoluteRuntime: false,
                                corejs: false,
                                helpers: true,
                                regenerator: true,
                                useESModules: true,
                            },
                        ],
                    ],
                },
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ],
});
