/**
 * Created by Administrator on 2016/12/28.
 */
var BalanceDataCtrl = {
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
        var self = this,
            params = {
                userId: 0, //ID为0表示查询全部
                isAdmin: 0
            };

        pageController.pageInit(self.scope, api.API_GET_BALANCE_LIST, params,
            /**
             * @param data.count
             * @param data.transactionList 余额修改列表
             */
            function(data){
                self.dataModel.totalData = data.count;

                if(self.scope.page.selectPageNum)
                {
                    var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                    pageController.pageNum(totalPage);
                }

                self.dataModel.modelArr = data.transactionList;
                var len = self.dataModel.modelArr.length;
                if(len > 0)
                {
	                for(var i = 0; i < len; i++)
	                {
	                	var curObj = self.dataModel.modelArr[i];
	                	//是否添加余额
	                	curObj.isAdd = (curObj.transactionType == 0 || curObj.transactionType == 1 || curObj.transactionType == 6);
	                }
                }
                else
                {
                	$dialog.msg("暂无数据")
                }
                for(var j = 0;j < self.dataModel.modelArr.length; j++)
                {
                	self.dataModel.modelArr[j].money = _utility.toDecimalTwo(parseFloat(self.dataModel.modelArr[j].money));
                	self.dataModel.modelArr[j].afterBalance = _utility.toDecimalTwo(parseFloat(self.dataModel.modelArr[j].afterBalance));
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