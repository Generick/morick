
app.controller('specialctrl',function($scope){
	localStorage.removeItem("wxAddressEmpty");
	specialPageController.init($scope);
	
})

var specialPageController = 
{
	scope : null,
	
	isSelected : true,
	
	isShowZhiFuBao : false,
	
	hasAddress : false,
	
	showPrice: null,
	
	buyNumber : 1,
	
	commId : null,
	
	userId : null,
	
	underPay : 0,
	
	detailPage : null,
	
	commPrice : null,
	
	
	
	init : function($scope){
		
		this.scope = $scope;
		
		this.isWeiXin();
		
		this.scope.isShowZhiFuBao = this.isShowZhiFuBao;
		
		this.getUrlAndId();
		
		this.getData();
		
		this.eventBind();
		
		
		if(!commonFu.isEmpty(sessionStorage.getItem("payOrderId")))
		{
			
			setInterval(function(){
				localStorage.setItem(localStorageKey.orderNo,sessionStorage.getItem("payOrderId"));
	//			sessionStorage.removeItem("payOrderId");
				
				location.href = pageUrl.ORDER_DETAIL;
				localStorage.setItem("comewidthgoto",8)
			},350);
			
		
			
		}
		
	     
        				
        	
//		alert(localStorage.getItem("sbbb"))
	},
	
	  getUrlAndId : function(){
    	$('.container').css('opacity','0');
    	
    	$('.animation').css('display','block');
    	var self = this;
    	self.detailPage = localStorage.getItem("thisAcPage");
		self.commId = localStorage.getItem("commodifyId");
		if(sessionStorage.getItem("buyGoodsNumber") == null || sessionStorage.getItem("buyGoodsNumber") == undefined)
		{
			self.buyNumber = 1;
		}
		else
		{
			self.buyNumber = parseInt(sessionStorage.getItem("buyGoodsNumber"));
		}
		self.scope.buyNumber = self.buyNumber;
	    self.getSelfInfo()    
			    
//  	self.commId = commonFu.getQueryStringByKey("commodifyId");
//
//  	self.commPrice = commonFu.getQueryStringByKey("specialPrice");
//  	self.detailPage = localStorage.getItem("thisAcPage");
    	
//  	self.scope.commPrice = self.commPrice;
    	
    },
   
   
    
    getSelfInfo : function(){
    	var self = this;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
    		self.commPrice  = localStorage.getItem("specialPrice");
    		self.userId = data.userInfo.userId;
    		if(commonFu.isEmpty(sessionStorage.getItem("stampTime")))
		    {
		    	var param = {};
    	        param.commodity_id = self.commId;
		    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SPECIAL_SALE_DETAIL, param, function(data){
		   
	            	var stampTimes = commonFu.getTimeStamp(); 
	            	sessionStorage.setItem("stampTime",stampTimes);
	            	localStorage.setItem("stampTime",stampTimes);
	            	self.commPrice =  (Math.floor(100 * data.info.commodity_price *(1 +  ((stampTimes - data.info.up_time)/60) * (data.info.annualized_return*0.01/(commonFu.isSmoothYear()*1440)))))/100;
	                self.commPrice = commonFu.toDecimals(self.commPrice);
	                localStorage.setItem("specialPrice",self.commPrice);
		    	    self.scope.commPrice = self.commPrice;
//		    	    self.scope.$apply()
		    	})
		    }
		    else{
		    	self.scope.commPrice = self.commPrice;
		    }
		    self.showPrice = Math.floor(self.commPrice) * self.buyNumber;
		    self.scope.showPrice = self.showPrice;
		    self.scope.$apply();
		    
			$('.container').css('opacity','1');
	    	
	    	$('.animation').css('display','none');
    	})
    	
    },
	
	
	getData : function(){
		
		var self = this;
		document.title = "支付订单";
		
	},
	
	eventBind : function(){
		
		var self = this;
		
//		self.scope.chooseIt = function(){
//			
//			self.isSelected = !self.isSelected;
//			
//			if(self.isSelected)
//			{   
//				$(".pay-special-choose-checkbox").addClass("pay-special-choose-checkbox-hasSel").removeClass("pay-special-choose-checkbox-unSel");
//			}
//			else
//			{
//				$(".pay-special-choose-checkbox").addClass("pay-special-choose-checkbox-unSel").removeClass("pay-special-choose-checkbox-hasSel");
//			}
//			
//		};
		
		self.scope.chooseIt = function(type){
			
			if(type== 0)
			{
				self.underPay = 0;
				$("#zhifubaopay").removeClass("check-add-class");
				$("#peoplepay").addClass("check-add-class");
				$("#selfpay").removeClass("check-add-class");
			}
			else if(type == 1)
			{
				self.underPay = 1;
				$("#zhifubaopay").removeClass("check-add-class");
				$("#peoplepay").removeClass("check-add-class");
				$("#selfpay").addClass("check-add-class");
			}
			else{
				self.underPay = 2;
				$("#selfpay").removeClass("check-add-class");
				$("#peoplepay").removeClass("check-add-class");
				$("#zhifubaopay").addClass("check-add-class");
			}
//			alert(self.underPay)
		};
		
		self.scope.underLinePay = function(){
			
			if(self.underPay == 0)
			{
				var stampTime = localStorage.getItem("stampTime");
		    
			    var params = {};
			    params.userId = self.userId;
			    params.commodity_id = self.commId;
		    	params.clientPrice = Math.floor(self.commPrice);
		        params.clientTime = stampTime;
		        params.buyNum = self.buyNumber;
	            jqAjaxRequest.asyncAjaxRequest(apiUrl.API_BUY_SPECIAL_THING,params, function(data){
				
					localStorage.setItem("toseeOrder",data.order_no);
					
					var obj = new Base64();
						   	
					var id_base64 = obj.encode("3");
		
					var str =  pageUrl.MY_PAY_ORDER_PAGE + "?comfromSpecial=" + id_base64;		    	
									
					location.href = encodeURI(str);
				
				})
			}
			
		  else
		  {
//		  	   $dialog.msg("此功能暂未开通");
		  	   self.weiXinPay();
		  }
		 
		};
		
		
		self.scope.payForComm = function(){
			
			if(!self.isSelected)
    		{
    			$dialog.msg("请选择支付方式");
    			return;
    		}
			var params = {};
    		
    		params.userId = self.userId;
    		params.commodity_id = self.commId;
    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_BUY_SPECIAL_THING, params, function(data){
    		
    		
    		    $dialog.msg("支付成功");
    		    setTimeout(function(){
    		    	location.href = pageUrl.PERSON_CENTER;
    		    },2000)
    		   
    	    }
    	   	 
    	   )
    		
		}
	},
	
	
	weiXinPay : function(){
			
			var self = this;    	    
    	    sessionStorage.removeItem("payOrderId");
    	    jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PERSONALDATA, {}, function(data){
    			
    			
    			if(commonFu.isEmpty(data.shippingAddress))
    			{
    				self.hasAddress = false;
    			}
    		    else
    		    {   
    		    	
    		    	
    		    	for(var g = 0 ; g < data.shippingAddress.length; g++)
    		    	{
    		    		if(data.shippingAddress[g].isCommon == 1)
	    		    	{
	    		    		self.hasAddress = true;
	    		    	}
    		    	}
    		    	
    		    	
    		    }
    		    
    		    if(self.hasAddress)
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
							sessionStorage.removeItem("payOrderId");
//							alert("微信浏览器")
							var stampTime = localStorage.getItem("stampTime");
							var params = {};
							params.userId = self.userId;
							params.commodity_id = self.commId;
							params.clientPrice = Math.floor(self.commPrice);
							params.clientTime = stampTime;
							params.buyNum = self.buyNumber;
							params.payEnv = 7;
							params.returnUrl = returnurl;
//							console.log(JSON.stringify(params))
                            
							jqAjaxRequest.asyncAjaxRequest(apiUrl.API_PAY_COMMDIFY, params, function(data){
								
								   if(!commonFu.isEmpty(data.params))
								   {
								   	    
								   	    console.log(JSON.stringify(data))
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
								   	    localStorage.removeItem(localStorageKey.orderNo);
								   	    localStorage.setItem(localStorageKey.orderNo,data.order_no);
									    sessionStorage.setItem("payOrderId",data.order_no)
                                        
								   }
								
							})
						}
						else
						{
							
//							alert(333)
							if(self.underPay == 1)
							{
//								alert("其他浏览器")
//								alert(self.underPay)
								var stampTime = localStorage.getItem("stampTime");
								var params = {};
								params.userId = self.userId;
								params.commodity_id = self.commId;
								params.clientPrice = Math.floor(self.commPrice);
								params.clientTime = stampTime;
								params.buyNum = self.buyNumber;
								params.payEnv = 5;
								params.returnUrl = returnurl;
//								alert(JSON.stringify(params))
								
								jqAjaxRequest.asyncAjaxRequest(apiUrl.API_PAY_COMMDIFY, params, function(data){
									
	//								alert(JSON.stringify(data))
									if(!commonFu.isEmpty(data.url))
									{ 
										location.href = data.url;
										localStorage.removeItem(localStorageKey.orderNo);
								   	    localStorage.setItem(localStorageKey.orderNo,data.order_no);
										sessionStorage.setItem("payOrderId",data.order_no)
									}
									
								
	//								alert(JSON.stringify(data))
								})
							
							}
							else if(self.underPay == 2)
							{
								var stampTime = localStorage.getItem("stampTime");
								var params = {};
								params.userId = self.userId;
								params.commodity_id = self.commId;
								params.clientPrice = Math.floor(self.commPrice);
								params.clientTime = stampTime;
								params.buyNum = self.buyNumber;
								params.payEnv = 6;
								params.returnUrl = returnurl;
//								alert(JSON.stringify(params))

								
								jqAjaxRequest.asyncAjaxRequest(apiUrl.API_PAY_COMMDIFY, params, function(data){
//									alert(JSON.stringify(data))
	//								alert(JSON.stringify(data))
									if(!commonFu.isEmpty(data.url))
									{
										location.href = data.url;
										localStorage.removeItem(localStorageKey.orderNo);
								   	    localStorage.setItem(localStorageKey.orderNo,data.order_no);
										sessionStorage.setItem("payOrderId",data.order_no)
									}
									
								
	//								alert(JSON.stringify(data))
								})
							}
//							
							//订单详情页面删除缓存，地址列表页面删除缓存，商品详情删除缓存，微信公众号支付删除缓存，自定义返回方法处删除缓存
							
						}
	    		}
	    		else{
	    			
	    			
	    			
	    			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
	    		
	    		        self.userId = data.userInfo.userId;
	    	            $dialog.msg("请先设置您的默认地址！");
		    			setTimeout(function(){
		    				
		    				sessionStorage.removeItem("payOrderId");
		    				localStorage.setItem(localStorageKey.TO_ADDRESS_TYPE, 3); //判断从哪里进入地址列表
			                localStorage.setItem("specialPrice",self.commPrice);
			               
			                localStorage.setItem("wxAddressEmpty",1);
			                
			                var obj = new Base64();
			                var ids = obj.encode(self.userId);
			                var str = pageUrl.MY_ADDRESS_LIST + "?userId=" + ids;
			                location.href = encodeURI(str)
			                
//			                location.href = pageUrl.MY_ADDRESS_LIST +  "?userId=" + self.userId;
			                
		    			},1200)
	    	     
	    	        })
	    		
	    		}
    		 
    		}) 
			
			
		},
	
	
	    isWeiXin : function(){
	    	
	    	var self = this;
			var ua = window.navigator.userAgent.toLowerCase(); 
			
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				self.isShowZhiFuBao = false;
				self.scope.isShowZhiFuBao = self.isShowZhiFuBao;
				return true;
			}else
			{   
				self.isShowZhiFuBao = true;
				self.scope.isShowZhiFuBao = self.isShowZhiFuBao;
				return false; 
			} 
	    },
	
	
};


