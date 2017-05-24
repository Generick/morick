
var userInfoController = {
    scope: null,
    
    biddingModel: {
        modelArr: [],
        biddingID: null, //当前竞拍ID
        selNum: null, //分页数
        nowPage: null, //当前页
        totalPage: null, //总页数
        inputPage: null //跳转页
    },

    
    
    infoModel: {
        singleData: null,//个人数据
        isRecharge: true,//是否充值
        balance: 0,      //充值&扣除金额
        startIndex1: 0,  //收货地址
        startIndex2: 0,  //购买记录
        startIndex3: 0,  //竞拍记录
        startIndex4: 0,  //购买服务
        startIndex5: 0,  //消费记录
        curPage1: 1,     //收货地址当前页
        curPage2: 1,     //购买记录当前页
        curPage3: 1,     //竞拍记录当前页
        curPage4: 1,     //购买服务当前页
        curPage5: 1,     //消费记录当前页
        addressArr: [],  //地址列表
        biddingArr: [],  //竞拍记录
        orderArr: [],    //竞拍记录
        servicesArr: [], //购买服务
        spendingArr: []  //消费列表
    },

    //消费类型
    spendType: ["充值","返还保证金","提现","缴纳保证金","购买服务","订单支付","管理员充值","管理员扣除"],

    init: function($scope){
        this.scope = $scope;
      
        this.infoModel.singleData = JSON.parse(localStorage.getItem("userInfoData")); //个人信息
      
      
        this.biddingModel.biddingID = _utility.getQueryString("biddingID");
        this.biddingModel.selNum = _utility.getQueryString("selNum");
        this.biddingModel.nowPage = _utility.getQueryString("nowPage");
        this.biddingModel.totalPage = _utility.getQueryString("totalPage");
        this.biddingModel.inputPage = _utility.getQueryString("inputPage");

        this.scope.biddingModel = this.biddingModel;
        
        
        this.scope.infoModel = this.infoModel;

        this.getAddress();

        this.getOrder();

        this.getBidding();

        this.getServices();

        this.getSpending();

        this.onEvent();
    },

    onEvent: function(){
        var self = this;

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
        	
        	
        	location.href = JUMP_URL.BIDDING_LIST + "?biddingID=" + self.biddingModel.biddingID + "&selNum=" + self.biddingModel.selNum
                            + "&nowPage=" + self.biddingModel.nowPage
                            + "&totalPage=" + self.biddingModel.totalPage
                            + "&inputPage=" + self.biddingModel.inputPage;
 
        };
        
    },

    //修改用户余额
    modUserBalance: function(){
        var self = this,
            params = {
                userId: self.infoModel.singleData.userId,
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
//                  self.infoModel.singleData.balance = oldBalance.add(modBalance);
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
//                  self.infoModel.singleData.balance = oldBalance.sub(modBalance);
                    
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
                userId: self.infoModel.singleData.userId
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
                userId: self.infoModel.singleData.userId
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
                userId: self.infoModel.singleData.userId
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
                userId: self.infoModel.singleData.userId
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
                userId: self.infoModel.singleData.userId
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