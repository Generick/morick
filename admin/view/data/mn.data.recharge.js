/**
 * Created by Administrator on 2016/12/15.
 */
var RechargeDataCtrl = {
    scope: null,

    dataModel: {
        modelArr: []
    },

    init: function($scope){
        this.scope = $scope;
        this.scope.dataModel = this.dataModel;

        this.initData();

        this.onEvent();

        this.getData();
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

        pageController.pageInit(self.scope, api.API_RECHARGE_STATISTICAL, {},
            /**
             * @param data.count
             * @param data.rechargeList 充值列表
             * @param data.totalRecharge 统计总数
             */
            function(data){
                self.dataModel.totalData = data.totalRecharge;
                self.dataModel.totalData =  _utility.toDecimalTwo(self.dataModel.totalData);
                if(self.scope.page.selectPageNum)
                {
                    var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                    pageController.pageNum(totalPage);
                }

                self.dataModel.modelArr = data.rechargeList;
                if(self.dataModel.modelArr.length == 0)
                {
                	$dialog.msg("暂无数据");
                }
                 
                for(var i = 0;i < self.dataModel.modelArr.length; i++)
                {
                
                	self.dataModel.modelArr[i].price = _utility.toDecimalTwo(parseFloat(self.dataModel.modelArr[i].price));
                }
                self.scope.$apply();
            }
        )
    },
  
    
    onEvent: function(){
        var self = this;
        
         //查看大图
        self.scope.showBigPic = function(){
        	
           $dialog.photos('#rec-tbody');
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