<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-19
 * Time: 下午3:24
 */
class U_paidServices extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_paidServices");
        $this->load->model("m_user");
    }

    /**
     * 开通包月服务
     */
    function paidServices()
    {
        if(!$this->checkParam(array("serviceType")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $this->load->model("m_user");

        $serviceInfo = array();
        $serviceInfo["serviceType"] = intval($this->input->post("serviceType"));
        $serviceInfo["userId"] = $this->m_user->getSelfUserId();

        $retCode = $this->m_paidServices->addPaidServices($serviceInfo);
        $this->responseError($retCode);
        return;
    }

    /**
     * 获取个人包月服务
     */
    function getSelfPaidServices()
    {
        $userId = $this->m_user->getSelfUserId();
        $services = array();
        $retCode = $this->m_paidServices->getPaidServicesWithUserId($userId, $services);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }
        $this->responseSuccess(array("services" => $services));
        return;
    }
}