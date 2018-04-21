/*
* @Author: Xugai
* @Date:   2018-03-29 00:35:18
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-21 15:00:06
*/
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/footer/index.css');

var _mm = require('util/mm.js');
$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
		//如果返回的操作结果是成功添加进购物车，则在用户点击继续购物的时候能跳转回先前用户访问商品的页面
		if(type === 'cart-add'){
			var currentURL = _mm.getUrlParam('currentURL') || './index.html';
			$shopping = $element.find('.shopping');
			$shopping.attr('href', $shopping.attr('href') + decodeURIComponent(currentURL));
		}
		//如果返回的操作结果类型是支付成功，则在用户点击查看订单的时候能跳转到指定订单的详情页面
		if(type === 'payment'){
			var orderNumber = _mm.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number');
			$orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
		}
	//显示对应的提示信息
	$element.show();
})