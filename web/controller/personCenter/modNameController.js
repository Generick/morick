/*
 * 
 * 修改姓名
 * 
 */
var modNameApp = angular.module('modNameApp', []); 
//点击事件的初始化
modNameApp.run(function (){
    FastClick.attach(document.body); 
})


modNameApp.controller("modNameController", function ($scope)
{
    modNameController.init($scope);
});


var modNameController = 
{
    scope : null,
    
    modNameModel : 
    {
    	name : null,
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
    	
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PERSONALDATA, {}, function(data){
    		
//  		console.log(data)
    		
    		self.modNameModel.name = data.name;
    		
    		self.scope.modNameModel = self.modNameModel;
    		self.scope.$apply();
    	})
    	
    	
    },
    
    
    bindClick  : function ()
    {
    	var self = this;
    	
    	
    	//提交修改昵称
    	self.scope.onClickSubmitModName = function()
    	{
    		if (commonFu.isEmpty(self.modNameModel.name))
    		{
    			$confirmTip.show("请填写昵称");
    			return;
    		}
    		
    		if (self.modNameModel.name.length > 7)
    		{
    			$confirmTip.show("昵称不得超过7个字符");
    			return;
    		}
    		
    		var modeInfo = 
    		{
    			name : self.modNameModel.name
    		};
    		
    		var param = 
    		{
    			modInfo : JSON.stringify(modeInfo)
    		};
    		
    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_MOD_SELF_INFO, param, function(data)
    		{
    			$confirmTip.show("修改成功");
    			self.scope.$apply();
    			setTimeout(function(){
	    			location.href = pageUrl.PERSON_INFO;
    			},500)
    		})
    	}
    }
};
