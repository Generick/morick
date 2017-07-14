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
    array('errDefine' => 'ERROR_CALL_API', 'errMsg' => '支付接口调用失败'),
    array('errDefine' => 'ERROR_NO_CLIENT_TIME', 'errMsg' => '时间参数不能为空'),
    array('errDefine' => 'ERROR_NO_RETURN_URL', 'errMsg' => '跳转地址不能为空'),
    array('errDefine' => 'ERROR_MCH_ORDER_NO_NOT_NULL', 'errMsg' => '商户订号不能为空'),
    array('errDefine' => 'ERROR_CARD_NOT_BIG_THAN_MIAN', 'errMsg' => '卡支付金额不能大于面额'),
    array('errDefine' => 'ERROR_CARD_VERIFY_NOT_PAY', 'errMsg' => '卡正在验证中，不能支付其他订单'),
    array('errDefine' => 'ERROR_GOODS_NAME_LENGTH_ERROR', 'errMsg' => '商品名称长度有误'),
    array('errDefine' => 'ERROR_MCH_NOT_AUTH_PAY_TOOL', 'errMsg' => '商户未被授权使用的支付工具'),
    array('errDefine' => 'ERROR_MCH_NOT_ALLOW_CREATE_PAY_ORDER', 'errMsg' => '商户状态不允许创建收款订单'),
    array('errDefine' => 'ERROR_PAY_MONEY_LOW_THAN_REQUIRE_MONEY', 'errMsg' => '支付总额低于请求金额'),
    array('errDefine' => 'ERROR_SIGN_ERROR', 'errMsg' => '签名错误'),
    array('errDefine' => 'ERROR_MCH_NOT_ALLOW_CREATE_TUI', 'errMsg' => '商户状态不能发起退款请求'),
    array('errDefine' => 'ERROR_MCH_TIME_NOT_NULL', 'errMsg' => '商户时间不能为空'),
    array('errDefine' => 'ERROR_ORDER_MONEY_ILLEGAL', 'errMsg' => '订单金额不合法'),
    array('errDefine' => 'ERROR_PAY_MONEY_NOT_ILLEGAL', 'errMsg' => '支付金额不合法'),
    array('errDefine' => 'ERROR_PAY_RESULT_NOTICE_URL_NOT_NULL', 'errMsg' => '支付通知结果不能为空'),
    array('errDefine' => 'ERROR_GOOGS_NUM_ILLEGAL', 'errMsg' => '商品数量非法'),
    array('errDefine' => 'ERROR_CARD_BALANCE_NOT_ENOUGH', 'errMsg' => '卡余额不足'),
    array('errDefine' => 'ERROR_OTHER_EXCEPTION', 'errMsg' => '其他异常'),
    array('errDefine' => 'ERROR_API_RETURN_NULL', 'errMsg' => '支付接口返回为空'),
    array('errDefine' => 'ERROR_ORDER_GOODS_ERROR', 'errMsg' => '订单商品错误'),
    array('errDefine' => 'ERROR_TRADE_FAIL', 'errMsg' => '交易失败'),
));