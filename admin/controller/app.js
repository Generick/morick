/**
 * angular controller
 */

var app = angular.module('app', [
    'ui.router'
]);

app.controller('ContentCtrl',function($scope){ //首页
    ContentCtrl.init($scope);
});

app.controller('GoodsCtrl', function($scope){ //藏品
    GoodsController.init($scope);
});

app.controller('AuctionCtrl', function($scope){ //拍卖
    AuctionCtrl.init($scope);
});

app.controller('BiddingCtrl', function($scope){ //竞拍记录
    BiddingCtrl.init($scope);
});

app.controller('AdminCtrl', function($scope){ //管理员
    AdminCtrl.init($scope);
});

app.controller('UserCtrl', function($scope){ //用户
    UserCtrl.init($scope);
});

app.controller('WithdrawCtrl', function($scope){ //提现
    WithdrawCtrl.init($scope);
});

app.controller('OrderCtrl', function($scope){ //订单
    OrderCtrl.init($scope);
});

app.controller('SaleDataCtrl', function($scope){
    SaleDataCtrl.init($scope);
});

app.controller('RechargeDataCtrl', function($scope){
    RechargeDataCtrl.init($scope);
});

app.controller('GoodsDataCtrl', function($scope){
    GoodsDataCtrl.init($scope);
});

app.controller('BalanceDataCtrl', function($scope){
	BalanceDataCtrl.init($scope);
})
