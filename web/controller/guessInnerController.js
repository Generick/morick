/*
 * 商品详情
 */

app.controller("ctrl", function($scope) {
	

    GuessInnerCtrl.init($scope);
   
});

var GuessInnerCtrl = {
	scope : null,

    isJoinAgain : false,
 
    GuessTicket : null,
    
    gonOnGet : false,
    
    isOpenRegular : false,
   
    thisDetailPage : null,
    
    thisDataId : null,
    
    hasLogin : false,
    
    goodsDetailModel : 
    {   
    	guessTicket : null,
        sumMoney : null,
    	id : null, //商品id
    	allInfo : {}
    },
    
    biddingModel :
    {   
    	
    	myMoney : null,
    	isShoWaWard : false,
    	biddingList : [],
    	drawnList : [],
    	isCheckOver : true, //查看更多
    	num : 0,
    	count : 0,
    	checkMore : null,
    	numDel : false, //出价数目删除
    },

    balance : null, //用户余额

    timer: null, //定时器
    
    init : function ($scope)
    {
    	this.scope = $scope; 
    	
    	this.getUrlAndIds();
        
    	this.initData();
    	
    	this.bindClick();
    	
    	this.getSelfInfo();
    	
    	this.getAwardUserList();
    	
    	this.initBiddingData();
    	
    	this.ngRepeatFinish();
  	    
    	initTab.start(this.scope, -1); //底部导航
	    
    },
    getUrlAndIds :function(){
    	
    	var self = this;
    	if(location.href.indexOf("&") != -1)
		{   
			
			self.thisDetailPage = location.href.split("&")[1].split("=")[1];
			self.thisDataId = location.href.split("&")[0].split("=")[1];

            if(String(self.thisDetailPage).indexOf("#") != -1)
			{
				 self.thisDetailPage = parseInt(self.thisDetailPage.split("#")[0]);
				    	    	
			}
			else
			{
				self.thisDetailPage = parseInt(self.thisDetailPage);
			}
			if(String(self.thisDataId).indexOf("#") != -1)
			{
				self.thisDataId = parseInt(self.thisDataId.split("#")[0]);
				    	    	
			}
			else
			{
				self.thisDataId = parseInt(self.thisDataId);
			}
				    	
		}
    },
    
    
    
  
    initData: function() {
    	var self = this;

    	$('.animation').css('display','block'); //加载动画
		$('.container').css('opacity','0');
    	var params = {};
    	
    	if(location.href.indexOf("?") > 0)
    	{   
    		
    		params.auctionId = commonFu.getQueryStringByKey("id"); //当前藏品ID
    		
    		self.goodsDetailModel.id = params.auctionId;
    		
    	}
    
    	
//  	self.setReadLog();
//  	
//  	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_GUESSDETAIL, params,
            /**
             * @param data.allInfo.referencePrice 参考价
             * @param data.allInfo.hasLogin
             * @param data.allInfo.currentUser
             * @param data.allInfo.lowestPremium
             */
            function(data) {
                  
                   
// 					console.log("ggg2gg"+JSON.stringify(data))
            		self.goodsDetailModel.allInfo = [];
            		self.goodsDetailModel.allInfo = data;
            		if(!commonFu.isEmpty(data.isQuiz))
	                {
	                	self.hasLogin = data.hasLogin;
	            		self.GuessTicket = self.goodsDetailModel.allInfo.tickets;
	            		self.goodsDetailModel.guessTicket = self.goodsDetailModel.allInfo.tickets;
		                self.goodsDetailModel.sumMoney = parseFloat(self.goodsDetailModel.allInfo.tickets)  * parseFloat(self.goodsDetailModel.allInfo.limitNum);
		                
		                
		                if(!commonFu.isEmpty(self.goodsDetailModel.allInfo.goods_icon))
		                {
		                	self.goodsDetailModel.allInfo.goods_icon = JSON.parse(self.goodsDetailModel.allInfo.goods_icon);//  JSON.parse(self.goodsDetailModel.allInfo.goods_icon); 
		                    self.goodsDetailModel.allInfo.goods_icon_new = []
		               
			              	for (var i = 0; i < self.goodsDetailModel.allInfo.goods_icon.length; i ++)
			              	{
			              		var itemObj = {}
			              		
			              		itemObj.showIcon = self.goodsDetailModel.allInfo.goods_icon[i];
			              		
			              		self.goodsDetailModel.allInfo.goods_icon_new.push(itemObj);
			              	}
		                }
		              
		                //倒计时初始化
		                var currentDate = new Date().getTime();
		                var second1 = Math.ceil(currentDate/1000);
		                var time0 = (parseFloat(self.goodsDetailModel.allInfo.endTime) - second1);
		                var time = (parseFloat(self.goodsDetailModel.allInfo.startTime) - second1);
		                setTitle(self.goodsDetailModel.allInfo.goods_name)
		                if (time <= 0)
		                {
		                    $('#endTime').hide();
		                    $('.endtime-text').html("");
		                    if(time0 <= 0)
		                    {
		                    	$('.endtime-time').html("竞猜已结束");
		                    }
		                    else
		                    {
		                    	 $('.endtime-time').html("已停止下注 ");
		                    }
		                   
		                    $('#goodsBtn').attr({"disabled": "disabled", "class": "goods-btn-un"});
		                }
		                
		                var day = Math.floor(time/(3600*24));
		                var hour = Math.floor((time/3600)%24);
		                var min = Math.floor((time%3600)/60) + 1;
		                var sec =  Math.floor(time%60);
		                $('#day').html(day);
		                $('#hour').html(hour);
		                $('#minute').html(min);
		                $('#second').html(sec);
		               
		                self.countDown(self.goodsDetailModel.allInfo.startTime,self.goodsDetailModel.allInfo.endTime);
		            
		                self.scope.goodsDetailModel = self.goodsDetailModel;
		                $('.animation').css('display','none');
		                $('.container').css({'opacity':'1'});
		                self.scope.$apply();
	
		            }
	                else{
	                	   $('#endTime').hide();
		                    $('.endtime-text').html("");
		                    $('.endtime-time').html("竞猜已结束");
		                    $('#goodsBtn').attr({"disabled": "disabled", "class": "goods-btn-un"});
		                    self.scope.goodsDetailModel = self.goodsDetailModel;
			                $('.animation').css('display','none');
			                $('.container').css({'opacity':'1'});
			                self.scope.$apply();
	                }
            		
            });
    	
    	//设置title
    	function setTitle(title)
    	{
		    document.title = title + " - 雅玩之家";
    	}
    },
    
  
    //jquery倒计时
	countDown : function(timestamp,timestamp2)
	{
        var self = this;
		var currentDate = new Date().getTime();
		var second1 = Math.ceil(currentDate/1000);
		var time = (parseFloat(timestamp) - second1);
        var time0 = (parseFloat(timestamp2) - second1);
        clearInterval(self.timer);
		self.timer = setInterval(function ()
		{
			if(time <= 0)
			{
				$('#endTime').hide();
				$('.endtime-text').html("");
				
				if(time0 <= 0)
		        {
		            $('.endtime-time').html("竞猜已结束");
		        }
		        else
		        {
		            $('.endtime-time').html("已停止下注 ");
		        }
				
                $('#goodsBtn').attr({"disabled": "disabled", "class": "goods-btn-un"});

				clearInterval(self.timer);
			}
			time--;
			
			var day = Math.floor(time/(3600*24));
            var hour = Math.floor((time/3600)%24);
            var min = Math.floor((time%3600)/60) + 1;
            var sec =  Math.floor(time%60);
            $('#day').html(day);
			$('#hour').html(hour);
			$('#minute').html(min);
			$('#second').html(sec);
		},1000);
    },
    
 
    //获取个人账户信息
    getSelfInfo: function()
    {
    	var self = this;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data) {
//  	    console.log("wodezhanghu "+JSON.stringify(data))
    		self.balance = data.userInfo.balance;
    		self.biddingModel.myMoney =  data.userInfo.balance;

    		self.scope.$apply();
    		
    	})
    },

