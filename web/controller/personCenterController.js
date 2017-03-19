/*
 * 账户中心
 */
app.controller("ctrl", function ($scope)
{  
	
	sessionStorage.removeItem("comeIntoOrder")
    PersonCenterCtrl.init($scope);
   
});

var PersonCenterCtrl =
{
    scope : null,
    
    messageCenterModel :{
    	messageList : [],
    
    	
    },
    
    personCenterModel : 
    {
    	userId : null,
    	userInfo : {}
    },
    
    init : function ($scope)
    {
    	this.scope = $scope;

    	this.bindClick();
    	
    	this.initData();

        initTab.start(this.scope, -1); //底部导航
    },
    
    initData : function ()
    {
    	var self = this;

    	$('.animation').show();
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
   			
    		self.personCenterModel.userInfo = [];
    		self.personCenterModel.userInfo = data.userInfo;
    		self.personCenterModel.userId = self.personCenterModel.userInfo.userId;
    		
    		if (self.personCenterModel.userInfo.gender == 1)
    		{
    			self.personCenterModel.userInfo.genderIcon = "img/personCenter/male.png";
    		    
    		    if (self.personCenterModel.userInfo.smallIcon == "")
    		    {
    			    self.personCenterModel.userInfo.smallIcon = "img/personCenter/default-male.png";
    		    }
    		}
    		else
    		{   
    			self.personCenterModel.userInfo.genderIcon = "img/personCenter/female.png";
    			
    			if (self.personCenterModel.userInfo.smallIcon == "")
    		    {
    				self.personCenterModel.userInfo.smallIcon = "img/personCenter/default-fmale.png";
    		    }
    		}

    		$('.animation').hide();
    		$('.container').css('opacity','1');
    		
            self.getMessageList();
    		self.scope.personCenterModel = self.personCenterModel;
    		self.scope.$apply();
    	})
    },
    
    //获取消息列表
    getMessageList : function(){
    	
    	var self = this;
    	var params = {};
    	params.userId = self.personCenterModel.userId;
    	params.startIndex = 0;
    	params.num = 0;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_MY_MESSAGELIST, params, function(data){
//  		alert(JSON.stringify(data))
            if(!commonFu.isEmpty(data.data))
            {   
				
            	self.messageCenterModel.messageList = data.data;
	    		
            }
  		    self.scope.messageCenterModel = self.messageCenterModel;
	    	self.scope.$apply();
    	});
    
    },
    
    userHasReadMessage : function(data){
    	
    	var self = this;
    	var params = data;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_HAS_READ_MESSAGE, params, function(data){
 
    	});
 
    },
    
    
    bindClick  : function ()
    {
    	var self = this;
        
        //跳到消息对应页面
        
        self.scope.jumpToPage = function(item){
           
            var params = {};
            params.userId = self.personCenterModel.userId;
            params.msg_id = item.msg_id;
            params.msg_type = item.msg_type;
            params.href_id = item.href_id;
        	
        	if(item.msg_type == 0)
        	{   

        		
        	    setTimeout(function(){
	       		 	
        			location.href = pageUrl.MY_MESSAGE;
        				
        		},250)
        	}
        	else if(item.msg_type == 1)
        	{    
        		
        		if(item.isRead == 0)
        		{
        			self.userHasReadMessage(params);
        		}
        		sessionStorage.setItem("comeWithGuess",4)
        		setTimeout(function(){
	       		 	
        				location.href = pageUrl.GUESS_INNER +"?id="+ item.href_id + "&page=" + 1;
        				
        		},250)
        	    
					
        	}
        	else if(item.msg_type == 2)
        	{   
        		
        		if(item.isRead == 0)
        		{
        			self.userHasReadMessage(params);
        		}
//      		sessionStorage.setItem("comeWithGuess",4)
//      		
//      	    setTimeout(function(){
//	       		 	
//      			location.href = pageUrl.AUCTION_HISTORY_INFO  +"?id="+ item.href_id + "&page=" + 1;
//      				
//      		},250)
        	    
        	    
        	    sessionStorage.setItem("comeIntoOrder",1)
        		localStorage.setItem(localStorageKey.orderNo, item.href_id);
         		
                setTimeout(function(){
	       		 	
        			location.href = pageUrl.ORDER_DETAIL +"?id="+ item.href_id;
        				
        		},250)
        	}
        	else if(item.msg_type == 3)
        	{    
        		if(item.isRead == 0)
        		{
        			self.userHasReadMessage(params);
        		}
        		sessionStorage.setItem("comeIntoOrder",1)
        		localStorage.setItem(localStorageKey.orderNo, item.href_id);
         		
                setTimeout(function(){
	       		 	
        			location.href = pageUrl.ORDER_DETAIL +"?id="+ item.href_id;
        				
        		},250)
        
        	}
        };
        
         //我的消息
        self.scope.jumpToMessage = function(){
        	
        	location.href = pageUrl.MY_MESSAGE;
        };

        //悬浮框出现
        self.scope.showMyHead = function()
        {
        	$("#fixed-myOwn").show();
        	$("#suspend-head").addClass("slideLeft");
        	
        };
        
        //悬浮框隐藏
        self.scope.hideMyHead = function(type){
        	
        	if(type == 0)
        	{
        		$("#fixed-myOwn").hide();
        		$("#suspend-head").removeClass("slideLeft");
        	}
        	else
        	{   
	        	location.href = "login.html";
        	}
        	
        };
    
    	//个人信息
    	self.scope.onClickToPersonInfo = function()
    	{
    		location.href = pageUrl.PERSON_INFO;
    	};
    	
    	//我的竞猜列表
    	
    	self.scope.onClickToMyGuessList = function(){
    		
    		location.href = pageUrl.MY_GUESS_LIST  + "?userId=" + self.personCenterModel.userId;
    		
    	};
    	
    	//我的账户
    	self.scope.onClickToMyAccount = function()
    	{
    		location.href = pageUrl.MY_ACCOUNT;
    	};
        
        //我的客服
        self.scope.onClickToMyCustomer = function(){
        	
        	location.href = pageUrl.MY_CUSTOMER;
        };
        
    	//我的竞拍
    	self.scope.onClickToMyBidding = function()
    	{
    		location.href = pageUrl.MY_BIDDING + "?userId=" + self.personCenterModel.userId;
    	};
    	
    	//我的订单--全部
    	self.scope.onClickToAllOrderList = function()
    	{
    		location.href = pageUrl.MY_ORDER_LIST + "?orderType=" + "";
    	};

    	//待付款
    	self.scope.onClickToWaitForPay = function()
    	{
    		location.href = pageUrl.MY_ORDER_LIST + "?orderType=" + 1;
    	};

    	//待发货
    	self.scope.onClickToWaitForDelivery = function()
    	{
    		location.href = pageUrl.MY_ORDER_LIST + "?orderType=" + 3;
    	};

    	//已完成
    	self.scope.onClickToHasDone = function()
    	{
    		location.href = pageUrl.MY_ORDER_LIST + "?orderType=" + 4;
    	};

    	//付费服务
    	self.scope.onClickToMyPayService = function()
    	{
    		location.href = pageUrl.SELF_PAID_SERVICES;
    	};
    	
    	//我的收货地址
    	self.scope.onClickToMyAddress = function()
    	{
    		location.href = pageUrl.MY_ADDRESS_LIST + "?userId=" + self.personCenterModel.userId;
    	};
    	
    	//我的浏览记录
    	self.scope.onClickToMyScanRecords = function()
    	{
    		location.href = pageUrl.SCAN_RECORDS;
    	};
    }
};
