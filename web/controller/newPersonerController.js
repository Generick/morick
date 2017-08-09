/*
 * 账户中心
 */
//app.controller("ctrl", function ($scope)
//{  
//	
//	localStorage.removeItem("comeIntoOrder")
//  newPersonCenterCtrl.init($scope);
// 
//});

var newPersonCenterCtrl =
{
    scope : null,
    
    isUnReadTab : true,
    
    unReadCount : 0,
    
    shareInfo : {},
    
    page : {
		currentPage : 1,
		totalPage : null,
		timeNum : 30,
		totalCount : 0
	},
	
	 page2 : {
		currentPage : 1,
		totalPage : null,
		timeNum : 30,
		totalCount : 0
	},
	
	messageList : [],
	
    userId : null,
    
    wxParams : {},
    
    isFinished : false,
    
    isFinished2 : false,
    
    mySmallIcon : '',
    
    mySelfName : '',
    
    balanceMoney : 0,
    
    frizenMoney : 0,
    
   
    init : function ($scope,wxParams)
    {   
    	this.scope = $scope;
    	$(".animation-2").css({"display":"block","background":"#ffffff"});
        this.scope.unReadCount = this.unReadCount;
        
        this.wxParams = wxParams;
        
        this.getSelfData();
        
    	this.bindClick();
        
        initTab.start(this.scope, 3); //底部导航
    },
    
   
    getSelfData : function(){
    	
    	
    	
    	$('.container').css('opacity','0');
    	var self = this;
    	
    	self.shareInfo.title = "雅玩之家精选店";
        self.shareInfo.img = "http://auction.yawan365.com/web/img/share-to-other.jpg";
        self.shareInfo.content = "明码标价，童叟无欺";
        
        commonFu.setShareTimeLine(self.wxParams,self.shareInfo,location.href);
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
//  		alert(JSON.stringify(data))
    		self.balanceMoney =  commonFu.isEmpty(data.userInfo.balance) ? 0 : parseInt(data.userInfo.balance);
    		self.frizenMoney =  commonFu.isEmpty(data.userInfo.frozen) ? 0 : parseInt(data.userInfo.frozen);
    		self.mySelfName =  commonFu.isEmpty(data.userInfo.name) ? "" : data.userInfo.name;
    		self.mySmallIcon =  commonFu.isEmpty(data.userInfo.smallIcon) ? ((data.userInfo.gender==1)?"img/personCenter/default-male.png":"img/personCenter/default-fmale.png") : data.userInfo.smallIcon;
    		
    		self.scope.mySmallIcon = self.mySmallIcon;
        
	        self.scope.mySelfName = self.mySelfName;
	        
	        self.scope.balanceMoney = self.balanceMoney;
	        
	        self.scope.frizenMoney = self.frizenMoney;
	        self.scope.$apply();
	        
	        self.userId = data.userInfo.userId;
	        
            self.getUnMessList();
            $('.container').css('opacity','1');
    		
    	})
    	
    	
    	
    },
     
     
//   //获取未读消息
//  getTabUnMessList : function(){
//  	
//  	var self = this;
//  	
//      $(".animation-2").css({"display":"block","background":"#ffffff"});
//      
//  	var params = {};
//  	params.userId = self.userId;
//  	params.num = 30;
//  	params.startIndex = 0;
//  	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_UN_READ_MESSAGE, params, function(data){
//  		if(data.count == 0){
//  			$(".there-is-no-data-word").html("没有待批阅的消息哦");
//	            $(".there-is-no-data").css("display","block");
//  		}
//  		else
//  		{
//  			 $(".there-is-no-data").css("display","none");
//  		}
//  		self.messageList = [];
//  		self.page = {
//				currentPage : 1,
//				totalPage : null,
//				timeNum : 30,
//				totalCount : 0
//			};
//			self.unReadCount = data.count;
//			self.scope.unReadCount = self.unReadCount;
//  		self.page.totalCount = data.count;
//  		self.messageList = data.msgList;
//  		self.page.currentPage = self.page.currentPage + 1;
//  		self.scope.messageList = self.messageList;
//  	
//  		self.scope.$apply();
//  		
////  		$(".the-big-scroll-content").css("height","auto")
////  		$(".new-pre-message-box").css("height","auto")
//  	    var top = (window.screen.width * 0.62);
////  	    $(".new-pre-message-box").css("margin-top",top + "px")
////  	    alert(top)
////          $(".the-big-scroll-content").scrollTo({toT:0});
//  		$(".new-pre-message-box").scrollTo({toT:top});
//  		$(".animation-2").css({"display":"none","background":"#F0EFF5"});
//  		
////  		alert(JSON.stringify(data))
//  	})
//  	
//  },
//   
     
