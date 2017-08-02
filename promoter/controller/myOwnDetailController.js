

app.controller('myOwnListCtr',function($scope){
	
	myOwnListCtr.init($scope)
})

var myOwnListCtr = {
	
	scope : null,
	
	isFinished : false,
	
	waitCheckAmount : null,
	
	historyReturnTotal : null,
	
	count : null,
	
	bills : [],
	
	page : {
		currentPage : 1,
		totalPage : 0,
		timeNum : 15,
	},
	
	init : function($scope){
		
		this.scope = $scope;
		
		$(".animation3").css("display","block");
		
		this.getData(0);
	
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
		
    	params.userId = localStorage.getItem(localStorageKey.userId);
		params.num = self.page.timeNum;
    	params.startIndex = (self.page.currentPage - 1) * self.page.timeNum;
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_WAIT_PAY, params,function(data){
            if(data.count == 0)
            {
            	$(".has-no-data").css("display","block")
            }
    		self.count = data.count;
    		self.page.totalPage = Math.ceil(parseInt(data.count)/self.page.timeNum) ;
    		
			if(type == 0)
			{   
				self.bills = data.bills;
			}
			else{
				
				self.bills = self.bills.concat(data.bills);
			}
			self.isFinished = false;
    		self.waitCheckAmount = data.waitCheckAmount;
    		self.historyReturnTotal = data.historyReturnTotal;
    		self.scope.historyReturnTotal = self.historyReturnTotal;
    		self.scope.waitCheckAmount = self.waitCheckAmount;
    		self.scope.count = self.count;
    		self.scope.bills = self.bills;
    		self.scope.$apply();
    		$(".animation3").css("display","none");
				 $(".container3").css("opacity",1);
				 $('.chrysanthemums').css("display","none");
    	})
	}
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
            	
			    if (currnetHright - totalHeight < 50)
			    {  

                    if(myOwnListCtr.bills.length < myOwnListCtr.count)
                    {   
                        $('.chrysanthemums').css("display","block");
                    	myOwnListCtr.getData(1);
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
  
