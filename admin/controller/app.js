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

app.controller('OfferPriceCtrl',function($scope){
	OfferPriceCtrl.init($scope);
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

app.controller('QuizCtrl', function($scope){ //竞猜
	QuizController.init($scope);
})

app.controller('PushCtrl', function($scope){ //推送
	PushController.init($scope);
})

app.controller('userInfoController', function($scope){ //个人信息
	userInfoController.init($scope);

})

app.controller('objectGoodsController', function($scope){ //个人信息
	objectGoodsController.init($scope);

})

app.controller('auctionGoodsController', function($scope){ //个人信息
	auctionGoodsController.init($scope);

})

app.controller('elegantController', function($scope){ //个人信息
	elegantController.init($scope);

})


app.controller('specialSellingController', function($scope){ //个人信息
	specialSellingController.init($scope);

})



app.controller('commodityListController', function($scope){ //商品
	
	commodityListController.init($scope);

})

app.controller('commodityAskListController', function($scope){ //商品
	
	commodityAskListController.init($scope);

})


app.controller('commidifyDeleteController', function($scope){ //商品
	
	commidifyDeleteController.init($scope);

})


app.controller('commidifySaleController', function($scope){ //商品
	
	commidifySaleController.init($scope);

})

app.controller('tenantCtrl', function($scope){ //商品
	
	tenantCtrl.init($scope);

})

app.controller('spreadPersonsCtr', function($scope){ //商品
	
	spreadPersonsCtr.init($scope);

})