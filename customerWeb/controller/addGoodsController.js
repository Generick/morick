
app.controller("addGoodsCtr",function($scope){
	
	addGoodsCtr.init($scope);
	
})


var addGoodsCtr = {
	
	scope:null,
	
	videoSrc : '',
	
	isAgainUp : false,
	
	goodsModel : {
		videoUrl : '',
		
		goodsName : '',
	
		goodsDes : '',
		
		goodsinComePrice : null,
		
		goodsSalePrice : null,
		
		goodsNumber : 1,
		
		goodsDetailDes : '',
	
		isMuldetil : false,
		
		userId : null,
		
		goods_attr : 0,
		
		return_annualized : 0.2,
		
		comm_id : -1,
		
		isAdd : null,
	},
	
	
	
	detImg : [],
	
	imgsbox : [],
	
	
	
	init : function($scope){
		
		this.scope = $scope;
		$(".animation3").css("display","block");
		
		this.scope.goodsModel = this.goodsModel;
		
		this.scope.detImg = this.detImg;
		
		this.scope.imgsbox = this.imgsbox;
		
		this.getUrl();
		
    	this.getModelData();
		
		this.getSelfData();
		
		setTimeout(function(){
			
			$(".animation3").css("display","none");
		    $(".container3").css("opacity",1);
		},300)
		
		this.eventBind();
	},
		
    getUrl : function(){
    	
    	var self = this;
    	var obj = new Base64();
    
		self.goodsModel.comm_id = obj.decode(commonFu.getQueryStringByKey("id"));
        self.goodsModel.isAdd = obj.decode(commonFu.getQueryStringByKey("isAdd"));	
    	self.scope.goodsModel = self.goodsModel;
        
       if(self.goodsModel.isAdd == 1)//添加
		{
			document.title = "添加商品";    		
		}
		if(self.goodsModel.isAdd == 2)//修改
		{
			document.title = "修改商品";    		
		}
		if(self.goodsModel.isAdd == 3)
		{
			document.title = "查看商品";
		}
    },
    
	getSelfData : function(){
		
		var self = this;
		self.scope.goodsModel = self.goodsModel;


		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_PERSONALDATA, {},function(data){

        	    self.goodsModel.userId = data.userInfo.userId;
        	    self.scope.goodsModel = self.goodsModel;
 
        })
	
	},
	
	
	getModelData : function(){
		    var self = this;
		    
		    if(self.goodsModel.comm_id == -1)
		    {
		    	
		    }
		    else
		    {
		    	
		    	var params  = {};
				params.commodity_id = self.goodsModel.comm_id;
				
				jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USER_GET_GOOD_DETAIL, params,function(data){
					
					self.goodsModel.goodsName = data.commodityInfo.mch_commodity_name;
					self.goodsModel.goodsDes = data.commodityInfo.mch_commodity_desc;
					self.goodsModel.goodsinComePrice = parseInt(data.commodityInfo.mch_bid_price);
					self.goodsModel.goodsSalePrice = parseInt(data.commodityInfo.mch_commodity_price);
					self.goodsModel.goodsNumber = parseInt(data.commodityInfo.mch_stock_num);
					
					if(data.commodityInfo.mch_commodity_attr == 0)
					{
						self.goodsModel.isMuldetil = false;
				
					}
					else{
						self.goodsModel.isMuldetil = true;
						
					}
					self.goodsModel.goods_attr = data.commodityInfo.mch_commodity_attr;
					self.goodsModel.return_annualized = data.commodityInfo.mch_annualized_return;
					self.scope.goodsModel = self.goodsModel;
					self.imgsbox = JSON.parse(data.commodityInfo.mch_commodity_pic);
					if(!commonFu.isEmpty(data.commodityInfo.mch_commodity_detail))
		    		{
//		    			self.goodsModel.goodsDetailDes = commonFu.returnRightReg(data.commodityInfo.mch_commodity_detail).substr(0,data.commodityInfo.mch_commodity_detail.length-1);
		    		    $("#goods-detail-div").val(commonFu.returnRightReg(data.commodityInfo.mch_commodity_detail).substr(0,data.commodityInfo.mch_commodity_detail.length-1));
		    		}
				
//					var str = data.commodityInfo.mch_commodity_detail;
//					var re = new RegExp("src","g");
//					var arr = str.match(re);
				    
				    
				    
				    
				    
				    
				    
				    
				    
			
				    
//				    
				    var imgarrs = [];
				    data.commodityInfo.mch_commodity_detail.trim().replace(/<img.*?src="(.*?)"[^>]*>/ig, function(a,b) {       
				          
				          imgarrs.push(b)
//				          alert(a);//a为img对象
//				
//				          alert(b);//b为img对象的url值
//				          alert(imgArr.length)
				    });
				
				//提取video对象及url
//				alert(data.commodityInfo.mch_commodity_detail.trim());
                               
//				data.commodityInfo.mch_commodity_detail.trim().replace(/<video.*>.*video>/ig, function(a,b) {
////				         alert(a);//a为video对象
////				       alert(a)
////				        alert('sss'+self.videoSrc)
////						alert(a)
////					   <video id="uplo-videos" controls="controls" poster="img/default.png" preload="auto"><source src=http://meeno.f3322.net:8082/auction/uploads/video/1502165139_5989389353758.mp4></source></video>
//				       a.replace(/<source.*?src="(.*?)"[^>]*>/ig, function(a,b) {
//				       //获取视频的url
////				          alert(b);
//						 
////                           self.videoSrc = b;
//                              
//                           self.goodsModel.videoUrl = b;
//                          
//                           $("#uplo-videos source").attr("src",self.goodsModel.videoUrl)
////                            alert(self.goodsModel.videoUrl);
//				         });
//				      });
				     
				     data.commodityInfo.mch_commodity_detail.trim().replace(/<iframe.*?src="(.*?)"[^>]*>/ig, function(a,b) {       
				          
				          self.goodsModel.videoUrl = b;
				          $("#uplo-videos").attr("src",self.goodsModel.videoUrl)
                         $("#uplo-videos source").attr("src",self.goodsModel.videoUrl)
				    });
				    
				   
//		    	    var imgarrs = [];
//	    	   
//		    	    var reg = /src=\"([^\"]*?)\"/gi;
//		    		var cont = data.commodityInfo.mch_commodity_detail.trim().match(reg);
//  			   
//  			    if(cont != null)
//  			    {
//  			    	for(var j= 0;j<cont.length;j++)
//		    			{   
//		    				var srcs = '';
//		    				srcs = cont[j].split("src=")[1].replace(/\"/g, "");
//	    			    	imgarrs.push(srcs);
//		    			}
//  			    }
//                  
	    			self.detImg = imgarrs;
	    			self.scope.detImg = self.detImg;
                   
					self.scope.imgsbox = self.imgsbox;
					self.scope.$apply();
					for(var i = 0; i < self.imgsbox.length; i++)
			        {
			        	if(self.imgsbox[i] == data.commodityInfo.mch_commodity_cover)
			        	{
			        		$(".goods-img-2").children(".select-round-2").eq(i).addClass("round-has-select").parent().siblings().find(".select-round-2").removeClass("round-has-select");
			        	    $(".goods-img-2").children(".set-face-img-2").eq(i).html("封面").parent().siblings().find(".set-face-img-2").html("设为封面");
			        	}
			        	
			        }
			        if(self.goodsModel.isAdd == 3)//查看
			    	{
			    	    
			    		$(".btn-to-sub").css("display","none");
			    		$(".fa-minus-circle").css("display","none !important");
			    		$(".set-face-img-2").css("display","none");
			    		$(".select-round-2").css("display","none");
			    		$("#upload-icon").css("display","none");
			    		$("#upload-icon2").css("display","none");
			    		$("input").attr("disabled",true);
			    		$("input").css("background","#FFFFFF");
			    		$("#unload-videos").css("display","none");
//			    		$("#goods-detail-div").attr("contentEditable",false);
			    	}
			    	

				})
    
		    }
		    
	},
	
	eventBind : function(){
		
		var self = this;
		
		var a = 0;
		
		
		self.scope.chooseNumber = function(type){
			
			if(type == 0)
			{
				self.goodsModel.isMuldetil = false;
				self.goodsModel.goods_attr = 0;
				self.goodsModel.goodsNumber = 1;
			}
			else{
				self.goodsModel.isMuldetil = true;
				self.goodsModel.goods_attr = 1;
				self.goodsModel.goodsNumber = null;
			}
			self.scope.goodsModel = self.goodsModel;
//			self.scope.goodsModel.goodsNumber = self.goodsModel.goodsNumber;
		};
		
		
		self.scope.addGoods = function(){
			
			if(self.isAgainUp)
			{   
				$dialog.msg("不能在10秒内连续提交商品！");
				return;
			}
			self.isAgainUp = true;
			
			setTimeout(function(){
				
				self.isAgainUp = false;
				
			},10000);
			if(commonFu.isEmpty(self.goodsModel.goodsName))
			{
				$dialog.msg("请输入商品名！");
				return;
			}
			if(commonFu.isEmpty(self.goodsModel.goodsDes))
			{
				$dialog.msg("请输入商品描述！");
				return;
			}
			
//			if(commonFu.isEmpty(self.goodsModel.goodsinComePrice))
//			{
//				$dialog.msg("请输入商品进价！");
//				return;
//			}
//			if(parseFloat(self.goodsModel.goodsinComePrice) <= 0)
//			{
//				$dialog.msg("商品进价不能小于等于0！");
//				return;
//			}
			if(commonFu.isEmpty(self.goodsModel.goodsSalePrice))
			{
				$dialog.msg("请输入商品价格！");
				return;
			}
			if(parseFloat(self.goodsModel.goodsSalePrice) <= 0 )
			{
				$dialog.msg("商品价格不能小于等于0！");
				return;
			}
//			if(commonFu.isEmpty(self.goodsModel.goodsNumber))
//			{
//				$dialog.msg("请输入商品库存！");
//				return;
//			}
			if(commonFu.isEmpty(self.imgsbox))
			{
//				alert(self.imgsbox)
				$dialog.msg("请上传商品图片！");
				return;
			}
			if(commonFu.isEmpty($("#goods-detail-div").val()))
			{ 
//				self.goodsModel.goodsDetailDes
				$dialog.msg("请输入商品详情文字描述！");
				return;
			}
//			if(commonFu.isEmpty(self.detImg))
//			{
//				$dialog.msg("请添加商品详情图片！");
//				return;
//			}
			
			
			if(self.goodsModel.isAdd == 1)
			{
				var param = {};
				param.userId = self.goodsModel.userId;
				param.info = {};
				param.info.mch_commodity_name = self.goodsModel.goodsName;//商品名称
				param.info.mch_commodity_desc = self.goodsModel.goodsDes;//商品描述
				var cover = '';
				for(var i = 0; i < self.imgsbox.length; i++)
				{
					if($(".goods-img-2").children(".select-round-2").eq(i).hasClass("round-has-select"))
		        	{
		        		
		        		cover = self.imgsbox[i];
		        		
		        	}
				}
				
				param.info.mch_commodity_cover = cover;//商品封面
				var wordHtml = '';
				wordHtml = '<div style="width:100%;line-height:21px;text-indent:25px;color:#333333;text-align:left;"> '+ $("#goods-detail-div").val()+' </div>';
				
				var imgBox = '';
				if(!commonFu.isEmpty(self.detImg))
				{
					var len = self.detImg.length;
					
					for(var i = 0; i < len ; i++)
					{
						var imgHtml = '<img style="width:100%;height:auto;margin-top:15px" src="'+self.detImg[i]+'" />';
						imgBox = imgBox + imgHtml;
					}
				}
				
				if(self.goodsModel.videoUrl != null && self.goodsModel.videoUrl != '')
				{        
//					    alert(self.goodsModel.videoUrl);
						var videoHtml = '<iframe frameborder="0" width="100%" height="auto"  src="'+ self.goodsModel.videoUrl+'" controls="controls" poster="img/default.png" preload="auto"></iframe>'
//						var videoHtml = '<video id="uplo-videos" controls="controls" poster="img/default.png" preload="auto">'+'<source src="'+ self.goodsModel.videoUrl+'"></source>'+'</video>';
				    var allHtml = wordHtml + imgBox + videoHtml;
				}
                else{
                	
                	var allHtml = wordHtml + imgBox;
                }
//				var videoHtml = '<video id="uplo-videos" controls="controls" poster="img/default.png" preload="auto"><source src='+self.videoSrc+'></source></video>'  ;
//				alert(imgBox)
//				var allHtml = wordHtml + imgBox + videoHtml;
//				if(self.goodsModel.goods_attr == 0)
//				{
//					self.goodsModel.goodsNumber = 1;
//				}
//				if(self.goodsModel.goods_attr == 1)
//				{
//					if(self.goodsModel.goodsNumber < 2)
//					{
//						$dialog.msg("您选择的库存类型为多件，请输入至少2件以上的商品！");
//						return;
//					}
//					
//				}
				self.goodsModel.goods_attr = 0;
				self.goodsModel.goodsNumber = 1;
				param.info.mch_commodity_detail = allHtml;//商品详情
				
				param.info.mch_commodity_price = self.goodsModel.goodsSalePrice;//商品价格
				param.info.mch_bid_price = 0;// self.goodsModel.goodsinComePrice;//商品进价
				param.info.mch_stock_num = self.goodsModel.goodsNumber;//商品库存
				param.info.mch_commodity_pic = JSON.stringify(self.imgsbox);//商品图片
				param.info.mch_commodity_attr =  self.goodsModel.goods_attr;//商品库存类型
				param.info.mch_annualized_return = self.goodsModel.return_annualized;//商品年化率
				
//				alert(JSON.stringify(param))
	//			return;
				jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USER_ADD_GOOD, param,function(data){
	        	            
	                        $dialog.msg("商品添加成功！");
	                        setTimeout(function(){
	                        	location.href = pageUrl.MY_GOODS_LIST;
	                        },500)
	                        
	        	 })
			}
			else if(self.goodsModel.isAdd == 2){
				
				
//				if(self.goodsModel.goods_attr == 0)
//				{
//					self.goodsModel.goodsNumber = 1;
//				}
//				if(self.goodsModel.goods_attr == 1)
//				{
//					if(self.goodsModel.goodsNumber < 2)
//					{
//						$dialog.msg("您选择的库存类型为多件，请输入至少2件以上的商品！");
//						return;
//					}
//					
//				}
				self.goodsModel.goods_attr = 0;
				self.goodsModel.goodsNumber = 1;
				var param = {};
				param.commodity_id = self.goodsModel.comm_id;
//				param.userId = self.goodsModel.userId;
				param.modInfo = {};
				param.modInfo.mch_commodity_name = self.goodsModel.goodsName;//商品名称
				param.modInfo.mch_commodity_desc = self.goodsModel.goodsDes;//商品描述
				var cover = '';
				for(var i = 0; i < self.imgsbox.length; i++)
				{
					if($(".goods-img-2").children(".select-round-2").eq(i).hasClass("round-has-select"))
		        	{
		        		
		        		cover = self.imgsbox[i];
		        		
		        	}
				}
				
				param.modInfo.mch_commodity_cover = cover;//商品封面
				var wordHtml = '';
				wordHtml = '<div style="width:100%;line-height:21px;text-indent:25px;color:#333333;text-align:left;"> '+ $("#goods-detail-div").val()+' </div>';
				
				var len = self.detImg.length;
				var imgBox = '';
				for(var i = 0; i < len ; i++)
				{
					var imgHtml = '<img style="width:100%;height:auto;" src="'+self.detImg[i]+'" />';
					imgBox = imgBox + imgHtml;
				}
				if(self.goodsModel.videoUrl != null && self.goodsModel.videoUrl != '')
				{    
//					alert(self.goodsModel.videoUrl);
//					var videoHtml = '<video id="uplo-videos" controls="controls" poster="img/default.png" preload="auto">'+'<source src="'+ self.goodsModel.videoUrl+'"></source>'+'</video>';
					var videoHtml = '<iframe frameborder="0" width="100%" height="320px"  src="'+ self.goodsModel.videoUrl+'" controls="controls" poster="img/default.png" preload="auto"></iframe>';
				    var allHtml = wordHtml + imgBox + videoHtml;
				}
                else{
                	var allHtml = wordHtml + imgBox;
                }
//				alert(imgBox)
				
				
				param.modInfo.mch_commodity_detail = allHtml;//商品详情
				
				param.modInfo.mch_commodity_price = self.goodsModel.goodsSalePrice;//商品价格
				param.modInfo.mch_bid_price = 0;// self.goodsModel.goodsinComePrice;//商品进价
				param.modInfo.mch_stock_num = self.goodsModel.goodsNumber;//商品库存
				param.modInfo.mch_commodity_pic = JSON.stringify(self.imgsbox);//商品图片
				param.modInfo.mch_commodity_attr =  self.goodsModel.goods_attr;//商品库存类型
				param.modInfo.mch_annualized_return = self.goodsModel.return_annualized;//商品年化率
				
//				alert(JSON.stringify(param))
	//			return;
				jqAjaxRequest.asyncAjaxRequest(apiUrl.API_USERT_MOD_GOOD, param,function(data){
	        	          
	        	        
	                      $dialog.msg("商品修改成功！");
	                      setTimeout(function(){
	                      	   location.href = pageUrl.MY_GOODS_LIST;
	                      },500)
	                      
	        	 })
			}
			
	        	          
			
			
		};
	},
	
	
	
}
