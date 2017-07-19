

app.controller('messListCtr',function($scope){
	
	messListCtr.init($scope)
})


var messListCtr = {
	
	isFinished : false,
	
	isFinished2 : false,
	
	scope : null,
	
	isAtTabLine : false,
	
	messageList : [],
	
	page1 : {
		currentPage : 1,
		totalPage : null,
		timeNum : 15,
		totalCount : 0,
	},
	
	page2 : {
		currentPage : 1,
		totalPage : null,
		timeNum : 15,
		totalCount : 0,
	},
	count : null,
	
	init : function($scope){

		$(".animation").css("display","block");

		this.scope = $scope;
		
		this.scope.isAtTabLine = this.isAtTabLine;
		
		this.getUnReadData(0);
		
		this.eventBind();
		
	
		
	},
	
	getUnReadData : function(type){
		
		if(type==1)
		{
			 $(".animation2").css({"display":"block"});
		}
		
		var self = this;
		self.count = 0;
        self.scope.count = self.count;
		var params = {};
		params.userId = localStorage.getItem(localStorageKey.userId);
		params.startIndex = 0;
		params.num = 15;
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_UNREAD_MESS, params,function(data){
//      	 	alert(JSON.stringify(data))
        	if(data.count == 0){
    		    $(".there-is-no-data-word").html("没有待批阅的消息哦");
	            $(".there-is-no-data").css("display","block");
    		}
    		else
    		{    $("#per-mess-number").css("display","block");
    			 $(".there-is-no-data").css("display","none");
    		}
    		self.page1 = {
				currentPage : 1,
				totalPage : null,
				timeNum : 15,
				totalCount : 0
			};
			self.page1.totalCount = data.count;
			self.page1.totalPage = Math.ceil(parseInt(data.count)/self.page1.timeNum);
//			self.page1.currentPage = self.page1.currentPage + 1;
        	self.messageList = [];
        	self.messageList = data.msgList;
        	self.count = data.count;
        	self.scope.count = self.count;
        	self.scope.messageList = self.messageList;
        	
            self.scope.$apply()
             
			$(".animation").css("display","none");
			$(".container3").css("opacity",1);
            	 $(".animation2").css({"display":"none"});
           
        })
	
	},
	
	getHasReadData : function(){
		 $(".animation2").css({"display":"block"});
		var self = this;
		self.count = 0;
    	self.scope.count = self.count;
		var params = {};
		params.userId = localStorage.getItem(localStorageKey.userId);
		params.startIndex = 0;
		params.num = 15;
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_HAS_READ_MESS, params,function(data){
//      	alert(JSON.stringify(data))
        	if(data.count == 0){
    		    $(".there-is-no-data-word").html("没有已批阅的消息哦");
	            $(".there-is-no-data").css("display","block");
    		}
    		else
    		{
    			 $(".there-is-no-data").css("display","none");
    		}
    		self.page2 = {
				currentPage : 1,
				totalPage : null,
				timeNum : 15,
				totalCount : 0
			};
			self.page2.totalPage = 
			self.page2.totalCount = data.count;
			self.page2.totalPage = Math.ceil(parseInt(data.count)/self.page2.timeNum) ;
//			self.page2.currentPage = self.page2.currentPage + 1;
        	self.messageList = [];
        	self.messageList = data.msgList;
        	self.count = data.count;
        	self.scope.count = self.count;
        	self.scope.messageList = self.messageList;
        
            self.scope.$apply();
           
            	 $(".animation2").css({"display":"none"});
           
        })
	},
	
	
	
	getUnGOReadData : function(){
		
		var self = this;
		if(self.isFinished)
    	{
    		return;
    	}
    	self.isFinished = true;
		var params = {};
		params.userId = localStorage.getItem(localStorageKey.userId);
		params.num = self.page1.timeNum;
    	params.startIndex = (self.page1.currentPage - 1) * self.page1.timeNum;
//		params.startIndex = 0;
//		params.num = self.page1.timeNum;
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_UNREAD_MESS, params,function(data){
//      	 	alert(JSON.stringify(data))
        	self.messageList = self.messageList.concat(data.msgList);
        	self.page1.totalPage = Math.ceil(parseInt(data.count)/self.page1.timeNum) ;
        	self.page1.totalCount = data.count;
			self.page1.currentPage = self.page1.currentPage + 1;
			
        	self.count = data.count;
        	self.isFinished = false;
        	self.scope.count = self.count;
        	self.scope.messageList = self.messageList;
            self.scope.$apply();
            $('.chrysanthemums').css("display","none");
           
        })
	
	},
	
	getHasGOReadData : function(){
		
		var self = this;
		if(self.isFinished2)
    	{
    		return;
    	}
    	self.isFinished2 = true;
		var params = {};
		params.userId = localStorage.getItem(localStorageKey.userId);
		params.startIndex = (self.page2.currentPage - 1) * self.page2.timeNum;
		params.num = self.page2.timeNum;
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_HAS_READ_MESS, params,function(data){
//      	alert(JSON.stringify(data))
        	self.messageList = self.messageList.concat(data.msgList);
        	self.count = data.count;
        	self.page2.totalCount = data.count;
        	self.page2.totalPage = Math.ceil(parseInt(data.count)/self.page2.timeNum) ;
			self.page2.currentPage = self.page2.currentPage + 1;
        	self.isFinished2 = false;
        	self.scope.count = self.count;
        	self.scope.messageList = self.messageList;
            self.scope.$apply();
            $('.chrysanthemums').css("display","none");
           
        })
	},
	
	
	eventBind : function(){
		
		var self = this;
		
		self.scope.readMessage = function(item){
			
			var obj = new Base64();
			
			var msgId = obj.encode(item.msg_id);
			var userId = obj.encode(item.user_id);//-1查看
		    var str = pageUrl.MY_MESS_DETAIL +  "?msgId=" + msgId + "&userId=" + userId;	
					    
			location.href = encodeURI(str);
			
			
		
		};
		
		
		self.scope.getUnRead = function(){
			self.isAtTabLine = false;
			
	        self.page1.currentPage = 1;
			self.scope.isAtTabLine = self.isAtTabLine;
			$(".move-tab-line").animate({"left":"11vw"},300)
			self.getUnReadData(1)
			
		};
		
		
		self.scope.getHasRead = function(){
			self.isAtTabLine = true;
			self.page2.currentPage = 1;
			self.scope.isAtTabLine = self.isAtTabLine;
			$(".move-tab-line").animate({"left":"61vw"},300)
			self.getHasReadData();
		};
	},
	
};

