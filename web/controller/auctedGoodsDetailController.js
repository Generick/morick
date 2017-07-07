/*
 * 拍卖历史详情
 */

//alert(sessionStorage.getItem("stampTime"))
var specialSellController =
{
	scope : null,
	
    thisDetailPage : null,
    	
    thisDataId : null,
    
     trueNumber: null,
     
      
    isReallyBuy : false,
    
    buyNumber : 1,
    
    commodity_attr : 0,
    
    userId : null,
    
    timer : null,
    
    viewPrice : null,
    
    buyPrice : null,
    
    stampTime : null,
    
    commodity_id : null,
    
    specialName : '',
    
    specialDesc : '',
    
    specialDetail : '',
    
    specialPrice :null,
    
    specialNumber : null,
    
    commId : null,
  
    hasAddress : true,

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
    	
    	this.scope.buyNumber = this.buyNumber;
    	
    	this.getUrlAndIds();
    	
    	this.getData();
    	
    	this.eventBind();
    	
    	this.ngRepeatFinish();
    	
    	initTab.start(this.scope, -1); //底部导航
    },
    
    getUrlAndIds :function(){
    	
    	var self = this;
    	var arr = [];
    	localStorage.removeItem("hereComeFromAuc");
    	sessionStorage.removeItem("payOrderId");
    	
        if(location.href.indexOf("?") > 0)
    	{   
    		var juid  = null;
//  		alert(location.href)
    		if(commonFu.getQueryStringByKey("id") == null)
    		{
    			if(commonFu.getQueryStringByKey("commodifyId") != null)
	    		{
	    			juid = commonFu.getQueryStringByKey("commodifyId").substring(0,1);
	    			if(juid != 0 && juid != 1 && juid != 2 && juid != 3 && juid != 4 && juid != 5 && juid != 6 && juid != 7 && juid != 8 && juid != 9)
		    		{
		    			var obj = new Base64();
		    			self.thisDataId = obj.decode(commonFu.getQueryStringByKey("commodifyId"));
			    		self.thisDetailPage = obj.decode(commonFu.getQueryStringByKey("thisAcPage"));
		    		}
		    		else
		    		{
		    			self.thisDataId  = commonFu.getQueryStringByKey("commodifyId");
    					self.thisDetailPage = commonFu.getQueryStringByKey("thisAcPage");
		    		}
	    		}
	    		else{
	    			juid = commonFu.getQueryStringByKey("aucid").substring(0,1);
	    			if(juid != 0 && juid != 1 && juid != 2 && juid != 3 && juid != 4 && juid != 5 && juid != 6 && juid != 7 && juid != 8 && juid != 9)
		    		{
		    			var obj = new Base64();
		    			self.thisDataId = obj.decode(commonFu.getQueryStringByKey("aucid"));
			    		self.thisDetailPage = obj.decode(commonFu.getQueryStringByKey("thisAcPage"));
		    		}
		    		else
		    		{
		    			self.thisDataId  = commonFu.getQueryStringByKey("aucid");
    					self.thisDetailPage = commonFu.getQueryStringByKey("thisAcPage");
		    		}
	    		}
    		}
    		else
    		{
    			juid = commonFu.getQueryStringByKey("id").substring(0,1);
    			if(juid != 0 && juid != 1 && juid != 2 && juid != 3 && juid != 4 && juid != 5 && juid != 6 && juid != 7 && juid != 8 && juid != 9)
		    	{
		    		var obj = new Base64();
		    		self.thisDataId = obj.decode(commonFu.getQueryStringByKey("id"));
			    	self.thisDetailPage = obj.decode(commonFu.getQueryStringByKey("thisAcPage"));
		    	}
		    	else
		    	{
		    		self.thisDataId  = commonFu.getQueryStringByKey("id");
    				self.thisDetailPage = commonFu.getQueryStringByKey("thisAcPage");
		    	}
    		}
    		
    		
//  		var juid = commonFu.getQueryStringByKey("commodifyId").substring(0,1);
//  		alert(location.href)
//  		if(juid != 0 && juid != 1 && juid != 2 && juid != 3 && juid != 4 && juid != 5 && juid != 6 && juid != 7 && juid != 8 && juid != 9)
//  		{
//  			var obj = new Base64();
//  			self.thisDataId = obj.decode(commonFu.getQueryStringByKey("commodifyId"));
//	    		self.thisDetailPage = obj.decode(commonFu.getQueryStringByKey("thisAcPage"));
//  		}
//  		else{
//  			self.thisDataId  = commonFu.getQueryStringByKey("commodifyId");
//  			self.thisDetailPage = commonFu.getQueryStringByKey("thisAcPage");
//  		}
//	    	alert(self.thisDataId);
//	    	alert(self.thisDetailPage);
    	}
//      if(commonFu.getUrlPublic(location.href).length >= 2)
//  	{   
//  		self.thisDetailPage = commonFu.getQueryStringByKey("thisAcPage");
//  		
//  		self.thisDataId = commonFu.getQueryStringByKey("commodifyId");
////          if(!commonFu.isEmpty(commonFu.getQueryStringByKey("specialPrice")))
////          {   
////          	self.buyPrice = commonFu.getQueryStringByKey("specialPrice"); 
////          }
//  	}
    	
    },
    
 
    
    getData : function(){
    	
    	var self = this;
    	$('.container').css('opacity','0');
    	
    	$('.animation').css('display','block');
    	var params = {};
    	params.commodity_id = self.thisDataId;
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SPECIAL_SALE_DETAIL, params, function(data){
    		self.commodity_attr = data.info.commodity_attr;
    		self.specilSellPictureArr = JSON.parse(data.info.commodity_pic);
    		self.specialName = data.info.commodity_name; 
    		self.specialDesc = data.info.commodity_desc;
    		self.specialPrice = data.info.commodity_price;
//  		self.specialDetail = data.info.commodity_detail;
    		self.specialNumber = data.info.stock_num;
    		self.trueNumber = data.info.stock_num;
    		self.commId = data.info.id;
    		var screenWidth = window.screen.width;
    		if(self.specialName.length > 11 && screenWidth <= 320)
    		{   
    			
    			self.specialName = self.specialName.substring(0,10) + "...";
    		}
    		if(self.specialName.length > 13 && (screenWidth > 320 && screenWidth <= 375))
    		{
    			self.specialName = self.specialName.substring(0,12) + "...";
    		}
    		if(self.specialName.length > 16 && (screenWidth > 375 && screenWidth <= 414))
    		{
    			self.specialName = self.specialName.substring(0,15) + "...";
    		}
    		if(self.specialName.length > 18 && (screenWidth > 414 && screenWidth <= 464))
    		{
    			self.specialName = self.specialName.substring(0,17) + "...";
    		}
    		self.scope.specialName = self.specialName;
    		self.scope.specialDesc = self.specialDesc;
    		
    		
    		
//          self.viewPrice = (Math.floor(100 * self.specialPrice *(1 +  ((times - data.info.up_time)/60) * (data.info.annualized_return*0.01/(commonFu.isSmoothYear()*1440)))))/100;
//          self.viewPrice = commonFu.toDecimals(self.viewPrice);
            self.stampTime = localStorage.getItem("stampTime");
            self.buyPrice =  (Math.floor(10000 * self.specialPrice *(1 +  ((self.stampTime- data.info.up_time)/60) * (data.info.annualized_return*0.01/(commonFu.isSmoothYear()*1440)))))/10000;
            
            
            if(commonFu.isEmpty(sessionStorage.getItem("stampTime")))
            {    
            	self.stampTime = commonFu.getTimeStamp(); 
            	sessionStorage.setItem("stampTime",self.stampTime);
            	localStorage.setItem("stampTime",self.stampTime)
            	self.buyPrice =  (Math.floor(10000 * self.specialPrice *(1 +  ((self.stampTime - data.info.up_time)/60) * (data.info.annualized_return*0.01/(commonFu.isSmoothYear()*1440)))))/10000;
                
            }
//          alert(self.stampTime)
            self.buyPrice = parseInt(self.buyPrice);
            self.viewPrice = self.buyPrice;
    		self.scope.viewPrice = self.viewPrice;
//  		self.scope.specialDetail = self.specialDetail;

			//李小波 改动
			if (self.specialNumber == 0)
			{
				self.specialNumber = '已售罄';
			}
			else if (self.specialNumber == 1)
			{
				self.specialNumber = '仅此1件';
				$('.bottom-bye-button').show();
			}
			else
			{
				self.specialNumber = '尚余' + self.specialNumber + '件';
				$('.bottom-bye-button').show();
			}

    		self.scope.specialNumber = self.specialNumber;
    		$("#special-sell-detail-content").html(data.info.commodity_detail);
    		self.scope.specilSellPictureArr = self.specilSellPictureArr;
    		document.title = "商品详情";
    		
    		
    		
    		self.shareInfo.img = (commonFu.isEmpty(self.specilSellPictureArr[0]) || self.specilSellPictureArr.length == 0) ? "" : self.specilSellPictureArr[0];     
	        self.shareInfo.content = commonFu.returnRightReg(self.specialDesc).substr(0,63);
	    	self.shareInfo.title =  commonFu.returnRightReg(data.info.commodity_name);
	    	//李小波 改动
	        self.shareInfo.title = "【精选一口价】" + self.shareInfo.title + " - 雅玩之家";
    		setTitle(data.info.commodity_name);
    		commonFu.setShareTimeLine(self.wxParams,self.shareInfo,location.href);
    		
    		self.scope.$apply();
    		$('.container').css('opacity','1');
    		$('.animation').css('display','none');
//  	    self.setNewPrice(data);
    	})
        //设置title
    	function setTitle(title)
    	{
    		//李小波 改动
		    document.title = "【精选一口价】" + title + " - 雅玩之家";
		    
    	}
    },
    
