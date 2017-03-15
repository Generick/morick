/**
 * 藏品控制器
 * 
 * 
 */

var OfferPriceCtrl = {
	
	//全局变量
	scope : null,

    param :null,
    
   
    
	goodsModel : {
		modelArr : [],
		messContent : "",
		userName : " ",
		goodsName : ""
    },
    
    init: function($scope)
    {
    	this.scope = $scope;
    	
    	this.dataModelInit();
    	
    	this.getGoodsList();
    	
    	this.bindEvent();
    },
    
    /**
     * 数据模型初始化绑定
     */
    
    dataModelInit : function()
    {
    	var self = this;
    	this.scope.goodsModel = this.goodsModel;
    	
    },
    

    /**
     * 获取商品列表
     */
    getGoodsList : function()
    {
    	var self = this;
        
        pageController.pageInit(self.scope,api.API_GET_BIDLIST,{},function(data){
           
//          console.log("rrrrr"+ JSON.stringify(data))
        	if(self.scope.page.selectPageNum)
            {   
                var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                pageController.pageNum(totalPage);
              
            }
            self.goodsModel.modelArr = [];
            var modelArr = data.bidList;
             
            for(var i = 0; i < modelArr.length; i++)
            {
            	var itemObj = {};
            	itemObj.auctionItemId = modelArr[i].auctionItemId;
            	itemObj.goods_name = modelArr[i].goods_name;
            	var firstPic = JSON.parse(modelArr[i].goods_pics)[0];
            	itemObj.goods_pics = _utility.isEmpty(firstPic) ? defaultImage : firstPic;
            	itemObj.name = modelArr[i].name;
            	itemObj.nowPrice = _utility.toDecimalTwo(modelArr[i].nowPrice);

				itemObj.createTime = modelArr[i].createTime;
            	itemObj.telephone = modelArr[i].telephone;
                if(modelArr[i].isSale == undefined)
            	{
            		itemObj.isSale = false;
            		if(modelArr[i].isHigh == 0)
            		
	            	{
	            		itemObj.isHigh = false;
	            	}
	            	else
	            	{
	            		itemObj.isHigh = true;
	            	}
            	}
            	else
            	{
            		itemObj.isSale = true;
            		itemObj.isHigh = false;
            	}
            	
            	self.goodsModel.modelArr.push(itemObj);
            }
            self.scope.goodsModel.modelArr = self.goodsModel.modelArr;
            self.scope.$apply();
        })
       
    },

    //点击事件
    bindEvent : function()
    {
    	var self = this;
    	
    	//获取最新数据
    	
    	self.scope.getNewMes = function(){
    		
    		self.getGoodsList()
    		
    	};
    	
    	//点击事件
    	self.scope.sendMessage = function(type,item){
            
            $("#fixed-table").css({"display":"block"})
    	    $("html,body").css({"overflow":"hidden"})
         
    		var params = {};
    		params.type = type;
    		params.phoneNum = JSON.stringify(item.telephone);
    		params.goods_name = item.goods_name;
    		params.price = JSON.parse(item.nowPrice);
     		params = JSON.stringify(params);
     		var param = {'params':params};
    	    if(type == 1)
    	    {
    	    	self.goodsModel.messContent ="  超出短信  "
    	    	
    	    }
    	    else if(type == 2)
    	    {
    	    	self.goodsModel.messContent =" 成交短信  "
    	    	
    	    }
    	    else
    	    {
    	    	self.goodsModel.messContent = " 截拍短信  "
    	    	
    	    }
    	    self.goodsModel.userName = item.name;
    	    self.goodsModel.goodsName = item.goods_name;
    	   
    	    self.param = param;
    	};
    	
    	
    	
    	self.scope.yesToSend = function(type){
    		
    		if(type == 0)
    		{  
    			$("#fixed-table").css({"display":"none"})
    			$("html,body").css({"overflow":"auto"})
    		}
    		else
    		{
    			$("#fixed-table").css({"display":"none"});
    			$("html,body").css({"overflow":"auto"});
    			
    			var param = self.param;
    			
    			$data.httpRequest("post", api.API_SEND_MESSAGE, param, function(data){
    	     	  
    	     		$dialog.msg("发送成功！")
    	        })
    		}
    	};
    },


};


