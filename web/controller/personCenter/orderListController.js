/*
 * 我的订单
 */
app.controller("ctrl", function ($scope) {
    OrderListCtrl.init($scope);
});

var OrderListCtrl = {
    scope: null,

    ordertype: null,

    orderListModel: {
    	orderList : []
    },
    
    init : function ($scope)
    {
    	this.scope = $scope;

        this.scope.orderListModel = this.orderListModel;

        this.ordertype =  commonFu.getQueryStringByKey("orderType");

    	this.bindClick();
    	
    	this.initData(this.ordertype);

        this.ngRepeatFinish();
    },

    initData : function (type)
    {
    	this.changeLineStatus(type);
    	$('.animation').css('display','block');
    	var self = this;
    	var params = {};
    	
    	params.orderType = type;
    	
    	params.startIndex = 0;
    	params.num = 0;
    	
    	if(commonFu.isEmpty(type))
    	{
    		params.orderType = undefined;
    	}
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_ORDER_LIST, params, function(data){
//          console.log(JSON.stringify(data))
    		self.orderListModel.orderList = [];
    		self.orderListModel.orderList = data.orderList;
    		
    		if (self.orderListModel.orderList.length > 0)
    		{
    			$(".no-data").css('display','none');
    			for (var i = 0;i < self.orderListModel.orderList.length;i ++)
	    		{
	    			if(self.orderListModel.orderList[i].orderStatus == 1)
	    			{
	    				self.orderListModel.orderList[i].orderTypeText = "待付款";
	    				self.orderListModel.orderList[i].orderTypeStyle = true;
	    				self.orderListModel.orderList[i].orderIsPay = true;
	    				self.orderListModel.orderList[i].orderIsReceive = false;
	    			}
	    			else if(self.orderListModel.orderList[i].orderStatus == 2)
	    			{
	    				self.orderListModel.orderList[i].orderTypeText = "待发货";
	    				self.orderListModel.orderList[i].orderTypeStyle = true;
	    				self.orderListModel.orderList[i].orderIsPay = false;
	    				self.orderListModel.orderList[i].orderIsReceive = true;
	    			}
	    			else if(self.orderListModel.orderList[i].orderStatus == 3)
	    			{
	    				self.orderListModel.orderList[i].orderTypeText = "待收货";
	    				self.orderListModel.orderList[i].orderTypeStyle = true;
	    				self.orderListModel.orderList[i].orderIsPay = false;
	    				self.orderListModel.orderList[i].orderIsReceive = true;
	    			}
	    			else if(self.orderListModel.orderList[i].orderStatus == 4)
	    			{
	    				self.orderListModel.orderList[i].orderTypeText = "已完成";
	    				self.orderListModel.orderList[i].orderTypeStyle = false;
	    				self.orderListModel.orderList[i].orderIsPay = false;
	    				self.orderListModel.orderList[i].orderIsReceive = false;
	    			}
	    			else if(self.orderListModel.orderList[i].orderStatus == 0)
		    		{   
		    			
		    			self.orderListModel.orderList[i].orderTypeText = "已取消";
	    				self.orderListModel.orderList[i].orderTypeStyle = false;
	    				self.orderListModel.orderList[i].orderIsPay = false;
	    				self.orderListModel.orderList[i].orderIsReceive = false;
		    		}
//	    			if(self.orderListModel.orderList[i].orderGoods[0])
//	    			{
//	    				self.orderListModel.orderList[i].orderGoods[0].goods_pics = JSON.parse(self.orderListModel.orderList[i].orderGoods[0].goods_pics);
//	    		       
//	    			}
	    			if(self.orderListModel.orderList[i].deliveryType == 1)
	    			{
	    				self.orderListModel.orderList[i].orderIsPay = false;
	    			   
	    			}
	    		}
    		}
    		else
    		{
    			$(".no-data").css('display','block');
    		}

    		$('.animation').css('display','none');
    		$('.order-container').css('opacity','1');

    		self.scope.$apply();
    	})
    },
    
    bindClick: function() {
    	var self = this;

        //查看详情
    	self.scope.onClickToOrderDetail = function(orderNum)
    	{
            self.jump2detail(orderNum);
    	};
    	
    	//确认收货
    	self.scope.onClickToConfirmReceipt = function(order_no)
    	{
    		var param =
    		{
    			order_no : order_no
    		};
    		
    		$confirmDialog.show("确认收到藏品，再点击收货哦",function()
    		{
    			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_ORDER_CONFIRM_RECEIPT, param, function(data)
	    		{
	    			$confirmTip.show("确认收货成功");
	    			var type = commonFu.getQueryStringByKey("orderType");
	    			self.initData(type);
	    		})
    		})
    	};
    	
    	//去支付
    	self.scope.onClickToPayOrder =function(orderNum)
        {
            self.jump2detail(orderNum)
        };
    	
    	//订单类型切换
    	self.scope.onClickSwitchOrder = function(type)
    	{
			self.initData(type);
			self.scope.orderListModel = self.orderListModel;
    	}
    },

    //跳转到详情页或支付页
    jump2detail: function(orderNum){
        localStorage.setItem(localStorageKey.orderNo, orderNum);
        location.href = pageUrl.ORDER_DETAIL;
    },
    
    //改变字体激活状态
    changeLineStatus: function(type) {
    	this.scope.ordertype = type;
    },
    
    ngRepeatFinish : function()
    {
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){});
    }
};