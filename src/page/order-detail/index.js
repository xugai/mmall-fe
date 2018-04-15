/*
* @Author: Xugai
* @Date:   2018-04-15 10:26:16
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-15 12:46:26
*/
require('../module.js');
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/footer/index.css');
var _navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

//page逻辑部分
var page = {
	data: {
		orderNumber: _mm.getUrlParam('orderNumber')
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		//初始化左侧导航
		_navSide.init({
			name: 'user-list'
		});
		this.loadDetail();
	},
	bindEvent: function(){
		var _this = this;
		$(document).on('click', '.order-cancel', function(){
			if(window.confirm('确认取消该订单吗？请三思而后行~')){
				_order.cancelOrder(_this.data.orderNumber, function(res){
					_mm.successTip('该订单取消成功！');
					_this.loadDetail();
				}, function(errMsg){
					_mm.errorTip(errMsg);
				});
			}
		});
	},
	//加载订单列表
	loadDetail: function(){
		var _this = this,
			orderDetailHtml ='',
			$content = $('.content');
			$content.html('<div class="loading"></div>');
			_order.getOrderDetail(this.data.orderNumber, function(res){
				_this.dataFilter(res);
				//渲染html
				orderDetailHtml = _mm.renderHtml(templateIndex, res);
				$content.html(orderDetailHtml);
			}, function(errMsg){
				$content.html('<p class="error-tip">' + errMsg +'</p>');
			});
	},
	dataFilter: function(data){
		data.needPay = data.status == 10;
		data.isCancelable = data.status == 10;
	}
};

$(function(){
	page.init();
});