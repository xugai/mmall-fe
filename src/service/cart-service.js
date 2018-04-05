/*
* @Author: Xugai
* @Date:   2018-03-27 17:51:34
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-05 10:53:00
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
	}
};

module.exports = _cart;