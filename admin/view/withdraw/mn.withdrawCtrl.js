/**
 * Created by Administrator on 2016/12/12.
 */

var WithdrawCtrl = {
    scope: null,

    withdrawModel: {

    },

    init: function($scope){
        this.scope = $scope;

        this.initData();

        this.onEvent();

    },

    //初始化数据
    initData: function(){
        var self = this;

        //初始化时间设置
        var start = {
            format: 'YYYY-MM-DD',
            minDate: $.nowDate(0),
            maxDate: '2099-06-16 23:59:59',
            isToday: false,
            choosefun: function(elem,datas){
                end.minDate = datas;
            }
        };
        var end = {
            format: 'YYYY-MM-DD',
            minDate: $.nowDate(0),
            maxDate: '2099-06-16 23:59:59',
            isToday: false,
            choosefun: function(elem, datas){
                start.maxDate = datas;
            }
        };

        $("#startTime").jeDate(start);
        $("#endTime").jeDate(end);

        //tab
        self.scope.tabs = [
            {
                title: '待审核列表',
                url: 'reviewList'
            },
            {
                title: '已同意列表',
                url: 'yesList'
            },
            {
                title: '已拒绝列表',
                url: 'noList'
            }
        ];

        //默认项
        self.scope.currentTab = 'reviewList';

        self.scope.onClickTab = function(tab){
            self.scope.currentTab = tab.url;
        };

        self.scope.isActiveTab = function(tabUrl){
            return tabUrl == self.scope.currentTab;
        };
    },

    //绑定事件
    onEvent: function(){
        var self = this;

        //导出excel
        self.scope.exportData = function () {
            var bb = new Blob([document.getElementById('table1').innerHTML], {type: 'text/plain;charset=utf-8'});
            saveAs(bb, '提现列表.xls')
        }
    }
};