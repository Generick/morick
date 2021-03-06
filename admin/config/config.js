/**
 * config.js
 */

//基础接口url

//var BASE_URL = "http://192.168.0.88:8082/auction/index.php/"; //内网Url

var  BASE_URL =  "";
var  BASE_JUMP_URL = "";

if(location.href.indexOf("yawan365") == -1)
{
	    			    	

	BASE_JUMP_URL =  "../admin/index.html#/";
    BASE_URL =  "http://192.168.0.121:8088/auction/index.php/";//苗佳亮接口

}
else{
	
	    if(location.href.indexOf("8080") == -1)
		{
			BASE_URL = "http://auction.yawan365.com/";//正式接口路径
			BASE_JUMP_URL = "http://auction.yawan365.com/admin/index.html#/";//正式跳转路径
		}
		else
		{
		    BASE_URL = "http://auction.yawan365.com:8080/";//正式接口路径
			BASE_JUMP_URL = "http://auction.yawan365.com:8080/admin/index.html#/";//正式跳转路径
		}
}




//api
var api = {
	API_ADMIN_LOGIN : BASE_URL + "account/login", //登录
	API_ADMIN_RE_LOGIN : BASE_URL + "account/reLogin", //重登录
	API_GET_USER_STATISTICS : BASE_URL + "a_admin/getUserStatistics", //用户数目统计
    API_MOD_ADMIN_PWD : BASE_URL + "a_admin/modAdminPassword", //修改管理员密码

    //清除缓存
    API_CLEAR_CACHE : BASE_URL + "common/clearRedis", //清除缓存
    
    
    
    //藏品列表
    API_GET_GOODS_LIST : BASE_URL + "goods/Goods/getGoods", //获取藏品列表
    API_ADD_GOODS : BASE_URL + "goods/A_goods/createGoods", //新增藏品
    API_MOD_GOODS : BASE_URL + "goods/A_goods/modGoods", //修改藏品
    API_GET_SINGLE_GOODS : BASE_URL + "goods/Goods/getOneGoods", //获取单个藏品
    API_DEL_GOODS : BASE_URL + "goods/A_goods/delGoods", //删除藏品
    API_OUT_GOODS : BASE_URL + "goods/A_goods/outLibrary",//商品出库
    API_GET_DELETE_AUCTIONS_OBJECTS : BASE_URL + "auction/A_auction/AGDelRecord",//获取藏品和拍品删除记录
    //拍卖
    API_GET_AUCTION_LIST : BASE_URL + "auction/A_auction/getAuctionItems", //竞拍展品列表
    API_GET_BIDDING_LIST : BASE_URL + "auction/Auction/getBiddingList", //竞拍记录
    API_GET_AUCTION_INFO : BASE_URL + "auction/Auction/getAuctionAllInfo", //根据ID展品信息
    API_RELEASE_AUCTION_ITEM : BASE_URL + "auction/A_auction/releaseAuctionItem", //发布展品
    API_MOD_AUCTION_ITEM : BASE_URL + "auction/A_auction/modActionItem", //修改展品
    API_DEL_AUCTION_ITEM : BASE_URL + "auction/A_auction/delAuctionItems", //删除展品
    API_GET_AUCTION_GOODS : BASE_URL + "auction/A_auction/getAuctionGoods", //获取藏品列表
    API_SET_AUCTION_OFF : BASE_URL + "auction/A_auction/setAuctionItemOff", //下架展品
    API_SET_AUCTION_NOTE : BASE_URL +"auction/A_auction/setBidNote",//竞拍记录设置备注
    //出价管理
    API_SEND_MESSAGE : BASE_URL + "bids/A_bids/smsSend",//发送短信
    API_GET_BIDLIST : BASE_URL +"bids/A_bids/getBidList",//获取数据
    
    //获取基础数据
    API_GET_STATISTICS : BASE_URL + "a_admin/getStatistics",//获取藏品数和总金额
    //管理员
    API_GET_ADMIN_LIST : BASE_URL + "a_admin/getAdminList", //管理员列表
    API_DEL_ADMIN : BASE_URL + "a_admin/deleteAdmin", //删除管理员
    API_MOD_ADMIN : BASE_URL + "a_admin/modAdmin", //修改管理员
    API_ADD_ADMIN : BASE_URL + "a_admin/addAdminAccount", //添加管理员
    
    API_GET_SELF_INFO : BASE_URL + "a_admin/getSelfInfo",//获取自己的信息
    
    //用户管理
    API_GET_USER_LIST : BASE_URL + "a_admin/searchUserList", //用户列表
    API_MOD_USER_INFO : BASE_URL + "a_admin/modUserInfo", //修改个人信息
    API_GET_SINGLE_BIDDING_LIST : BASE_URL + "auction/Auction/getPersonalBiddingList", //获取个人竞拍记录
    API_GET_SINGLE_ADDRESS : BASE_URL + "shippingAddress/ShippingAddress/getShippingAddress", //获取个人收货地址
    API_GET_SINGLE_ORDER : BASE_URL + "order/A_order/getPersonalOrderList", //获取个人交易记录
    API_GET_SINGLE_SERVICES : BASE_URL + "paidServices/A_paidServices/getPersonalPaidServices", //获取个人购买服务
    API_ADMIN_OP_BALANCE : BASE_URL + "a_admin/opBalance", //管理员修改余额
    API_ADMIN_SET_VIP : BASE_URL +  "a_admin/setVIP",//设置用户为VIP用户
    //订单管理
    API_GET_ORDER_LIST : BASE_URL + "order/A_order/getOrderList", //订单列表
    API_DELIVER_ORDER : BASE_URL + "order/A_order/deliverOrder", //发货
    API_CANCLE_OR_SURE_ORDER : BASE_URL + "order/A_order/operateOrder",//设置完成或者取消订单
    
    //统计
    API_GET_LOGISTICS_INFO : BASE_URL + "order/A_order/getLogisticsInfo", //物流信息
    API_SALE_STATISTICAL : BASE_URL + "order/A_order/orderStatistical", //销售
    API_RECHARGE_STATISTICAL : BASE_URL + "recharge/A_recharge/rechargeStatistical", //充值
    API_AUCTION_STATISTICAL : BASE_URL + "auction/A_auction/auctionStatistical", //商品录入
    API_GET_BALANCE_LIST : BASE_URL + "transaction/A_transaction/getTransactionList", //余额修改记录
	
	//有奖竞猜
	API_GET_QUIZ_LIST : BASE_URL + "prizesQuiz/A_prizesQuiz/getQuizList", //获取竞猜列表
	API_VIEW_QUIZ : BASE_URL + "prizesQuiz/A_prizesQuiz/viewQuiz", //查看竞猜详情
	API_SEARCH_QUIZ_LIST : BASE_URL + "prizesQuiz/A_prizesQuiz/searchQuizList", //搜索竞猜列表
	API_QUIT_QUIZ : BASE_URL + "prizesQuiz/A_prizesQuiz/quitQuiz", //结束竞猜
	API_UPDATE_LIMIT_NUM : BASE_URL + "prizesQuiz/A_prizesQuiz/updateLimitNum", //设置竞猜人数限制
	
	//提现管理
	API_GET_WITHDRAW_LIST : BASE_URL + "withdrawCash/A_withdrawCash/getWithDrawList", //获取提现列表
	API_ACCEPT_WITHDRAW : BASE_URL + "withdrawCash/A_withdrawCash/acceptWithDraw", //同意提现
	API_REFUSE_WITHDRAW : BASE_URL + "withdrawCash/A_withdrawCash/refuseWithDraw", //拒绝提现
	
	//推送
	API_PUSH_MESSAGE : BASE_URL + "messagePush/A_messagePush/pushMessage", //后台推送消息pushType推送类型0非vip 1:vip 2:全部 3:个人
	
	
	API_GET_INFORMATION_LIST : BASE_URL + "information/A_information/getInformationList",//获取资讯列表
	
	API_ADD_INFORMATION_LIST : BASE_URL + "information/A_information/createInformation",//新增资讯
	
	API_SET_INFORMATION_LIST : BASE_URL + "information/A_information/releaseInformation",//发布资讯
	
	API_DELETE_INFORMATION : BASE_URL + "information/A_information/delInformation",//删除资讯
	
	API_MOD_INFORMATION_LIST : BASE_URL + "information/A_information/modInformation",//修改资讯
	
	API_GET_INFORMATION_DETAIL : BASE_URL + "information/A_information/getInformationInfo",//获取资讯详情
	
	API_ADMIN_GET_USERINFO : BASE_URL + "a_admin/getUserInfo",//获取用户信息
    //上传文件
    API_UP_FILE : BASE_URL + "upload/uploadImages",
    
    
    
    API_GET_COMMIDIFY_LIST : BASE_URL + "saleMeeting/A_saleMeeting/getCommodities",//获取商品列表
    
    API_ADD_SALE_COMMIDIFY : BASE_URL + "saleMeeting/A_saleMeeting/addCommodity",//添加商品
    
    API_MOD_SALE_COMMIDIFY : BASE_URL + "saleMeeting/A_saleMeeting/modCommodity",//修改商品
    
    API_UP_COMMIDIFY : BASE_URL + "saleMeeting/A_saleMeeting/upCommodity",//上架商品
    
    API_GET_HAS_UP_COMMIDIFY : BASE_URL + "saleMeeting/A_saleMeeting/getUpCommodities",//获取添加到特卖会中的商品
    
    API_DEL_SALE_COMMIDIFY : BASE_URL + "saleMeeting/A_saleMeeting/delCommodity",//删除商品
    
    API_UO_SALE_TO_SPECIAL : BASE_URL + "saleMeeting/A_saleMeeting/upCommodityToTMH",//添加商品到特卖会中
    
    API_DEL_SPECIAL_COMMIDIFY :BASE_URL + "saleMeeting/A_saleMeeting/delTMH",//从特卖会中删除商品
    
    API_GET_SALE_COMMIDIFY_DETAIL : BASE_URL + "saleMeeting/A_saleMeeting/getCommodityInfo",//获取商品详情
    
    API_GET_SPECIAL_SALE_LIST : BASE_URL + "saleMeeting/SaleMeeting/getTMHList",//获取特卖会列表   （前端管理后台通用）
    
    API_GET_SPACIAL_SALE_DETAIL : BASE_URL + "saleMeeting/SaleMeeting/getTMHCommodityInfo",//获取特卖会商品信息    （前端管理后台通用）
    
    API_GET_DELETE_COMMIDIFYLIST : BASE_URL + "saleMeeting/A_saleMeeting/commodityDelRec",//获取商品删除记录
    
    API_GET_COMMODIFY_SALE_LIST : BASE_URL + "saleMeeting/A_saleMeeting/saleRecord",//获取商品销售记录
    
    API_GET_TENANTlIST : BASE_URL + "merchant/A_merchant/getMCHList",//获取商户列表
    
    API_ADD_TENANT: BASE_URL + "merchant/A_merchant/addMCH",//添加商户号
    
    API_MOD_TENANT_PASSWORD : BASE_URL + "merchant/A_merchant/modMCHPWD",//修改商户密码
    
    API_DELETE_TENANT: BASE_URL + "merchant/A_merchant/delMCH",//删除商户账号
    
    API_GET_TENANT_ASK_LIST : BASE_URL + "merchant/A_merchant/getRequestList",//获取商户请求列表
    
    API_TO_AGREE_OR_SEFUSE_ASK : BASE_URL + "merchant/A_merchant/adminHandleRequest",//拒绝或同意商户请求
    
    API_DELETE_TENANT_ASK : BASE_URL + "merchant/A_merchant/adminDelRequest",//管理员删除用户请求
    
    API_GET_COMMDITY_DETAIL : BASE_URL + "merchant/A_merchant/getMCHCommodityInfo",//管理员查看商品申请列表的信息
    
    API_MOD_AND_UP_GOOD : BASE_URL + "merchant/A_merchant/adminSaveCInfoInRequest",//修改并上架商品



    API_ADD_SPREAD : BASE_URL + "promoter/A_promoter/addPromoter",//添加推广员
    
    API_GET_SPREAD_LIST : BASE_URL + "promoter/A_promoter/getPromoters",//获取推广员列表
      
    API_GET_SPREAD_DETAIL : BASE_URL + "promoter/A_promoter/getPromoterInfo",//获取推广员详情
    
    API_DELETE_SPREAD : BASE_URL + "promoter/A_promoter/delPromoter",//删除推广员
    
    API_MOD_SPERAD_PWD :BASE_URL + "promoter/A_promoter/modPMTPassword",//修改推广员密码
    
    API_SETTLE_ACCOUNTS :BASE_URL + "promoter/A_promoter/adminCheckBill",//结账
    
    API_MOD_SPERAD_ADRESS : BASE_URL + "promoter/A_promoter/modPromoter",//生成二维码之后修改推广员的二维码地址
    
    API_GET_SPREAD_CONDTIONS : BASE_URL + "promoter/A_promoter/getPromoterConditions",//获取推广员的分成条件
    
    API_ADD_SPREAD_CONDITIONS : BASE_URL + "promoter/A_promoter/adminAddCondition",//设置推广员条件
    
    API_DELETE_SPREAD_CONDITIONS : BASE_URL + "promoter/A_promoter/adminDelCondition",//删除推广员的分成条件
    
    API_FRIEND_ORDERS : BASE_URL + "promoter/A_promoter/getFriendsOrders",//好友下单记录
    
    API_FREIND_LIST : BASE_URL + "promoter/A_promoter/getFriends",//好友列表
    
    API_COMDITIONS_LIST : BASE_URL + "promoter/A_promoter/getCheckBillRecords",//结账记录
    
    API_MOVE_COMMIDITY : BASE_URL + 'saleMeeting/A_saleMeeting/moveCommodityOrder', //移动商品
    
    
    
    API_GET_CUSTOMSERVICE_LIST : BASE_URL + "customerService/A_customService/getServices",//获取客服账号列表
    
    API_ADD_CUSTOMSERVICE : BASE_URL + "customerService/A_customService/addService",//添加客服
    
    API_MOD_CUSTOMSERVICE : BASE_URL + "customerService/A_customService/modServicePassword",//修改客服密码
    
    API_DEL_CUSTOMSERVICE : BASE_URL + "customerService/A_customService/delService",//删除客服账号
    
    API_GET_CUSTOMSERVICE_HAS_DONE : BASE_URL + "customerService/A_customService/getOPREC",//获取客服操作记录
    
    
    
    
};

