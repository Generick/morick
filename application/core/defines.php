<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: hum
 * Date: 16/3/22
 * Time: 下午6:08
 */

// 用于memcache的前缀
define('CACHE_PREFIX',              'mn_');
define("CACHE_PREFIX_USER",                CACHE_PREFIX . "user_");
define("CACHE_PREFIX_CONFIG_DATA",          CACHE_PREFIX . "cfg");
define("CACHE_LIVE_TIME",                   86400);

define('FILE_CACHE_DURATION',       1);
define('CHECK_SIGN',            '94b5ee95c7faf034a3d4f0dbe3f59fa4');
define('ACCOUNT_PASSWORD_ENCRYPTION_KEY', '7251426da5c25d390d665458f3a21ac0');
define('OPEN_CHECK_SIGN',           false);
define('TOKEN_AVAILABLE_TIME',      864000);
define('ORDER_TIMEOUT_DURATION',    1 * 24 * 3600);     // 订单失效时间：天

// 路径和URL
define('PATH_UPLOADS',              'uploads/');
define('PATH_UPLOAD_PHOTO',              PATH_UPLOADS . "photo/");
define('PATH_UPLOAD_VIDEO',              PATH_UPLOADS . "video/");
define('PATH_UPLOAD_OTHER',              PATH_UPLOADS . "other/");

// 账号类型(自增账号数表也会用此值)
define('USER_TYPE_USER',             1);//普通用户
define('USER_TYPE_ADMIN',            2);//管理员

// 管理员类型
define('ADMIN_TYPE_SUPER',         0); // 超级管理员
define('ADMIN_TYPE_NORMAL',        1); // 普通管理员

// 登录平台类型
define('PLATFORM_TYPE_SELF',       1);
define('PLATFORM_TYPE_WX',         2);
define('PLATFORM_TYPE_QQ',         3);
define('PLATFORM_TYPE_WB',         4);
define('PLATFORM_TYPE_SMS',        5);//短信验证码登录

//短信类型
define('SMS_CODE_TYPE_REGISTER', 1);        // 短信验证码注册用途
define('SMS_CODE_TYPE_LOGIN', 2);// 短信验证码登录用途
define('SMS_CODE_TYPE_CHANGE_PASSWORD', 3);// 短信验证码修改密码用途

define('MOBILE_CODE',          "【雅玩之家】您本次登录验证码是{0}，一分钟内有效。");//注册

define('SMS_BEYOND_PRICE',   "【雅玩之家】您的出价已被超越，“{0}”，当前价格{1}元，再次出价请登录「雅玩之家」");
define('SMS_OBTAIN',    "【雅玩之家】恭喜您拍得“{0}”，落槌价{1}元。付款请登录「雅玩之家」");
define('SMS_NEAR_END', "【雅玩之家】您出价的“{0}”快要截拍了，当前出价{1}元，详情请登录「雅玩之家」");

define('SMS_REMIND_INTERVAL',   86400);//出价被超越提醒间隔

define('MOBILE_CODE_INTERVAL',   60);//手机验证码间隔时间 小于该时间会出错
define('MOBILE_CODE_ACTIVE',  600);//手机验证码活跃时间
define('MOBILE_CODE_USER_ID',    "1111");//企业ID 目前没有具体意义
define('MOBILE_CODE_ACCOUNT',   "jksc697");//账号名
define('MOBILE_CODE_PASSWORD',  "785115");//密码

//账户状态
define('ACCOUNT_STATUS_OK', 0);//正常
define('ACCOUNT_STATUS_FORBIDDEN', 1);//封号
define('ACCOUNT_STATUS_DEL',    2);//删除

// 增删操作
define('OP_TYPE_ADD',              1);
define('OP_TYPE_DEL',              2);




