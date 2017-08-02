

app.controller('pushListCtr',function($scope){
	
	pushListCtr.init($scope)
})

var pushListCtr = {
	
	scope : null,
	
	isFinished : false,
	
	userList : [],
	
	isTabSlide : 0,
	
	isTimeTrue : true,
	
	isMoneyTrue : false,
	
	isConsumeTrue : false,
	
	page : {
		currentPage : 1,
		totalPage : 0,
		timeNum : 10,
	},
	
	init : function($scope){
		
		this.scope = $scope;
		
		$("#item-select-fir").find(".item-select-word").css("color","#c4996d");
		
		$(".animation3").css("display","block");
		
		this.getData(0);
		
		this.eventBind();
		
	},
	
	getData : function(type){
		var self = this;
		
		
		if(self.isFinished)
    	{
    		return;
    	}
    	self.isFinished = true;
    	
    	if(type == 0)
    	{
    		self.page.currentPage = 1;
    	}
    	else{
    		self.page.currentPage = self.page.currentPage + 1;
    	}
    	var params = {};
		params.sort = self.isTabSlide;
		if(self.isTabSlide == 0)
		{
			
			    if(self.isTimeTrue)
			    {
			    	params.direction = 0;
			    }
			    else{
			    	params.direction = 1;
			    }
				
		}
		else if(self.isTabSlide == 1)
		{
			if(self.isMoneyTrue)
			{
			    params.direction = 0;
			}
			 else{
			    	params.direction = 1;
			    }
		}
		else
		{
			if(self.isConsumeTrue)
			{
			    params.direction = 0;
			}
			 else{
			    	params.direction = 1;
			    }
		}
    	params.userId = localStorage.getItem(localStorageKey.userId);
		params.num = self.page.timeNum;
    	params.startIndex = (self.page.currentPage - 1) * self.page.timeNum;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PUSH_LIST, params,function(data){
            if(data.count == 0)
            {
            	$(".has-no-data").css("display","block")
            }
    		self.count = data.count;
    		document.title = "我推荐的用户( " +  data.count + " )";
    		self.page.totalPage = Math.ceil(parseInt(data.count)/self.page.timeNum) ;
    		
			if(type == 0)
			{   
				self.userList = data.userList;
			}
			else{
				
				self.userList = self.userList.concat(data.userList);
			}
			self.isFinished = false;
    		
    		self.scope.count = self.count;
    		self.scope.userList = self.userList;
    		self.scope.$apply();
    		$(".animation3").css("display","none");
				 $(".container3").css("opacity",1);
				 $('.chrysanthemums').css("display","none");
    	})
	
	},
	
	eventBind :function(){
		
		var self = this;
		
		self.scope.toHisDetail = function(item){
			
//			alert(JSON.stringify(item))
			localStorage.setItem("friendId",item.userId);
			location.href = pageUrl.PUSHER_DETAIL;
		};
		
		
		
		
		
		self.scope.toChangeArror = function(type){
			
			
			if(type == 0)
			{
				
				self.isTabSlide = 0;
				self.page = {
					currentPage : 1,
					totalPage : 0,
					timeNum : 10,
				};
				self.isTimeTrue = !self.isTimeTrue;
				
				self.isMoneyTrue = false;
				self.isConsumeTrue = false;
				if(self.isTimeTrue)
				{
					$("#item-select-fir").find(".item-select-icon").removeClass("item-select-black_up item-select-black_down item-select-yellow_up item-select-yellow_down").addClass("item-select-yellow_down")
				
				}
				else{
					$("#item-select-fir").find(".item-select-icon").removeClass("item-select-black_up item-select-black_down item-select-yellow_up item-select-yellow_down").addClass("item-select-yellow_up")
				
				}
				$("#item-select-fir").find(".item-select-word").css("color","#c4996d");
				
				$("#item-select-sec").find(".item-select-word").css("color","#666666");
				$("#item-select-sec").find(".item-select-icon").removeClass("item-select-black_down item-select-yellow_up item-select-yellow_down").addClass("item-select-black_up");
				
				$("#item-select-thi").find(".item-select-word").css("color","#666666");
				$("#item-select-thi").find(".item-select-icon").removeClass("item-select-black_down item-select-yellow_up item-select-yellow_down").addClass("item-select-black_up");
				
				
			}
			else if(type == 1)
			{  
				self.isTabSlide = 1;
				self.page = {
					currentPage : 1,
					totalPage : 0,
					timeNum : 10,
				};
				self.isMoneyTrue = !self.isMoneyTrue;
				self.isConsumeTrue = false;
				self.isTimeTrue = false;
				if(self.isMoneyTrue)
				{
					$("#item-select-sec").find(".item-select-icon").removeClass("item-select-black_up item-select-black_down item-select-yellow_up item-select-yellow_down").addClass("item-select-yellow_down")
				
				}
				else{
					$("#item-select-sec").find(".item-select-icon").removeClass("item-select-black_up item-select-black_down item-select-yellow_up item-select-yellow_down").addClass("item-select-yellow_up")
				
				}
				$("#item-select-sec").find(".item-select-word").css("color","#c4996d");
				
				$("#item-select-fir").find(".item-select-word").css("color","#666666");
				$("#item-select-fir").find(".item-select-icon").removeClass("item-select-black_down item-select-yellow_up item-select-yellow_down item-select-black_up").addClass("item-select-black_up");
				
				$("#item-select-thi").find(".item-select-word").css("color","#666666");
				$("#item-select-thi").find(".item-select-icon").removeClass("item-select-black_down item-select-yellow_up item-select-yellow_down item-select-black_up").addClass("item-select-black_up");
				
	
			}
			else{
				self.isTabSlide = 2;
				self.page = {
					currentPage : 1,
					totalPage : 0,
					timeNum : 10,
				};
				self.isMoneyTrue = false;
				self.isTimeTrue = false;
				self.isConsumeTrue = !self.isConsumeTrue;
				if(self.isConsumeTrue)
				{
					$("#item-select-thi").find(".item-select-icon").removeClass("item-select-black_up item-select-black_down item-select-yellow_up item-select-yellow_down").addClass("item-select-yellow_down")
				
				}
				else{
					$("#item-select-thi").find(".item-select-icon").removeClass("item-select-black_up item-select-black_down item-select-yellow_up item-select-yellow_down").addClass("item-select-yellow_up")
				
				}
				$("#item-select-thi").find(".item-select-word").css("color","#c4996d");
				
				$("#item-select-fir").find(".item-select-word").css("color","#666666");
				$("#item-select-fir").find(".item-select-icon").removeClass("item-select-black_down item-select-yellow_up item-select-yellow_down item-select-black_up").addClass("item-select-black_up");
				
				$("#item-select-sec").find(".item-select-word").css("color","#666666");
				$("#item-select-sec").find(".item-select-icon").removeClass("item-select-black_down item-select-yellow_up item-select-yellow_down item-select-black_up").addClass("item-select-black_up");
			
			}
			self.getData(0);
		};
	},
}



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
            	
			    if (currnetHright - totalHeight < 50)
			    {  

                    if(pushListCtr.userList.length < pushListCtr.count)
                    {   
                        $('.chrysanthemums').css("display","block");
                    	pushListCtr.getData(1);
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
            else
            {   
            	$(".no-more-data").css("display","none");
            	$('.chrysanthemums').css("display","none");
            }  
            setTimeout(function(){t = p;},0);         
    	});  
	});  
  