//errType
var errCode = {
    success: 0,
    tokenFail: 3, //token过期
    sayFail: 5 //回话不存在
};

//本地存储兼职
var strKey = {
    K_PHP_SESSION_ID: "K_PHP_SESSION_ID",
    K_ADMIN_TYPE: "K_ADMIN_TYPE",
    K_USER: "K_USER",
    K_PWD: "K_PWD",
    IS_REM: "IS_REM",
    K_USER_INFO: "K_USER_INFO"
};

//文字提示
var CN_TIPS = {
    ADD_ADMIN: "添加管理员",
    ADD_INFO: "添加藏品",
    ADD_OK: "添加成功",
    BALANCE_NOT_ENOUGH: "余额不足",
    BLANK_TITLE: "标题不能为空",
    BLANK_BID: "进价不能小于零",
    BLANK_CONTENT: "内容不能为空",
    COMMON_ADMIN: "普通管理员",
    COMPARE_TIME: "结束时间不能小于开始时间",
    CLEAR_CACHE: "清除缓存成功",
    DIFF_PWD: "两次密码输入不一致",
    DEL_OK: "删除成功",
    DELIVER_GOODS_OK: "发货成功",
    INPUT_USER_NAME: "请输入用户名",
    INPUT_PWD: "请输入密码",
    LOW_PRICE_BLANK: "最低加价不能为空",
    LOW_PRICE_BLANK_LESS :"最低加价不能低于0",
    MOD_GOODS: "修改展品",
    MOD_ADMIN: "修改管理员",
    MOD_OK: "修改成功",
    COPY_INFO: "复制藏品信息",
    MOD_INFO: "修改藏品",
    NO_DATA: "暂无数据",
    NO_BALANCE: "修改金额不能为空",
    NEW_PWD_BLANK: "新密码不能为空",
    OPERATE_OK: "操作成功",
    ORDER_NUM_BLANK: "运单号不能为空",
    PIC_BLANK: "请上传图片",
    PWD_BLANK: "密码不能为空",
    PUBLISH_GOODS: "发布展品",
    PUBLISH_OK: "发布成功",
    SUPER_ADMIN: "超级管理员",
    SELECT_GOODS: "请选择藏品",
    SELECT_START_TIME: "请选择开始时间",
    SELECT_END_TIME: "请选择结束时间",
    USER_NAME_BLANK: "用户名不能为空",
    UP_LOAD_PIC: "上传图片",
    UP_LOAD_VIDEO: "上传视频",
    PRICE_MUSTTHAN_ZERO : "初始价不能低于 0",
    MOD_USER: "用户备注",
    NEED_MORE_THAN_INITPRICE:"封顶价应大于起拍价和最低加价之和",
    NEED_MORE_THAN_ZERO :"封顶价不能为空，不能小于0"
};

