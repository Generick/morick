/*
 * 订单详情
 */
app.controller("ctrl", function($scope) {
    OrderDetailCtrl.init($scope);
});

var OrderDetailCtrl = {
    scope : null,
    
    isShowPayWay : true,
    orderDetailModel: {
        balance: null,   //用户余额
        userId: null,    //用户ID
        addressId: null, //地址ID
    	order_no: null, //订单号
    	orderInfo: {},  //订单详情
    	unPay: false,   //是否为付款
    	showLogistics: true, //显示物流
    	lastTime: null, //剩余付款时间
    	noReceipt: true,
        orderIsDone: true,
        deliveryType :0
    },
    
    isMoreThanPrice : null,
    
    goodsOrderType : null,
   
    faceOrFast : false,
    
    traces: [],//物流信息
    
    init: function ($scope) {
    	this.scope = $scope;
         
        this.scope.orderDetailModel = this.orderDetailModel;
        
        this.scope.isShowPayWay = this.isShowPayWay;
        
        this.initData();
        
        localStorage.removeItem(localStorageKey.IS_ADDRESS); //每次进来清除地址标志
    	
    	this.bindClick();

        this.ngRepeatFinish();

        this.getUserInfo();
       
//      if(!commonFu.isEmpty(sessionStorage.getItem("payOrderId"))){
//      	
//      	this.isShowPayWay = false;
//      	
//      	this.scope.isShowPayWay = this.isShowPayWay;
//
//      }
       
    },
    
   
    
    
    //初始化数据
    initData: function() {
        var self = this;

        $('.animation').css('display','block');
    	self.orderDetailModel.order_no = localStorage.getItem(localStorageKey.orderNo);
    
//      self.orderDetailModel.addressId = commonFu.getQueryStringByKey("addressId");
          
        if(!commonFu.isEmpty(self.orderDetailModel.addressId)){ //有地址ID就掉接口修改没有直接掉订单接口
            var obj = new Base64();
    	    self.orderDetailModel.addressId = obj.decode(commonFu.getQueryStringByKey("addressId"))
            self.setAddress();
        }
        else {
            self.getOrderInfo();
        }
    },

    //获取订单详情
    getOrderInfo: function(){
        var self = this;

        var param = {
            order_no : self.orderDetailModel.order_no
        };
//      alert(JSON.stringify(param))
        jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_ORDER_INFO, param, function(data) {
            
//            console.log(JSON.stringify(data))
            self.orderDetailModel.orderInfo = {};
            self.orderDetailModel.orderInfo = data.orderInfo;
            
            self.goodsOrderType = self.orderDetailModel.orderInfo.orderType;
            if(self.orderDetailModel.orderInfo.acceptName == "")
            {
                self.orderDetailModel.orderInfo.acceptName = "暂无";
                self.orderDetailModel.noReceipt = false;
            }

            if (self.orderDetailModel.orderInfo.province == "" && self.orderDetailModel.orderInfo.city == "" && self.orderDetailModel.orderInfo.district == "")
            {
                self.orderDetailModel.orderInfo.addressAll = "暂无";
                self.orderDetailModel.noReceipt = false;
            }
            else
            {
                var str = self.orderDetailModel.orderInfo.province + self.orderDetailModel.orderInfo.city + self.orderDetailModel.orderInfo.district;
                self.orderDetailModel.orderInfo.addressAll = str.replace(" ","") + self.orderDetailModel.orderInfo.address;
            }

            if (self.orderDetailModel.orderInfo.orderStatus == 1)
            {
                self.orderDetailModel.orderInfo.orderTypeText = "等待付款";
                self.orderDetailModel.showLogistics = false;
                self.orderDetailModel.unPay = true;

                //待付款剩余时间
                if(self.orderDetailModel.orderInfo.orderType == 2)
                {
                	var endTime = parseInt(self.orderDetailModel.orderInfo.orderGoods[0].add_time) + 60*60*72;
                    var lastTime = parseInt(endTime) - parseInt(self.orderDetailModel.orderInfo.orderGoods[0].add_time);
                }
                else
                {
                	var endTime = parseInt(self.orderDetailModel.orderInfo.orderGoods[0].create_time) + 60*60*72;
                    var lastTime = parseInt(endTime) - parseInt(self.orderDetailModel.orderInfo.orderGoods[0].create_time);
                }
                self.orderDetailModel.lastTime = self.countDown(lastTime);
            }
            else if (self.orderDetailModel.orderInfo.orderStatus == 2)
            {
                self.orderDetailModel.orderInfo.orderTypeText = "等待发货";
                self.orderDetailModel.showLogistics = false;
                self.orderDetailModel.orderIsDone = false;
            }
            else if (self.orderDetailModel.orderInfo.orderStatus == 3)
            {
                self.orderDetailModel.orderInfo.orderTypeText = "等待收货";
                self.orderDetailModel.showLogistics = true;
                self.orderDetailModel.orderIsDone = false;
            }
            else if (self.orderDetailModel.orderInfo.orderStatus == 4)
            {
                self.orderDetailModel.orderInfo.orderTypeText = "在线交易成功";
                self.orderDetailModel.showLogistics = true;
                self.orderDetailModel.orderIsDone = false;
            }
            else
            {   
            	
            	self.orderDetailModel.orderInfo.orderTypeText = "已取消";
                self.orderDetailModel.unPay = false;
                self.orderDetailModel.showLogistics = false;
            }
            if(self.orderDetailModel.orderInfo.deliveryType == 1 && self.orderDetailModel.orderInfo.orderStatus == 1)
            {   
            	self.orderDetailModel.orderInfo.orderTypeText = "申请已提交，待交易";
            	self.orderDetailModel.unPay = false;
            	self.orderDetailModel.showLogistics = false;
            }
            else if(self.orderDetailModel.orderInfo.deliveryType == 1 && self.orderDetailModel.orderInfo.orderStatus == 4)
            {
            	self.orderDetailModel.orderInfo.orderTypeText = "当面付交易已完成";
            	self.orderDetailModel.unPay = false;
            	self.orderDetailModel.showLogistics = false;
            }
            else if(self.orderDetailModel.orderInfo.deliveryType == 1 && self.orderDetailModel.orderInfo.orderStatus == 0)
            {
            	self.orderDetailModel.orderInfo.orderTypeText = "当面付交易已取消";
            	self.orderDetailModel.unPay = false;
            	self.orderDetailModel.showLogistics = false;
            }
//          if(!commonFu.isEmpty(self.orderDetailModel.orderInfo) && !commonFu.isEmpty(self.orderDetailModel.orderInfo.orderGoods[0]))
//          {
//          	self.orderDetailModel.orderInfo.orderGoods[0].goods_pics = JSON.parse(self.orderDetailModel.orderInfo.orderGoods[0].goods_pics);
//          }

            self.isMoreThanPrice = commonFu.toDecimals(parseFloat(self.orderDetailModel.orderInfo.prepaidPrice) - parseFloat(self.orderDetailModel.orderInfo.goodsPrice)) ; 
          
            self.scope.isMoreThanPrice = self.isMoreThanPrice;
            if(self.orderDetailModel.orderInfo.payType == 3 && self.orderDetailModel.orderInfo.province =='')
            {
            	$(".accept-detail").css("display","none")
            }
            self.getTraceList();

            $('.animation').css('display','none');
            $('.container').css('opacity','1');
            self.scope.$apply();
            
            self.setTimeToSeeOrDer();
        })
    },
    
    
     setTimeToSeeOrDer : function()
    {
    	var self = this;
    	if(self.orderDetailModel.orderInfo.orderType == 2 && (self.orderDetailModel.orderInfo.payType == 6 || self.orderDetailModel.orderInfo.payType == 7 || self.orderDetailModel.orderInfo.payType == 5))
    	{
	    		var timer6 =  setInterval(function(){
	    		    var param = {
	                   order_no : self.orderDetailModel.order_no
	                };
	
			        jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_ORDER_INFO, param, function(data) {
			        	
			        	var judje = data.orderInfo.orderStatus;
			        	if(judje == 1)
			        	{
			        		
			        		self.orderDetailModel.unPay = true;
			        		self.scope.orderDetailModel.unPay = self.orderDetailModel.unPay;
			        		self.orderDetailModel.orderInfo.orderTypeText = "等待付款";
			        		self.scope.orderDetailModel.orderInfo.orderTypeText = self.orderDetailModel.orderInfo.orderTypeText;
			        	    self.scope.$apply();
			        	   
			        	}
			        	else
			        	{
			        		self.orderDetailModel.unPay = false;
			        		self.scope.orderDetailModel.unPay = self.orderDetailModel.unPay;
			        		if(judje == 2)
			        		{
			        			self.orderDetailModel.orderInfo.orderTypeText = "等待发货";
			        			self.scope.orderDetailModel.orderInfo.orderTypeText = self.orderDetailModel.orderInfo.orderTypeText;
			        		}
			        		
			        	    self.scope.$apply();
			        	    if(judje == 3 || judje == 4 || judje == 0)
			        	    {
			        	    	  clearInterval(timer6);
			        	    }
//			        	  
			        	}
			        	
			        })
	    		
	    		},1000);
    	
    	}
    	
    	
    	
    },
    
    //设置地址
    setAddress: function(){
        var self = this;

        var params = {
            order_no: self.orderDetailModel.order_no,
            address: self.orderDetailModel.addressId
        };
        jqAjaxRequest.asyncAjaxRequest(apiUrl.API_SET_SHIPPING_ADDRESS, params, function(){
            self.getOrderInfo();
        })
    },

    //获取当前用户余额
    getUserInfo: function(){
        var self = this;
        jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
            self.orderDetailModel.balance = data.userInfo.balance;
            self.orderDetailModel.userId = data.userInfo.userId;
            self.scope.$apply();
        })
    },
    
    //倒计时
    countDown: function(timeStamp) {
    	var timer = setInterval(function ()
		{
			if(timeStamp <= 0)
			{
				clearInterval(timer);
			}
			timeStamp--;
		},1000);
    	
    	return Math.ceil(timeStamp/60/60);
    },
    
    //获取物流信息
    getTraceList: function() {
    	var self = this;
    	
    	var param = {
    		order_no : self.orderDetailModel.order_no
    	};
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_ORDER_LOGISTICS_INFO, param, function(data) {
    		self.traces = [];
//          console.log("gdfdgdfgdf"+JSON.stringify(data))
    		self.traces = data.traces;
    		
    		if (!commonFu.isEmpty(self.traces) && self.traces.length > 0)
    		{
    			self.traces[0].lastLogStyle = "logistics-active";
    			self.traces[0].logisticsPic = "../img/personCenter/logistics_active.png";
    			for (var i = 1 ; i < self.traces.length; i ++)
	    		{
	    			self.traces[i].lastLogStyle = '';
	    			self.traces[i].logisticsPic = "../img/personCenter/logistics_noactive.png";
	    		}
	    		self.scope.traces = self.traces;
    			self.scope.$apply();
    		}
    		
    		
    	})
    },
    
    
    bindClick: function() {
    	var self = this;
        
        //选择付款方式
        self.scope.fastOrFace= function(type){
        	
        	if(type == 0)
        	{
        		$("#fastSend").addClass("sen-check");
        		$("#faceSend").removeClass("sen-check");
        		self.faceOrFast = false;
        		if(!self.faceOrFast)
        		{
        			$("#go-to-pay").css({"display":"block"})
        			$("#up-data").css({"display":"none"})
        		}
        	}
        	else
        	{
        		$("#fastSend").removeClass("sen-check");
        		$("#faceSend").addClass("sen-check");
        		self.faceOrFast = true;
        		if(self.faceOrFast)
        		{
        			$("#go-to-pay").css({"display":"none"})
        			$("#up-data").css({"display":"block"})
        		}
        	}
        
        };
       
        
        self.scope.hideIt = function(){
        	
        	
        	$("#shenqing").css({"display":"none"});
        	
	        self.initData();
	        
        };
        
        //确认收货
    	self.scope.onClickToConfirmReceipt = function()
    	{
    		var param =
    		{
    			order_no : self.orderDetailModel.order_no
    		};
    		
    		$confirmDialog.show("确认收到藏品，再点击收货哦",function()
    		{
    			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_ORDER_CONFIRM_RECEIPT, param, function(data)
	    		{
	    			$confirmTip.show("确认收货成功");
	    			self.getOrderInfo()
	    		})
    		})
    	};
        
        
        //选择地址
        self.scope.selAddress = function(){
            if (self.orderDetailModel.orderIsDone) //订单已生成并且未发货之前都可以修改地址
            {
               
                localStorage.setItem(localStorageKey.IS_ADDRESS, 1); //设置地址标志
                var obj = new Base64();
//              alert(self.orderDetailModel.userId)
                var thisDataId = obj.encode(self.orderDetailModel.userId);
                
			    var str = pageUrl.MY_ADDRESS_LIST + "?userId=" + thisDataId;
                location.href = encodeURI(str);
                
                
//              location.href = pageUrl.MY_ADDRESS_LIST + "?userId=" + self.orderDetailModel.userId;
            }
        };

        //支付订单
    	self.scope.onClickToPayOrder = function(type)
    	{
    		var params = {};
	        params.order_no = self.orderDetailModel.order_no;
	        params.deliveryType  = JSON.stringify(type);
	
    		if(type == 1)
    		{
    			self.sendMessage(params,type);
    		}
    		else
    		{
    			
    			if(self.goodsOrderType == 1)
    			{
    				
    				var obj = new Base64();
    				var ids = obj.encode('2');
    				var str = pageUrl.MY_PAY_ORDER_PAGE + "?comfromSpecial=" + ids;
    				location.href = encodeURI(str);
//  				location.href = pageUrl.MY_PAY_ORDER_PAGE + "?comfromSpecial=" + 2;
    			}
    			else
    			{   
    				
    				if(self.orderDetailModel.orderInfo.payType == 3)
    				{
    					var obj = new Base64();
	    				var ids = obj.encode('2');
	    				var str = pageUrl.MY_PAY_ORDER_PAGE + "?comfromSpecial=" + ids;
	    				location.href = encodeURI(str);
    				}
    				else if(self.orderDetailModel.orderInfo.payType == 5 || self.orderDetailModel.orderInfo.payType == 6 || self.orderDetailModel.orderInfo.payType == 7)
    				{
		    					jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PERSONALDATA, {}, function(data){
    			
    			                    var  hasAddress = false;
					    			if(commonFu.isEmpty(data.shippingAddress))
					    			{
					    				hasAddress = false;
					    			}
					    		    else
					    		    {   
					    		    	for(var g = 0 ; g < data.shippingAddress.length; g++)
					    		    	{
					    		    		if(data.shippingAddress[g].isCommon == 1)
						    		    	{
						    		    		hasAddress = true;
						    		    	}
					    		    	}
    		    	
					    		    
					    		    }
					    		    
					    		    if(hasAddress)
						    		{
						    			var returnurl = '';
	    			    
					    			     
					    			    if(location.href.indexOf("yawan365") == -1)
					    			    {
					    			    	
					    			    	
					    			    	returnurl = "http://192.168.0.163/auction/personCenter/orderDetail.html";
					    			    }
					    			    else{
					    			    	if(location.href.indexOf("8080") == -1)
						    			    {
						    			    	returnurl = "http://www.yawan365.com/personCenter/orderDetail.html";
						    			    }
						    			    else
						    			    {
						    			    	
						    			    	returnurl = "http://www.yawan365.com:8080/personCenter/orderDetail.html";
						    			    }
					    			    }
	    			    
											if(self.isWeiXin())
											{
												
												if(self.orderDetailModel.orderInfo.payType == 7)
												{
													
													var params = {};
													params.order_no = self.orderDetailModel.order_no;
													params.returnUrl = returnurl;
	//												
													jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GO_ON_PAY, params, function(data){
														
														   if(!commonFu.isEmpty(data.params))
														   {
	//													   	    alert(JSON.stringify(data))
	//													   	    console.log(JSON.stringify(data))
														   	    document.fm.version.value = data.params.version;
														   	    document.fm.merchantId.value = data.params.merchantId;
														   	    document.fm.merchantTime.value = data.params.merchantTime;
														   	    document.fm.traceNO.value = data.params.traceNO;
														   	    document.fm.requestAmount.value = data.params.requestAmount;
														   	    document.fm.paymentCount.value = data.params.paymentCount;
														   	    document.fm.payment_1.value = data.params.payment_1;
														   	    document.fm.payment_2.value = data.params.payment_2;
														   	    document.fm.returnUrl.value = data.params.returnUrl;
														   	    document.fm.notifyUrl.value = data.params.notifyUrl;
														   	    document.fm.goodsName.value = data.params.goodsName;
														   	    document.fm.goodsCount.value = data.params.goodsCount;
														   	    document.fm.ip.value = data.params.ip;
														   	    document.fm.extend.value = data.params.extend;
														   	    document.fm.sign.value = data.params.sign;
													   	       
														   	    document.fm.submit();
														   	  
															    sessionStorage.setItem("payOrderId",data.order_no)
						                                        
														   }
														
													})
												}
												else{
													$dialog.msg("请到微信之外的浏览器继续支付！")
												}
					//							alert("微信浏览器")
												
											}
											else
											{
												
												
												if(self.orderDetailModel.orderInfo.payType == 5)
												{
													 	var params = {};
														params.order_no = self.orderDetailModel.order_no;
														params.returnUrl = returnurl;
							
														jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GO_ON_PAY, params, function(data){
															
							//								alert(JSON.stringify(data))
															if(!commonFu.isEmpty(data.url))
															{
																
																location.href = data.url;
																
//																sessionStorage.setItem("payOrderId",data.order_no)
															}
															
														
							//								alert(JSON.stringify(data))
														})
												}
												else if(self.orderDetailModel.orderInfo.payType == 6)
												{
													    var params = {};
														params.order_no = self.orderDetailModel.order_no;
														params.returnUrl = returnurl;
							
														jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GO_ON_PAY, params, function(data){
															
							
															if(!commonFu.isEmpty(data.url))
															{
																
																location.href = data.url;
																
//																sessionStorage.setItem("payOrderId",data.order_no)
															}
															
														
							
														})
												}
					                            else{
					                            	
					                            	$dialog.msg("请到微信公众号中支付！");
					                            }
												//订单详情页面删除缓存，地址列表页面删除缓存，商品详情删除缓存，微信公众号支付删除缓存，自定义返回方法处删除缓存
												
											}
						    		}
						    		else{
						    			
						    			
						    	            $dialog.msg("请到个人中心设置您的默认收货地址！");
							    		
						    		
						    		}
					    		 
					    		}) 
    				}
    				
