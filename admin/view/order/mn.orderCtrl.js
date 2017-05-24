/**
 * Created by Administrator on 2016/12/13.
 */
var OrderCtrl = {
    scope: null,

    orderModel: {
        curTabUrl: null, //当前切换tab地址
        curOrderType: "", //当前订单类型
        tabIndex: 0, //默认tab选中首项
        modelArr: [], //model数据
        isShowInfo: false, //是否显示info
        isRelease: false, //是否发货
        curOrderIdx: null, //当前发货订单index
        keywords: null, //搜索关键字
        deliveryType : null,
        isShowBtn : true,
    },
    
//    allPayWays : null,//支付方式
    
    init: function($scope){
        this.scope = $scope;

        this.initData();
        
        this.changeBtColor(0);
        
        this.scope.orderModel = this.orderModel;

        this.onEvent();

        this.getOrders();
        
    },

    //初始化数据
    initData: function(){
        var self = this;

        self.scope.orderStatusArr = ['已取消','待付款','待发货','已发货','已完成'];

        self.scope.tabs = [
            {title: '全部', isActive: true, id: '',isShowTitle:true},
            {title: '待付款', isActive: false, id: 1,isShowTitle:true},
            {title: '待发货', isActive: false, id: 2,isShowTitle:true},
            {title: '已发货', isActive: false, id: 3,isShowTitle:true},
            {title: '已完成', isActive: false, id: 4,isShowTitle:true},
            {title: '已取消', isActive: false, id: 0,isShowTitle:true}
        ];

        self.scope.onClickTab = function(tab, index){ //切换tab

            self.scope.tabs[self.orderModel.tabIndex].isActive = false; //关闭前一个选项
            self.scope.tabs[index].isActive = true; //打开当前选项
            self.orderModel.tabIndex = index; //记录当前选项以备下一次关闭

            self.orderModel.curOrderType = tab.id;

            self.orderModel.keywords = null; //切换模块前搜索框清空
            self.getOrders();
        };
    },

    //获取订单
    getOrders: function(){
        var self = this,
            params = {};
        
       
        if(self.orderModel.curOrderType !== ""){    
            params.orderType = self.orderModel.curOrderType
        }

        if(!_utility.isEmpty(self.orderModel.keywords)){
            params.likeStr = self.orderModel.keywords
        }
        if(self.orderModel.deliveryType != null){
        	
        	params.deliveryType = self.orderModel.deliveryType;
        }
       
//      alert(JSON.stringify(params))
        pageController.pageInit(self.scope, api.API_GET_ORDER_LIST, params,
            /**
             * 订单
             * @param data.count
             * @param data.orderList 订单列表
             * @param data.orderList.orderStatus 订单状态
             * @param data.orderList.orderTime 下单时间
             * @param data.orderList.province 省
             * @param data.orderList.city 城市
             * @param data.orderList.district 街区
             * @param data.orderList.deliveryType 配送方式
             * @param data.orderList.logistics_no 订单号
             * @param data.orderList.orderLogs 订单流程
             */
            function(data){
            
//                console.log(JSON.stringify(data))
                
                if(self.scope.page.selectPageNum)
                {
                    var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                    pageController.pageNum(totalPage);
                }
                self.orderModel.modelArr = [];
                self.orderModel.modelArr = data.orderList;
                for(var i = 0, len = self.orderModel.modelArr.length; i < len; i++)
                {   
                	
                    self.orderModel.modelArr[i].orderStatusCopy = self.scope.orderStatusArr[self.orderModel.modelArr[i].orderStatus];

                    self.orderModel.modelArr[i].isRelease = (self.orderModel.modelArr[i].orderStatus == "2"); //是否待发货
                }

                self.orderModel.isShowInfo = false;
                self.scope.$apply();
            }
        )
    },

    //绑定事件
    onEvent: function(){
        var self = this;
        
        self.scope.onlinePay = function(type){

            if(type == 0)
            {
            	self.orderModel.isShowBtn = true;
            	self.orderModel.deliveryType = null;
            	self.scope.tabs[2].isShowTitle = true;
            	self.scope.tabs[3].isShowTitle = true;
            }
        	else if(type == 1)
        	{   
        		self.orderModel.isShowBtn = false;
        		self.scope.tabs[2].isShowTitle = true;
            	self.scope.tabs[3].isShowTitle = true;
        		self.orderModel.deliveryType = type - 1;
        	}	
        	else
        	{   
        		self.orderModel.isShowBtn = true;
        		self.scope.tabs[2].isShowTitle = false;
            	self.scope.tabs[3].isShowTitle = false;
        		self.orderModel.deliveryType = type - 1;
        	}
	        self.changeBtColor(type);
	        self.getOrders();

        };
       
        self.scope.search = function(){ //搜索
            self.getOrders();
        };
        
        
        //确定或取消订单
        
        self.scope.toAgreeOrCancle = function(item,type){
        	
        	var params = {};
        	params.order_no = item.order_no;
        	params.type = type;
        	if(type == 0 && item.orderStatus != 4)
        	{   
        		
        		self.sentTocheangOrder(params,type,item);
        		
        	}
        	else if(type == 1 && item.orderStatus != 0)
        	{   
        		self.sentTocheangOrder(params,type,item);
        	}
        	
        };
        
        //查看详情
        self.scope.checkInfo = function(item){
        	
            self.orderModel.isShowInfo = true;
            self.orderModel.isRelease = item.isRelease;
            orderInfoCtrl.init(self.scope, item);
        };

		//发货
        self.scope.deliverGoods = function(item, index){
            self.orderModel.isShowInfo = true;
            self.orderModel.isRelease = true;
            self.orderModel.curOrderIdx = index;
            orderInfoCtrl.init(self.scope, item);

        };

        self.scope.back2OrderList = function(){ //返回列表
            self.orderModel.isShowInfo = false;
            self.getOrders();

        }
    },
    
    
    sentTocheangOrder : function(params,type,item){
    	
    	var self = this;
    	
    	$data.httpRequest("post", api.API_CANCLE_OR_SURE_ORDER, params, function(data){
        		
        	if(type ==0)
        	{
        		item.orderStatus = 4;
        		item.orderStatusCopy = self.scope.orderStatusArr[4];
        	}
        	else
        	{
        		item.orderStatus = 0;
        		item.orderStatusCopy = self.scope.orderStatusArr[0];
        	}	
        	
        	self.scope.$apply();
        	$dialog.msg("操作成功！")
       
    	})
 
    },
    
    
    changeBtColor : function(types){
    	
    	var self = this;
    	$("#pay-way").find("div").eq(types).addClass("pay-active").siblings().removeClass("pay-active")
    }
};

