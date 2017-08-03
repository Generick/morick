/**
 * Created by Administrator on 2017/1/4.
 */
/*底部导航栏*/
var tab = [
 
//  {title: '学', isActive: false, pic: ["img/pre-see.png","img/pre-see-color.png"],id:1},
//  {title: '拍', isActive: false, pic: ["img/bottom/under_auction.png","img/bottom/under_auction_active.png"],id:2},
//  {title: '淘', isActive: false, pic: ["img/sellUn.png","img/sellActive.png"],id:3},
//  {title: '我', isActive: false, pic: ["img/bottom/myself-usel.png","img/bottom/myself-sel.png"],id:4},
    
    
    
    
    {title: '学', isActive: false, pic: ["img/bottom/schUn.png","img/bottom/schHas.png"],id:1},
    {title: '拍', isActive: false, pic: ["img/bottom/paiUn2.png","img/bottom/paiHas.png"],id:2},
    {title: '淘', isActive: false, pic: ["img/bottom/taoUn.png","img/bottom/taoHas.png"],id:3},
    {title: '我', isActive: false, pic: ["img/bottom/mineUn.png","img/bottom/mineHas.png"],id:4}
   
];

//账户明细类型
var TRANSACTION_TYPE_ARR =
    [
        {
            type : 0,
            text : "充值",
            symbol : "+",
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
            symbol : "-",
            style : "money-reduce"
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
        },
        {
        	type : 9,
            text : "扣除门票",
            symbol : "-",
            style : "money-reduce"
        },
        {
        	type : 10,
            text : "返还门票",
            symbol : "+",
            style : "money-add"
        },
        {
        	type : 11,
            text : "竞猜奖金",
            symbol : "+",
            style : "money-add"
        },
        {
        	type : 12,
            text : "购买商品",
            symbol : "-",
            style : "money-reduce"
        }
    ];