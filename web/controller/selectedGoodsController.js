/*
 * 
 * 精选
 * 
 */

app.controller("ctrl", function ($scope)
{  
	
	SelectCtrl.init($scope);
	
	

});

var SelectCtrl =
{   
    scope: null,
    
    isFinsh : false,
    
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
    
    init: function($scope) {
    	this.scope = $scope;
    	
    	this.judjeIsFirstCome();
    	
    	this.bindClick();
    	
    	this.getUrlAndId();
    	
    	this.initData(2);
    	
        this.ngRepeatFinish();
        
        initTab.start(this.scope, 0); //底部导航
    },
   
    getUrlAndId : function(){
    	var self = this;
    	
    	if(location.href.indexOf("&") !=-1)
		{   
			
			SelectCtrl.thisJumpPage =  location.href.split("&")[0].split("=")[1];
			SelectCtrl.thisJumpId = location.href.split("&")[1].split("=")[1];
			
			if(String(SelectCtrl.thisJumpPage).indexOf("#") != -1)
			{
			    SelectCtrl.thisJumpPage = parseInt(SelectCtrl.thisJumpPage.split("#")[0]);
			    	    	
			}
			else
			{
			    SelectCtrl.thisJumpPage = parseInt(SelectCtrl.thisJumpPage);
			}
			if(String(SelectCtrl.thisJumpId).indexOf("#") != -1)
			{
				SelectCtrl.thisJumpId = parseInt(SelectCtrl.thisJumpId.split("#")[0]);
			    
			}
			else
			{
				 SelectCtrl.thisJumpId = parseInt(SelectCtrl.thisJumpId);
			}
			
		}
    },
    
    initData: function(type) {
    	    var self = this;
    	    
            if(self.isFinsh){
            	
            	return;
            }
            self.isFinsh = true;
            
    		var params = {
		    	num : self.page.timeNum,
		    	type : 0
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
		    				params.startIndex = (enterPage - 1) * self.page.timeNum;
	                         
	                        
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
	    	
	    	console.log('params:' + JSON.stringify(params));
	    	    
	    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_AUCTION_ITEMS, params, function(data){
	    	
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
			    	    		self.selectedModel.auctionItems = JSON.parse(sessionStorage.getItem("alreadyGet")); 
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
			    		goods[i].goodsInfo.goodsPicsShow = JSON.parse(goods[i].goodsInfo.goods_pics)[0];
	                    
	                    goods[i].isShowPrice = !commonFu.isEmpty(goods[i].currentUserInfo); //是否已经有人出价
	                    
	                    
	                    goods[i].currentPrice = self.toDecimals(goods[i].currentPrice);
		    		}
	    		}
	    		else
	    		{
	    			$(".no-data").show();
	    		}

	    		self.scope.auctionItems = self.selectedModel.auctionItems;
	    		$('.animation').css("display","none");
	    		$('.container').css('opacity','1');
	            self.isFinsh = false;
	            self.scope.$apply();
	    		
	    	})

    },
  
  
