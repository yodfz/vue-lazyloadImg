var webpack = require('webpack');

module.exports = {
    //页面入口文件配置
    entry: {
        index: './src/index.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/',
        filename: 'vue-lazyloadimg.js'
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
            }
        ],
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    }
};