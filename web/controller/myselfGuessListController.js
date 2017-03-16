/*
 * 
 * 我的竞猜列表
 * 
 */
var mySelfGuessListApp = angular.module('mySelfGuessListApp', []); 
//点击事件的初始化
mySelfGuessListApp.run(function (){
    FastClick.attach(document.body); 
 
});

//自定义repeat完成事件
mySelfGuessListApp.directive('onFinishRenderFilters', function ($timeout) {
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

mySelfGuessListApp.controller("mySelfGuessListController", function ($scope)
{  
	sessionStorage.removeItem("comeWithGuess")
    mySelfGuessListController.init($scope);
    
});


var mySelfGuessListController = 
{
    scope: null,
    
    myGuessListModel: {
    	myGuessList : [],
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
    	
    	self.getmyGuessList();

        self.ngRepeatFinish();
    },
    
    //获取我的竞猜列表
    getmyGuessList: function() {
    	var self = this;
    	
    	self.myGuessListModel.userId = commonFu.getQueryStringByKey("userId");
    	
    	var params = 
    	{
    		startIndex : 0,
    		num : 0,
    		userId : self.myGuessListModel.userId
    	};

    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_MY_GUESS_LIST, params, function(data)
    	{   
// 			alert(JSON.stringify(data))
    		self.myGuessListModel.myGuessList = [];
    		self.myGuessListModel.myGuessList = data;
    		
    		if (self.myGuessListModel.myGuessList.length > 0)
    		{
    			$(".no-data").css('display','none');
    			for (var i = 0;i < self.myGuessListModel.myGuessList.length;i++)
	    		{
		    	
		    		self.myGuessListModel.myGuessList[i].goods_pics = JSON.parse(self.myGuessListModel.myGuessList[i].goods_pics);
                   
	    		}
    		}
    		else
    		{
    			$(".no-data").css('display','block');
    		}
    		
    		self.scope.myGuessListModel = self.myGuessListModel;
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
    		sessionStorage.setItem("comeWithGuess",6);
    		sessionStorage.setItem("userId",self.myGuessListModel.userId)
    		location.href = pageUrl.GUESS_INNER + "?id=" + id;
    	}
    },
    
    ngRepeatFinish : function()
    {
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){

        });
    }
};
