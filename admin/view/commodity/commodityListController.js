


var commodityListController = {
	
	
	scope : null,
	
	fields: "",
	
	modifyOrAdd : "",
	
	CommodityBid_price : 0,
	
	singleNumber : true,
	
	isAdd : 1,
	
	swiperModel : {
		
		swiperImgs : [],
	
		swiperName : '',
		
		swiperDesc : '',
		
		swiperMoney : 0,
		
		swiperNumber : 0,
		
		swiperDetail : ''
		
	},
	
	
	commodifyId : null,
	
	selectAll : false,
	
	selectedArr : [],
	
	isGrounding : 0,
	
	CommodityList : [],
	
	CommodityName : null,
	
	CommodityDesc : '',
	
	CommodityImgs : [],
	
	CommodityPrice : null,
	
	CommodityYearYield : 20,
	
	CommodityNumber : 1,
	
	CommodityDetail : '',
	
	init : function($scope){
		
		this.scope = $scope;
	  
	    this.scope.CommodityImgs = this.CommodityImgs;
		
		this.scope.fields = this.fields;
		
//		this.scope.singleNumber = this.singleNumber;
		
		this.scope.isGrounding = this.isGrounding;
		
		this.scope.selectAll = this.selectAll;
		
		this.scope.swiperModel = this.swiperModel;
		
		this.scope.modifyOrAdd = this.modifyOrAdd;
		
		this.getData();
		
		this.eventBind();
	},
	
	
	getData : function(){
		
		var self = this;
		
		var params = {};
		params.is_up = self.isGrounding;
//		alert(JSON.stringify(params))
		if(!_utility.isEmpty(self.scope.fields))
		{   
			params.fields = self.scope.fields;
			
		}
	    self.CommodityList = [];
	    self.scope.CommodityList = self.CommodityList;
		 pageController.pageInit(self.scope,api.API_GET_COMMIDIFY_LIST,params,function(data){
        	
//      	alert(JSON.stringify(data))
            if(data.commodityList.length == 0)
            {
            	$dialog.msg("暂无数据！", 1.6);
            }
        	if(self.scope.page.selectPageNum)
            {
                var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                pageController.pageNum(totalPage);
            }
            
            self.CommodityList = data.commodityList;
            for(var i = 0; i < self.CommodityList.length; i ++ )
	        {
	           	self.CommodityList[i].selected = false;
//	           	alert(JSON.parse(self.CommodityList[i].commodity_pic)[0]);
//	           	self.CommodityList[i].picture = self.CommodityList[i].commodity_pic[0];
	        }
	      
            self.scope.CommodityList = self.CommodityList;
          
            self.scope.$apply();
        })
		
		self.changeBtn(self.isGrounding);
		
	},
	
	
	eventBind : function(){
		
		var self = this;
		
		self.scope.toMoveItem = function(item,type){
			
//			alert(JSON.stringify(item))
			
//			commodityIdA
//			commodityIdB
            var preId = null;
            var nexId = null;
			if(type == 0)//向下移动
			{
				if(item.id == self.CommodityList[self.CommodityList.length -1].id)
	            {
	            		$dialog.msg("当前商品已经在最底部！", 1.6);
	            		return;
	            }
			}
			if(type == 1){
				
				if(item.id == self.CommodityList[0].id)//向上移动
	            {
	            		$dialog.msg("当前商品已经在最顶部！", 1.6);
	            		return;
	            }
			}
            
            for(var i = 0; i < self.CommodityList.length; i ++)
            {
            	if(item.id == self.CommodityList[i].id)
            	{
            		if(type == 0)
            		{
            			preId = self.CommodityList[i].id;
            			nexId = self.CommodityList[i+1].id;
            		}
            		else{
            			preId = self.CommodityList[i].id;
            			nexId = self.CommodityList[i-1].id;
            		}
            	}
            }
            var params = {};
            params.commodityIdA = preId;
            params.commodityIdB = nexId;
            $data.httpRequest("post", api.API_MOVE_COMMIDITY, params,function(data){
			 	$dialog.msg("操作成功！", 1.6);
			    self.getData();
			});
		};
		
		self.scope.preViewCommodity = function(item){
			
			
			$(".cloase-commidify").css("display","block");
			$(".pre-com-box").css("display","block");
			$(".pre-com-content").css("display","block")
			
			self.getPreData(item);
		};
	
		
		self.scope.hidePre = function(){
			
			$(".cloase-commidify").css("display","none");
			$(".pre-com-box").css("display","none");
			$(".pre-com-content").css("display","none");
			$("#commidify-rich-content").html("");
			
			self.swiperModel = {
		
				swiperImgs : [],
			
				swiperName : '',
				
				swiperDesc : '',
				
				swiperMoney : 0,
				
				swiperNumber : 0,
				
				swiperDetail : ''
				
			};
			self.scope.swiperModel = self.swiperModel;
		  
		};
		
		
		self.scope.addCommodity = function(){
			self.singleNumber = true;
//		    self.scope.singleNumber = self.singleNumber;
		    $(".singleNumber").eq(1).removeClass("complexOrsingle");
		    $("#singleNub").attr("disabled",true);
		    $("#singleNub").css("background","#E9E9E9");
			$(".singleNumber").eq(0).addClass("complexOrsingle");
			
			self.showView(1);
			self.isAdd = 1;
			self.resetInnerData();
			self.modifyOrAdd = "新增商品";
			self.scope.modifyOrAdd = self.modifyOrAdd;
			if(self.isGrounding)
			{
				$("#dis_price").attr("disabled",false);
			    $("#dis_return").attr("disabled",false);

			    $("#dis_price").css({"background":"#ffffff","border":"1px solid #e3e3e3"});
			    $("#dis_return").css({"background":"#ffffff","border":"1px solid #e3e3e3"});
			}
			else{
				$("#dis_price").attr("disabled",false);
			    $("#dis_return").attr("disabled",false);
                
			    $("#dis_price").css({"background":"#ffffff","border":"1px solid #e3e3e3"});
			    $("#dis_return").css({"background":"#ffffff","border":"1px solid #e3e3e3"});
			}
			
		};
		
		self.scope.chooseSOrC = function(type){
			$(".singleNumber").eq(type).addClass("complexOrsingle");
		    if(type == 0)
		    {   
		    	self.CommodityNumber = 1;
		    	self.scope.CommodityNumber = self.CommodityNumber;
		    	self.singleNumber = true;
//		    	self.scope.singleNumber = self.singleNumber;
		    	$(".singleNumber").eq(1).removeClass("complexOrsingle");
		    	$("#singleNub").attr("disabled",true);
		    	$("#singleNub").css("background","#E9E9E9");
		    }
		    else{
		    	self.singleNumber = false;
//		    	self.scope.singleNumber = self.singleNumber;
		    	$(".singleNumber").eq(0).removeClass("complexOrsingle");
		    	$("#singleNub").attr("disabled",false);
		    	$("#singleNub").css("background","#ffffff");
		    }
			
		};
			
		self.scope.modCommodity = function(item){
			self.singleNumber = true;
//		    self.scope.singleNumber = self.singleNumber;
		    $(".singleNumber").eq(1).removeClass("complexOrsingle");
		    $("#singleNub").attr("disabled",true);
		    $("#singleNub").css("background","#E9E9E9");
			$(".singleNumber").eq(0).addClass("complexOrsingle");
			
			self.commodifyId = item.id;
			self.showView(1);
			self.isAdd = 0;
			self.resetInnerData();
			self.modifyOrAdd = "修改商品";
			self.scope.modifyOrAdd = self.modifyOrAdd;
			self.getSingle(item.id);
			if(self.isGrounding)
			{ 
				$("#dis_price").attr("disabled","disabled");
			    $("#dis_return").attr("disabled","disabled");
			    $("#dis_price").css({"background":"#e9e9e9","border":"1px solid #cccccc"});
			    $("#dis_return").css({"background":"#e9e9e9","border":"1px solid #cccccc"});
			}
			else{
				
                $("#dis_price").attr("disabled",false);
			    $("#dis_return").attr("disabled",false);
			    $("#dis_price").css({"background":"#ffffff","border":"1px solid #e3e3e3"});
			    $("#dis_return").css({"background":"#ffffff","border":"1px solid #e3e3e3"});
			}
		};
		
		
		self.scope.getDifCommodity = function(type){
			
			
			
			if(type == 0)
			{   
				self.isGrounding = 0;
				
				
			}
			else
			{
				self.isGrounding = 1;
				
			}
			self.scope.isGrounding = self.isGrounding;
			self.getData();
			self.changeBtn(self.isGrounding);
		};
		self.scope.delCommodity = function(){
			
			self.selectedArr = [];
			for(var a = 0; a < 	self.CommodityList.length; a ++)
			{
				if(self.CommodityList[a].selected)
				{  
					
					self.selectedArr.push(self.CommodityList[a].id);
				}
			}
			if(_utility.isEmpty(self.selectedArr))
			{   
				$dialog.msg("请选择商品！", 1.6);
				return;
			}
			
			$("#all-fixed-table-com").css("display","block")
			
		};
		
		
		self.scope.searchCommodify = function(){
			
			
			self.getData();
			self.fields = "";
			self.scope.fields =self.fields;
		};
		
		
		self.scope.allSel = function(){
			
			
			self.selectAll = !self.selectAll;
			if(self.selectAll)
			{
				for(var j = 0; j < 	self.CommodityList.length; j++ )
				{
					self.CommodityList[j].selected = true;
				}
			}
			else
			{
				for(var j = 0; j < 	self.CommodityList.length; j++ )
				{
					self.CommodityList[j].selected = false;
				}
			}
			self.scope.selectAll = self.selectAll;
		};
		
		
		self.scope.uploadCommodity = function(item,type){
			
			var params = {};
			params.id = item.id;
			params.is_up = type;
			$data.httpRequest("post", api.API_UP_COMMIDIFY, params,function(data){
			 	if(type == 1)
			 	{
			 		$dialog.msg("商品上架成功！", 1.6);
			 	}
			    else
			    {
			    	$dialog.msg("商品下架成功！", 1.6);
			    }
			    self.getData();
			});
		};
		
		self.scope.oneSel = function(item){
			
			item.selected = ! item.selected;
			var judge = true;
			for(var s = 0; s < 	self.CommodityList.length; s++ )
			{
				if(self.CommodityList[s].selected == false)
				{
					judge = false;
				}
				
			}
			if(judge == false)
			{   
				self.selectAll = false;
				
			}
			else{
				self.selectAll = true;
			}
			self.scope.selectAll = self.selectAll;
		};
		
		
		self.scope.yesToDelete = function(type){
			
			if(type == 1)
			{   
				
				var params = {};
				params.ids = JSON.stringify(self.selectedArr)
				$data.httpRequest("post", api.API_DEL_SALE_COMMIDIFY, params,function(data){
			 	
				 	$dialog.msg("商品删除成功！", 1.6);
				    
				    $("#all-fixed-table-com").css("display","none");
				    self.getData();
			    });
			}
			else
			{
				$("#all-fixed-table-com").css("display","none")
			}
			self.resetSelectedArr();
		};
		
		self.scope.onClickBack = function(){
			
			self.showView(0);
			
			self.resetInnerData();
		};
		
		self.scope.onClickSubmit = function(){
			
			
			if(_utility.isEmpty(self.scope.CommodityName))
			{
				 $dialog.msg("请输入商品名", 1.6);
				 return;
			}
			if(_utility.isEmpty(self.scope.CommodityDesc))
			{
				 $dialog.msg("请输入商品描述", 1.6);
				  return;
			}
			if(_utility.isEmpty(self.scope.CommodityImgs))
			{
				 $dialog.msg("请上传商品图片", 1.6);
				  return;
			}
			if(self.scope.CommodityBid_price < 0)
			{
				 $dialog.msg("商品进价不能小于0!", 1.6);
				  return;
			}
			
			if(_utility.isEmpty(self.scope.CommodityPrice))
			{
				 $dialog.msg("请输入商品价格", 1.6);
				  return;
			}
			if(parseInt(self.scope.CommodityPrice) >= 900000)
			{
				 $dialog.msg("商品价格应小于九十万", 1.6);
				  return;
			}
			if(!_utility.isEmpty(self.scope.CommodityYearYield) && (self.scope.CommodityYearYield <= 0))
			{
				 $dialog.msg("请输入合法的年化收益率", 1.6);
				  return;
			}
			
			if(_utility.isEmpty(self.scope.CommodityNumber) || self.scope.CommodityNumber <= 0)
			{
				 $dialog.msg("请输入商品库存", 1.6);
				  return;
			}
			if(_utility.isEmpty(self.scope.CommodityDetail))
			{
				 $dialog.msg("请输入商品详情", 1.6);
				  return;
			}
			
			if(self.isAdd == 1)
			{   
				
				var params = {};
				params.info = {};
				params.info.commodity_name = self.scope.CommodityName;
				params.info.commodity_desc = self.scope.CommodityDesc;
				params.info.commodity_detail = self.scope.CommodityDetail;
				params.info.commodity_price = self.scope.CommodityPrice;
				params.info.commodity_pic = self.scope.CommodityImgs;
				params.info.stock_num = self.scope.CommodityNumber;
				params.info.bid_price = self.scope.CommodityBid_price;
				if(self.singleNumber)
				{
					params.info.commodity_attr = 0;
				}
				else
				{
					params.info.commodity_attr = 1;
				}
				if(_utility.isEmpty(self.scope.CommodityYearYield))
				{
					params.info.annualized_return = 20;
				}
				else
				{
					params.info.annualized_return = parseInt(self.scope.CommodityYearYield);
				}
				
//				alert(JSON.stringify(self.CommodityImgs))
	
				var cover = null;
		        for(var i = 0; i < self.CommodityImgs.length; i++)
		        {
		        	if($(".goods-img-10").children(".select-round-10").eq(i).hasClass("round-has-select"))
		        	{
//		        		alert(i)
		        		cover = self.CommodityImgs[i];
//		        		alert("1"+cover)
		        	}
		        }
		        if(!_utility.isEmpty(cover))
		        {  
		        	params.info.commodity_cover = cover;
//		        	 alert("2"+params.info.commodity_cover)
		        }
		        else{
		        	
		        	params.info.commodity_cover = self.CommodityImgs[0];
//		        	 alert("3"+params.info.commodity_cover)
		        }
		        params.info = JSON.stringify(params.info);
//		         alert(params.info.commodity_cover)
//		        alert(JSON.stringify(params))
//		        return;
				$data.httpRequest("post", api.API_ADD_SALE_COMMIDIFY, params,function(data){
			 	
			 	     $dialog.msg("商品添加成功！", 1.6);
			 	     self.showView(0);
			 	     self.getData();
			    });
			}
			else
			{
				
				var params = {};
				params.id = self.commodifyId;
				
				params.modInfo =  {};
				params.modInfo.commodity_name = self.scope.CommodityName;
				params.modInfo.commodity_desc = self.scope.CommodityDesc;
				params.modInfo.commodity_detail = self.scope.CommodityDetail;
				params.modInfo.commodity_price = self.scope.CommodityPrice;
				params.modInfo.commodity_pic = self.scope.CommodityImgs;
				params.modInfo.stock_num = self.scope.CommodityNumber;
				params.modInfo.bid_price = self.scope.CommodityBid_price;
				var cover = null;
		        for(var i = 0; i < self.scope.CommodityImgs.length; i++)
		        {
		        	if($(".goods-img-10").children(".select-round-10").eq(i).hasClass("round-has-select"))
		        	{
		        		
		        		cover = self.scope.CommodityImgs[i];
		        		
		        	}
		        }
		        if(!_utility.isEmpty(cover))
		        {
		        	params.modInfo.commodity_cover = cover;
		        }
		        else{
		        	
		        	params.modInfo.commodity_cover = self.scope.CommodityImgs[0];
		        }
//		        alert(params.modInfo.commodity_cover)
		        
		       
		        
				if(self.singleNumber)
				{
					params.modInfo.commodity_attr = 0;
				}
				else
				{
					params.modInfo.commodity_attr = 1;
				}
			  
//				 return;
				params.modInfo = JSON.stringify(params.modInfo);
				$data.httpRequest("post", api.API_MOD_SALE_COMMIDIFY, params,function(data){
			 	
			 	    $dialog.msg("商品修改成功！", 1.6);
			 	    self.showView(0);
			 	    self.getData();
//			 	    self.getSingle(self.commodifyId)
			    });
			}
		};
		
		
	},
	
	getPreData : function(item){
	
		var self = this;
		var params = {};
		params.id = item.id;
		$data.httpRequest("post", api.API_GET_SALE_COMMIDIFY_DETAIL, params,function(data){
//			  alert(JSON.stringify(data))
            self.swiperModel.swiperImgs = [];
            self.scope.swiperModel.swiperImgs = self.swiperModel.swiperImgs;
			self.swiperModel.swiperName = data.info.commodity_name;
			self.swiperModel.swiperImgs = JSON.parse(data.info.commodity_pic);
//          self.swiperModel.swiperImgs = ["assets/images/public/default.png","assets/images/public/default-fmale.png","assets/images/public/default-male.png"];
			self.swiperModel.swiperDesc = data.info.commodity_desc;
			self.swiperModel.swiperNumber = data.info.stock_num;
			self.swiperModel.swiperMoney = data.info.commodity_price;
			self.swiperModel.swiperDetail = data.info.commodity_detail;
			var screenWidth = window.screen.width;
    		if(self.swiperModel.swiperName.length > 13)
    		{   
    			
    			self.swiperModel.swiperName = self.swiperModel.swiperName.substring(0,12) + "...";
    		}
			self.scope.swiperModel = self.swiperModel;
			self.scope.$apply();
			
			
//			setTimeout(function(){
				$("#commidify-rich-content").html(data.info.commodity_detail);
				var swiper = new Swiper('.swiper-container', {
					
	                pagination: '.swiper-pagination',
	                paginationClickable: true,
	                autoplay: 3000,
	                autoplayDisableOnInteraction: true,
	                activeIndex: 0,
	                observer:true,
	            });
//			},1000)
			
			
//	        
		})
		
	},
	
	getSingle : function(id){
		
		var self = this;
		
		var params = {};
		params.id = id;
		 
		$data.httpRequest("post", api.API_GET_SALE_COMMIDIFY_DETAIL, params,function(data){
		
			self.CommodityImgs = JSON.parse(data.info.commodity_pic);
			self.CommodityName = data.info.commodity_name;
	        self.CommodityBid_price = parseInt(data.info.bid_price);
			self.CommodityPrice = data.info.commodity_price;
			self.CommodityYearYield = data.info.annualized_return;
			self.CommodityDesc = data.info.commodity_desc;
			self.CommodityDetail = data.info.commodity_detail;
			self.CommodityNumber = data.info.stock_num;
			self.scope.CommodityBid_price = self.CommodityBid_price;
			self.scope.CommodityName = self.CommodityName;
			self.scope.CommodityDesc = self.CommodityDesc;
			self.scope.CommodityDetail = self.CommodityDetail;
			self.scope.CommodityPrice = parseInt(self.CommodityPrice);
			self.scope.CommodityImgs = self.CommodityImgs;
			self.scope.CommodityYearYield = parseInt(self.CommodityYearYield);
			self.scope.CommodityNumber = parseInt(self.CommodityNumber);
			if(data.info.commodity_attr == 0)
			{
				
				self.singleNumber = true;
			    $(".singleNumber").eq(1).removeClass("complexOrsingle");
			    $("#singleNub").attr("disabled",true);
			    $("#singleNub").css("background","#E9E9E9");
				$(".singleNumber").eq(0).addClass("complexOrsingle");
			
			}
			else
			{
				self.singleNumber = false;
			    $(".singleNumber").eq(0).removeClass("complexOrsingle");
			    $("#singleNub").attr("disabled",false);
			    $("#singleNub").css("background","#ffffff");
				$(".singleNumber").eq(1).addClass("complexOrsingle");
			}
			self.scope.$apply();
			 if(!_utility.isEmpty(data.info.commodity_cover)  && !_utility.isEmpty(self.CommodityImgs))
            {   
            	for(var i = 0; i < self.CommodityImgs.length; i ++)
            	{
            	
            		if(self.CommodityImgs[i] == data.info.commodity_cover)
            		{   
//          		    alert(i)
            			$(".goods-img-10").children(".select-round-10").eq(i).addClass("round-has-select").parent().siblings().find(".select-round-10").removeClass("round-has-select")
            			
            		}
            	}
            	
            }
		});
	},
	
	  //显示和隐藏
    showView : function(index)
    {
    	$(".item").hide();
    	$(".item").eq(index).show();
    },
	
	
	changeBtn : function(type){
		
		if(type == 1)
		{   
			$(".up-btn-1s").eq(1).addClass("the-btn-has-sel");
			$(".up-btn-1s").eq(0).removeClass("the-btn-has-sel");
		}
		else{
		
            $(".up-btn-1s").eq(0).addClass("the-btn-has-sel");
            $(".up-btn-1s").eq(1).removeClass("the-btn-has-sel");
		}
		
	},
	
	resetSelectedArr : function()
	{
		var self = this;
		
		for(var s = 0; s < 	self.CommodityList.length; s++ )
		{
		    self.CommodityList[s].selected = false;
			
		}
		self.scope.CommodityList = self.CommodityList;
		self.selectAll = false;
		self.scope.selectAll = self.selectAll;
	},
	
	
	resetInnerData : function(){
		
		var self = this;
		
	    self.fields = "";
	    
	    self.selectedArr = [];
	    
//		self.isGrounding = 0;
		
		self.CommodityName = null;
		
		self.CommodityDesc  ='';
		
		self.CommodityImgs = [];
		
		self.CommodityPrice = null;
		
		self.CommodityYearYield = 20;
		
		self.CommodityNumber = 1;
		
		self.CommodityDetail =  '';
		self.CommodityBid_price = 0;
		self.scope.CommodityBid_price = self.CommodityBid_price;
		self.scope.selectedArr = self.selectedArr;
		self.scope.CommodityName = self.CommodityName;
		self.scope.CommodityDesc = self.CommodityDesc;
		self.scope.CommodityImgs = self.CommodityImgs;
		self.scope.CommodityPrice = self.CommodityPrice;
		self.scope.CommodityYearYield = self.CommodityYearYield;
		self.scope.CommodityNumber = self.CommodityNumber;
		self.scope.CommodityDetail = self.CommodityDetail;
	    self.scope.fields = self.fields;
		
	},
};
