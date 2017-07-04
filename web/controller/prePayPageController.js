
app.controller('specialctrl',function($scope){
	localStorage.removeItem("wxAddressEmpty");
	specialPageController.init($scope);
	
})


var specialPageController = 
{
	scope : null,
	
	isSelected : true,
	
	hasAddress : false,
	
	showPrice: null,
	
	buyNumber : 1,
	
	commId : null,
	
	userId : null,
	
	underPay : true,
	
	detailPage : null,
	
	commPrice : null,
	
	init : function($scope){
		
		this.scope = $scope;
		
		this.getUrlAndId();
		
		this.getData();
		
		this.eventBind();
		
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
		
		self.scope.chooseIt = function(){
			
			self.isSelected = !self.isSelected;
			
			if(self.isSelected)
			{   
				$(".pay-special-choose-checkbox").addClass("pay-special-choose-checkbox-hasSel").removeClass("pay-special-choose-checkbox-unSel");
			}
			else
			{
				$(".pay-special-choose-checkbox").addClass("pay-special-choose-checkbox-unSel").removeClass("pay-special-choose-checkbox-hasSel");
			}
			
		};
		
		self.scope.chooseIt = function(type){
			
			if(type== 0)
			{
				self.underPay = true;
				$("#peoplepay").addClass("check-add-class");
				$("#selfpay").removeClass("check-add-class");
			}
			else
			{
				self.underPay = false;
				$("#peoplepay").removeClass("check-add-class");
				$("#selfpay").addClass("check-add-class");
			}
		};
		
		self.scope.underLinePay = function(){
			
			if(self.underPay)
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
//						alert(id_base64)			
					var str =  pageUrl.MY_PAY_ORDER_PAGE + "?comfromSpecial=" + id_base64;		    	
									
					location.href = encodeURI(str);
//					
//					
//					location.href = pageUrl.MY_PAY_ORDER_PAGE + "?comfromSpecial=" + 1;
						
				})
			}
			
		  else{
		  	   $dialog.msg("此功能暂未开通")
		  }
		};
		
		
		
		self.scope.weiXinPay = function(){
			
			    	    
    	    
    	    jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PERSONALDATA, {}, function(data){
    			
    			
    			if(commonFu.isEmpty(data.shippingAddress))
    			{
    				self.hasAddress = false;
    			}
    		    else
    		    {
    		    	self.hasAddress = true;
    		    }
    		    
    		    if(self.hasAddress)
	    		{

		    		var params= {};
			    	params.money = self.commPrice;
			       
			    	//输入金额合法后，调后台接口
			    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_RECHARGE, params, function(data)
			    	{

						if(data == null || data == "")
						{
						    return;
						}   
			    		//当从后台得到商品单号等数据后，跳转到微信授权页面进行授权，带过去的参数有，单号的id，交易金额price
			    		var total = parseInt(data.rechargeInfo.price) * 100;
			    		location.href = pageUrl.TO_WX_LOGIN + "?rechargeId=" + data.rechargeInfo.rechargeId + "&price=" + total;
		
			    	});  
		    		
	    		}
	    		else{
	    			
	    			
	    			
//	    			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
//	    		
//	    		        self.userId = data.userInfo.userId;
//	    	            $dialog.msg("请先完善您的个人收货地址！");
//		    			setTimeout(function(){
//		    				
//		    				localStorage.setItem(localStorageKey.TO_ADDRESS_TYPE, 3); //判断从哪里进入地址列表
//			                localStorage.setItem("specialPrice",self.commPrice);
//			               
//			                localStorage.setItem("wxAddressEmpty",1)
//			                location.href = pageUrl.MY_ADDRESS_LIST +  "?userId=" + self.userId;
//			                
//		    			},1500)
//	    	     
//	    	        })
	    		
	    		}
    		 
    		}) 
			
			
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
	}
};
