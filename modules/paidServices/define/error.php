<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-3
 * Time: 下午7:58
 */
// 错误码从2100开始
Error::registerErrors(array(
    array('errDefine' => 'ERROR_SERVICE_HAS_PAID', 'index' => 2100, 'errMsg' => '已购买服务无需重新购买！'),
    array('errDefine' => 'ERROR_NO_PAID_SERVICES', 'errMsg' => '未开通包月服务！'),
    array('errDefine' => 'ERROR_MAX_PAID_SERVICES', 'errMsg' => '委托出价已达上限！'),
    array('errDefine' => 'ERROR_SERVICES_NOT_EXIST', 'errMsg' => '包月类型出错！')
));