/*
 * 我的浏览记录
 */

app.controller("ctrl", function ($scope) {
    ScanRecordsCtrl.init($scope);
});

var ScanRecordsCtrl = {
    scope: null,
    
    scanRecordsModel: {
    	readObjList: []
    },
    
    init: function ($scope) {
    	this.scope = $scope; 
    	
    	this.bindClick();
    	
    	this.initData();

        this.ngRepeatFinish();
    },
    
    initData: function() {
    	var self = this;
    	
    	var params = 
    	{
    		startIndex : 0,
    		num : 0,
    		readType : 1
    	};
    	
    	$('.animation').show();
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_READLOG_LIST, params,
            /**
             * 浏览记录
             * @param data
             * @param data.readObjList 浏览记录
             * @param data.readObjList.goodsInfo 藏品信息
             * @param data.readObjList.currentUserInfo 竞拍人信息
             */
            function(data) {
            	
//          	console.log(JSON.stringify(data))
                self.scanRecordsModel.readObjList = [];
                self.scanRecordsModel.readObjList = data.readObjList;
                if (self.scanRecordsModel.readObjList.length > 0)
                {
                    $(".no-data").hide();
                    var goods = self.scanRecordsModel.readObjList;

                    for (var i = 0; i < goods.length; i++)
                    {
                        if(goods[i])
                        {
                            goods[i].goodsInfo.goods_pics = JSON.parse(goods[i].goodsInfo.goods_pics);

                            goods[i].isEnd = commonFu.compareTime(goods[i].endTime); //是否已截拍

                            goods[i].isShowPrice = !commonFu.isEmpty(goods[i].currentUserInfo); //是否已经有人出价

                            if(goods[i].isShowPrice)
                            {
                                goods[i].showPrice =  goods[i].currentPrice; //截拍并有人出价显示当前价
                            }
                            else
                            {
                                goods[i].showPrice = goods[i].initialPrice; //进行中显示起拍价
                            }

//                          if(goods[i].isEnd)
//                          {
//                              goods[i].aucted = "../img/aucted0.png";
//                          }
//                          else
//                          {
//                              goods[i].aucted = "../img/aucting.png";
//                          }
                        }
                    }
                }
                else
                {
                    $(".no-data").show();
                }

                self.scope.readObjList = self.scanRecordsModel.readObjList;
                $('.animation').hide();
                $('.container').css('opacity','1');

                self.scope.$apply();
            }
        )
    },
    
    bindClick: function() {
    	var self = this;
    	
    	self.scope.onClickToScanRecordDetail = function(item)
    	{   
    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SELFINFO, {}, function(data) {
			    localStorage.setItem(localStorageKey.vipOrNot,data.userInfo.isVIP)
			    var isMySelfVip = data.userInfo.isVIP;
				if((data.userInfo.isVIP == 0) && (item.isVIP == 1))
    			{
    				$dialog.msg("该拍品为VIP专享，您还不是VIP，请开通！")
    				return;
    			}
    			else
    			{
    				localStorage.setItem(localStorageKey.FROM_LOCATION, 2);
		    		location.href = pageUrl.GOODS_DETAIL + "?id=" + item.id;
    			}
    				
		    
    		})
    	}
    		
    		
    },
    
    ngRepeatFinish: function() {
    	//ng-repeat完成后执行的操作
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){});
    }
};
