/*
* @Author: Xugai
* @Date:   2018-03-31 11:33:01
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-31 12:59:40
*/
require('../module.js');
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/footer/index.css');
var _navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

//page逻辑部分
var page = {
	init: function(){
		this.onLoad();
	},
	onLoad: function(){
		//初始化左侧导航
		_navSide.init({
			name: 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	loadUserInfo: function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel').html(userHtml);
		}, function(errMsg){
			_mm.errorTip(errMsg);
		});
	}
};

module.exports = page.init();