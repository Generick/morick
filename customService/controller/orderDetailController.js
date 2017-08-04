
app.controller('pusherCtr',function($scope){
	
	pusherCtr.init($scope)
})

var pusherCtr = {
	
	scope : null,
	
	orderNum: null,
	logNumber : null,
	orderModel : {
		orderNum : null,
		personName : null,
		telePhone : null,
		addRess : null,
		goodName : null,
		buyNumber : null,
		goodsPrice : null,
		payPrice : null,
		imgCover : null,
		payType : null,
		orderType : null,
		orderTime : null,
		orderStatus : null,
		userId : null,
		logistics_no : null
	},
	
	
	init : function($scope){
		
		this.scope = $scope;
		
		$(".animation3").css("display","block");
		
		this.scope.orderModel = this.orderModel;
		
		this.scope.logNumber = this.logNumber;
		
		this.getData();
		
		this.eventBind();
	
	},
	
	getData : function(){
		var self = this;
		
		if(sessionStorage.getItem("orderDetailNu") == null)
		{
			$dialog.msg("请先登录！");
			
			setTimeout(function(){
				location.href = pageUrl.LOGIN_PAGE;
			},1000)
		}
		else{
			
			
			var params = {};
			params.order_no = sessionStorage.getItem("orderDetailNu");
			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_CUSTOMER_DETAIL, params,function(data){
				
				self.orderModel.orderNum = data.orderInfo.order_no;
				self.orderModel.personName = data.orderInfo.acceptName;
				self.orderModel.telePhone = data.orderInfo.mobile;
				self.orderModel.addRess = data.orderInfo.province + data.orderInfo.city + data.orderInfo.district + data.orderInfo.address;
				self.orderModel.goodName = data.orderInfo.orderGoods[0].commodity_name;
				self.orderModel.buyNumber = data.orderInfo.orderGoods[0].goodsNum;
				self.orderModel.goodsPrice = data.orderInfo.goodsPrice;
				self.orderModel.payPrice = data.orderInfo.payPrice;
				self.orderModel.imgCover = data.orderInfo.orderGoods[0].commodity_cover;
				self.orderModel.payType = data.orderInfo.payType;
				self.orderModel.orderType = data.orderInfo.orderType;
				self.orderModel.orderTime = data.orderInfo.orderTime;
				self.orderModel.orderStatus = data.orderInfo.orderStatus;
				self.orderModel.logistics_no = data.orderInfo.logistics_no;
				self.scope.orderModel = self.orderModel;
				self.scope.$apply();
			
				$(".animation3").css("display","none");
	            $(".container3").css("opacity",1);
//				console.log(JSON.stringify(data))
//				alert(JSON.stringify(data))
			})
			
		
		}
		
		
	},
	
	
	eventBind : function(){
		
		var self = this;
		self.scope.cancleOrSure = function(type){
			
			self.orderModel.userId = localStorage.getItem(localStorageKey.userId);
			var params = {};
			params.userId = self.orderModel.userId;
			params.order_no = self.orderModel.orderNum;
			params.type = type;
			
			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_CUSTOMER_CANCLE_OR_SURE, params,function(data){
				
				if(type == 0)
				{
					$dialog.msg("已确认完成！")
				}
				else{
					$dialog.msg("已取消订单！")
				}
				self.getData();
			})
		};
		
		
		self.scope.sendGoods = function(){
			
			if(self.scope.logNumber != null && self.scope.logNumber != '')
				{
					var params = {};
					params.logistics_no  =  self.scope.logNumber;
					params.order_no = self.orderModel.orderNum;
					params.userId = localStorage.getItem(localStorageKey.userId);
					
					jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_WAIT_SEND, params,function(data){
						
						
						$dialog.msg("发货成功！");
						$(".order-number-box-shade").css("display","none");
						$(".order-number-box").css("display","none");
						$("html,body").css("overflow-y","auto");
						
						self.getData();
						self.logNumber = null;
						self.scope.logNumber = self.logNumber;
					})
				}
				else{
					$dialog.msg("请输入订单号！")
				}
		}
	},
}

