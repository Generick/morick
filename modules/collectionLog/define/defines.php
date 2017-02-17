<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-26
 * Time: 下午9:11
 */

define('CALL_BACK_STATUS_NONE',     0);//不回调
define('CALL_BACK_STATUS_ADD',      1);//收藏回调
define('CALL_BACK_STATUS_REDUCE',   2);//取消收藏回调


define('COLLECTION_TYPE_AUCTION',  1);

$callBackFns = array(
    COLLECTION_TYPE_AUCTION => array("m_auction", "collectionCallBack"),//收藏资讯回调
    //...
);
define('COLLECTION_CALL_BACK_FNS', serialize($callBackFns));//收藏回调