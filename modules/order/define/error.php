<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-12
 * Time: 下午4:02
 */


// 错误码从3000开始
Error::registerErrors(array(
    array('errDefine' => 'ERROR_ORDER_NOT_FOUND', 'index' => 3000, 'errMsg' => '订单不存在！'),
    array('errDefine' => 'ERROR_MOD_ORDER_FAILED', 'errMsg' => '修改订单信息出错！'),
    array('errDefine' => 'ERROR_ADDRESS_NOT_EXIST', 'errMsg' => '订单没有填写收货信息！'),
    array('errDefine' => 'ERROR_INSERT_ORDER_FAILED', 'errMsg' => '订单创建失败！'),
    array('errDefine' => 'ERROR_TRACE_NOT_FOUND', 'errMsg' => '此单无物流信息！'),
));