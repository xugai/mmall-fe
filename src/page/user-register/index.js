/*
* @Author: Xugai
* @Date:   2018-03-30 13:51:12
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-30 15:19:41
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
		//验证username
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			//异步验证用户名是否存在
			_user.checkUserName(username, function(res){
				formError.hide();
			}, function(errMsg){
				formError.show(errMsg);
			});
		});
		//注册按钮的点击
		$('.btn-submit').click(function(){
			_this.submit();
		});
		//如果按下回车，也进行提交
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
			password: $.trim($('#password').val()),
			password_confirm: $.trim($('#password-confirm').val()),
			phone: $.trim($('#phone').val()),
			email: $.trim($('#email').val()),
			question: $.trim($('#question').val()),
			answer: $.trim($('#answer').val())
		};
		//表单验证结果
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			//如果验证成功则提交给user-service进行ajax请求，	
			_user.register(formData, function(res){
				window.location.href = './result.html?type=register'; 
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
		if(param.password.length < 6){
			result.msg = '密码至少为6位';
			return result;
		}
		if(!_mm.validate(param.password_confirm, 'require')){
			result.msg = '请再输入一次密码';
			return result;
		}
		if(param.password !== param.password_confirm){
			result.msg = '两次输入的密码不一致';
			return result;
		}
		if(!_mm.validate(param.phone, 'phone')){
			result.msg = '手机号格式不正确';
			return result;
		}
		if(!_mm.validate(param.email, 'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}
		if(!_mm.validate(param.question, 'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if(!_mm.validate(param.answer, 'require')){
			result.msg = '密码提示问题答案不能为空';
			return result;
		}
		//若注册信息都有正确填写，则通过验证返回正确提示信息
		result.status = true;
		result.msg = '验证通过！';
		return result;
	}
};

$(function(){
	page.init();
});
