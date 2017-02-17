/*
 * 
 * 我的竞拍记录
 * 
 */
var personalBiddingApp = angular.module('personalBiddingApp', []); 
//点击事件的初始化
personalBiddingApp.run(function (){
    FastClick.attach(document.body); 
});

//自定义repeat完成事件
personalBiddingApp.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

personalBiddingApp.controller("personalBiddingController", function ($scope)
{
    personalBiddingController.init($scope);
});


var personalBiddingController = 
{
    scope: null,
    
    personalBiddingModel: {
    	biddingList : [],
    	userId : null
    },
    
    
    init: function($scope) {
    	this.scope = $scope; 
    	
    	this.initData();
    	
    	this.bindClick();
    },
    
    initData: function() {
    	var self = this;
    	
    	$('.animation').css('display','block');
    	
    	self.getBiddingList();

        self.ngRepeatFinish();
    },
    
    //获取我的竞拍列表
    getBiddingList: function() {
    	var self = this;
    	
    	self.personalBiddingModel.userId = commonFu.getQueryStringByKey("userId");
    	
    	var params = 
    	{
    		startIndex : 0,
    		num : 0,
    		userId : self.personalBiddingModel.userId
    	};
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PERSONAL_BIDDING_LIST, params, function(data)
    	{
    		self.personalBiddingModel.biddingList = [];
    		self.personalBiddingModel.biddingList = data.biddingList;
    		
    		if (self.personalBiddingModel.biddingList.length > 0)
    		{
    			$(".no-data").css('display','none');
    			for (var i = 0;i < self.personalBiddingModel.biddingList.length;i++)
	    		{
		    		self.personalBiddingModel.biddingList[i].currentPrice = "￥" + self.personalBiddingModel.biddingList[i].currentPrice;
		    		
		    		self.personalBiddingModel.biddingList[i].initialPrice = "￥" + self.personalBiddingModel.biddingList[i].initialPrice;
		    		
		    		self.personalBiddingModel.biddingList[i].nowPrice = "￥" + self.personalBiddingModel.biddingList[i].nowPrice;
		    		
		    		self.personalBiddingModel.biddingList[i].goodsInfo.goods_pics = JSON.parse(self.personalBiddingModel.biddingList[i].goodsInfo.goods_pics);
//		    		
//		    		if (self.personalBiddingModel.biddingList[i].status == 0)
//		    		{
//		    			self.personalBiddingModel.biddingList[i].aucted = "../img/aucting.png";
//		    		}
//                  else
//                  {
//                      self.personalBiddingModel.biddingList[i].aucted = "../img/aucted0.png";
//                  }
	    		}
    		}
    		else
    		{
    			$(".no-data").css('display','block');
    		}
    		
    		self.scope.personalBiddingModel = self.personalBiddingModel;
            $('.animation').css('display','none');
            $('.container').css('opacity','1');
    		self.scope.$apply();
    		
    	});
    },
    
    
    bindClick  : function ()
    {
    	var self = this;
    	
    	self.scope.onClickToMyBiddingDetail = function(id)
    	{
    		localStorage.setItem(localStorageKey.FROM_LOCATION, 1);
    		location.href = pageUrl.GOODS_DETAIL + "?id=" + id;
    	}
    },
    
    ngRepeatFinish : function()
    {
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){

        });
    }
};
