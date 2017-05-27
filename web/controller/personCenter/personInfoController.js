/*
 * 个人信息
 */
var personInfoApp = angular.module('personInfoApp', []); 
//点击事件的初始化
personInfoApp.run(function (){
    FastClick.attach(document.body); 
});


personInfoApp.controller("personInfoController", function ($scope)
{
    personInfoController.init($scope);
});


var personInfoController = 
{
    scope : null,
    
    personInfoModel : 
    {
    	peronaInfo : {},
    	
    	gender : null,
    	
    	weChatBindText : null,
    	QQBindText : null,
    	mailBindText : null,
    	
    	weChatAccount : "",
    	QQAccount : "",
    	mailAccount : "",
    	
    	headIconLocalUrl : null,
    	
    	hasAddress : false
    },
    
    init : function ($scope)
    {
    	this.scope = $scope; 
    	
    	this.bindClick();
    	
    	this.initData();
    },
    
    initData : function ()
    {
    	localStorage.setItem(localStorageKey.TOTALADDRESS,"");
    	var self = this;
    	
    	$('.animation').css('display','block');
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PERSONALDATA, {}, function(data){
    		
    		self.personInfoModel.peronaInfo = [];
    		self.personInfoModel.userInfo = data;
    		
    		//头像
    		if (self.personInfoModel.userInfo.smallIcon == "")
    		{
    			self.personInfoModel.userInfo.smallIcon = "../img/personCenter/default-icon.png";
    		}
    		
    		//性别
    		if (self.personInfoModel.userInfo.gender == 0)
    		{
    			self.personInfoModel.userInfo.genderText = "女";
    		}
    		else
    		{
    			self.personInfoModel.userInfo.genderText = "男";
    		}
    		
    		//地址
    		if (self.personInfoModel.userInfo.shippingAddress.length == 0)
    		{
    			self.personInfoModel.userInfo.address = "暂无";
    			self.personInfoModel.userInfo.addressStyle = "no_bind";
    			self.personInfoModel.hasAddress = false;
    		}
    		else
    		{
    			self.personInfoModel.hasAddress = true;
    			self.personInfoModel.userInfo.address = self.personInfoModel.userInfo.shippingAddress[0].province + 
    													self.personInfoModel.userInfo.shippingAddress[0].city + 
    													self.personInfoModel.userInfo.shippingAddress[0].district + 
    													self.personInfoModel.userInfo.shippingAddress[0].address;
    		}
    		
    		self.bindTypeTransform();
    		
    		
    		$('.animation').css('display','none');
    		$('.container').css('opacity','1');
    		
    		self.scope.personInfoModel = self.personInfoModel;
    		self.scope.$apply();
    	})
    	
    	
    },
    
    //绑定类型
    bindTypeTransform : function()
    {
    	var self = this;
    	
		if (self.personInfoModel.userInfo.bindInfo.length == 0)
		{
			self.personInfoModel.weChatBindText = "未绑定";
			self.personInfoModel.QQBindText = "未绑定";
			self.personInfoModel.mailBindText = "未绑定";
			
			self.personInfoModel.weChatAccount = "";
			self.personInfoModel.QQAccount = "";
			self.personInfoModel.mailAccount = "";
		}
		else if (self.personInfoModel.userInfo.bindInfo.length == 1)
		{
			if (self.personInfoModel.userInfo.bindInfo[0].bindType == 0)
			{
				self.personInfoModel.weChatBindText = "未绑定";
				self.personInfoModel.QQBindText = "已绑定";
				self.personInfoModel.QQAccount = self.personInfoModel.userInfo.bindInfo[0].bindAccount;
				self.personInfoModel.mailBindText = "未绑定";
			}
			else if (self.personInfoModel.userInfo.bindInfo[0].bindType == 1)
			{
				self.personInfoModel.weChatBindText = "已绑定";
				self.personInfoModel.weChatAccount = self.personInfoModel.userInfo.bindInfo[0].bindAccount;
				self.personInfoModel.QQBindText = "未绑定";
				self.personInfoModel.mailBindText = "未绑定";
			}
			else
			{
				self.personInfoModel.weChatBindText = "未绑定";
				self.personInfoModel.QQBindText = "未绑定";
				self.personInfoModel.mailBindText = "已绑定";
				self.personInfoModel.mailAccount = self.personInfoModel.userInfo.bindInfo[0].bindAccount;
			}
		}
		else if (self.personInfoModel.userInfo.bindInfo.length == 2)
		{
			self.personInfoModel.weChatBindText = "未绑定";
			self.personInfoModel.QQBindText = "未绑定";
			self.personInfoModel.mailBindText = "未绑定";
			
			self.personInfoModel.weChatAccount = "";
			self.personInfoModel.QQAccount = "";
			self.personInfoModel.mailAccount = "";
			for (var i = 0;i < self.personInfoModel.userInfo.bindInfo.length;i ++)
			{
				if (self.personInfoModel.userInfo.bindInfo[i].bindType == 0)
				{
					self.personInfoModel.QQBindText = "已绑定";
					self.personInfoModel.QQAccount = self.personInfoModel.userInfo.bindInfo[i].bindAccount;
				}
				else if (self.personInfoModel.userInfo.bindInfo[i].bindType == 1)
				{
					self.personInfoModel.weChatBindText = "已绑定";
					self.personInfoModel.weChatAccount = self.personInfoModel.userInfo.bindInfo[i].bindAccount;
				}
				else
				{
					self.personInfoModel.mailBindText = "已绑定";
					self.personInfoModel.mailAccount = self.personInfoModel.userInfo.bindInfo[i].bindAccount;
				}
			}
		}
		else
		{
			for (var i = 0; i < self.personInfoModel.userInfo.bindInfo.length; i++)
			{
				if (self.personInfoModel.userInfo.bindInfo[i].bindType == 0)
				{
					self.personInfoModel.QQBindText = "已绑定";
					self.personInfoModel.QQAccount = self.personInfoModel.userInfo.bindInfo[i].bindAccount;
				}
				else if (self.personInfoModel.userInfo.bindInfo[i].bindType == 1)
				{
					self.personInfoModel.weChatBindText = "已绑定";
					self.personInfoModel.weChatAccount = self.personInfoModel.userInfo.bindInfo[i].bindAccount;
				}
				else
				{
					self.personInfoModel.mailBindText = "已绑定";
					self.personInfoModel.mailAccount = self.personInfoModel.userInfo.bindInfo[i].bindAccount;
				}
			}
		}
    	
    },

	//上传头像
	upLoadImg: function(){
		var self = this;
		
		upLoadLocalFile.start("chooseHeadIcon", function(url){
    		self.personInfoModel.userInfo.smallIcon = url;
    		
            var modeInfo = {
                smallIcon : self.personInfoModel.userInfo.smallIcon
            };

            var param = {
               modInfo : JSON.stringify(modeInfo)
            };
          
            
       
            jqAjaxRequest.asyncAjaxRequest(apiUrl.API_MOD_SELF_INFO, param, function(data)
            {
               $confirmTip.show("修改成功");
               self.initData();
            })
    	})
	},
	
    bindClick  : function ()
    {
    	var self = this;
    	
    	//修改个人头像
    	self.upLoadImg();

    	//修改昵称
    	self.scope.onClickModName = function()
    	{
    		location.href = pageUrl.MOD_NAME;
    	};
    	//修改性别
    	self.scope.onClickModGender = function()
    	{
    		self.personInfoModel.gender = null;
    		$('.choose-gender-bg').css('display','block');
    		
    		$(".choose-gender").children('li').unbind().click(function()
    		{
    			if ($(this).val() == 0)
	    		{
	    			self.personInfoModel.gender = 0;
	    		}
	    		else
	    		{
	    			self.personInfoModel.gender = 1;
	    		}
	    		
	    		$('.choose-gender-bg').css('display','none');
				
				var modeInfo = 
	    		{
	    			gender : self.personInfoModel.gender
	    		};
	    		
	    		var param = 
	    		{
	    			modInfo : JSON.stringify(modeInfo)
	    		};
				
				jqAjaxRequest.asyncAjaxRequest(apiUrl.API_MOD_SELF_INFO, param, function(data)
				{
					$confirmTip.show("修改成功");
					self.initData();
				})
    		})
    	};
    	
    	self.scope.onClickSetMess = function(){
    		
    		
    		location.href = pageUrl.MY_MESSAGE_SET_PAGE + "?addType=" + 1;
    	};
    	
    	
    	self.scope.existWx = function(){
    		
    		location.href = "../login.html";
    	};
    	
    	self.scope.onClickToMyCustomer  = function(){
    		
    		
    		location.href = pageUrl.MY_CUSTOMER;
    	};
    	
    	//修改收货地址
    	self.scope.onClickModAddress = function()
    	{
    		if (self.personInfoModel.hasAddress)
    		{
    			location.href = pageUrl.MOD_ADDRESS;
    		}
    		else
    		{
                localStorage.setItem(localStorageKey.addType, 1);
    			location.href = pageUrl.ADD_ADDRESS;
    		}
    	};
    	
    	//绑定
    	self.scope.onClickAccountBind = function(index)
    	{
    		if (index == 0)
    		{
    			location.href = "bindAccount.html?bindType=" + 1 + "&&bindAccount=" + self.personInfoModel.weChatAccount;
    		}
    		else if (index == 1)
    		{
    			location.href = "bindAccount.html?bindType=" + 0 + "&&bindAccount=" + self.personInfoModel.QQAccount;
    		}
    		else if (index == 2)
    		{
	    		location.href = "bindAccount.html?bindType=" + 2 + "&&bindAccount=" + self.personInfoModel.mailAccount;
    		}
    	}
    }
};
