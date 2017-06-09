
app.controller('specialctrl',function($scope){
	
	specialPageController.init($scope);
	
})


var specialPageController = 
{
	scope : null,
	
	isSelected : false,
	
	commId : null,
	
	userId : null,
	
	commPrice : null,
	
	init : function($scope){
		
		this.scope = $scope;
		
		this.getUrlAndId();
		
		this.getSelfInfo();
		
		this.getData();
		
		this.eventBind();
		
	},
	
	  getUrlAndId : function(){
    	
    	var self = this;
    	self.commId = commonFu.getQueryStringByKey("commodifyId");
//  	self.userId = commonFu.getQueryStringByKey("userId");
    	self.commPrice = commonFu.getQueryStringByKey("specialPrice");
    	
    	self.scope.commPrice = self.commPrice;
    	
    },
    
    getSelfInfo : function(){
    	var self = this;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
    		
    		self.userId = data.userInfo.userId;
    		
    	})
    	
    },
	
	
	getData : function(){
		
		var self = this;
		document.title = "支付订单";
		
		$('.container').css('opacity','1');
		
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
