<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/9/2017
 * Time: 4:27 PM
 */

define("MP_QUIZAWARD","恭喜您，您参与的成交价竞猜获奖了。");
define("MP_QUIZAWARD_TITLE","竞猜获奖提醒");
define("MP_AUCTIONOBTAIN","恭喜捡漏，您参与的竞拍成交了。");
define("MP_AUCTIONOBTAIN_TITLE","成交提醒");
define("MP_ORDERSTATUS","您好，您的拍品已经发货，请注意查收。");
define("MP_ORDERSTATUS_TITLE","发货通知");
define("MP_COMMODITY","恭喜您，商品购买成功！");
define("MP_COMMODITY_TITLE","商品购买提醒！");
define("MP_COMMODITY_STATUS_TITLE","发货通知！");
define("MP_COMMODITY_STATUS","您好，您的商品已经发货，请注意查收！");
define("MP_RECEIVED_TITLE","收货通知！");
define("MP_RECEIVED","您好，您的商品已经收货！");
define("MP_PAY_SUCCESS","恭喜您，您的商品订单支付成功");
define("MP_PAY_SUCCESS_TITLE","支付成功");
define("MP_PAY_FAIL","抱歉，您的商品订单支付失败");
define("MP_PAY_FAIL_TITLE","支付失败");

define("MP_MSG_TYPE_SYS",0);//系统消息
define("MP_MSG_TYPE_QUIZ",1);//竞猜得
define("MP_MSG_TYPE_AUCTION",2);//拍品获拍
define("MP_MSG_TYPE_ORDER",3);//订单状态改变,发货
define("MP_MSG_TYPE_COMMODITY",4);//商品购买成功
define("MP_MSG_TYPE_COMMODITY_ORDER",5);//商品订单改变，发货
define("MP_MSG_TYPE_RECEIVED",6);//已收货
define("MP_MSG_TYPE_PAY_SUCCESS",7);//支付成功
define("MP_MSG_TYPE_PAY_FAIL",8);//支付失败

define("MP_PUSH_TYPE_NOT_VIP",0);//推送给非vip用户
define("MP_PUSH_TYPE_VIP",1);//推送给vip用户
define("MP_PUSH_TYPE_ALL",2);//推送给全部用户
define("MP_PUSH_TYPE_SINGLE",3);//推送给个人用户