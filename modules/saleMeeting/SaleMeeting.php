<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 5/31/2017
 * Time: 2:45 PM
 */

class saleMeeting extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_saleMeeting');
    }

    //获取特卖会商品信息
    function getTMHCommodityInfo()
    {
    	if (!$this->checkParam(array('commodity_id'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$commodity_id = $this->input->post('commodity_id');
    	$data = $this->m_saleMeeting->getTMHCommodityInfo($commodity_id);
    	$this->responseSuccess(array('info' => $data));
    }

    //获取特卖会商品列表
    function getTMHList()
    {
    	if (!$this->checkParam(array('startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$fields = $this->input->post('fields');

    	$whr = array('sale_meeting.is_delete' => DELETE_NO, 'commodity.is_up' => UP_ON);

    	$data = array();
    	$count = 0;
    	$this->m_saleMeeting->getTMHList($startIndex, $num, $whr, $fields, $data, $count);
    	$this->responseSuccess(array('TMHList' => $data, 'count' => $count));
    }
}