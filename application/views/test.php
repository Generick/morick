<!DOCTYPE HTML>
<html>
<head>
    <link href="resources/bootstrap.css" rel="stylesheet" />
    <script type="text/javascript" src="resources/jquery.js"></script>
    <script language="JavaScript" >

        var methods = {
            // 公用接口
            "common/test" : {},
            "common/clearRedis" : {"说明":"清除缓存", "备注":""},
            "common/getConfigData" : {"说明":"获取常量", "备注":""},
            "common/getBanner" : {"position":"1", "说明" : "获取首页活动Banner", "备注" : "position 表示不同位置"},

            "upload/uploadImages" : {"file":{"type":"file"},"file2":{"type":"file"}, "说明":"上传图片", "备注" : "fileType 1图片 2视频 3其他"},
            // 账号相关
            "account/registerUser" : {"platformId":"123", "password":"123", "verifyCode" : "8888",'PMTID':'', "说明": "注册 PMTID推广员的userId", "备注" : ""},
            "account/login" : {"userType" : 1, "platform":5, "platformId" : "13918879481", "password" : "8888",'PMTID':'',  "说明" : "登录 PMTID推广员userId",
                "备注" : "platform（平台类型 1自有账号 2微信 3QQ 4微博 5手机验证码） " +
                "platformId（当前平台的唯一标识），userType：1为普通用户，2为管理员"},
            "account/reLogin" : {"userType":1, "token":"123", "说明":"重登录", "备注" : ""},

            "account/changePassword" : {"verifyCode" : "8888", "platformId":"123", "password":"123", "说明":"修改密码", "备注" : ""},
            "account/getMobileCode" : {"mobile" : "", "type" : 1, "说明" : "获取短信验证码", "备注" : "type(1 注册 2 登录 3 修改密码)"},
            "account/hasLogin" : { "说明" : "判断用户是否登录"},

            //user普通用户相关逻辑
            'u_user/getSelfInfo' : {"说明":"获取用户数据"},
            'u_user/modInfo' : {"modInfo" : '{"name":"张三", "telephone":"123"}', "说明":"修改个人数据"},
            "u_user/getPersonalData" : {"说明" : "获取个人资料信息"},
            "u_user/getBindInfo" : {"说明" : "获取用户绑定信息"},
            "u_user/bindAccount" : {"bindType" : 0, "bindAccount" : "", "说明" : "绑定账号", "备注" : "bindType 0QQ 1微信 2邮箱"},

            //商户
            'x_mch/getSelfInfo' : {"说明":"商户 获取自己的数据"},
            //推广员
            'p_pmt/getSelfInfo' : {"说明":"推广员 获取自己的数据"},
            //客服
            'S_srv/getSelfInfo' : {"说明":"客服 获取自己的数据"},

            // 管理员的操作
            'a_admin/getSelfInfo' : {"说明":"获取自己的数据"},
            "a_admin/addAdminAccount" : {"platformId":"111", "password":"111", "adminType":1, "pageEntries":'[1,2,3,4,5,6,101,102,301,302,303,501,502,601]', "说明":"增加管理员账号"},
            "a_admin/modAdmin" : {"userId":"10001", "modInfo":'{"adminType":1}', "pageEntries":'[1,2,3,4,5,6,201,202,301,302,303,501,502,601]', "说明":"修改管理员账号"},
            "a_admin/modAdminPassword" : {"userId":"10001", "password":"111", "说明":"修改管理员密码"},
            "a_admin/deleteAdmin" : {"userIds":'["10001"]', "说明":"删除管理员账号"},
            "a_admin/getAdminList" : {"startIndex":0, "num":10, "说明":"获取管理员账号列表"},
            "a_admin/getUserStatistics" : {"说明" : "用户数目统计"},
            "a_admin/getUserList" : {"userType" : 1, "startIndex":0, "num":10, "说明":"分类型获取用户列表"},
            "a_admin/searchUserList" : {"userType" : 1, "startIndex":0, "num":10, "likeStr" : "", "说明":"分类型搜索用户"},
            "a_admin/modUserInfo" : {"userId" : "", "modInfo" : '{"note": "备注信息"}', "说明":"修改个人数据"},
            "a_admin/opBalance" : {"userId" : "", "opType" : "", "balance" : "", "说明" : "管理员操作用户余额 opType 0增加 1减少"},
            "a_admin/smsSend" :{"params" :'{"type":1,"phoneNum":"18255001881","goods_name":"test","price":20}',"说明":"type为类型 1超价提醒 2竞拍成功 3截拍提醒"},
            "a_admin/getUserInfo" : {"userId" : "", "说明" : "根据UserId获取个人用户信息"},

            //region 商品
            "goods/Goods/getGoods" : {"startIndex":0, "num":10, "说明":"获取商品列表"},
            "goods/A_goods/createGoods" : {"goodsInfo" : '{"goods_name" : "", "goods_detail" : "", "goods_pics" : "[]", "goods_bid" : "10"}', "说明" : "新增商品"},
            "goods/Goods/getOneGoods" : {"goodsId" : 1,  "说明" : "获取商品详情"},
            "goods/A_goods/modGoods" : {"goodsId" : 1, "modInfo" : '{}', "说明" : "修改商品"},
            "goods/A_goods/delGoods" : {"goodsIds" : '[]', "说明" : "删除商品"},
            "goods/A_goods/outLibrary" : {"goodsId" : 100, "说明" : "商品出库"},
            //endregion

            //region 拍卖
            "auction/Auction/getAuctionItems" : {"startIndex" : 0, "num" : 10, "type" : 0, "说明" : "获取拍卖展品列表", "备注" : "type 0正在拍卖 1表示已经结束 2包含正常拍卖跟已截拍的"},
            "auction/A_auction/getAuctionItems" : {"startIndex" : 0, "num" : 10, 'todayAuction' : 0, "说明" : "获取拍卖展品列表 todayAuction 1当日截拍"},
            "auction/Auction/getAuctionAllInfo" : {"itemId" : 4, 'userId':3,"说明" : "根据展品ID获取展品详情"},
            "auction/Auction/getBiddingList" : {"itemId" : 0, "startIndex" : 0, "num" : 10, "说明" : "获取竞拍记录"},
            "auction/Auction/getPersonalBiddingList" : {"userId" : 0, "startIndex" : 0, "num" : 10, "说明" : "获取个人竞拍记录"},
            "auction/U_auction/biddingAuctionItem" : {"itemId" : 0, "price" : 0, "说明" : "竞拍展品"},
            "auction/A_auction/releaseAuctionItem" : {
                "goodsId" : 1,
                "initialPrice" : 50,
                "lowestPremium" : 5,
                //"referencePrice" : 500,
                "margin" : 100,
                "startTime" : "2016-11-17 17:19:47",
                "endTime" : "2016-11-17 17:19:54",
                "cappedPrice" : "800",
                "isVIP" : 0,
                "isQuiz" : 1,
                "limitNum" : 100,
                "tickets" : 5,
                "说明" : "发布展品"
                  },
            "auction/A_auction/modActionItem" : {"itemId" : 0, "modInfo" : '{"details" : ""}', "说明" : "修改展品信息"},
            "auction/A_auction/getAuctionGoods" : {"startIndex" : 0, "num" : 10, "likeStr" : "", "说明" : "获取当前不在拍卖的商品列表"},
            "auction/A_auction/delAuctionItems" : {"itemIds" : '[]', "说明" : "删除展品"},
            "auction/A_auction/setAuctionItemOff" : {"itemId" : 0, "说明" : "下架展品"},
            "auction/A_auction/auctionStatistical" :  {"startTime" : "", "endTime" : "", "startIndex" : 0, "num" : 10, "说明" : "拍品统计"},
            "auction/A_auction/AGDelRecord" :  {"startIndex" : 0, "num" : 10, 'type' : 0,"startTime" : '', "endTime" : '', "说明" : "获取删除记录 0藏品 1拍品"},
            "auction/A_auction/setBidNote" :  {"id" : 0, "note" : 'beizhu', "说明" : "竞拍记录设置备注"},
            //endregion

            //bids interface start
            "bids/A_bids/getBidList":{"startIndex":"0","num":10,"auctionItemId":111,"说明":"获取出价列表 startIndex获取位置，num获取数量 auctionItemId为拍品id"},
            "bids/A_bids/smsSend":{"params" :'{"type":1,"phoneNum":"18255001881","goods_name":"test","price":20}',"说明":"type为类型 1超价提醒 2竞拍成功 3截拍提醒"},
            //bids end

            //prizes quiz interface start
            "prizesQuiz/PrizesQuiz/createQuiz":{'auctionId':1,'goods_bak_id':1,'tickets':10,'limitNum':10,"说明":"创建有奖竞猜列表"},
            "prizesQuiz/PrizesQuiz/getPrizesList":{"status":1,"startIndex":0,"num":10,"说明":"前端获取竞猜列表"},
            "prizesQuiz/PrizesQuiz/getQuizInfo":{"auctionId":1,"说明":"前端获取竞猜页面"},
            "prizesQuiz/PrizesQuiz/getQuizUserList":{"auctionId":1,"startIndex":"0","num":10,"说明":"获取某一拍品的参与有奖竞猜的用户"},
            "prizesQuiz/PrizesQuiz/getAwardUserList":{"auctionId":1,"说明":"获取某一拍品的有奖竞猜的获奖用户"},
            "prizesQuiz/A_prizesQuiz/getQuizList":{"startIndex":0,"num":10,"说明":"管理后台获取竞猜列表"},
            "prizesQuiz/A_prizesQuiz/viewQuiz":{"auctionId":"1","说明":"管理后台查看竞猜详情"},
            "prizesQuiz/A_prizesQuiz/searchQuizList":{"fields":2,"说明":"管理后台搜索竞猜列表"},
            "prizesQuiz/A_prizesQuiz/quitQuiz":{"auctionId":2,"说明":"管理后台结束竞猜"},
            "prizesQuiz/A_prizesQuiz/updateLimitNum":{"auctionId":2,"limitNum":50,"说明":"管理员设置人数限制"},
            "prizesQuiz/U_prizesQuiz/partakeQuiz":{"auctionId":2,"quizPrice":50,"说明":"用户参与有奖竞猜"},
            "prizesQuiz/U_prizesQuiz/getUserQuiz":{"userId":2,"说明":"获取用户参与的有奖竞猜"},

            //prizes quiz end

            //withdraw cash start
            "withdrawCash/U_withdrawCash/withdrawCash":{"userId":1,"withdrawCash":100,"wx_account":"weixin","说明":"用户提现withdrawCash提现金额wx_account微信账号"},
            "withdrawCash/U_withdrawCash/getUserWithDrawList":{"userId":1,"说明":"用户提现记录"},
            "withdrawCash/A_withdrawCash/refuseWithDraw":{"id":1,"userId":1,"withdrawCash":100,"reason":"不让你提现","说明":"管理后台拒绝提现"},
            "withdrawCash/A_withdrawCash/acceptWithDraw":{"id":1,"说明":"管理后台同意提现"},
            "withdrawCash/A_withdrawCash/getWithDrawList":{"startIndex":0,"num":10,"status":0,'fields':2,"说明":"管理后台获取提现列表"},
            "withdrawCash/A_withdrawCash/searchWithDrawUserList":{"fields":2,"说明":"管理后台搜索提现列表"},
            //withdraw cash end

            //message push start
            "messagePush/U_messagePush/getUnReadMsg":{"userId":1,"startIndex":0,"num":10,"说明":"用户获取未批阅消息"},
            "messagePush/U_messagePush/getHasReadMsg":{"userId":1,"startIndex":0,"num":10,"说明":"用户获取已批阅消息"},
            "messagePush/U_messagePush/getUserMsgList":{"userId":1,"startIndex":0,"num":10,"说明":"用户获取消息"},
            "messagePush/U_messagePush/viewMsg":{"userId":1,"msg_id":1,"说明":"用户查看消息","备注":"msg_type消息类型0系统消息1有奖竞猜2拍卖获拍3订单发货 href_id跳转id"},
            "messagePush/A_messagePush/pushMessage":{"pushType":0,"msg_title":"title","msg_content":"content","phoneNum":0,"说明":"后台推送消息pushType推送类型0非vip 1:vip 2:全部 3:个人"},
            //message push end

            //region 阅读模块
            "readLog/ReadLog/readWithType" : {"readType" : 1, "readId" : 1, "说明" : "阅读指定对象", "备注" : "readType 1为阅读展品"},
            "readLog/U_readLog/getReadObjList" : {"readType" : 1, "startIndex" : 0, "num" : 10, "说明" : "获取个人阅读对象列表", "备注" : ""},
            //endregion

            //region 收藏模块
            "collectionLog/CollectionLog/collectionOrCancel" : {"collectionType" : 1, "collectionId" : 1, "说明" : "收藏or取消收藏指定对象",
                "备注" : "collectionType 1为展品"},
            //endregion

            //region 分享模块
            "shareLog/ShareLog/shareWithType" :{"shareType" : 1, "shareId" : 1, "sharePlatform" : 1, "说明" : "把某对象分享到指定平台",
                "备注" : "shareType 1展品 sharePlatform 1QQ 2微信 3微博"},
            //endregion

            //region 三级联动区域模块
            "area/Area/getAreas": {"parentId": 0, "说明": "获取三级联动区域列表", "备注": ""},
            "area/Area/getAreaInfo": {"areaIds": '[1]', "说明": "根据ID获取区域信息", "备注": ""},
            //endregion

            //region 收货地址
            "shippingAddress/ShippingAddress/getShippingAddress" : {"startIndex" : 0, "num" : 10, "userId" : 0, "说明" : "获取个人收货地址"},
            "shippingAddress/U_ShippingAddress/modShippingAddress" :{"addressId" : 0, "modInfo" : '{"acceptName" : ""}', "说明": "修改收货地址", "备注" : ""},
            "shippingAddress/U_ShippingAddress/addShippingAddress" :  {"acceptName" : "", "province" : 0, "city" : 0, "district" : 0, "address" : "", "mobile" : "", "isCommon" : 0 ,
                "说明": "新增收货地址", "备注" : ""},
            "shippingAddress/U_ShippingAddress/delShippingAddress" :   {"addressIds" : '[]', "说明": "删除收货地址", "备注" : ""},
            "shippingAddress/U_ShippingAddress/getShippingAddress" : {"addressId" : 0, "说明" : "获取收货地址详情"},
            //endregion

            //region 交易明细
            "transaction/U_transaction/getTransactionList" : {"startIndex" : 0, "num" : 10, "说明" : "分页获取交易明细"},
            "transaction/A_transaction/getTransactionList" : {"startIndex" : 0, "num" : 10, "userId" : "", "startTime" : "", "endTime" : "", "isAdmin" : "0", "说明" : "分页获取交易明细"},
            //endregion

            //region 购买服务
            "paidServices/A_paidServices/getPersonalPaidServices" : {"startIndex" : 0, "num" : 10, "userId" : "", "说明" : "分页获取付费服务"},
            "paidServices/U_paidServices/getSelfPaidServices" : {"说明" : "获取个人包月服务"},
            "paidServices/U_paidServices/paidServices" : {"serviceType" : 0, "说明" : "开通包月服务"},
            //endregion

            //region 订单列表
            "order/A_order/getPersonalOrderList" :  {"startIndex" : 0, "num" : 10, "userId" : "", "说明" : "分页获取个人购买记录"},
            "order/A_order/getOrderList" : {"startIndex" : 0, "num" : 10, "orderStatus" : 0, "online" : 1 , "likeStr" : "", "orderType":1,"说明" : "获取订单列表 online 线上线下1线上2线下 orderType订单类型1拍品订单 2商品订单"},
            "order/A_order/deliverOrder" : {"order_no" : "", "logistics_no" : "", "说明" : "发货"},
            "order/A_order/orderStatistical" : {"startTime" : "", "endTime" : "", "startIndex" : 0, "num" : 10, "说明" : "销售统计"},
            "order/A_order/getLogisticsInfo" : {"order_no" : "", "说明" : "获取物流信息"},
            "order/A_order/operateOrder":{"order_no":"","type":'',"说明":'type操作类型0确认完成 1取消订单'},
            "order/U_order/getOrderList" :  {"startIndex" : 0, "num" : 10, "orderType" : 0, "说明" : "获取订单列表"},
            "order/U_order/getOrderInfo" : {"order_no" : "", "说明" : "获取订单信息"},
            "order/U_order/getLogisticsInfo" : {"order_no" : "", "说明" : "获取物流信息"},
            "order/U_order/confirmReceipt" : {"order_no" : "", "说明" : "确认收货"},
            "order/U_order/payOrder" :{"order_no" : "", "deliveryType" : "0", "说明" : "支付订单"},
            "order/U_order/payTMH" :{"userId" : "0", "commodity_id" : "0", "clientPrice":0, "clientTime":0,"buyNum":1,"说明" : "支付特卖会订单 clientPrice前端计算的价格clientTime前端传入的时间 buyNum购买数量"},
            "order/U_order/wxPayTMH":{"userId":'3', "commodity_id":'88', "clientPrice":'', "clientTime":'1498647944', "buyNum":1, "payEnv":1, "returnUrl":'','openId':'', "说明":"微信支付商品 payEnv支付方式 当支付方式为微信公众号时openId必传"},
            "order/U_order/continuePay":{'order_no':'', "returnUrl":"http://www.baidu.com",'openId':'', "说明":"继续支付 order_no订单号 returnUrl跳转链接"},
            "order/Order/continuePayTest":{'openId':'', "说明":"测试支付接口"},
            "order/Order/userOrderStatistics":{"说明":"用户订单总额以及最新下单时间更新"},
            //endregion

            //region 充值
            "recharge/U_recharge/recharge" : {"money" : 0, "说明" : "充值"},
            "recharge/A_recharge/rechargeStatistical" :  {"startTime" : "", "endTime" : "", "startIndex" : 0, "num" : 10, "说明" : "充值统计"},
            //endregion

            //region 委托出价
            "proxyBid/U_proxyBid/setProxyBid" : {"auctionId" : 0, "bids" : '[{"triggerPrice" : 10.0, "offerPrice" : 10.0}]', "说明" : "设置委托出价"},
            "proxyBid/U_proxyBid/getProxyBid" : {"auctionId" : 0, "说明" : "获取委托出价"},
            "proxyBid/A_proxyBid/getProxyBid" : {"startIndex" : 0, "num" : 10, "说明" : "获取委托出价列表"},
            //endregion

            //region 冻结资金
            "freeze/U_freeze/isFreeze" : {"freezeType" : 0, "freezeId" : 0, "说明" : "获取是否已经扣除过保证金"},
            //endregion
            //region 定时任务
            "timedTask/TimedTask/createOrder" : {"说明" : "创建订单"},
            "timedTask/TimedTask/remindNearEnd" : {"说明" : "截拍提醒"},
            "timedTask/TimedTask/cancelOrder" : {"说明" : "72小时未支付订单自动取消"},
            //endregion

            //region
            "information/Information/getInformationList" : {"startIndex" : 0, "num" : 10, "说明" : "获取资讯列表"},
            "information/Information/getInformationInfo" : {"informationId" : 0, "说明" : "获取资讯详情"},
            "information/A_information/getInformationList" : {"startIndex" : 0, "num" : 10, "likeStr" : "", "说明" : "获取资讯列表"},
            "information/A_information/createInformation" : {"type" : 0, "cover" : "", "title" : "", "content" : "", "summary" : "", "说明" : "新增资讯"},
            "information/A_information/releaseInformation" : {"informationId" : 0, "说明" : "发布or取消发布资讯"},
            "information/A_information/delInformation" : {"informationIds" : '[1,2]',  "说明" : "删除资讯"},
            "information/A_information/modInformation" : {"informationId" : 0, "modInfo" : '{"type" : 0}', "说明" : "修改资讯"},
            "information/A_information/getInformationInfo" : {"informationId" : 0,  "说明" : "获取资讯详情"},

            //特卖会
            "saleMeeting/A_saleMeeting/getCommodities": {'startIndex':0, 'num':10, 'is_up': '', 'fields':'', '说明':'获取商品列表 is_up是否上架 0未上架 1上架'},
            "saleMeeting/A_saleMeeting/addCommodity": {'info':'{"commodity_name":"new name","commodity_desc":"new desc", "commodity_cover":"htttp://xxx.jpg","commodity_detail":"new detail", "commodity_price":100, "bid_price":50,"stock_num":5000, "commodity_pic":["http://xxx.jpg","http://123.jpg"],"annualized_return":"20","commodity_attr":0}', '说明':'添加商品'},
            "saleMeeting/A_saleMeeting/getUpCommodities": {'startIndex':0, 'num':10, 'fields':'', '说明':'获取添加到特卖会中的商品'},
            "saleMeeting/A_saleMeeting/delCommodity": {'ids':'[1,2]', '说明':'删除商品'},
            "saleMeeting/A_saleMeeting/modCommodity": {'id':1, 'modInfo':'','说明':'修改商品'},
            "saleMeeting/A_saleMeeting/upCommodityToTMH": {'ids':'[1,2]','说明':'上架商品到特卖会'},
            "saleMeeting/A_saleMeeting/delTMH": {'commodity_ids':'[1,2]','说明':'从特卖会中删除商品'},
            "saleMeeting/A_saleMeeting/upCommodity": {'id':1,'is_up':1, '说明':'上架/下架商品 is_up 0下架 1上架'},
            "saleMeeting/A_saleMeeting/getCommodityInfo": {'id':1,'说明':'获取商品信息'},
            "saleMeeting/A_saleMeeting/commodityDelRec": {'startIndex':0,'num':10,'startTime':'','endTime':'','说明':'获取商品删除记录'},
            "saleMeeting/A_saleMeeting/saleRecord": {'startIndex':0,'num':10,'startTime':'','endTime':'','fields':'','说明':'获取商品销售记录'},
            "saleMeeting/A_saleMeeting/moveCommodityOrder": {'commodityIdA':1,'commodityIdB':2,'说明':'移动商品顺序'},
            "saleMeeting/SaleMeeting/getTMHList": {'startIndex':0, 'num':10, 'fields':'','priceRange':'','说明':'获取特卖会列表 priceRange价格区间 1百元区 2千元区 3万元区 为空或者其他数值则获取全部'},
            "saleMeeting/SaleMeeting/getTMHCommodityInfo": {'commodity_id':1,'说明':'获取特卖会商品信息'},

            //商户模块
            "merchant/A_merchant/getMCHList":{'startIndex':0,'num':10,"说明":"管理员获取商户账号列表"},
            "merchant/A_merchant/addMCH":{'accountName':'123456','password':'123456','name':'test',"说明":"管理员添加商户账号"},
            "merchant/A_merchant/modMCHPWD":{'accountName':'123456','newPWD':'654321',"说明":"管理员修改商户密码"},
            "merchant/A_merchant/delMCH":{'ids':'[1,2]',"说明":"管理员删除商户账号 id账号的userId"},
            "merchant/A_merchant/getRequestList":{'startIndex':0,'num':10,"说明":"管理员获取商户请求列表"},
            "merchant/A_merchant/adminDelRequest":{'ids':'[1]',"说明":"管理员删除商户请求 id为请求id"},
            "merchant/A_merchant/adminHandleRequest":{'id':1,'handleResult':1,"说明":"管理员处理商户请求 id为请求id handleResult处理结果 1同意2拒绝"},
            "merchant/A_merchant/getMCHCommodityInfo":{'commodity_id':1,"说明":"管理员获取商户商品信息"},
            "merchant/A_merchant/adminSaveCInfoInRequest":{'id':1,'info':'',"说明":"管理员修改商户商品并保存同意请求 id为请求id info修改后商品的信息，其中CID要传入商户商品的id"},
            "merchant/U_merchant/getCommodities":{'startIndex':0,'num':10,"userId":"23","说明":"商户获取自己商品列表"},
            "merchant/U_merchant/getCommodifyInfo":{'commodity_id':1,"说明":"商户获取自己商品详情"},
            "merchant/U_merchant/modCommodity":{'commodity_id':1,'modInfo':'{"mch_commodity_name":"modName"}',"说明":"商户修改自己商品"},
            "merchant/U_merchant/delCommodity":{'commodity_id':1,"说明":"商户删除自己商品"},
            "merchant/U_merchant/merchantRequest":{'commodity_id':1,'requestType':1,'userId':23,"说明":"商户请求接口 requestType请求类型1上架申请2下架申请3商品同步申请"},
            "merchant/U_merchant/addCommodity":{'userId':'23','info':'{"mch_commodity_name":"new name","mch_commodity_desc":"new desc", "mch_commodity_cover":"htttp://xxx.jpg","mch_commodity_detail":"new detail", "mch_commodity_price":100, "mch_bid_price":50,"mch_stock_num":5000, "mch_commodity_pic":["http://xxx.jpg","http://123.jpg"],"mch_annualized_return":"20","mch_commodity_attr":0}',"说明":"商户添加商品"},
            "merchant/U_merchant/getUnReadMSGList":{'startIndex':0,'num':10,'userId':23,'说明':'商户获取未读消息'},
            "merchant/U_merchant/getHasReadMSGList":{'startIndex':0,'num':10,'userId':23,'说明':'商户获取已读消息'},
            "merchant/U_merchant/viewMSG":{'userId':23,'msg_id':10,'说明':'商户阅读消息'},
            "merchant/U_merchant/getMCHUnReadNum":{'userId':23,'说明':'商户获取未读消息数'},

            //推广员模块
            'promoter/A_promoter/addPromoter':{'name':'test','telephone':'123321','password':'123456',"说明":"添加推广员"},
            'promoter/A_promoter/getPromoters':{'startIndex':0,'num':10,"说明":"获取推广员列表"},
            'promoter/A_promoter/delPromoter':{'userIds':'[1,2]',"说明":"删除推广员"},
            'promoter/A_promoter/modPMTPassword':{'telephone':'123321','newPWD':'654321',"说明":"修改推广员密码"},
            'promoter/A_promoter/adminCheckBill':{'userId':'1','amount':'10',"说明":"结账 amount结账金额"},
            'promoter/A_promoter/modPromoter':{'userId':'1','qrcode':'http://www.baidu.com/xxx.jpg',"说明":"生成二维码之后修改推广员的二维码地址"},
            'promoter/A_promoter/getPromoterConditions':{'userId':'1',"说明":"获取推广员的分成条件"},
            'promoter/A_promoter/adminAddCondition':{'userId':'1','condition_money':50000,'condition_rate':5,"说明":"添加推广员的分成条件 condition_money消费金额 condition_rate分成比例"},
            'promoter/A_promoter/adminDelCondition':{'id':'1',"说明":"删除推广员的分成条件"},
            'promoter/A_promoter/getFriendsOrders':{'userId':'1','startIndex':0,'num':10,'startTime':'','endTime':'',"说明":"好友下单记录"},
            'promoter/A_promoter/getFriends':{'userId':'41','startIndex':0,'num':10,'sort':0,'direction':0,"说明":"好友列表 sort排序方式0按照好友注册时间1按照消费金额2按照最近下单时间 direction 0倒序1正序"},
            'promoter/A_promoter/getCheckBillRecords':{'userId':'1','startIndex':0,'num':10,"说明":"结账记录"},
            'promoter/A_promoter/getPromoterInfo':{'userId':'1',"说明":"获取推广员信息"},
            'promoter/P_promoter/getPromoterInfo':{'userId':'1',"说明":"推广员获取自己的信息"},
            'promoter/P_promoter/myPromptUsers':{'userId':'1','startIndex':0,'num':10,'sort':0,'direction':0,"说明":"获取自己推荐的用户 sort排序方式0按照好友注册时间1按照消费金额2按照最近下单时间 direction 0倒序1正序"},
            'promoter/P_promoter/getPromptUserInfo':{'userId':'1','friendUserId':15,'startIndex':0,'num':10,"说明":"获取推荐的用户详情"},
            'promoter/P_promoter/getWaitCheckBill':{'userId':'1','startIndex':0,'num':10,"说明":"获取待结账金额详情"},
            'promoter/P_promoter/setRemark':{'userId':1,'remark':'这是备注内容',"说明":"推广员给用户设置备注 userId为用户id"},

            //客服
            'customerService/A_customService/getServices':{'startIndex':0,'num':10,'说明':'获取客服账号列表'},
            'customerService/A_customService/addService':{'accountName':'kf001','name':'客服一号','password':'123456','说明':'添加客服账号'},
            'customerService/A_customService/modServicePassword':{'accountName':'kf001','newPWD':'654321','说明':'修改客服账号密码'},
            'customerService/A_customService/delService':{'ids':'[1,2]','说明':'删除客服账号'},
            'customerService/A_customService/getOPREC':{'startIndex':0,'num':10,'startTime':'','endTime':'','说明':'获取客服操作记录'},
            'customerService/S_customService/getOrders':{'startIndex':'0','num':'10','orderStatus':'','说明':'客服获取订单列表'},
            'customerService/S_customService/getOrderInfo':{'order_no':'','说明':'客服获取订单详情'},
            'customerService/S_customService/sureOrCancelOrder':{'userId':'','order_no':'','type':0,'说明':'客服确定或者取消订单0确认完成1取消'},
            'customerService/S_customService/deliverOrder':{'userId':'','order_no':'','logistics_no':0,'说明':'客服发货 logistics_no物流单号'},
            //endregion
        };

        $(document).ready(function()
        {
            var i=0;
            for(var m in methods)
            {
                i++;
                var option = $("<option></option>");
                option.val(m);
                option.text(m);
                $("#postAPI").append(option);

                var params = methods[m];
                var row = "<tr><td class='item' id='"+i+"'><a href='#'>" + m + "</a></td>";
                if (params["说明"] != null)
                {
                    row += "<td>" + params["说明"] + "</td>";
                }
                if (params["备注"] != null)
                {
                    row += "<td>" + params["备注"] + "</td>";
                }

                row += "</tr>";
                $("#apiDesc tr:last").after(row);
            }
            $(".item").click(function(){
                var a=$(this).text();
                $("#postAPI").val(a);
                tronClick(a);
            });
        })

        function checkAction()
        {
            //$("#form").attr("action", "/" + $("#postAPI").val());
            $("#form").attr("action", "/auction/index.php/" + $("#postAPI").val());
            $("#submit").submit();
        }

        function onSelectionChange()
        {
            $("#inputs").empty();

            onSelectMethod($("#postAPI").val());
        }

        function tronClick(val)
        {
            $("#inputs").empty();

            onSelectMethod(val);
        }

        function onSelectMethod(method)
        {
            var params = methods[method];
            var hasFile = false;
            for (var p in params)
            {
                var input = $("<input></input>");
                if (typeof(params[p]) == "object")
                {
                    // 是对象，则其中必然有类型：type
                    if (params[p]["type"] == "file")
                    {
                        input.attr("type", "file");
                        input.attr("name", p);
                        input.text(p);
                        $("#inputs").append(p + ": ");
                        $("#inputs").append(input);
                        $("#inputs").append("<br/>");

                        hasFile = true;
                    }
                    else if (params[p]["type"] == "multiFile")
                    {
                        input.attr("type", "file");
                        input.attr("name", p);
                        input.attr("multiple", "multiple");
                        input.text(p);
                        $("#inputs").append(p + ": ");
                        $("#inputs").append(input);
                        $("#inputs").append("<br/>");

                        hasFile = true;
                    }
                    else
                    {
                        alert("Type not implemented: " + "param: " + p  + ", Type: " + params[p]["type"]);
                    }
                }
                else if(p == "备注")
                {

                     /*var label = $("<label></label>");
                     label.text(params[p]);
                     $("#inputs").append(label);*/

                }
                else if(p == "说明")
                {

                }
                else
                {
                    input.attr("type", "text");
                    input.attr("name", p);
                    input.text(p);
                    input.val(params[p]);
                    $("#inputs").append(p + ": ");
                    $("#inputs").append(input);
                    $("#inputs").append("<br/>");
                }
            }

            // 如果有文件，则需要修改为post
            if (hasFile)
            {
                $("#form").attr("method", "post");
            }
            else
            {
                $("#form").attr("method", "post");
            }
        }
    </script>
    <style>
        .item{
            cursor: pointer;
        }
        a {
            text-decoration: none;
            color: #000;
        }
    </style>
</head>
<body>
<!--<?php echo md5(uniqid())?>-->
<div class="api-lf">
    <br/>
    <p>输入Post的API</p>
    <select id="postAPI" style="width: 300px" onchange="onSelectionChange()" class="form-control">
        <option value="">请选择</option>
    </select>

    <br/>
    <p>输入参数</p>
    <form id="form" action="" method="get" enctype="multipart/form-data">
        <div id="inputs"></div>
        <input id="submit" type="submit" value="提交" onclick="checkAction()" class="btn btn-info"/>
    </form>
    <br/>
    <table id="apiDesc" border="1" class="table">
        <tr>
            <th width="100px">API</th>
            <th width="200px">说明</th>
            <th width="200px">备注</th>
        </tr>

    </table>
    <p>API命名规则：</p>
    <p>
        没有前缀的：不需要登录即可调用<br/>
        前缀为“u_”：普通用户可调用<br/>
        前缀为“a_”：管理员可调用<br/>
    </p>
</div>
</body>
</html>