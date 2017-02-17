<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-26
 * Time: 下午8:19
 */

//region 分享
define('SHARE_PLATFORM_QQ',  1);//QQ
define('SHARE_PLATFORM_WX',  2);//微信
define('SHARE_PLATFORM_WB',  3);//微博

define('SHARE_TYPE_AUCTION',  1);

$callBackFns = array(
    SHARE_TYPE_AUCTION => array("m_auction", "shareCallBack"),//分享资讯回调
    //...
);
define('SHARE_CALL_BACK_FNS', serialize($callBackFns));//分享回调
//endregion