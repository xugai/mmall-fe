/*
* @Author: Xugai
* @Date:   2018-04-09 21:02:02
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-15 12:45:43
*/
var _mm = require('util/mm.js');

var _order = {
	//加载商品列表
	getProductList: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/order/get_order_cart_product.do'),
			success: resolve,
			error: reject
		});
	},
	//创建订单
	createOrder: function(orderInfo, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/order/create.do'),
			data: orderInfo,
			success: resolve,
			error: reject
		});
	},
	getOrderList: function(listParam, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/order/list.do'),
			data: listParam,
			success: resolve,
			error: reject
		});
	},
	getOrderDetail: function(orderNumber, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/order/detail.do'),
			data: {
				orderNo: orderNumber
			},
			success: resolve,
			error: reject
		});
	},
	cancelOrder: function(orderNumber, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/order/cancel.do'),
			data: {
				orderNo: orderNumber
			},
			success: resolve,
			error: reject
		});
	}
};

module.exports = _order;