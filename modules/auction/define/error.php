<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-3
 * Time: 下午7:58
 */
// 错误码从1100开始
Error::registerErrors(array(
    array('errDefine' => 'ERROR_AUCTION_NOT_FOUND', 'index' => 1100, 'errMsg' => '展品不存在！'),
    array('errDefine' => 'ERROR_PRICE_IS_ILLEGAL', 'errMsg' => '本次竞拍出价不在合理区间！'),
    array('errDefine' => 'ERROR_BIDDING_TIME_ILLEGAL', 'errMsg' => '当前时间不可竞拍该藏品！'),
    array('errDefine' => 'ERROR_BIDDING_HAS_TALLEST', 'errMsg' => '您已经是该藏品的最高出价者，无需再次竞拍！'),
    array('errDefine' => 'ERROR_MOD_AUCTION_FAILED', 'errMsg' => '修改展品信息出错！'),
    array('errDefine' => 'ERROR_CAN_NOT_RELEASE', 'errMsg' => '该商品正在上架无法再次发布！'),
    array('errDefine' => 'ERROR_AUCTION_ON', 'errMsg' => '该拍品正在上架无法修改，请先下架后修改！'),
    array('errDefine' => 'ERROR_HAS_BID', 'errMsg' => '该拍品已经有人竞拍，无法修改！'),
));