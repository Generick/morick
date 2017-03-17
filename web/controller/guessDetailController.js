/*
 * 商品详情
 */

app.controller("ctrl", function($scope) {
	
	sessionStorage.setItem("itIsGuessPage",1)
    GuessInfoCtrl.init($scope);
   
});

var GuessInfoCtrl = {
	scope : null,
    
    thisDetailPage : null,
    
    thisDataId : null,
    
    wasLogin : false,
    
    goodsDetailModel : 
    {
    	id : null, //商品id
    	allInfo : {},
 
    	showReference : true
    },
    
    biddingModel :
    {
    	biddingList : [],
    	num : 0,
    	count : 0,
    	checkMore : null,
    	numDel : false, //出价数目删除
    	initialPrice : null //初始价
    },

    
    balance : null, //用户余额
 
 
    timer: null, //定时器
    
    init : function ($scope)
    {
    	this.scope = $scope; 
    	
    	this.getUrlAndIds();

    	this.initData();
    	
    	this.bindClick();
  
    	this.getSelfInfo();
    	
    	this.ngRepeatFinish();
  	    
    	initTab.start(this.scope, -1); //底部导航
	    
    },
    getUrlAndIds :function(){
    	
    	var self = this;
    	if(location.href.indexOf("&") != -1)
		{   
			
			self.thisDetailPage = location.href.split("&")[1].split("=")[1];
			self.thisDataId = location.href.split("&")[0].split("=")[1];
			
            if(String(self.thisDetailPage).indexOf("#") != -1)
			{
				 self.thisDetailPage = parseInt(self.thisDetailPage.split("#")[0]);
				    	    	
			}
			else
			{
				self.thisDetailPage = parseInt(self.thisDetailPage);
			}
			if(String(self.thisDataId).indexOf("#") != -1)
			{
				self.thisDataId = parseInt(self.thisDataId.split("#")[0]);
				    	    	
			}
			else
			{
				self.thisDataId = parseInt(self.thisDataId);
			}
				    	
		}
    },
    
   
    initData: function() {
    	var self = this;

    	$('.animation').css('display','block'); //加载动画
    	
    	var params = {};
    	
    	if(location.href.indexOf("?") > 0)
    	{   
    		
    		params.auctionId = commonFu.getQueryStringByKey("id"); //当前藏品ID
    		
    		self.goodsDetailModel.id = params.auctionId;
    		
    	}
 
    	self.setReadLog();
        
//      alert(JSON.stringify(params))

    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_GUESSDETAIL, params,
            /**
             * @param data.allInfo.referencePrice 参考价
             * @param data.allInfo.hasLogin
             * @param data.allInfo.currentUser
             * @param data.allInfo.lowestPremium
             */
            function(data) {
                  
                  
 					console.log("chushi"+JSON.stringify(data))
            		self.goodsDetailModel.allInfo = [];
            		self.goodsDetailModel.allInfo = data;
	                self.goodsDetailModel.allInfo.goods_icon = JSON.parse(data.goods_icon); 
//                  alert(JSON.stringify(self.goodsDetailModel.allInfo.goods_icon))
	                self.wasLogin = data.hasLogin;
	                $('#goodsContent').html(self.goodsDetailModel.allInfo.goods_detail);
	                
//	                alert(self.goodsDetailModel.allInfo.goods_icon[0])
	                setTitle(self.goodsDetailModel.allInfo.goods_name);
	
	                //倒计时初始化
	                var currentDate = new Date().getTime();
	                var second1 = Math.ceil(currentDate/1000);
	                var time = (parseFloat(self.goodsDetailModel.allInfo.startTime) - second1);
	                if (time <= 0)
	                {
	                    $('#endTime').hide();
	                    $('.endtime-text').html("");
	                    $('.endtime-time').html("竞猜结束");
	                    $('#goodsBtn').attr({"disabled": "disabled", "class": "goods-btn-un"});
	                    $("#selfGoodsBtn").attr({"disabled":"disabled", "class": "goods-btn-un"});
	                }
	                var day = Math.floor(time/(3600*24));
	                var hour = Math.floor((time/3600)%24);
	                var min = Math.floor((time%3600)/60) + 1;
	                var sec =  Math.floor(time%60);
	                $('#day').html(day);
	                $('#hour').html(hour);
	                $('#minute').html(min);
	                $('#second').html(sec);
	
	                self.countDown(self.goodsDetailModel.allInfo.startTime);
	            
	                self.scope.goodsDetailModel = self.goodsDetailModel;
	                $('.animation').css('display','none');
	                $('.container').css('opacity','1');
	                self.scope.$apply();

            });
    	
    	//设置title
    	function setTitle(title)
    	{
		    document.title = title + " - 雅玩之家";
    	}
    },
    
  
    //jquery倒计时
	countDown : function(timestamp)
	{
        var self = this;
		var currentDate = new Date().getTime();
		var second1 = Math.ceil(currentDate/1000);
		var time = (parseFloat(timestamp) - second1);
//		console.log("cur"+second1)
        clearInterval(self.timer);
		self.timer = setInterval(function ()
		{
			if(time <= 0)
			{
				$('#endTime').hide();
				$('.endtime-text').html("");
				$('.endtime-time').html("竞猜结束");
                $('#goodsBtn').attr({"disabled": "disabled", "class": "goods-btn-un"});
                $("#selfGoodsBtn").attr({"disabled":"disabled", "class": "goods-btn-un"});
				clearInterval(self.timer);
			}
			time--;
			
			var day = Math.floor(time/(3600*24));
            var hour = Math.floor((time/3600)%24);
            var min = Math.floor((time%3600)/60) + 1;
            var sec =  Math.floor(time%60);
            $('#day').html(day);
			$('#hour').html(hour);
			$('#minute').html(min);
			$('#second').html(sec);
		},1000);
    },
    
    
    //获取个人账户信息
    getSelfInfo: function()
    {
    	var self = this;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data) {
    		
    		self.balance = data.userInfo.balance;
    		self.scope.$apply();
    	})
    },

    //记录拍品已阅读
    setReadLog: function() {
    	var self = this;
    	
    	var param = 
    	{
    		readType : 1,
    		readId : self.goodsDetailModel.id
    	};
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_READLOG, param, function()
    	{
    		self.scope.$apply();
    	})
    },
 
  
    
      //保留两位小数
    toDecimals : function (x) {  
    	
        var f = parseFloat(x);    
        if (isNaN(f)) {    
            return false;    
        }    
        var f = Math.round(x*100)/100;    
        var s = f.toString();    
        var rs = s.indexOf('.');    
        if (rs < 0) {    
            rs = s.length;    
            s += '.';    
        }    
        while (s.length <= rs + 2) {    
            s += '0';    
        }    
        return s;    
    } ,   
   
    bindClick: function ()
    {
    	var self = this;
    
    	//跳到竞猜页面
    	self.scope.jumpToGuess = function(item){
    		
    		if(self.wasLogin)
    		{
    			sessionStorage.setItem("comeWithGuess",0)
    			location.href = pageUrl.GUESS_INNER +"?id="+ self.thisDataId + "&page=" +self.thisDetailPage;
    		}
    		else
    		{
    			$dialog.msg("您还未登录！")
    			setTimeout(function(){
    				location.href = pageUrl.LOGIN_PAGE;
    			},1500);
    			
    		}
    		
    	};
    	
    	
    	//更新
    	self.scope.onClickUpdateTime = function()
    	{
    		var time = commonFu.getNowFormatDate();
    		$('#updateTime').html(time);
    		
    		var  params = {};
    		params.auctionId = self.thisDataId;
            jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_GUESSDETAIL, params,function(data){
            	
            	self.goodsDetailModel.allInfo.sum = data.sum;
            	self.scope.$apply();
//           	alert(JSON.stringify(data))
            });


    	};
  
 
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
    }
};
