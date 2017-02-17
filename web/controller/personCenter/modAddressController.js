/*
 * 
 * 修改地址
 * 
 */
var modAddressApp = angular.module('modAddressApp', []); 
//点击事件的初始化
modAddressApp.run(function (){
    FastClick.attach(document.body); 
})


modAddressApp.controller("modAddressController", function ($scope)
{
    modAddressController.init($scope);
});


var modAddressController = 
{
    scope : null,
    
    modAddressModel : 
    {
    	id : null,
    	acceptName : null,
    	mobile : null,
    	province : null,
    	city : null,
    	district : null,
    	address : null,
    	isCommon : null,
    	
    	
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
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PERSONALDATA, {}, function(data)
    	{
    		if (data.shippingAddress.length > 0)
    		{
    			self.modAddressModel.id = data.shippingAddress[0].id;
    			self.modAddressModel.acceptName = data.shippingAddress[0].acceptName;
    			self.modAddressModel.mobile = data.shippingAddress[0].mobile;
    			self.modAddressModel.province = data.shippingAddress[0].province;
    			self.modAddressModel.city = data.shippingAddress[0].city;
    			self.modAddressModel.district = data.shippingAddress[0].district;
    			self.modAddressModel.address = data.shippingAddress[0].address;
    			self.modAddressModel.isCommon = data.shippingAddress[0].isCommon;
    			
    			if (self.modAddressModel.isCommon == 0)
    			{
    				//self.modAddressModel.defaultAddressIcon = "../img/personCenter/no.png";
    				self.showOrHide(0);
    			}
    			else
    			{
    				//self.modAddressModel.defaultAddressIcon = "../img/personCenter/yes.png";
    				self.showOrHide(1);
    			}
    			
    			if (commonFu.isEmpty(localStorage.getItem(localStorageKey.TOTALADDRESS)))
    			{
    				var str = self.modAddressModel.province + self.modAddressModel.city + self.modAddressModel.district;
    				$("#totalAddress").html(str.replace(" ",""));
    			}
    			else
    			{
    				self.modAddressModel.totalAddress = JSON.parse(localStorage.getItem(localStorageKey.TOTALADDRESS));
    				var str = self.modAddressModel.totalAddress.province + self.modAddressModel.totalAddress.city + self.modAddressModel.totalAddress.district;
    				$("#totalAddress").html(str.replace(" ",""));
    			}
    			
    		}
    		else
    		{
    			//self.modAddressModel.defaultAddressIcon = "../img/personCenter/no.png";
    			self.showOrHide(0);
    			if (!commonFu.isEmpty(localStorage.getItem(localStorageKey.TOTALADDRESS)))
    			{
    				self.modAddressModel.totalAddress = JSON.parse(localStorage.getItem(localStorageKey.TOTALADDRESS));
    				var str = self.modAddressModel.totalAddress.province + self.modAddressModel.totalAddress.city + self.modAddressModel.totalAddress.district;
    				$("#totalAddress").html(str.replace(" ",""));
    			}
    		}
    		
    		self.scope.modAddressModel = self.modAddressModel;
    		self.scope.$apply();
    	})
    	
    },
    
    //显示隐藏选择按钮
    showOrHide : function(type){
    	if(type == 0)
    	{
    		$("#mod-no").css("display","block");
    		$("#mod-yes").css("display","none");
    	}
    	else
    	{
    		$("#mod-no").css("display","none");
    		$("#mod-yes").css("display","block");
    	}
    	
    },
    
    bindClick  : function ()
    {
    	var self = this;
    	
    	//选择地区
    	self.scope.onClickToChooseAddress = function()
    	{
    		location.href = pageUrl.ADDRESS_CHOOSE + "?addressType=" + 0;
    	}
    	
    	//是否设为默认
    	self.scope.onClickSetDefaultAddress = function()
    	{
    		if (self.modAddressModel.isCommon == 0)
    		{
    			//self.modAddressModel.defaultAddressIcon = "../img/personCenter/yes.png";
    			self.showOrHide(1);
    			self.modAddressModel.isCommon = 1;
    		}
    		else
    		{
    			//self.modAddressModel.defaultAddressIcon = "../img/personCenter/no.png";
    			self.showOrHide(0);
    			self.modAddressModel.isCommon = 0;
    		}
    		
    	}
    	
    	
    	//提交
    	self.scope.onClickSubmitModAddress = function()
    	{
    		var modInfo = {};
    		modInfo.acceptName = self.modAddressModel.acceptName;
    		modInfo.mobile = self.modAddressModel.mobile;
    		if (commonFu.isEmpty(localStorage.getItem(localStorageKey.TOTALADDRESS)))
    		{
    			modInfo.province = self.modAddressModel.province;
    			modInfo.city = self.modAddressModel.city;
    			modInfo.district = self.modAddressModel.district;
    		}
    		else
    		{
    			modInfo.province = self.modAddressModel.totalAddress.province;
    			modInfo.city = self.modAddressModel.totalAddress.city;
    			modInfo.district = self.modAddressModel.totalAddress.district;
    		}
    		
    		if ((!commonFu.isEmpty(self.modAddressModel.address) && self.modAddressModel.address.length < 5) || $("#modAddressText").val() == "")
    		{
    			$confirmTip.show("详细地址不得少于5个字");
    			return;
    		}
    		
    		if (commonFu.isEmpty(self.modAddressModel.acceptName))
    		{
    			$confirmTip.show("请填写收货人");
    			return;
    		}
    		
    		if (commonFu.isEmpty(self.modAddressModel.mobile))
    		{
    			$confirmTip.show("请填写联系方式");
    			return;
    		}
    		
    		if (!commonFu.isLegalPhone(self.modAddressModel.mobile))
    		{
    			$confirmTip.show("请填写正确的手机号");
    			return;
    		}
    		
    		modInfo.address = self.modAddressModel.address;
    		modInfo.isCommon = self.modAddressModel.isCommon;
    		
    		var params =
    		{
    			addressId : self.modAddressModel.id,
    			modInfo : JSON.stringify(modInfo),
    		}
    		
    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_MOD_SHIPPING_ADDRESS, params, function(data)
    		{
    			$confirmTip.show("修改成功");
    			
    			setTimeout(function()
    			{
    				localStorage.setItem(localStorageKey.TOTALADDRESS,"");
    				location.href = pageUrl.PERSON_INFO;
    			},500)
    		})
    		
    	}
    	
    	
    },
    
    
}
