/**
 * Created by Jack on 2016/11/17.
 */
var AuctionCtrl = {
    scope: null,
    
    isVipJudge : -1,
    
    showTheInput : 0,
    
    isShowTop : false,
    
    selecteIds : null,
    
    todayAuction : null,
    
    auctionModel: {
        modelArr: [],
        selectAll: false,
        allGoodsArr: [], //所有藏品数组名称和ID
        selNum: null, //分页数
        nowPage: null, //当前页
        totalPage: null, //总页数
        inputPage: null, //跳转页
     
        modalTitle: null, //modal标题
        goodsName: null, //藏品名称
        goodsBid: null, //藏品进价
        startTime: "", //开始时间
        endTime: "", //结束时间
        initPrice: 0, //初始价格
        lowPrice: null, //最低加价
        marginPrice: 0, //保证金
        cappedPrice : null,//封顶价
        isVip :0,
        isQuiz: 1, //参加竞猜
        limitNum: 100,//参加竞拍人数
        tickets: 5,//奖金
        
        keyWords: null, //搜索藏品关键字
        startIndex: 0, //从第几页搜索
        curPage: 1, //当前页
        curGoodsID: null, //当前选中藏品ID
        curID: null, //竞拍藏品ID
        isAdd: false, //是否是添加
        isShowInfo: false //是否显示详情页
    },
    
    timer: null, //计时器
    
    //预览拍品model
    goodsDetailModel: {
    	allInfo: null,//预览info
    	pics: [],     //预览banner
    	detail: null, //详情
    	initPrice: null, //初始价
    	lowestPremium: null, //最低价
    	margin: null, //保价
    	cappedPrice: null, //封顶价
    	day: null,    //天
    	hour: null,   //小时
    	min: null     //分钟
    },
    
    init: function($scope){
        this.scope = $scope;
        
        if(!_utility.isEmpty(localStorage.getItem("auctionData")))
        {
        	this.auctionModel.selNum = _utility.getQueryString("selNum");
	        this.auctionModel.nowPage = _utility.getQueryString("nowPage");
	        this.auctionModel.totalPage = _utility.getQueryString("totalPage");
	        this.auctionModel.inputPage = _utility.getQueryString("inputPage");

        }
        else{
        	
        }
        
        
        this.scope.auctionModel = this.auctionModel;
        this.scope.goodsDetailModel = this.goodsDetailModel;

        this.getAuctionList("",self.isVipJudge);

        this.onEvent();
         
        this.changeColor(-1); 
         
        this.getAllGoods();
    },

    reFresh: function(){
        var self = this;

        $("#startTime").val("");
        $("#endTime").val("");
        self.auctionModel.goodsName = null;
        self.auctionModel.initPrice = 0;
        self.auctionModel.lowPrice = null;
        self.auctionModel.marginPrice = 0;
        self.auctionModel.keyWords = null;
        self.auctionModel.startIndex = 0;
        self.auctionModel.goodsBid = null;
        self.auctionModel.cappedPrice = null;
        self.showTheInput = 0;
        self.auctionModel.isVip = 0;  	
        self.auctionModel.limitNum = 100;
        self.auctionModel.tickets = 5;
    },

    //竞拍列表
    getAuctionList: function(type,isVipJudge){
    	
        var self = this;
        if(isVipJudge == -1)
        {   
        	
        	var params = {};
        	if(self.todayAuction == 2)
	        {
	            params.todayAuction = self.todayAuction;
	        }
        }
        else
        {
        	var params = {};
           
            if(self.todayAuction == 2)
	        {
	        
	            params.todayAuction = self.todayAuction;
	        }
	        else{
	        	 params.isVIP = isVipJudge;
	        	 self.todayAuction = null;
	        }
        }
        
     
        pageController.pageInit(self.scope, api.API_GET_AUCTION_LIST, params,

            function(data){
                localStorage.removeItem("auctionData")
                self.getData(data);
            });

        if(_utility.isEmpty(type))
        {
            if(!_utility.isEmpty(self.auctionModel.inputPage))
            {
                pageController.reFreshCurPageJump(self.auctionModel.selNum, self.auctionModel.nowPage,
                    self.auctionModel.totalPage, self.auctionModel.inputPage, function(data) {
                        self.getData(data);
                    }
                )
            }
        }
    },

    /**
     * @param data.count
     * @param data.auctionItems 展品列表
     * @param data.auctionItems.currentPrice 当前价格
     * @param data.auctionItems.bidsNum 竞拍次数
     * @param data.auctionItems.initialPrice 初始价格
     * @param data.auctionItems.lowestPremium 最低加价
     * @param data.auctionItems.cappedPrice 封顶价
     * @param data.auctionItems.margin 保价
     */
    getData: function(data){
    	
        var self = this,
            nowTimestamp = Math.round(new Date() / 1000);
//      console.log("fffff"+JSON.stringify(data))
        if(self.scope.page.selectPageNum)
        {
            var totalNum = Math.ceil(data.count / self.scope.page.selectPageNum);
            pageController.pageNum(totalNum);
        }
      
        self.auctionModel.modelArr = data.auctionItems;
       
        for(var j = 0;j < self.auctionModel.modelArr.length; j++)
        {   
        	
        	self.auctionModel.modelArr[j].goodsInfo.goods_bid = _utility.toDecimalTwo(parseFloat(self.auctionModel.modelArr[j].goodsInfo.goods_bid));
        	self.auctionModel.modelArr[j].currentPrice = _utility.toDecimalTwo(parseFloat(self.auctionModel.modelArr[j].currentPrice));
        	if(self.auctionModel.modelArr[j].initialPrice < 0)
        	{
        		self.auctionModel.modelArr[j].initialPrice = 0;
        	}
        	else
        	{
        		
        	}
        
//      	if(JSON.parse(self.auctionModel.modelArr[j].goodsInfo.goods_pics) == null || JSON.parse(self.auctionModel.modelArr[j].goodsInfo.goods_pics)  == '')
//      	{   
//      		self.auctionModel.modelArr[j].goodsInfo.goods_pics = "[\"assets/images/public/default.png\"]" ;
//      		
//      	}
        	self.auctionModel.modelArr[j].initialPrice = _utility.toDecimalTwo(parseFloat(self.auctionModel.modelArr[j].initialPrice));
        	
        	self.auctionModel.modelArr[j].lowestPremium = _utility.toDecimalTwo(parseFloat(self.auctionModel.modelArr[j].lowestPremium));
         	self.auctionModel.modelArr[j].cappedPrice = _utility.toDecimalTwo(parseFloat(self.auctionModel.modelArr[j].cappedPrice));
        	self.auctionModel.modelArr[j].margin = _utility.toDecimalTwo(parseFloat(self.auctionModel.modelArr[j].margin));
           
        }
        for(var i = 0, len = self.auctionModel.modelArr.length; i < len; i++)
        {
            var status = self.auctionModel.modelArr[i].status,
                sTime = self.auctionModel.modelArr[i].startTime,
                eTime = self.auctionModel.modelArr[i].endTime;

            self.auctionModel.modelArr[i].selected = false;
            self.auctionModel.modelArr[i].type = self.fundAuctionType(status, sTime, eTime, nowTimestamp);

            if(!_utility.isEmpty(self.auctionModel.modelArr[i].goodsInfo.goods_pics))
            {   //默认取第一张图片
//              self.auctionModel.modelArr[i].pic = JSON.parse(self.auctionModel.modelArr[i].goodsInfo.goods_pics)[0];
                self.auctionModel.modelArr[i].pic = self.auctionModel.modelArr[i].goodsInfo.goods_cover;
            }
        }

        self.auctionModel.isShowInfo = false;
        self.scope.$apply();
    },

    /**
     * 判断竞拍状态
     * @param status 竞拍状态
     * @param sTime 上拍时间
     * @param eTime 截拍时间
     * @param nowTimestamp 当前时间戳
     * @returns {*}
     */
    fundAuctionType: function(status, sTime, eTime, nowTimestamp){
        var type = null;

        if(status == 1)
        {
            type = "已下架";
        }
        else
        {
            if(nowTimestamp < sTime)
            {
                type = "已上拍";
            }
            else if(nowTimestamp > eTime)
            {
                type = "已截拍";
            }
            else
            {
                type = "正在拍卖";
            }
        }

        return type;
    },
    
   

    //获取拍品
    getAllGoods: function(keywords){
        var self = this,
            params = {
                startIndex: self.auctionModel.startIndex,
                num: 0, //默认显示全部
                likeStr: keywords
            };
          
        $data.httpRequest("post", api.API_GET_AUCTION_GOODS, params,
            
            /**
             * @param data.goods 全部藏品
             */
            function(data){
                var goods = data.goods;
//              console.log(JSON.stringify(goods))
                self.auctionModel.allGoodsArr = [];
                for(var i = 0, len = goods.length; i < len; i++)
                {
                    self.auctionModel.allGoodsArr.push({
                        id: goods[i].goods_id,
                        name: goods[i].goods_name,
                        bid: parseInt(goods[i].goods_bid),
                        pic: goods[i].goods_cover
//                      pic: JSON.parse(goods[i].goods_pics)[0]
                    })
                }
                self.scope.$apply();
            }
        );
    },

    //获取单个藏品
    getSingleGoods: function(id){
        var self = this,
            params = {
                itemId: id
            };

        $data.httpRequest("post", api.API_GET_AUCTION_INFO, params,

            /**
             * 根据ID获取单个藏品信息
             * @param data.allInfo 藏品信息
             */
            function(data){
                self.reFresh();

                var goodsInfo = data.allInfo;

                self.auctionModel.goodsName = goodsInfo.goodsInfo.goods_name;
                self.auctionModel.goodsBid = parseFloat(goodsInfo.goodsInfo.goods_bid);
                $("#startTime").val(_utility.formatDate(goodsInfo.startTime));
                $("#endTime").val(_utility.formatDate(goodsInfo.endTime));
                self.auctionModel.initPrice = parseFloat(goodsInfo.initialPrice);
                self.auctionModel.lowPrice = parseFloat(goodsInfo.lowestPremium);
                self.auctionModel.cappedPrice = parseFloat(goodsInfo.cappedPrice);
                self.auctionModel.marginPrice = parseFloat(goodsInfo.margin);

                self.auctionModel.isShowInfo = true;
                self.auctionModel.modalTitle = CN_TIPS.MOD_GOODS;
                self.scope.$apply();
            }
        )
    },
    
    //获取预览页面信息
    getPreviewInfo: function(type) {
    	var self = this,
            params = {
                itemId: self.auctionModel.curID
            };

        $data.httpRequest("post", api.API_GET_AUCTION_INFO, params,

             /**
             * @param data.allInfo.cappedPrice 封顶价
             * @param data.allInfo.hasLogin
             * @param data.allInfo.currentUser
             * @param data.allInfo.lowestPremium
             */
            function(data) {
            	if(type)
            	{
            		self.goodsDetailModel.initPrice = self.auctionModel.initPrice;
	            	self.goodsDetailModel.lowestPremium = self.auctionModel.lowPrice;
	            	self.goodsDetailModel.margin = self.auctionModel.marginPrice;
	            	self.goodsDetailModel.cappedPrice = self.auctionModel.cappedPrice;
	            	
	            	var eTime = $("#endTime").val();
                    var eTimeStamp = commonFn.toTime(eTime);
	            	
	            	self.countDown(eTimeStamp);
            	}
            	else
            	{
            		self.goodsDetailModel.initPrice = data.allInfo.initialPrice;
	            	self.goodsDetailModel.lowestPremium = data.allInfo.lowestPremium;
	            	self.goodsDetailModel.margin = data.allInfo.margin;
	            	self.goodsDetailModel.cappedPrice = data.allInfo.cappedPrice;
	            	self.countDown(data.allInfo.endTime);
            	}
            	
            	self.goodsDetailModel.pics = JSON.parse(data.allInfo.goodsInfo.goods_pics);
            	self.goodsDetailModel.detail = data.allInfo.goodsInfo.goods_detail;
            	
                self.scope.$apply();
                
                //弹框
            	$dialog.open2("预览", ['320px','500px'], $("#preview"))
            }
        )
    },
    
    //倒计时
	countDown: function(timestamp)
	{
        var self = this;
		var currentDate = new Date().getTime();
		var second1 = Math.ceil(currentDate/1000);
		var time = (parseInt(timestamp) - second1);
		
		if(time > 0)
		{
			clearInterval(self.timer);
			self.timer = setInterval(function() {
				if(time <= 0){ clearInterval(self.timer); }
				time--;
				
				self.goodsDetailModel.day = Math.floor(time/3600/24);
				self.goodsDetailModel.hour = Math.floor(time%(3600*24)/3600);
				self.goodsDetailModel.min =  Math.floor((time%3600)/60);
				self.scope.$apply();
			},1000);
		}
		else
		{
			self.goodsDetailModel.day = 0;
			self.goodsDetailModel.hour = 0;
			self.goodsDetailModel.min =  0;
		}
    },
    
    //检查参数是否填写完整
    checkOver: function() {
    	var self = this;
    	var sTime = $("#startTime").val();
    	var eTime = $("#endTime").val();
    	
    	if(_utility.isEmpty(self.auctionModel.curID))
    	{
    		$dialog.msg("请选择藏品");
    		return false;
    	}
    	if(_utility.isEmpty(sTime))
    	{
    		$dialog.msg(CN_TIPS.SELECT_START_TIME, 1.6);
            return false;
    	}
    	if(_utility.isEmpty(eTime))
    	{
    		$dialog.msg(CN_TIPS.SELECT_END_TIME, 1.6);
            return false;
    	}
        if(sTime > eTime)
        {
            $dialog.msg(CN_TIPS.COMPARE_TIME, 1.6);
            return false;
        }
        if(_utility.isEmpty(self.auctionModel.lowPrice))
        {
            $dialog.msg(CN_TIPS.LOW_PRICE_BLANK, 1.6);
            return false;
        }

		return true;
    },
    
    //点击筛选改变颜色
    changeColor : function(type){
    	var index = type + 2; 
    	$("#auction-checeking").children().eq(0).css({"background":"#B07B67","color":"#ffffff"});
    	$("#auction-checeking").off("click");
    	$("#auction-checeking").on("click",".checking",function(index){
    		$(this).css({"background":"#B07B67","color":"#ffffff"}).siblings().css({"background":"#FFFFFF","color":"#777777"});
    	})
    },
    onEvent: function(){
        var self = this;
        
        //是否设置封顶价
        self.scope.toShowInput = function(type){
        	
        	if(type == 1)
        	{   
        		$("#to-turn-off").removeClass("is-checking");
        		$("#to-turn-on").addClass("is-checking");
        		$("#height-price-hide").css("display","block")
        	}
        	else
        	{   
        		$("#to-turn-on").removeClass("is-checking");
        		$("#to-turn-off").addClass("is-checking");
        		$("#height-price-hide").css("display","none")
        	}
        	self.showTheInput = type;
        },
     
        //分类获取拍品
         
        self.scope.getDifGoods = function(type){
        	
        	
        	var page = {
		        totalPage: 0,
		        currentPage: 1,
		        selectPageNum: 10,
		        inputPage: 1
		    };
        	pageController.page = page;
        	pageController.scope.page = pageController.page;
        	
        	if(type != 2)
        	{    
        		
        		self.isVipJudge = type;
        		self.todayAuction = null;
        	}
        	else
        	{  
        	
        		self.todayAuction = type;
        	}
        	self.getAuctionList("",self.isVipJudge);
        	
        	self.changeColor(type);
        };
        
        //是否参与有奖竞猜
        
        self.scope.toShowJoin = function(type){
        	self.auctionModel.isQuiz = type;
        	if(type == 1)
        	{
        		$("#to-turn-off-quiz").removeClass("is-checking");
        		$("#to-turn-on-quiz").addClass("is-checking");
        		$("#quiz-hide").css("display","block")
        	}
        	else
        	{
        		$("#to-turn-on-quiz").removeClass("is-checking");
        		$("#to-turn-off-quiz").addClass("is-checking");
        		$("#quiz-hide").css("display","none")
        	}
        };
        //预览
        self.scope.preview = function() {
        	if(self.auctionModel.isAdd) //判断是添加同时检查填写参数，然后根据id调参数
    		{
    			if(self.checkOver())
    			{
    				self.getPreviewInfo(1); //有参数表示添加
    			}
    		}
    		else //修改就调接口
    		{
    			self.getPreviewInfo();
    		}
        };
        
        //选择是普通商品还是VIP商品
        self.scope.setPredicable = function(type){
        	self.auctionModel.isVip = type;
        	if(type == 0)
        	{
        		$("#very-important").removeClass("radio-checked");
        		$("#not-important").addClass("radio-checked");
        		
        	}
        	else
        	{
        		$("#very-important").addClass("radio-checked");
         		$("#not-important").removeClass("radio-checked");
        	}
        	
        };
        //查看图片大图
        self.scope.checkImg = function(){
            $dialog.photos('#tBodyAuction');
        };

        //搜索
        self.scope.searchGoods = function(){
            self.getAllGoods(self.auctionModel.keyWords);
        };

        //选择一个藏品
        self.scope.selCurGoods = function(item){
            self.auctionModel.curID = item.id;
            self.auctionModel.goodsName = item.name;
            self.auctionModel.goodsBid = item.bid;
            
            $(".sel-goods-box").removeClass("ctrl-goods-show");
        };

        //下架
        self.scope.offShelves = function(id){
            self.auctionModel.curID = id;
            self.offShelvesGoods();
        };

        //显示添加藏品盒子
        self.scope.checkGoodsBox = function(){
            $(".sel-goods-box").addClass("ctrl-goods-show");
            
        };

        //关闭藏品盒子
        self.scope.closeGoodsBox = function(){
            $(".sel-goods-box").removeClass("ctrl-goods-show");
        };

        //全选
        self.scope.allSel = function(){
            commonFn.switchSelAll(self.auctionModel);
        };

        //单选
        self.scope.oneSel = function(curID){
            commonFn.switchSelOne(curID, self.auctionModel, "id");
        };

        //删除
        self.scope.delAuctions = function(){
            
            self.selecteIds = commonFn.findSelIds(self.auctionModel, 'id');
            if(!_utility.isEmpty(self.selecteIds))
            {
            	$("#all-fixed-table-act").css({"display":"block"}) 
            }
        };
        
        self.scope.yesToDelete = function(type){
        	
        	if(type == 0)
        	{
        		$("#all-fixed-table-act").css({"display":"none"});
        		if(self.auctionModel.selectAll)
	            {
	                self.getAuctionList(1,self.isVipJudge);
	                self.auctionModel.selectAll = false;
	            }
	            else
	            {
	                pageController.reFreshCurPage();
	            }
        	}
        	 else
        	 {
        	 	
        	 	if(!_utility.isEmpty(self.selecteIds))
	            {   
	            	
	                commonFn.delListByIds(self.selecteIds, 'itemIds', api.API_DEL_AUCTION_ITEM, function(){
	                    $dialog.msg(CN_TIPS.DEL_OK, 1.6);
	
	                    if(self.auctionModel.selectAll)
	                    {
	                        self.getAuctionList(1,self.isVipJudge);
	                        self.auctionModel.selectAll = false;
	                    }
	                    else
	                    {
	                        pageController.reFreshCurPage();
	                    }
	                    $("#all-fixed-table-act").css({"display":"none"})
	                })
	            }
        	 	
        	 }
        	
        	
        };
        
        
        //初始化时间设置
        var start = {
            format: 'YYYY-MM-DD hh:mm:ss',
            minDate: $.nowDate(0),
            isinitVal:true,
            maxDate: '2099-06-16 23:59:59',
            choosefun: function(elem,datas){
                end.minDate = datas;
                $("#endTime").val($.addDate(datas, 7)); //默认截拍时间顺延7天
            }
        };
        var end = {
            format: 'YYYY-MM-DD hh:mm:ss',
            minDate: $.nowDate(0),
            isinitVal:true,
            initAddVal: [7],
            maxDate: '2099-06-16 23:59:59',
            choosefun: function(elem, datas){
                start.maxDate = datas;
            }
        };

        //发布藏品
        self.scope.addAuction = function(){
        	$("#to-turn-on").removeClass("is-checking");
        	$("#to-turn-off").addClass("is-checking");
        	$("#height-price-hide").css("display","none");
        	$("#very-important").removeClass("radio-checked");
        	$("#not-important").addClass("radio-checked");
            self.auctionModel.isShowInfo = true;
            self.auctionModel.modalTitle = CN_TIPS.PUBLISH_GOODS;
            self.auctionModel.isAdd = true;

            self.reFresh();
//          self.auctionModel.isVip = 0;
            self.initSwiper();
            self.getAllGoods();

            var $startTime = $("#startTime"),
                $endTime = $("#endTime"),
                timestamp1 = Math.round(new Date() / 1000), //获取当前时间戳
                timestamp2 = timestamp1 + 60*60*24*7, //默认顺延七天
                nowTime = _utility.formatDate(timestamp1, true),
                nowTime2 = _utility.formatDate(timestamp2, true),
                allTime = nowTime +' '+"22:00:00",
                allTime2 = nowTime2 +' '+"22:00:00";

            $startTime.jeDate(start);
            $endTime.jeDate(end);

            //设置默认时间为每天22:00:00
            $startTime.val(allTime);
            $endTime.val(allTime2);
        };

        //修改竞拍藏品
        self.scope.modAuctionGoods = function(id){
            self.auctionModel.curID = id;
             
            self.auctionModel.isAdd = false;
            self.getSingleGoods(id);

            $("#startTime").jeDate(start);
            $("#endTime").jeDate(end);
        };

        //返回列表
        self.scope.back2main = function(){
            self.auctionModel.isShowInfo = false;
            $(".sel-goods-box").removeClass("ctrl-goods-show");
            $("#to-turn-on").removeClass("is-checking");
        	$("#to-turn-off").addClass("is-checking");
        	$("#height-price-hide").css("display","none");
   
        };

        //提交数据
        self.scope.submitAuction = function(){
            self.auctionModel.startTime = $("#startTime").val();
            self.auctionModel.endTime = $("#endTime").val();
           
            if(self.auctionModel.isAdd)
            {   
            	if(self.auctionModel.isQuiz == 0){
            		self.auctionModel.limitNum = null;
            		self.auctionModel.tickets = null;
            	}else{
            		if(self.auctionModel.limitNum >= 3){
            			self.auctionModel.limitNum = self.auctionModel.limitNum;
            			self.auctionModel.tickets = self.auctionModel.tickets;
            		}else{
            			$('#tips').css("display","block");
            			return;
						
            		}
            	}
            	
            	if(self.auctionModel.initPrice == "" || self.auctionModel.initPrice == null)
            	{
            		self.auctionModel.initPrice = 0;
            	}
            	if(self.showTheInput == 1)
            	{   
            		
            		if(self.auctionModel.cappedPrice == null || self.auctionModel.cappedPrice =="" || self.auctionModel.cappedPrice < 0)
            		{
            			$dialog.msg(CN_TIPS.NEED_MORE_THAN_ZERO, 1.6);
            			return;
            		}
            		else if(self.auctionModel.initPrice + self.auctionModel.lowPrice >= self.auctionModel.cappedPrice)
                	{
                		$dialog.msg(CN_TIPS.NEED_MORE_THAN_INITPRICE, 2.5);
                		return;
                	}
                	self.showTheInput = 0;
                	
            	}
            	else
            	{   
            		self.auctionModel.cappedPrice = 0;
            	
            	}
               
            	if(self.auctionModel.initPrice < 0)
            	{   
            		$dialog.msg(CN_TIPS.PRICE_MUSTTHAN_ZERO, 1.6);
            		self.auctionModel.initPrice = 0;
            		return;
            	}
            	else
            	{   
            		if(self.auctionModel.lowPrice == "" || self.auctionModel.lowPrice == null)
            	    {
            		    self.auctionModel.lowPrice = 0;
            	    }	
            		if(self.auctionModel.lowPrice < 0)
            		{
            			$dialog.msg(CN_TIPS.LOW_PRICE_BLANK_LESS, 1.6);
            			self.auctionModel.lowPrice = 0;
            		    return;
            		}
            		else
            		{	
            			
            			self.publishGoods();
            		}
            	}
                
            }
            else
            {
                self.modAuctionItem();
            }
           	
        };

        //跳页查看竞拍记录
        self.scope.checkBiddingList = function(id, bidsNum){
            
            if(bidsNum == 0)
            {
                $dialog.msg(CN_TIPS.NO_DATA, 1.6);
            }
            else
            {
                var selNum = self.scope.page.selectPageNum,
                    nowPage = self.scope.page.currentPage,
                    totalPage = self.scope.page.totalPage,
                    inputPage = self.scope.page.inputPage;
                    
                location.href = JUMP_URL.BIDDING_LIST + "?biddingID=" + id
                    + "&selNum=" + selNum + "&nowPage=" + nowPage
                    + "&totalPage=" + totalPage + "&inputPage=" + inputPage;
            
            }
           
        };
       
    },
    
    //初始化swiper
    initSwiper: function(){
    	var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplayDisableOnInteraction: false
        });
    },

    //发布拍品
    publishGoods: function(){
        var self = this,
            params = {
                goodsId: self.auctionModel.curID,
                initialPrice: self.auctionModel.initPrice,
                lowestPremium: self.auctionModel.lowPrice,
                margin: self.auctionModel.marginPrice,
                startTime: self.auctionModel.startTime,
                endTime: self.auctionModel.endTime,
                cappedPrice : self.auctionModel.cappedPrice,
                isVIP:self.auctionModel.isVip,
                isQuiz: self.auctionModel.isQuiz,
                limitNum: self.auctionModel.limitNum,
                tickets: self.auctionModel.tickets,
            };
// 		console.log(params);
        if(self.checkParams(params))
        {
            $data.httpRequest("post", api.API_RELEASE_AUCTION_ITEM, params, function(){
				$dialog.msg(CN_TIPS.PUBLISH_OK, 1.6);
                self.getAuctionList(1,self.isVipJudge);
               
            })
        }
    
    },

    //修改藏品
    modAuctionItem: function(){
        var self = this,
            params = {
                itemId: self.auctionModel.curID
            },
            modInfo = {};
            
            if(self.auctionModel.initPrice < 0)
            {
            	self.auctionModel.initPrice = 0;
            	
            }
            else
            {
            	
            }
        modInfo.initialPrice = self.auctionModel.initPrice;
        modInfo.lowestPremium = self.auctionModel.lowPrice;
        modInfo.cappedPrice = self.auctionModel.cappedPrice;
        modInfo.margin = self.auctionModel.marginPrice;
        modInfo.startTime = self.auctionModel.startTime;
        modInfo.endTime = self.auctionModel.endTime;

        if(self.checkParams(modInfo, 1))
        {
            params.modInfo = JSON.stringify(modInfo);
            $data.httpRequest("post", api.API_MOD_AUCTION_ITEM, params, function(){
            	
				$dialog.msg(CN_TIPS.MOD_OK, 1.6);
                self.getAuctionList(1,self.isVipJudge);
            })
        }
    },

    //下架藏品
    offShelvesGoods: function(){
        var self = this,
            params = {
                itemId: self.auctionModel.curID
            };

        $data.httpRequest("post", api.API_SET_AUCTION_OFF, params, function(){
            $dialog.msg(CN_TIPS.OPERATE_OK, 1.6);
            pageController.reFreshCurPage();
        });
    },

    //检查参数
    checkParams: function(params, type){
        if(_utility.isEmpty(params.goodsId) && _utility.isEmpty(type))
        {
            $dialog.msg(CN_TIPS.SELECT_GOODS, 1.6);
            return false;
        }
        if(_utility.isEmpty(params.startTime))
        {
            $dialog.msg(CN_TIPS.SELECT_START_TIME, 1.6);
            return false;
        }
        if(_utility.isEmpty(params.endTime))
        {
            $dialog.msg(CN_TIPS.SELECT_END_TIME, 1.6);
            return false;
        }
        if(params.startTime > params.endTime)
        {
            $dialog.msg(CN_TIPS.COMPARE_TIME, 1.6);
            return false;
        }
        if(_utility.isEmpty(params.lowestPremium))
        {
            $dialog.msg(CN_TIPS.LOW_PRICE_BLANK, 1.6);
            return false;
        }

        return true;
    }
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
//                  self.infoModel.orderArr[i].img = JSON.parse(self.infoModel.orderArr[i].orderGoods[0].goods_pics)[0];
                    self.infoModel.orderArr[i].img = self.infoModel.orderArr[i].orderGoods[0].goods_cover;
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