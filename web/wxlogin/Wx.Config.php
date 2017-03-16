<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 16-8-29
 * Time: 下午12:06
 */

define('APPID','wx8aa4883c737caaaa');
define('APPSERCET','620937dd20bdecf9e84f369d2ef64305');
//define("BASE_URL","http://meeno.f3322.net:8082/education/index.php/");
//define("BASE_URL","http://family.onesmart.org/server/index.php/");
define("API_GET_OPEN_ID","https://api.weixin.qq.com/sns/oauth2/access_token?appid=".APPID."&secret=".APPSERCET."&code={0}&grant_type=authorization_code");
define("API_GET_USER_INFO","https://api.weixin.qq.com/sns/userinfo?access_token={0}&openid={1}&lang=zh_CN");

define("URL_WX_PAY","http://mc.meeno.net/aution/wxpay/src/jsapi.php");
