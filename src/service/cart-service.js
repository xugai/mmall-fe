/*
* @Author: Xugai
* @Date:   2018-03-27 17:51:34
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-07 12:33:09
*/
var _mm = require('util/mm.js');

var _cart = {
	//获取购物车商品数量
	getCartCount: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		});
	},
	addToCart : function(productInfo, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/cart/add.do'),
			data: productInfo,
			success: resolve,
			error: reject
		});
	},
	getCartList: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/cart/list.do'),
			success: resolve,
			error: reject
		});
	},
	selectProduct: function(productId, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/cart/select.do'),
			data: {
				productId: productId
			},
			success: resolve,
			error: reject
		});
	},
	unselectProduct: function(productId, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/cart/un_select.do'),
			data: {
				productId: productId
			},
			success: resolve,
			error: reject
		});
	},
	selectAllProduct: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/cart/select_all.do'),
			success: resolve,
			error: reject
		});
	},
	unselectAllProduct: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/cart/un_select_all.do'),
			success: resolve,
			error: reject
		});
	},
	updateProduct: function(productInfo, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/cart/update.do'),
			data: productInfo,
			success: resolve,
			error: reject
		});
	},
	deleteProduct: function(productIds, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/cart/delete_product.do'),
			data: {
				productIds: productIds
			},
			success: resolve,
			error: reject
		});
	}
};

module.exports = _cart;