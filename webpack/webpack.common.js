const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: {
        home: path.join(__dirname, '../src/pages/home/index.js'),
    },
    output: {
        path: path.join(__dirname, '../dist/'),
        filename: '[name].[hash].bundle.js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial",
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "../dist/"),
        port: 9000
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            path: path.join(__dirname, "../dist/"),
            filename: "index.html",
            template: path.join(__dirname, '../src/pages/home/index.html'),
            chunks: ["home", "vendor"],
            chunksSortMode: "dependency",
            inject: 'head'
        }),
        new HtmlWebpackPlugin({
            path: path.join(__dirname, "../dist/"),
            filename: "coordinators.html",
            template: path.join(__dirname, '../src/pages/home/coordinators.html'),
            chunks: ["home", "vendor"],
            chunksSortMode: "dependency",
            inject: 'head'
        }),
        new CopyWebpackPlugin([
            { from: path.join(__dirname,'../src/assets'),
                to: path.join(__dirname,'../dist/assets')  },
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: './fonts/[name].[ext]?[hash]', // was '/fonts/[name].[ext]?[hash]',
                },
            }
        ]
    }
};
