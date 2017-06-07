/*
 * 账户中心
 */
app.controller("ctrl", function ($scope)
{  
	
	sessionStorage.removeItem("comeIntoOrder")
    newPersonCenterCtrl.init($scope);
   
});

var newPersonCenterCtrl =
{
    scope : null,
    
    mySmallIcon : '',
    
    mySelfPhone : '',
    
    balanceMoney : 0,
    
    frizenMoney : 0,
    
   
    init : function ($scope)
    {
    	this.scope = $scope;
        
        this.getSelfData();
        
    	this.bindClick();
        
        initTab.start(this.scope, -1); //底部导航
    },
    
   
    getSelfData : function(){
    	
    	$('.container').css('opacity','0');
    	var self = this;
    	
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
    		
    		self.balanceMoney =  commonFu.isEmpty(data.userInfo.balance) ? 0 : parseInt(data.userInfo.balance);
    		self.frizenMoney =  commonFu.isEmpty(data.userInfo.frozen) ? 0 : parseInt(data.userInfo.frozen);
    		self.mySelfPhone =  commonFu.isEmpty(data.userInfo.telephone) ? "" : data.userInfo.telephone;
    		self.mySmallIcon =  commonFu.isEmpty(data.userInfo.smallIcon) ? ((data.userInfo.gender==1)?"img/personCenter/default-male.png":"img/personCenter/default-fmale.png") : data.userInfo.smallIcon;
    		
    		self.scope.mySmallIcon = self.mySmallIcon;
        
	        self.scope.mySelfPhone = self.mySelfPhone;
	        
	        self.scope.balanceMoney = self.balanceMoney;
	        
	        self.scope.frizenMoney = self.frizenMoney;
	        self.scope.$apply();
    		$('.container').css('opacity','1');
    	})
    	
    	
    	
    },
  
    
    bindClick  : function ()
    {
    	var self = this;

        
        self.scope.toAnotherSlide = function(type){
        	
        	
        	$(".animation-2").css("display","block");
        		setTimeout(function(){
        			
        			$(".animation-2").css("display","none");
        	},500);
        	if(type == 0)
        	{   
        		
        		$(".there-is-no-data-word").html("没有待批阅的消息哦");
        		$(".there-is-no-data").css("display","block");
        		$(".new-pre-message-box-item").css("display","block");
        		$(".new-per-head-box-tab-slide").animate({"left":"11vw"},180)
        	}
        	else
        	{   
        		$(".there-is-no-data-word").html("没有已批阅的消息哦");
        		$(".there-is-no-data").css("display","block");
        		$(".new-pre-message-box-item").css("display","none");
        		$(".new-per-head-box-tab-slide").animate({"left":"61vw"},180)
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
       
    }
};
