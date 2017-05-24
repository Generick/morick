/*
 * 
 * 我的账户
 * 
 */
var myAccountApp = angular.module('myAccountApp', []); 
//点击事件的初始化
myAccountApp.run(function (){
    FastClick.attach(document.body); 
})


myAccountApp.controller("myAccountController", function ($scope)
{
    myAccountController.init($scope);
});


var myAccountController = 
{
    scope : null,
    
    myAccountModel : 
    {
    	userInfo : {},
    	balance : null,
    	frozen : null,
    	
    },
    
    init : function ($scope)
    {
    	this.scope = $scope; 
    	
    	this.bindClick();
    	
    	this.initData();
    },
    
    initData : function ()
    {
    	var self = this;
    	
    	$('.animation').css('display','block');
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
    		
//  		console.log(JSON.stringify(data))
    		
    		self.myAccountModel.userInfo = data.userInfo;
    		
    		$('.animation').css('display','none');
    		$('.container').css('opacity','1');
    		
    		
    		self.myAccountModel.userInfo.balance = commonFu.toDecimals(self.myAccountModel.userInfo.balance);
    		self.myAccountModel.userInfo.frozen = commonFu.toDecimals(self.myAccountModel.userInfo.frozen);
    		self.scope.myAccountModel = self.myAccountModel;
    		
    		self.scope.$apply();
    	})
    	
    	
    },
    
   
    bindClick  : function ()
    {
    	var self = this;
    	
    	
    	//充值
    	self.scope.onClickRechargeAccount = function()
    	{
    		location.href = pageUrl.ACCOUNT_RECHARGE;
    	};
    	
    	//账户明细
    	self.scope.onClickToAccountDetail = function()
    	{
    		location.href = pageUrl.TRANSACTION_DETAIL;
    	};
    	
    	//提现
    	self.scope.onClickWidthDrawCash = function(){
    		
    		location.href = pageUrl.MY_DRAWCASH;
    	};
    	
    	
    },
    
    
}
