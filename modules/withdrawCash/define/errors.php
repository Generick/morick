<?php 


// 错误码从10000开始
Error::registerErrors(array(
    array('errDefine' => 'ERROR_WC_BALANCE_NOT_ENOUGH', 'index' => 10000, 'errMsg' => '余额不足，请重新填写提现金额'),
    array('errDefine' => 'ERROR_WITHDRAW_NOT_FOUND', 'errMsg'=>'提现记录没找到'),
));