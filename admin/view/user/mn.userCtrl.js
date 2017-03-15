
var UserCtrl = {
    scope: null,
    
    userModel: {
        modelArr: [],
        selectAll: false,
        isShowInfo: false, //是否显示info
        idx: null, //修改在数组中位置
        keywords: null, //搜索关键字
        curId: null, //当前点击用户ID
        name: null, //用户备注
        note: "", //用户备注,
        modelLayerIdx :null,//修改备注层
        isVip : -1
    },
    
    modify :{
    	inputText : null,//输入备注,
    	note : null
    },
    
    itemData : null,
    init: function($scope){
        this.scope = $scope;

        this.scope.userModel = this.userModel;
        
        this.scope.modify = this.modify;
        
        this.getUserList("",-1);
     
        this.changeColor(-1);
        
        this.onEvent();
    },

    getUserList: function(keywords,type){
        var self = this;
       
        if(type == -1)
        {
            var params = {
                userType: 1,
                likeStr: keywords,
            };
        }
        else
        {
        	var params = {
                userType: 1,
                likeStr: keywords,
                isVIP : type
           };
        }
        
        pageController.pageInit(self.scope, api.API_GET_USER_LIST, params,

            /**
             * 用户列表
             * @param data.count
             * @param data.userList
             * @param data.userList.telephone 用户手机
             * @param data.userList.registerTime 注册时间
             * @param data.userList.balance 账户余额
             * @param data.userList.smallIcon 头像
             * @param data.userList.gender 性别
             */
            function(data){
                if(self.scope.page.selectPageNum)
                {
                    var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                    pageController.pageNum(totalPage);
                }
              
                self.userModel.modelArr = data.userList;
                for(var i = 0;i < self.userModel.modelArr.length;i++)
                { 
                	if(self.userModel.modelArr[i].gender == 1)
                	{
                		if(self.userModel.modelArr[i].smallIcon =="" || self.userModel.modelArr[i].smallIcon ==null)
		              	{
		              		self.userModel.modelArr[i].smallIcon = "assets/images/public/default-male.png";
		              	}
                	}
		            
		            if(self.userModel.modelArr[i].gender == 0)
                	{
                		if(self.userModel.modelArr[i].smallIcon =="" || self.userModel.modelArr[i].smallIcon ==null)
		              	{
		              		self.userModel.modelArr[i].smallIcon =  "assets/images/public/default-fmale.png";
		              	}
                	}
                	self.userModel.modelArr[i].balance = _utility.toDecimalTwo(self.userModel.modelArr[i].balance);
                	self.userModel.modelArr[i].note = data.userList[i].note;
                }
                self.userModel.isShowInfo = false;
                self.scope.$apply();
            }
        );
    },
    
  
    //绑定事件
    onEvent: function(){
        var self = this;

        self.scope.searchUser = function(){
        	
            self.getUserList(self.userModel.keywords,self.userModel.isVIP);
        };

        self.scope.checkInfo = function(item){ //查看详情
            self.userModel.isShowInfo = true;
            userInfoCtrl.init(self.scope, item);
        };
        self.scope.dredge = function(item){
        	//开通VIP
        	var item = item;
        	if(parseInt(item.isVIP) == 1)
        	{
        	}
        	else
        	{   
				var userId = parseInt(item.userId);
				var userIdArr = [];
				userIdArr.push(userId);
				userIdArr = JSON.stringify(userIdArr); 
				var params = {};
				params.userIds = userIdArr;
				params.type = 1;  
				pageController.pageInit(self.scope,api.API_ADMIN_SET_VIP, params,function(data){
					item.isVIP = 1;
					self.scope.$apply();
				});
        	}	
        };
        
        self.scope.abolish = function(item){
        	//取消VIP
        	var item = item;
			if(parseInt(item.isVIP) == 0)
        	{
        	}
        	else
        	{   
				var userId = parseInt(item.userId);
				var userIdArr = [];
				userIdArr.push(userId);
				userIdArr = JSON.stringify(userIdArr); 
				var params = {};
				params.userIds = userIdArr;
				params.type = 0;
   
				pageController.pageInit(self.scope,api.API_ADMIN_SET_VIP, params,function(data){
					item.isVIP = 0;
					self.scope.$apply();
				});
        	}	
        	
        };
        self.scope.back2UserList = function(){ //返回列表
            self.userModel.isShowInfo = false;
        };
        //查看大图
    
        self.scope.getPeople = function(type){
        	//分类获取会员
        
            self.userModel.isVip = type;
        	self.getUserList(self.userModel.keywords,self.userModel.isVip);
        	self.changeColor(type);
        };
    
        self.scope.showBigImg = function(){
           $dialog.photos('#user-tbody');
        };
        self.scope.reMark = function(item){
        	self.itemData = item;
        	self.modify.note = item.note;
        	self.showBox();
        	
        };
        self.scope.hideShadow = function(item){
        	self.hideBox();
        	
        };
        self.scope.submitData = function(){
        	self.modRemark();

        };
    },
    
    //修改用户备注

    modRemark : function(){
    	var self = this;
    	var item = self.itemData;
        var modInfo = {};
        modInfo.note = self.modify.note;
        var params = {};
        params.userId = item.userId;
        params.modInfo = JSON.stringify(modInfo);
 
        $data.httpRequest("post",api.API_MOD_USER_INFO,params,function(){
        	pageController.callApi();
        	self.hideBox();
        	self.scope.$apply();
        })
    },
    
  
    //点击筛选改变颜色
    changeColor : function(type){
    	var index = type + 2; 
    	$("#father-checeking").children().eq(0).css("background","#cdcdcd");
    	$("#father-checeking").off("click");
    	$("#father-checeking").on("click",".checking",function(index){
    		$(this).css("background","#cdcdcd").siblings().css("background","#FFFFFF");
    	})
    },
    
    //遮罩层的展示和隐藏
    
    showBox : function(){
    	var self = this;
    	$("#big-box").show()
    },
    hideBox : function(){
    	var self = this;
    	$("#big-box").hide()

    },
};

var userInfoCtrl = {
    scope: null,

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

    init: function($scope, item){
        this.scope = $scope;

        this.infoModel.singleData = item; //个人信息
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
                var modBalance = self.infoModel.balance;

                if(self.infoModel.isRecharge) //充值+修改值，扣除-修改值
                {
                    self.infoModel.singleData.balance = oldBalance.add(modBalance);
                }
                else
                {
                    self.infoModel.singleData.balance = oldBalance.sub(modBalance);
                }
                self.infoModel.singleData.balance = _utility.toDecimalTwo(self.infoModel.singleData.balance);
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