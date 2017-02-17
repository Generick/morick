/*
 * 账户中心
 */
app.controller("ctrl", function ($scope)
{
    PersonCenterCtrl.init($scope);
});

var PersonCenterCtrl =
{
    scope : null,
    
    personCenterModel : 
    {
    	userId : null,
    	userInfo : {}
    },
    
    init : function ($scope)
    {
    	this.scope = $scope;

    	this.bindClick();
    	
    	this.initData();

        //initTab.start(this.scope, 3); //底部导航
        initTab.start(this.scope, 2); //底部导航
    },
    
    initData : function ()
    {
    	var self = this;

    	$('.animation').show();
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
    		
    		self.personCenterModel.userInfo = [];
    		self.personCenterModel.userInfo = data.userInfo;
    		self.personCenterModel.userId = self.personCenterModel.userInfo.userId;
    		
    		if (self.personCenterModel.userInfo.gender == 1)
    		{
    			self.personCenterModel.userInfo.genderIcon = "img/personCenter/male.png";
    		    
    		    if (self.personCenterModel.userInfo.smallIcon == "")
    		    {
    			    self.personCenterModel.userInfo.smallIcon = "img/personCenter/default-male.png";
    		    }
    		}
    		else
    		{   
    			self.personCenterModel.userInfo.genderIcon = "img/personCenter/female.png";
    			
    			if (self.personCenterModel.userInfo.smallIcon == "")
    		    {
    				self.personCenterModel.userInfo.smallIcon = "img/personCenter/default-fmale.png";
    		    }
    		}

    		$('.animation').hide();
    		$('.container').css('opacity','1');

    		self.scope.personCenterModel = self.personCenterModel;
    		self.scope.$apply();
    	})
    },
    
    bindClick  : function ()
    {
    	var self = this;

    	//个人信息
    	self.scope.onClickToPersonInfo = function()
    	{
    		location.href = pageUrl.PERSON_INFO;
    	};
    	
    	//我的账户
    	self.scope.onClickToMyAccount = function()
    	{
    		location.href = pageUrl.MY_ACCOUNT;
    	};

    	//我的竞拍
    	self.scope.onClickToMyBidding = function()
    	{
    		location.href = pageUrl.MY_BIDDING + "?userId=" + self.personCenterModel.userId;
    	};
    	
    	//我的订单--全部
    	self.scope.onClickToAllOrderList = function()
    	{
    		location.href = pageUrl.MY_ORDER_LIST + "?orderType=" + "";
    	};

    	//待付款
    	self.scope.onClickToWaitForPay = function()
    	{
    		location.href = pageUrl.MY_ORDER_LIST + "?orderType=" + 1;
    	};

    	//待发货
    	self.scope.onClickToWaitForDelivery = function()
    	{
    		location.href = pageUrl.MY_ORDER_LIST + "?orderType=" + 3;
    	};

    	//已完成
    	self.scope.onClickToHasDone = function()
    	{
    		location.href = pageUrl.MY_ORDER_LIST + "?orderType=" + 4;
    	};

    	//付费服务
    	self.scope.onClickToMyPayService = function()
    	{
    		location.href = pageUrl.SELF_PAID_SERVICES;
    	};
    	
    	//我的收货地址
    	self.scope.onClickToMyAddress = function()
    	{
    		location.href = pageUrl.MY_ADDRESS_LIST + "?userId=" + self.personCenterModel.userId;
    	};
    	
    	//我的浏览记录
    	self.scope.onClickToMyScanRecords = function()
    	{
    		location.href = pageUrl.SCAN_RECORDS;
    	};
    }
};
