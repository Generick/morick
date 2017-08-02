
app.controller('remarkCtr',function($scope){
	
	remarkCtr.init($scope)
})

var remarkCtr = {
	
	scope : null,
	
	inputWord : '',
	
	userId : null,
	
	init : function($scope){
		$(".animation3").css("display","block");
		this.scope = $scope;
		
		this.scope.inputWord = this.inputWord;
		
		this.getData();
		
		this.eventBind();
	},
	
	getData : function(){
		var self = this;
		
		var params = {};
		params.friendUserId = localStorage.getItem("friendId");
    	params.userId = localStorage.getItem(localStorageKey.userId);
		params.num = 0;
    	params.startIndex = 0;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PUSH_USER_DETAIL, params,function(data){
    		
    		self.inputWord = data.friendInfo.remark;
    		self.userId = data.friendInfo.userId;
    		self.scope.inputWord = self.inputWord;
    		
    		self.scope.$apply();
    	})
		$(".animation3").css("display","none");
		 $(".container3").css("opacity",1);
	},
	
	eventBind : function(){
		var self = this;
		
		self.scope.subString = function(){
		
			if(self.scope.inputWord.length > 50)
			{   	
				$(".remark-text").html(self.scope.inputWord.substring(0,50));
				self.inputWord = self.scope.inputWord.substring(0,50);
				self.scope.inputWord = self.inputWord;
			}
		};
		
		self.scope.subSmit = function(){
			
			var params = {};
			params.userId = self.userId;
			params.remark = self.scope.inputWord;
			
			jqAjaxRequest.asyncAjaxRequest(apiUrl.ADD_REMARK, params,function(data){
				
				location.href = pageUrl.PUSHER_DETAIL;
			})
		}
	},
}
