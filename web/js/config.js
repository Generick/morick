/**
 *常量配置文件
 */

/**************服务器基地址*******************/
//const API_BASE_URL = "http://meeno.f3322.net:8082/auction_dev/index.php/";//开发


//const API_BASE_URL = "http://meeno.f3322.net:8082/auction/index.php/";//测试


//const API_BASE_URL = "http://192.168.2.128/auction/index.php/";//测试
//const API_BASE_URL = "http://192.168.0.110:8088/auction/index.php/";

//var API_BASE_URL =  "http://192.168.0.110:8088/auction/index.php/";
var API_BASE_URL =  "http://192.168.0.88:8082/auction/index.php/";
//const API_BASE_URL = "http://auction.yawan365.com/index.php/";//正式
//const BASE_PAGE_URL = "http://auction.yawan365.com/";//正式
//const BASE_PAGE_URL = "http://meeno.f3322.net:8082/auction/web/";//测试
//const BASE_PAGE_URL = "http://www.yawan365.com:8080/";//测试
// const API_BASE_URL = "http://auction.yawan365.com:8080/index.php/";//测试
//const BASE_PAGE_URL = "http://192.168.0.168:8020/web/";

const BASE_PAGE_URL = "http://192.168.0.163/auction/";
//const BASE_PAGE_URL = "http://127.0.0.1:8020/paimai-web/";

/***************API 配置接口****************/