//跳转页面
var JUMP_URL = {
    ORDER_INFO: BASE_JUMP_URL + 'orderInfo', //订单详情
    USER_LIST: BASE_JUMP_URL + "user", //用户
    BIDDING_LIST: BASE_JUMP_URL + "bidding", //竞拍记录
    AUCTION_LIST: BASE_JUMP_URL + "auction", //竞拍藏品
    PUSH_MESSAGE: BASE_JUMP_URL + "push",//消息推送
    ACTION_USERINFO : BASE_JUMP_URL + "userInfo",//跳到个人详情
};

////权限2级
//var adminPermission = [{id: '101', val: '管理员列表'}],
//  userPermission = [{id: '201', val: '用户信息'}],
//  goodsPermission = [{id: '301', val: '藏品列表'}],
//  auctionPermission = [{id: '401', val: '拍品列表'}],
//  offerPricePermission = [{id: '501', val: '出价列表'}],
//  orderPermission = [{id: '601', val: '订单列表'}],
//  widthDrawPermission = [{id: '701', val: '提现列表'}],
//  guessPermission = [{id: '801', val: '竞猜列表'}],
//  
//  dataPermission = [{id: '901', val: '销售记录'},{id: '902', val: '充值记录'},{id: '903', val: '拍品上拍记录'},{id: '904', val: '余额修改记录'},{id: '905', val: '藏品删除记录'},{id: '906', val: '拍品删除记录'}],
//  
//  elegantPermission = [{id: '1001', val: '雅学院发布'},{id: '1002', val: '雅学院编辑'}];
//
////权限1级
//var permissionArr = [
//  {id: '1', val: '管理员管理', secPermission: adminPermission},
//  {id: '2', val: '用户管理', secPermission: userPermission},
//  {id: '3', val: '藏品管理', secPermission: goodsPermission},
//  {id: '4', val: '拍品管理', secPermission: auctionPermission},
//  {id: '5', val: '出价管理', secPermission: offerPricePermission},
//  {id: '6', val: '订单管理', secPermission: orderPermission},
//  {id: '7', val: '提现管理', secPermission: widthDrawPermission},
//  {id: '8', val: '有奖竞猜', secPermission: guessPermission},
//  {id: '9', val: '数据统计', secPermission: dataPermission},
//  {id: '10', val: '雅学院', secPermission: elegantPermission}
//];









