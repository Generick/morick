<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/26/2017
 * Time: 8:49 PM
 */
class Order extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_order');
    }
    //test pay
    function continuePayTest()
    {
        $openId = $this->input->post('openId');
        $res = array();
        $ret = $this->m_order->continuePayTest($openId, $res);
        if ($ret !== ERROR_OK)
        {
            $this->responseError($ret);
            return;
        }
        $this->responseSuccess($res);
    }

    function userOrderStatistics()
    {
        $this->load->model('m_promoter');
        $userIds = $this->db->select('userId')->where(array('PMTID >' => 0))->get('user')->result_array();
        if (empty($userIds)) return;
        foreach ($userIds as $v) 
        {
            if ($v['userId'] == 15) continue;
            $this->m_promoter->updateUserOrderStatistics($v['userId']);
        }
    }
}