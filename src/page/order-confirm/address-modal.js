/*
* @Author: Xugai
* @Date:   2018-04-11 09:37:56
* @Last Modified by:   Xugai
* @Last Modified time: 2018-04-12 16:20:19
*/

var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var _cities = require('util/cities/index.js');
var templateAddressModal = require('./address-modal.string');


var _addressModal = {
	show: function(option){
		//option的绑定
		this.option = option;
		this.$modalWrap = $('.modal-wrap');
		//渲染页面
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		this.$modalWrap.find('#receiver-province').change(function(){
			var selectedProvince = $(this).val();
			_this.loadCities(selectedProvince);
		});
		this.$modalWrap.find('.address-btn').click(function(){
			var receiverInfo = _this.getReceiverInfo(),
				isUpdate = _this.option.isUpdate;
				//使用新地址，且验证通过
				if(!isUpdate && receiverInfo.status){
					_address.save(receiverInfo.data, function(res){
						_mm.successTip('地址添加成功！');
						_this.hide();
						typeof _this.option.onSuccess === 'function' &&
						_this.option.onSuccess(res);
					},function(errMsg){
						_mm.errorTip(errMsg);
					});
				}
				//编辑更新以前的旧地址，且验证通过
				else if(isUpdate && receiverInfo.status){
					_address.update(receiverInfo.data, function(res){
						_mm.successTip('地址编辑成功！');
						_this.hide();
						typeof _this.option.onSuccess === 'function' &&
						_this.option.onSuccess(res);
					},function(errMsg){
						_mm.errorTip(errMsg);
					});
				}
				//验证不通过
				else{
					_mm.errorTip(receiverInfo.errMsg) || '哪里出错了？重新刷新下看看！';
				}
		});
		//防止由鼠标点击触发的冒泡事件，误导上级元素捕获到点击事件而关闭掉弹窗
		this.$modalWrap.find('.modal-container').click(function(e){
			e.stopPropagation();
		});
		//点击叉号或者蒙版区域，关闭地址弹窗
		this.$modalWrap.find('.close').click(function(e){
			_this.hide();
		});
	},
	loadModal: function(){
		var addressModalHtml = _mm.renderHtml(templateAddressModal, {
			isUpdate: this.option.isUpdate,
			data: this.option.data
		});
		this.$modalWrap.html(addressModalHtml);
		//加载省份
		this.loadProvince();
	},
	//加载省份信息
	loadProvince: function(){
		var provinces = _cities.getProvinces() || [],
			$provinceSelect = this.$modalWrap.find('#receiver-province');
		$provinceSelect.html(this.getSelectOption(provinces));
		if(this.option.isUpdate && this.option.data.receiverProvince){
			$provinceSelect.val(this.option.data.receiverProvince);
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	//加载城市信息
	loadCities: function(selectedProvince){
		var cities = _cities.getCities(selectedProvince),
			$citySelect = this.$modalWrap.find('#receiver-city');
		$citySelect.html(this.getSelectOption(cities));
		if(this.option.isUpdate && this.option.data.receiverCity){
			$citySelect.val(this.option.data.receiverCity);
		}
	},
	//获取select框的选项，输入: array,输出: html
	getSelectOption: function(optionArray){
		var html = '<option>请选择</option>';
		for(var i = 0, length = optionArray.length; i < length; i++){
			html += '<option value="'+ optionArray[i] + '">' + optionArray[i] + '</option>';
		}
		return html;
	},
	//获取表单里收件人的信息，并做表单的验证
	getReceiverInfo: function(){
		var receiverInfo = {},
			result = {
				status: false
			};
			receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
			receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
			receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
			receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
			receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
			receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
			
			if(this.option.isUpdate){
				receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
			}
			//表单验证
			if(!receiverInfo.receiverName){
				result.errMsg = '请输入收件人姓名！';
			}
			else if(!receiverInfo.receiverProvince){
				result.errMsg = '请选择收货人的省份！';
			}
			else if(!receiverInfo.receiverCity){
				result.errMsg = '请选择收货人的城市！';
			}
			else if(!receiverInfo.receiverAddress){
				result.errMsg = '请输入收货人的详细地址！';
			}
			else if(!receiverInfo.receiverPhone){
				result.errMsg = '请输入收货人的联系方式！';
			}
			//所有的验证都通过了
			else{
				result.status = true,
				result.data = receiverInfo;
			}
			return result;
	},
	hide: function(){
		this.$modalWrap.empty();
	} 
};

module.exports = _addressModal;