//   //获取已读消息
//   getTabHasMessList : function(){
//  	
//  	var self = this;
//  	
//  	
//      $(".animation-2").css({"display":"block","background":"#ffffff"});
//  	var params = {};
//  	params.userId = self.userId;
//  	params.num = 30;
//  	params.startIndex = 0;
//  	
//  	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_HAS_READ_MESSAGE, params, function(data){
//  		self.messageList = [];
//  		if(data.count == 0){
//  			$(".there-is-no-data-word").html("没有已批阅的消息哦");
//	            $(".there-is-no-data").css("display","block");
//  		}
//  		else
//  		{
//  			 $(".there-is-no-data").css("display","none");
//  		}
//  		self.page2 = {
//				currentPage : 1,
//				totalPage : null,
//				timeNum : 30,
//				totalCount : 0
//			};
//  		self.messageList = data.msgList;
//  		self.page2.totalCount = data.count;
//  		self.page2.currentPage = self.page2.currentPage + 1;
//  		
//  		self.scope.messageList = self.messageList;
//  		self.scope.$apply();
////  		$(".the-big-scroll-content").css("height","auto")
////  		$(".new-pre-message-box").css("height","auto")
//  	    var top = (window.screen.width * 0.62);
////  	    $(".new-pre-message-box").css("margin-top",top + "px")
////  	    alert(top)
////  	    $(".the-big-scroll-content").scrollTo({toT:0});
//  		$(".new-pre-message-box").scrollTo({toT:top});
//  		$(".animation-2").css({"display":"none","background":"#F0EFF5"});
//  		
////  		alert(JSON.stringify(data))
//  	})
//  	
//  },
//  
     
     
     
     
     //获取未读消息
    getUnMessList : function(){
    	
    	var self = this;
    	  
    	if(self.isFinished)
    	{
    		return;
    	}
    	self.isFinished = true;
    	
    	$('.chrysanthemums').css("display","block");
    	var params = {};
    	params.userId = self.userId;
    	params.num = self.page.timeNum;
    	params.startIndex = (self.page.currentPage - 1) * self.page.timeNum;
    	self.page.currentPage = self.page.currentPage + 1;
//  	alert(JSON.stringify(params))
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_MY_MESSAGELIST, params, function(data){
    	    if(data.count == 0)
    	    {
			
				$(".there-is-no-data-word").html("没有已批阅的消息哦");
	            $(".there-is-no-data").css("display","block");
	  		}
	  		else
	  		{
	 			 $(".there-is-no-data").css("display","none");
	  		}
    	    
    	    self.unReadCount = data.unReadNum;
			self.scope.unReadCount = self.unReadCount;
    		self.page.totalCount = data.count;
    		self.messageList = self.messageList.concat(data.data);
    		
    		self.scope.messageList = self.messageList;
//  		alert(444222)
    		self.isFinished = false;
    		$(".animation-2").css({"display":"none","background":"#F0EFF5"});
    		$('.chrysanthemums').css("display","none");
    		self.scope.$apply()
//  		alert(JSON.stringify(data))
    	})
    	
    },
     
     
