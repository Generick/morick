
var objectGoodsController = {
	
	scope : null,
	
	sumCount: null,
	
	objectList : [],
	
	init: function($scope){
		  
		var start = {
            format:"YYYY-MM-DD hh:mm:ss",
            minDate:"1900-01-01 00:00:00",
            maxDate:"2099-12-31 23:59:59",
            choosefun: function(elem, datas) {
                end.minDate = datas;
            }
        };
        var end = {
            format:"YYYY-MM-DD hh:mm:ss",
            minDate:"1900-01-01 00:00:00",
            maxDate:"2099-12-31 23:59:59",
            choosefun: function(elem, datas) {
                start.maxDate = datas;
            }
        };

        $("#sTime").jeDate(start);
        $("#eTime").jeDate(end);
		  
		this.scope = $scope;
      
		this.getDataList();
		
		this.eventBind();
	},
	
	
	getDataList : function(){
		
		var self = this;
		
		var params = {};
		params.type = 0;
		
		pageController.pageInit(self.scope, api.API_GET_DELETE_AUCTIONS_OBJECTS,params,
            /**
             * @param data.count
             * @param data.auctionList 删除的藏品列表
             */
            function(data){
               
                
                  self.sumCount = data.count;
                  
                if(self.scope.page.selectPageNum)
                {
                    var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                    pageController.pageNum(totalPage);
                }
                self.objectList = data.delRecord;
                if(self.objectList.length == 0)
                {
                	layer.msg("暂无数据", {time: 1600, anim: 5});
                }
                else
                {
                	for(var i = 0; i < self.objectList.length; i ++)
	                {
	                	if(self.objectList[i].cPic.substr(0,1) == "[")
	                	{
	                		self.objectList[i].pic = JSON.parse(self.objectList[i].cPic)[0];
	                	}
	                	else{
	                		self.objectList[i].pic = self.objectList[i].cPic;
	                	}
	                	
//	                	self.objectList[i].pic = self.objectList[i].goods_cover;
	                }
                }
                self.scope.sumCount = self.sumCount;
                self.scope.objectList = self.objectList;
                self.scope.$apply();
            }
        )
	
	},
	
	
	eventBind : function(){
		
		var self = this;
		
		self.scope.searchData = function(){
			var params = {};
			
			if(isNaN(_utility.dateToUnix($("#sTime").val())) || isNaN(_utility.dateToUnix($("#eTime").val())))
			{
				self.getDataList();
			}
			if(!isNaN(_utility.dateToUnix($("#sTime").val())) && !isNaN(_utility.dateToUnix($("#eTime").val())))
			{
				params.startTime = _utility.dateToUnix($("#sTime").val());
				params.endTime = _utility.dateToUnix($("#eTime").val());
				pageController.searchChange(params);
			}
			
			self.resetTimeModel();
		};
	},
	
	
	resetTimeModel : function(){
		
		$("#sTime").val('');
		$("#eTime").val('');
	}
};
