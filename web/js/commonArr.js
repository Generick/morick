/**
 * Created by Administrator on 2017/1/4.
 */
/*底部导航栏*/
var tab = [
    //{title: '有奖竞猜', isActive: false, pic: ["img/bottom/under_auction.png","img/bottom/under_auction_active.png"]},
    {title: '预展', isActive: false, pic: ["img/pre-see.png","img/pre-see-color.png"]},
    {title: '正在拍卖', isActive: false, pic: ["img/bottom/under_auction.png","img/bottom/under_auction_active.png"]},
    {title: '拍卖历史', isActive: false, pic: ["img/bottom/auction_history.png","img/bottom/auction_history_active.png"]}
   
];

//账户明细类型
var TRANSACTION_TYPE_ARR =
    [
        {
            type : 0,
            text : "充值",
            symbol : "-",
            style : "money-reduce"
        },
        {
            type : 1,
            text : "返还保证金",
            symbol : "+",
            style : "money-add"
        },
        {
            type : 2,
            text : "提现",
            symbol : "+",
            style : "money-add"
        },
        {
            type : 3,
            text : "交纳保证金",
            symbol : "-",
            style : "money-reduce"
        },
        {
            type : 4,
            text : "购买服务",
            symbol : "-",
            style : "money-reduce"
        },
        {
            type : 5,
            text : "订单支付",
            symbol : "-",
            style : "money-reduce"
        },
        {
            type : 6,
            text : "系统充值",
            symbol : "+",
            style : "money-add"
        },
        {
            type : 7,
            text : "系统扣除",
            symbol : "-",
            style : "money-reduce"
        },
        {
        	type : 8,
            text : "拒绝提现",
            symbol : "+",
            style : "money-add"
        }
    ];