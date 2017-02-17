/*
 * 
 * 精选
 * 
 */

app.controller("ctrl", function ($scope)
{
    SelectCtrl.init($scope);
});

var SelectCtrl =
{   
    scope: null,
    
    selectedModel: {
    	auctionItems: []
    },
    
    init: function($scope) {
    	this.scope = $scope;
    	
    	this.bindClick();
    	
    	this.initData();
       
        this.ngRepeatFinish();
        
        initTab.start(this.scope, 0); //底部导航
    },

    initData: function() {
    	var self = this;
    
    		var params = 
    	    {
	    		startIndex : 0,
	    		num : 0,
	    		type : 0
    	    };
 
    	$('.animation').show();
    	
//  	console.log('params:' + JSON.stringify(params));
  
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_AUCTION_ITEMS, params, function(data){
    	  
    	    self.selectedModel.auctionItems = [];
    		
    		self.selectedModel.auctionItems = data.auctionItems;
    		
    		if(self.selectedModel.auctionItems.length == 0)
    		{
    			$("#list-empty").css({"padding":"0 5px"})
    		}
    		if (self.selectedModel.auctionItems.length > 0)
    		{
    			$(".no-data").hide();
    			var goods = self.selectedModel.auctionItems;
	    		for (var i = 0; i < goods.length; i++)
	    		{
		    		goods[i].goodsInfo.goodsPicsShow = JSON.parse(goods[i].goodsInfo.goods_pics)[0];
                    
                    goods[i].isShowPrice = !commonFu.isEmpty(goods[i].currentUserInfo); //是否已经有人出价
                    
                    
                    goods[i].currentPrice = self.toDecimals(goods[i].currentPrice);
	    		}
    		}
    		else
    		{
    			$(".no-data").show();
    		}
    		
    		self.scope.auctionItems = self.selectedModel.auctionItems;
    		$('.animation').hide();
    		$('.container').css('opacity','1');
            
    		self.scope.$apply();
    	})
    },
    
    getDisToTop : function(){
    	if(sessionStorage.getItem("selDisId"))
  		{   
  			var id = sessionStorage.getItem("selDisId");
       		var dealTop = $("#" + id).offset().top;
      		$("html,body").scrollTo({toT:dealTop});
	  	}
    	
    },
   
    bindClick: function ()
    {
    	var self = this;
    	
    	self.scope.onClickToGoodsDetail = function(id)
    	{   
    		localStorage.setItem(localStorageKey.FROM_LOCATION,0);
           
            sessionStorage.setItem("selDisId","sel_"+id);
    		//alert($(document).height());//当前文档的高度
    		//alert($(window).height());//当前窗口的高度
    		//alert(document.body.scrollTop);//当前滚动条到窗口顶部的距离
    	
    		location.href = pageUrl.GOODS_DETAIL + "?id=" + id;
    	}
    },
    
    ngRepeatFinish : function()
    {
    	var self = this;
    	//ng-repeat完成后执行的操作
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
			self.getDisToTop();
			
//			sessionStorage.setItem("selDisId","");
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
    }    
    
};

   $.fn.scrollTo =function(options){
        var defaults = {
            toT : 0, //滚动目标位置
            durTime : 2, //过渡动画时间
            delay : 1, //定时器时间
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

