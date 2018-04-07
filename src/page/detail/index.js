/*
* @Author: Xugai
* @Date:   2018-04-03 15:58:15
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-05 12:06:13
*/
require('../module.js');
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/footer/index.css');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');


var _page = {
	data: {
		productId: _mm.getUrlParam('productId') || '',
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		//如果没有产品Id传过来，则跳转回到主页
		if(!this.data.productId){
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent: function(){
		var mainImageUrl = '',
			_this = this;
		$(document).on('mouseenter', '.p-img-item', function(){
			//存储原先的主图地址，用于在主图内容被替换，鼠标也离开子图后主图内容重新
			//回到原主图内容
			mainImageUrl = $('.main-img').attr('src');
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src', imageUrl);
		});
		$(document).on('mouseleave', '.p-img-item', function(){
			$('.main-img').attr('src', mainImageUrl);
		});
		$(document).on('click', '.p-count-btn', function(){
			var type = $(this).hasClass('plus') ? 'plus' : 'minus',
				$pCount = $('.p-count'),
				currentCount = parseInt($pCount.val()),
				maxCount = _this.data.detailInfo.stock || 1,
				minCount = 1;
			if(type === 'plus'){
				$pCount.val(currentCount > maxCount ? maxCount : currentCount + 1);
			}
			else if(type === 'minus'){
				$pCount.val(currentCount > minCount ? currentCount - 1 : minCount);
			}
		});
		//加入购物车
		$(document).on('click', '.cart-add', function(){
			_cart.addToCart({
				productId: _this.data.productId,
				count: $('.p-count').val()
			}, function(res){
				window.location.href = './result.html?type=cart-add';
			}, function(errMsg){
				_mm.errorTip(errMsg);
			});
		})
	},
	//加载商品详细信息
	loadDetail: function(){
		var $pageWrap = $('.page-wrap'),
			html = '',
			_this = this;
		//请求产品的detail信息
		_product.getProductDetail(this.data.productId, function(res){
			_this.data.detailInfo = res;
			_this.filter(res);
			//渲染
			html = _mm.renderHtml(templateIndex, res);
			//把渲染出来的html加到DOM内容中去
			$pageWrap.html(html);
		}, function(errMsg){
			$pageWrap.html('<p class="error-tip">该商品真淘气，我们找不到了。</p>')
		});
	},
	//分割传过来的图片集
	filter: function(data){
		data.subImages = data.subImages.split(',');
	}
};

$(function(){
	_page.init();
});