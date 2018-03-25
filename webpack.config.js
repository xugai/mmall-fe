/*
* @Author: Xugai
* @Date:   2018-03-23 20:25:24
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-25 14:07:28
*/

var webpack 		  = require('webpack');
var Ex 				  = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置
var WEBPACK_ENV 	  = process.env.WEBPACK_ENV || 'dev'; 
console.log('===============' + WEBPACK_ENV + '=================');
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return{
		template: './src/view/' + name + '.html',
		filename: 'view/' + name + '.html',
		inject: true,
		hash: true,
		chunks: ['common',name]
	};
};

//web config
var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'login': ['./src/page/login/index.js']
	},
	output: {
		path: './dist',
		publicPath: '/dist',
		filename: 'js/[name].js',
	},
	externals: {
		'jquery': 'window.jQuery'
	},
	module: {
		loaders: [
			//单独打包css样式文件的加载器
			{ test: /\.css$/, loader: Ex.extract('style-loader', 'css-loader') },
			//打包图片、字体文件的加载器
			{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
		]		
	},
	plugins: [
		//独立通用模块打包到js/base.js里
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		//把css文件单独打包到文件里
		new Ex("css/[name].css"),
		//html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login'))
	]
};

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
};

module.exports = config;
