<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-28
 * Time: 下午6:28
 */
class A_transaction extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_transaction");
    }

    function getTransactionList()
    {
        if(!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $whereArr = array();
        if(isset($_POST["userId"]) && (intval($this->input->post("userId")) != 0))
        {
            $whereArr["transaction.userId"] = intval($this->input->post("userId"));
        }

        if(isset($_POST["startTime"]))
        {
            $whereArr["transactionTime >= "] = intval($this->input->post("startTime"));
        }

        if(isset($_POST["endTime"]))
        {
            $whereArr["transactionTime <= "] = intval($this->input->post("endTime"));
        }

        if(isset($_POST["isAdmin"]) && (intval($this->input->post("isAdmin")) == 0))
        {
            $whereArr["transactionType >= "] = TRANSACTION_SYSTEM_ADD;
        }

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