/*
 * 
 * 精选
 * 
 */



var SelectCtrl =
{   
    scope: null,
    
    isFinsh : false,
    
    wxParams : {},
   
    shareInfo : {},
    
    timer : null,
    
    page : {
		currentPage : 1,
		totalPage : null,
		timeNum : 20,
	},
	
	totalCount : 0,//数据的总条数
	
//	goWithPageId : true,
	
	thisJumpPage :null,
	
	thisJumpId : null,
	
    selectedModel: {
    	auctionItems: [],
    },
    
    init: function($scope,wxParams) {
    	this.scope = $scope;
    	
    	this.wxParams = wxParams;

        this.judjeIsLogin();
        
    	this.getUrlAndId();
    	
    	this.initData(2);
    	
        this.ngRepeatFinish();
        
        initTab.start(this.scope, 1); //底部导航
        
        this.bindClick();
        
    },
   
    getUrlAndId : function(){
    	var self = this;
    	
//  	var arr = [];
    	if(location.href.indexOf("?") > 0){
    		
    		if(location.href.split("?")[1].split("=")[0] == 'from')
        	{
        		
        	}
        	else
        	{
        		var juid = commonFu.getQueryStringByKey("thisDataId").substring(0,1);
	    		if(juid != 0 && juid != 1 && juid != 2 && juid != 3 && juid != 4 && juid != 5 && juid != 6 && juid != 7 && juid != 8 && juid != 9)
	    		{
	    			var obj = new Base64();
			    	self.thisJumpId = obj.decode(commonFu.getQueryStringByKey("thisDataId"));
				    self.thisJumpPage = obj.decode(commonFu.getQueryStringByKey("backPage"));
	    		}
	    		else{
	    			self.thisJumpId = commonFu.getQueryStringByKey("thisDataId");
	    			self.thisJumpPage = commonFu.getQueryStringByKey("backPage");
	    		}
        	}
    		
    	}
    	
//  	
//  	
//  	if(commonFu.listGetUrlPublic(location.href).length == 2)
//  	{
//  		arr = commonFu.listGetUrlPublic(location.href);
//  		self.thisJumpPage = arr[0];
//  	    self.thisJumpId = arr[1];
//  	}
    	
    },
    
    judjeIsLogin : function(){
    	
    	var self = this;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_JUDGE_ISLOGIN, {}, function(data){
    		
    		if(JSON.stringify(data) == 'true'){
    		
	    		$("#myself-head img").removeClass('sharking');	
	    	}
    		else
    		{  
	    		$("#myself-head img").addClass('sharking');
	    	}
    		
    	})
    	
    	
    },
    
    
    
    initData: function(type) {
    	    var self = this;
    	    
            if(self.isFinsh){
            	
            	return;
            }
            self.isFinsh = true;
            
    		var params = {
		    	num : self.page.timeNum,
		    	type : 2
    	    };
	    		/*
	    		 * 
	    		 * 0，取上一页数据
	    		 * 1，取下一页数据
	    		 * 2，刷新tab栏
	    		 *  (如果有存的interPage则是点击详情页的tab栏；
	    		 *   如果没有interPage,则说明是在列表页刷新的tab栏)
	    		 */
	    	if(commonFu.isEmpty(sessionStorage.getItem("alreadyGet")))
	    	{   
	    		
	    		if((!commonFu.isEmpty(self.thisJumpPage) && !commonFu.isEmpty(self.thisJumpId)))
	    		{
	    			params.startIndex = 0;
	    			if(String(self.thisJumpPage).indexOf("#") != -1)
			    	{
			    	    self.thisJumpPage = parseInt(self.thisJumpPage.split("#")[0]);
			    	    	
			    	}
			    	else
			    	{
			    	    self.thisJumpPage = parseInt(self.thisJumpPage);
			    	}
	    			params.num =parseInt(self.thisJumpPage) * parseInt(self.page.timeNum);  
	    	
	    		}
	    		else
	    		{
	    			/*
	    		 	* 如果是第一次进入，本地缓存为空，则 params.startIndex = 0;
	    		 	*/
                	params.startIndex = 0;
	    		}
	    		
	    	}
	    	else
	    	{   /*
	    	     * 如果不是第一次进入，则
	    	     * 1，获取本地存储的数据 dataArr
	    	     * 2，获取当前数据模型里的数据 selfData
	    	     */
	    	    var dataArr = JSON.parse(sessionStorage.getItem("alreadyGet"));
	    	    var selfData = self.selectedModel.auctionItems;
	    		
	    	    if(type == 1){
	    	   
	    	    	$('.chrysanthemums').css("display","block");
		    		/*
		    		 * 如果是取下一页，则满足触发事件的条件（即，只要滚轮距离底部的距离小于10px时）
		    		 * 此时的startIndex就是nowPage * self.page.timeNum
		    		 */
					var atPage_2 = self.getNowPage(dataArr,selfData,1);
                    //此时的startIndex就是当前页乘以每一页拉取的数据条数
                    params.startIndex = atPage_2 * self.page.timeNum;
	    	    }
	    		else if (type == 2)
	    		{   
	    			
	    				/*
		    			 * 1,如果是详情页点击tab栏回到列表页的话，startIndexcurrPage就是
		    			 *   存储在本地储存的interPage;
		    		 	 * 2,如果是在列表页点击tab栏的话，则重置页面数据，并且清空本地存储的储存数据
		    			 *   请求数据的startIndex就是0
		    			 */
		    			
		    			if(!commonFu.isEmpty(sessionStorage.getItem("interPage")))
		    			{   
		    				var enterPage = parseInt(sessionStorage.getItem("interPage"));
		    				//返回列表页且获取该页数据，即是用点击前存储的页数减 1
//		    				params.startIndex = (enterPage - 1) * self.page.timeNum;
	                        params.startIndex = 0;
	                        params.num = enterPage * self.page.timeNum;
		    			}
		    			else
		    			{  
		    				/*
		    				 * 如果是在列表页点击tab栏，则
		    				 */
		    				var atPage_4 = self.getNowPage(dataArr,selfData,2);
		    				//此处相当于在列表页点击tab栏点击
		    				params.startIndex = (atPage_4 - 1) * self.page.timeNum;
		    				
		    			}
	    		}
	    	}	

	    	$('.animation').css('display','block');
	    	
//	    	console.log('params:' + JSON.stringify(params));
	    	

	    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_AUCTION_ITEMS, params, function(data){
//	    	   console.log('data:' + JSON.stringify(data));
	    	    self.totalCount = data.count;
	    	    //设置总页数
	    	    self.setTotalPage(self.totalCount);
               
                if(commonFu.isEmpty(sessionStorage.getItem("alreadyGet")))
	    	    {  
	    	    	
	    	    	if(!commonFu.isEmpty(self.thisJumpPage) && !commonFu.isEmpty(self.thisJumpId))
	    			{   
		    			self.selectedModel.auctionItems = [];
			    	    self.selectedModel.auctionItems = data.auctionItems;
			    	    sessionStorage.removeItem("alreadyGet");
			    	    sessionStorage.setItem("alreadyGet",JSON.stringify(data.auctionItems));
			    	    if(String(self.thisJumpPage).indexOf("#") != -1)
			    	    {
			    	    	self.page.currentPage = parseInt(self.thisJumpPage.split("#")[0]);
			    	    	
			    	    }
			    	    else
			    	    {
			    	    	self.page.currentPage = parseInt(self.thisJumpPage);
			    	    }
			    	   
	    			}
	    			else
	    			{
	    				/*
		    		 	* 如果是第一次进入，本地缓存为空，则 params.startIndex = 0;
		    		 	*/
		    		 	self.selectedModel.auctionItems = [];
	                	self.selectedModel.auctionItems = data.auctionItems;
	                	sessionStorage.removeItem("alreadyGet");
	                	sessionStorage.setItem("alreadyGet",JSON.stringify(data.auctionItems));
	                	//获取加载到的最大页
	                	self.page.currentPage = 1;
	    			}
	    			
	    	    }
	    	    else
	    	    {  
		    	    if(type == 1)
		    	    {   
		    	    
		    	    	/*
		    	    	 * 获取下一页数据时，在本地的数据模型上拼接上请求来的数据
		    	    	 */
		    	    	var dataNxt = data.auctionItems;

		    	    	self.selectedModel.auctionItems = self.selectedModel.auctionItems.concat(dataNxt);
		    	    	/*
		    	    	 * 把请求到的数据同步到本地缓存里，
		    	    	 */
		    	    	//向本地存储后面追加数据
		     	    	self.alreadyGetData(dataNxt,0);
		    	    	//获取缓存里的数据
		    	    	var theSessionData_2 = JSON.parse(sessionStorage.getItem("alreadyGet"));
		    	    	//请求完数据后获取当前数据模型
		    	    	var theSelfData_2 = self.selectedModel.auctionItems;
		    	    	//获取加载到的最大页
		    	    	self.page.currentPage = self.getNowDataPage(theSessionData_2,theSelfData_2);
                        $('.chrysanthemums').css("display","none");
                     
		    	    }
		    	    else if(type == 2)
		    	    {  

	    					/*
			    	    	 * 如果是在详情页点击tab栏，则清空本地数据模型，再把请求来的数据赋值给当前数据模型；
			    	    	 * 如果是在列表页点击tab栏，则重置页面，只取第一页数据，
			    	    	 */
			    	    	if(!commonFu.isEmpty(sessionStorage.getItem("interPage")))
			    	    	{   
	    	    		      
			    	    		self.selectedModel.auctionItems = [];
//			    	    		self.selectedModel.auctionItems = JSON.parse(sessionStorage.getItem("alreadyGet"));
                              
                                self.selectedModel.auctionItems = data.auctionItems;
                                sessionStorage.setItem("alreadyGet",JSON.stringify(data.auctionItems));
			    	    	
			    	    	
			    	    	
			    	    	//  self.page.currentPage = parseInt(sessionStorage.getItem("interPage"));
			    	    		self.page.currentPage = Math.ceil(JSON.parse(sessionStorage.getItem("alreadyGet")).length/self.page.timeNum);
			    	    		sessionStorage.removeItem("interPage");
			    	    	}
			    	    	else
			    	    	{   
			    	    		/*
			    	    		 * 如果是在列表页点击tab栏，则只取第一页数据
			    	    		 * 并且重置页面页数等
			    	    		 */
			    	    		self.selectedModel.auctionItems = [];
			    	    		self.selectedModel.auctionItems = data.auctionItems;
			    	    		self.alreadyGetData(data.auctionItems,1);
			    	    		//获取加载到的最大页
			    	    		self.page.currentPage = 1;
			    	    		
			    	    	}

		    	    }
	                else
	                {
	                }
	    	    }
	    	   
	    		if(self.selectedModel.auctionItems.length == 0)
	    		{
	    			$("#list-empty").css({"padding":"0 5px"})
	    		}
	    		if (self.selectedModel.auctionItems.length > 0)
	    		{
	    			$(".no-data").hide();
	    			var goods = self.selectedModel.auctionItems;

		    		for (var i = 0; i < goods.length; i++)
		    		{
//			    		goods[i].goodsInfo.goodsPicsShow = JSON.parse(goods[i].goodsInfo.goods_pics)[0];
	                    goods[i].goodsInfo.goodsPicsShow = goods[i].goodsInfo.goods_cover;
	                  
	                    goods[i].isShowPrice = !commonFu.isEmpty(goods[i].currentUserInfo); //是否已经有人出价
	                    
	                    goods[i].currentPrice = commonFu.toDecimals(goods[i].currentPrice);
//	                    alert(goods[i].currentPrice)
		    		}
		    		
	    		}
	    		else
	    		{
	    			$(".no-data").show();
	    		}
               
                var nowStamp = Date.parse(new Date());
                for(var s = 0 ; s <  self.selectedModel.auctionItems.length ; s ++)
                {
                	if(((parseInt(self.selectedModel.auctionItems[s].endTime)*1000) < nowStamp) || ((parseInt(self.selectedModel.auctionItems[s].currentPrice) >= parseInt(self.selectedModel.auctionItems[s].cappedPrice)) && (parseInt(self.selectedModel.auctionItems[s].cappedPrice) > 0)) ) 
                	{
                		self.selectedModel.auctionItems[s].itHasBeenOk = true;
                	}
                	else
                	{
                		self.selectedModel.auctionItems[s].itHasBeenOk = false;
                	}
                	
                	self.selectedModel.auctionItems[s].isAucted = false;
		    		if (!commonFu.isEmpty(self.selectedModel.auctionItems[s].currentUserInfo))
		    		{
		    			self.selectedModel.auctionItems[s].isAucted = true;
		    			
		    		}
                }
               
	    		self.shareInfo.title = "雅玩之家";
	            self.shareInfo.img = "http://auction.yawan365.com/web/img/share-to-other.jpg";
	            self.shareInfo.content = "文化收藏，雅玩之家，每晚十点，欢迎回家";
	          
    		    commonFu.setShareTimeLine(self.wxParams,self.shareInfo,location.href);
                
	            self.isFinsh = false;
	            
//	            var currentDate = new Date().getTime();
//		        var second1 = Math.ceil(currentDate/1000);
//		
//			    var dataArr = deepCopy(self.selectedModel.auctionItems);
//				for(var j = 0; j < dataArr.length; j++)
//				{
//					var time = parseInt(dataArr[j].endTime) - parseInt(second1);
//					
//					if(time > 0)
//					{
//						
//						var day = Math.floor(time/(3600*24));
//			            var hour = Math.floor((time/3600)%24);
//			            var min = Math.floor((time%3600)/60);
//			            var sec =  Math.floor(time%60);
//			            if(parseInt(hour)  < 10)
//			            {
//			            	hour = '0' + hour;
//			            }
//			            if(parseInt(min)  < 10)
//			            {
//			            	min = '0' + min;
//			            }
//			            if(parseInt(sec)  < 10)
//			            {
//			            	sec = '0' + sec;
//			            }
//			            
//						$("#sel_day" + dataArr[j].id).html(day);
//						$("#sel_hour" + dataArr[j].id).html(hour);
//						$("#sel_min" + dataArr[j].id).html(min);
//						$("#sel_sec" + dataArr[j].id).html(sec);
//	
//					}
//					else{
//						var day = Math.floor(time/(3600*24));
//			            var hour = Math.floor((time/3600)%24);
//			            var min = Math.floor((time%3600)/60);
//			            var sec =  Math.floor(time%60);
//			            if(parseInt(hour)  < 10)
//			            {
//			            	hour = '0' + hour;
//			            }
//			            if(parseInt(min)  < 10)
//			            {
//			            	min = '0' + min;
//			            }
//			            if(parseInt(sec)  < 10)
//			            {
//			            	sec = '0' + sec;
//			            }
//			            $("#sel_day" + dataArr[j].id).html('00');
//						$("#sel_hour" + dataArr[j].id).html('00');
//						$("#sel_min" + dataArr[j].id).html('00');
//						$("#sel_sec" + dataArr[j].id).html('00');
//	
//					}
//				
//				}
			
//				self.scope.auctionItems = self.selectedModel.auctionItems;
//			    self.scope.$apply();
	
	            self.countDown();
	           
	    		
	    	})

    },
  
    countDown : function()
	{
        var self = this;
		
		self.timer = setInterval(function(){
			var currentDate = new Date().getTime();
		    var second1 = Math.ceil(currentDate/1000);
		
			var dataArr = deepCopy(self.selectedModel.auctionItems);
			for(var j = 0; j < dataArr.length; j++)
			{
				var time = parseInt(dataArr[j].endTime) - parseInt(second1);
				
				if(time > 0)
				{
					time--;
					
					var day = Math.floor(time/(3600*24));
		            var hour = Math.floor((time/3600)%24);
		            var min = Math.floor((time%3600)/60);
		            var sec =  Math.floor(time%60);
		            if(parseInt(hour)  < 10)
		            {
		            	hour = '0' + hour;
		            }
		            if(parseInt(min)  < 10)
		            {
		            	min = '0' + min;
		            }
		            if(parseInt(sec)  < 10)
		            {
		            	sec = '0' + sec;
		            }
		            
					$("#sel_day" + dataArr[j].id).html(day);
					$("#sel_hour" + dataArr[j].id).html(hour);
					$("#sel_min" + dataArr[j].id).html(min);
					$("#sel_sec" + dataArr[j].id).html(sec);
//		            dataArr[j].dayTime = day;
//		            dataArr[j].hourTime = hour;
//		            dataArr[j].minTime = min;
//		            dataArr[j].secTime = sec;
		             
		  
				}
				else{
					var day = Math.floor(time/(3600*24));
		            var hour = Math.floor((time/3600)%24);
		            var min = Math.floor((time%3600)/60);
		            var sec =  Math.floor(time%60);
		            if(parseInt(hour)  < 10)
		            {
		            	hour = '0' + hour;
		            }
		            if(parseInt(min)  < 10)
		            {
		            	min = '0' + min;
		            }
		            if(parseInt(sec)  < 10)
		            {
		            	sec = '0' + sec;
		            }
		            $("#sel_day" + dataArr[j].id).html('00');
					$("#sel_hour" + dataArr[j].id).html('00');
					$("#sel_min" + dataArr[j].id).html('00');
					$("#sel_sec" + dataArr[j].id).html('00');
//		            dataArr[j].dayTime = 0;
//		            dataArr[j].hourTime = 0;
//		            dataArr[j].minTime = 0;
//		            dataArr[j].secTime = 0;
				}
				

			}
			
	    	$('.animation').css("display","none");
	    	$('.container').css('opacity','1');
			self.scope.auctionItems = self.selectedModel.auctionItems;
			 self.scope.$apply();
//		    console.log(JSON.stringify(self.selectedModel.auctionItems))
		},1000)
		
		
	
    },
    
    
    //获取当前数据模型最大加载到了第几页
    getNowDataPage : function(local,selected){

    	var self = this;
    	for(var o = 0; o < local.length; o++)
    	{
    		if(local[o].id == selected[selected.length - 1].id)
    		{    
    			var theAllPage = Math.ceil((o + 1)/self.page.timeNum);
    		}
    	}

    	return theAllPage;
    },
    
    bindClick: function ()
    {
    	var self = this;
    	
    	
    	//跳转到个人中心
    	self.scope.jumpToSelfZone2 = function(){
    		
    		
    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_JUDGE_ISLOGIN, {}, function(data){
    			   
	    			if(JSON.stringify(data) == 'true'){
	    				
        				location.href = pageUrl.PERSON_CENTER;
        				
	    			}
	    			else{
	    				
			       		 	localStorage.setItem(localStorageKey.DEFAULT, pageUrl.PERSON_CENTER);
		        			location.href = pageUrl.LOGIN_PAGE;
	    			}
    		
    		    });
    		
    		
    	};
    	
    	
    	self.scope.onClickToGoodsDetail = function(item)
    	{   
    		  
    		            var id = item.id;
    		    
    		    
    		            if(parseInt(item.isVIP) == 1)
		    			{  
		    				
		    				
		    				jqAjaxRequest.asyncAjaxRequest(apiUrl.API_JUDGE_ISLOGIN, {}, function(data){
    			   
				    			if(JSON.stringify(data) == 'true'){
				    				
				    				 
				    				 jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data) {
	            				        
							    		    var isMySelfVip = data.userInfo.isVIP;
				            				if(parseInt(isMySelfVip) == 0)
				            				{   
				            					$("#fixed-shade").css("display","block");
									    		$("html,body").css("overflow","hidden");
									    		$('#fixed-shade').bind("touchmove",function(e){
									              	e.preventDefault();
												});
								    			return;
				            				}else{
				            					
				            					localStorage.setItem(localStorageKey.FROM_LOCATION,0);
										    	sessionStorage.setItem("selDisId","sel_"+id);
										    	self.getInterPage(id);
										    	var thisPage = sessionStorage.getItem("interPage");
										    	var obj = new Base64();
										    	
										    	var id_base = obj.encode(id);
										    	
										    	var thispage_base = obj.encode(thisPage);
										    	
										    	var str =  pageUrl.GOODS_DETAIL + "?id=" + id_base + "&thisPage=" + thispage_base;
			//							    	location.href = encodeURI(str);   pageUrl.GOODS_DETAIL + "?id=" + id + "&thisPage=" + thisPage;
			//					    	        
								    	        location.href = encodeURI(str);
			
			//							    	 pageUrl.GOODS_DETAIL + "?id=" + id + "&thisPage=" + thisPage;
				            				}
			            			    })
				    				
			        				
			        				
				    			}
				    			else{
				    				
						       		$dialog.msg("当前为Vip拍品，请先登录！");
				    				setTimeout(function(){
				    					
				    					location.href = pageUrl.LOGIN_PAGE;
				    				},1000)
				    			}
			    		
			    		    });
		    				
		    				
		    				
		    				
		    				
		    				
		    				
		    				
		    			}
		    			else{
		    				       
		    				        localStorage.setItem(localStorageKey.FROM_LOCATION,0);
							    	sessionStorage.setItem("selDisId","sel_"+id);
							    	self.getInterPage(id);
							    	
							    	var obj = new Base64();
							    	
							    	var thisPage = sessionStorage.getItem("interPage");
							    	
							    	var id_base64 = obj.encode(id);
							    	
							    	var thisPage_base64 = obj.encode(thisPage);
							    	
							    	var str = pageUrl.GOODS_DETAIL + "?id=" + id_base64  + "&thisPage=" + thisPage_base64;
						    
							    	location.href = encodeURI(str);
							    	
		    			}
		    		   
