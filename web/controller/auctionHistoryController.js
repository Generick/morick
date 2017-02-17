/*
 * 拍卖历史
 */

app.controller("ctrl", function ($scope)
{
    AuctionHistoryCtrl.init($scope);
});

var AuctionHistoryCtrl =
{
    scope : null,
   
    auctionHistoryModel : 
    {
    	auctionItems : [],
    	id : null
    },
    
    init : function ($scope)
    {

    	this.scope = $scope; 
    	
    	this.bindClick();
    	
    	this.initData();
        
        this.ngRepeatFinish();
        
        //initTab.start(this.scope, 2); //底部导航
        initTab.start(this.scope, 1); //底部导航
    },

    initData : function ()
    {
    	var self = this;
    	
    	var params = 
    	{
    		startIndex : 0,
    		num : 0,
    		type : 1
    	};
    	
    	$('.animation').css('display','block');
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_AUCTION_ITEMS, params, function(data){
    		
    		
    		self.auctionHistoryModel.auctionItems = [];
    		self.auctionHistoryModel.auctionItems = data.auctionItems;
    		if (self.auctionHistoryModel.auctionItems.length > 0)
    		{
    			$(".no-data").css('display','none');
    			var goods = self.auctionHistoryModel.auctionItems;
	    		for (var i=0;i<goods.length;i++)
	    		{
	    			 
		    		goods[i].goodsInfo.goods_pics = JSON.parse(goods[i].goodsInfo.goods_pics);
		    		goods[i].isAucted = false;
//                  goods[i].aucted = "img/aucted0.png";
                 
		    		if (!commonFu.isEmpty(goods[i].currentUserInfo))
		    		{
		    			
		    			goods[i].isAucted = true;
		    			goods[i].currentPrice = "￥" + self.toDecimals(parseFloat(goods[i].currentPrice));
		    			
		    			
		    		}
		    		
	    		}
    		}
    		else
    		{
    			$(".no-data").css('display','block');
    		}
    		
    		self.scope.auctionItems = self.auctionHistoryModel.auctionItems;
    		$('.animation').css('display','none');
    		$('.container').css('opacity','1');
    		self.scope.$apply();
    	})
    },
    
    getDisToTop : function(){
    	if(sessionStorage.getItem("aucDisId"))
  		{
  			var id = sessionStorage.getItem("aucDisId");
       		var dealTop = $("#" + id).offset().top;
      		$("html,body").scrollTo({toT:dealTop})
	  	}
    	
//  	sessionStorage.setItem("aucDisId","#test_"+id);
//		sessionStorage.setItem("aucDisTop",$("#test_"+id).offset().top);
//	    alert(sessionStorage.getItem("aucDisId"));
//	    alert(sessionStorage.getItem("aucDisTop"));
    },
    
    bindClick  : function ()
    {
    	var self = this;
    	
    	self.scope.onClickToAuctionHistoryDetail = function(id)
    	{
    		self.auctionHistoryModel.id = id;
    		sessionStorage.setItem("aucDisId","test_"+id);
    		location.href = pageUrl.AUCTION_HISTORY_INFO + "?id=" + id;
    	};
    },
    
    ngRepeatFinish : function()
    {
    	var self = this;
    	
    	this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
    		self.getDisToTop();
    		sessionStorage.setItem("aucDisId","");
    	});
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

};

	$.fn.scrollTo =function(options){
        var defaults = {
            toT : 0, //滚动目标位置
            durTime : 50, //过渡动画时间
            delay : 30, //定时器时间
            callback:null //回调函数
        };
        var opts = $.extend(defaults,options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(),//滚动条当前的位置
            subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function(t){
                index++;
                var per = Math.round(subTop/dur);
                if(index >= dur){
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if(opts.callback && typeof opts.callback == 'function'){
                        opts.callback();
                    }
                    return;
                }else{
                    _this.scrollTop(curTop + index*per);
                }
            };
        timer = window.setInterval(function(){
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };
