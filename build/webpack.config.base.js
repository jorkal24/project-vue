const path = require('path');
const root = path.resolve(__dirname , '..');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production' ? true : false;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    entry: path.join(root , 'src' , 'main.js'),
    output: {
        path: path.join(root , 'dist'),
        filename: isProd ? '[name].[hash:4].js' : 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) && !(/\.vue\.js/).test(file)
                )
            },
            {
                test:  /\.(png|jpe?g|gif|bmp|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: isProd ?  'img/[name].[hash:8].[ext]' : 'img/[name].[ext]'
                    }
                }]
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:8192,
                    name: isProd ? 'fonts/[name].[hash:8].[ext]' : 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(mp4|ogg|mp3)$/,
                use: ['file-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js' , '.scss' , '.css' , '.vue']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd,
                removeAttributeQuotes: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isProd ? 'css/[name].[hash:8].css' : 'css/[name].css',
        }),
        new VueLoaderPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups:{ // 这里开始设置缓存的 chunks
                vendor: { // key 为entry中定义的 入口名称
                    chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    test: /node_modules/, // 正则规则验证，如果符合就提取 chunk (指定是node_modules下的第三方包)
                    name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
                    minChunks: 1,
                    enforce: true
                },
                styles: {
                    chunks: 'all',
                    test: /\.(css|scss)$/,
                    name: 'vendor',
                    minChunks: 1,
                    enforce: true
                }
            }
        }
    }
}