var apiUrl = 
{
	API_USER_LOGIN : API_BASE_URL + "account/login",//登录
	API_USER_RELOGIN : API_BASE_URL + "account/reLogin",//重登录
	API_GET_MOBILE_CODE : API_BASE_URL + "account/getMobileCode",//获取短信验证码
	API_GET_AUCTION_ITEMS : API_BASE_URL + "auction/Auction/getAuctionItems",//获取拍品展品列表
	API_GET_AUCTION_INFO : API_BASE_URL + "auction/Auction/getAuctionAllInfo",//进入拍品详情
	API_GET_BIDDING_LIST : API_BASE_URL + "auction/Auction/getBiddingList",//获取竞拍记录
	API_BIDDING_AUCTION_ITEM : API_BASE_URL + "auction/U_auction/biddingAuctionItem",//竞拍展品
	
	API_GET_SELFINFO : API_BASE_URL + "u_user/getSelfInfo",//获取用户数据
	API_GET_PERSONALDATA : API_BASE_URL + "u_user/getPersonalData",//获取个人信息
	API_UPLOAD_IMG : API_BASE_URL + "upload/uploadImages",//上传照片
	API_MOD_SELF_INFO : API_BASE_URL + "u_user/modInfo",//修改个人数据
	API_BIND_ACCOUNT : API_BASE_URL + "u_user/bindAccount",//绑定账号
	API_GET_BINDINFO : API_BASE_URL + "u_user/getBindInfo",//获取绑定信息
	
	API_GET_AREAS : API_BASE_URL + "area/Area/getAreas",//获取三级联动区域列表
	API_AREA_INFO : API_BASE_URL + "area/Area/getAreaInfo",//根据id获取区域信息
	
	API_GET_SHIPPING_ADDRESS : API_BASE_URL + "shippingAddress/ShippingAddress/getShippingAddress",//获取个人收货地址
	API_GET_SHIPPING_ADDRESSINFO : API_BASE_URL + "shippingAddress/U_ShippingAddress/getShippingAddress",//获取收货地址详情
	API_MOD_SHIPPING_ADDRESS : API_BASE_URL + "shippingAddress/U_ShippingAddress/modShippingAddress",//修改收货地址
	API_ADD_SHIPPING_ADDRESS : API_BASE_URL + "shippingAddress/U_ShippingAddress/addShippingAddress",//新增收货地址
	API_DEL_SHIPPING_ADDRESS : API_BASE_URL + "shippingAddress/U_ShippingAddress/delShippingAddress",//删除收货地址
	
	API_GET_TRANSACTION_LIST : API_BASE_URL + "transaction/U_transaction/getTransactionList",//获取交易明细
	API_GET_PERSONAL_BIDDING_LIST : API_BASE_URL + "auction/Auction/getPersonalBiddingList",//获取个人竞拍记录
	
	API_GET_ORDER_LIST : API_BASE_URL + "order/U_order/getOrderList",//获取订单列表
	API_GET_ORDER_INFO : API_BASE_URL + "order/U_order/getOrderInfo",//获取订单详情
	API_GET_ORDER_LOGISTICS_INFO : API_BASE_URL + "order/U_order/getLogisticsInfo",//获取订单物流信息
	API_ORDER_CONFIRM_RECEIPT : API_BASE_URL + "order/U_order/confirmReceipt",//确认收货
	
	API_READLOG : API_BASE_URL + "readLog/ReadLog/readWithType",//阅读指定对象
	API_READLOG_LIST : API_BASE_URL + "readLog/U_readLog/getReadObjList",//获取个人指定阅读对象列表
	API_SELF_PAID_SERVICES : API_BASE_URL + "paidServices/U_paidServices/getSelfPaidServices",//获取个人包月服务
	API_OPEN_SELF_PAID : API_BASE_URL + "paidServices/U_paidServices/paidServices",//开通包月服务
	
	API_SET_PROXYBID : API_BASE_URL + "proxyBid/U_proxyBid/setProxyBid",//设置委托出价
	API_GET_PROXYBID : API_BASE_URL + "proxyBid/U_proxyBid/getProxyBid",//获取委托出价
	API_GET_IFFREEZE : API_BASE_URL + "freeze/U_freeze/isFreeze", //获取是否已经扣除过保证金
    
    API_BUY_SPECIAL_THING : API_BASE_URL + "order/U_order/payTMH",//购买特卖会商品
    
    //提现
    API_WITHDRAWCRASH : API_BASE_URL + "withdrawCash/U_withdrawCash/withdrawCash",
    
    //我的消息
    API_GET_MY_MESSAGELIST : API_BASE_URL + "messagePush/U_messagePush/getUserMsgList",
   
    //订单
    API_SET_SHIPPING_ADDRESS : API_BASE_URL + "order/U_order/setShippingAddress", //修改用户地址
    API_PAY_ORDER : API_BASE_URL + "order/U_order/payOrder", //支付
    
    API_JUDGE_ISLOGIN : API_BASE_URL + "account/hasLogin",//判断用户是否登录了
    
    //充值
    API_RECHARGE : API_BASE_URL + "recharge/U_recharge/recharge",//充值
    
    //获取竞猜
    API_HAS_READ_MESSAGE :  API_BASE_URL +  "messagePush/U_messagePush/viewMsg",//提醒用户已阅读
    API_GET_GUESSLIST : API_BASE_URL + "prizesQuiz/prizesQuiz/getPrizesList",//列表
    API_GET_GUESSDETAIL : API_BASE_URL + "prizesQuiz/prizesQuiz/getQuizInfo",//详情页
    API_GET_GUESSUSERLIST : API_BASE_URL + "prizesQuiz/prizesQuiz/getQuizUserList",//获取竞猜用户
    API_JOIN_GUESS : API_BASE_URL + "prizesQuiz/U_prizesQuiz/partakeQuiz",//参加竞猜
    API_MY_GUESS_LIST : API_BASE_URL + "prizesQuiz/U_prizesQuiz/getUserQuiz",
    API_GETAWARD_USERS : API_BASE_URL + "prizesQuiz/prizesQuiz/getAwardUserList",//获取中奖的用户
    API_GET_INFORMATION_LIST : API_BASE_URL + "information/Information/getInformationList",//获取资讯列表
    API_GET_INFORMATION_INFO  : API_BASE_URL + "information/Information/getInformationInfo",//获取资讯详情
    
    API_GET_SPECIAL_SALE_LIST : API_BASE_URL + "saleMeeting/SaleMeeting/getTMHList",//获取特卖会列表
    
    API_GET_SPECIAL_SALE_DETAIL :API_BASE_URL + "saleMeeting/SaleMeeting/getTMHCommodityInfo",//获取特卖会商品详情
    
    API_GET_UN_READ_MESSAGE : API_BASE_URL + "messagePush/U_messagePush/getUnReadMsg",//获取未处理消息
    
    API_GET_HAS_READ_MESSAGE : API_BASE_URL + "messagePush/U_messagePush/getHasReadMsg"//获取已读消息 
};

var localStorageKey =
{
	SESSIONID : "sessionId",
	TOKEN : "token",
	DEFAULT : 'DEFAULT',
	ISLOGIN : "ISLOGIN",
	userId : "userId",
	IS_ADDRESS : "IS_ADDRESS", //是否由订单详情跳过来
	orderNo : "orderNo",
	FROM_LOCATION : "FROM_LOCATION",//0:表示从主页进，1:表示从我的竞拍进入，2:表示从浏览记录进入
	TOTALADDRESS : "TOTALADDRESS",//选择地址后的全地址
	TO_ADDRESS_TYPE : "TO_ADDRESS_TYPE",//地址列表入口：1订单详情修改地址，2账户中心3,商品详情
	configData : "configData",
	acceptName : "acceptName",//收货人
	mobile : "mobile",//联系方式
	address : "address",//详细地址
	addressId : "addressId",//地址id
    addType : "addType",//添加地址入口
    vipOrNot: "vipOrNot"
};

