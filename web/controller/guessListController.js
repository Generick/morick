/*
 * 
 * 精选
 * 
 */


var GuessListCtrl =
{   
    scope: null,
    
    isFinsh : false,
    
    page : {
		currentPage : 1,
		totalPage : null,
		timeNum : 20,
	},
	
	wxParams : {},
   
    shareInfo : {},
	
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
        
    	this.judjeIsFirstCome();
    	
    	this.getUrlAndId();
    	
    	this.initData(2);
    	
        this.ngRepeatFinish();
       
        initTab.start(this.scope, 0); //底部导航
         
    	this.bindClick();
    	
    },
   
    getUrlAndId : function(){
    	var self = this;
    	
    	var arr = [];
    	if(commonFu.listGetUrlPublic(location.href).length == 2)
    	{
    		arr = commonFu.listGetUrlPublic(location.href);
    		self.thisJumpPage = arr[0];
    		self.thisJumpId = arr[1];
    	}
    	
    	
    },
    
    initData: function(type) {
    	    var self = this;
    	    
            if(self.isFinsh){
            	
            	return;
            }
            self.isFinsh = true;
            
    		var params = {
    			status : 1,
		    	num : self.page.timeNum
    	    };
	    		/*
	    		 * 
	    		 * 0，取上一页数据
	    		 * 1，取下一页数据
	    		 * 2，刷新tab栏
	    		 *  (如果有存的interPage则是点击详情页的tab栏；
	    		 *   如果没有interPage,则说明是在列表页刷新的tab栏)
	    		 */
	    	if(commonFu.isEmpty(sessionStorage.getItem("guessAlreadyGet")))
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
	    	    sessionStorage.removeItem("guessAlreadyGet")
	    	    
	    	    var dataArr = JSON.parse(sessionStorage.getItem("guessAlreadyGet"));
	    	    var selfData = self.selectedModel.auctionItems;
//	    		alert(sessionStorage.getItem("guessAlreadyGet"))
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
		    			
		    			if(!commonFu.isEmpty(sessionStorage.getItem("interGuessPage")))
		    			{   
		    				var enterPage = parseInt(sessionStorage.getItem("interGuessPage"));
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
	    	
	     
	    	
	    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_INFORMATION_LIST, params, function(data){
	    		
//	    		console.log(JSON.stringify(data));
	    	    self.totalCount = data.count;
	    	    //设置总页数
	    	    self.setTotalPage(self.totalCount);
                
                if(commonFu.isEmpty(sessionStorage.getItem("guessAlreadyGet")))
	    	    {  
	    	    	
	    	    	if(!commonFu.isEmpty(self.thisJumpPage) && !commonFu.isEmpty(self.thisJumpId))
	    			{   
		    			self.selectedModel.auctionItems = [];
			    	    self.selectedModel.auctionItems = data.informationList;
			    	    sessionStorage.removeItem("guessAlreadyGet");
			    	    sessionStorage.setItem("guessAlreadyGet",JSON.stringify(data.informationList));
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
	                	self.selectedModel.auctionItems = data.informationList;
	                	sessionStorage.removeItem("guessAlreadyGet");
	                	sessionStorage.setItem("guessAlreadyGet",JSON.stringify(data.informationList));
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
		    	    	var dataNxt = data.informationList;

		    	    	self.selectedModel.auctionItems = self.selectedModel.auctionItems.concat(dataNxt);
		    	    	/*
		    	    	 * 把请求到的数据同步到本地缓存里，
		    	    	 */
		    	    	//向本地存储后面追加数据
		     	    	self.alreadyGetData(dataNxt,0);
		    	    	//获取缓存里的数据
		    	    	var theSessionData_2 = JSON.parse(sessionStorage.getItem("guessAlreadyGet"));
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
			    	    	if(!commonFu.isEmpty(sessionStorage.getItem("interGuessPage")))
			    	    	{   
	    	    		        
			    	    		self.selectedModel.auctionItems = [];
			    	    		
			    	    		
			    	    		self.selectedModel.auctionItems = data.informationList;
                                sessionStorage.setItem("guessAlreadyGet",JSON.stringify(data.informationList));
			    	    		
//			    	    		self.selectedModel.auctionItems = JSON.parse(sessionStorage.getItem("guessAlreadyGet")); 
			    	    	//  self.page.currentPage = parseInt(sessionStorage.getItem("interGuessPage"));    	    		
			    	    		self.page.currentPage = Math.ceil(JSON.parse(sessionStorage.getItem("guessAlreadyGet")).length/self.page.timeNum);
			    	    		sessionStorage.removeItem("interGuessPage");
			    	    	}
			    	    	else
			    	    	{   
			    	    		/*
			    	    		 * 如果是在列表页点击tab栏，则只取第一页数据
			    	    		 * 并且重置页面页数等
			    	    		 */
			    	    		self.selectedModel.auctionItems = [];
			    	    		self.selectedModel.auctionItems = data.informationList;
			    	    		self.alreadyGetData(data.informationList,1);
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
                        self.selectedModel.auctionItems[i].hasSee = 1;
		    			if(goods[i].goods_icon != null)
		    			{
		    				goods[i].goodsPicsShow = JSON.parse(goods[i].goods_icon)[0];
		    			}
		    			else{
 		    				goods[i].goodsPicsShow = "img/wzg.jpg";
		    			}
			 
	                    goods[i].isShowPrice = !commonFu.isEmpty(goods[i].currentUserInfo); //是否已经有人出价
	                    
	                    goods[i].currentPrice = commonFu.toDecimals(goods[i].currentPrice);
	                    
	                    
		    		}
	    		}
	    		else
	    		{
	    			$(".no-data").show();
	    		}
                
                self.shareInfo.title = "雅玩之家";
                self.shareInfo.img = "http://auction.yawan365.com/web/img/share-to-other.jpg";
                self.shareInfo.content = "文化收藏，雅玩之家，每晚十点，欢迎回家";
        
                commonFu.setShareTimeLine(self.wxParams,self.shareInfo,location.href);
                
                for(var j = 0; j < self.selectedModel.auctionItems.length; j ++)
                {
                	self.selectedModel.auctionItems[j].title =  commonFu.returnRightReg(self.selectedModel.auctionItems[j].title);
                }
                
	    		self.scope.auctionItems = self.selectedModel.auctionItems;
	    		
	    		$('.animation').css("display","none");
	    		$('.container').css('opacity','1');
	            self.isFinsh = false;
	            
	            self.scope.$apply();
	    		for(var j = 0; j < self.selectedModel.auctionItems.length ; j++ )
	    		{
	    			if(self.selectedModel.auctionItems[j].type == 1)
	    			{

	    				$(".guess-list-ul").children('li').eq(j).find("video").prop("src",self.selectedModel.auctionItems[j].content)
                        $(".guess-list-ul").children('li').eq(j).find("video").prop("poster",self.selectedModel.auctionItems[j].cover)
						
	    			}
	    		}
	    	})

    },

    bindClick: function ()
    {
    	var self = this;

    	self.scope.onClickToGoodsDetail = function(item,index)
    	{   
              
    		    var id = item.id;
    		    if(item.type == 1 )
    		    {  
    		    	
    		    	var vides = $(".guess-list-ul").children('li').eq(index).find("video");
      
		    		if(vides.get(0).paused)
		    		{
		    			vides.get(0).play();
		    			
		    			for(var m = 0 ; m < self.selectedModel.auctionItems.length; m ++)
		    			{
		    				if(m == index)
		    				{
		    					self.selectedModel.auctionItems[index].hasSee = 0;
		    				}
		    				
		    			}
		    			$(".guess-list-ul").children('li').eq(index).find(".videobg").css("opacity","0");
		    		}
		    		else
		    		{
		    			vides.get(0).pause();
		    			
		    			for(var m = 0 ; m < self.selectedModel.auctionItems.length; m ++)
		    			{
		    				if(m == index)
		    				{
		    					self.selectedModel.auctionItems[index].hasSee = 1;
		    				}
		    				
		    			}
		    			$(".guess-list-ul").children('li').eq(index).find(".videobg").css("opacity","1");
		    		}

    		    }
    		    else
    		    {
//  		    	$(".guess-list-ul").children('li').eq($(".guess-list-ul").children('li').length-1).css("margin-bottom","8px");
    		    	
    		    	localStorage.setItem(localStorageKey.FROM_LOCATION,0);
					sessionStorage.setItem("guessId","guess_"+id);
					self.getInterPage(id);
					var thisPage = sessionStorage.getItem("interGuessPage");
					location.href = pageUrl.GUESS_DETAIL + "?id=" + item.id + "&thisPage=" + thisPage;
				 	
    		    }
    		    

    	};
    	
    	
    	//跳转到个人中心
    	self.scope.jumpToSelfZone1 = function(){
    	
    		if(commonFu.isEmpty(localStorage.getItem(localStorageKey.TOKEN)))
			{   	
				
	       		localStorage.setItem(localStorageKey.DEFAULT, pageUrl.PERSON_CENTER);
        		location.href = pageUrl.LOGIN_PAGE;
        	
			}
            else
            {   
            		
            	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_JUDGE_ISLOGIN, {}, function(data){
    			  
    			
	    			if(JSON.stringify(data) == 'true' || !commonFu.isEmpty(sessionStorage.getItem("loginSucess"))){
	    				
        			 	location.href = pageUrl.PERSON_CENTER;
        				
	    			}else{
	    				
	       		 	    localStorage.setItem(localStorageKey.DEFAULT, pageUrl.PERSON_CENTER);
        			 	location.href = pageUrl.LOGIN_PAGE;
        			
	    			}
    		
    		    },
    		    function(){
            		
	       		    localStorage.setItem(localStorageKey.DEFAULT, pageUrl.PERSON_CENTER);
        			location.href = pageUrl.LOGIN_PAGE;
        			
            	});
   
            }
    		
    	};
    	
    	self.scope.onClickToGoods = function(){
    		
    		location.href = pageUrl.GUESS_DETAIL;
    		
    	};
    	
    	self.scope.okToShut = function(){
    		  
    		$("#fixed-shade").css("display","none");
    		$("html,body").css("overflow","auto");
    	};
    	
    	
    	
    	
    	self.scope.videoUrl = function(url){
    	
             return $sce.trustAsResourceUrl(url);  

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
				
				sessionStorage.removeItem("guessId");
		    }
		    else
		    {  
		    	if(!commonFu.isEmpty(sessionStorage.getItem("guessId")))
				{   
					
					var selId = sessionStorage.getItem("guessId");
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
					
					sessionStorage.removeItem("guessId");
				}
		    }
			
		});
    },
    
      
  
