<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-9
 * Time: 下午3:10
 */
$CI = &get_instance();

$CI->searchUserList = function($ctrl){
    if(!$ctrl->checkParam(array("userType", "startIndex", "num", "likeStr")))
    {
        $ctrl->responseError(ERROR_PARAM);
        return;
    }

    $userType = intval($ctrl->input->post("userType"));
    $startIndex = intval($ctrl->input->post("startIndex"));
    $num = intval($ctrl->input->post("num"));
    $likeStr = trim($ctrl->input->post("likeStr"));
    $userList = array();
    $count = 0;

    $errCode = $ctrl->m_admin->getUserList($userType, $startIndex, $num, $likeStr, $userList, $count);
    if ($errCode != ERROR_OK)
    {
        $ctrl->responseError($errCode);
        return;
    }

    $ctrl->responseSuccess(array("userList" => $userList, "count" => $count));
    return;
};

$CI->opBalance = function($ctrl){
    if(!$ctrl->checkParam(array("userId", "opType", "balance")))
    {
        $ctrl->responseError(ERROR_PARAM);
        return;
    }

    $ctrl->load->model("m_transaction");
    $ctrl->load->model("m_account");
    $userId = intval($ctrl->input->post("userId"));
    $opType = intval($ctrl->input->post("opType"));
    $balance = floatval($ctrl->input->post("balance"));

    $transactionType = TRANSACTION_SYSTEM_ADD;
    if($opType == 1)
    {
        $transactionType = TRANSACTION_SYSTEM_REDUCE;
    }

    $adminId = $ctrl->m_account->getSessionData('userId');

    $retCode = $ctrl->m_transaction->addTransaction($userId, $transactionType, $balance, $adminId);
    $ctrl->responseError($retCode);
    return;
};

/**
 * 获取基本统计信息
 * @param $ctrl
 */
$CI->getStatistics = function($ctrl){
    $statistics = array();
    $retCode = $ctrl->m_admin->getUserStatistics($statistics);
    if($retCode != ERROR_OK)
    {
        $ctrl->responseError($retCode);
        return;
    }

    //获取藏品数目
    $statistics["goodsNum"] = $ctrl->db->count_all_results("goods");

    //获取累计成交金额
    //$turnoverInfo = $ctrl->db->select_sum("goodsPrice")->from("order")->where(array("orderStatus >= " => ORDER_STATUS_PAY))->get()->result();//已支付
    $turnoverInfo = $ctrl->db->select_sum("goodsPrice")->from("order")->get()->result();//包含未支付
    $statistics["totalTurnover"] = $turnoverInfo[0]->goodsPrice;

    $ctrl->responseSuccess(array("statistics" => $statistics));
    return;
};