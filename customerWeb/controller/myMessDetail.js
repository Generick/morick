
app.controller('mesDetailCtr',function($scope){
	
	mesDetailCtr.init($scope);
})

var mesDetailCtr = {
	
	scope : null,
	
	msgId : null,
	
	userId: null,
	
	messModel : {
		
		
	},
	
	
	
	init : function($scope){
		
		this.scope = $scope;
		
		this.getURL();
		
		this.getData();
	},
	
	getURL : function(){
		
		
		$(".animation").css("display","block");
		$(".container").css("opacity",0);
		var self = this;
		
		var obj = new Base64();
    
		self.msgId = obj.decode(commonFu.getQueryStringByKey("msgId"));
        self.userId = obj.decode(commonFu.getQueryStringByKey("userId"));
      
	},
	
	getData : function(){
		
		var self = this;
		var params = {};
		params.msg_id = self.msgId;
		params.userId = self.userId;
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_TELL_HAS_READ, params,function(data){
			
			self.messModel = data;
			self.scope.messModel = self.messModel;
			self.scope.$apply();
			$(".animation").css("display","none");
			$(".container").css("opacity",1);
		})
		
	},
}
