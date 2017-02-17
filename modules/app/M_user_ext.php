<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-13
 * Time: 下午2:12
 */
$CI = get_instance();
$model = $CI->m_user;

$model->getBindInfo = function($userId, &$bindInfo)
{
    $bindInfo = get_instance()->m_common->get_all("bind_logs", array("userId" => $userId));
    return ERROR_OK;
};

$model->bindAccount = function($bindData){
    $result = get_instance()->m_common->get_one("bind_logs", array("userId" => $bindData["userId"], "bindType" => $bindData["bindType"]));
    if($result)
    {
        //update
        if(get_instance()->m_common->update("bind_logs", $bindData, array("userId" => $bindData["userId"], "bindType" => $bindData["bindType"])))
        {
            return ERROR_OK;
        }
    }
    else
    {
        if(get_instance()->m_common->insert("bind_logs", $bindData))
        {
            return ERROR_OK;
        }
    }
    return ERROR_SYSTEM;
};