<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 5/31/2017
 * Time: 2:46 PM
 */

Error::registerErrors(array(
    array('errDefine' => 'ERROR_ADD_COMMODITY_FAIL', 'index' => 2300, 'errMsg' => '添加商品失败！'),
    array('errDefine' => 'ERROR_NO_COMMODITY', 'errMsg' => '没有此商品！'),
    array('errDefine' => 'ERROR_STOCK_NUM_NOT_ENOUGH', 'errMsg' => '库存不足！'),
    array('errDefine' => 'ERROR_NOT_TMH_COMMODITY', 'errMsg' => '此商品不在特卖会中！'),
    array('errDefine' => 'ERROR_TIME_OUT', 'errMsg' => '订单超时'),
    array('errDefine' => 'ERROR_BUY_NUM_ERROR', 'errMsg' => '该商品只能购买一件!'),
    array('errDefine' => 'ERROR_HAS_UP', 'errMsg' => '此商品已上架!'),
));