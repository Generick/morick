app.controller('erWeiCtr',function($scope){
	
	erWeiCtr.init($scope)
})

var erWeiCtr = {
	
	getDataTab : null,
	
	isFinished : false,
	
	orderNum : null,
	
	doType : null,
	
	count : null,
	
	userId : null,
	
	logNumber : null,
	
	page : {
		currentPage : 1,
		totalPage : 0,
		timeNum : 10,
	},
	
	orderList : [],
	
	scope : null,
	
	init : function($scope){
		
		this.scope = $scope;
		$(".animation3").css("display","block");
		
		this.scope.orderList = this.orderList;
		
		this.scope.logNumber = this.logNumber;
		
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
		params.orderStatus = self.getDataTab;
		params.num = self.page.timeNum;
		params.startIndex = (self.page.currentPage - 1) * self.page.timeNum;
		
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_CUSTOMER_GET_LIST, params,function(data){
			
			
			if(data.count == 0)
            {
            	$(".has-no-data").css("display","block")
            }
    		self.count = data.count;
    	
    		self.page.totalPage = Math.ceil(parseInt(data.count)/self.page.timeNum) ;
    		
			if(type == 0)
			{   
				self.orderList = data.orderList;
			}
			else{
				
				self.orderList = self.orderList.concat(data.orderList);
			}
			if(self.orderList.length>0)
			{
				for(var i = 0; i < self.orderList.length;i++)
				{
					self.orderList[i].payPrice = parseInt(self.orderList[i].payPrice)
				}
			}
			
			self.isFinished = false;
    		
    		self.scope.count = self.count;
    		self.scope.orderList = self.orderList;
    		self.scope.$apply();
    		if(type == 0)
    		{   
    			
    		    $("html,body").scrollTo({toT:'0px'});
    		    setTimeout(function(){
    			    $(".container3").css("opacity",1);
					$(".animation3").css("display","none");
					$('.chrysanthemums').css("display","none");
					$(".animation7").css("display","none");
    		    },150)
    		}
    		else{
    			$(".container3").css("opacity",1);
				$(".animation3").css("display","none");
				$('.chrysanthemums').css("display","none");
				$(".animation7").css("display","none");
    		}
			
			
		})
		
	},
	
	
	
	eventBind : function(){
		
		var self = this;
		
		self.scope.tabOnClick = function(type){
			
			self.changeTabColor(type);
			
		};
		
		
		self.scope.sureOrCancle = function(item,type){
			
			self.userId = localStorage.getItem(localStorageKey.userId);
			var params = {};
			params.userId = self.userId;
			params.order_no = item.order_no;
			params.type = type;
			
			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_CUSTOMER_CANCLE_OR_SURE, params,function(data){
				
				if(type == 0)
				{
					$dialog.msg("已确认完成！")
				}
				else{
					$dialog.msg("已取消订单！")
				}
				self.getData(0);
			})
			
		};
		
		
		self.scope.sendGood = function(item){
			
			
			self.userId = localStorage.getItem(localStorageKey.userId);
			self.orderNum = item.order_no;

			$(".order-number-box-shade").css("display","block");
			$(".order-number-box").css("display","block");
			$("html,body").css("overflow-y","hidden")
		};
		
		self.scope.sureSend = function(type){
			
			if(type == 0)
			{
				$(".order-number-box-shade").css("display","none");
				$(".order-number-box").css("display","none");
				$("html,body").css("overflow-y","auto");
				self.logNumber = null;
			    self.scope.logNumber = self.logNumber;
			}
			else{
//				if(self.scope.logNumber != null && self.scope.logNumber != '')
//				{
					var params = {};
					params.logistics_no  =  self.scope.logNumber;
					params.order_no = self.orderNum;
					params.userId = self.userId;
					
					jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_WAIT_SEND, params,function(data){
						
						
						$dialog.msg("发货成功！");
						$(".order-number-box-shade").css("display","none");
						$(".order-number-box").css("display","none");
						$("html,body").css("overflow-y","auto");
						
						self.getData(0);
						self.logNumber = null;
						self.scope.logNumber = self.logNumber;
					})
//				}
//				else{
//					$dialog.msg("请输入订单号！")
//				}
			}
			
		};
		
		self.scope.toOrderDetail = function(item){
			
			
			sessionStorage.setItem("orderDetailNu",item.order_no);
			location.href= pageUrl.ORDER_DETAIL;
			
		};
	},
	
	
	changeTabColor : function(type){
		
		var self = this;
		
		self.page = {
		currentPage : 1,
		totalPage : 0,
		timeNum : 10,
	    };
	    
	    $(".has-no-data").css("display","none")
		if(type == 9)
		{
			
			$(".tab-line-order").animate({"left":"2.48vw"},300);
			$(".cus-order-top-item").eq(0).addClass("top-item-active").siblings().removeClass("top-item-active");
			self.getDataTab = null;
			
		}
		else if(type == 1)
		{
			$(".tab-line-order").animate({"left":"19.1vw"},300);
			
			$(".cus-order-top-item").eq(1).addClass("top-item-active").siblings().removeClass("top-item-active");
			self.getDataTab = 1;
		}
		else if(type == 2)
		{
			$(".tab-line-order").animate({"left":"35.7vw"},300);
			
			$(".cus-order-top-item").eq(2).addClass("top-item-active").siblings().removeClass("top-item-active");
			self.getDataTab = 2;
		}
		else if(type == 3)
		{
			$(".tab-line-order").animate({"left":"52.3vw"},300);
			
			$(".cus-order-top-item").eq(3).addClass("top-item-active").siblings().removeClass("top-item-active");
			self.getDataTab = 3;
		}
		else if(type == 4)
		{
			$(".tab-line-order").animate({"left":"68.8vw"},300);
		
			$(".cus-order-top-item").eq(4).addClass("top-item-active").siblings().removeClass("top-item-active");
			self.getDataTab = 4;
		}
		else if(type == 0)
		{
			$(".tab-line-order").animate({"left":"85.5vw"},300);
			
			$(".cus-order-top-item").eq(5).addClass("top-item-active").siblings().removeClass("top-item-active");
			self.getDataTab = 0;
		}
		else{}
		$(".animation7").css("display","block");
		self.getData(0);
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
            	
			    if (currnetHright - totalHeight < 40)
			    {  

                    if(erWeiCtr.orderList.length < erWeiCtr.count)
                    {   
                        $('.chrysanthemums').css("display","block");
                    	erWeiCtr.getData(1);
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
  
