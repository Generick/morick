<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-10
 * Time: 下午4:56
 */
class U_transaction extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_transaction");
        $this->load->model("m_user");
    }

    /**
     * 获取交易记录明细
     */
    function getTransactionList()
    {
        if(!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));
        $whereArr = array("userId" => $this->m_user->getSelfUserId());

        $transactionList = array();
        $count = 0;

        $retCode = $this->m_transaction->getTransactionList($startIndex, $num, $whereArr, $transactionList, $count);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $this->responseSuccess(array("transactionList" => $transactionList, "count" => $count));
        return;
    }
}