//  		    jqAjaxRequest.asyncAjaxRequest(apiUrl.API_JUDGE_ISLOGIN, {}, function(data){
//  		
//		    		if(JSON.stringify(data) == 'true'){
//		    			
//		    			
//		    			if(parseInt(item.isVIP) == 1)
//		    			{
//		    				jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data) {
//	            				localStorage.setItem(localStorageKey.vipOrNot,data.userInfo.isVIP)
//				    		    var isMySelfVip = data.userInfo.isVIP;
//	            				if(parseInt(isMySelfVip) == 0)
//	            				{
//	            					$("#fixed-shade").css("display","block");
//						    		$("html,body").css("overflow","hidden");
//						    		$('#fixed-shade').bind("touchmove",function(e){
//						              	e.preventDefault();
//									});
//					    			return;
//	            				}else{
//	            					
//	            					localStorage.setItem(localStorageKey.FROM_LOCATION,0);
//							    	sessionStorage.setItem("selDisId","sel_"+id);
//							    	self.getInterPage(id);
//							    	var thisPage = sessionStorage.getItem("interPage");
//							    	location.href = pageUrl.GOODS_DETAIL + "?id=" + id + "&thisPage=" + thisPage;
//	            				}
//          			    })
//		    			}
//		    			else{
//		    				       
//		    				        localStorage.setItem(localStorageKey.FROM_LOCATION,0);
//							    	sessionStorage.setItem("selDisId","sel_"+id);
//							    	self.getInterPage(id);
//							    	
//							    	var thisPage = sessionStorage.getItem("interPage");
//							    	location.href = pageUrl.GOODS_DETAIL + "?id=" + id + "&thisPage=" + thisPage;
//		    			}
//		    		   
//			    		
//			    	}
//		    		else
//		    		{  
//		    			$dialog.msg("会话过期，请先登录");
//	                    setTimeout(function(){
//	                    	
//	                    	location.href = pageUrl.LOGIN_PAGE;
//	                    },1300)
//			    		
//			    	}
//		    		
//		    	})
    		    
    		    
            	
    
    	};
    	
    	
    	self.scope.okToShut = function(){
    		  
    		$("#fixed-shade").css("display","none");
    		$("html,body").css("overflow","auto");
    	};
    },
    
    
    
      ngRepeatFinish : function()
    {
    	var self = this;
    	
    	//ng-repeat完成后执行的操作
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
		    
		    if(!commonFu.isEmpty(self.thisJumpPage) && !commonFu.isEmpty(self.thisJumpId))
		    {  
				$('.container').css({'opacity':'0'});
				$('.animation').css("display","block");
				
				if(!commonFu.isEmpty(self.thisJumpId))
				{
					self.getDisToTop(self.thisJumpId);
				}
				setTimeout(function(){
						$('.animation').css("display","none");
						$('.container').css({'opacity':'1'});
				},200);
				
				sessionStorage.removeItem("selDisId");
		    }
		    else
		    {
		    	if(!commonFu.isEmpty(sessionStorage.getItem("selDisId")))
				{   
					
					var selId = sessionStorage.getItem("selDisId");
					$('.container').css({'opacity':'0'});
					$('.animation').css("display","block");
					
					if(!commonFu.isEmpty(selId))
					{
						self.getDisToTop(selId);
					}
					setTimeout(function(){
						$('.animation').css("display","none");
						$('.container').css({'opacity':'1'});
					},200);
					
					sessionStorage.removeItem("selDisId");
				}
		    }
			
		});
    },
    
  
     //判断当前ID是否存在，不存在则跳到页面元素的第一个
    judgeExist : function(id){
    	var self = this;
    	var judje = false;
    	for(var n = 0; n < self.selectedModel.auctionItems.length; n++)
    	{   
//  	    console.log(JSON.stringify(self.selectedModel.auctionItems))
    	   
    		if(self.selectedModel.auctionItems[n].id == id)
    		{   
    			judje = true;
    		}
    	}
        return judje;
       
    },
    //跳转到指定位置
    getDisToTop : function(id){
        var self = this;
        var id = id;
 
        	if(!commonFu.isEmpty(self.thisJumpPage) && !commonFu.isEmpty(self.thisJumpId))
        	{  
        		
        		if(!commonFu.isEmpty(sessionStorage.getItem("needPage")))
		        { 

		        	var dealTop = null;
		        	if(self.judgeExist(self.thisJumpId))
		        	{
		        		dealTop = $("#sel_"+ self.thisJumpId).offset().top ;
		        	}
		        	else
		        	{
		        		dealTop = $("#sel_"+ self.selectedModel.auctionItems[0].id).offset().top ;
		        	}
		        	
		     
				    sessionStorage.removeItem("needPage")
		        }
		        else
		        {   

		        	var dealTop = $("#sel_"+ self.selectedModel.auctionItems[0].id).offset().top;
		        }
				self.thisJumpPage = null;
				self.thisJumpId = null;
       		}	
	        else
	        {  
                var dealTop = null;
	        	var idStr = id.split('_')[1];
	
	        	if(self.judgeExist(idStr))
			    {
			        dealTop = $("#"+ id).offset().top ;
			    }
			    else
			    {
			        dealTop = $("#sel_"+ self.selectedModel.auctionItems[0].id).offset().top ;
			    }
	        }
	      	$("html,body").scrollTo({toT:dealTop});
 
    },
   
   
    
    //设置当前点击的id所在的页面数
    getInterPage : function(id){
    	
    	var self = this;
    	var interPage = null;
    	var alrGetData = JSON.parse(sessionStorage.getItem("alreadyGet"));
    	for(var i = 0;i < alrGetData.length; i++)
    	{   
    		if(alrGetData[i].id == id)
    		{   
    			interPage = Math.ceil((i+1)/self.page.timeNum); 
    		}
    	}
    	//当前点击时该条数据所在的页面数
        sessionStorage.setItem("interPage",interPage);
        
    },
    //得到获取数据前视线内该页面的页码数
    getNowPage :function(sessionData,selfData,type){
    	var self = this;
    	var sessionData = sessionData;
    	var selfData = selfData;
    	var nowPage = null;
    		/*
    		 * 1， 获取下一页
    		 */
 
    		if(type == 1)
    		{   
                //取下一页数据
	    		for(var n = 0; n < sessionData.length; n++)
    		    {
    		    	if(selfData[selfData.length -1].id == sessionData[n].id)
    		    	{
    		    	    nowPage = Math.ceil(n/self.page.timeNum);
    		    	}
    		    }
    		}
    		else
    		{
    			/*
	    		 * 如果interPage不为空，则当前nowPage为
	    		 *  nowPage = sessionStorage.getItem("interPage")；
	    		 * 如果interPage等于空，则是第一次进入，则nowPage= 1；
	    		 */
	    		
	    		if(!commonFu.isEmpty(sessionStorage.getItem("interPage")))
	    		{
	    			nowPage = parseInt(sessionStorage.getItem("interPage"));
	    		}
	    		else
	    		{
	    			nowPage = 1;
	    		}
    		}
    		return nowPage;

    },
 
    //本地缓存已经加载的所有数据
    alreadyGetData : function(data,judje){

    	var self = this;
    	var dataArr = [];
    	var param = null;
    	/*
    	 * 如果能够获取到已经存储的数据，
    	 * 0，表示在本地存储上追加数据；
    	 * 1，表示清空本地存储后只拿第一页数据
    	 * 如果获取不到，则说明是第一次加载
    	 */
    	
    	if(!commonFu.isEmpty(sessionStorage.getItem("alreadyGet")))
    	{   
    		dataArr = JSON.parse(sessionStorage.getItem("alreadyGet"));
    		//清除缓存
    		sessionStorage.removeItem("alreadyGet");
    		//把本地缓存转化成字符串
    		var dataArrStr = JSON.stringify(dataArr);
    		//把后台加载到的数据转换成字符串
    		var dataStr = JSON.stringify(data)
    		/*
    		 * 0:向本地缓存的后面拼接数据
    		 */
    		
    		if(judje == 0)
    	    {   
    	    	sessionStorage.removeItem("alreadyGet");
    	    	var isrepeat = false;//判断是否重复
    	    	var nowPages = self.getNowPage();
    	    	
    	    	for(var h = 0; h < dataArr.length; h++)
    	    	{
    	    		if((dataArr[h].id == data[0].id) || (dataArr[h].id == data[data.length - 1].id))
    	    		{
    	    			isrepeat = true;
    	    		}
    	    	}
    	    	if(isrepeat)
    	    	{
   	    			param = JSON.parse(dataArrStr);
    	    	}
    	    	else
    	    	{
   	    			param = JSON.parse(dataArrStr).concat(JSON.parse(dataStr));
    	    	}
    	    	
    	    }
    	    else
    	    {   
    	    	//如果是下拉刷新，或者在列表页点击tab栏，则清空本地存储的sessionStorage
    	    	sessionStorage.removeItem("alreadyGet");
    	    	param = data;
    	    }
    	    sessionStorage.setItem("alreadyGet",JSON.stringify(param));

    	}

    },
 
 
    //设置总页数
    setTotalPage : function(count)
	{   
		//count为总数据条数
	   	var remainder = count % this.page.timeNum;
	   
	    var integer = parseInt(count / this.page.timeNum);
	   	
	   	if(remainder == 0)
	   	{
	   	 	this.page.totalPage = integer;
	   	}
	   	else
	   	{
	   	 	this.page.totalPage = integer + 1;
	   	}

	},
     
     
   
};
    //滚动事件的监控
    $(document).ready(function(){
    	var p=0,t=0;  
         
   		 $(window).scroll(function(e){  
   		 	
            p = $(this).scrollTop();  
            
            //当前窗口的高度
            var totalHeight = $(window).height();
			//当前文档的高度 - 当前滚动条到窗口顶部的距离
			var currnetHright = $(document).height() - document.body.scrollTop;
			
			//获取到本地缓存
			var dataArr = JSON.parse(sessionStorage.getItem("alreadyGet"));
			
			var selfData = SelectCtrl.selectedModel.auctionItems;
			
            if(t <= p)
            {   
            	/*  
				 *  当滚动条距离底部的距离 小于 22px时加载 
				 *  且当前价在到的最大页码数小于总页数
				 */
            	//下滚  获取下面的数据
            	
			    if (currnetHright - totalHeight < 569)
			    {  
                     
			    	/*
			    	 * 如果当前加载到的最大页码数小于总页数
			    	 */
	
			    	if((SelectCtrl.page.currentPage < SelectCtrl.page.totalPage) && (SelectCtrl.selectedModel.auctionItems.length < SelectCtrl.totalCount))
					{   
                         
            	        SelectCtrl.initData(1);
            	        
            	      
					}
					else if((SelectCtrl.page.currentPage == SelectCtrl.page.totalPage) || (SelectCtrl.selectedModel.auctionItems.length == SelectCtrl.totalCount))
					{   

						$('.chrysanthemums').css("display","block");
						setTimeout(function(){
							$('.chrysanthemums').css("display","none");

						},500);
						setTimeout(function(){

							$(".no-more-data").css("display","block");

//							setTimeout(function(){
//								$(".no-more-data").css("display","none");
//							},1800);
						},500)
						
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
   
 
  