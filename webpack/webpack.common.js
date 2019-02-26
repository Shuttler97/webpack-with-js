const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        new HtmlWebpackPlugin({
            path: path.join(__dirname, "../dist/"),
            filename: "index.html",
            template: path.join(__dirname, '../src/pages/home/index.html'),
            chunks: ["home", "vendor"],
            chunksSortMode: "dependency",
            inject: 'head'
        })
    ]
};
