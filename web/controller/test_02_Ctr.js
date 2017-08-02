
//app.controller('specialctrl',function($scope){
//	localStorage.removeItem("wxAddressEmpty");
//	specialPageController.init($scope);
//	
//})
//   alert(444)
     
        			

var specialctrl = 
{
	scope : null,
	
	
	openId : null,
	
	init : function($scope,openId){
		
		this.scope = $scope;
		
		this.openId = openId;
		
	    this.eventBind();
		
		alert(this.openId)
      
	},
	
	  eventBind : function(){
	  	
	  	var self = this;
	  	
	  	
	  	self.scope.diao = function(){
	  		
	  		var params = {};
	  	    params.openId = self.openId;
	  	    alert(JSON.stringify(params))
	  		jqAjaxRequest.asyncAjaxRequest("http://auction.yawan365.com/order/Order/continuePayTest", params, function(data){
	  		    alert(3)
	  		    alert(JSON.stringify(data))
	  		    location.href = data.url;
	  	   })
	  	}
	  	
	  }
	
};