//  				location.href = pageUrl.MY_PAY_ORDER_PAGE + "?comfromSpecial=" + 3;
    			}
//  			if (!self.orderDetailModel.noReceipt)
//  			{
//  				$dialog.msg("请先完善收货地址再付款");
//  			}
//  			else
//	            {
//	                if(parseFloat(self.orderDetailModel.balance)  >= parseFloat(self.orderDetailModel.orderInfo.payPrice)) //余额大于实付金额直接掉接口否则取充值界面
//	                {
//	                    self.sendMessage(params,type);
//	                }
//	                else
//	                {
//	                    location.href = pageUrl.ACCOUNT_RECHARGE;
//	                }
//	            }
    		}
       };
    },
    
    
     isWeiXin : function(){
			var ua = window.navigator.userAgent.toLowerCase(); 
			
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				return true; 
			}else
			{
				return false; 
			} 
	    },
    
    sendMessage : function(params,type){
    	
    	var self = this;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_PAY_ORDER, params, function(){
	        
	        if(type == 1)
	        { 
	        	self.orderDetailModel.unPay = false;
	        	$("#shenqing").css({"display":"block"})
	        }
//	        else
//	        {   
//	        	//付款成功后操作
//	            $dialog.msg("付款成功", 1);          	
//	            setTimeout(function(){
//	                location.href = pageUrl.MY_ORDER_LIST + "?orderType=" + ""; //付款成功后跳到全部订单
//	            },1000);
//	        }
//	
	    })
    },
    
    ngRepeatFinish: function() {
    	
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){});
    }
};
