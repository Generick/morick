<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-13
 * Time: 下午2:05
 */
$CI = &get_instance();

$CI->getPersonalData = function($ctrl){
    $userObj = $ctrl->m_user->getSelfUserObj();
    $ctrl->load->model("m_shippingAddress");

    $whereArr["userId"] = $userObj->userId;
    $shippingAddressList = array();
    $count = 0;
    $retCode = call_user_func_array(array(&$ctrl->m_shippingAddress, 'getShippingAddress'), array(0, 1, $whereArr, &$shippingAddressList, &$count));
    if($retCode != ERROR_OK)
    {
        $ctrl->responseError($retCode);
        return;
    }

    $bindInfo = array();
    $retCode = call_user_func_array(array(&$ctrl->m_user, 'getBindInfo'), array($userObj->userId, &$bindInfo));
    if($retCode != ERROR_OK)
    {
        $ctrl->responseError($retCode);
        return;
    }

    $data = array(
        "smallIcon" => $userObj->smallIcon,
        "name" => $userObj->name,
        "gender" => $userObj->gender,
        "telephone" => $userObj->telephone,
        "shippingAddress" => $shippingAddressList,
        "bindInfo" => $bindInfo
    );

    $ctrl->responseSuccess($data);
};

$CI->getBindInfo = function($ctrl){
    $userObj = $ctrl->m_user->getSelfUserObj();
    $bindInfo = array();
    $retCode = call_user_func_array(array(&$ctrl->m_user, 'getBindInfo'), array($userObj->userId, &$bindInfo));
    if($retCode != ERROR_OK)
    {
        $ctrl->responseError($retCode);
        return;
    }
    $ctrl->responseSuccess(array("bindInfo" => $bindInfo));
    return;
};

$CI->bindAccount = function($ctrl){
    if(!$ctrl->checkParam(array("bindType", "bindAccount")))
    {
        $ctrl->responseError(ERROR_PARAM);
        return;
    }
    $userObj = $ctrl->m_user->getSelfUserObj();
    $bindData = array(
        "userId" => $userObj->userId,
        "bindType" => $ctrl->input->post("bindType"),
        "bindAccount" => $ctrl->input->post("bindAccount"),
        "bindTime" => now(),
    );
    $retCode = $ctrl->m_user->bindAccount($bindData);
    $ctrl->responseError($retCode);
    return;
};
