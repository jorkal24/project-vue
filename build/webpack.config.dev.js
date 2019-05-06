const path = require('path');
const root = path.resolve(__dirname , '..')
const merge = require('webpack-merge');
const base = require('./webpack.config.base.js');
const webpack = require('webpack');

module.exports = merge(base , {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader','css-loader','postcss-loader','sass-loader']
            },
            {
                test: /\.stylus$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),  
    ],
    devServer: {
        contentBase: path.join(root, 'dist'), 
        compress: true,
        port: 8088,
        open:true,
        hot: true
    }
})