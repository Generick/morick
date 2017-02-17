<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-26
 * Time: 下午8:19
 */

//region 阅读
define('READ_TYPE_AUCTION',  1);

$callBackFns = array(
    READ_TYPE_AUCTION => array("m_auction", "readCallBack"),//浏览拍品
    //...
);
define('READ_CALL_BACK_FNS', serialize($callBackFns));//浏览回调

$readObjArr = array(
    READ_TYPE_AUCTION => array("m_auction", "getAuctionBase"),//获取浏览对象
    //...
);
define('READ_OBJ_ARR', serialize($readObjArr));//浏览对象获取
//endregion