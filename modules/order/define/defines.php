<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-12
 * Time: 下午4:02
 */

define("CACHE_PREFIX_ORDER",                CACHE_PREFIX . "order_");
define("CACHE_ORDER_LIVE_TIME",                   86400);

define('ORDER_CANCEL_TIME', 72*3600);//取消时长

define('ORDER_STATUS_CANCEL',               0);//已取消
define('ORDER_STATUS_WAIT_PAY',             1);//未支付
define('ORDER_STATUS_PAY',                  2);//已支付待发货
define('ORDER_STATUS_WAIT_RECEIVE',        3);//已发货待收货
define('ORDER_STATUS_RECEIVE',              4);//已收货 已完成

define('ORDER_TYPE_SMALL', 0);
define('ORDER_TYPE_BASE', 1);
define('ORDER_TYPE_ALL', 2);
//region 快递鸟
//电商ID
defined('EBusinessID') or define('EBusinessID', 1272007);
//电商加密私钥
defined('AppKey') or define('AppKey', 'e2242d70-8497-46a9-89e6-b6bd3a661a90');
//请求url
defined('ReqURL') or define('ReqURL', 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx');
//endregion