//  //记录拍品已阅读
//  setReadLog: function() {
//  	var self = this;
//  	
//  	var param = 
//  	{
//  		readType : 1,
//  		readId : self.goodsDetailModel.id
//  	};
//  	
//  	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_READLOG, param, function()
//  	{
//  		self.scope.$apply();
//  	})
//  },
    
   
    //获取中奖用户列表
    getAwardUserList : function(){
    	
    	var self = this;
    	
    	var params = {};
    	
    	params.auctionId = self.goodsDetailModel.id;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GETAWARD_USERS, params,function(data){
    		
//  		console.log("huojiang"+JSON.stringify(data))
    		
    		self.biddingModel.drawnList = data;
    		
    		if(!commonFu.isEmpty(self.biddingModel.drawnList))
    		{  
    			
    			var currentDate = new Date().getTime();
		        var second1 = Math.ceil(currentDate/1000);
		        var time = (parseFloat(self.goodsDetailModel.allInfo.startTime) - second1);
		        
		        if(time <= 0){
		        	self.biddingModel.isShoWaWard = true;
		        }
    			
    			for(var s = 0; s < self.biddingModel.drawnList.length; s++)
	    		{    
	    			if(self.biddingModel.drawnList[s].awardMoney != null)
	    			{
	    				self.biddingModel.drawnList[s].awardMoney = commonFu.toDecimals(parseFloat(self.biddingModel.drawnList[s].awardMoney));
	    			}
	    			else
	    			{
	    				self.biddingModel.drawnList[s].awardMoney = 0;
	    			}
	                if (!commonFu.isEmpty(self.biddingModel.drawnList[s]))
	                {
	                    self.biddingModel.drawnList[s].telephone = commonFu.telephoneDispose(self.biddingModel.drawnList[s].telephone);
	                       
	                    if (commonFu.isEmpty(self.biddingModel.drawnList[s].icon))
	                    {
	                        self.biddingModel.drawnList[s].icon = "img/personCenter/default_head.png";
	                    }
	                }
	                else
	                {
	                	
	                }
	                if(self.biddingModel.drawnList[s].award == 1)
	                {  
	                	self.biddingModel.drawnList[s].Bagcolor = "first-user";
	                	
	                }
	                else if(self.biddingModel.drawnList[s].award == 2)
	                {
	                	self.biddingModel.drawnList[s].Bagcolor = "second-user";
	                }
	                else if(self.biddingModel.drawnList[s].award == 3){
	                	
	                	self.biddingModel.drawnList[s].Bagcolor = "third-user";
	                }
	                
	             
	    		}
    		}
    		else
    		{   
    			
    		}
    		
    		self.scope.biddingModel = self.biddingModel;
            self.scope.$apply();
    	})
    	
    },
   
   
    //初始化竞猜记录
    initBiddingData : function()
    {
    	var self = this;
    	
    	self.biddingModel.num +=5;
    	
    	var params = 
    	{
    		auctionId : self.goodsDetailModel.id,
    		startIndex : 0,
    		num : self.biddingModel.num
    	};
 
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_GUESSUSERLIST, params,

            /**
             * 竞拍记录
             * @param data.count
             * @param data.biddingList
             * @param data.biddingList.userData 竞拍用户
             */
            function(data){
            	
//           	console.log("jingpai"+JSON.stringify(data))
                self.biddingModel.biddingList = [];
                self.biddingModel.biddingList = data.data;
                self.biddingModel.count = data.count;
               
                if(self.biddingModel.count <= 5)
                {
                    self.biddingModel.isCheckOver = false;
                }

                for (var i=0;i<self.biddingModel.biddingList.length;i++)
                {
                    self.biddingModel.biddingList[i].quiz_price = commonFu.toDecimals(parseFloat(self.biddingModel.biddingList[i].quiz_price));

                    if (!commonFu.isEmpty(self.biddingModel.biddingList[i]))
                    {
                        self.biddingModel.biddingList[i].telephone = commonFu.telephoneDispose(self.biddingModel.biddingList[i].telephone);
                       
                        if (commonFu.isEmpty(self.biddingModel.biddingList[i].icon))
                        {
                          
                           self.biddingModel.biddingList[i].icon = "img/personCenter/default_head.png";
                       
                        }
                    }
                }
                self.scope.biddingModel = self.biddingModel;
                self.biddingModel.checkMore = "查看更多";
             
                self.scope.checkMore = self.biddingModel.checkMore;
                self.scope.$apply();
          
            })
    },
  

    //判断并扣除门票费
    getIfFreeze: function() {
    	var self = this;

	    if (parseFloat(self.balance)  < parseFloat(self.GuessTicket))
	    {
	    	self.gonOnGet = true;
	        $dialog.msg("余额不足，前去充值", 1);
	
	        setTimeout(function() {
	          
//	           location.href = pageUrl.ACCOUNT_RECHARGE;
	            location.href = pageUrl.TOCUSTOMER_PAGE;
	        }, 1200);
	        
	    }
    
    },
    
    bindClick: function ()
    {
    	var self = this;
    	
    	self.scope.showRegular = function(){
    	    
    	    if(self.isOpenRegular)
    	    {
    	    	$("#fixed-regular").css("display","none");
    	        $("#fixed-close").css("display","none");
    	        $("#guessDetailContent").css("display","none");
    	    }
    	    else{
    	    	
    	        $("#fixed-regular").css("display","block");
    	        $("#fixed-close").css("display","block");
    	        $("#guessDetailContent").css("display","block");
    	    }
    		self.isOpenRegular = !self.isOpenRegular;
    	};
    	
    	//去充值
    	self.scope.goToAddMoney = function(){
    		
//  		location.href = pageUrl.ACCOUNT_RECHARGE;
    		 location.href = pageUrl.TOCUSTOMER_PAGE;
    	}
    	
    	//隐藏出价框
    	self.scope.closeAdd =function(){
    		
    		$(".pay-block-bg").css("display","none")
    		
    	};
    	//更新
    	self.scope.onClickUpdateTime = function()
    	{
    		var time = commonFu.getNowFormatDate();
    		$('#updateTime').html(time);
    		self.biddingModel.num = 0;
    		self.biddingModel.isCheckOver = true;
    		self.initBiddingData();
    	};
    
    	//竞猜弹窗
    	self.scope.onClickPay = function()
    	{  
    		
    		if(self.hasLogin)
    		{
    			if(self.isJoinAgain)
	    		{
	    			$dialog.msg("您已经参加过竞猜");
	    			return;
	    		}
	            self.biddingModel.numDel = true;
//	            if(self.balance < self.GuessTicket){
//	            	
//	            	$(".to-add-money").css("display","block");
//	            }
	            $('.pay-block-bg').show();
	            $('#payPrice').html();
    		}
    		else{
    			
                localStorage.setItem(localStorageKey.DEFAULT, location.href);
				$dialog.msg("您还未登录，请先登录");
				
				setTimeout(function(){
           		
					location.href = "login.html";
         	
				},1200);
    		}
    		
    	};
    	
    	//添加金额
    	self.scope.payNumAdd = function(num)
    	{
            var $payPrice = $('#payPrice');
    		if(num == 10)
    		{
    			if($payPrice.html().length != 0)
    			{
                    $payPrice.html($payPrice.html() + "" + "00");
    			}
    		}
    		else if(num == 0)
    		{
    			if($payPrice.html().length != 0)
    			{
                    $payPrice.html($payPrice.html() + "" + 0);
    			}
    		}
    		else 
    		{
                $payPrice.html($payPrice.html() + "" + num);
    		}
    		
    		if($payPrice.html().length != 0)
    		{
    			self.biddingModel.numDel = true;
    		}
    	};
    	
    	//数字键盘全删
    	self.scope.onClickNumDel = function()
    	{
    		$('#payPrice').html('');
    		self.biddingModel.numDel = false;
    	};
    	
    	//数字键盘单个金额删除
    	self.scope.delPayNum = function()
    	{
    		var $priceStr = $('#payPrice');
    		var priceStr = $priceStr.html();
            
    		if (priceStr != "" && priceStr != null)
    		{
    			self.biddingModel.numDel = true;
    			var newPrice = priceStr.substring(0, priceStr.length-1);
    			if (newPrice.length == 0)
    			{
    				self.biddingModel.numDel = false;
    			}
                $priceStr.html(newPrice);
    		}
    		else
    		{
    			self.biddingModel.numDel = false;
    		}
    	};
    	
    	//出价支付
    	self.scope.onClickPayNow = function()
    	{
            var $payPrice =commonFu.toDecimals(parseFloat($('#payPrice').html())) ;
            if($payPrice == '' || $payPrice ==null || $payPrice == 0)
	    	{
	    		$dialog.msg("竞猜金额不合理！");
	    		return;
	    	}

				var params = 
	    		{
	    			auctionId : self.goodsDetailModel.id,
	    				quizPrice : $payPrice
	    		};
	    		if(params.quizPrice == '' || params.quizPrice ==null || params.quizPrice == 0)
	    		{
	    			$dialog.msg("竞猜金额不合理！");
	    			return;
	    		}
	    		 
	    		self.getIfFreeze();
	    		if(self.gonOnGet)
	    		{
	    			return;
	    		}
	    		 
	    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_JOIN_GUESS, params,
               
                function(data)
                {  
	              
	                var currentDate = new Date().getTime();
	                var second1 = Math.ceil(currentDate/1000);
	                var time = (parseFloat(self.goodsDetailModel.allInfo.startTime) - second1);
	                $dialog.msg("竞猜成功！");
	                $('.pay-block-bg').css('display','none');
	                self.biddingModel.num = 0;
	                self.biddingModel.isCheckOver = true;
	                self.isJoinAgain = true;
	                self.initData();
	                self.getAwardUserList();
	                self.initBiddingData();
	                
                },
                function(err){
                   
                    if(err == 20003){

                        $dialog.msg("不能重复参与竞猜！");
                        
                    }
                    else if(err == 20005)
                    {
                    	$dialog.msg("人数已满！");
                       
                    }
                    else if(err == 20004)
                    {
                    	$dialog.msg("余额不足，前去充值!");
                        setTimeout(function() {
	          
				           location.href = pageUrl.ACCOUNT_RECHARGE;
				           return;
				        }, 1200);
				        
                    }
                    setTimeout(function(){
                    	$('.pay-block-bg').hide();
                        self.initData();
                        self.getAwardUserList();
                        self.initBiddingData();
                    },1300)
                        	
                })
    	};
    	
    	//服务协议
    	self.scope.onClickPayProtocol = function()
    	{
            $dialog.msg("功能更新中，敬请期待...");
    	};

    	//查看更多
    	self.scope.onClickCheckMore = function()
    	{
    		self.biddingModel.checkMore = "加载中...";
    		self.initBiddingData();
    		if (self.biddingModel.num >= self.biddingModel.count)
    		{
    			self.biddingModel.isCheckOver = false;
    		}
    		
    		self.scope.checkMore = self.biddingModel.checkMore;
    	}
    },
  
    ngRepeatFinish: function() {
    	var self = this;

		self.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                   
           var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
//              autoplay: 3000,
                autoplayDisableOnInteraction: false
            });
		});
    }
};
