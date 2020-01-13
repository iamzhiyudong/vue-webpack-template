const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoader = require('vue-loader/lib/plugin');

module.exports = {
    // 定义打包入口
    entry: {
        bundle: path.join(__dirname, 'src/main.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        open: true,
        contentBase: 'public',
        port: 3000,
        hot: true
    },
    // 配置插件
    plugins: [
        new HtmlWebpackPlugin({
            //  默认打开public/index.html文件
            template: path.join(__dirname, 'public/index.html'),
            filename: 'index.html'
        }),
        new VueLoader()
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, //  配置处理 .css 文件的第三方loader 规则
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|gif|bmp|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: 1024,
                        name: '[hash:8]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    }
}