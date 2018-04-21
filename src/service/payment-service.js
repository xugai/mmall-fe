/*
* @Author: Xugai
* @Date:   2018-04-21 11:38:29
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-21 12:20:20
*/
var _mm = require('util/mm.js');

var _payment = {
	//获取订单号和支付二维码
	getPaymentInfo: function(orderNumber, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/order/pay.do'),
			data: {
				orderNo: orderNumber
			},
			success: resolve,
			error: reject
		});
	},
	//获取订单支付状态
	getPaymentStatus: function(orderNumber, resolve, reject){
		_mm.require({
			url: _mm.getServerUrl('/order/query_order_pay_status.do'),
			data: {
				orderNo: orderNumber
			},
			success: resolve,
			error: reject
		});
	}
};

module.exports = _payment;