//订单详情
var orderInfoCtrl = {
    scope: null,

    orderInfoModel: {
        info: null,
        logisticsNum: null, //订单号
        logisticsLog: [], //物流信息
        goodsArr: [], //商品数组
        orderLog: [] //订单流程
    },

    init: function($scope, data){
        var self = this;
//      console.log(JSON.stringify(data))
       
        self.scope = $scope;
     
        self.orderInfoModel.info = data;
        
        self.orderInfoModel.info.payPrice = _utility.toDecimalTwo(parseFloat(self.orderInfoModel.info.payPrice));
        
        self.orderInfoModel.info.goodsPrice = _utility.toDecimalTwo(parseFloat(self.orderInfoModel.info.goodsPrice));
        self.orderInfoModel.info.prepaidPrice = _utility.toDecimalTwo(parseFloat(self.orderInfoModel.info.prepaidPrice));
        self.orderInfoModel.goodsArr = data.orderGoods;
        self.orderInfoModel.orderLog = data.orderLogs;
        
      
        for(var i = 0; i < self.orderInfoModel.goodsArr.length; i++)
        {
        	self.orderInfoModel.goodsArr[i].pic = self.orderInfoModel.goodsArr[i].goods_cover;
//          self.orderInfoModel.goodsArr[i].pic = JSON.parse(self.orderInfoModel.goodsArr[i].goods_pics)[0]; //取第一张
        }

        for(var j = 0; j < self.orderInfoModel.orderLog.length; j++)
        {
            self.orderInfoModel.orderLog[j].statusCopy = self.scope.orderStatusArr[self.orderInfoModel.orderLog[j].orderStatus];
        }

        self.scope.orderInfoModel = self.orderInfoModel;

        self.onEvent();
        
        self.getLogistics();
    },
  
    //获得物流信息
    getLogistics: function(){
    	var self = this,
	    	params = {
	    		order_no: self.orderInfoModel.info.order_no
	    	};
	    	
	    	self.orderInfoModel.logisticsLog = [];
		    $data.httpRequest("post", api.API_GET_LOGISTICS_INFO, params, 
		    /**
		     * 物流信息
		     * @param {Object} data
		     * @param {Object} data.traces 物流信息
		     */
		    function(data){
		    	if(data.traces) //检查物流信息是否存在
		    	{
			    	self.orderInfoModel.logisticsLog = data.traces.reverse();
			    	self.scope.$apply();
		    	}
		    }
	    )
    },

    onEvent: function(){
        var self = this;
        
        self.scope.deliverOrder = function(){
            var params = {
                order_no: self.orderInfoModel.info.order_no,
                logistics_no: self.orderInfoModel.logisticsNum
            };
          
            if(_utility.isEmpty(self.orderInfoModel.logisticsNum))
            {   
                $dialog.msg(CN_TIPS.ORDER_NUM_BLANK, 1.6)
            }
            else
            {   
                $data.httpRequest("post", api.API_DELIVER_ORDER, params, function(){
                    
                    self.scope.orderModel.isRelease = false;
                    self.scope.orderModel.modelArr[self.scope.orderModel.curOrderIdx].isRelease = false;
                  
                     
                    $dialog.msg(CN_TIPS.DELIVER_GOODS_OK, 2);
                    self.init(self.scope, self.orderInfoModel.info);
                    self.getLogistics();
                    OrderCtrl.scope.back2OrderList();
                    self.scope.$apply();
                    
                })
            }
            
        }
    }
};
