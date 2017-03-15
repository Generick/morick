<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-15
 * Time: 下午9:17
 */
class M_recharge extends My_Model
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('Wxpay');
    }

    /**
     * 充值
     * @param $rechargeData
     * @param $rechargeInfo
     * @return mixed
     */
    function recharge($rechargeData, &$rechargeInfo)
    {
        $rechargeData["rechargeId"] =  "cz". date('Ymd') .rand(100000, 999999);
        /*
        $rechargeData['prepayInfo'] = $this->wxpay->getPrepayInfo($rechargeData["rechargeId"], $rechargeData['price'] * 100);//微信是1分，支付宝是1块 （获取微信预支付信息）
        if(empty($rechargeData['prepayInfo']))
        {
            return ERROR_GET_WEIXI_PREPAYINFO_FAILED;
        }
        */

        //订单信息插入数据库
        $this->m_common->insert("recharge", $rechargeData);

        //返回微信预支付信息
        //$rechargeInfo['prepayInfo'] = $rechargeData['prepayInfo'];//微信预支付信息
        $rechargeInfo['rechargeId'] = $rechargeData['rechargeId'];//订单id
        $rechargeInfo["price"] = $rechargeData["price"];

        return ERROR_OK;
    }

    /**
     * 充值成功
     * @param $rechargeId
     * @return mixed
     */
    function rechargeSuccess($rechargeId)
    {
        $rechargeObj = $this->m_common->get_one("recharge", array("rechargeId" => $rechargeId));

        if(!$rechargeObj)
        {
            return ERROR_RECHARGE_NOT_FOUNT;
        }

        if($rechargeObj["rechargeStatus"] == 1)
        {
            return ERROR_RECHARGE_HAS_DEAL;
        }
        else
        {
            $this->load->model("m_transaction");
            $retCode = $this->m_transaction->addTransaction($rechargeObj["userId"], TRANSACTION_RECHARGE, $rechargeObj["price"]);
            if($retCode != ERROR_OK)
            {
                return $retCode;
            }
            else
            {
                if(!$this->m_common->update("recharge",array("rechargeStatus" => 1), array("rechargeId" => $rechargeId)))
                {
                    return ERROR_SYSTEM;
                }
            }
        }
        return ERROR_OK;
    }

    /**
     * 充值统计
     * @param $startIndex
     * @param $num
     * @param $whereArr
     * @param $totalRecharge
     * @param $count
     * @param $rechargeList
     * @return mixed
     */
    function rechargeStatistical($startIndex, $num, $whereArr, &$totalRecharge, &$count, &$rechargeList)
    {
        $this->db->select_sum("price")->from("recharge");
        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }
        $ret = $this->db->get()->result();
        $totalRecharge = $ret[0]->price ?  $ret[0]->price : 0;


        $this->getRechargeList($startIndex, $num, $whereArr, $rechargeList, $count);

        return ERROR_OK;
    }

    /**
     * 获取充值列表
     * @param $startIndex
     * @param $num
     * @param array $whereArr
     * @param $rechargeList
     * @param $count
     * @return mixed
     */
    function getRechargeList($startIndex, $num, $whereArr = array(), &$rechargeList, &$count)
    {
        $this->db->start_cache();
        $this->db->select("recharge.*, name, smallIcon, telephone")->from("recharge");
        $this->db->join("user", "user.userId = recharge.userId");
        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $this->db->order_by("rechargeTime desc");
        $rechargeList = $this->db->get()->result_array();
        $this->db->flush_cache();
        return ERROR_OK;
    }
}