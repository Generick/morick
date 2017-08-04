
app.controller('HomeCtr',function($scope){
	
	HomeCtr.init($scope)
})

var HomeCtr = {
	
	scope : null,
	
	personalName : '',
	
	userId : null,
	
	init:function($scope){
		
		this.scope = $scope;
		
        this.scope.personalName =  this.personalName;
        
		$(".animation3").css("display","block")
		
		this.initData();
		
		this.eventBind();
	},
	
	initData : function(){
         
         var self = this;
         
         self.personalName = localStorage.getItem(localStorageKey.Name);
         self.scope.personalName = self.personalName;
         self.userId  = localStorage.getItem(localStorageKey.userId);

        var params = {};
		params.orderStatus = null;
		params.num = 10;
		params.startIndex = 0;
        jqAjaxRequest.asyncAjaxRequest(apiUrl.API_CUSTOMER_GET_LIST, params,function(data){
           	       self.scope.$apply();
           	       $(".container3").css("opacity",1);
		           $(".animation3").css("display","none");
         })
        
		
		
	},
	
	
	
	eventBind : function(){
		
		var self = this;
		
		
		self.scope.exitHome = function(){
			localStorage.removeItem(localStorageKey.Name)
			localStorage.removeItem(localStorageKey.SESSIONID);
        	localStorage.removeItem(localStorageKey.TOKEN);
        	localStorage.removeItem(localStorageKey.userId);
			location.href = pageUrl.LOGIN_PAGE;
		};
		
		
		
		self.scope.toOrderList = function(){
			
			location.href = pageUrl.ORDER_LIST;
		}
	},
	
	
	
}
