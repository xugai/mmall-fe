/*
* @Author: Xugai
* @Date:   2018-03-28 11:59:55
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-01 21:34:24
*/
require('./index.css');
var _mm = require('util/mm.js');

//通用页面头部
var header = {
	init: function(){
		this.bindEvent();
		this.onLoad();
	},
	onLoad: function(){
		var keyword = _mm.getUrlParam('keyword');
		//如果keyword存在URL中，说明用户先前搜索过商品，则要把搜索的商品名称回填到搜索栏中
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent: function(){
		var _this = this;
		//点击搜索按钮后，进行提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//如果用户在搜索栏中输入完商品名称之后直接按回车搜索，那我们也要监听起来
		/*
			keyup事件就是用户敲击键盘直到松手后触发的事件，keyCode为13代表用户最后触碰的按键是回车键
		*/
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		})
	},
	//搜索的提交
	searchSubmit: function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			_mm.goHome();
		}
	}
};

header.init();