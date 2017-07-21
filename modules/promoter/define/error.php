<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/17/2017
 * Time: 11:02 AM
 */
Error::registerErrors(array(
    array('errDefine' => 'ERROR_CHECK_BILL_FAIL', 'index' => 49100, 'errMsg' => "结账失败。"),
    array('errDefine' => 'ERROR_NO_PROMOTER', 'errMsg' => "没有此推广员。"),
    array('errDefine' => 'ERROR_CONDITION_ERROR', 'errMsg' => "分成参数错误。"),
    array('errDefine' => 'ERROR_ADD_CONDITION_FAIL', 'errMsg' => "添加分成条件错误。"),
    array('errDefine' => 'ERROR_NO_CONDITION', 'errMsg' => "没有此分成条件。"),
    array('errDefine' => 'ERROR_DEL_CONDITION_FAIL', 'errMsg' => "删除分成条件失败"),
    array('errDefine' => 'ERROR_NO_FRIENDS', 'errMsg' => "您还没有好友。"),
    array('errDefine' => 'ERROR_PMT_DELETE', 'errMsg' => "此推广员账号已被删除。"),
    array('errDefine' => 'ERROR_CONDITION_RATE_ERROR', 'errMsg' => "分成比例错误。"),
    array('errDefine' => 'ERROR_CHECK_AMOUNT_ERROR', 'errMsg' => "结账金额不能为0"),
));