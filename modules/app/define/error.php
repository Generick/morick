<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-3
 * Time: 下午7:58
 */

// 错误码从800开始
Error::registerErrors(array(
    array('errDefine' => 'ERROR_BALANCE_NOT_ENOUGH', 'index' => 800, 'errMsg' => '余额不足！'),
));