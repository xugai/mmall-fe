/*
* @Author: Xugai
* @Date:   2018-03-31 18:45:15
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-31 21:16:52
*/
require('../module.js');
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/footer/index.css');
var _navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');


//page逻辑部分
var page = {
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		//初始化左侧导航
		_navSide.init({
			name: 'user-pass-update'
		});
	},
	bindEvent: function(){
		var _this = this;
		/*	$(document).on('click','要选择的元素',function(){}),
			和$().click()的用法一样，最大的区别即优点是如果动态创建的元素在该选择器选中范围内是能触发回调函数。
		*/
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				password: $.trim($('#password').val()),
				passwordNew: $.trim($('#password-new').val()),
				passwordConfirm: $.trim($('#password-confirm').val())		
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//若提交的信息格式符合要求，则更改用户信息
				_user.updatePassword({
					passwordOld: userInfo.password,
					passwordNew: userInfo.passwordNew
				} , function(res, msg){
					_mm.successTip(msg);
					window.location.href = './index.html';
				}, function(errMsg){
					_mm.errorTip(errMsg);
				});
			}
			else{
				_mm.errorTip(validateResult.msg);
			}
		});
	},
	//验证提交数据格式是否符合要求
	validateForm: function(param){
		var result = {
			status: false,
			msg: ''
		};
		if(!_mm.validate(param.password, 'require')){
			result.msg = '请输入旧密码';
			return result;
		}
		if(!_mm.validate(param.passwordNew, 'require') || param.passwordNew.length < 6){
			result.msg = '新密码长度不能少于6位';
			return result;
		}
		if(param.passwordNew !== param.passwordConfirm){
			result.msg = '两次输入的密码不一致';
			return result;
		}
		result.status = true;
		result.msg = '验证通过！';
		return result;
	}
};

module.exports = page.init();