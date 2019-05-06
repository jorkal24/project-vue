const merge = require("webpack-merge");
const path = require("path");
const root = path.resolve(__dirname, "..");
const base = require("./webpack.config.base.js");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production' ? true : false;
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(base, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                loader: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "../" }
                    },
                    { 
                        loader: "css-loader", 
                        options: { sourceMap: !isProd }
                    },
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.stylus$/,
                loader: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: "../"}
                    },
                    {
                        loader: "css-loader",
                        options: {sourceMap: !isProd}
                    },
                    "postcss-loader",
                    "stylus-loader"
                ]
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsWebpackPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            },
            canPrint: true
        })
    ]
});
