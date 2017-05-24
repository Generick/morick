
/*
 * 我的消息列表页
 */

app.controller('ctrl',function($scope){
	sessionStorage.removeItem("messlistOrauction")
	sessionStorage.removeItem("comeIntoOrder")
	MessagesController.init($scope);
})

var MessagesController = {
	scope : null,

	messListModel : {
		seeMoreWord : '',
		messlistArr : [],
		num : 20,
		pageNum : 1,
		userId : null,
		count : 0
	},
	

	init : function($scope){
		
		this.scope = $scope;
	    
	    this.getUserInfo();

		this.clickList();
		
		this.ngRepeatFinish();
		
		this.ngRepeatFinish();
	},
	
	
	getUserInfo : function(){
		var self = this;
		$('.animation').css('display','block'); //加载动画
		$('.container').css('opacity','0');
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
			
			self.messListModel.userId = data.userInfo.userId;
			self.scope.messListModel = self.messListModel;
			self.getMessageList();
			$('.animation').css('display','none');
	        $('.container').css('opacity','1');
			self.scope.$apply();
		   
		})
			
	},
	
	
	getMessageList : function(){
		
		var self = this;
		
		
    	var params = {};
    	params.userId = self.messListModel.userId;
    	params.startIndex = self.messListModel.num * (self.messListModel.pageNum - 1);
    	params.num = self.messListModel.num;
//      alert(JSON.stringify(params))
        
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_MY_MESSAGELIST, params, function(data){
     		
// 		console.log(JSON.stringify(data))
 			self.messListModel.messlistArr = self.messListModel.messlistArr.concat(data.data);
  		    self.messListModel.count = data.count;
  		    
  		    if(self.messListModel.count == 0)
  		    {
  		    	$("#no-datas").css("display","block");
  		    }
  		    else
  		    {
  		    	$("#no-datas").css("display","none");
  		    }
  		    if(data.count < self.messListModel.num)
  		    {
  		    	$("#check-more-data").css("display","none");
  		    	
  		    }
  		    else
  		    {
  		    	$("#check-more-data").css("display","block");
  		    }
            
  		    for(var s = 0;s < self.messListModel.messlistArr.length;s++ )
  		    {    
  		    	if(self.messListModel.messlistArr[s].isRead == 1 && self.messListModel.messlistArr[s].msg_type  != 0)
  		    	{
  		    		self.messListModel.messlistArr[s].bgStyle = "hasopen-hasread-style";
  		    		self.messListModel.messlistArr[s].titleStyle = "title-style";
  		    	}
  		    	else if(self.messListModel.messlistArr[s].isRead == 0 && self.messListModel.messlistArr[s].msg_type  != 0)
  		    	{
  		    		self.messListModel.messlistArr[s].bgStyle = "hasopen-style";
  		    		
  		    	}
  		    	else
  		    	{
  		    		
  		    	}
  		    	if(self.messListModel.messlistArr[s].msg_type == 0)
  		    	{
  		    		
  		    		self.messListModel.messlistArr[s].word = "展开";
  		    		
  		    		if(self.messListModel.messlistArr[s].isRead == 1)
  		    		{
  		    			self.messListModel.messlistArr[s].bgStyle = "unopen-hasread-style";
  		    			self.messListModel.messlistArr[s].titleStyle = "title-style";
  		    		}
  		    		else
  		    		{
  		    			self.messListModel.messlistArr[s].bgStyle = "unopen-style";
  		    		}

  		    		self.messListModel.messlistArr[s].isAuto = false;
  		    	}
  		    	
  		    	
  		    }
  		    if (self.messListModel.messlistArr.length >= self.messListModel.count)
    		{  
				$("#check-more-data").css("display","none");
    		}else
    		{
    			self.messListModel.seeMoreWord = "加载更多";
    		}
  		    
  		    self.scope.seeMoreWord =  self.messListModel.seeMoreWord;
    		self.scope.messListModel = self.messListModel;
    		self.messListModel.pageNum ++;
    		self.scope.$apply();
    	});
		
	},
	
	 userHasReadMessage : function(data){
    	
    	var self = this;
    	var params = data;
        
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_HAS_READ_MESSAGE, params, function(data){
          
    	});
 
    },
	
	clickList : function(){
		
		var self = this;
		
		self.scope.jumpTOatherPage = function(item){
		    
		    var params = {};
            params.userId = self.messListModel.userId;
            params.msg_id = item.msg_id;
            params.msg_type = item.msg_type;
            params.href_id = item.href_id;
        	
			if(item.msg_type == 0)
        	{   
        		if(item.isRead == 0)
        		{
        			self.userHasReadMessage(params);
        		}
        		if(!item.isAuto)
        		{   
        			item.word = "收起";
        			item.bgStyle = "hasopen-hasread-style";
        	        item.isAuto = !item.isAuto; 
        	        item.titleStyle = "title-style";
        		}
        	    else
        	    {   
        	    	
        	    	item.word = "展开";
        	    	item.bgStyle = "unopen-hasread-style";
        	    	item.isAuto = !item.isAuto; 
        	    }
        	    item.isRead = 1;
        	}
        	else if(item.msg_type == 1)
        	{   
        		if(item.isRead == 0)
        		{
        			self.userHasReadMessage(params);
        		}
        		sessionStorage.setItem("comeWithGuess",5);
        		item.isRead = 1;

        		setTimeout(function(){
        			
        			location.href = pageUrl.GUESS_INNER +"?id="+ item.href_id + "&page=" + 1;
        			
        		},250)
        	    

        	}
        	else if(item.msg_type == 2)
        	{   
        		if(item.isRead == 0)
        		{
        			self.userHasReadMessage(params);
        		}
        	
        		item.isRead = 1;
//      		sessionStorage.setItem("comeWithGuess",5);
//      		sessionStorage.setItem("messlistOrauction",1)
//      	    
//              setTimeout(function(){
//              	
//      				location.href = pageUrl.AUCTION_HISTORY_INFO  +"?id="+ item.href_id +"&page=" + 1;
//      		},250)
//      		
        		sessionStorage.setItem("comeIntoOrder",2);
	      		localStorage.setItem(localStorageKey.orderNo, item.href_id);
	      		
	       		setTimeout(function(){
	       		 	
        				location.href = pageUrl.ORDER_DETAIL;
        				
        		},250)
        		
        	}
        	else if(item.msg_type == 3)
        	{    
        		if(item.isRead == 0)
        		{
        			self.userHasReadMessage(params);
        		}
        		
        		item.isRead = 1;
        		sessionStorage.setItem("comeIntoOrder",2)
	      		localStorage.setItem(localStorageKey.orderNo, item.href_id);
	      		
	       		setTimeout(function(){
	       		 	
        				location.href = pageUrl.ORDER_DETAIL;
        				
        		},250)
        	}
		
		};
		
		
		self.scope.onClickCheckMore = function(){
			
//			self.messListModel.seeMoreWord = "加载中...";
    		self.getMessageList();
 
    		if (self.messListModel.num >= self.messListModel.count)
    		{   
				$("#check-more-data").css("display","none");
    		}
    		else
    		{
    			$("#check-more-data").css("display","block");
    		}
    		self.scope.seeMoreWord = self.messListModel.seeMoreWord;
		};
		
	},
	
	ngRepeatFinish : function()
    {
	    var self = this;
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
		   
		     
		});
	
	}
};
