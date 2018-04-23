	/*
* @Author: Xugai
* @Date:   2018-04-01 18:10:16
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-16 13:55:22
*/
var _mm = require('util/mm.js');

var _product = {
	//获取商品列表
	getProductList: function(listParam, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/product/list.do'),
			data: listParam,
			success: resolve,
			error: reject
		});
	},
	getProductDetail: function(productId, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/product/detail.do'),
			data: {
				productId: productId
			},
			success: resolve,
			error: reject
		});
	}
};

module.exports = _product;