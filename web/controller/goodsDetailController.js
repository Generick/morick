/*
 * 商品详情
 */

app.controller("ctrl", function($scope) {
	
	sessionStorage.setItem("itIsSelectPage",1)
    GoodsInfoCtrl.init($scope);
   
});

var GoodsInfoCtrl = {
	scope : null,
    
    isSure : 0,
    
    isListLengthZero : 1,
    
    thisDetailPage : null,
    
    thisDataId : null,
    
    goodsDetailModel : 
    {
    	id : null, //商品id
    	allInfo : {},
    	isTimeChange : true, //倒计时剩余5分钟flag
    	showReference : true
    },
    
    biddingModel :
    {
    	biddingList : [],
    	isCheckOver : true, //查看更多
    	num : 0,
    	count : 0,
    	checkMore : null,
    	numDel : false, //出价数目删除
    	initialPrice : null //初始价
    },

    //三次委托出价
    priceArr: [
        {
       	    index : 0,
       	    triggerPrice : "",
       	    offerPrice : ""
        },
        {
       	    index : 1,
       	    triggerPrice : "",
       	    offerPrice : ""
        },
        {
       	    index : 2,
       	    triggerPrice : "",
       	    offerPrice : ""
        }
    ],
    
    balance : null, //用户余额
    
    services : [],
    
    type : null, //是否具备委托出价条件,0:无，1:有
    
    hasSelfPaid : false, //是否已经出价
    
    selfPaidText : "委托出价",
    
    bids : [], //委托出价条件

    timer: null, //定时器
    
    init : function ($scope)
    {
    	this.scope = $scope; 
    	
    	this.getUrlAndIds();

    	this.initData();
    	
    	this.bindClick();
    	
    	this.dataModelInit();
    	
    	this.getSelfInfo();
    	
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
    
    
    //三次出价委托初始化
    dataModelInit: function() {
    	this.scope.priceArr = this.priceArr;
    },
    
    initData: function() {
    	var self = this;

    	$('.animation').css('display','block'); //加载动画
    	
    	var params = {};
    	
    	if(location.href.indexOf("?") > 0)
    	{   
    		
    		params.itemId = commonFu.getQueryStringByKey("id"); //当前藏品ID
    		
    		self.goodsDetailModel.id = params.itemId;
    		
    	}
    	
    	self.getProxyBid();
    	
    	self.setReadLog();
    	
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_AUCTION_INFO, params,
            /**
             * @param data.allInfo.referencePrice 参考价
             * @param data.allInfo.hasLogin
             * @param data.allInfo.currentUser
             * @param data.allInfo.lowestPremium
             */
            function(data) {
                  
                   
 					console.log("chushi"+JSON.stringify(data))
            		self.goodsDetailModel.allInfo = [];
            		self.goodsDetailModel.allInfo = data.allInfo;
            		if(commonFu.isEmpty(self.goodsDetailModel.allInfo.cappedPrice) || (parseFloat(self.goodsDetailModel.allInfo.cappedPrice) == 0))
            		{  
            			$("#capped-box").addClass("capped-hide");
            			$("#capped-box").removeClass("capped-show");
            		}
            		else
            		{   
            			

            			$("#capped-box").removeClass("capped-hide");
            			$("#capped-box").addClass("capped-show");
            		}

	                if(self.goodsDetailModel.isTimeChange)
	                {   
	              
	                    self.goodsDetailModel.allInfo.goodsInfo.goods_pics = JSON.parse(data.allInfo.goodsInfo.goods_pics); 
 

	                    $('#goodsContent').html(self.goodsDetailModel.allInfo.goodsInfo.goods_detail);
	
	                    if (parseFloat(self.goodsDetailModel.allInfo.referencePrice) == 0)
	                    {
	                        self.goodsDetailModel.showReference = false;
	                    }
	
	                    setTitle(self.goodsDetailModel.allInfo.goodsInfo.goods_name);
	
	                    self.goodsDetailModel.isTimeChange = false;
	                }
	                
	                //倒计时初始化
	                var currentDate = new Date().getTime();
	                var second1 = Math.ceil(currentDate/1000);
	                var time = (parseFloat(self.goodsDetailModel.allInfo.endTime) - second1);
	                var time1 = (second1 - parseFloat(self.goodsDetailModel.allInfo.startTime));
	                if (time <= 0 || time1 <= 0)
	                {
	                    $('#endTime').hide();
	                    $('.endtime-text').html("");
	                    $('.endtime-time').html("竞拍已结束");
	                    $('#goodsBtn').attr({"disabled": "disabled", "class": "goods-btn-un"});
	                    $("#selfGoodsBtn").attr({"disabled":"disabled", "class": "goods-btn-un"});
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
	                $('.container').css('opacity','1');
	                self.scope.$apply();

            });
    	
    	//设置title
    	function setTitle(title)
    	{
		    document.title = title + " - 雅玩之家";
    	}
    },
    
  
    //jquery倒计时
	countDown : function(timestamp,timestamp1)
	{
        var self = this;
		var currentDate = new Date().getTime();
		var second1 = Math.ceil(currentDate/1000);
		var time = (parseFloat(timestamp1) - second1);
		var time1 = (second1 - parseFloat(timestamp));
//		console.log("cur"+second1)
        clearInterval(self.timer);
		self.timer = setInterval(function ()
		{
			if(time <= 0 || time1 <= 0)
			{
				$('#endTime').hide();
				$('.endtime-text').html("");
				$('.endtime-time').html("竞拍已结束");
                $('#goodsBtn').attr({"disabled": "disabled", "class": "goods-btn-un"});
                $("#selfGoodsBtn").attr({"disabled":"disabled", "class": "goods-btn-un"});
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
    
    //显示或隐藏提示框
    showOrHide : function(type){
    	var self = this;
    	
    	if(type ==0)
    	{   
    		$("#reminding").css("display","block");
    		$("html,body").css("overflow","hidden");
    		$('#reminding').bind("touchmove",function(e){
              		 e.preventDefault();
			});
    	}
    	else
    	{
    		$("#reminding").css("display","none");
    	}
    	
    },
    
    //获取个人账户信息
    getSelfInfo: function()
    {
    	var self = this;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data) {
    		
    		self.balance = data.userInfo.balance;
    		self.scope.$apply();
    	})
    },

    //记录拍品已阅读
    setReadLog: function() {
    	var self = this;
    	
    	var param = 
    	{
    		readType : 1,
    		readId : self.goodsDetailModel.id
    	};
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_READLOG, param, function()
    	{
    		self.scope.$apply();
    	})
    },
    
    //获取包月服务信息
    getSelfServices : function()
    {
    	var self = this;
    	if (!self.hasSelfPaid)
    	{   
    		
    		self.type = 1;
	    	self.selfPaidText = "委托出价";
		    self.scope.selfPaidText = self.selfPaidText;
/*
   			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_SELF_PAID_SERVICES, {}, function(data)
		    	{   

		    		var timestamp = commonFu.getTimeStamp();
		    		self.services = data.services;
		    		if (self.services.length == 0)
		    		{
		    			self.type = 0;
		    			self.selfPaidText = "开通委托出价";
		    		}
		    		else if (self.services.length == 1)
		    		{
		    			if (self.services[0].serviceType == 0)
		    			{
		    				self.type = 0;
		    				self.selfPaidText = "开通委托出价";
		    			}
		    			else
		    			{
		    				if (self.services[0].endTime > timestamp)
		    				{
			    				self.type = 1;
			    				self.selfPaidText = "委托出价";
		    				}
		    				else
		    				{
		    					self.type = 0;
		    					self.selfPaidText = "开通委托出价";
		    				}
		    			}
		    		}
		    		else
		    		{
		    			for (var i = 0;i < self.services.length;i ++)
		    			{
		    				if (self.services[i].serviceType == 1)
		    				{
		    					if (self.services[i].endTime > timestamp)
		    					{
		    						self.type = 1;
		    						self.selfPaidText = "委托出价";
		    					}
		    					else
		    					{
		    						self.type = 0;
		    						self.selfPaidText = "开通委托出价";
		    					}
		    				}
		    			}
		    		}

	                self.type = 1;
	    			self.selfPaidText = "委托出价";
		    		self.scope.selfPaidText = self.selfPaidText;
		    		self.scope.$apply();
		    	})
*/		    	
    	}
    	else
    	{   
    		self.selfPaidText = "已委托出价";
    		self.scope.selfPaidText = self.selfPaidText;
    		self.scope.$apply();
    	}
    },
    
    //获取委托出价
    getProxyBid : function()
    {   
    	var self = this;
    	
    	var param =
    	{
    		auctionId : self.goodsDetailModel.id
    	};
    	if(!commonFu.isEmpty(sessionStorage.getItem("reloginFail")) || !commonFu.isEmpty(sessionStorage.getItem("itIsSelectPage")))
    	{   

    		self.selfPaidText = "委托出价";
		    self.scope.selfPaidText = self.selfPaidText;
    	}
    	else
    	{
    	}
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PROXYBID, param, function(data)
    	{
    		
    		self.bids = data.bids;
            var len = self.bids.length;
    		
    		if (len > 0)
    		{
    			self.hasSelfPaid = true;
    			for (var i = 0; i < len; i++)
	    		{
	    			self.bids[i].triggerPrice = parseFloat(self.bids[i].triggerPrice); //触发价
	    			self.bids[i].offerPrice = parseFloat(self.bids[i].offerPrice); //达到触发价自动出价
	    		}
    		}

    		self.scope.hasSelfPaid = self.hasSelfPaid;
    		self.scope.bids = self.bids;
     		self.getSelfServices();//可以提前到了前面
    	})
    	
    },

    //初始化竞拍记录
    initBiddingData : function()
    {
    	var self = this;
    	
    	self.biddingModel.num +=5;
    	
    	var params = 
    	{
    		itemId : self.goodsDetailModel.id,
    		startIndex : 0,
    		num : self.biddingModel.num
    	};
    
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_BIDDING_LIST, params,

            /**
             * 竞拍记录
             * @param data.count
             * @param data.biddingList
             * @param data.biddingList.userData 竞拍用户
             */
            function(data){
            	
//          	 alert("sanci"+JSON.stringify(data))
                self.biddingModel.biddingList = [];
                self.biddingModel.biddingList = data.biddingList;
                self.biddingModel.count = data.count;
                
                if(self.biddingModel.count <= 5)
                {
                    self.biddingModel.isCheckOver = false;
                }

                for (var i=0;i<self.biddingModel.biddingList.length;i++)
                {
                    self.biddingModel.biddingList[i].nowPrice = self.toDecimals(parseFloat(self.biddingModel.biddingList[i].nowPrice));

                    if (!commonFu.isEmpty(self.biddingModel.biddingList[i].userData))
                    {
                        self.biddingModel.biddingList[i].userData.telephone = commonFu.telephoneDispose(self.biddingModel.biddingList[i].userData.telephone);
                        if (commonFu.isEmpty(self.biddingModel.biddingList[i].userData.smallIcon))
                        {
                            self.biddingModel.biddingList[i].userData.smallIcon = "img/personCenter/default_head.png";
                        }
                    }
                }
                self.isListLengthZero = self.biddingModel.biddingList.length
                self.scope.biddingModel = self.biddingModel;
                self.biddingModel.checkMore = "查看更多";
                self.scope.checkMore = self.biddingModel.checkMore;
                self.judjeOver();
                self.showOrHide(self.isListLengthZero);
                self.scope.$apply();
              
                
            }
        )
    },
    
    
    //判断是否结束
    judjeOver : function(){
    	var self = this;
    	if(self.biddingModel.biddingList.length > 0)
        {   
        	if((self.goodsDetailModel.allInfo.cappedPrice == 0) || commonFu.isEmpty(self.goodsDetailModel.allInfo.cappedPrice))
        	{
        		
        	}
        	else
        	{
        		if(parseFloat(self.biddingModel.biddingList[0].nowPrice) >= parseFloat(self.goodsDetailModel.allInfo.cappedPrice))
		    	{   
		    		
		            self.initData();
			        $('#endTime').hide();
					$('.endtime-text').html("");
					$('.endtime-time').html("竞拍已结束");
					$('#goodsBtn').attr({"disabled": "disabled", "class": "goods-btn-un"});
					$("#selfGoodsBtn").attr({"disabled":"disabled", "class": "goods-btn-un"});
					clearInterval(self.timer);	
		    	}
        	}
		   
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
    } ,   
    //出价时获取是否扣除保证金
    getIfFreeze: function() {
    	var self = this,
    	    param = {
                freezeType : 0,
                freezeId : self.goodsDetailModel.id
            };
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_IFFREEZE, param,
            /**
             * 是否已经扣除过保证金
             * @param data.isFreeze 是否扣除
             */
            function(data) {
                if (!data.isFreeze)
                {
                    if (parseFloat(self.balance)  < parseFloat(self.goodsDetailModel.allInfo.margin))
                    {
                        $dialog.msg("余额不足，前去充值", 1);

                        setTimeout(function() {
                            location.href = pageUrl.ACCOUNT_RECHARGE;
                        }, 1500);
                    }
                }
            }
        )
    },
    
    bindClick: function ()
    {
    	var self = this;
    	
    	//我的竞猜
    	
    	self.scope.jumpToGuess = function(){
    		sessionStorage.setItem("comeWithGuess",1);
    		location.href = pageUrl.GUESS_INNER +"?id="+ self.thisDataId + "&page=" +self.thisDetailPage;
    		
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
    	self.scope.imSure = function()
    	{
    		
    		$("#reminding").css("display","none");
    		$("html,body").css("overflow","auto");
    	};
    	
    	//委托出价弹窗
    	self.scope.onClickSelfPay = function()
    	{   
    		

  		     if(!commonFu.isEmpty(localStorage.getItem(localStorageKey.TOKEN)))
  		     {
/*		     	if (self.type == 0)
    			{  
    				location.href = pageUrl.SELF_PAID_SERVICES;
    			}
    			else if (self.type == 1)
    			{
    				$('.self-pay-block-bg').css('display','block');
    			}
*/    			
    			if (self.type == 1)
    			{   
    				$('.self-pay-block-bg').css('display','block');
    			}
    			else
    			{   
    				if(!self.goodsDetailModel.allInfo.hasLogin)
    				{
    					$dialog.msg("您还未登录，请登录后再委托出价");
    					setTimeout(function(){
             		
				    		location.href = "login.html";
             	
             			},1200);
    				}
    				else
    				{
    					$dialog.msg("您已委托出价，再次竞拍需手动出价");
    				}
    				
    			}
  		     }
             else
             {
             	$dialog.msg("您还未登录，请先登录");
             	
             	setTimeout(function(){
             		
				    location.href = "login.html";
             	
             	},1200);
             	return;
             }
    	
    	};
    	
    	//确认委托
    	self.scope.onClickToSelfPaid = function()
    	{
    		var arr = [];
    		
    		for(var i = 0 ; i < self.priceArr.length ; i ++)
    		{
    			var triggerPrice = self.priceArr[i].triggerPrice;
    			var offerPrice = self.priceArr[i].offerPrice;
    			
    			if(triggerPrice != "" && offerPrice != "")
    			{
    				if(parseFloat(offerPrice)  >= (parseFloat(triggerPrice) + parseFloat(self.goodsDetailModel.allInfo.lowestPremium)))
            		{
            			var itemObj = {};
		            	itemObj.triggerPrice = triggerPrice;
		            	itemObj.offerPrice = offerPrice;
		            	arr.push(itemObj);
            		}
            		else
            		{
            			$dialog.msg("委托出价金额设置错误");
            			return;
            		}
    			}
    			else if ((triggerPrice != "" && offerPrice == "") || (triggerPrice == "" && offerPrice != ""))
    			{
    				$dialog.msg("委托出价金额设置错误");
    				return;
    			}
    		}

            if(arr.length == 0)
            {
            	$dialog.msg("委托出价金额设置不能为空");
            	return;
            }
            
    		var params =
    		{
    			auctionId : self.goodsDetailModel.id,
    			bids : JSON.stringify(arr)
    		};
//  		alert(JSON.stringify(params))
	    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_SET_PROXYBID, params, function()
	    	{
	    		$('.self-pay-block-bg').css('display','none');
	    		$dialog.msg("委托出价成功");
	    		setTimeout(function() {
	    			location.reload();
	    		},500)
	    	})
    		
    	};
    	
    	
    	//出价弹窗
    	self.scope.onClickPay = function()
    	{
//          var userId = localStorage.getItem(localStorageKey.userId);
	
            if (self.goodsDetailModel.allInfo.hasLogin)
            {
                self.biddingModel.numDel = true;
                $('.pay-block-bg').show();

                if (self.biddingModel.count == 0)
                {
                    if (parseFloat(self.goodsDetailModel.allInfo.initialPrice) == 0)
                    {
                        $('.lead-price').html(0 + "元");
                        $('#payPrice').html(parseFloat(self.goodsDetailModel.allInfo.initialPrice) + parseFloat(self.goodsDetailModel.allInfo.lowestPremium));
                        self.biddingModel.initialPrice = $('#initialPrice').html();
                    }
                    else
                    {
                        var initPrice = $('#initialPrice').html();
                        $('.lead-price').html(0 + "元");
                        $('#payPrice').html(initPrice);
                        self.biddingModel.initialPrice = initPrice;
                    }
                }
                else
                {
                    $('.lead-price').html(parseFloat(self.biddingModel.biddingList[0].nowPrice) + "元");
                    var newPrice =parseFloat(self.biddingModel.biddingList[0].nowPrice*1)  + parseFloat(1*$('#lowestPremium').html());
                    $('#payPrice').html(newPrice);
                    self.biddingModel.initialPrice = newPrice;
                }
            }
			else
			{ 
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
            var $payPrice =self.toDecimals(parseFloat($('#payPrice').html())) ;
            
    		if ($payPrice.length != 0)
    		{
    			if (parseFloat($payPrice)  >= parseFloat(self.biddingModel.initialPrice))
    			{  
    				self.getIfFreeze();
    				
    				//$('.goods-btn').attr("disabled", "disabled").html('<b></b>').addClass("pay-btn");
    				$('.goods-btn').attr("disabled", "disabled").addClass("pay-btn");

					var params = 
	    			{
	    				itemId : self.goodsDetailModel.id,
	    				price : $payPrice
	    			};
	    			
	    			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_BIDDING_AUCTION_ITEM, params,
                        function(data)
                        {  
//                          alert("data"+JSON.stringify(data))
                            var currentDate = new Date().getTime();
                            var second1 = Math.ceil(currentDate/1000);
                            var time = (parseFloat(self.goodsDetailModel.allInfo.endTime) - second1);
                            if(time < 300)
                            {
                                self.goodsDetailModel.isTimeChange = false;
                                self.initData();
                            }

                            //改变按钮状态，加载
                            $('.goods-btn').removeAttr("disabled").html("出价").removeClass("pay-btn");

                            $dialog.msg("出价成功！");
                            $('.pay-block-bg').css('display','none');
                            self.biddingModel.num = 0;
                            self.biddingModel.isCheckOver = true;
                            self.initBiddingData();
                        },
                        function(err){

                            if(err == 1103) {
                            	$dialog.msg("您已经是该藏品的最高出价者，无需再次竞拍")
                                setTimeout(function(){ //如果提示“本次竞拍出价不在合理区间！”1.5s后刷新当前页面
                                   
                                    self.initData();
                                    self.initBiddingData();
                                    $('.pay-block-bg').hide();
                                },1200)
                            }
                           
                        }
                    )
    			}
    			else
    			{  
                    $dialog.msg("你的出价不能低于当前价格");
    			}
    		}
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
            self.showOrHide(self.isListLengthZero);
            self.judjeOver();
		});
    }
};
