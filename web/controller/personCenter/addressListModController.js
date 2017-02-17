/*
 * 
 * 地址列表--修改地址
 * 
 */
var addressListModApp = angular.module('addressListModApp', []); 
//点击事件的初始化
addressListModApp.run(function (){
    FastClick.attach(document.body); 
})


addressListModApp.controller("addressListModController", function ($scope)
{
    addressListModController.init($scope);
});


var addressListModController = 
{
    scope : null,
    
    addressListModModel : 
    {
    	addressInfo : {},
    	id : null,
    	acceptName : null,
    	mobile : null,
    	province : null,
    	city : null,
    	district : null,
    	address : null,
    	isCommon : null,
    	
//  	defaultAddressIcon : null,
    	
    	totalAddress : {},
    },
    
    init : function ($scope)
    {
    	this.scope = $scope; 
    	
    	this.bindClick();
    	
    	this.initData();
    	
    },
    
    initData : function()
    {
    	var self = this;
    	
    	self.addressListModModel.id = commonFu.getQueryStringByKey("id");
    	
    	var param = 
    	{
    		addressId : self.addressListModModel.id,
    	}
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SHIPPING_ADDRESSINFO, param, function(data)
    	{
    		self.addressListModModel.addressInfo = {};
    		self.addressListModModel.addressInfo = data.addressInfo;
    		
			self.addressListModModel.acceptName = self.addressListModModel.addressInfo.acceptName;
			self.addressListModModel.mobile = self.addressListModModel.addressInfo.mobile;
			self.addressListModModel.province = self.addressListModModel.addressInfo.province;
			self.addressListModModel.city = self.addressListModModel.addressInfo.city;
			self.addressListModModel.district = self.addressListModModel.addressInfo.district;
			self.addressListModModel.address = self.addressListModModel.addressInfo.address;
			self.addressListModModel.isCommon = self.addressListModModel.addressInfo.isCommon;
			
			if (self.addressListModModel.isCommon == 0)
			{
//				self.addressListModModel.defaultAddressIcon = "../img/personCenter/no.png";
                self.showOrHide(0);
			}
			else
			{
//				self.addressListModModel.defaultAddressIcon = "../img/personCenter/yes.png";
				self.showOrHide(1);
			}
			
			if (commonFu.isEmpty(localStorage.getItem(localStorageKey.TOTALADDRESS)))
			{
				var str = self.addressListModModel.province + self.addressListModModel.city + self.addressListModModel.district;
				$("#listTotalAddress").html(str.replace(" ",""));
			}
			else
			{
				self.addressListModModel.totalAddress = JSON.parse(localStorage.getItem(localStorageKey.TOTALADDRESS));
				var str = self.addressListModModel.totalAddress.province + self.addressListModModel.totalAddress.city + self.addressListModModel.totalAddress.district;
				$("#listTotalAddress").html(str.replace(" ",""));
			}
    			
    		
    		self.scope.addressListModModel = self.addressListModModel;
    		self.scope.$apply();
    	})
    	
    },
    
    //显示隐藏选择按钮
    showOrHide : function(type){
    	if(type == 0)
    	{
    		$("#adList-no").css("display","block");
    		$("#adList-yes").css("display","none");
    	}
    	else
    	{
    		$("#adList-no").css("display","none");
    		$("#adList-yes").css("display","block");
    	}
    	
    },
    
    
    
    bindClick  : function ()
    {
    	var self = this;
    	
    	//选择地区
    	self.scope.onClickToChooseAddress = function()
    	{
    		location.href = pageUrl.ADDRESS_CHOOSE + "?addressType=" + 1;
    	}
    	
    	//是否设为默认
    	self.scope.onClickSetDefaultAddress = function()
    	{
    		if (self.addressListModModel.isCommon == 0)
    		{
//  			self.addressListModModel.defaultAddressIcon = "../img/personCenter/yes.png";
    			self.showOrHide(1);
    			self.addressListModModel.isCommon = 1;
    		}
    		else
    		{
//  			self.addressListModModel.defaultAddressIcon = "../img/personCenter/no.png";
				self.showOrHide(0);
    			self.addressListModModel.isCommon = 0;
    		}
    		
    	}
    	
    	
    	//提交
    	self.scope.onClickSubmitModAddress = function()
    	{
    		var modInfo = {};
    		
    		if (commonFu.isEmpty(localStorage.getItem(localStorageKey.TOTALADDRESS)))
    		{
    			modInfo.province = self.addressListModModel.province;
    			modInfo.city = self.addressListModModel.city;
    			modInfo.district = self.addressListModModel.district;
    		}
    		else
    		{
    			modInfo.province = self.addressListModModel.totalAddress.province;
    			modInfo.city = self.addressListModModel.totalAddress.city;
    			modInfo.district = self.addressListModModel.totalAddress.district;
    		}
    		
    		if (self.addressListModModel.address.length < 5)
    		{
    			$confirmTip.show("详细地址不得少于5个字");
    			return;
    		}
    		
    		if (commonFu.isEmpty(self.addressListModModel.acceptName))
    		{
    			$confirmTip.show("请填写收货人");
    			return;
    		}
    		
    		if (commonFu.isEmpty(self.addressListModModel.mobile))
    		{
    			$confirmTip.show("请填写联系方式");
    			return;
    		}
    		
    		if (!commonFu.isLegalPhone(self.addressListModModel.mobile))
    		{
    			$confirmTip.show("请填写正确的手机号");
    			return;
    		}
    		
    		modInfo.acceptName = self.addressListModModel.acceptName;
    		modInfo.mobile = self.addressListModModel.mobile;
    		modInfo.address = self.addressListModModel.address;
    		modInfo.isCommon = self.addressListModModel.isCommon;
    		
    		var params =
    		{
    			addressId : self.addressListModModel.id,
    			modInfo : JSON.stringify(modInfo),
    		}
    		
    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_MOD_SHIPPING_ADDRESS, params, function(data)
    		{
    			$confirmTip.show("修改成功");
    			
    			setTimeout(function()
    			{
    				localStorage.setItem(localStorageKey.TOTALADDRESS,"");
    				window.history.go(-1);
    			},500)
    		})
    		
    	}
    	
    	
    },
    
    
}