/***************数据请求配置参数****************/
var errCode  = 
{
	SUCCESS : 0 ,
	CODEERR : 406,
	TOKEN_WRONG : 102, //102token错误，103token超时
	TOKEN_FAILED : 103, //102token错误，103token超时
    SESSION_FAILED : 5, //会话不存在
    VIP_LIMIT : 1108 ,//VIP专享 
  
};

var pageUrl = 
{
	LOGIN_PAGE : BASE_PAGE_URL + "login.html",//登录
	GUESS_PAGE : BASE_PAGE_URL + "guessList.php",//竞猜列表
	
	GUESS_DETAIL : BASE_PAGE_URL + "guessDetails.php",//竞猜页
	
	GUESS_INNER : BASE_PAGE_URL + "guessInner.html",//竞猜详情
	SELECTED_GOODS : BASE_PAGE_URL + "beAtAuction.php",//精选
	MY_GUESS_LIST : BASE_PAGE_URL + "myselfGuessList.html",//我的竞猜列表
	GOODS_DETAIL : BASE_PAGE_URL + "goodsDetail.php",//详情
	AUCTION_HISTORY : BASE_PAGE_URL + "auctionHistory.php",//拍卖历史
	AUCTION_HISTORY_INFO : BASE_PAGE_URL + "auctedGoodsDetail.php",//拍卖历史拍品详情
//	PERSON_CENTER : BASE_PAGE_URL + "personCenter.html",//个人中心
    PERSON_CENTER : BASE_PAGE_URL + "newPersoner.html",//个人中心
    TO_PAY_SPECILA_PAGE : BASE_PAGE_URL + "personCenter/specialPage.html",//跳到商品支付页面
	PERSON_INFO : BASE_PAGE_URL + "personCenter/personInfo.html",//个人信息
	MOD_NAME : BASE_PAGE_URL + "personCenter/modName.html",//修改昵称
	MY_ADDRESS_LIST : BASE_PAGE_URL + "personCenter/addressList.html",//我的收货地址
	MOD_ADDRESS : BASE_PAGE_URL + "personCenter/modAddress.html",//修改地址
	ADDRESS_CHOOSE : BASE_PAGE_URL + "personCenter/addressChoose.html",//地址选择界面
	BIND_ACCOUNT : BASE_PAGE_URL + "personCenter/bindAccount.html",//绑定账号
	MY_CUSTOMER : BASE_PAGE_URL + "myCustom.html",//我的客服
	MY_DRAWCASH : BASE_PAGE_URL + "personCenter/widthDrawCash.html",//我的提现
	
	MY_MESSAGE_SET_PAGE : BASE_PAGE_URL + "personCenter/messageSetPage.html",//短信设置
	
	MY_ACCOUNT : BASE_PAGE_URL + "personCenter/myAccount.html",//我的账户
	ACCOUNT_RECHARGE : BASE_PAGE_URL + "personCenter/recharge.html",//充值界面
	TRANSACTION_DETAIL : BASE_PAGE_URL + "personCenter/transactionDetail.html",//账户明细
	
	MY_MESSAGE : BASE_PAGE_URL + "myMessages.html",//我的消息
	
	MY_PAY_ORDER_PAGE : BASE_PAGE_URL + "personCenter/goToPayPage.html",//支付客服中心支付订单
	
	MY_MESSAGE_LIST : BASE_PAGE_URL + "",//消息列表
	
	MY_BIDDING : BASE_PAGE_URL + "personCenter/personalBiddingList.html",//我的竞拍
	
	MY_ORDER_LIST : BASE_PAGE_URL + "personCenter/orderList.html",//我的订单
	
	ORDER_DETAIL : BASE_PAGE_URL + "personCenter/orderDetail.html",//订单详情
	
	MOD_ADDRESS_LIST : BASE_PAGE_URL + "personCenter/addressListMod.html",//地址列表修改地址
	ADD_ADDRESS : BASE_PAGE_URL + "personCenter/addAddress.html",//添加地址
	
	SCAN_RECORDS : BASE_PAGE_URL + "personCenter/scanRecords.html",//浏览记录
	
	SELF_PAID_SERVICES : BASE_PAGE_URL + "personCenter/selfPaidServices.html",//个人付费服务
	
	TO_WX_LOGIN : BASE_PAGE_URL + "wxlogin/Wx.Login.php",//跳到微信授权页面
	
	WX_PAY : BASE_PAGE_URL + "wxpay/src/jsapi.php",//
	
	NEW_NEW_DETAIL : BASE_PAGE_URL + "new-news-detail.html",
	
	PRE_PAY_PAGE : BASE_PAGE_URL + "prePayPage.html"//支付选择页面
};
