/*
* @Author: Xugai
* @Date:   2018-04-01 18:06:50
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-03 16:21:09
*/
require('../module.js');
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/common/footer/index.css');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var _page = {
	data: {
		listParam: {
			keyword: _mm.getUrlParam('keyword') || '',
			categoryId: _mm.getUrlParam('categoryId') || '',
			orderBy: _mm.getUrlParam('orderBy') || 'default',
			pageNum: _mm.getUrlParam('pageNum') || 1,
			pageSize: _mm.getUrlParam('pageSize') || 20
		}
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadList();
	},
	bindEvent: function(){
		var _this = this;
		//排序的点击事件
		$('.sort-item').click(function(){
			/*优化js处理*/
			var $this = $(this);
			_this.data.listParam.pageNum = 1;
			//如果用户点击的是默认排序的按钮
			if($this.data('type') === 'default'){
				//如果已经是active样式
				if($this.hasClass('active')){
					return;
				}
				else{
					//为当前所点击的按钮增添active样式，消除其他同类型按钮的点击样式
					$this.addClass('active').siblings('.sort-item').
					removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			//否则用户点击的如果是价格排序按钮
			else if($this.data('type') === 'price'){
				//增添active样式的处理
				$this.addClass('active').siblings('.sort-item').
				removeClass('active asc desc');
				//升序降序的切换处理
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			_this.loadList();
		});
	},
	//加载list数据
	loadList: function(){
		var _this = this;
		var listParam = this.data.listParam;
		var listHtml = '';
		/*优化js处理*/
		$pListCon = $('.p-list-con');
		//删除参数中不必要的字段
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		$pListCon.html('<div class="loading"></div>');
		//请求接口
		_product.getProductList(listParam, function(res){
			//渲染list页面
			listHtml = _mm.renderHtml(templateIndex, {
				list: res.list
			});
			$pListCon.html(listHtml);
			//加载分页组件
			_this.loadPagination({
				hasPreviousPage: res.hasPreviousPage,
				prePage: res.prePage,
				hasNextPage: res.hasNextPage,
				nextPage: res.nextPage,
				pageNum: res.pageNum,
				pages: res.pages
			});
		}, function(errMsg){
			_mm.errorTip(errMsg);
		});
	},
	//加载分页信息
	loadPagination: function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({}, pageInfo, {
			container: $('.pagination'),
			onSelectPage: function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}));
	}
};

$(function(){
	_page.init();
});