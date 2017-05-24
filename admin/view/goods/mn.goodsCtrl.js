/**
 * 藏品控制器
 * 
 * 
 */

var GoodsController = {
	
	//全局变量
	scope : null,
	
	outId : null,
	
	//数据模型
	isSelected : false,
    currentId : null,
    selectedIds : null,
	goodsModel : {
		modelArr : [],
		selectAll: false,
		goods_id : null,
		isAdd : 0,
		modalTitle: null,  //添加or修改标题
        goodsTitle: null,  //藏品标题
        goodsTitle : "",  //藏品标题
        goods_bid : "", //藏品进价
        goodsPic : [],      //藏品图片
        editor : ""
    },
    
 /*   
    goodsModelCopy : {
    	goodsTitle: null,  //藏品标题
        goodsTitle : "",  //藏品标题
        goods_bid : "", //藏品进价
        goodsPic : [],      //藏品图片
        editor : ""
    },
  */  
    init: function($scope)
    {
    	this.scope = $scope;
    	
    	this.dataModelInit();
    	
    	this.getGoodsList();
    	
    	this.showView(0);
    	
    	this.reSetModel();
    	
    	this.bindEvent();
    },
    
    /**
     * 数据模型初始化绑定
     */
    
    
    reSetModel : function()
    {
        this.goodsModel.goodsTitle = "";
        this.goodsModel.goods_bid = "";
        this.goodsModel.goodsPic = [];
        this.goodsModel.editor = "";
    },
    
    
    dataModelInit : function()
    {
    	this.scope.config = editorConfig;
    	this.scope.isSelected = this.isSelected;
    	this.scope.goodsModel = this.goodsModel;
//  	this.scope.goodsModelCopy = this.goodsModelCopy;
    },
 
 /*
    reSetCopyModel : function()
    {
    	this.goodsModelCopy.goodsTitle = "";
        this.goodsModelCopy.goods_bid = "";
        this.goodsModelCopy.goodsPic = [];
        this.goodsModelCopy.editor = "";
    	
    },
 
 */
    /**
     * 获取商品列表
     */
    getGoodsList : function()
    {
    	var self = this;
        
        pageController.pageInit(self.scope,api.API_GET_GOODS_LIST,{},function(data){
        	
        	self.goodsModel.modelArr = [];
        	
        	if(self.scope.page.selectPageNum)
            {
                var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                pageController.pageNum(totalPage);
            }
            
            var modelArr = data.goods;
             
            for(var i = 0; i < modelArr.length; i++)
            {
            	var itemObj = {};
            	itemObj.goods_id = modelArr[i].goods_id;
            	itemObj.goods_name = modelArr[i].goods_name;
//          	var firstPic = JSON.parse(modelArr[i].goods_pics)[0]
//          	itemObj.goods_pics = _utility.isEmpty(firstPic) ? defaultImage : firstPic;
                itemObj.goods_pics = modelArr[i].goods_cover;
            	itemObj.goods_bid = modelArr[i].goods_bid;
            	itemObj.goods_bid = _utility.toDecimalTwo(modelArr[i].goods_bid);
            	itemObj.create_time = _utility.formatDate(modelArr[i].create_time,true);
            	itemObj.selected = false;
            	itemObj.outLibrary = modelArr[i].outLibrary;
            	
            	self.goodsModel.modelArr.push(itemObj);
            }
            self.scope.goodsModel.modelArr = self.goodsModel.modelArr;
            self.scope.$apply();
        })
       
    },
    
    /**
     * 检查是否已经全选
     */
    checkSelectAll : function()
	{
		var isSelectAll = true;
		for (var i = 0; i < this.goodsModel.modelArr.length; i++)
		{
			if (!this.goodsModel.modelArr[i].selected)
			{
				isSelectAll = false;
				break;
			}
		}

		this.scope.isSelected = isSelectAll;
	},
    
    
    //点击事件
    bindEvent : function()
    {
    	var self = this;
    	
    	//全选
    	self.scope.onClickSelectAll = function()
    	{
    		self.isSelected = !self.isSelected;
			self.scope.isSelected = self.isSelected;

			for(var i = 0 ; i < self.goodsModel.modelArr.length ; i ++)
			{
				self.goodsModel.modelArr[i].selected = self.isSelected;
			}
    	};
    	
    	//单选
    	self.scope.onClickItemSelected = function(goods_id)
    	{
    		for(var i = 0 ; i < self.goodsModel.modelArr.length ; i ++)
			{
				if(self.goodsModel.modelArr[i].goods_id == goods_id)
				{
					self.goodsModel.modelArr[i].selected = !self.goodsModel.modelArr[i].selected;
				}
			}
			
			self.checkSelectAll();
    	};
    	
        //点击删除藏品
    	self.scope.onClickToDeleteGoods = function()
    	{
            self.selectedIds = commonFn.findSelIds(self.goodsModel, 'goods_id');
          
            if(!_utility.isEmpty(self.selectedIds))
            {
            	$("#all-fixed-table-goods").css({"display":"block"}) 
            }
        };
    	
    	self.scope.yesToDelete = function(type){
        	
        	if(type == 0)
        	{
        		$("#all-fixed-table-goods").css({"display":"none"});
        		
	                if(self.goodsModel.selectAll)
	                {
	                    self.getList();
	                    self.goodsModel.selectAll = false;
	                }
	                else
	                {
	                    pageController.reFreshCurPage();
	                }
        	}
        	 else
        	 {
        	 	
        	 	if(!_utility.isEmpty(self.selectedIds))
	            {
	                commonFn.delListByIds(self.selectedIds, 'goodsIds', api.API_DEL_GOODS, function(){
	                    layer.msg(CN_TIPS.DEL_OK, {time: 1600, anim: 5});
	                   
	                    if(self.goodsModel.selectAll)
	                    {
	                        self.getList();
	                        self.goodsModel.selectAll = false;
	                    }
	                    else
	                    {
	                        pageController.reFreshCurPage();
	                    }
	                    $("#all-fixed-table-goods").css({"display":"none"});
	                })
	            }
        	 	
        	 }
        	
        	
        };
    	
    	
    	//点击复制信息
    	self.scope.copyGood = function(goods_id)
    	{
    		self.reSetModel();
//  		self.goodsModelCopy.goods_id = goods_id;
    		self.goodsModel.goods_id = goods_id;
    		self.scope.title = CN_TIPS.COPY_INFO;
    		self.showView(1);
    		self.goodsModel.isAdd = 2;
    		self.getSingleGoods(goods_id);
    	};
    	
    	
    	
    	//入库按钮点击事件
    	self.scope.onClickToAddGoods = function()
    	{   
    		self.reSetModel();
    		self.showView(1);
     		self.goodsModel.isAdd = 0;
    		self.scope.title = "添加藏品";
    		
    	};
    	
    	//点击修改藏品
    	self.scope.modified = function(goods_id)
    	{   
    		self.reSetModel();
            self.goodsModel.goods_id = goods_id;
            self.goodsModel.isAdd = 1;
            self.scope.title = CN_TIPS.MOD_INFO;
            self.getSingleGoods(goods_id);
            self.showView(1);
    	};
    	
    	self.scope.outGood = function(id){
    		$("#all-fixed-table-goods-out").css({"display":"block"});
    		
    		self.outId = id;
    		
    	};
    	
    	
    	self.scope.yesToOut = function(type){
    		
    		if(type == 1)
    		{   
    			$("#all-fixed-table-goods-out").css({"display":"none"});
    			var params= {};
	    		params.goodsId = self.outId;
	    		$data.httpRequest("post", api.API_OUT_GOODS, params, function(data){
	                layer.msg("出库成功！", {time: 1600, anim: 5});
	                self.getGoodsList();
		            self.scope.$apply();
	             })
    		    
    		}
    		else
    		{
    			$("#all-fixed-table-goods-out").css({"display":"none"});
    		}
    	};
    	
    	//点击提交复制信息
    	self.scope.onClickSubmitCopy = function(){
    		self.copyGoods();
    		self.showView(0);
    	};
    	
    	//返回按钮点击事件
    	self.scope.onClickBack = function()
    	{   
    		self.showView(0);
    	};
    
    	//提交
    	self.scope.onClickSubmit = function()
    	{
    		if(self.goodsModel.isAdd == 0)
    		{
    			self.addGoods();
    		}
    		else if(self.goodsModel.isAdd == 1)
    		{
    			self.modGoods();
    		}
    		else{
    			self.copyGoods();
    		}
    	};
    	
    },
    
    //显示和隐藏
    showView : function(index)
    {
    	$(".item").hide();
    	$(".item").eq(index).show();
    },
	
	
 
    //获得单个藏品
    getSingleGoods: function(id){
        var self = this,
            params = {
                goodsId: id
            };

        $data.httpRequest("post", api.API_GET_SINGLE_GOODS, params, function(data){
           
            var singleObj = data.goodsInfo;
            if(!_utility.isEmpty(singleObj.goods_cover) )
            {
            	self.goodsModel.goods_cover =  singleObj.goods_cover;
            }
            self.goodsModel.goodsTitle = singleObj.goods_name;
            self.goodsModel.goods_bid = parseFloat(singleObj.goods_bid);
            self.goodsModel.goodsPic = JSON.parse(singleObj.goods_pics);
            self.goodsModel.editor = singleObj.goods_detail;
            self.scope.$apply();
           
            if(!_utility.isEmpty(self.goodsModel.goods_cover)  && !_utility.isEmpty(self.goodsModel.goodsPic))
            {   
            	for(var i = 0; i < self.goodsModel.goodsPic.length; i ++)
            	{
            	
            		if(self.goodsModel.goodsPic[i] == self.goodsModel.goods_cover)
            		{   
            		
            			$(".goods-img").children(".select-round").eq(i).addClass("round-has-select").parent().siblings().find(".select-round").removeClass("round-has-select")
            			
            		}
            	}
            	
            }
           
        })
    },
     
 /*    

     getSingleGoodsCopy: function(id){
        var self = this,
            params = {
                goodsId: id
            };

        $data.httpRequest("post", api.API_GET_SINGLE_GOODS, params, function(data){
           
            var singleObj = data.goodsInfo;
            if(!_utility.isEmpty(singleObj.goods_cover) )
            {
            	self.goodsModelCopy.goods_cover =  singleObj.goods_cover;
            }
            self.goodsModelCopy.goodsTitle = singleObj.goods_name;
            self.goodsModelCopy.goods_bid = parseFloat(singleObj.goods_bid);
            self.goodsModelCopy.goodsPic = JSON.parse(singleObj.goods_pics);
            self.goodsModelCopy.editor = singleObj.goods_detail;
            self.scope.$apply();
           
            if(!_utility.isEmpty(self.goodsModelCopy.goods_cover)  && !_utility.isEmpty(self.goodsModelCopy.goodsPic))
            {   
            	for(var j = 0; j < self.goodsModelCopy.goodsPic.length; j ++)
            	{
            	
            		if(self.goodsModelCopy.goodsPic[j] == self.goodsModelCopy.goods_cover)
            		{   
            			
            			$(".goods-img-2").children(".select-round-2").eq(j).addClass("round-has-select").parent().siblings().find(".select-round-2").removeClass("round-has-select")
            			
            
            		}
            	}
            	
            }
           
        })
    },
  
  
 */
    //添加藏品
    addGoods: function(){
        var self = this,
            params = {},
            goodsInfo = {};
        
        goodsInfo.goods_name = self.goodsModel.goodsTitle;
        
        if(self.goodsModel.goods_bid == "" || self.goodsModel.goods_bid == null)
        {
            self.goodsModel.goods_bid = 0;
        }
        if(self.goodsModel.goods_bid < 0)
        {   
            layer.msg(CN_TIPS.BLANK_BID, {time: 1600, anim: 5});
            self.goodsModel.goods_bid = 0;
            return;
        }
        goodsInfo.goods_bid = self.goodsModel.goods_bid;
        goodsInfo.goods_pics = JSON.stringify(self.goodsModel.goodsPic);
        goodsInfo.goods_bid = _utility.toDecimalTwo(goodsInfo.goods_bid);
          
        var cover = null;
        for(var i = 0; i < self.goodsModel.goodsPic.length; i++)
        {
        	if($(".goods-img").children(".select-round").eq(i).hasClass("round-has-select"))
        	{
        		
        		cover = self.goodsModel.goodsPic[i];
        		
        	}
        }
        if(!_utility.isEmpty(cover))
        {
        	goodsInfo.goods_cover = cover;
        }
        else{
        	
        	goodsInfo.goods_cover = self.goodsModel.goodsPic[0];
        }

		goodsInfo.goods_detail = self.goodsModel.editor;

        if(self.checkParams()){
            params.goodsInfo = JSON.stringify(goodsInfo);
            $data.httpRequest("post", api.API_ADD_GOODS, params, function(){

                layer.msg(CN_TIPS.ADD_OK, {time: 1600, anim: 5});
                pageController.callApi();
                self.showView(0);
            })
        }
    },
    
    //复制藏品
    copyGoods: function(){
    	var self = this,
            params = {},
            goodsInfo = {};
        
        goodsInfo.goods_name = self.goodsModel.goodsTitle;
        
        if(self.goodsModel.goods_bid == "" || self.goodsModel.goods_bid == null)
        {
            self.goodsModel.goods_bid = 0;
        }
        if(self.goodsModel.goods_bid < 0)
        {   
            layer.msg(CN_TIPS.BLANK_BID, {time: 1600, anim: 5});
            self.goodsModel.goods_bid = 0;
            return;
        }
        goodsInfo.goods_bid = self.goodsModel.goods_bid;
      
        goodsInfo.goods_pics = JSON.stringify(self.goodsModel.goodsPic);
        goodsInfo.goods_bid = _utility.toDecimalTwo(goodsInfo.goods_bid);
        var cover = null;
        for(var i = 0; i < self.goodsModel.goodsPic.length; i++)
        {
        	if($(".goods-img").children(".select-round").eq(i).hasClass("round-has-select"))
        	{
        		
        		cover = self.goodsModel.goodsPic[i];
        		
        	}
        }
        if(!_utility.isEmpty(cover))
        {
        	goodsInfo.goods_cover = cover;
        }
        else{
        	
        	goodsInfo.goods_cover = self.goodsModel.goodsPic[0];
        }
		goodsInfo.goods_detail = self.goodsModel.editor;
      
        if(self.checkParams()){
            params.goodsInfo = JSON.stringify(goodsInfo);
            $data.httpRequest("post", api.API_ADD_GOODS, params, function(){

                layer.msg("复制藏品成功", {time: 1600, anim: 5});
                pageController.callApi();
                self.showView(0);
            })
        }
    },
    
    //修改藏品
    modGoods: function(){
        var self = this,
            params = {
                goodsId: self.goodsModel.goods_id
            },
            goodsInfo = {};
        
        goodsInfo.goods_name = self.goodsModel.goodsTitle;
        
        if(self.goodsModel.goods_bid == "" || self.goodsModel.goods_bid == null)
        {
            self.goodsModel.goods_bid = 0;
        }
        if(self.goodsModel.goods_bid < 0)
        {   
            layer.msg(CN_TIPS.BLANK_BID, {time: 1600, anim: 5});
            self.goodsModel.goods_bid = 0;
            return;
        }
        goodsInfo.goods_bid = self.goodsModel.goods_bid;
        goodsInfo.goods_pics = JSON.stringify(self.goodsModel.goodsPic);
       
        goodsInfo.goods_bid = _utility.toDecimalTwo(goodsInfo.goods_bid);
         
        var cover = null;
        for(var i = 0; i < self.goodsModel.goodsPic.length; i++)
        {
        	if($(".goods-img").children(".select-round").eq(i).hasClass("round-has-select"))
        	{
        		
        		cover = self.goodsModel.goodsPic[i];
        		
        	}
        
        }
        if(!_utility.isEmpty(cover))
        {
        	goodsInfo.goods_cover = cover;
        }
        else{
        	
        	goodsInfo.goods_cover = self.goodsModel.goodsPic[0];
        }
        goodsInfo.goods_detail = self.goodsModel.editor;
        
        if(self.checkParams()){
            params.modInfo = JSON.stringify(goodsInfo);

            $data.httpRequest("post", api.API_MOD_GOODS, params, function(){

                layer.msg(CN_TIPS.MOD_OK, {time: 1600, anim: 5});

                self.showView(0);
                pageController.reFreshCurPage();
                self.scope.$apply();
            })
        }
    },
     
	 //富文本上传图片
    upLoadFile2: function(){
        upLoadFile.start("Form_2", "input_2", 1,

            function(responseText, statusText) {
                if(statusText == "success")
                {
                    GoodsCtrl.goodsModel.picUrl = responseText.data.file[0].url;
                    GoodsCtrl.scope.$apply();
                }
            }
        )
    },

    //上传视频
    upLoadFile3: function(){
        upLoadFile.start("Form_3", "input_3", 2,

            function(responseText, statusText) {
                if(statusText == "success")
                {
                    GoodsCtrl.goodsModel.videoUrl = responseText.data.file[0].url;
                    GoodsCtrl.scope.$apply();
                }
            }
        )
    },
    
   
    //检查参数是否为空
    checkParams: function(){
        var self = this;

        if(_utility.isEmpty(self.goodsModel.goodsTitle))
        {
            layer.msg(CN_TIPS.BLANK_TITLE, {time: 1600, anim: 5});
            return false;
        }

        if(_utility.isEmpty(self.goodsModel.goodsPic))
        {
            layer.msg(CN_TIPS.PIC_BLANK, {time: 1600, anim: 5});
            return false;
        }
        if(_utility.isEmpty(self.goodsModel.editor))
        {
            layer.msg(CN_TIPS.BLANK_CONTENT, {time: 1600, anim: 5});
            return false;
        }

        return true;
    },
 
 /*
    checkParamsCopy : function(){
    	
    	var self = this;

        if(_utility.isEmpty(self.goodsModelCopy.goodsTitle))
        {
            layer.msg(CN_TIPS.BLANK_TITLE, {time: 1600, anim: 5});
            return false;
        }

        if(_utility.isEmpty(self.goodsModelCopy.goodsPic))
        {
            layer.msg(CN_TIPS.PIC_BLANK, {time: 1600, anim: 5});
            return false;
        }
        if(_utility.isEmpty(self.goodsModelCopy.editor))
        {
            layer.msg(CN_TIPS.BLANK_CONTENT, {time: 1600, anim: 5});
            return false;
        }

        return true;
    }
  */ 
};


