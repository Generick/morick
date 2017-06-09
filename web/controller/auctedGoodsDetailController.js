/*
 * 拍卖历史详情
 */


var specialSellController =
{
	scope : null,
	
    thisDetailPage : null,
    	
    thisDataId : null,
    
    userId : null,
    
    commodity_id : null,
    
    specialName : '',
    
    specialDesc : '',
    
    specialDetail : '',
    
    specialPrice :null,
    
    specialNumber : null,
    
    commId : null,
    
    wxParams : {},
    
    shareInfo : {},
    
    specilSellPictureArr : [
    
    
//      "img/newPic/test1.png",
//      "img/newPic/test2.png",
//      "img/newPic/test3.png",
 

    ],
    
   
    init : function ($scope,wxParams)
    {   
    	this.wxParams = wxParams;
    	
    	this.scope = $scope;
    	
    	this.getUrlAndIds();
    	
    	this.getData();
    	
    	this.getSelfInfo();
    	
    	this.eventBind();
    	
    	this.ngRepeatFinish();
    	
    },
    
    getUrlAndIds :function(){
    	
    	var self = this;
    	var arr = [];
    	
        if(commonFu.getUrlPublic(location.href).length == 2)
    	{
    		arr = commonFu.getUrlPublic(location.href);
	    	self.thisDetailPage = arr[0];
	    	self.thisDataId = arr[1];
	    	
    	}
    },
    
    
    getData : function(){
    	
    	var self = this;
    	$('.container').css('opacity','1');
    	var params = {};
    	params.commodity_id = self.thisDataId;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SPECIAL_SALE_DETAIL, params, function(data){
    		
    		self.specilSellPictureArr = JSON.parse(data.info.commodity_pic);
    		self.specialName = data.info.commodity_name; 
    		self.specialDesc = data.info.commodity_desc;
    		self.specialPrice = data.info.commodity_price;
//  		self.specialDetail = data.info.commodity_detail;
    		self.specialNumber = data.info.stock_num;
    		self.commId = data.info.id;
    		self.scope.specialName = self.specialName;
    		self.scope.specialDesc = self.specialDesc;
    		self.scope.specialPrice = self.specialPrice;
//  		self.scope.specialDetail = self.specialDetail;
    		self.scope.specialNumber = self.specialNumber;
    		$("#special-sell-detail-content").html(data.info.commodity_detail);
    		self.scope.specilSellPictureArr = self.specilSellPictureArr;
    		document.title = "商品详情";
    		
    		
    		
    		self.shareInfo.img = (commonFu.isEmpty(self.specilSellPictureArr[0]) || self.specilSellPictureArr.length == 0) ? "" : self.specilSellPictureArr[0];     
	        self.shareInfo.content = commonFu.returnRightReg(self.specialDesc).substr(0,63);
	    	self.shareInfo.title =  commonFu.returnRightReg(self.specialName);
	        self.shareInfo.title = self.shareInfo.title + " - 雅玩之家";
    		setTitle(self.specialName);
    		commonFu.setShareTimeLine(self.wxParams,self.shareInfo,location.href);
    		
    		self.scope.$apply();
    	   
    	})
        //设置title
    	function setTitle(title)
    	{
		    document.title = title + " - 雅玩之家";
    	}
    },
    
    eventBind : function(){
    	
    	var self = this;
    	
    	self.scope.jumpToBye = function(){
    		
    		 location.href = pageUrl.TO_PAY_SPECILA_PAGE + "?commodifyId=" + self.thisDataId + "&specialPrice=" + self.specialPrice;
    		
    	};
    },
    
    
    
    
    getSelfInfo : function(){
    	
    	var self = this;
    	
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data){
    		
    		self.userId = data.userInfo.userId;
    	})
    },
    
    ngRepeatFinish: function() {
        var self = this;

        self.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false
            });
        });
    }
   
  
};