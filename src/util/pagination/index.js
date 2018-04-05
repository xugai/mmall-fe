/*
* @Author: Xugai
* @Date:   2018-04-02 17:57:30
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-02 21:55:51
*/
require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');


var Pagination = function(){
	this.defaultOption = {
		container: null,
		pageNum: 1,
		pageRange: 3,
		onSelectPage: null
	};
	//事件的处理
	var _this = this;
	$(document).on('click', '.pg-item', function(){
		var $this = $(this);
		//对于有active和disabled类的按钮点击，我们不做处理
		if($this.hasClass('active') || $this.hasClass('disabled')){
			return;
		}
		typeof _this.option.onSelectPage === 'function' ? 
			_this.option.onSelectPage($this.data('value')) : null;
	});	
};
//渲染分页组件
Pagination.prototype.render = function(userOption){
	//合并选项
	this.option = $.extend({}, this.defaultOption, userOption);
	//判断容器(container)是否为合法的jQuery对象
	if(! (this.option.container instanceof jQuery)){
		return;
	}
	//判断是否只有1页
	if(this.option.pages <= 1){
		return;
	}
	//渲染分页内容
	this.option.container.html(this.getPaginationHtml());
};
//获取分页的html, 形如 |上一页| 1 2 3 4 =5= 6 |下一页| 5/6
Pagination.prototype.getPaginationHtml = function(){
	var html = '',
		pageArray = [],
		option = this.option,
		start = option.pageNum - option.pageRange > 0 ? 
			option.pageNum - option.pageRange : 1,
		end = option.pageNum + option.pageRange > option.pages ?
			option.pages : option.pageNum + option.pageRange;
		//上一页按钮的数据
		pageArray.push({
			name: '上一页',
			value: this.option.prePage,
			disabled: !this.option.hasPreviousPage
		});
		//数字按钮的处理
		for(var i = start; i <= end; i++){
			pageArray.push({
				name: i,
				value: i,
				active: (i === option.pageNum)
			});
		};
		//下一页按钮的数据
		pageArray.push({
			name: '下一页',
			value: this.option.nextPage,
			disabled: !this.option.hasNextPage
		});
		html = _mm.renderHtml(templatePagination, {
			pageArray: pageArray,
			pageNum: option.pageNum,
			pages: option.pages
		});
		return html;
};

module.exports = Pagination;