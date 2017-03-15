<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-9
 * Time: 下午12:05
 */

// 错误码从3100开始
Error::registerErrors(array(
    array('errDefine' => 'ERROR_GET_WEIXI_PREPAYINFO_FAILED', 'index' => 3100, 'errMsg' => '获取微信预支付信息失败！'),
    array('errDefine' => 'ERROR_RECHARGE_NOT_FOUNT', 'errMsg' => '充值信息不存在!'),
    array('errDefine' => 'ERROR_RECHARGE_HAS_DEAL', 'errMsg' => '充值信息已处理!'),
    array('errDefine' => 'ERROR_RECHARGE_MONEY_ERROR', 'errMsg' => '充值金额必须大于0!'),
));