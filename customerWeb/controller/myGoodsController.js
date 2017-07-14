

app.controller("myGoodsCtr",function($scope){
	
	myGoodsCtr.init($scope);
})

var myGoodsCtr = {
	
	scope : null,
	
	deleteId : null,
	
	isFinished : false,
	
    page : {
		currentPage : 1,
		totalPage : 0,
		timeNum : 7,
	},
	
	myGoodsModel : {
		goodsList : [],
		count : null
	},
	
	init : function($scope){
		
//		alert(789)
        
		$(".animation3").css("display","block");
       
       this.scope = $scope;
       
       this.scope.myGoodsModel = this.myGoodsModel;
       
       this.getGoodsList(0);
      
       this.eventBind();
	},
	
	
	getGoodsList : function(type){
		
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
		
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USER_GETSELF_GOODS, params,function(data){
			console.log(JSON.stringify(data))
			
			self.page.totalPage = Math.ceil(parseInt(data.count)/self.page.timeNum) ;
			
			if(type == 0)
			{   
				self.myGoodsModel.goodsList = data.commodityList;
			}
			else{
				
				self.myGoodsModel.goodsList = self.myGoodsModel.goodsList.concat(data.commodityList);
			}
			self.myGoodsModel.count = data.count;
			self.isFinished = false;
			self.scope.myGoodsModel = self.myGoodsModel;
			self.scope.$apply();
			
				$(".animation3").css("display","none");
				 $(".container3").css("opacity",1);
			
			$('.chrysanthemums').css("display","none");
		})
		
	},
	
	eventBind : function(){
		
		var self = this;
		
		self.scope.toSeeMyGoods = function(item){
			var obj = new Base64();
			
			var commId = obj.encode(item.id);
			var addType = obj.encode('3');//-1查看
			var str = pageUrl.ADD_GOODS_PAGE + "?id=" + commId + "&isAdd=" + addType;	
					    
			location.href = encodeURI(str);
			
		};
		
		self.scope.modMyGood = function(item){
			
		
			var obj = new Base64();
			
			var commId = obj.encode(item.id);
			var addType = obj.encode('2');//1添加
			var str = pageUrl.ADD_GOODS_PAGE + "?id=" + commId + "&isAdd=" + addType;	
					    
			location.href = encodeURI(str);

			
		};
		
		
		self.scope.begToUpOrDown = function(item,type){
			
			var params = {};
			params.commodity_id = item.id;
			params.userId = localStorage.getItem(localStorageKey.userId);
			if(type == 1)
			{
				if(item.up_status == 0 || item.up_status == 2)
				{
					params.requestType =  1;
				}
				if(item.up_status == 1){
					params.requestType =  2;
				}
			}
			else
			{
				params.requestType = 3;
			}
			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USER_ASK_TO_UP, params,function(data){
//					alert(JSON.stringify(data))

                    if(params.requestType ==  1)
                    {
                    	  $dialog.msg("已向雅玩之家提交上架请求，处理结果会以消息形式通知您，请留意！");
                    }
                    else if(params.requestType == 2)
                    {
                    	 $dialog.msg("已向雅玩之家提交下架请求，处理结果会以消息形式通知您，请留意！");
                    }else if(params.requestType == 3)
                    {
                    	 $dialog.msg("已向雅玩之家提交同步更新请求，处理结果会以消息形式通知您，请留意！");
                    }
                   
		    })
		};
		
		
		self.scope.deleteGood = function(item){
			
			$(".fixed-boxes-del").css("display","block");
			$(".right-to-boxes").css("display","block");
			$("body").css("overflow","hidden");
			
			
			self.deleteId = item.id;
			
			
		};
		
		
		
		self.scope.sureToDel = function(type){
			
			if(type == 0)
			{
				$(".fixed-boxes-del").css("display","none");
				$(".right-to-boxes").css("display","none");
				$("body").css("overflow","auto");
				self.deleteId = null;
			}
			else{
				var params = {};
				params.commodity_id = self.deleteId;
				jqAjaxRequest.asyncAjaxRequest(apiUrl.API_DELETE_GOODS, params,function(data){
	//					alert(JSON.stringify(data))
	                   self.page.currentPage = 1;
	                   $(".fixed-boxes-del").css("display","none");
						$(".right-to-boxes").css("display","none");
						$("body").css("overflow","auto");
	                   $dialog.msg("商品删除成功");
	                   self.getGoodsList(0);
			    })
			}
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
            	
			    if (currnetHright - totalHeight < 80)
			    {  
//                  alert(myGoodsCtr.page.currentPage)
//                   alert(myGoodsCtr.page.totalPage)
//                    alert(myGoodsCtr.myGoodsModel.goodsList.length)
//                     alert(myGoodsCtr.myGoodsModel.count)
                    if(myGoodsCtr.page.currentPage < myGoodsCtr.page.totalPage  && myGoodsCtr.myGoodsModel.goodsList.length < myGoodsCtr.myGoodsModel.count)
                    {   
                    	
                    	$('.chrysanthemums').css("display","block");
                    	myGoodsCtr.getGoodsList(1);
                    }
                    else{
                    	$('.chrysanthemums').css("display","block");
						setTimeout(function(){
							$('.chrysanthemums').css("display","none");
	
						},500);
                    }
                    
			    	/*
			    	 * 如果当前加载到的最大页码数小于总页数
			    	 */
//	
//			    	if((SelectCtrl.page.currentPage < SelectCtrl.page.totalPage) && (SelectCtrl.selectedModel.auctionItems.length < SelectCtrl.totalCount))
//					{   
//                       
//          	        SelectCtrl.initData(1);
//          	        
//          	      
//					}
//					else if((SelectCtrl.page.currentPage == SelectCtrl.page.totalPage) || (SelectCtrl.selectedModel.auctionItems.length == SelectCtrl.totalCount))
//					{   
//
//						$('.chrysanthemums').css("display","block");
//						setTimeout(function(){
//							$('.chrysanthemums').css("display","none");
//
//						},500);
//						setTimeout(function(){
//
//							$(".no-more-data").css("display","block");
//
////							setTimeout(function(){
////								$(".no-more-data").css("display","none");
////							},1800);
//						},500)
//						
//					}
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
   