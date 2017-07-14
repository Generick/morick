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

define("API_COMMON_PAY", "http://api.99epay.net/mctrpc/order/mkReceiptOrder.htm");
define("API_WX_PUBLIC_PAY", "http://api.99epay.net/h5Pay/pub/toAcquireOrder.htm");

define("WX_APPID","wx8aa4883c737caaaa");
define("WX_MCHID","1272388901");
//第三方支付商户号以及秘钥
define('THIRD_MCHID','201025');
define('THIRD_APPSECRET','ec8ej6Vu7eOeEE6lCzP1gBWAxsHyDwEudBVPEanYgVmT0zcJzRPw');
define("WX_KEY","dbb9062df2fd9a7650fc5961da05129f");
define("WX_APPSECRET","620937dd20bdecf9e84f369d2ef64305");
define("NOTICE_URL","http://meeno.f3322.net:8082/auction/index.php/wx/WxCallback/notify");