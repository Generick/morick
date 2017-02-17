<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-15
 * Time: 下午9:16
 */
class A_recharge extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_recharge");
    }

    /**
     * 充值统计
     */
    function rechargeStatistical()
    {
        if(!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $whereArr = array("rechargeStatus" => 1);

        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        if(isset($_POST["startTime"]))
        {
            $whereArr["rechargeTime >= "] = intval($this->input->post("startTime"));
        }

        if(isset($_POST["endTime"]))
        {
            $whereArr["rechargeTime <= "] = intval($this->input->post("endTime"));
        }

        $totalRecharge = 0;
        $count = 0;
        $rechargeList = array();

        $retCode = $this->m_recharge->rechargeStatistical($startIndex, $num, $whereArr, $totalRecharge, $count, $rechargeList);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $this->responseSuccess(array("totalRecharge" => $totalRecharge, "count" => $count, "rechargeList" => $rechargeList));
        return;
    }
}