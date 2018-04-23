/*
* @Author: Xugai
* @Date:   2018-04-09 20:59:56
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-14 13:22:50
*/
require('../module.js');
require('./index.css');
require('page/common/header/index.js');
require('page/common/footer/index.css');
require('page/common/nav/index.js');

var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var _order = require('service/order-service.js');
var _addressModal = require('./address-modal.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');

var _page = {
	data: {
		selectedAddressId: null
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent: function(){
		var _this = this;
		//地址的选择
		$(document).on('click', '.address-item', function(){
			$(this).addClass('active').siblings('.address-item')
			.removeClass('active');
			_this.data.selectedAddressId = $(this).data('id');
		});
		//订单的提交
		$(document).on('click', '.order-submit', function(){
			var shippingId = _this.data.selectedAddressId;
			//判断是否已选中了一个收货地址
			if(shippingId){
				_order.createOrder({
					shippingId: shippingId,
				},function(res){
					window.location.href = './payment.html?orderNo=' + res.orderNo;
				},function(errMsg){
					_mm.errorTip(errMsg);
				});
			}else{
				_mm.errorTip('请选择地址后再提交订单！');
			}
		});
		//添加新的地址
		$(document).on('click', '.address-new', function(){
			_addressModal.show({
				isUpdate: false,
				/*如果请求生成的收货地址表单成功，则重新刷新页面重新加载*/
				onSuccess: function(){
					_this.loadAddressList();
				}
			});
		});
		//编辑地址
		$(document).on('click', '.address-update', function(e){
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId, function(res){
				//若从服务器端成功传回指定Id的地址信息，则回填到弹出来的地址弹窗中
				_addressModal.show({
					isUpdate: true,
					data: res,
					onSuccess: function(){
						_this.loadAddressList();
					}
				});
			}, function(errMsg){
				_mm.errorTip(errMsg);
			}); 
		});
		//地址的删除
		$(document).on('click', '.address-delete', function(e){
			e.stopPropagation();
			var id = $(this).parents('.address-item').data('id');
			if(window.confirm('确认要删除该地址吗？')){
				_address.deleteAddress(id, function(res){
					_this.loadAddressList();
				}, function(errMsg){
					_mm.errorTip(errMsg);
				});
			}
		});
	},
	//加载地址列表
	loadAddressList: function(){
		var addressListHtml = '',
			_this = this;
		$('.address-con').html('<div class="loading"></div>');
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			addressListHtml = _mm.renderHtml(templateAddress, res);
			$('.address-con').html(addressListHtml);
		},function(errMsg){
			$('.address-con').html('<p class="error-tip">地址加载失败，请刷新后重试！</p>')
		});
	},
	//处理地址列表中选中状态
	addressFilter: function(data){
		if(this.data.selectedAddressId){
			var selectedAddressFlag = false;
			for(var i = 0, length = data.list.length; i < length; i++){
				if(data.list[i].id === this.data.selectedAddressId){
					selectedAddressFlag = true;
					data.list[i].isActive = true;
				}
			}
			//如果以前选中的地址对象不在本次所获取到的地址列表里，则将其删除
			if(!selectedAddressFlag){
				this.data.selectedAddressId = null;
			}
		}
	},
	//加载商品列表
	loadProductList: function(){
		var productListHtml = '';
		$('.product-con').html('<div class="loading"></div>');
		_order.getProductList(function(res){
			productListHtml = _mm.renderHtml(templateProduct, res);
			$('.product-con').html(productListHtml);
		},function(errMsg){
			$('.product-con').html('<p class="error-tip">商品信息加载失败，请刷新后重试！</p>')
		});
	}
};

$(function(){
	_page.init();
});
