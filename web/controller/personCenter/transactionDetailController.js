/*
 * 
 * 明细
 * 
 */
var transactionApp = angular.module('transactionApp', []); 
//点击事件的初始化
transactionApp.run(function (){
    FastClick.attach(document.body); 
})


transactionApp.controller("transactionController", function ($scope)
{
    transactionController.init($scope);
});


var transactionController = 
{
    scope : null,
    
    transactionModel : 
    {
    	transactionList : [],
    	
    },
    
    init : function ($scope)
    {
    	this.scope = $scope; 
    	
    	this.initData();
    	
    },
    
    initData : function ()
    {
    	var self = this;
    	
    	var params = 
    	{
    		startIndex : 0,
    		num : 0,
    	}
    	
    	$('.animation').css('display','block');
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_TRANSACTION_LIST, params, function(data)
    	{
     		
    		self.transactionModel.transactionList = data.transactionList;
    		if (self.transactionModel.transactionList.length > 0)
    		{
    			$(".has-no-data2").css("display","none");
    			for (var i = 0;i < self.transactionModel.transactionList.length; i++)
    			{
    				var transactionArr = self.transactionTypeTransform(self.transactionModel.transactionList[i].transactionType);
    				
    				self.transactionModel.transactionList[i].transactionText = transactionArr[0].text;
    				self.transactionModel.transactionList[i].transactionSymbol = transactionArr[0].symbol;
    				self.transactionModel.transactionList[i].moneyStyle = transactionArr[0].style;
    			}
    			
    		}
    		else
    		{   
    			
		    		$(".has-no-data2").css("display","block");
		    		var dealTop = dealTop -  parseInt(document.body.clientWidth*0.12);
	    
	             	$(".container").scrollTo({toT:dealTop});
		    
//  			$(".no-data").css("display","block");
    		}
    		
    		$('.animation').css('display','none');
    		$('.container').css('opacity','1');
    		self.scope.transactionModel = self.transactionModel;
    		self.scope.$apply();
    	})
    	
    	
    },
    
    //明细类型转换
    transactionTypeTransform : function(transactionType)
    {   
    	var obj = {};
    	var transactionArr = [];
    	for (var i = 0;i < TRANSACTION_TYPE_ARR.length;i ++)
    	{
    		if (transactionType == TRANSACTION_TYPE_ARR[i].type)
    		{
    			obj.text = TRANSACTION_TYPE_ARR[i].text;
    			obj.symbol = TRANSACTION_TYPE_ARR[i].symbol;
    			obj.style = TRANSACTION_TYPE_ARR[i].style;
    			transactionArr.push(obj);
    			break;
    		}
    	}
    	
    	return transactionArr;
    }
    
    
}
