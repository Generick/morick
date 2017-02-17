<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-10
 * Time: 下午5:50
 */
class M_paidServices extends My_Model
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_user");
        $this->load->model("m_appconfig");
    }

    /**
     * 购买服务
     * @param $servicesInfo
     * @return mixed
     */
    function addPaidServices($servicesInfo)
    {
        if($this->m_common->get_one("paid_services", array("userId" => $servicesInfo["userId"], "serviceType" => $servicesInfo["serviceType"], "startTime <=" => now(), "endTime >=" => now())))
        {
            //已经有服务 无需继续购买
            return ERROR_SERVICE_HAS_PAID;
        }

        //判断是否余额足够
        $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $servicesInfo["userId"]);
        $payPrice = 0;
        $constants = $this->m_appconfig->getConfigData()->getClientData();
        switch($servicesInfo["serviceType"])
        {
            case SERVICE_SMS_MONTHLY:
                $payPrice = $constants->cfg_sms;
                break;
            case SERVICE_ENTRUST_MONTHLY:
                $payPrice = $constants->cfg_bids;
                break;
            default:
                return ERROR_SERVICES_NOT_EXIST;
                break;
        }

        //新增交易明细
        $this->load->model("m_transaction");
        $retCode = $this->m_transaction->addTransaction( $servicesInfo["userId"], TRANSACTION_SERVICE, $payPrice);
        if($retCode != ERROR_OK)
        {
            return $retCode;
        }

        $servicesInfo["startTime"] = now();
        $servicesInfo["endTime"] = now() + PAID_SERVICE_DURATION;

        if($this->m_common->insert("paid_services", $servicesInfo))
        {
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }

    /**
     * 获取指定用户的当前付费服务
     * @param $userId
     * @param $services
     */
    function getPaidServicesWithUserId($userId, &$services)
    {
        $services = $this->m_common->get_all("paid_services", array("userId" => $userId, "startTime <=" => now(), "endTime >=" => now()));
        return ERROR_OK;
    }

    /**
     * 获取拍卖服务列表
     * @param $startIndex
     * @param $num
     * @param array $whereArr
     * @param $paidServices
     * @param $count
     * @return mixed
     */
    function getPaidServices($startIndex, $num, $whereArr = array(), &$paidServices, &$count)
    {
        $this->db->start_cache();
        $this->db->select("*")->from("paid_services");
        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        $this->db->order_by("startTime desc");
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $paidServices = $this->db->get()->result_array();
        $this->db->flush_cache();
        return ERROR_OK;
    }
}