/*
* @Author: Xugai
* @Date:   2018-03-30 20:16:47
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-30 22:06:04
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
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadStepUsername();
	},
	bindEvent: function(){
		var _this = this;
		//输入用户名，点击下一步后发生的处理逻辑
		$('#submit-username').click(function(){
			//首先获取输入框中的用户名，通过ajax发送给服务器获得该用户名对应的问题
			var username = $.trim($('#username').val());
			if(username){
				_user.getQuestion(username, function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				}, function(errMsg){
					formError.show(errMsg);
				});
			}
			//若没有输入用户名
			else{
				formError.show('请输入用户名');
			}
		});
		//输入密码提示问题的答案，点击下一步后发生的处理逻辑
		$('#submit-question').click(function(){
			
			var answer = $.trim($('#answer').val());
			if(answer){
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				}, function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				}, function(errMsg){
					formError.show(errMsg);
				});
			}
			//若没有输入答案
			else{
				formError.show('请输入密码提示问题的答案');
			}
		});
		//输入新的密码后，点击修改密码发生的处理逻辑
		$('#submit-password').click(function(){	
			var password = $.trim($('#password').val());
			if(password && password.length >= 6){
				_user.resetPassword({
					username: _this.data.username,
					passwordNew: password,
					forgetToken: _this.data.token
				}, function(res){
					window.location.href = './result.html?type=pass-reset';
				}, function(errMsg){
					formError.show(errMsg);
				});
			}
			//若没有输入答案
			else{
				formError.show('请输入不少于6位的新密码');
			}
		});
	},
	//第一步，加载输入用户名
	loadStepUsername: function(){
		$('.step-username').show();
	},
	//第二步，加载输入密码提示问题的答案
	loadStepQuestion: function(){
		//清楚错误提示
		formError.hide();
		//做容器的切换
		$('.step-username').hide().siblings('.step-question')
		.show().find('.question').text(this.data.question);
	},
	//第三步，提交新密码
	loadStepPassword: function(){
		//清楚错误提示
		formError.hide();
		//做容器的切换
		$('.step-question').hide().siblings('.step-password').show();
	}
};

$(function(){
	page.init();
});