//  setNewPrice : function(data){
//  	
//  	var self =this;
//  	
//  	setInterval(function(){
//  		self.viewPrice = (Math.floor(100 * self.specialPrice *(1 +  ((commonFu.getTimeStamp()- data.info.up_time)/60) * (data.info.annualized_return*0.01/(commonFu.isSmoothYear()*1440)))))/100;
//  		self.viewPrice = commonFu.toDecimals( self.viewPrice);
//  		self.scope.viewPrice = self.viewPrice;
//  		self.scope.$apply()
//  	},10000);
//  },
    
    
    eventBind : function(){
    	
    	var self = this;
    	
    	self.scope.checkNumber = function(){
    		
    		if(''+$("#chooseGoodsNum").val().length >5){
    			$("#chooseGoodsNum").val('' +$("#chooseGoodsNum").val().substring(0,5));
    			
    		}
    		else
    		{
    			self.buyNumber = parseInt($("#chooseGoodsNum").val());
    			self.scope.buyNumber = self.buyNumber;
    		}
    		
    	};
    	
    	self.scope.cancleAddNumber = function(){
    		$("html,body").css("overflow","scroll");
    		self.isReallyBuy = false;
    		$(".fixed-add-goods-box").css("display","none");
    		$(".add-goodsNumber-box").css("display","none");
    		self.buyNumber = 1;
    		self.scope.buyNumber = self.buyNumber;
    		$("#chooseGoodsNum").val(1);
    	};
    	
    	
    	self.scope.reduceNumber = function(type){
    		
    		if(type == 0)
    		{
    			if(self.scope.buyNumber > 1)
    			{
    				self.buyNumber = self.buyNumber - 1;
    			}
    			else
    			{
    				self.buyNumber = 1;
    			}
    			
    		}
    		else
    		{
    			
    			self.buyNumber = self.buyNumber + 1;
    			
    		}
    		self.scope.buyNumber = self.buyNumber;
    	};
    	
    	
    	
//  	self.scope.jumpToBye = function(){
//  	     
//  	     
//  	     
//  	    if(self.specialNumber == 0)
//		    {
//		    	$dialog.msg("抱歉，商品库存不足！");
//		    }
//  	    else
//  	    {
//  	    	localStorage.setItem("hereComeFromAuc",1);
//			                
//  	        localStorage.setItem("thisAcPage",self.thisDetailPage);
//			    localStorage.setItem("commodifyId",self.thisDataId);
//			    localStorage.setItem("specialPrice",self.buyPrice);
//			    self.buyPrice = commonFu.toDecimals(self.buyPrice);
//			    
//			    var obj = new Base64();
//						   	
//				var id_base64 = obj.encode(self.thisDataId);
//									
//				var str = pageUrl.PRE_PAY_PAGE  + "?id=" + id_base64;		    	
//									
//				location.href = encodeURI(str);
//			    
//  	    	
//  	    }
//  	   
//  	};
    	
    	
    	self.scope.jumpToBye = function(){
    	     
    	     
    	   
    	    	if(self.commodity_attr == 0)
    	    	{
    	    		localStorage.setItem("hereComeFromAuc",1);      
	    	        localStorage.setItem("thisAcPage",self.thisDetailPage);
				    localStorage.setItem("commodifyId",self.thisDataId);
				    localStorage.setItem("specialPrice",self.buyPrice);
//				    localStorage.setItem("buyGoodsNumber",1);
				    sessionStorage.setItem("buyGoodsNumber",1);
//				    self.buyPrice = parseInt(self.buyPrice);
	//  	    	location.href = pageUrl.PRE_PAY_PAGE + "?commodifyId=" + self.thisDataId + "&specialPrice=" +  self.buyPrice;
	    	    	var obj = new Base64();
				    
					var id_base64 = obj.encode(self.thisDataId);
									
					var str = pageUrl.PRE_PAY_PAGE  + "?id=" + id_base64;		    	
									
					location.href = encodeURI(str);
	    	    	
//	    	    	location.href = pageUrl.PRE_PAY_PAGE + "?commodifyId=" + self.thisDataId;
    	    	}
    	    	else
    	    	{   
    	    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_JUDGE_ISLOGIN, {}, function(data){
    		
			    		if(JSON.stringify(data) == 'true'){
			    		    
		    	    		$("html,body").css("overflow","hidden");
		    	    		$(".fixed-add-goods-box").css("display","block");
		    		        $(".add-goodsNumber-box").css("display","block");
			    		        
				    	}
			    		else
			    		{  
				    		$dialog.msg("会话过期，请先登录");
			                    setTimeout(function(){
			
			                    	location.href = pageUrl.LOGIN_PAGE;
			                    	
			                    	
			                    },1300)
				    		
				    	}
			    		
			    	})
    	    		
    	    	}
    	    	
    	 
    	};
    	
    	
    	self.scope.yesToCheckOver = function(){
    			
    		if(parseInt(self.trueNumber)  < parseInt(self.scope.buyNumber))
    		{   
    		
    			$dialog.msg("商品库存不足！");
    		}
    		else
    		{
//  			setTimeout(function(){
//  			    alert(parseInt(self.scope.buyNumber))
    			    if(parseInt(self.scope.buyNumber) >= 1){
    			    	self.isReallyBuy = true;
			    		localStorage.setItem("hereComeFromAuc",1);      
				    	localStorage.setItem("thisAcPage",self.thisDetailPage);
						localStorage.setItem("commodifyId",self.thisDataId);
						localStorage.setItem("specialPrice",self.buyPrice);
						localStorage.setItem("buyGoodsNumber",self.scope.buyNumber);
						sessionStorage.setItem("buyGoodsNumber",self.scope.buyNumber);
						self.buyPrice = commonFu.toDecimals(self.buyPrice);
			//  		location.href = pageUrl.PRE_PAY_PAGE + "?commodifyId=" + self.thisDataId + "&specialPrice=" +  self.buyPrice;
				    	var obj = new Base64();
					    
						var id_base64 = obj.encode(self.thisDataId);
										
						var str = pageUrl.PRE_PAY_PAGE  + "?id=" + id_base64;		    	
										
						location.href = encodeURI(str);
	//			    	location.href = pageUrl.PRE_PAY_PAGE + "?commodifyId=" + self.thisDataId;
    			    }else{
    			    	$dialog.msg("请输入正确的商品数量！");
    			    }
	    			
//  		    },500)
    		}
    		
    		
    	};
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