//   //获取已读消息
//   getHasMessList : function(){
//  	
//  	var self = this;
//  	
//  	if(self.isFinished2)
//  	{
//  		return;
//  	}
//  	self.isFinished2 = true;
//  	
//  	var params = {};
//  	params.userId = self.userId;
//  	params.num = self.page2.timeNum;
//  	params.startIndex = (self.page2.currentPage - 1) * self.page2.timeNum;
////  	alert(JSON.stringify(params))
//  	$('.chrysanthemums').css("display","block");
//  	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_HAS_READ_MESSAGE, params, function(data){
//  		
//  		self.page2.totalCount = data.count;
//  		self.messageList = self.messageList.concat(data.msgList);
//  		
//  		self.page2.currentPage = self.page2.currentPage + 1;
//  		self.isFinished2 = false;
//  		self.scope.messageList = self.messageList;
//  		self.scope.$apply();
//  		$('.chrysanthemums').css("display","none");
////  		alert(JSON.stringify(data))
//  	})
//  	
//  },
//  
    bindClick  : function ()
    {
    	var self = this;

        
        self.scope.toAnotherSlide = function(type){
        	
        	
        	if(type == 0)
        	{   
        		
        		if(!self.isUnReadTab)
        		{
        			self.isUnReadTab = true;
	        		self.page.currentPage = 1;
	        		
	        		self.getTabUnMessList();
	        	
//	        		$(".new-pre-message-box-item").css("display","block");
	        		$(".new-per-head-box-tab-slide").animate({"left":"11vw"},180)
        		}
        		
        	}
        	else
        	{   
        		
        		if(self.isUnReadTab)
        		{
        			self.isUnReadTab = false;
	        		self.page2.currentPage = 1;
	        		self.getTabHasMessList();
	        		
//	        		$(".there-is-no-data-word").html("没有已批阅的消息哦");
//	        		$(".there-is-no-data").css("display","none");
//	        		$(".new-pre-message-box-item").css("display","block");
	        		$(".new-per-head-box-tab-slide").animate({"left":"61vw"},180)
        		}
        		
        	}
        	
        };
       
       
    	//个人信息
    	self.scope.onClickToPersonInfo = function()
    	{
    		location.href = pageUrl.PERSON_INFO;
    	};
    	
    	
    	
    	//我的账户
    	self.scope.onClickToMyAccount = function()
    	{
    		location.href = pageUrl.MY_ACCOUNT;
    	};
        
        
        
        //调用阅读消息接口
        
        
        self.scope.readMessage = function(item){
        	localStorage.setItem(localStorageKey.TO_ADDRESS_TYPE, 1); //判断从哪里进入地址列表
        	localStorage.setItem("comewidthgoto",1);
            if(item.isRead == 0){
            	self.userHasReadMessage(item)
            }
            if(item.msg_type !=0 && item.msg_type !=1 && item.msg_type !=2)
            {
            	
            
	      		localStorage.setItem(localStorageKey.orderNo, item.href_id);
	       		setTimeout(function(){
	       		 	
        			location.href = pageUrl.ORDER_DETAIL;
        				
        		},250)
            }
            else if(item.msg_type == 0 || item.msg_type == 2)
            {   
//          	alert(JSON.stringify(item))
            	var param = {};
            	param.title = item.msg_title;
            	param.time = item.create_time;
            	param.content = item.msg_content;
            	localStorage.setItem("systemMessage",JSON.stringify(param))
            	location.href = pageUrl.NEW_NEW_DETAIL;
            }
            
        }
        
        
    },
    
    
    
    //调用阅读消息接口
    
     userHasReadMessage : function(item){
    	
    	var self = this;
    	
    		var params = {};
	        params.userId = self.userId;
	        params.msg_id = item.msg_id;
	    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_HAS_READ_MESSAGE, params, function(data){
	          
	          
//	              alert("已阅读")
	    	});

 
    },
};




		$(document).ready(function(e) {
			
		    var p=0,t=0;  
		    
            var screenWidth = window.screen.width;
            var screenHieght = window.screen.height;
        
	   		$("#myselfbox").scroll(function(){  
	   		 	
	   		 	p = $(this).scrollTop();  
	   		 	var wh = $(window).height(),bh = $(".the-big-scroll-content").height(),sh = $(".new-pre-message-box").height(),st = $(".new-pre-message-box").offset().top;
	   		 	
//				alert($(".new-pre-message-box").offset().top)
//              alert($(window).height())
//              alert($(".the-big-scroll-content").height())
//              alert($(".new-pre-message-box").height())
				if(t <= p)
				{   
					if(st < 0)
					{
						if(((0.63*screenWidth) - st + screenHieght -30) > (bh - 100))
				        {       
				        	
			        	    if(newPersonCenterCtrl.isUnReadTab)
			        	    {
//			        	    	alert(333)
//								alert(newPersonCenterCtrl.messageList.length)
//								alert(newPersonCenterCtrl.page.totalCount)
                                if(newPersonCenterCtrl.messageList.length < newPersonCenterCtrl.page.totalCount)
                                {
                                	newPersonCenterCtrl.getUnMessList();
                                }
                                else
                                {
			                        $('.chrysanthemums').css("display","block");
									setTimeout(function(){
										$('.chrysanthemums').css("display","none");
			
									},500);
//									$(".no-data-2").css("display","block")
//									setTimeout(function(){
			                           
//										$(".no-more-data").css("display","block");
			
			//							setTimeout(function(){
			//								$(".no-more-data").css("display","none");
			//							},1800);
//									},500)
                                }
			        	    	
			        	    }
			        	    else
			        	    {
//			        	    	alert(334)
//								alert(newPersonCenterCtrl.messageList.length)
//								alert(newPersonCenterCtrl.page.totalCount)
								if(newPersonCenterCtrl.messageList.length < newPersonCenterCtrl.page2.totalCount)
                                {
                                	newPersonCenterCtrl.getHasMessList();
                                }
			        	    	else
			        	    	{
			        	    		$('.chrysanthemums').css("display","block");
									setTimeout(function(){
										$('.chrysanthemums').css("display","none");
			
									},500);
//									setTimeout(function(){
			                           
//										$(".no-more-data").css("display","block");
			
			//							setTimeout(function(){
			//								$(".no-more-data").css("display","none");
			//							},1800);
//									},500)
						        }
			        	    }
				        }
					}
					else
					{
						
					}
				}
	        
			    else
			    {

			    }
			    setTimeout(function(){t = p;},0);
		    })
			
			
//			
//			
//			
//			
//		    // 设定每一行的宽度=屏幕宽度+按钮宽度
//		    $(".new-pre-deleteIn-box").width($(".new-pre-message-box-item").width() + $(".new-pre-delete-button").width());
//		    // 设定常规信息区域宽度=屏幕宽度
//		    $(".new-pre-content-box").width($(".new-pre-message-box-item").width());
//		    // 设定文字部分宽度（为了实现文字过长时在末尾显示...）
//		    // 获取所有行，对每一行设置监听
//		    var lines = $(".new-pre-content-box");
//		    var len = lines.length; 
//		    var lastX, lastXForMobile;
//		    // 用于记录被按下的对象
//		    var pressedObj;  // 当前左滑的对象
//		    var lastLeftObj; // 上一个左滑的对象
//		    // 用于记录按下的点
//		    var start;
//		    // 网页在移动端运行时的监听
//		    for (var i = 0; i < len; ++i) {
//		        lines[i].addEventListener('touchstart', function(e){
//		            lastXForMobile = e.changedTouches[0].pageX;
//		            pressedObj = this; // 记录被按下的对象 
//		            // 记录开始按下时的点
//		            var touches = event.touches[0];
//		            start = { 
//		                x: touches.pageX, // 横坐标
//		                y: touches.pageY  // 纵坐标
//		            };
//		        });
//		        lines[i].addEventListener('touchmove',function(e){
//		            // 计算划动过程中x和y的变化量
//		            var touches = event.touches[0];
//		            delta = {
//		                x: touches.pageX - start.x,
//		                y: touches.pageY - start.y
//		            };
//		            // 横向位移大于纵向位移，阻止纵向滚动
//		            if (Math.abs(delta.x) > Math.abs(delta.y)) {
//		                event.preventDefault();
//		            }
//		            else{}
//		            if (lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
//		                $(lastLeftObj).animate({marginLeft:"0"}, 260,"swing"); // 右滑
//		                lastLeftObj = null; // 清空上一个左滑的对象
//		            }
//		            var diffX = e.changedTouches[0].pageX - lastXForMobile;
//		            if (diffX < -30) {
//		                $(pressedObj).animate({marginLeft:"-14vw"}, 260,"swing"); // 左滑
//		                lastLeftObj && lastLeftObj != pressedObj && 
//		                    $(lastLeftObj).animate({marginLeft:"0"}, 260,"swing"); // 已经左滑状态的按钮右滑
//		                lastLeftObj = pressedObj; // 记录上一个左滑的对象
//		            } else if (diffX > 30) {
//		              if (pressedObj == lastLeftObj) {
//		                $(pressedObj).animate({marginLeft:"0"}, 260,"swing"); // 右滑
//		                lastLeftObj = null; // 清空上一个左滑的对象
//		              }
//		            }
//		            
//		        });
//		        lines[i].addEventListener('touchend', function(e){
//		            if (lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
//		                $(lastLeftObj).animate({marginLeft:"0"}, 260,"swing"); // 右滑
//		                lastLeftObj = null; // 清空上一个左滑的对象
//		            }
//		            var diffX = e.changedTouches[0].pageX - lastXForMobile;
//		            if (diffX < -90) {
//		                $(pressedObj).animate({marginLeft:"-14vw"}, 260,"swing"); // 左滑
//		                lastLeftObj && lastLeftObj != pressedObj && 
//		                    $(lastLeftObj).animate({marginLeft:"0"}, 260,"swing"); // 已经左滑状态的按钮右滑
//		                lastLeftObj = pressedObj; // 记录上一个左滑的对象
//		            } else if (diffX > 90) {
//		              if (pressedObj == lastLeftObj) {
//		                $(pressedObj).animate({marginLeft:"0"}, 260,"swing"); // 右滑
//		                lastLeftObj = null; // 清空上一个左滑的对象
//		              }
//		            }
//		        });
//		    };
		    
		});