/*
* @Author: Xugai
* @Date:   2018-03-23 20:13:47
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-01 14:31:16
*/

require('../module.js');

require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/footer/index.css');
require('util/slider/index.js');
require('./index.css');

var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');
$(function() {
	//渲染banner的html
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	//初始化banner
    var $slider = $('.banner').unslider({
    	//在banner里添加导航圆点
    	dots: true
    });
    //前向导航和后向导航的事件绑定
    $('.banner-con .banner-arrow').click(function(){
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    });
});