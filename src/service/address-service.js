/*
* @Author: Xugai
* @Date:   2018-04-10 10:46:51
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-12 15:38:41
*/
var _mm = require('util/mm.js');

var _address = {
	//加载地址列表
	getAddressList: function(resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/shipping/list.do'),
			data: {
				pageSize: 50
			},
			success: resolve,
			error: reject
		});
	},
	//添加新的收货地址
	save: function(addressInfo, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/shipping/add.do'),
			data: addressInfo,
			success: resolve,
			error: reject
		});
	},
	update: function(addressInfo, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/shipping/update.do'),
			data: addressInfo,
			success: resolve,
			error: reject
		});
	},
	deleteAddress: function(shippingId, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/shipping/del.do'),
			data: {
				shippingId: shippingId
			},
			success: resolve,
			error: reject
		});
	},
	//获取指定Id的地址信息
	getAddress: function(shippingId, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/shipping/select.do'),
			data: {
				shippingId: shippingId
			},
			success: resolve,
			error: reject
		});
	}
};


module.exports = _address; 