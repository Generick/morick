/*
 * 订单详情
 */
app.controller("ctrl", function($scope) {
    OrderDetailCtrl.init($scope);
});

var OrderDetailCtrl = {
    scope : null,
    
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
    
   
    faceOrFast : false,
    
    traces: [],//物流信息
    
    init: function ($scope) {
    	this.scope = $scope;
         
        this.scope.orderDetailModel = this.orderDetailModel;
        
        this.initData();
        
        localStorage.removeItem(localStorageKey.IS_ADDRESS); //每次进来清除地址标志
    	
    	this.bindClick();

        this.ngRepeatFinish();

        this.getUserInfo();
    },

    //初始化数据
    initData: function() {
        var self = this;

        $('.animation').css('display','block');
    	self.orderDetailModel.order_no = localStorage.getItem(localStorageKey.orderNo);
        self.orderDetailModel.addressId = commonFu.getQueryStringByKey("addressId");

        if(!commonFu.isEmpty(self.orderDetailModel.addressId)){ //有地址ID就掉接口修改没有直接掉订单接口
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
                self.orderDetailModel.showLogistics = true;
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
           

            self.getTraceList();

            $('.animation').css('display','none');
            $('.container').css('opacity','1');
            self.scope.$apply();
        })
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
        
        //选择地址
        self.scope.selAddress = function(){
            if (self.orderDetailModel.orderIsDone) //订单已生成并且未发货之前都可以修改地址
            {
                localStorage.setItem(localStorageKey.TO_ADDRESS_TYPE, 1); //判断从哪里进入地址列表
                localStorage.setItem(localStorageKey.IS_ADDRESS, 1); //设置地址标志
                location.href = pageUrl.MY_ADDRESS_LIST + "?userId=" + self.orderDetailModel.userId;
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
    			
    			location.href = pageUrl.MY_PAY_ORDER_PAGE;
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
