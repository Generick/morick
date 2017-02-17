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
    		
    		console.log(data)
    		
    		self.myAccountModel.userInfo = data.userInfo;
    		
    		$('.animation').css('display','none');
    		$('.container').css('opacity','1');
    		
    		
    		self.myAccountModel.userInfo.balance = self.toDecimals(self.myAccountModel.userInfo.balance);
    		self.myAccountModel.userInfo.frozen = self.toDecimals(self.myAccountModel.userInfo.frozen);
    		self.scope.myAccountModel = self.myAccountModel;
    		
    		self.scope.$apply();
    	})
    	
    	
    },
    
      //保留两位小数
    toDecimals : function (x) {  
    	
        var f = parseFloat(x);    
        if (isNaN(f)) {    
            return false;    
        }    
        var f = Math.round(x*100)/100;    
        var s = f.toString();    
        var rs = s.indexOf('.');    
        if (rs < 0) {    
            rs = s.length;    
            s += '.';    
        }    
        while (s.length <= rs + 2) {    
            s += '0';    
        }    
        return s;    
    } ,   
    
    bindClick  : function ()
    {
    	var self = this;
    	
    	
    	//充值
    	self.scope.onClickRechargeAccount = function()
    	{
    		location.href = pageUrl.ACCOUNT_RECHARGE;
    	}
    	
    	//账户明细
    	self.scope.onClickToAccountDetail = function()
    	{
    		location.href = pageUrl.TRANSACTION_DETAIL;
    	}
    	
    	
    },
    
    
}
