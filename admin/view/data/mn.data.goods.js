/**
 * Created by Administrator on 2016/12/15.
 */
var GoodsDataCtrl = {
    scope: null,

    dataModel: {
        modelArr: []
    },

    init: function($scope){
        this.scope = $scope;
        this.scope.dataModel = this.dataModel;

        this.initData();

        this.getData();

        this.onEvent();
    },

    initData: function(){
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
    },

    //获取数据
    getData: function(){
        var self = this;

        pageController.pageInit(self.scope, api.API_AUCTION_STATISTICAL, {},
            /**
             * @param data.count
             * @param data.auctionList 录入藏品列表
             */
            function(data){
                self.dataModel.totalData = data.count;

                if(self.scope.page.selectPageNum)
                {
                    var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                    pageController.pageNum(totalPage);
                }

                self.dataModel.modelArr = data.auctionList;
                var len = self.dataModel.modelArr.length;
                
                if(len > 0)
                {
	                for(var i = 0; i < len; i++)
	                {
//	                	self.dataModel.modelArr[i].pic = JSON.parse(self.dataModel.modelArr[i].goods_pics)[0];
	                    self.dataModel.modelArr[i].pic = self.dataModel.modelArr[i].goods_cover;
	                }
                }
                else
                {
                	$dialog.msg("暂无数据");
                }
                
                self.scope.$apply();
            }
        )
    },

    onEvent: function(){
        var self = this;

        self.scope.checkImg = function(){
            $dialog.photos("#upAuction")
        };

        self.scope.search = function(){
            var $sTime = $("#sTime").val(),
                $eTime = $("#eTime").val(),
                params = {};

            if(!_utility.isEmpty($sTime))
            {
                params.startTime = _utility.dateToUnix($sTime)
            }
            if(!_utility.isEmpty($eTime))
            {
                params.endTime = _utility.dateToUnix($eTime)
            }

            pageController.searchChange(params);
        }
    }
};