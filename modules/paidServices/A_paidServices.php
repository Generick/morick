<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-12
 * Time: 上午11:49
 */
class A_paidServices extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_paidServices");
    }

    /**
     * 获取个人付费服务
     */
    function getPersonalPaidServices()
    {
        if(!$this->checkParam(array("userId", "startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $whereArr["userId"] = intval($this->input->post("userId"));
        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $paidServices = array();
        $count = 0;

        $retCode = $this->m_paidServices->getPaidServices($startIndex, $num, $whereArr, $paidServices, $count);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $this->responseSuccess(array("paidServices" => $paidServices, "count" => $count));
        return;
    }
}