

var specialSellingController = {
	
	
	scope : null,
	
	specialImgs : [],
	
	selectAll : false,
	
	selectedArr : [],
	
	fields : "",
	
	
	fixedSelectAll : false,
	
	fixedselectedArr : [],
	
	fixedFields : '',
	
	fixedCommodityList : [],
	
	TMHList : [],
	
	CommodityName : null,
	
	CommodityDesc : '',
	
	CommodityImgs : [],
	
	CommodityPrice : null,
	
	CommodityNumber : null,
	
	CommodityDetail : '',
	
	
	init : function($scope){
		
		this.scope = $scope;
		
		this.scope.specialImgs = this.specialImgs;
		
		this.scope.selectAll = this.selectAll;
		this.scope.fixedSelectAll = this.fixedSelectAll;
	
		this.scope.fixedselectedArr = this.fixedselectedArr;
	
	    this.scope.fixedFields = this.fixedFields;
		
		
		this.getData();
		
		this.eventBind();
	},
	
	
	getData : function(){
		
		var self = this;
		
		
		
		var params = {};
		
		if(!_utility.isEmpty(self.scope.fields))
		{   
			params.fields = self.scope.fields;
			
		}
	
		 pageController.pageInit(self.scope,api.API_GET_SPECIAL_SALE_LIST,params,function(data){
        	
//      	alert(JSON.stringify(data))
        	if(self.scope.page.selectPageNum)
            {
                var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                pageController.pageNum(totalPage);
            }
            
            self.TMHList = data.TMHList;
            for(var i = 0; i < self.TMHList.length; i ++ )
	        {
	           	self.TMHList[i].selected = false;
//	           	self.TMHList[i].picture = JSON.parse(self.TMHList[i].info.commodity_pic)[0];
	        }
	        
            self.scope.TMHList = self.TMHList;
        
            self.scope.$apply();
        })
	},
	
	getFixedData : function(){
		
		var self = this;
		
		var params = {};
		
		params.fields = self.scope.fixedFields;
		params.startIndex = 0;
		params.num = 0;
		$data.httpRequest("post", api.API_GET_HAS_UP_COMMIDIFY, params,function(data){
			
			self.fixedCommodityList = data.UpCommodityList;
			if(data.count == 0)
			{
				$dialog.msg("暂无数据！", 1.6);
			}
			for(var j = 0; j < self.fixedCommodityList.length; j ++)
			{
				self.fixedCommodityList[j].selected = false;
//				self.fixedCommodityList[j].picture = JSON.parse(self.fixedCommodityList[j].commodity_pic)[0];
				
			}
//			alert(self.fixedCommodityList[0].commodity_cover)
			self.scope.fixedCommodityList = self.fixedCommodityList;
			self.scope.$apply()
		})
		
	},
	
	
	eventBind : function(){
		
		var self = this;
		
		
		self.scope.searchFixedList = function(){
			
			self.getFixedData();
			self.fixedSelectAll = false;
	
	        self.fixedselectedArr = [];
	
	        self.fixedFields = '';
	        self.scope.fixedSelectAll = self.fixedSelectAll;
	        self.scope.fixedselectedArr = self.fixedselectedArr;
	        self.scope.fixedFields = self.fixedFields;
		};
		
		
		self.scope.hideFicedAdd = function(){
			
			self.fixedSelectAll = false;
	
	        self.fixedselectedArr = [];
	
	        self.fixedFields = '';
	        self.scope.fixedSelectAll = self.fixedSelectAll;
	        self.scope.fixedselectedArr = self.fixedselectedArr;
	        self.scope.fixedFields = self.fixedFields;
			$(".add-more-special-box").css("display","none");
			$(".add-more-special-content").css("display","none");
			$("body").height($(window).height()).css({
			  "overflow-y": "auto"
			});
			
		};
		
		self.scope.toAddCommToSpe = function(){
			self.fixedselectedArr = [];
			for(var a = 0; a < 	self.fixedCommodityList.length; a ++)
			{
				if(self.fixedCommodityList[a].selected)
				{  
					
					self.fixedselectedArr.push(parseInt(self.fixedCommodityList[a].id));
				}
			}
			if(_utility.isEmpty(self.fixedselectedArr))
			{   
				$dialog.msg("请选择商品！", 1.6);
				return;
			}
			var params = {};
			params.ids = self.fixedselectedArr;
			params.ids = JSON.stringify(params.ids)
			
			$data.httpRequest("post", api.API_UO_SALE_TO_SPECIAL, params,function(data){
				
				self.fixedFields = '';
				self.scope.fixedFields = self.fixedFields;
				self.getFixedData();
				self.getData();
				self.fixedSelectAll = false;
				self.scope.fixedSelectAll = self.fixedSelectAll;
				$(".add-more-special-box").css("display","none");
			    $(".add-more-special-content").css("display","none");
			    $("body").height($(window).height()).css({
				  "overflow-y": "auto"
				});
				$dialog.msg("添加成功！", 1.6);
			})
		};
		
		
		self.scope.fixedOneSel = function(item){
			
			item.selected = !item.selected;
			
			var judge = true;
			for(var s = 0; s < 	self.fixedCommodityList.length; s++ )
			{
				if(self.fixedCommodityList[s].selected == false)
				{
					judge = false;
					break;
				}
				
			}
			if(judge == false)
			{   
				self.fixedSelectAll = false;
				
			}
			else{
				self.fixedSelectAll = true;
			}
			self.scope.fixedSelectAll = self.fixedSelectAll;
			
		};
		
		self.scope.fixedAllSel = function(){
			
			self.fixedSelectAll = !self.fixedSelectAll;
			if(self.fixedSelectAll)
			{
				for(var j = 0; j < 	self.fixedCommodityList.length; j++ )
				{
					self.fixedCommodityList[j].selected = true;
				}
			}
			else
			{
				for(var j = 0; j < 	self.fixedCommodityList.length; j++ )
				{
					self.fixedCommodityList[j].selected = false;
				}
			}
			self.scope.fixedSelectAll = self.fixedSelectAll;
			
		};
		
		
		self.scope.addCommodity = function(){
			
			$(".add-more-special-box").css("display","block");
			$(".add-more-special-content").css("display","block");
			$("body").height($(window).height()).css({
			  "overflow-y": "hidden"
			});
			self.getFixedData();
		};
		
		
	
		
		self.scope.delCommodity = function(){
			self.selectedArr = [];
			for(var a = 0; a < 	self.TMHList.length; a ++)
			{
				if(self.TMHList[a].selected)
				{  
					
					self.selectedArr.push(parseInt(self.TMHList[a].commodity_id));
				}
			}
			if(_utility.isEmpty(self.selectedArr))
			{   
				$dialog.msg("请选择商品！", 1.6);
				return;
			}
			
			$("#all-fixed-table-special").css("display","block")
			
		};
		
		
		self.scope.searchCommodify = function(){
			
			self.getData();
			self.fields = "";
			self.scope.fields = self.fields;
		};
		
		
		
		self.scope.oneSel = function(item){
			
			item.selected = ! item.selected;
			var judge = true;
			for(var s = 0; s < 	self.TMHList.length; s++ )
			{
				if(self.TMHList[s].selected == false)
				{
					judge = false;
					break;
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
		
		
		
		
		self.scope.allSel = function(){
			
			self.selectAll = !self.selectAll;
			if(self.selectAll)
			{
				for(var j = 0; j < 	self.TMHList.length; j++ )
				{
					self.TMHList[j].selected = true;
				}
			}
			else
			{
				for(var j = 0; j < 	self.TMHList.length; j++ )
				{
					self.TMHList[j].selected = false;
				}
			}
			self.scope.selectAll = self.selectAll;
		};
		
		
		self.scope.preViewCommodity = function(item){
			
			
			self.showView(1);
			self.resetInnerData();
			var params = {};
			params.commodity_id = item.commodity_id;
			$data.httpRequest("post", api.API_GET_SPACIAL_SALE_DETAIL, params,function(data){
			 	
			 	self.CommodityName = data.info.commodity_name;
		
				self.CommodityDesc  =  data.info.commodity_desc;
				
				self.CommodityImgs = JSON.parse(data.info.commodity_pic);
				
				self.CommodityPrice =  parseInt(data.info.commodity_price);
				
				self.CommodityNumber =  parseInt(data.info.stock_num) ;
				
				self.CommodityDetail =   data.info.commodity_detail;
			 	self.scope.CommodityName = self.CommodityName;
				self.scope.CommodityDesc = self.CommodityDesc;
				self.scope.CommodityImgs = self.CommodityImgs;
				self.scope.CommodityPrice = self.CommodityPrice;
				self.scope.CommodityNumber = self.CommodityNumber;
				self.scope.CommodityDetail = self.CommodityDetail;
			 	self.scope.$apply();
			 	if(!_utility.isEmpty(data.info.commodity_cover)  && !_utility.isEmpty(self.CommodityImgs))
                {   
	            	for(var i = 0; i < self.CommodityImgs.length; i ++)
	            	{
	            	
	            		if(self.CommodityImgs[i] == data.info.commodity_cover)
	            		{   
	            		    
	            			$(".goods-img-14").children(".select-round-14").eq(i).addClass("round-has-select").parent().siblings().find(".select-round-14").removeClass("round-has-select")
	            		    
	            		}
	            	}
            	
                }
			 	
			});
		};
	
		
		
		self.scope.yesToDelete = function(type){
			
			
			if(type == 1)
			{   
				
				var params = {};
				params.commodity_ids = JSON.stringify(self.selectedArr)
				$data.httpRequest("post", api.API_DEL_SPECIAL_COMMIDIFY, params,function(data){
			 	
				 	$dialog.msg("商品删除成功！", 1.6);
				    
				    $("#all-fixed-table-special").css("display","none");
				    self.getData();
			    });
			}
			else
			{
				$("#all-fixed-table-special").css("display","none")
			}
			self.resetSelectedArr();
		};
		
		self.scope.onClickBack = function(){
			
			self.showView(0);
		};
		
		
		self.scope.getDifCommodity = function(){
			
			
		};
		
	},
	
	
	  //显示和隐藏
    showView : function(index)
    {
    	$(".item").hide();
    	$(".item").eq(index).show();
    },
	
	
	resetSelectedArr : function()
	{
		var self = this;
		
		for(var s = 0; s < 	self.TMHList.length; s++ )
		{
		    self.TMHList[s].selected = false;
			
		}
		self.scope.TMHList = self.TMHList;
		self.selectAll = false;
		self.scope.selectAll = self.selectAll;
	},
	
	
	
	resetInnerData : function(){
		
		var self = this;
		
	    self.fields = "";
	    
	    self.selectedArr = [];
	   
		self.CommodityName = null;
		
		self.CommodityDesc  ='';
		
		self.CommodityImgs = [];
		
		self.CommodityPrice = null;
		
		self.CommodityNumber = null;
		
		self.CommodityDetail =  '';
		
		self.scope.selectedArr = self.selectedArr;
		self.scope.CommodityName = self.CommodityName;
		self.scope.CommodityDesc = self.CommodityDesc;
		self.scope.CommodityImgs = self.CommodityImgs;
		self.scope.CommodityPrice = self.CommodityPrice;
		self.scope.CommodityNumber = self.CommodityNumber;
		self.scope.CommodityDetail = self.CommodityDetail;
	    self.scope.fields = self.fields;
		
	},
};
