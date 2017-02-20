/**
 *常量配置文件
 */

/**************服务器基地址*******************/
//const API_BASE_URL = "http://meeno.f3322.net:8082/auction_dev/index.php/";//开发
//const API_BASE_URL = "http://meeno.f3322.net:8082/auction/index.php/";//测试
const API_BASE_URL = "http://localhost/auction/index.php/";//测试
//const API_BASE_URL = "http://auction.yawan365.com/index.php/";//正式
//const BASE_PAGE_URL = "http://auction.yawan365.com/";//正式
//const BASE_PAGE_URL = "http://meeno.f3322.net:8082/auction/web/";//测试
//const BASE_PAGE_URL = "http://www.yawan365.com:8080/";//测试
// const API_BASE_URL = "http://auction.yawan365.com:8080/index.php/";//测试
//const BASE_PAGE_URL = "http://192.168.2.107/web/";
const BASE_PAGE_URL = "http://localhost/auction/web/";
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

    //订单
    API_SET_SHIPPING_ADDRESS : API_BASE_URL + "order/U_order/setShippingAddress", //修改用户地址
    API_PAY_ORDER : API_BASE_URL + "order/U_order/payOrder" //支付
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
	TO_ADDRESS_TYPE : "TO_ADDRESS_TYPE",//地址列表入口：1订单详情修改地址，2账户中心
	configData : "configData",
	acceptName : "acceptName",//收货人
	mobile : "mobile",//联系方式
	address : "address",//详细地址
	addressId : "addressId",//地址id
    addType : "addType"//添加地址入口
};

/***************数据请求配置参数****************/
var errCode  = 
{
	SUCCESS : 0 ,
	TOKEN_WRONG : 102, //102token错误，103token超时
	TOKEN_FAILED : 103, //102token错误，103token超时
    SESSION_FAILED : 5 //会话不存在
};

var pageUrl = 
{
	LOGIN_PAGE : BASE_PAGE_URL + "login.html",//登录
	SELECTED_GOODS : BASE_PAGE_URL + "selectedGoods.html",//精选
	GOODS_DETAIL : BASE_PAGE_URL + "goodsDetail.html",//详情
	AUCTION_HISTORY : BASE_PAGE_URL + "auctionHistory.html",//拍卖历史
	AUCTION_HISTORY_INFO : BASE_PAGE_URL + "auctedGoodsDetail.html",//拍卖历史拍品详情
	PERSON_CENTER : BASE_PAGE_URL + "personCenter.html",//个人中心
	PERSON_INFO : BASE_PAGE_URL + "personCenter/personInfo.html",//个人信息
	MOD_NAME : BASE_PAGE_URL + "personCenter/modName.html",//修改昵称
	MY_ADDRESS_LIST : BASE_PAGE_URL + "personCenter/addressList.html",//我的收货地址
	MOD_ADDRESS : BASE_PAGE_URL + "personCenter/modAddress.html",//修改地址
	ADDRESS_CHOOSE : BASE_PAGE_URL + "personCenter/addressChoose.html",//地址选择界面
	BIND_ACCOUNT : BASE_PAGE_URL + "personCenter/bindAccount.html",//绑定账号
	
	MY_ACCOUNT : BASE_PAGE_URL + "personCenter/myAccount.html",//我的账户
	ACCOUNT_RECHARGE : BASE_PAGE_URL + "personCenter/recharge.html",//充值界面
	TRANSACTION_DETAIL : BASE_PAGE_URL + "personCenter/transactionDetail.html",//账户明细
	
	MY_BIDDING : BASE_PAGE_URL + "personCenter/personalBiddingList.html",//我的竞拍
	
	MY_ORDER_LIST : BASE_PAGE_URL + "personCenter/orderList.html",//我的订单
	
	ORDER_DETAIL : BASE_PAGE_URL + "personCenter/orderDetail.html",//订单详情
	
	MOD_ADDRESS_LIST : BASE_PAGE_URL + "personCenter/addressListMod.html",//地址列表修改地址
	ADD_ADDRESS : BASE_PAGE_URL + "personCenter/addAddress.html",//添加地址
	
	SCAN_RECORDS : BASE_PAGE_URL + "personCenter/scanRecords.html",//浏览记录
	
	SELF_PAID_SERVICES : BASE_PAGE_URL + "personCenter/selfPaidServices.html"//个人付费服务
};
