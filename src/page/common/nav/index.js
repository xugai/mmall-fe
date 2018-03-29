/*
* @Author: Xugai
* @Date:   2018-03-27 12:09:51
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-28 11:14:05
*/
require('./index.css');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

//导航条的逻辑处理
var _nav = {
	//初始化导航条
	init: function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	//绑定登录、注册、退出事件
	bindEvent: function(){
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		$('.js-register').click(function(){
			window.location.href = './register.html';
		});
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			}, function(errMsg){
				_mm.errorTip(errMsg);
			})
		});
	},
	//获取用户信息
	loadUserInfo: function(){
		_user.checkLogin(function(res){
			$('.user not-login').hide().siblings('.user login').show().
			find('.username').text(res.username);
		}, function(errMsg){
			_mm.errorTip(errMsg);
		});
	},
	//获取当前购物车商品数量
	loadCartCount: function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0);
		}, function(errMsg){
			$('.nav .cart-count').text(0);
		});
	}
};

module.exports = _nav;