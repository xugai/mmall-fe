/*
* @Author: Xugai
* @Date:   2018-04-06 09:39:12
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-09 21:03:51
*/
require('../module.js');
require('./index.css');
require('page/common/header/index.js');
require('page/common/footer/index.css');

var _nav = require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');


var _page = {
	data: {
		cartInfo: ''
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadCart();
	},
	bindEvent: function(){
		var _this = this;
		//监听到一次复选框状态的变化事件，则向后端服务器发送ajax请求，
		//异步获取当前购物车最新的信息，然后重新渲染页面，实现局部刷新价格的功能
		//购物车商品中的选择 / 取消选择
		$(document).on('click', '.cart-select', function(){
			var $this = $(this),
				productId = $this.parents('.cart-table').data('product-id');
			//若商品是选中状态
			if($this.is(':checked')){
				_cart.selectProduct(productId, function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
			}
			//如果是非选中状态
			else{
				_cart.unselectProduct(productId, function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
			}
		});
		//购物车商品中的全选 / 取消全选
		$(document).on('click', '.cart-select-all', function(){
			var $this = $(this);
			//若是全选中状态
			if($this.is(':checked')){
				_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
			}
			//如果是非选中状态
			else{
				_cart.unselectAllProduct(function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
			}
		});
		//监听商品数量的变化
		$(document).on('click', '.count-btn', function(){
			var $this = $(this),
				$pCount = $this.siblings('.count-input'),
				currentCount = parseInt($pCount.val()),
				type = $this.hasClass('plus') ? 'plus' : 'minus',
				productId = $this.parents('.cart-table').data('product-id'),
				minCount = 1,
				maxCount = parseInt($pCount.data('max')),
				newCount = 0;
			if(type === 'plus'){
				//判断当前的商品数量是否大于等于后台库存数量
				if(currentCount >= maxCount){
					_mm.errorTip('该商品数量已达到上限！');
					return;
				}
				newCount = currentCount + 1;
			}
			if(type === 'minus'){
				//判断当前的商品数量是否小于等于最小库存数量
				if(currentCount <= minCount){
					return;
				}
				newCount = currentCount - 1;
			}
			_cart.updateProduct({
				productId: productId,
				count: newCount
			}, function(res){
				_this.renderCart(res);
			}, function(errMsg){
				_this.showCartError();
			})
		});
		//删除单个商品
		$(document).on('click', '.cart-delete', function(){
			if(window.confirm('确认要删除该商品吗？')){
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		//批量删除选中的购物车商品
		$(document).on('click', '.delete-selected', function(){
			if(window.confirm('确认要删除选中商品吗？')){
				var arrProductIds = [],
				$selectedItems = $('.cart-select:checked');
				for(var i = 0, iLength = $selectedItems.length; i < iLength; i++){
					arrProductIds.push($($selectedItems[i]).parents('.cart-table').data('product-id'));
				}
				if(arrProductIds.length){
					/*
						调用数组的join方法，是返回一个有","将数组内的元素拼接起来的字符串
					*/
					_this.deleteCartProduct(arrProductIds.join(','));
				}
				else{
					_mm.errorTip('您还没有选中要删除的商品！');
				}
			}
		});
		//提交购物车
		$(document).on('click', '.btn-submit', function(){
			//若当前购物车的总价大于0，则进行提交
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
				window.location.href = './order-confirm.html';
			}else{
				_mm.errorTip('请选择商品后再进行提交');
			}
		});
	},
	//加载购物车信息
	loadCart: function(){
		var _this = this;
		_cart.getCartList(function(res){
			_this.renderCart(res);
		}, function(errMsg){
			_this.showCartError();
		});
	},
	//渲染购物车
	renderCart: function(data){
		this.filter(data);
		//缓存购物车信息
		this.data.cartInfo = data;
		//生成html
		var cartHtml = _mm.renderHtml(templateIndex, data);
		$('.page-wrap').html(cartHtml); 
		_nav.loadCartCount();
	},
	filter: function(data){
		//判断购物车内是否有添加商品
		data.notEmpty = !!data.cartProductVoList.length;
	},
	showCartError: function(){
		$('.page-wrap').html('<p class="error-tip">哪里出错了，试试刷新下。</p>');
	},
	//删除指定购物车内的商品，支持批量删除
	deleteCartProduct: function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds, function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		});
	}
};

$(function(){
	_page.init();
});