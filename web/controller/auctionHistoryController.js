/*
 * 拍卖历史
 */

      

		if (typeof localStorage === 'object') {
		    try {
				localStorage.setItem('localStorage', 1);
				localStorage.removeItem('localStorage');
			} catch (e) {
				Storage.prototype._setItem = Storage.prototype.setItem;
				Storage.prototype.setItem = function() {};
				$dialog.msg('为了正常访问，请关闭无痕模式');
			}
		}
        CanvasRenderingContext2D.prototype.sector = function(x,y,r,angle1,angle2){
				
		            this.save();
		            this.beginPath();
		            this.moveTo(x,y);
		            this.arc(x,y,r,angle1*Math.PI/180,angle2*Math.PI/180,false);
		            this.closePath();    
		            this.restore();
		            
		            return this;
		};

var AuctionHistoryCtrl =
{
    scope : null,
    
    isFinsh : false,
    
    thisJumpPage :null,
    
    thisJumpId : null,
    
    timer : null,
    
    timer2 : null,
    
    timeNumber : 0,
    
	wxParams : {},
   
    shareInfo : {},
    
    circle :{
        x:13,
        y:13,
        round:11
    },
    
    
    page : {
		currentPage : 1,
		totalPage : null,
		timeNum : 20,
	},
	
	totalCount : 0,//数据的总条数
	
    
    auctionHistoryModel : 
    {
    	TMHList : [],
    	id : null,
    	
    	
    },
    
    init : function ($scope,wxParams)
    {
       
    	this.scope = $scope; 
    	
    	this.wxParams = wxParams;
	
    	this.judjeIsLogin();
    	
    	this.getUrlAndId();
    	
    	$("#changing-number").css("display","none");
    	$("#changing-words").css("display","none");
    	$(".fix-clock").css("display","none");
    	$(".fix-round").css("display","none");
    	$('.container').css('opacity','0');
    	
    	this.initData(2);
    	
        this.ngRepeatFinish();
       
        initTab.start(this.scope, 2); //底部导航
        
        this.bindClick();
    	
    },
    
    getUrlAndId : function(){
    	
    	var self = this;
    	
//  	alert(location.href)
    	self.shareInfo.title = "雅玩之家精选店";
        self.shareInfo.img = "http://auction.yawan365.com/web/img/share-to-other.jpg";
        self.shareInfo.content = "明码标价，童叟无欺";
        
        commonFu.setShareTimeLine(self.wxParams,self.shareInfo,location.href);
//  	
//  	alert(location.href.split("?")[1].split("=")[0])
        if(location.href.indexOf("?") > 0){
        	
        	if(location.href.split("?")[1].split("=")[0] == 'from')
        	{
        		
        	}
        	else{
        		 var juid = commonFu.getQueryStringByKey("thisDataId").substring(0,1)
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
        	
//  	    
//  	    alert(self.thisJumpPage)
        }
//  	alert(self.thisJumpId)
//  	alert(self.thisJumpPage)
//  	var arr = [];
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
    
    initData : function(type){
    	
    	var self = this;
       
        if(self.isFinsh){
            	
            return;
        }
        self.isFinsh = true;
  
    	var params = 
    	{
    		num : self.page.timeNum,
    	
    	};
    		
    	if(commonFu.isEmpty(sessionStorage.getItem("hasGetData")))
	    {   
	    	
	    	if((!commonFu.isEmpty(self.thisJumpPage) && !commonFu.isEmpty(self.thisJumpId)))
	    	{
	    			params.startIndex = 0
	    			 
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
	    	var dataArr = JSON.parse(sessionStorage.getItem("hasGetData"));
	    	var selfData = self.auctionHistoryModel.TMHList;
	    		
	    	if(type == 1){
	    		
	    	    $('.acu-chrysanthemums').css("display","block");
		    	/*
		    	 * 如果是取下一页，则满足触发事件的条件（即，只要滚轮距离底部的距离小于10px时）
		    	 * 此时的startIndex就是nowPage * self.page.timeNum
		    	 */
		    	
				var atPage_2 = self.getNowPage(dataArr,selfData,1);
                //此时的startIndex就是当前页乘以每一页拉取的数据条数
                params.startIndex = atPage_2 * self.page.timeNum;
	    	}
	    	else if(type == 2)
	    	{   
	    		/*
	    		 * 1,如果是详情页点击tab栏回到列表页的话，startIndexcurrPage就是
	    		 *   存储在本地储存的interPage;
	    		 * 2,如果是在列表页点击tab栏的话，则重置页面数据，并且清空本地存储的储存数据
	    		 *   请求数据的startIndex就是0
	    		 */
	    			
	    		if(!commonFu.isEmpty(sessionStorage.getItem("intoPage")))
	    		{ 
	    			var enterPage = parseInt(sessionStorage.getItem("intoPage"));
	    			//返回列表页且获取该页数据，即是用点击前存储的页数减 1
	 //   			params.startIndex = (enterPage - 1) * self.page.timeNum;
                    
                    
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
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SPECIAL_SALE_LIST, params, function(data){
//  	    console.log(JSON.stringify(data))
    		//在回调里拿到总数据条数，给全局变量
	    	self.totalCount = data.count;
	    	//设置总页数
	    	self.setTotalPage(self.totalCount);
    		
    		if(commonFu.isEmpty(sessionStorage.getItem("hasGetData")))
	    	{  
	    		if(!commonFu.isEmpty(self.thisJumpPage) && !commonFu.isEmpty(self.thisJumpId))
	    		{   
		    		self.auctionHistoryModel.TMHList = [];
			    	self.auctionHistoryModel.TMHList = data.TMHList;
			    	sessionStorage.removeItem("hasGetData");
			    	sessionStorage.setItem("hasGetData",JSON.stringify(data.TMHList));
			    	
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
		    		self.auctionHistoryModel.TMHList = [];
	                self.auctionHistoryModel.TMHList = data.TMHList;
	
	                sessionStorage.removeItem("hasGetData");
	                sessionStorage.setItem("hasGetData",JSON.stringify(data.TMHList));
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

		    	    var dataNxt = data.TMHList;

		    	    for(var s = 0;s < self.auctionHistoryModel.TMHList.length;s++)
		    	    {   
		    	    	if(!commonFu.isEmpty(self.auctionHistoryModel.TMHList[s].info.commodity_cover))
	                    {
	                    	
	                    	self.auctionHistoryModel.TMHList[s].pictures = self.auctionHistoryModel.TMHList[s].info.commodity_cover;
	                    	
	                    }
		    	    	
		    	    }

		    	    self.auctionHistoryModel.TMHList = self.auctionHistoryModel.TMHList.concat(dataNxt);

		    	    /*
		    	     * 把请求到的数据同步到本地缓存里，
		    	     */
		    	    //向本地存储后面追加数据
		     	    self.alreadyGetData(dataNxt,0);
		    	    //获取缓存里的数据
		    	    var theSessionData_2 = JSON.parse(sessionStorage.getItem("hasGetData"));
		    	    //请求完数据后获取当前数据模型
		    	    var theSelfData_2 = self.auctionHistoryModel.TMHList;
		    	    //获取加载到的最大页
		    	    self.page.currentPage = self.getNowDataPage(theSessionData_2,theSelfData_2);
                    $('.acu-chrysanthemums').css("display","none");
//                  self.initClock();
		        }
		    	else if(type == 2)
		    	{  
		    	    /*
		    	     * 如果是在详情页点击tab栏，则清空本地数据模型，再把请求来的数据赋值给当前数据模型；
		    	     * 如果是在列表页点击tab栏，则重置页面，只取第一页数据，
		    	     */
		    	    if(!commonFu.isEmpty(sessionStorage.getItem("intoPage")))
		    	    {   
    	    		        
		    	    	self.auctionHistoryModel.TMHList = [];
		    	    
		    	    
		    	    
		    	        self.auctionHistoryModel.TMHList = data.TMHList;
                        sessionStorage.setItem("hasGetData",JSON.stringify(data.TMHList));
		    	    	
		    	    	
		    	    	
//		    	    	self.auctionHistoryModel.TMHList = JSON.parse(sessionStorage.getItem("hasGetData"));
		    	    	self.page.currentPage = Math.ceil(JSON.parse(sessionStorage.getItem("hasGetData")).length/self.page.timeNum)
		    	    	//self.page.currentPage = parseInt(sessionStorage.getItem("intoPage"));
		    	    	//把本地存储的点击进入的那个interPage置空    	    		
		    	
		    	    	sessionStorage.removeItem("intoPage");
		    	    	
		    	    }
		    	    else
		    	    {   
		    	    	/*
		    	    	 * 如果是在列表页点击tab栏，则只取第一页数据
		    	    	 * 并且重置页面页数等
		    	    	 */
		    	    	
		    	    	self.auctionHistoryModel.TMHList = [];
		    	    	self.auctionHistoryModel.TMHList = data.TMHList;
		    	    	self.alreadyGetData(data.TMHList,1);
		    	    	//获取加载到的最大页
		    	    	self.page.currentPage = 1;
		    	    }
		    	}
	            else
	            {
	            }
    		}
    		
    		if (self.auctionHistoryModel.TMHList.length > 0)
    		{
    			$(".no-data").css('display','none');
    			var goods = self.auctionHistoryModel.TMHList;
                
	    		for (var i = 0;i < goods.length; i++)
	    		{    
	    			
                    if(!commonFu.isEmpty(goods[i].info.commodity_pic))
                    {
                    	goods[i].pictures = goods[i].info.commodity_cover;
                    
                    }
		    		
		    		if (!commonFu.isEmpty(goods[i].info.commodity_price))
		    		{
		    			
		    			goods[i].commodity_price = commonFu.toDecimals(parseFloat(goods[i].info.commodity_price));
		    			
		    		}
		    		
	    		}
    		}
    		else
    		{
    			$(".no-data").css('display','block');
    		}

            for(var a = 0; a < self.auctionHistoryModel.TMHList.length; a ++)
            {   
            	if(self.auctionHistoryModel.TMHList[a].info.stock_num != 0)
            	{  
            		self.auctionHistoryModel.TMHList[a].info.viewPrice = (Math.floor(10000 * self.auctionHistoryModel.TMHList[a].info.commodity_price *(1 +  ((commonFu.getTimeStamp()- self.auctionHistoryModel.TMHList[a].add_time)/60) * (self.auctionHistoryModel.TMHList[a].info.annualized_return*0.01/(commonFu.isSmoothYear()*1440)))))/10000;
                    
                    self.auctionHistoryModel.TMHList[a].info.viewPrice = self.auctionHistoryModel.TMHList[a].info.viewPrice.toFixed(4);
            	}
            	else
            	{    
            		
            		self.auctionHistoryModel.TMHList[a].info.viewPrice = (Math.floor(10000 * self.auctionHistoryModel.TMHList[a].info.commodity_price *(1 +  ((self.auctionHistoryModel.TMHList[a].info.sold_time - self.auctionHistoryModel.TMHList[a].add_time)/60) * (self.auctionHistoryModel.TMHList[a].info.annualized_return*0.01/(commonFu.isSmoothYear()*1440)))))/10000;
                   
                    self.auctionHistoryModel.TMHList[a].info.viewPrice = self.auctionHistoryModel.TMHList[a].info.viewPrice.toFixed(4);
//          	    if(self.auctionHistoryModel.TMHList[a].info.commodity_id == 94)
//          	    {
//          	    	alert("pric" + self.auctionHistoryModel.TMHList[a].info.viewPrice)
//          	    	alert("sold_time" + self.auctionHistoryModel.TMHList[a].info.sold_time)
//          	    	alert("pric" + self.auctionHistoryModel.TMHList[a].info.viewPrice)
//          	    }
            	}
//          	 console.log(self.auctionHistoryModel.TMHList[a].info.viewPrice);
            }
            
            /*
             * 切割数据
             */
          
            for(var f = 0; f < self.auctionHistoryModel.TMHList.length; f++){
		    
		    	self.auctionHistoryModel.TMHList[f].newName = ""+ self.auctionHistoryModel.TMHList[f].id;
		    }
            
    		self.scope.auctionHistoryModel = self.auctionHistoryModel;
    		
    		$('.animation').css('display','none');
    		$('.container').css('opacity','1');
            self.isFinsh = false;
            
    		self.scope.$apply();
    		$(".fix-round").css("display","flex");
    		$(".fix-clock").css("display","block");
    	    $("#changing-number").css("display","inline-block");
    	    $("#changing-words").css("display","inline-block");
//  	    self.initClock();
    	
    		self.setNewPrice();
    	    
    	   	 for (var p =0; p < self.auctionHistoryModel.TMHList.length; p ++)
		     {
		   	        
		   	        
		   	    
		   	         if(self.auctionHistoryModel.TMHList[p].info.viewPrice.length == 13)
		   	        {
//		   	        	self.auctionHistoryModel.TMHList[p].info.viewPrice = self.auctionHistoryModel.TMHList[p].info.viewPrice.substring(self.auctionHistoryModel.TMHList[p].info.viewPrice.length - 9,self.auctionHistoryModel.TMHList[p].info.viewPrice.length);
//				   	        var $wk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-k"); // Ê®Íò
//							var $qk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-k"); // Íò
				   	        var $hk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-k"); // Ê®Íò
							var $tk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-k"); // Íò
							var $k = $("." + self.auctionHistoryModel.TMHList[p].newName + " .k"); // Ç§
							var $h = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h"); // °Ù
							var $t = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t"); // Ê®
							var $single = $("." + self.auctionHistoryModel.TMHList[p].newName + " .single"); // ¸ö
							var $td = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-d"); // Ê®·ÖÎ»
							var $hd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-d"); // °Ù·ÖÎ»
							var $qd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-d"); // Ê®·ÖÎ»
							var $wd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-d"); // °Ù·ÖÎ»
		//					var $comma = $("." + self.auctionHistoryModel.TMHList[p].newName + " .comma.sign");
							var $dot = $("." + self.auctionHistoryModel.TMHList[p].newName + " .dot.sign");
		//					var $bigMap = $("." + self.auctionHistoryModel.TMHList[p].newName + " .big-map");
							
							var data = {
							  numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
							  targetClass: {
//							  	"wk":$wk,
//							  	"qk":$qk,
							    "hk": $hk,
							    "tk": $tk,
							    "k": $k,
							    "h": $h,
							    "t": $t,
							    "single": $single,
							    "td": $td,
							    "hd": $hd,
							    "qd":$qd,
							    "wd":$wd
							  },
							  zero: {
//							  	wk:0,
//							  	qk:0,
							    hk: 0,
							    tk: 0,
							    k: 0,
							    h: 0,
							    t: 0,
							    single: 0,
							    td: 0,
							    hd: 0,
							    qd:0,
							    wd:0
							  },
							  numbersTmp: ""
						};
		   	        }
		   	        
		   	         if(self.auctionHistoryModel.TMHList[p].info.viewPrice.length == 12)
		   	        {
//		   	        	self.auctionHistoryModel.TMHList[p].info.viewPrice = self.auctionHistoryModel.TMHList[p].info.viewPrice.substring(self.auctionHistoryModel.TMHList[p].info.viewPrice.length - 9,self.auctionHistoryModel.TMHList[p].info.viewPrice.length);
//				   	        var $wk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-k").css("display","none");; // Ê®Íò
//							var $qk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-k"); // Íò
				   	        var $hk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-k"); // Ê®Íò
							var $tk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-k"); // Íò
							var $k = $("." + self.auctionHistoryModel.TMHList[p].newName + " .k"); // Ç§
							var $h = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h"); // °Ù
							var $t = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t"); // Ê®
							var $single = $("." + self.auctionHistoryModel.TMHList[p].newName + " .single"); // ¸ö
							var $td = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-d"); // Ê®·ÖÎ»
							var $hd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-d"); // °Ù·ÖÎ»
							var $qd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-d"); // Ê®·ÖÎ»
							var $wd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-d"); // °Ù·ÖÎ»
		//					var $comma = $("." + self.auctionHistoryModel.TMHList[p].newName + " .comma.sign");
							var $dot = $("." + self.auctionHistoryModel.TMHList[p].newName + " .dot.sign");
		//					var $bigMap = $("." + self.auctionHistoryModel.TMHList[p].newName + " .big-map");
							
							var data = {
							  numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
							  targetClass: {
//							  	"wk":$wk,
//							  	"qk":$qk,
							    "hk": $hk,
							    "tk": $tk,
							    "k": $k,
							    "h": $h,
							    "t": $t,
							    "single": $single,
							    "td": $td,
							    "hd": $hd,
							    "qd":$qd,
							    "wd":$wd
							  },
							  zero: {
//							  	wk:0,
//							  	qk:0,
							    hk: 0,
							    tk: 0,
							    k: 0,
							    h: 0,
							    t: 0,
							    single: 0,
							    td: 0,
							    hd: 0,
							    qd:0,
							    wd:0
							  },
							  numbersTmp: ""
						};
		   	        }
		   	        if(self.auctionHistoryModel.TMHList[p].info.viewPrice.length == 11)
		   	        {
//		   	        	self.auctionHistoryModel.TMHList[p].info.viewPrice = self.auctionHistoryModel.TMHList[p].info.viewPrice.substring(self.auctionHistoryModel.TMHList[p].info.viewPrice.length - 9,self.auctionHistoryModel.TMHList[p].info.viewPrice.length);
//				   	        var $wk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-k").css("display","none");; // Ê®Íò
//							var $qk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-k").css("display","none");; // Íò
				   	        var $hk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-k"); // Ê®Íò
							var $tk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-k"); // Íò
							var $k = $("." + self.auctionHistoryModel.TMHList[p].newName + " .k"); // Ç§
							var $h = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h"); // °Ù
							var $t = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t"); // Ê®
							var $single = $("." + self.auctionHistoryModel.TMHList[p].newName + " .single"); // ¸ö
							var $td = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-d"); // Ê®·ÖÎ»
							var $hd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-d"); // °Ù·ÖÎ»
							var $qd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-d"); // Ê®·ÖÎ»
							var $wd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-d"); // °Ù·ÖÎ»
		//					var $comma = $("." + self.auctionHistoryModel.TMHList[p].newName + " .comma.sign");
							var $dot = $("." + self.auctionHistoryModel.TMHList[p].newName + " .dot.sign");
		//					var $bigMap = $("." + self.auctionHistoryModel.TMHList[p].newName + " .big-map");
							
							var data = {
							  numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
							  targetClass: {
//							  	"wk":$wk,
//							  	"qk":$qk,
							    "hk": $hk,
							    "tk": $tk,
							    "k": $k,
							    "h": $h,
							    "t": $t,
							    "single": $single,
							    "td": $td,
							    "hd": $hd,
							    "qd":$qd,
							    "wd":$wd
							  },
							  zero: {
//							  	wk:0,
//							  	qk:0,
							    hk: 0,
							    tk: 0,
							    k: 0,
							    h: 0,
							    t: 0,
							    single: 0,
							    td: 0,
							    hd: 0,
							    qd:0,
							    wd:0
							  },
							  numbersTmp: ""
						};
		   	        }
		   	        else if (self.auctionHistoryModel.TMHList[p].info.viewPrice.length == 10)
		   	        {
//		   	        	var $wk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-k").css("display","none");; // Ê®Íò
//						var $qk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-k").css("display","none");; // Íò
		   	        	var $hk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-k").css("display","none"); // Ê®Íò
						var $tk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-k"); // Íò
						var $k = $("." + self.auctionHistoryModel.TMHList[p].newName + " .k"); // Ç§
						var $h = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h"); // °Ù
						var $t = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t"); // Ê®
						var $single = $("." + self.auctionHistoryModel.TMHList[p].newName + " .single"); // ¸ö
						var $td = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-d"); // Ê®·ÖÎ»
						var $hd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-d"); // °Ù·ÖÎ»
						var $qd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-d"); // Ê®·ÖÎ»
						var $wd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-d"); // °Ù·ÖÎ»
	//					var $comma = $("." + self.auctionHistoryModel.TMHList[p].newName + " .comma.sign");
						var $dot = $("." + self.auctionHistoryModel.TMHList[p].newName + " .dot.sign");
	//					var $bigMap = $("." + self.auctionHistoryModel.TMHList[p].newName + " .big-map");
						
					   var data = {
							  numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
							  targetClass: {
//							  	"wk":$wk,
//							  	"qk":$qk,
							    "hk": $hk,
							    "tk": $tk,
							    "k": $k,
							    "h": $h,
							    "t": $t,
							    "single": $single,
							    "td": $td,
							    "hd": $hd,
							    "qd":$qd,
							    "wd":$wd
							  },
							  zero: {
//							  	wk:0,
//							  	qk:0,
							    hk: 0,
							    tk: 0,
							    k: 0,
							    h: 0,
							    t: 0,
							    single: 0,
							    td: 0,
							    hd: 0,
							    qd:0,
							    wd:0
							  },
							  numbersTmp: ""
						};
		   	        }
		   	        else if(self.auctionHistoryModel.TMHList[p].info.viewPrice.length == 9)
		   	        {
//		   	        	var $wk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-k").css("display","none");; // Ê®Íò
//						var $qk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-k").css("display","none");; // Íò
		   	        	var $hk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-k").css("display","none"); // Ê®Íò
						var $tk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-k").css("display","none"); // Íò
						var $k = $("." + self.auctionHistoryModel.TMHList[p].newName + " .k"); // Ç§
						var $h = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h"); // °Ù
						var $t = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t"); // Ê®
						var $single = $("." + self.auctionHistoryModel.TMHList[p].newName + " .single"); // ¸ö
						var $td = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-d"); // Ê®·ÖÎ»
						var $hd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-d"); // °Ù·ÖÎ»
						var $qd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-d"); // Ê®·ÖÎ»
						var $wd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-d"); // °Ù·ÖÎ»
	//					var $comma = $("." + self.auctionHistoryModel.TMHList[p].newName + " .comma.sign");
						var $dot = $("." + self.auctionHistoryModel.TMHList[p].newName + " .dot.sign");
	//					var $bigMap = $("." + self.auctionHistoryModel.TMHList[p].newName + " .big-map");
						
						var data = {
							  numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
							  targetClass: {
//							  	"wk":$wk,
//							  	"qk":$qk,
							    "hk": $hk,
							    "tk": $tk,
							    "k": $k,
							    "h": $h,
							    "t": $t,
							    "single": $single,
							    "td": $td,
							    "hd": $hd,
							    "qd":$qd,
							    "wd":$wd
							  },
							  zero: {
//							  	wk:0,
//							  	qk:0,
							    hk: 0,
							    tk: 0,
							    k: 0,
							    h: 0,
							    t: 0,
							    single: 0,
							    td: 0,
							    hd: 0,
							    qd:0,
							    wd:0
							  },
							  numbersTmp: ""
						};
		   	        }
		   	        else if(self.auctionHistoryModel.TMHList[p].info.viewPrice.length == 8)
		   	        {
//		   	        	var $wk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-k").css("display","none");; // Ê®Íò
//						var $qk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-k").css("display","none");; // Íò
		   	        	var $hk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-k").css("display","none"); // Ê®Íò
						var $tk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-k").css("display","none"); // Íò
						var $k = $("." + self.auctionHistoryModel.TMHList[p].newName + " .k").css("display","none"); // Ç§
						var $h = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h"); // °Ù
						var $t = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t"); // Ê®
						var $single = $("." + self.auctionHistoryModel.TMHList[p].newName + " .single"); // ¸ö
						var $td = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-d"); // Ê®·ÖÎ»
						var $hd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-d"); // °Ù·ÖÎ»
						var $qd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-d"); // Ê®·ÖÎ»
						var $wd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-d"); // °Ù·ÖÎ»
	//					var $comma = $("." + self.auctionHistoryModel.TMHList[p].newName + " .comma.sign");
						var $dot = $("." + self.auctionHistoryModel.TMHList[p].newName + " .dot.sign");
	//					var $bigMap = $("." + self.auctionHistoryModel.TMHList[p].newName + " .big-map");
						
						var data = {
							  numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
							  targetClass: {
//							  	"wk":$wk,
//							  	"qk":$qk,
							    "hk": $hk,
							    "tk": $tk,
							    "k": $k,
							    "h": $h,
							    "t": $t,
							    "single": $single,
							    "td": $td,
							    "hd": $hd,
							    "qd":$qd,
							    "wd":$wd
							  },
							  zero: {
//							  	wk:0,
//							  	qk:0,
							    hk: 0,
							    tk: 0,
							    k: 0,
							    h: 0,
							    t: 0,
							    single: 0,
							    td: 0,
							    hd: 0,
							    qd:0,
							    wd:0
							  },
							  numbersTmp: ""
						};
		   	        }
		   	        else if(self.auctionHistoryModel.TMHList[p].info.viewPrice.length == 7)
		   	        {
//		   	        	var $wk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-k").css("display","none");; // Ê®Íò
//						var $qk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-k").css("display","none");; // Íò
		   	        	var $hk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-k").css("display","none"); // Ê®Íò
						var $tk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-k").css("display","none"); // Íò
						var $k = $("." + self.auctionHistoryModel.TMHList[p].newName + " .k").css("display","none"); // Ç§
						var $h = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h").css("display","none"); // °Ù
						var $t = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t"); // Ê®
						var $single = $("." + self.auctionHistoryModel.TMHList[p].newName + " .single"); // ¸ö
						var $td = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-d"); // Ê®·ÖÎ»
						var $hd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-d"); // °Ù·ÖÎ»
						var $qd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-d"); // Ê®·ÖÎ»
						var $wd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-d"); // °Ù·ÖÎ»
	//					var $comma = $("." + self.auctionHistoryModel.TMHList[p].newName + " .comma.sign");
						var $dot = $("." + self.auctionHistoryModel.TMHList[p].newName + " .dot.sign");
	//					var $bigMap = $("." + self.auctionHistoryModel.TMHList[p].newName + " .big-map");
						
						var data = {
							  numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
							  targetClass: {
//							  	"wk":$wk,
//							  	"qk":$qk,
							    "hk": $hk,
							    "tk": $tk,
							    "k": $k,
							    "h": $h,
							    "t": $t,
							    "single": $single,
							    "td": $td,
							    "hd": $hd,
							    "qd":$qd,
							    "wd":$wd
							  },
							  zero: {
//							  	wk:0,
//							  	qk:0,
							    hk: 0,
							    tk: 0,
							    k: 0,
							    h: 0,
							    t: 0,
							    single: 0,
							    td: 0,
							    hd: 0,
							    qd:0,
							    wd:0
							  },
							  numbersTmp: ""
						};
		   	        }
		   	        else if(self.auctionHistoryModel.TMHList[p].info.viewPrice.length == 6)
		   	        {
//		   	        	var $wk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-k").css("display","none");; // Ê®Íò
//						var $qk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-k").css("display","none");; // Íò
		   	        	var $hk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-k").css("display","none"); // Ê®Íò
						var $tk = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-k").css("display","none"); // Íò
						var $k = $("." + self.auctionHistoryModel.TMHList[p].newName + " .k").css("display","none"); // Ç§
						var $h = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h").css("display","none"); // °Ù
						var $t = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t").css("display","none"); // Ê®
						var $single = $("." + self.auctionHistoryModel.TMHList[p].newName + " .single"); // ¸ö
						var $td = $("." + self.auctionHistoryModel.TMHList[p].newName + " .t-d"); // Ê®·ÖÎ»
						var $hd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .h-d"); // °Ù·ÖÎ»
						var $qd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .q-d"); // Ê®·ÖÎ»
						var $wd = $("." + self.auctionHistoryModel.TMHList[p].newName + " .w-d"); // °Ù·ÖÎ»
	//					var $comma = $("." + self.auctionHistoryModel.TMHList[p].newName + " .comma.sign");
						var $dot = $("." + self.auctionHistoryModel.TMHList[p].newName + " .dot.sign");
	//					var $bigMap = $("." + self.auctionHistoryModel.TMHList[p].newName + " .big-map");
						
						var data = {
							  numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
							  targetClass: {
//							  	"wk":$wk,
//							  	"qk":$qk,
							    "hk": $hk,
							    "tk": $tk,
							    "k": $k,
							    "h": $h,
							    "t": $t,
							    "single": $single,
							    "td": $td,
							    "hd": $hd,
							    "qd":$qd,
							    "wd":$wd
							  },
							  zero: {
//							  	wk:0,
//							  	qk:0,
							    hk: 0,
							    tk: 0,
							    k: 0,
							    h: 0,
							    t: 0,
							    single: 0,
							    td: 0,
							    hd: 0,
							    qd:0,
							    wd:0
							  },
							  numbersTmp: ""
						};
		   	        }
		   	       
				  for(var k = 0; k < 10; k ++) {
				    data.numbersTmp += "<div class='" + data.numbers[k] + "'>" + k + "</div>";
				  };
//                $(".flip").eq(p).empty();
//                var html = '';
//                html += '<div class="price-div">';
//                html += '<div class="w-k number"></div>';
//                html += '<div class="q-k number"></div>';
//                html += '<div class="h-k number"></div>';
//                html += '<div class="t-k number"></div>';
//                html += '<div class="k number"></div>';
//                html += '<div class="h number"></div>';
//                html += '<div class="t number"></div>';
//                html += '<div class="single number"></div>';
//                html += '<div class="sign dot">.</div>';
//                html += '<div class="t-d number" style="width:8px;-webkit-transform: scaleX(0.8);font-size:12px"></div>';
//                html += '<div class="h-d number" style="width:8px;-webkit-transform: scaleX(0.8);font-size:12px;"></div>';
//                html += '<div class="q-d number" style="width:8px;-webkit-transform: scaleX(0.8);font-size:12px"></div>';
//                html += '<div class="w-d number" style="width:8px;-webkit-transform: scaleX(0.8);font-size:12px"></div>';
//                html += '</div>';
//                $(".flip").eq(1).html(html);
//				  console.log($(".flip").eq(1))		        
                  $("." + self.auctionHistoryModel.TMHList[p].newName + " .price-div .number").empty();
				  $("." + self.auctionHistoryModel.TMHList[p].newName + " .price-div .number").append("<div class='numbers-view'>" + data.numbersTmp + "</div>");
		          
				  self.auctionHistoryModel.TMHList[p]["data"] = data;
	
//				display: inline-flex; display: -webkit-inline-flex; flex-direction:  row; justify-content:flex-end;align-items: flex-end ;
		    }
    	   	 
    	   
    	   	for(var c = 0; c < self.auctionHistoryModel.TMHList.length; c++)
            {   
//          	      console.log(self.auctionHistoryModel.TMHList[c].info.viewPrice)
            		var priceStr = parseFloat(self.auctionHistoryModel.TMHList[c].info.viewPrice) ;
            		priceStr = parseFloat(priceStr.toFixed(4));
//          	    $(".numbers-view").stop(true, true);
	 		    	$.animateToPrice2(priceStr, c,self.auctionHistoryModel.TMHList);
            	
            }
    	
           
    	})
    },
    
    
    setNewPrice : function(){
    	
    	var self = this;
    	var dataCopy = [];
	    dataCopy  =	deepCopy(self.auctionHistoryModel.TMHList); 
	     
	    clearInterval(self.timer);
	    self.timer =setInterval(function(){
	           
	           
	    		for(var j = 0; j < self.auctionHistoryModel.TMHList.length; j ++)
		    	{   
		    		if(self.auctionHistoryModel.TMHList[j].info.stock_num != 0)
	            	{
	            		self.auctionHistoryModel.TMHList[j].info.viewPrice = (Math.floor(10000 * self.auctionHistoryModel.TMHList[j].info.commodity_price *(1 +  ((commonFu.getTimeStamp()- self.auctionHistoryModel.TMHList[j].add_time)/60) * (self.auctionHistoryModel.TMHList[j].info.annualized_return*0.01/(commonFu.isSmoothYear()*1440)))))/10000;
		    			
		    			self.auctionHistoryModel.TMHList[j].info.viewPrice = self.auctionHistoryModel.TMHList[j].info.viewPrice.toFixed(4);
		    	    
	            	}
	            	
		    	}

		    	for(var s =0; s < dataCopy.length; s ++)
		    	{   
		    		
		    		if((self.auctionHistoryModel.TMHList[s].id == dataCopy[s].id) && (self.auctionHistoryModel.TMHList[s].info.viewPrice != dataCopy[s].info.viewPrice))
		    		{
                        
                             
                             if(self.auctionHistoryModel.TMHList[s].info.stock_num != 0)
                             { 
                             	 if(self.auctionHistoryModel.TMHList[s].info.viewPrice.length  != dataCopy[s].info.viewPrice.length)
		                         {  
	
		                         	self.initData(2);
		                         }
		                         else
		                         {
		                         	self.auctionHistoryModel.TMHList[s].info.viewPrice = parseFloat(self.auctionHistoryModel.TMHList[s].info.viewPrice).toFixed(4);
	                            
	                                $.animateToPrice(self.auctionHistoryModel.TMHList[s].info.viewPrice, s,self.auctionHistoryModel.TMHList);
		                         }
                             	
                             }
//                          console.log(self.auctionHistoryModel.TMHList[s].info.viewPrice)
					}
          	           
		    		
		    	}
	    		
	    	    dataCopy = [];
	    	    dataCopy  =	deepCopy(self.auctionHistoryModel.TMHList);
	    	    
		    	self.scope.auctionHistoryModel = self.auctionHistoryModel;
		    	self.scope.$apply();
	    	    
	    },3000);
	  
    },
    
    
//  initClock : function(){
//  	 
//  	clearInterval(self.timer2);
//  	
//  	var numberDiv = $("#changing-number");
//  	 
//  	var num = 10;
//  	numberDiv.html(num);
//  	self.timer2 =  setInterval(function(){
//  		num -- ;
//  		if(num == 0)
//  		{
//  			num = 10;
//  		}
//  		numberDiv.html(num);
//  	},1000)
//  	 
//  
//  },
 
      //设置总页数
    setTotalPage : function(count)
	{   
		var self = this;
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
    		if(local[o].commodity_id == selected[selected.length - 1].commodity_id)
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
    	for(var n = 0; n < self.auctionHistoryModel.TMHList.length; n++)
    	{   
	   
    		if(self.auctionHistoryModel.TMHList[n].commodity_id == id)
    		{   
    			judje = true;
    		}
    	}
        return judje;
       
    },
   
    
    //跳转到指定位置
     
    getDisToTop : function(id){
  		var self = this;
        var commodity_id = id;
        $('.animation').css('display','block');
    	$('.container').css('opacity','0');
        if(!commonFu.isEmpty(self.thisJumpPage) && !commonFu.isEmpty(self.thisJumpId))
        {  
        	
        
        	if(!commonFu.isEmpty(sessionStorage.getItem("needPageId")))
		    {
		       
		        var dealTop = null;
		        if(self.judgeExist(self.thisJumpId))
		        {    
		        	dealTop = $("#test_"+ self.thisJumpId).offset().top;
		        }
		        else
		        {
		        	dealTop = $("#test_"+ self.auctionHistoryModel.TMHList[0].commodity_id).offset().top ;
		        }
		       
				sessionStorage.removeItem("needPageId")
		    }
		    else
		    {   
		        	
		        var dealTop = $("#test_"+ self.auctionHistoryModel.TMHList[0].commodity_id).offset().top;
		    }
        	self.thisJumpPage = null;
		    self.thisJumpId = null;
        }
        else
        {   

        	var dealTop = null;
        	var idStr = commodity_id.split('_')[1];

        	if(self.judgeExist(idStr))
		    {   
		    	
		        dealTop = $("#"+ commodity_id).offset().top;
		    }
		    else
		    {
		        dealTop = $("#test_"+ self.auctionHistoryModel.TMHList[0].commodity_id).offset().top ;
		    }
		
        }
      	
      	$("html,body").scrollTo({toT:dealTop});
        $('.animation').css('display','none');
    	$('.container').css('opacity','1');
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
    			   
	    			if(JSON.stringify(data)  == 'true'){
	    				
        				location.href = pageUrl.PERSON_CENTER;
        				
	    			}
	    			else{
	    				
			       		localStorage.setItem(localStorageKey.DEFAULT, pageUrl.PERSON_CENTER);
		        		location.href = pageUrl.LOGIN_PAGE;
		        		
	    			}
    		
    		    });

            }
    		
    	};
    	
    	self.scope.acOkToShut = function(){
    		
    		$("#acfixed-shade").css("display","none");
    		$("html,body").css("overflow","auto");
    	};
    	
    	
    	self.scope.onClickToAuctionHistoryDetail = function(item)
    	{   
    		

    		var id = item.commodity_id;
    	    localStorage.setItem("comeWithGuess",2);
    	    localStorage.setItem("messlistOrauction",0)
    		

		    			sessionStorage.setItem("aucDisId","test_"+id);
		    			self.getInterPage(id);
		    			var thisAcPage = sessionStorage.getItem("intoPage");
		    			var stampTime = null;
		    			if(item.info.stock_num != 0)
		    			{
		    				stampTime = commonFu.getTimeStamp();
		    			}
		    			else{
		    				stampTime = item.info.sold_time;
		    			}
    	
		    			localStorage.setItem("stampTime",stampTime);
		    			
		    			sessionStorage.setItem("stampTime",stampTime);

//		    			viewPrice = (Math.floor(100 * item.info.commodity_price *(1 +  ((stampTime- item.add_time)/60) * (item.info.annualized_return*0.01/(commonFu.isSmoothYear()*1440)))))/100;
//		    			viewPrice = commonFu.toDecimals(viewPrice);
		    			
		    			var obj = new Base64();
						 	
						var id_base64 = obj.encode(id);
							    	
						var thisPage_base64 = obj.encode(thisAcPage);
							    	
						var str = pageUrl.AUCTION_HISTORY_INFO + "?id=" + id_base64  + "&thisAcPage=" + thisPage_base64;
						    
						location.href = encodeURI(str);
//		    			
//		    			location.href = pageUrl.AUCTION_HISTORY_INFO + "?id=" + id  + "&thisAcPage=" + thisAcPage;
//					

    	};
    },
   
     
    //设置当前点击的id所在的页面数
    getInterPage : function(id){
    	
    	var self = this;
    	var intoPage = null;
    	var alrGetData = JSON.parse(sessionStorage.getItem("hasGetData"));
    	for(var i = 0;i < alrGetData.length; i++)
    	{   
    		if(alrGetData[i].commodity_id == id)
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
    		    	if(selfData[selfData.length -1].commodity_id == sessionData[n].commodity_id)
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
    	    		if((dataArr[h].commodity_id == data[0].commodity_id) || (dataArr[h].commodity_id == data[data.length - 1].commodity_id))
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
 
    },
    
    
    
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
			
			var selfData = AuctionHistoryCtrl.auctionHistoryModel.TMHList;
			
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
			    	
			    	if((AuctionHistoryCtrl.page.currentPage < AuctionHistoryCtrl.page.totalPage) && (AuctionHistoryCtrl.auctionHistoryModel.TMHList.length < AuctionHistoryCtrl.totalCount))
					{   
//						$(".sell-list-item-price-word").find(".numbers-view").stop(true, true);
//						$(".sell-list-item-price-word").find(".numbers-view div").removeClass("temp");
//                      $this.find(".numbers-view").stop(true, true);
//                      clearInterval(AuctionHistoryCtrl.timer);
//                      clearInterval(AuctionHistoryCtrl.timer2);
//                      AuctionHistoryCtrl.initClock();
//                      $(".temp").css("display","none")
            	        AuctionHistoryCtrl.initData(1);
					}
					else if((AuctionHistoryCtrl.page.currentPage == AuctionHistoryCtrl.page.totalPage) || (AuctionHistoryCtrl.auctionHistoryModel.TMHList.length == AuctionHistoryCtrl.totalCount))
					{ 
						$('.acu-chrysanthemums').css("display","block");
						setTimeout(function(){
							$('.acu-chrysanthemums').css("display","none");

						},500);
						setTimeout(function(){
							$(".ac-no-more-data").css("display","block");


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
    
  


   		