//判断是否需要调用重登陆
    judjeIsFirstCome : function(){

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
					//如果token为空，则说明是一个没有登录过的人，第一次的直接地跳到了列表页，此时直接取列表页数据就好
					//alert("未登陆过，第一次跳到列表页")	
				}
		}
		else
		{  
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
    
    bindClick: function ()
    {
    	var self = this;
    	
    	
    	self.scope.onClickToGoodsDetail = function(item)
    	{   
            
    		    var id = item.id;
            	if(!commonFu.isEmpty(sessionStorage.getItem("reloginFail")))
            	{   //每次第一次进入都会判断有没有登录，没有登录且调重登陆失败，做一标记，标记存在，则说明未重登陆成功
            		if((parseInt(item.isVIP) == 1) && (commonFu.isEmpty(localStorage.getItem(localStorageKey.vipOrNot))))
	            	{  
	            		$("#fixed-shade").css("display","block");
			    		$("html,body").css("overflow","hidden");
			    		$('#fixed-shade').bind("touchmove",function(e){
			              	e.preventDefault();
						});
		    			return;
	            	}
	            	else
	            	{
	            		localStorage.setItem(localStorageKey.FROM_LOCATION,0);
				    	sessionStorage.setItem("selDisId","sel_"+id);
				    	self.getInterPage(id);
				    	var thisPage = sessionStorage.getItem("interPage");
				    	location.href = pageUrl.GOODS_DETAIL + "?id=" + id + "&thisPage=" + thisPage;
	            	}
            	}
            	else
            	{   
            		//调重登陆成功，或者未调重登陆，但在登录状态则：调用个人信息接口
            		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data) {
			    		localStorage.setItem(localStorageKey.vipOrNot,data.userInfo.isVIP)
			    		var isMySelfVip = data.userInfo.isVIP;
//			    		alert("isVIP"+isMySelfVip);
			    		if(((parseInt(item.isVIP) == 1) && (parseInt(isMySelfVip) == 0)))
		 				{
			 				$("#fixed-shade").css("display","block");
				    		$("html,body").css("overflow","hidden");
				    		$('#fixed-shade').bind("touchmove",function(e){
				              	e.preventDefault();
							});
			    			return;
		 				}
		 				else
		 				{
		 					localStorage.setItem(localStorageKey.FROM_LOCATION,0);
					    	sessionStorage.setItem("selDisId","sel_"+id);
					    	self.getInterPage(id);
					    	//alert($(document).height());//当前文档的高度
					    	//alert($(window).height());//当前窗口的高度
				    		//alert(document.body.scrollTop);//当前滚动条到窗口顶部的距离
					    	var thisPage = sessionStorage.getItem("interPage");
					    	location.href = pageUrl.GOODS_DETAIL + "?id=" + id + "&thisPage=" + thisPage;
		 				}
            		})
            	}
    
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
				self.getDisToTop(self.thisJumpId);
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
					self.getDisToTop(selId);
					setTimeout(function(){
						$('.animation').css("display","none");
						$('.container').css({'opacity':'1'});
					},200);
					
					sessionStorage.removeItem("selDisId");
				}
		    }
			
		});
    },
    
    
    //跳转到指定位置
    getDisToTop : function(id){
        var self = this;
        var id = id;
        
//          alert("wodeshijie"+sessionStorage.getItem("needPage"))
//          alert("jumpPage"+self.thisJumpPage)
        	if(!commonFu.isEmpty(self.thisJumpPage) && !commonFu.isEmpty(self.thisJumpId))
        	{  
        		
        		if(!commonFu.isEmpty(sessionStorage.getItem("needPage")))
		        { 
//		        	alert(self.selectedModel.auctionItems.length)
		        	var dealTop = $("#sel_"+ self.thisJumpId).offset().top;
		        	
				    sessionStorage.removeItem("needPage")
		        }
		        else
		        {   
//		        	alert(sessionStorage.getItem("needPage"))
		        	var dealTop = $("#sel_"+ self.selectedModel.auctionItems[0].id).offset().top;
		        }
				self.thisJumpPage = null;
				self.thisJumpId = null;
       		}	
	        else
	        {  
//	            alert("wwwwodeshijie"+sessionStorage.getItem("needPage"))
	            var dealTop = $("#" + id).offset().top;
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
     

    //保留两位小数
    toDecimals : function (x) {  
    	
        var f = parseFloat(x);    
        if (isNaN(f)) {    
            return false;    
        }    
        var f = Math.round(x*100)/100;    
        var s = f.toString();    
        var rs = s.indexOf('.');    
        if (rs < 0) {    
            rs = s.length;    
            s += '.';    
        }    
        while (s.length <= rs + 2) {    
            s += '0';    
        }    
        return s;    
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
   
 
    /*
     *跳转到指定的位置 
     */
    $.fn.scrollTo =function(options){
    	
        var defaults = {
            toT : 0, //滚动目标位置
            durTime : 30, //过渡动画时间
            delay : 15, //定时器时间
            callback:null //回调函数
        };
        var opts = $.extend(defaults,options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(),//滚动条当前的位置
            subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function(t){
                index++;
                var per = Math.round(subTop/dur);
                if(index >= dur){
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if(opts.callback && typeof opts.callback == 'function'){
                        opts.callback();
                    }
                    return;
                }else{
                    _this.scrollTop(curTop + index*per);
                }
            };
        timer = window.setInterval(function(){
            smoothScroll(opts.toT);			
        }, opts.delay);
        return _this;
    };
     
	