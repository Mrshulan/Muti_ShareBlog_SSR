const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const { resolve } = require('./utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config')[process.env.NODE_ENV];
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


const clientConfig = merge(baseConfig(config), {
    entry: resolve('app/client-entry.js'),
    // devtool: config.devtool,
    devtool: process.env.NODE_ENV === 'development' ? config.devtool : '',
    mode: config.env,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(config.env),
                REACT_ENV: '"client"'
            }
        }),

        // cp 静态资源
        new CopyWebpackPlugin([
            {
                from: resolve('static'),
                to: resolve('dist/static')
            }
        ]),

        new HtmlWebpackPlugin({
            filename: 'server.tpl.html',
            template: resolve('app/index.html')
        }),
        // new BundleAnalyzerPlugin()
    ],
})

if (process.env.NODE_ENV === 'production') {
    clientConfig.optimization.splitChunks = {
        minSize: 0,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'all',
                minChunks: 2
              },
            'react-vendor': {
								enforce: true,	
                test: /[\\/]node_modules[\\/](react|react-dom|redux|react-redux|redux-thunk|react-router-dom|react-router|react-router-config|)[\\/]/,
								name: 'react-vendor',
								chunks: "initial",
								priority: 10,
                minChunks: 1,								
                reuseExistingChunk: true
            },
            'antd-vendor': {
                test: /[\\/]node_modules[\\/](antd)[\\/]/,
								name: 'antd-vendor',
								chunks: "initial",
								enforce: true,								
								priority: 9,
                minChunks: 1,								
                reuseExistingChunk: true
            },
        }
        
    };
    clientConfig.optimization.runtimeChunk = {
        name: 'manifest',
    };
}

module.exports = clientConfig;