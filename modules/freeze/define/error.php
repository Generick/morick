<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-19
 * Time: 下午9:04
 */
// 错误码从1500开始
Error::registerErrors(array(
    array('errDefine' => 'ERROR_FREEZE_TYPE', 'index' => 1500, 'errMsg' => '冻结类型出错！'),
    array('errDefine' => 'ERROR_HAS_FREEZE_AUCTION', 'errMsg' => '该拍品冻结金已扣除！'),
    array('errDefine' => 'ERROR_ADD_FREEZE_FAILED', 'errMsg' => '新增冻结出错！'),
));