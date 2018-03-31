/*
* @Author: Xugai
* @Date:   2018-03-31 11:33:35
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-31 21:55:08
*/
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
		this.bindEvent();
	},
	onLoad: function(){
		//初始化左侧导航
		_navSide.init({
			name: 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	bindEvent: function(){
		var _this = this;
		/*	$(document).on('click','要选择的元素',function(){}),
			和$().click()的用法一样，最大的区别即优点是如果动态创建的元素在该选择器选中范围内是能触发回调函数。
		*/
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				phone: $.trim($('#phone').val()),
				email: $.trim($('#email').val()),
				question: $.trim($('#question').val()),
				answer: $.trim($('#answer').val())
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//若提交的信息格式符合要求，则更改用户信息
				_user.updateUserInfo(userInfo , function(res, msg){
					_mm.successTip(msg);
					window.location.href = './user-center.html';
				}, function(errMsg){
					_mm.errorTip(errMsg);
				});
			}
			else{
				_mm.errorTip(validateResult.msg);
			}
		});
	},
	loadUserInfo: function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel').html(userHtml);
		}, function(errMsg){
			_mm.errorTip(errMsg);
		});
	},
	//验证提交数据格式是否符合要求
	validateForm: function(param){
		var result = {
			status: false,
			msg: ''
		};
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
		result.status = true;
		result.msg = '验证通过！';
		return result;
	}
};

module.exports = page.init();