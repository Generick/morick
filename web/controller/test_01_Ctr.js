/*
 * 拍卖历史详情
 */

//alert(sessionStorage.getItem("stampTime"))
var ctrl =
{
	scope : null,
	
   
    wxParams : {},
   
    init : function ($scope,wxParams)
    {   
    	this.wxParams = wxParams;
    	
    	this.scope = $scope;
    	
    	this.eventBind();
    	
    	initTab.start(this.scope, -1); //底部导航
    },
  
    eventBind : function(){
    	
    	var self = this;
    	
    	
    	
    	self.scope.to = function(){
    	
    		location.href = "test_02.php";
    	}
    	

    },
    
    
   
  
};