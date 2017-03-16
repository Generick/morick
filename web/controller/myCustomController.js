/*
 * 我的客服
 */

var customApp = angular.module("customApp",[]);

customApp.run(function(){
	FastClick.attach(document.body); 
});

customApp.controller("ctrl",function($scope){
	
	myCustomController.init($scope);
});

var myCustomController = 
{
	scope : null,
	
	
	init : function($scope){
		
		this.scope = $scope;
		
		this.getCustomData();
	},
	
	getCustomData : function(){
		
		
	},
};
