/*
 * 拍卖历史
 */

var AuctionHistoryCtrl =
{
    scope : null,
    
    isFinsh : false,
    
    thisJumpPage :null,
    
    thisJumpId : null,
    
    
	wxParams : {},
   
    shareInfo : {},
    
    page : {
		currentPage : 1,
		totalPage : null,
		timeNum : 20,
	},
	
	totalCount : 0,//数据的总条数
	
    
    auctionHistoryModel : 
    {
    	auctionItems : [],
    	id : null
    },
    
    init : function ($scope,wxParams)
    {
       
    	this.scope = $scope; 
    	
    	this.wxParams = wxParams;
    	
    	this.judjeIsFirstCome();
    	
    	this.getUrlAndId();
    	
        this.ngRepeatFinish();
       
        initTab.start(this.scope, 2); //底部导航
        
        this.bindClick();
    	
    },
    
    getUrlAndId : function(){
    	
    	var self = this;
    	
    	
    	self.shareInfo.title = "雅玩之家";
        self.shareInfo.img = "http://auction.yawan365.com/web/img/share-to-other.jpg";
        self.shareInfo.content = "文化收藏，雅玩之家，每晚十点，欢迎回家";
        
        commonFu.setShareTimeLine(self.wxParams,self.shareInfo,location.href);
    	
    	
    	
    	var arr = [];
    	$('.container').css('opacity','1');
    	if(commonFu.listGetUrlPublic(location.href).length == 2)
    	{   
    		arr = commonFu.listGetUrlPublic(location.href);
    		self.thisJumpPage = arr[0];
    	    self.thisJumpId = arr[1];
    	}
    	
    	
    },
    
    
    
     //判断是否需要调用重登陆
    judjeIsFirstCome : function(){
        $("#myself-head img").removeClass('sharking');
		if(commonFu.isEmpty(sessionStorage.getItem("isNewCome")))
		{    
			/*
			 *   1，isFirstCome是空说明是第一次进入该应用。此时先要判断是否从登陆页面跳转过来的
			 *     即formLoginCome字段是否存在，如果存在，则说明已经登录了；
			 */
    			if(!commonFu.isEmpty(localStorage.getItem(localStorageKey.TOKEN)))
				{    
					
					if(commonFu.isEmpty(sessionStorage.getItem("formLoginCome")) && commonFu.isEmpty(sessionStorage.getItem("loginSucess")))
					{  
					
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
		
        sessionStorage.setItem("isNewCome",1);//表明不是第一次进入该页面取数据，做以标记
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
    
  
    
    ngRepeatFinish : function()
    {
    	var self = this;
    	
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
					
				},100)
				
				sessionStorage.removeItem("aucDisId");
    		}
    		else
    		{
    			if(!commonFu.isEmpty(sessionStorage.getItem("aucDisId")))
				{  
					var acuId = sessionStorage.getItem("aucDisId");
					$('.container').css({'opacity':'0'});
					$('.animation').css("display","block");
					if(!commonFu.isEmpty(acuId))
					{
						self.getDisToTop(acuId);
					}
					
					setTimeout(function(){
						$('.animation').css("display","none");
						$('.container').css({'opacity':'1'});
					},100)
					
					sessionStorage.removeItem("aucDisId");
				}
    		
    		}
    		
    	});
    },
   
      //判断当前ID是否存在，不存在则跳到页面元素的第一个
    judgeExist : function(id){
    	var self = this;
    	var judje = false;
    	for(var n = 0; n < self.auctionHistoryModel.auctionItems.length; n++)
    	{   
//  	    console.log(JSON.stringify(self.auctionHistoryModel.auctionItems))
    	   
    		if(self.auctionHistoryModel.auctionItems[n].id == id)
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
        	
        
        	if(!commonFu.isEmpty(sessionStorage.getItem("needPageId")))
		    {
		       
		        var dealTop = null;
		        if(self.judgeExist(self.thisJumpId))
		        {
		        	dealTop = $("#test_"+ self.thisJumpId).offset().top ;
		        }
		        else
		        {
		        	dealTop = $("#test_"+ self.auctionHistoryModel.auctionItems[0].id).offset().top ;
		        }
		       
				sessionStorage.removeItem("needPageId")
		    }
		    else
		    {   
		        	
		        var dealTop = $("#test_"+ self.auctionHistoryModel.auctionItems[0].id).offset().top;
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
		        dealTop = $("#test_"+ self.auctionHistoryModel.auctionItems[0].id).offset().top ;
		    }
		
        }
      	
      	$("html,body").scrollTo({toT:dealTop});
     
    },
    
    
   
    
    bindClick  : function ()
    {
    	var self = this;
    	
    	
    	//跳转到个人中心
    	self.scope.jumpToSelfZone3 = function(){
    		
    		if(commonFu.isEmpty(localStorage.getItem(localStorageKey.TOKEN)))
			{   
				
	       		localStorage.setItem(localStorageKey.DEFAULT, pageUrl.PERSON_CENTER);
        		location.href = pageUrl.LOGIN_PAGE;
        		
			}
            else
            {   
            	
            	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_JUDGE_ISLOGIN, {}, function(data){
    			   
	    			if(JSON.stringify(data)  == 'true'  || !commonFu.isEmpty(sessionStorage.getItem("loginSucess"))){
	    				
        				location.href = pageUrl.PERSON_CENTER;
        				
	    			}
	    			else{
	    				
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
    	
    	self.scope.acOkToShut = function(){
    		
    		$("#acfixed-shade").css("display","none");
    		$("html,body").css("overflow","auto");
    	};
    	
    	
    	self.scope.onClickToAuctionHistoryDetail = function(item)
    	{   
    		var id = item.id;
    	    sessionStorage.setItem("comeWithGuess",2);
    	    sessionStorage.setItem("messlistOrauction",0)
    		if(!commonFu.isEmpty(sessionStorage.getItem("reloginFail")))
    		{
    			if((parseInt(item.isVIP) == 1) && (commonFu.isEmpty(localStorage.getItem(localStorageKey.vipOrNot))))
	            	{  
	            		$("#acfixed-shade").css("display","block");
		   				$("html,body").css("overflow","hidden");
		   				$('#acfixed-shade').bind("touchmove",function(e){
		              		 e.preventDefault();
					    });
		    			return;
	            	}
	            	else
	            	{
	            		
	            		self.auctionHistoryModel.id = id;
		    			sessionStorage.setItem("aucDisId","test_"+id);
		    			self.getInterPage(id);
		    			var thisAcPage = sessionStorage.getItem("intoPage");
		    			location.href = pageUrl.AUCTION_HISTORY_INFO + "?id=" + id  + "&thisAcPage=" + thisAcPage;
	            	
	            	}
    		}
    		else
    		{
    			
    			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data) {
		    		
		    		localStorage.setItem(localStorageKey.vipOrNot,data.userInfo.isVIP)
		    		var isMySelfVip = data.userInfo.isVIP;
		    		
		    		if(((parseInt(item.isVIP) == 1) && (parseInt(isMySelfVip) == 0)))
	 				{
		 				$("#acfixed-shade").css("display","block");
		   				$("html,body").css("overflow","hidden");
		   				$('#acfixed-shade').bind("touchmove",function(e){
		              		 e.preventDefault();
					    });
		    			return;
	 				}
	    			else
	    			{
		    			
		    			self.auctionHistoryModel.id = id;
		    			sessionStorage.setItem("aucDisId","test_"+id);
		    			self.getInterPage(id);
		    			var thisAcPage = sessionStorage.getItem("intoPage");
		    			location.href = pageUrl.AUCTION_HISTORY_INFO + "?id=" + id  + "&thisAcPage=" + thisAcPage;
	    			
	    			}
	    	
	            })
    		}
    
    	};
    },
   
     
    //设置当前点击的id所在的页面数
    getInterPage : function(id){
    	
    	var self = this;
    	var intoPage = null;
    	var alrGetData = JSON.parse(sessionStorage.getItem("hasGetData"));
    	for(var i = 0;i < alrGetData.length; i++)
    	{   
    		if(alrGetData[i].id == id)
    		{   
    			intoPage = Math.ceil((i+1)/self.page.timeNum); 
    		}
    	}
    	//当前点击时该条数据所在的页面数
        sessionStorage.setItem("intoPage",intoPage)
        
    },
    
   
    //得到获取数据前与将获取到的页面相邻的该页面的页码数
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
	    		 *  nowPage = sessionStorage.getItem("intoPage")；
	    		 * 如果interPage等于空，则是第一次进入，则nowPage= 1；
	    		 */
	    		
	    		if(!commonFu.isEmpty(sessionStorage.getItem("intoPage")))
	    		{
	    			nowPage = parseInt(sessionStorage.getItem("intoPage"));
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
    	if(!commonFu.isEmpty(sessionStorage.getItem("hasGetData")))
    	{   
    		dataArr = JSON.parse(sessionStorage.getItem("hasGetData"));
    		//清除缓存
    		sessionStorage.removeItem("hasGetData");
    		//把本地缓存转化成字符串
    		var dataArrStr = JSON.stringify(dataArr);
    		//把后台加载到的数据转换成字符串
    		var dataStr = JSON.stringify(data)
    		/*
    		 * 0:向本地缓存的后面拼接数据
    		 */
    		
    		if(judje == 0)
    	    {   
    	    	sessionStorage.removeItem("hasGetData");
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
    	    	sessionStorage.removeItem("hasGetData");
    	    	param = data;
    	    }
    	    sessionStorage.setItem("hasGetData",JSON.stringify(param));

    	}
 
    }
   

};

     //滚动事件的监控
    $(document).ready(function(){
    	var a=0,d=0;  
         
   		 $(window).scroll(function(e){  
   		 	
            a = $(this).scrollTop();  
            
            //当前窗口的高度
            var docHeight = $(window).height();
			//当前文档的高度 - 当前滚动条到窗口顶部的距离
			var nowHright = $(document).height() - document.body.scrollTop;
			
			//获取到本地缓存
			var dataArr = JSON.parse(sessionStorage.getItem("hasGetData"));
			
			var selfData = AuctionHistoryCtrl.auctionHistoryModel.auctionItems;
			
            if(d <= a)
            {   
            	/*  
				 *  当滚动条距离底部的距离 小于 22px时加载 
				 *  且当前价在到的最大页码数小于总页数
				 */
            	//下滚  获取下面的数据
			    if (nowHright - docHeight < 569)
			    {   
			    	/*
			    	 * 如果当前加载到的最大页码数小于总页数
			    	 */
			    	if((AuctionHistoryCtrl.page.currentPage < AuctionHistoryCtrl.page.totalPage) && (AuctionHistoryCtrl.auctionHistoryModel.auctionItems.length < AuctionHistoryCtrl.totalCount))
					{   
                       
            	        AuctionHistoryCtrl.initData(1);
					}
					else if((AuctionHistoryCtrl.page.currentPage == AuctionHistoryCtrl.page.totalPage) || (AuctionHistoryCtrl.auctionHistoryModel.auctionItems.length == AuctionHistoryCtrl.totalCount))
					{
						$('.acu-chrysanthemums').css("display","block");
						setTimeout(function(){
							$('.acu-chrysanthemums').css("display","none");

						},500);
						setTimeout(function(){
							$(".ac-no-more-data").css("display","block");

//							setTimeout(function(){
//								$(".ac-no-more-data").css("display","none");
//							},1800);
						},500)
					}
			    }
            }    
            else
            {   
                $(".ac-no-more-data").css("display","none");
                $('.acu-chrysanthemums').css("display","none");
            }  
            setTimeout(function(){d = a;},0);         
    	});  
	});  
    
  

