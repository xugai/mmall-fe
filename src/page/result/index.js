/*
* @Author: Xugai
* @Date:   2018-03-29 00:35:18
* @Last Modified by:   Xugai
* @Last Modified time: 2018-03-29 10:44:30
*/
require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/footer/index.css');

var _mm = require('util/mm.js');
$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	//显示对应的提示信息
	$element.show();
})