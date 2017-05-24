/*
 * 拍卖历史详情
 */


var auctedGoodsDetailController =
{
	scope : null,
    
    wxParams : {},
    shareInfo : {},
    auctedGoodsDetailModel:
    {
    	id : null,//商品id
    	allInfo : {},
    	showReference : true,
    	auctionDetailText : null,
    	currentPrice : null,
    	auctionSuccess : false,
    	isShowHighest : false
    },
    
    thisDetailPage :null,
    
    thisDataId : null,
    
    biddingModel:
    {
    	id : null,//竞拍人id
    	biddingList : [],
    	isCheckOver : true,//查看更多
    	num : 0,
    	count : 0,
    	checkMore : null,
    	numDel : false,//出价数目删除
    	initialPrice : null//初始价钱
    },
    
    init : function ($scope,wxParams)
    {
    	this.scope = $scope; 
    	
    	this.wxParams = wxParams;
    	
    	this.getUrlAndIds();
    	
    	this.bindClick();
    	
    	this.initData();
    	
    	this.initBiddingData();

        this.ngRepeatFinish();
        
        initTab.start(this.scope, -1); //底部导航
    },
    
    getUrlAndIds : function(){
    	
    	var self = this;
    	
    	var arr = [];
    	
    	if(commonFu.getUrlPublic(location.href).length == 2)
    	{
    		arr = commonFu.getUrlPublic(location.href);
	    	self.thisDetailPage = arr[0];
	    	self.thisDataId = arr[1];
    	}
    	
    },
    
    initData : function ()
    {
    	var self = this;
    	
    	$('.animation').css('display','block');
    	
    	var params = {
            itemId: null
        };
    	
    	if(location.href.indexOf("?") > 0)
    	{
    		params.itemId = commonFu.getQueryStringByKey("id");
    		self.auctedGoodsDetailModel.id = params.itemId;
    	}
    	
//  	self.setReadLog();
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_AUCTION_INFO, params, function(data)
    	{  
//              console.log(JSON.stringify(data))
    			self.auctedGoodsDetailModel.allInfo = [];
	    		self.auctedGoodsDetailModel.allInfo = data.allInfo;
	    		self.auctedGoodsDetailModel.auctionSuccess = false;
	    		if(!commonFu.isEmpty(self.auctedGoodsDetailModel.allInfo.goodsInfo))
	    		{
	    			self.auctedGoodsDetailModel.allInfo.goodsInfo.goods_pics = JSON.parse(data.allInfo.goodsInfo.goods_pics);
	    		    var imgArr = self.auctedGoodsDetailModel.allInfo.goodsInfo.goods_pics;
	                self.shareInfo.img = (commonFu.isEmpty(imgArr) || imgArr.length == 0) ? "" : imgArr[0];
	    		
	    		}
				
			    self.auctedGoodsDetailModel.allInfo.currentPrice = commonFu.toDecimals(self.auctedGoodsDetailModel.allInfo.currentPrice);
				if(!commonFu.isEmpty(self.auctedGoodsDetailModel.allInfo.goodsInfo))
	    		{
	    			$('#goodsContent2').html(self.auctedGoodsDetailModel.allInfo.goodsInfo.goods_detail);
	    			
	    			self.shareInfo.content = commonFu.returnRightReg(self.auctedGoodsDetailModel.allInfo.goodsInfo.goods_detail).substr(0,63);
	    			
	    		}
				
	            if(parseFloat(self.auctedGoodsDetailModel.allInfo.cappedPrice) > 0)
	            {
	            	self.auctedGoodsDetailModel.isShowHighest = true;
	            }
	            else{
	            	self.auctedGoodsDetailModel.isShowHighest = false;
	            }
	            //竞拍的人数
	            var userNum = parseInt(self.auctedGoodsDetailModel.allInfo.currentUser);
				if( userNum > 0) //人数大于0竞拍成功
				{
					self.auctedGoodsDetailModel.auctionSuccess = true;
				}
	
				if (parseInt(self.auctedGoodsDetailModel.allInfo.referencePrice) == 0)
				{
					self.auctedGoodsDetailModel.showReference = false;
				}
				if(!commonFu.isEmpty(self.auctedGoodsDetailModel.allInfo.goodsInfo))
	    		{
	    			setTitle(self.auctedGoodsDetailModel.allInfo.goodsInfo.goods_name);
	    			
	    			self.shareInfo.title =  commonFu.returnRightReg(self.auctedGoodsDetailModel.allInfo.goodsInfo.goods_name);
	    			self.shareInfo.title =  self.shareInfo.title + " - 雅玩之家";
	    		}
	            $('.animation').css('display','none');
	            $('.container').css('opacity','1');
	          
	            commonFu.setShareTimeLine(self.wxParams,self.shareInfo,location.href);
	            
	            self.scope.auctedGoodsDetailModel = self.auctedGoodsDetailModel;
	            self.scope.$apply();
 
    	});

    	//设置title
    	function setTitle(title) {
		    document.title = title + " - 雅玩之家";
    	}
    },
    
