/*
* @Author: Xugai
* @Date:   2018-03-25 21:35:07
* @Last Modified by:   Xugai
* @Last Modified time: 2018-05-14 18:08:47
*/


var conf = {
	serverHost: ''
};
var hogan = require('hogan.js');

var _mm = {
	require: function(param){
		var _this = this;
		$.ajax({
			type 		: 		param.method || 'get',
			url			:  		param.url || '',
			dataType	: 		param.type || 'json',
			data 		: 		param.data || '',
			success		: 		function(res){
				/*
					短路原理：
					1、只要“&&”前面是false，无论“&&”后面是true还是false，结果都将返“&&”前面的值;
					2、只要“&&”前面是true，无论“&&”后面是true还是false，结果都将返“&&”后面的值;
				*/
				if(res.status === 0){
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				//若当前用户没有登录，则要强制登录
				else if(res.status === 10){
					_this.doLogin();
				}
				//若请求的数据错误
				else if(res.status === 1){
					typeof param.error === 'function' && param.error(res.msg); 
				}
			},
			//若我们发送的ajax请求失败了，比如404或者503错误，则执行如下代码
			error		: 		function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
 		});
	},
	//获取服务器地址
	getServerUrl: function(path){
		return conf.serverHost + path;
	},
	//获取url参数
	getUrlParam: function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		//window.location.search得到的是url中从'?'开始到后面的字符串
		//substr()返回一个从指定位置开始的指定长度的子字符串，这里参数为1，说明是把开头的'?'去掉
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//渲染html模板
	renderHtml: function(htmlTemplate,data){
		var template = hogan.compile(htmlTemplate),
		result = template.render(data);
		return result;
	},
	//操作成功提示
	successTip: function(msg){
		alert(msg || '操作成功！');
	},
	//操作失败提示
	errorTip: function(msg){
		alert(msg || '哪个地方出错了，再检查一下！');
	},
	//字段的验证，包括非空、手机号和邮箱的判断
	validate: function(value,type){
		//必填数据的验证
		if('require' === type){
			//如果在必填区填写了数据，那就返回true，表明有在必填区填数据，否则返回false，表明没有在必填区填数据
			return !!value;
		}
		//手机号的验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		//邮箱的验证
		if('email' === type){
			return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
		}
	},
	//统一登录处理
	doLogin: function(){
		/*
			把当前窗口中的URL改为访问登录页面时的URL，并把当前的页面地址作为参数放进URL里，好让用户登录完后
			能重新跳转到先前浏览的页面，提高用户体验度。
		*/
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	//返回主页
	goHome: function(){
		window.location.href = './index.html';
	}
};

module.exports = _mm;