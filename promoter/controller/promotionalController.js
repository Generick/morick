
app.controller('promotionCtr',function($scope){
	
	promotionCtr.init($scope)
})

var promotionCtr = {
	
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
		params.userId = localStorage.getItem(localStorageKey.userId);
		
		jqAjaxRequest.asyncAjaxRequest(apiUrl.GET_PROMOTIONAL, params,function(data){
        	 	
        	self.inputWord =  data.slogan;
            self.scope.inputWord = self.inputWord;
            self.scope.$apply();
        })
	
		$(".animation3").css("display","none");
		 $(".container3").css("opacity",1);
	},
	
	eventBind : function(){
		var self = this;
		
		self.scope.subString = function(){
		
			if(self.scope.inputWord.length > 30)
			{   	
				$(".remark-text").html(self.scope.inputWord.substring(0,30));
				self.inputWord = self.scope.inputWord.substring(0,30);
				self.scope.inputWord = self.inputWord;
			}
		};
		
		self.scope.subSmit = function(){
			self.userId = localStorage.getItem(localStorageKey.userId);
			var params = {};
			params.userId = self.userId;
			params.slogan = self.scope.inputWord;
			
			jqAjaxRequest.asyncAjaxRequest(apiUrl.SET_PROMOTIONAL, params,function(data){
				
				location.href = pageUrl.HOME_PAGE;
			})
		}
	},
}