//判断是否需要调用重登陆
    judjeIsFirstCome : function(){
         $("#myself-head img").removeClass('sharking');
		if(commonFu.isEmpty(sessionStorage.getItem("isFirstCome")))
		{   
			/*
			 *   1，isFirstCome是空说明是第一次进入该应用。此时先要判断是否从登陆页面跳转过来的
			 *     即formLoginCome字段是否存在，如果存在，则说明已经登录了；
			 */
    			if(!commonFu.isEmpty(localStorage.getItem(localStorageKey.TOKEN)))
				{    
				  
					if(commonFu.isEmpty(sessionStorage.getItem("formLoginCome")) && commonFu.isEmpty(sessionStorage.getItem("loginSucess")))
					{  
						
						$("#myself-head img").addClass('sharking');
						//alert("有token调重登陆")
						var localToken = localStorage.getItem(localStorageKey.TOKEN);
						var params = {};
						params.userType = 1;
						params.token = localToken;
		                
					    jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USER_RELOGIN, params, function(data){
					    	
					    	//alert("调重登陆成功")
						    var newToken = data.token;
							localStorage.removeItem(localStorageKey.TOKEN);
							localStorage.setItem(localStorageKey.TOKEN,newToken)
							$("#myself-head img").removeClass('sharking');
							//不管是重登陆还是登录界面登录的，登录成功的标志，关闭浏览器后自动失效
							sessionStorage.setItem("loginSucess",1);
							sessionStorage.removeItem("reloginFail")
							
						})
					}
					else
					{  
						//如果formLoginCome不为空，则说明是从登录页面跳转过来的，
					   	//alert("从登陆页面登录进来的")
					}
				}
				else
				{  
					$("#myself-head img").addClass('sharking');
					//如果token为空，则说明是一个没有登录过的人，第一次的直接地跳到了列表页，此时直接取列表页数据就好
					//alert("未登陆过，第一次跳到列表页")	
				}
		}
		else
		{  
			if(commonFu.isEmpty(localStorage.getItem(localStorageKey.TOKEN)))
			{
				
				$("#myself-head img").addClass('sharking');
			}
			else
			{
				if(!commonFu.isEmpty(sessionStorage.getItem("formLoginCome")) || !commonFu.isEmpty(sessionStorage.getItem("loginSucess")))
				{   
					$("#myself-head img").removeClass('sharking');
				}
				else if(commonFu.isEmpty(sessionStorage.getItem("formLoginCome")) && commonFu.isEmpty(sessionStorage.getItem("loginSucess")))
				{    
					$("#myself-head img").addClass('sharking');
				}
			}
			
			//isFirstCome不为空说明不是第一次进入，而是在应用内跳转的，所以直接加载数据
			//alert("应用内跳转")
		}
		
        sessionStorage.setItem("isFirstCome",1);//表明不是第一次进入该页面取数据，做以标记
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
        		 
        		if(!commonFu.isEmpty(sessionStorage.getItem("needGuessPage")))
		        { 
                    var dealTop = null;
		        	if(self.judgeExist(self.thisJumpId))
		        	{
		        		dealTop = $("#guess_"+ self.thisJumpId).offset().top ;
		        	}
		        	else
		        	{
		        		dealTop = $("#guess_"+ self.selectedModel.auctionItems[0].id).offset().top;
		        	}
		        	
				    sessionStorage.removeItem("needGuessPage")
		        }
		        else
		        {   

		        	var dealTop = $("#guess_"+ self.selectedModel.auctionItems[0].id).offset().top;
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
			        dealTop = $("#guess_"+ self.selectedModel.auctionItems[0].id).offset().top;
			      
			    }
	    
	        }
	      	$("html,body").scrollTo({toT:dealTop});
 
    },
   
   
    
    //设置当前点击的id所在的页面数
    getInterPage : function(id){
    	
    	var self = this;
    	var interPage = null;
    	var alrGetData = JSON.parse(sessionStorage.getItem("guessAlreadyGet"));
    	for(var i = 0;i < alrGetData.length; i++)
    	{   
    		if(alrGetData[i].id == id)
    		{   
    			interPage = Math.ceil((i+1)/self.page.timeNum); 
    		}
    	}
    	//当前点击时该条数据所在的页面数
        sessionStorage.setItem("interGuessPage",interPage);
        
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
	    		
	    		if(!commonFu.isEmpty(sessionStorage.getItem("interGuessPage")))
	    		{
	    			nowPage = parseInt(sessionStorage.getItem("interGuessPage"));
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
    	
    	if(!commonFu.isEmpty(sessionStorage.getItem("guessAlreadyGet")))
    	{   
    		dataArr = JSON.parse(sessionStorage.getItem("guessAlreadyGet"));
    		//清除缓存
    		sessionStorage.removeItem("guessAlreadyGet");
    		//把本地缓存转化成字符串
    		var dataArrStr = JSON.stringify(dataArr);
    		//把后台加载到的数据转换成字符串
    		var dataStr = JSON.stringify(data)
    		/*
    		 * 0:向本地缓存的后面拼接数据
    		 */
    		
    		if(judje == 0)
    	    {   
    	    	sessionStorage.removeItem("guessAlreadyGet");
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
    	    	sessionStorage.removeItem("guessAlreadyGet");
    	    	param = data;
    	    }
    	    sessionStorage.setItem("guessAlreadyGet",JSON.stringify(param));

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

	}
     

    
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
			var dataArr = JSON.parse(sessionStorage.getItem("guessAlreadyGet"));
			
			var selfData = GuessListCtrl.selectedModel.auctionItems;
			
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
	
			    	if((GuessListCtrl.page.currentPage < GuessListCtrl.page.totalPage) && (GuessListCtrl.selectedModel.auctionItems.length < GuessListCtrl.totalCount))
					{   
//                      $(".guess-list-ul").children('li').eq($(".guess-list-ul").children('li').length-1).css("margin-bottom","8px");
            	        GuessListCtrl.initData(1);
            	        
            	      
					}
					else if((GuessListCtrl.page.currentPage == GuessListCtrl.page.totalPage) || (GuessListCtrl.selectedModel.auctionItems.length == GuessListCtrl.totalCount))
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
   
 
  