//权限2级
var adminPermission = [{id: '101', val: '管理员列表'},{id: '102', val: '商户账号列表'},{id: '103', val: '推广员账号列表'},{id: '104', val: '客服账号列表'}],
    userPermission = [{id: '201', val: '用户信息'}],
    goodsPermission = [{id: '301', val: '藏品列表'}],
    auctionPermission = [{id: '401', val: '拍品列表'}],
    offerPricePermission = [{id: '501', val: '出价列表'}],
    orderPermission = [{id: '601', val: '订单列表'}],
    widthDrawPermission = [{id: '701', val: '提现列表'}],
    guessPermission = [{id: '801', val: '竞猜列表'}],
    
    dataPermission = [{id: '901', val: '拍品销售记录'},{id: '902', val: '充值记录'},{id: '903', val: '拍品上拍记录'},{id: '904', val: '余额修改记录'},{id: '905', val: '藏品删除记录'},{id: '906', val: '拍品删除记录'},{id: '907', val: '商品删除记录'},{id: '908', val: '商品销售记录'},{id: '909', val: '订单操作记录'}],
    
    elegantPermission = [{id: '1001', val: '雅学院发布'},{id: '1002', val: '雅学院编辑'}],
    commodityPermission = [{id: '1101', val: '商品列表'},{id: '1102', val: '商户商品申请列表'}],
    choicePermission = [{id: '1201', val: '精选列表'}];
