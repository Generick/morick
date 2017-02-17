<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-9
 * Time: 下午12:05
 */

// 错误码从2200开始
Error::registerErrors(array(
    array('errDefine' => 'ERROR_ADDRESS_NOT_FOUND', 'index' => 2200, 'errMsg' => '收货地址不存在！'),
    array('errDefine' => 'ERROR_MOD_ADDRESS_FAILED', 'errMsg' => '修改收货地址出错！'),
));