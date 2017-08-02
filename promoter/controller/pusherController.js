
app.controller('pusherCtr',function($scope){
	
	pusherCtr.init($scope)
})

var pusherCtr = {
	
	scope : null,
	
	
	page : {
		currentPage : 1,
		totalPage : 0,
		timeNum : 10,
	},
	
	frinedModel : {
		isHasRemark : null,
	    
	    remarkWord : '',
	    
		userId : null,
	
		friendUserId : null,
		
		count : null,
		
		name : '',
		
		smallIcon : '',
		
		joinTime : null,
		
		payForArr : [],
	
		
	},
	
	isFinished : false,
	
	init : function($scope){
		
		this.scope = $scope;
		
		$(".animation3").css("display","block");
		
		this.scope.frinedModel = this.frinedModel;
		
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
		params.friendUserId = localStorage.getItem("friendId");
    	params.userId = localStorage.getItem(localStorageKey.userId);
		params.num = self.page.timeNum;
    	params.startIndex = (self.page.currentPage - 1) * self.page.timeNum;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PUSH_USER_DETAIL, params,function(data){
            if(data.orderInfo.count == 0)
            {
            	$(".has-no-data").css("display","block")
            }
          
    		self.page.totalPage = Math.ceil(parseInt(data.orderInfo.count)/self.page.timeNum) ;
    		self.frinedModel.count = data.orderInfo.count;
    		self.frinedModel.name = data.friendInfo.nickname;
    		self.frinedModel.remarkWord =data.friendInfo.remark;
    		if(!commonFu.isEmpty(self.frinedModel.remarkWord))
    		{
    			self.frinedModel.isHasRemark = true;
    		}
    		else{
    			self.frinedModel.isHasRemark = false;
    		}
    		self.frinedModel.smallIcon = data.friendInfo.smallIcon;
    		self.frinedModel.joinTime = data.friendInfo.registerTime;
			if(type == 0)
			{   
				self.frinedModel.payForArr = data.orderInfo.orderList;
			}
			else{
				
				self.frinedModel.payForArr = self.frinedModel.payForArr.concat(data.orderInfo.orderList);
			}
			self.isFinished = false;
    		
    		
    		self.scope.frinedModel = self.frinedModel;
    		
    		self.scope.$apply();
    		$(".animation3").css("display","none");
				 $(".container3").css("opacity",1);
				 $('.chrysanthemums').css("display","none");
    	})
	},
	
	
	eventBind : function(){
		
		var self = this;
		self.scope.setRemark = function(){
			
			location.href = pageUrl.MOD_REMARK;
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

                    if(pusherCtr.frinedModel.payForArr.length < pusherCtr.frinedModel.count)
                    {   
                        $('.chrysanthemums').css("display","block");
                    	pusherCtr.getData(1);
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
  