//权限1级
var permissionArr = [
    {id: '1', val: '管理员管理', secPermission: adminPermission},
    {id: '2', val: '用户管理', secPermission: userPermission},
    {id: '3', val: '藏品管理', secPermission: goodsPermission},
    {id: '4', val: '拍品管理', secPermission: auctionPermission},
    {id: '5', val: '出价管理', secPermission: offerPricePermission},
    {id: '6', val: '订单管理', secPermission: orderPermission},
    {id: '7', val: '提现管理', secPermission: widthDrawPermission},
    {id: '8', val: '有奖竞猜', secPermission: guessPermission},
    {id: '9', val: '数据统计', secPermission: dataPermission},
    {id: '10', val: '雅学院', secPermission: elegantPermission},
    {id: '11', val: '商品管理', secPermission: commodityPermission},
    {id: '12', val: '精选店管理', secPermission: choicePermission}
];




var defaultImage = "assets/images/public/default.png";

var editorConfig = 
{
	resizeType : 1,
	allowPreviewEmoticons : false,
	allowImageUpload : false,
	items : [
		'fontname', 
		'fontsize', 
		'|', 
		'forecolor', 
		'hilitecolor', 
		'bold', 
		'italic', 
		'underline',
		'removeformat', 
		'|', 'justifyleft', 
		'justifycenter', 
		'justifyright', 
		'insertorderedlist',
		'insertunorderedlist',
		'uploadImage'
	],
	height : "600px"
};