//  //记录拍品已阅读
//  setReadLog: function()
//  {
//  	var self = this;
//  	
//  	var param = {
//  		readType : 1,
//  		readId : self.auctedGoodsDetailModel.id
//  	};
//  	
//  	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_READLOG, param, function()
//  	{
//  		self.scope.$apply();
//  	})
//  },

    //初始化竞拍记录
    initBiddingData: function()
    {
    	var self = this;
    	
    	self.biddingModel.num +=5;
    	
    	var params = 
    	{
    		itemId : self.auctedGoodsDetailModel.id,
    		startIndex : 0,
    		num : self.biddingModel.num
    	};
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_BIDDING_LIST, params, function(data){
    		self.biddingModel.biddingList = [];
    		self.biddingModel.biddingList = data.biddingList;
    		self.biddingModel.count = data.count;
    		
    		if(self.biddingModel.count <= 5)
    		{
    			self.biddingModel.isCheckOver = false;
    		}
    		
    		for (var i=0;i<self.biddingModel.biddingList.length;i++) 
    		{
    			self.biddingModel.biddingList[i].nowPrice = parseInt(self.biddingModel.biddingList[i].nowPrice);
    			
    			if (!commonFu.isEmpty(self.biddingModel.biddingList[i].userData))
	    		{
	    			self.biddingModel.biddingList[i].userData.telephone = commonFu.telephoneDispose(self.biddingModel.biddingList[i].userData.telephone);
	    			self.biddingModel.biddingList[i].nowPrice = commonFu.toDecimals(self.biddingModel.biddingList[i].nowPrice)
	    			if (commonFu.isEmpty(self.biddingModel.biddingList[i].userData.smallIcon))
	    			{
	    				self.biddingModel.biddingList[i].userData.smallIcon = "img/personCenter/default-icon.png";
	    			}
	    		}
    		}
    		
    		self.scope.biddingModel = self.biddingModel;
    		self.biddingModel.checkMore = "查看更多";
    		self.scope.checkMore = self.biddingModel.checkMore;
    		self.scope.$apply();
    	})
    },
    
    
   
    bindClick: function()
    {
    	var self = this;
    	
    	//我要竞猜
    	
    	self.scope.jumpToGuess = function(){
    		
     		sessionStorage.setItem("comeWithGuess",2)
    		location.href = pageUrl.GUESS_INNER +"?id="+ self.thisDataId + "&page=" +self.thisDetailPage;
    	};
    	
    	
    	//更新
    	self.scope.onClickUpdateTime = function()
    	{
    		var time = commonFu.getNowFormatDate();
    		$('#updateTime2').html(time);
    		self.biddingModel.num = 0;
    		self.biddingModel.isCheckOver = true;
    		self.initBiddingData();
    	};
    	
    	//查看更多
    	self.scope.onClickCheckMore = function()
    	{
    		self.biddingModel.checkMore = "加载中...";
    		self.initBiddingData();
    		if (self.biddingModel.num >= self.biddingModel.count)
    		{
    			self.biddingModel.isCheckOver = false;
    		}
    		
    		self.scope.checkMore = self.biddingModel.checkMore;
    	}
    },

    ngRepeatFinish: function() {
        var self = this;

        self.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
//              autoplay: 3000,
                autoplayDisableOnInteraction: false
            });
        });
    },
   
  
};