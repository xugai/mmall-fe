/*
* @Author: Xugai
* @Date:   2018-03-24 00:19:03
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-30 21:15:13
*/
require('../module.js');

require('page/common/nav-simple/index.js');
require('page/common/footer/index.css');
require('./index.css');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formError = {
	show: function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide: function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};

var page = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		$('.btn-submit').click(function(){
			_this.submit();
		});
		$('.user-info').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	//提交表单
	submit: function(){
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		//表单验证结果
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			//如果验证成功则提交给user-service进行ajax请求，	
			_user.login(formData, function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			}, function(errMsg){
				formError.show(errMsg);
			});
		}else{
			//如果验证失败则要有错误提示
			formError.show(validateResult.msg);
		}
	},
	formValidate: function(param){
		var result = {
			status: false,
			msg: ''
		};
		if(!_mm.validate(param.username, 'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(param.password, 'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//若用户名和密码都有填写，则通过验证返回正确提示信息
		result.status = true;
		result.msg = '验证通过！';
		return result;
	}
};

$(function(){
	page.init();
});
