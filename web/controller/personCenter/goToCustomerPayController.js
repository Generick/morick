/*
 * 我的支付
 */

var toCustomerPay = angular.module("toCustomerPay",[]);

toCustomerPay.run(function(){
	FastClick.attach(document.body); 
});

toCustomerPay.controller("toCustomerPay",function($scope){
	
	toCustomerPay.init($scope);
});

var toCustomerPay = 
{
	scope : null,
	
	comfromSpecial : null,
	
	
	init : function($scope){
		
		this.scope = $scope;
	
	},
	
	
};