/**
 * Created by Administrator on 2016/12/15.
 */
var commidifySaleController = {
    scope: null,
    
    dataModel: {
        modelArr: [], //存放列表数据
        totalData: 0, //统计总数
        totalIncome: null, //统计总收益
        startTime: null, //开始时间
        endTime: null //结束时间
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

        pageController.pageInit(self.scope, api.API_GET_COMMODIFY_SALE_LIST, {},
            /**
             * @param data.count
             * @param data.orderList 销售列表
             * @param data.totalTurnover 统计总数
             */
            function(data){
            	
                if(self.scope.page.selectPageNum)
                {
                    var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                    pageController.pageNum(totalPage);
                }
                self.dataModel.totalData = data.total;
                
                self.dataModel.modelArr = data.saleList;
                var len = self.dataModel.modelArr.length;
                
                if(len == 0)
                {
                	$dialog.msg("没有找到你要的内容哦");
                }
                
                
                self.scope.$apply();
            }
        )
    },
    
   
    onEvent: function(){
        var self = this;

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