/*
* @Author: Xugai
* @Date:   2018-03-27 17:26:13
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-31 21:10:06
*/
var _mm = require('util/mm.js');

var _user = {
	//用户注册
	register: function(userInfo, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/register.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//用户登录
	login: function(userInfo, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/login.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//验证用户名是否重复
	checkUserName: function(username, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/check_valid.do'),
			data: {
				type: 'username',
				str: username
			},
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//检查用户登录
	checkLogin: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//获取密码提示问题
	getQuestion: function(username, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/forget_get_question.do'),
			data: {
				username: username
			},
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//验证提交的答案是否正确
	checkAnswer: function(param, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/forget_check_answer.do'),
			data: param,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	resetPassword: function(param, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/forget_reset_password.do'),
			data: param,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	getUserInfo: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/get_information.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//更新个人信息
	updateUserInfo: function(userInfo, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/update_information.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	updatePassword: function(userInfo, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/reset_password.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//退出登录
	logout: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/user/logout.do'),
			method: "POST",
			success: resolve,
			error: reject
		});
	}
};

module.exports = _user;