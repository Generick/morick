/*
 * 
 * 地址列表--添加新地址
 * 
 */
var addAddressApp = angular.module('addAddressApp', []); 
//点击事件的初始化
addAddressApp.run(function (){
    FastClick.attach(document.body); 
});


addAddressApp.controller("addAddressController", function ($scope)
{
    addAddressController.init($scope);
});


var addAddressController = 
{
    scope : null,
    
    addAddressModel : 
    {
    	id : null,
    	acceptName : null,
    	mobile : null,
    	province : null,
    	city : null,
    	district : null,
    	address : null,
    	isCommon : null,
    	
    	defaultAddressIcon : 0,
    	
    	totalAddress : {}
    },
    
    init : function ($scope)
    {
        this.scope = $scope;

    	this.initArea();
    	
    	this.bindClick();
    },
    
    initArea : function()
    {
    	var self = this;
    	
    	self.addAddressModel.isCommon = 0;
    	
    	if (!commonFu.isEmpty(localStorage.getItem(localStorageKey.acceptName)))
    	{
	    	self.addAddressModel.acceptName = localStorage.getItem(localStorageKey.acceptName);
    	}
    	if (!commonFu.isEmpty(localStorage.getItem(localStorageKey.mobile)))
    	{
	    	self.addAddressModel.mobile = localStorage.getItem(localStorageKey.mobile);
    	}
    	if (!commonFu.isEmpty(localStorage.getItem(localStorageKey.address)))
    	{
	    	self.addAddressModel.address = localStorage.getItem(localStorageKey.address);
    	}
    	
    	if (!commonFu.isEmpty(localStorage.getItem(localStorageKey.TOTALADDRESS)))
    	{
    		self.addAddressModel.totalAddress = JSON.parse(localStorage.getItem(localStorageKey.TOTALADDRESS));
			var str = self.addAddressModel.totalAddress.province + self.addAddressModel.totalAddress.city + self.addAddressModel.totalAddress.district;
			$("#addTotalAddress").html(str.replace(" ",""));
    	}

    	if (commonFu.isEmpty(self.addAddressModel.isCommon) || self.addAddressModel.isCommon == 0)
    	{
    		self.showOrHide(0);
    	}
    	else
    	{
    		self.showOrHide(1);
    	}
    	
        
    	self.scope.addAddressModel = self.addAddressModel;
    },


    //显示隐藏选择按钮
    showOrHide : function(type){
    	if(type == 0)
    	{
    		$("#addno").css("display","block");
    		$("#addyes").css("display","none");
    	}
    	else
    	{
    		$("#addno").css("display","none");
    		$("#addyes").css("display","block");
    	}
    	
    },
    
    bindClick  : function ()
    {
    	var self = this;
    	
    	//选择地区
    	self.scope.onClickToChooseAddress = function()
    	{
    		if (!commonFu.isEmpty(self.addAddressModel.acceptName))
	    	{
		    	localStorage.setItem(localStorageKey.acceptName,self.addAddressModel.acceptName);
	    	}
	    	if (!commonFu.isEmpty(self.addAddressModel.mobile))
	    	{
		    	localStorage.setItem(localStorageKey.mobile,self.addAddressModel.mobile);
	    	}
	    	if (!commonFu.isEmpty(self.addAddressModel.address))
	    	{
		    	localStorage.setItem(localStorageKey.address,self.addAddressModel.address);
	    	}
    		location.href = pageUrl.ADDRESS_CHOOSE + "?addressType=" + 2;
    	};
    	
    	//是否设为默认
    	self.scope.onClickSetDefaultAddress = function()
    	{
    		if (self.addAddressModel.isCommon == 0)
    		{
    			//self.addAddressModel.defaultAddressIcon = "../img/personCenter/yes.png";
    			self.showOrHide(1);
    			self.addAddressModel.isCommon = 1;
    		}
    		else
    		{
    			//self.addAddressModel.defaultAddressIcon = "../img/personCenter/no.png";
    			self.showOrHide(0);
    			self.addAddressModel.isCommon = 0;
    		}
    	
    	};
    	
    	
    	//提交
    	self.scope.onClickSubmitAddAddress = function()
    	{
    		var params = {};
    		
    		if (commonFu.isEmpty(self.addAddressModel.address) || $("#addAddressText").val().length < 5)
    		{
                $dialog.msg("详细地址不得少于5个字");
    			return;
    		}
    		
    		if (commonFu.isEmpty(self.addAddressModel.acceptName))
    		{
                $dialog.msg("请填写收货人");
    			return;
    		}
    		
    		if (commonFu.isEmpty(self.addAddressModel.mobile))
    		{
                $dialog.msg("请填写联系方式");
    			return;
    		}
    		
    		if (!commonFu.isLegalPhone(self.addAddressModel.mobile))
    		{
                $dialog.msg("请填写正确的手机号");
    			return;
    		}
    		
    		if ($("#addTotalAddress").html() == "")
    		{
                $dialog.msg("请选择所在地区");
    			return;
    		}
    		
    		params.acceptName = self.addAddressModel.acceptName;
    		params.mobile = self.addAddressModel.mobile;
    		params.province = self.addAddressModel.totalAddress.province;
			params.city = self.addAddressModel.totalAddress.city;
			params.district = self.addAddressModel.totalAddress.district;
    		params.address = self.addAddressModel.address;
    		params.isCommon = self.addAddressModel.isCommon;
    		
    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_ADD_SHIPPING_ADDRESS, params, function(data)
    		{
    			$dialog.msg("添加成功");
                localStorage.setItem(localStorageKey.TOTALADDRESS,"");
    			localStorage.setItem(localStorageKey.acceptName,"");
	        	localStorage.setItem(localStorageKey.mobile,"");
	        	localStorage.setItem(localStorageKey.address,"");

                if (!commonFu.isEmpty(localStorage.getItem(localStorageKey.addType)))
                {
                    setTimeout(function()
                    {
                        location.href = pageUrl.PERSON_INFO;
                    },500)
                }
                else
                {   
                	if(localStorage.getItem(localStorageKey.TO_ADDRESS_TYPE) == 3) //判断从哪里进入地址列表)
                    {
                    	
                    		setTimeout(function(){
                    			var commodifyId = localStorage.getItem("commodifyId");
			                    var specialPrice =  localStorage.getItem("specialPrice");
			                    var thisAcPage =  localStorage.getItem("thisAcPage");
			                    
			                    var obj = new Base64();
			                    var ids = obj.encode(commodifyId);
			                    var prices = obj.encode(specialPrice);
			                    var pages = obj.encode(thisAcPage);
			                    var str =  pageUrl.PRE_PAY_PAGE + "?commodifyId=" + ids + "&specialPrice=" + prices + "&thisAcPage=" + pages;
                    			location.href = encodeURI(str);
                    			
//                  			location.href =  pageUrl.PRE_PAY_PAGE + "?commodifyId=" + commodifyId + "&specialPrice=" + specialPrice + "&thisAcPage=" + thisAcPage;
                    		},500)
                    }
                    else
                    {  
                    	setTimeout(function()
	                    {   
	                    	
	                    	var obj = new Base64();
	                    	var usID = obj.encode(localStorage.getItem(localStorageKey.userId));
	                    	var str = pageUrl.MY_ADDRESS_LIST + "?userId=" + usID;
	                    	
	                    	location.href = encodeURI(str)
//	                    	pageUrl.MY_ADDRESS_LIST + "?userId=" + localStorage.getItem(localStorageKey.userId);
	                    	
	                        
	                    },500)
                    		
                    }
                    
                }
    		})
    	}
    }
};
