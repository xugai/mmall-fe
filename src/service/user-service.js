/*
* @Author: Xugai
* @Date:   2018-03-27 17:26:13
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-27 17:51:16
*/
var _mm = require('util/mm.js');

var _user = {
	//检查用户登录
	checkLogin: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('./user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	//退出登录
	logout: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('./user/logout.do'),
			method: "POST",
			success: resolve,
			error: reject
		});
	}
};

module.exports = _user;