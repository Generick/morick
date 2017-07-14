
app.controller('HomeCtr',function($scope){
	
	HomeCtr.init($scope)
})

var HomeCtr = {
	
	scope : null,
	
	personalName : '',
	
	userId : null,
	
	unReadNum : null,
	
	init:function($scope){
		
		this.scope = $scope;
		

		$(".animation3").css("display","block")
		
		this.initData();
		
		this.getUnReadNum();
		
		this.eventBind();
	},
	
	initData : function(){
		
		var self = this;
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PERSONALDATA, {},function(data){
        	 	

        	    self.personalName = data.userInfo.name;
        	    self.scope.personalName = self.personalName;
        	    self.scope.$apply()
        	 	console.log(JSON.stringify(data))

					$(".container3").css("opacity",1);
					$(".animation3").css("display","none");
              
        })
		
	},
	
	getUnReadNum : function(){
		
		var self = this;
		var params = {};
		params.userId = localStorage.getItem(localStorageKey.userId);
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_UNREAD_NUM, params,function(data){
        	 	
        	 	self.unReadNum = data.unReadNum;
        	 	self.scope.unReadNum = self.unReadNum;
//      	 	alert(JSON.stringify(data))
        	    self.scope.$apply()
        	
                
        })
	},
	
	eventBind : function(){
		
		var self = this;
		
		self.scope.toAddGoods = function(){
			
			var obj = new Base64();
			var ids = '-1';
			var commId = obj.encode(ids);
			var addType = obj.encode('1');//添加
			var str = pageUrl.ADD_GOODS_PAGE + "?id=" + commId + "&isAdd=" + addType;
			location.href = encodeURI(str);

		};
		
		self.scope.toMyGoodsList = function(){
			
			location.href = pageUrl.MY_GOODS_LIST;
		};
		
		self.scope.toSeeMess = function(){
			
			location.href = pageUrl.MESSAGE_LIST_PAGE;
		};
		
		self.scope.exitHome = function(){
			localStorage.removeItem(localStorageKey.SESSIONID);
        	localStorage.removeItem(localStorageKey.TOKEN);
        	localStorage.removeItem(localStorageKey.userId);
			location.href = pageUrl.LOGIN_PAGE;
		};
	},
}
