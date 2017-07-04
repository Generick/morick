/**
 * 出价管理控制器
 * 
 * 
 */

var OfferPriceCtrl = {
	
	//全局变量
	scope : null,

    param :null,
    
    itemId : null,
    
    isShowUserData : true,
    
    isTodayGet : false,
    
    userId : null,
    
    personNote : '',
    
    todayGetArr : [],
    
	goodsModel : {
		modelArr : [],
		messContent : "",
		userName : " ",
		goodsName : ""
    },
    
     //消费类型
    spendType: ["充值","返还保证金","提现","缴纳保证金","购买服务","订单支付","管理员充值","管理员扣除"],

    infoModel: {
        singleData: null,//个人数据
        isRecharge: true,//是否充值
        balance: 0,      //充值&扣除金额
        startIndex1: 0,  //收货地址
        startIndex2: 0,  //购买记录
        startIndex3: 0,  //竞拍记录
        startIndex4: 0,  //购买服务
        startIndex5: 0,  //消费记录
        startIndex33:0,
        curPage1: 1,     //收货地址当前页
        curPage2: 1,     //购买记录当前页
        curPage3: 1,     //竞拍记录当前页
        curPage4: 1,     //购买服务当前页
        curPage5: 1,     //消费记录当前页
        curPage33: 1,
        addressArr: [],  //地址列表
        biddingArr: [],  //竞拍记录
        orderArr: [],    //竞拍记录
        servicesArr: [], //购买服务
        spendingArr: [],  //消费列表
        outPriceArr:[]//出价记录列表
    },
    
    
    init: function($scope)
    {
    	this.scope = $scope;
    	
    	this.scope.infoModel = this.infoModel;
    	
    	this.scope.isShowUserData = this.isShowUserData;
        
        this.scope.isTodayGet = this.isTodayGet;
        
    	this.dataModelInit();
    	
    	this.getGoodsList();
    	
    	this.bindEvent();
    },
    
    /**
     * 数据模型初始化绑定
     */
    
    dataModelInit : function()
    {
    	var self = this;
    	this.scope.goodsModel = this.goodsModel;
    	
    },
    
   
    /**
     * 获取商品列表
     */
    getGoodsList : function()
    {
    	var self = this;
        
        pageController.pageInit(self.scope,api.API_GET_BIDLIST,{},function(data){
           
//          console.log("rrrrr"+ JSON.stringify(data))
        	if(self.scope.page.selectPageNum)
            {   
                var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                pageController.pageNum(totalPage);
              
            }
            self.goodsModel.modelArr = [];
            var modelArr = data.bidList;
             
            for(var i = 0; i < modelArr.length; i++)
            {
            	var itemObj = {};
            	itemObj.auctionItemId = modelArr[i].auctionItemId;
            	itemObj.goods_name = modelArr[i].goods_name;
//          	var firstPic = JSON.parse(modelArr[i].goods_pics)[0];
//          	itemObj.goods_pics = _utility.isEmpty(firstPic) ? defaultImage : firstPic;
                itemObj.goods_pics = modelArr[i].goods_cover;
            	itemObj.name = modelArr[i].name;
            	itemObj.userId = modelArr[i].userId;
            	itemObj.nowPrice = _utility.toDecimalTwo(modelArr[i].nowPrice);
            	
                itemObj.note = (modelArr[i].note == "") ? "无" : modelArr[i].note;
				itemObj.createTime = modelArr[i].createTime;
            	itemObj.telephone = modelArr[i].telephone;
                if(modelArr[i].isSale == undefined)
            	{
            		itemObj.isSale = false;
            		if(modelArr[i].isHigh == 0)
            		
	            	{
	            		itemObj.isHigh = false;
	            	}
	            	else
	            	{
	            		itemObj.isHigh = true;
	            	}
            	}
            	else
            	{
            		itemObj.isSale = true;
            		itemObj.isHigh = false;
            	}
            	
            	self.goodsModel.modelArr.push(itemObj);
            }
            self.scope.goodsModel.modelArr = self.goodsModel.modelArr;
            self.scope.$apply();
        })
       
    },

    //点击事件
    bindEvent : function()
    {
    	var self = this;
    	
    	//获取最新数据
    	
    	self.scope.getNewMes = function(){
    		self.isTodayGet = false;
    		self.scope.isTodayGet = self.isTodayGet;
    		
    		
	    	var page = {};
	    	page.selectPageNum = 10;
	    	page.currentPage = 1;
	    	page.totalPage = 0;
	    	page.inputPage = 1;
	    	var pageNumSelections = [10, 20, 50, 100];
	    	pageController.scope = self.scope;
	    	pageController.page = page;
	    	
	    	pageController.scope.pageNumSelections = pageNumSelections;
	    	pageController.scope.page = pageController.page;
	    	pageController.pageClick();
    		
    		
    		
    		self.getGoodsList()
    		$("#offer-price-btn").addClass("forth-width-active");
    		$("#today-get-btn").removeClass("forth-width-active");
    	};
    	
    	self.scope.showPersonDetail  = function(item){
    		
    		$("#big-box-three").css("display","block");
    		self.personNote = item.note;
    		self.scope.personNote = self.personNote;
    	};
    	
    	
    	self.scope.submitData = function(){
    		
    		$("#big-box-three").css("display","none");
    	};
    	
    	
    	self.scope.toSeeHisDetail = function(item){
    	
    		self.userId = item.userId;
    		
    		self.getSelfInfo();
    		
    		self.getAddress();

	        self.getOrder();
	
	        self.getBidding();
	
	        self.getServices();
	
	        self.getSpending();
    		self.isShowUserData = false;
    		self.scope.isShowUserData = self.isShowUserData;
    		
    	};
    	
    	
    	//当日截拍
    	
    	self.scope.todayGet = function(){
    		
    		self.isTodayGet = true;
    		self.scope.isTodayGet = self.isTodayGet;
    		$("#offer-price-btn").removeClass("forth-width-active");
    		$("#today-get-btn").addClass("forth-width-active");
    		
    		var page = {};
	    	page.selectPageNum = 10;
	    	page.currentPage = 1;
	    	page.totalPage = 0;
	    	page.inputPage = 1;
	    	var pageNumSelections = [10, 20, 50, 100];
	    	pageController.scope = self.scope;
	    	pageController.page = page;
	    	
	    	pageController.scope.pageNumSelections = pageNumSelections;
	    	pageController.scope.page = pageController.page;
	    	pageController.pageClick();
    		
    		
    		self.getTodayData();
    	};
    	
    	//点击事件
    	self.scope.sendMessage = function(type,item){
            
            $(".all-fixed-table").css({"display":"block"})
    	    $("html,body").css({"overflow":"hidden"})
         
    		var params = {};
    		params.type = type;
    		params.phoneNum = JSON.stringify(item.telephone);
    		params.goods_name = item.goods_name;
    		params.price = JSON.parse(item.nowPrice);
     		params = JSON.stringify(params);
     		var param = {'params':params};
    	    if(type == 1)
    	    {
    	    	self.goodsModel.messContent ="  超出短信  "
    	    	
    	    }
    	    else if(type == 2)
    	    {
    	    	self.goodsModel.messContent =" 成交短信  "
    	    	
    	    }
    	    else
    	    {
    	    	self.goodsModel.messContent = " 截拍短信  "
    	    	
    	    }
    	    self.goodsModel.userName = item.name;
    	    self.goodsModel.goodsName = item.goods_name;
    	   
    	    self.param = param;
    	};
    	
    	
    	
    	self.scope.yesToSend = function(type){
    		
    		if(type == 0)
    		{  
    			$(".all-fixed-table").css({"display":"none"})
    			$("html,body").css({"overflow":"auto"})
    		}
    		else
    		{
    			$(".all-fixed-table").css({"display":"none"});
    			$("html,body").css({"overflow":"auto"});
    			
    			var param = self.param;
    			
    			$data.httpRequest("post", api.API_SEND_MESSAGE, param, function(data){
    	     	  
    	     		$dialog.msg("发送成功！")
    	        })
    		}
    	};
    	
    	
    	self.scope.toseeOutPrice = function(item){
    		
    		$(".item").eq(0).addClass("hidden");
    		$(".item").eq(1).removeClass("hidden");
    		self.getSingleGoodsData(item);
    	};
    	
    	self.scope.hideTheItem = function(){
    		$(".item").eq(1).addClass("hidden");
    		$(".item").eq(0).removeClass("hidden");
    		
    	};
    	
    	self.scope.switchRecharge = function(type){
            self.infoModel.isRecharge = type == 0;
        };

        self.scope.modBalance = function(){
            self.infoModel.isRecharge = true;
            self.infoModel.balance = 0;
          
            $dialog.open("修改余额", "372px", $("#layer_user_mod"), function(){
                self.modUserBalance()
            });
        };
        
        self.scope.back2BindList = function(){
        	
        	self.isShowUserData = true;
        	self.scope.isShowUserData = self.isShowUserData;
        };
    },
    
    
    
    getSingleGoodsData : function(item){
    	
    	var self = this,
            params = {
                startIndex: self.infoModel.startIndex33,
                num: 10,
//              auctionItemId :4
                auctionItemId: item.id
            };
        self.itemId = item;
        $data.httpRequest("post", api.API_GET_BIDLIST, params,
            /**
             * 消费记录
             * @param data.count
             * @param data.transactionList 消费列表
             * @param data.transactionList.transactionTime 消费时间
             * @param data.transactionList.transactionType 消费类型
             * @param data.transactionList.money 消费金额
             */
            function(data){

                var totalPage = Math.ceil(data.count / 10);
//              alert(JSON.stringify(data))
                self.infoModel.outPriceArr = data.bidList;

//              for(var i = 0, len = self.infoModel.outPriceArr.length; i < len; i++)
//              {
//                  var curObj = self.infoModel.outPriceArr[i];
//
//
//              }

                self.scope.$apply();

                $("#simplePage_33").createPage({
                    pageCount: totalPage,
                    current: self.infoModel.curPage33,
                    backFn: function(curPage){
                        self.infoModel.curPage33 = curPage;
                        self.infoModel.startIndex33 = (curPage-1)*10;
                        self.getSingleGoodsData(self.itemId);
                    }
                });
            }
        )
    	
    },
    
    
    
    
    
    
        
    
    
    
    
    //获取当日截拍
    getTodayData : function(){
    	var self = this;
    	
    	var params = {};
    	params.todayAuction = 1
    	pageController.pageInit(self.scope, api.API_GET_AUCTION_LIST, params,

            function(data){
            	
            	if(self.scope.page.selectPageNum)
	            {   
	                var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
	                pageController.pageNum(totalPage);
	              
	            }
            	self.todayGetArr = data.auctionItems;
            	if(self.todayGetArr.length == 0)
            	{
            			$dialog.msg("暂无数据！")
            	}
            	self.scope.todayGetArr = self.todayGetArr;
            	self.scope.$apply();
              console.log(JSON.stringify(data))
            });

        
    },
    
     
    getSelfInfo : function(){
    	
    	var self = this;
    	var params = {};
    	params.userId = self.userId;
    	$data.httpRequest("post", api.API_ADMIN_GET_USERINFO, params, function(data){
    		
    		self.infoModel.singleData = data.userInfo;
    		
    	})
    },

    //修改用户余额
    modUserBalance: function(){
        var self = this,
            params = {
                userId: self.userId,
                opType: self.infoModel.isRecharge?"0":"1",
                balance: self.infoModel.balance
            };
           
        if(self.checkParams())
        {
            $data.httpRequest("post", api.API_ADMIN_OP_BALANCE, params, function(){
                var oldBalance = parseFloat(self.infoModel.singleData.balance);
                var modBalance = parseFloat(self.infoModel.balance);
               
                if(self.infoModel.isRecharge) //充值+修改值，扣除-修改值
                {   
                	
                    self.infoModel.singleData.balance = oldBalance + modBalance;

                }
                else
                {
                	if(oldBalance >= modBalance)
                	{
                		 self.infoModel.singleData.balance = oldBalance - modBalance;
                	}
                    else
                    {
                    	 $dialog.msg("用户金额不足", 1.6);
                    }

                    
                }
                self.infoModel.singleData.balance = _utility.toDecimalTwo(self.infoModel.singleData.balance);
               
                var params = {};
                params = JSON.parse(localStorage.getItem("userInfoData"));
                params.balance = self.infoModel.singleData.balance;
                localStorage.setItem("userInfoData",JSON.stringify(params))
                self.scope.$apply();
                layer.closeAll();
            })
        }

    },

    //检查余额修改参数
    checkParams: function(){
        var self = this;
        var oldBalance = parseFloat(self.infoModel.singleData.balance);
        var newBalance = self.infoModel.balance;

        if(_utility.isEmpty(self.infoModel.balance)){
            $dialog.msg(CN_TIPS.NO_BALANCE, 1.6);
            return false;
        }
        else {
            if(!self.infoModel.isRecharge && (oldBalance < newBalance))
            {
                $dialog.msg(CN_TIPS.BALANCE_NOT_ENOUGH, 1.7);
                return false;
            }
        }

        return true;
    },

    //获取收货地址
    getAddress: function(){
        var self = this,
            params = {
                startIndex: self.infoModel.startIndex1,
                num: 10,
                userId: self.userId
            };
    
        $data.httpRequest("post", api.API_GET_SINGLE_ADDRESS, params,
            /**
             * 收货地址
             * @param data.count 计数
             * @param data.shippingAddressList 地址列表
             * @param data.shippingAddressList.acceptName 收货人
             * @param data.shippingAddressList.mobile 手机
             * @param data.shippingAddressList.address 收货地址
             */
            function(data){
                var totalPage = Math.ceil(data.count / 10);

                self.infoModel.addressArr = data.shippingAddressList;
                self.scope.$apply();

                $("#simplePage_1").createPage({
                    pageCount: totalPage,
                    current: self.infoModel.curPage1,
                    backFn: function(curPage){
                        self.infoModel.curPage1 = curPage;
                        self.infoModel.startIndex1 = (curPage-1)*10;
                        self.getAddress();
                    }
                });
            }
        );
    },

    //获取购买记录
    getOrder: function(){
        var self = this,
            params = {
                startIndex: self.infoModel.startIndex2,
                num: 10,
                userId: self.userId
            };
         
        $data.httpRequest("post", api.API_GET_SINGLE_ORDER, params,

            /**
             * 购买记录
             * @param data.count
             * @param data.orderList 订单列表
             * @param data.orderList.orderGoods 藏品
             * @param data.orderList.order_no 订单号
             * @param data.orderList.payPrice 金额
             * @param data.orderList.payTime 付款时间
             */
            function(data){
                var totalPage = Math.ceil(data.count / 10);

                self.infoModel.orderArr = data.orderList;
                for(var i = 0; i < self.infoModel.orderArr.length; i++)
                {
                    self.infoModel.orderArr[i].name = self.infoModel.orderArr[i].orderGoods[0].goods_name;
                    self.infoModel.orderArr[i].img = JSON.parse(self.infoModel.orderArr[i].orderGoods[0].goods_pics)[0];
                    self.infoModel.orderArr[i].payPrice  = _utility.toDecimalTwo(self.infoModel.orderArr[i].payPrice);//保留两位小树
                }
                self.scope.$apply();

                $("#simplePage_2").createPage({
                    pageCount: totalPage,
                    current: self.infoModel.curPage2,
                    backFn: function(curPage){
                        self.infoModel.curPage2 = curPage;
                        self.infoModel.startIndex2 = (curPage-1)*10;
                        self.getOrder();
                    }
                });
            }
        )

    },

    //获取竞拍记录
    getBidding: function(){
        var self = this,
            params = {
                startIndex: self.infoModel.startIndex3,
                num: 10,
                userId: self.userId
            };
      
        $data.httpRequest("post", api.API_GET_SINGLE_BIDDING_LIST, params,
            /**
             * 竞拍列表
             * @param data.count 计数
             * @param data.biddingList 列表数据
             * @param data.biddingList.itemName 用户数据
             * @param data.biddingList.nowPrice 当前价格
             * @param data.biddingList.createTime 竞拍时间
             */
            function(data){
                var totalPage = Math.ceil(data.count / 10);

                self.infoModel.biddingArr = data.biddingList;
                for(var i = 0;i < self.infoModel.biddingArr;i++)
                {
                	self.infoModel.biddingArr[i].nowPrice = _utility.toDecimalTwo(self.infoModel.biddingArr[i].nowPrice);
                }
                self.scope.$apply();
                
                $("#simplePage_3").createPage({
                    pageCount: totalPage,
                    current: self.infoModel.curPage3,
                    backFn: function(curPage){
                        self.infoModel.curPage3 = curPage;
                        self.infoModel.startIndex3 = (curPage-1)*10;
                        self.getBiddingList();
                    }
                });
            }
        )
    },
    
    
    
    //购买服务
    getServices: function(){
        var self = this,
            params = {
                startIndex: self.infoModel.startIndex4,
                num: 10,
                userId: self.userId
            };

        $data.httpRequest("post", api.API_GET_SINGLE_SERVICES, params,

            /**
             * 购买服务
             * @param data.count
             * @param data.paidServices 服务列表
             * @param data.paidServices.serviceType 服务名称
             */
            function(data){
                var totalPage = Math.ceil(data.count / 10);

                self.infoModel.servicesArr = data.paidServices;
                self.scope.$apply();

                $("#simplePage_4").createPage({
                    pageCount: totalPage,
                    current: self.infoModel.curPage4,
                    backFn: function(curPage){
                        self.infoModel.curPage4 = curPage;
                        self.infoModel.startIndex4 = (curPage-1)*10;
                        self.getServices();
                    }
                });
            }
        )
    },

    getSpending: function(){
        var self = this,
            params = {
                startIndex: self.infoModel.startIndex5,
                num: 10,
                userId: self.userId
            };
  
        $data.httpRequest("post", api.API_GET_BALANCE_LIST, params,
            /**
             * 消费记录
             * @param data.count
             * @param data.transactionList 消费列表
             * @param data.transactionList.transactionTime 消费时间
             * @param data.transactionList.transactionType 消费类型
             * @param data.transactionList.money 消费金额
             */
            function(data){

                var totalPage = Math.ceil(data.count / 10);

                self.infoModel.spendingArr = data.transactionList;

                for(var i = 0, len = self.infoModel.spendingArr.length; i < len; i++)
                {
                    var curObj = self.infoModel.spendingArr[i];

                    curObj.spendType = self.spendType[parseInt(curObj.transactionType)];

                    if(curObj.transactionType == 0 || curObj.transactionType == 1 || curObj.transactionType == 6)
                    {
                        curObj.balance = "+" + curObj.money;
                    }
                    else
                    {
                        curObj.balance = "-" + curObj.money;
                    }
                    curObj.balance = _utility.toDecimalTwo(curObj.balance);
                }

                self.scope.$apply();

                $("#simplePage_5").createPage({
                    pageCount: totalPage,
                    current: self.infoModel.curPage5,
                    backFn: function(curPage){
                        self.infoModel.curPage5 = curPage;
                        self.infoModel.startIndex5 = (curPage-1)*10;
                        self.getSpending();
                    }
                });
            }
        )
    }

};


