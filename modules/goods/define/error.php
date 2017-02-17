<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-9
 * Time: 下午12:05
 */

// 错误码从1200开始
Error::registerErrors(array(
    array('errDefine' => 'ERROR_GOODS_NOT_FOUND', 'index' => 1200, 'errMsg' => '商品不存在！'),
    array('errDefine' => 'ERROR_MOD_GOODS_FAILED', 'errMsg' => '修改商品信息出错！'),
    array('errDefine' => 'ERROR_CREATE_GOODS_BAK_FAILED', 'errMsg' => '创建商品快照出错！'),
));