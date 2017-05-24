/*
 * 我的支付
 */

var goToPayApp = angular.module("goToPayApp",[]);

goToPayApp.run(function(){
	FastClick.attach(document.body); 
});

goToPayApp.controller("ctrl",function($scope){
	
	goToPayAppControlle.init($scope);
});

var goToPayAppController = 
{
	scope : null,
	
	
	init : function($scope){
		
		this.scope = $scope;
		
		this.getgoToPayAppData();
	},
	
	getgoToPayAppData : function(){
		
		
	},
};