$(document).ready(function(){
    	var p=0,t=0;  
         
   		 $(window).scroll(function(e){  
   		 	
            p = $(this).scrollTop();  
            
            //当前窗口的高度
            var totalHeight = $(window).height();
			//当前文档的高度 - 当前滚动条到窗口顶部的距离
			var currnetHright = $(document).height() - document.body.scrollTop;
			
		
			
            if(t <= p)
            {   
            	/*  
				 *  当滚动条距离底部的距离 小于 22px时加载 
				 *  且当前价在到的最大页码数小于总页数
				 */
            	//下滚  获取下面的数据
            	
			    if (currnetHright - totalHeight < 100)
			    {  
                   if(!messListCtr.isAtTabLine)
                   {   
                     	if(messListCtr.messageList.length < messListCtr.page1.totalCount && messListCtr.page1.currentPage <= messListCtr.page1.totalPage)
                        {     
                        	$('.chrysanthemums').css("display","block");
                              messListCtr.getUnGOReadData();
                           
                        }
                        else{
                        	
                        	$('.chrysanthemums').css("display","block");
									setTimeout(function(){
										$('.chrysanthemums').css("display","none");
			                              $dialog.msg("没有更多数据了！")
									},500);
                        }
                   	 
                   }
                   else{
                   	   
                   	   if(messListCtr.messageList.length < messListCtr.page2.totalCount && messListCtr.page2.currentPage <= messListCtr.page2.totalPage)
                        {     $('.chrysanthemums').css("display","block");
                              messListCtr.getHasGOReadData()
                        }
                        else{
                        	$('.chrysanthemums').css("display","block");
									setTimeout(function(){
										$('.chrysanthemums').css("display","none");
			                             $dialog.msg("没有更多数据了！")
									},500);
                        }
                   }
			    	
			    }
            }    
            else
            {   
            	$(".no-more-data").css("display","none");
            	$('.chrysanthemums').css("display","none");
            }  
            setTimeout(function(){t = p;},0);         
    	});  
	});  