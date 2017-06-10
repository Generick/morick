<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 5/31/2017
 * Time: 2:44 PM
 */

class A_saleMeeting extends Admin_Controller
{
	
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_saleMeeting');
    }

    //添加商品
    function addCommodity()
    {
    	if (!$this->checkParam(array('info'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}

    	$info = $this->input->post('info');
    	$info = json_decode($info, true);
        $info['commodity_pic'] = is_array($info['commodity_pic']) ? json_encode($info['commodity_pic'], true) : $info['commodity_pic'];
        $pic = json_decode($info['commodity_pic'], true);
    	$info['add_time'] = time();
    	$res = $this->m_saleMeeting->addCommodity($info);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //获取商品列表
    function getCommodities()
    {
    	if (!$this->checkParam(array('startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$is_up = $this->input->post('is_up');
    	$fields = $this->input->post('fields');
    	$whr = array();
    	$whr['is_delete'] = DELETE_NO;
    	if ($is_up != null) 
    	{
    		$whr['is_up'] = $is_up;
    	}

    	$data = array();
    	$count = 0;
    	$this->m_saleMeeting->getCommodities($startIndex, $num, $whr, $fields, $data, $count);
    	$this->responseSuccess(array('commodityList' => $data, 'count' => $count));
    }

    //获取上架的商品
    function getUpCommodities()
    {
    	if (!$this->checkParam(array('startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$fields = $this->input->post('fields');
    	$whr = array();
    	$whr['is_delete'] = DELETE_NO;
    	$whr['is_up'] = UP_ON;

    	$data = array();
    	$count = 0;
    	$this->m_saleMeeting->getUpCommodities($startIndex, $num, $whr, $fields, $data, $count);
    	$this->responseSuccess(array('UpCommodityList' => $data, 'count' => $count));
    }


    //删除商品
    function delCommodity()
    {
    	if (!$this->checkParam(array('ids'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$ids = json_decode($this->input->post('ids'), true);
    	$data = array();
    	foreach ($ids as $v) 
    	{
    		$data[] = $this->m_saleMeeting->delCommodity($v);
    	}

    	$this->responseSuccess(array('res' => $data));
    }

    //修改商品
    function modCommodity()
    {
    	if (!$this->checkParam(array('id', 'modInfo'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$modInfo = json_decode($this->input->post('modInfo'), true);
        $modInfo['commodity_pic'] = json_encode($modInfo['commodity_pic']) ? json_encode($modInfo['commodity_pic'], true) : $modInfo['commodity_pic'];
    	$id = $this->input->post('id');
    	$res = $this->m_saleMeeting->modCommodity($id, $modInfo);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //上架商品到特卖会
    function upCommodityToTMH()
    {
    	if (!$this->checkParam(array('ids'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$ids = $this->input->post('ids');
        $ids = json_decode($ids, true);
        foreach ($ids as $v) 
        {
            $res = $this->m_saleMeeting->upCommodityToTMH($v);
        }
    	
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //上架商品
    function upCommodity()
    {
        if (!$this->checkParam(array('id', 'is_up'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $id = $this->input->post('id');
        $is_up = $this->input->post('is_up');
        $res = $this->m_saleMeeting->upCommodity($id, $is_up);
        if ($res !== ERROR_OK) 
        {
            $this->responseError($res);
            return;
        }
        $this->responseSuccess($res);
    }

    //商品删除记录
    function commodityDelRec()
    {
        if (!$this->checkParam(array('startIndex', 'num'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $startIndex = $this->input->post('startIndex');
        $num = $this->input->post('num');
        $startTime = $this->input->post('startTime');
        $endTime = $this->input->post('endTime');

        $whr = array();
        if (!empty($startTime) && !empty($endTime)) 
        {
            $whr['delete_time >='] = $startTime;
            $whr['delete_time <='] = $endTime;
        }

        $data = array();
        $count = 0;
        $this->m_saleMeeting->commodityDelRec($startIndex, $num, $whr, $data, $count);
        $this->responseSuccess(array('delList' => $data, 'count' => $count));
    }

    //商品销售记录
    function saleRecord()
    {
        if (!$this->checkParam(array('startIndex', 'num'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $startIndex = $this->input->post('startIndex');
        $num = $this->input->post('num');
        $startTime = $this->input->post('startTime');
        $endTime = $this->input->post('endTime');
        $fields = $this->input->post('fields');
        $whr = array();
        if (!empty($startTime) && !empty($endTime)) 
        {
            $whr['sale_time >='] = $startTime;
            $whr['sale_time <='] = $endTime;
        }

        $data = array();
        $count = 0;
        $total = 0;
        $this->m_saleMeeting->saleRecord($startIndex, $num, $whr, $data, $count, $total, $fields);
        $this->responseSuccess(array('saleList' => $data, 'count' => $count, 'total' => $total));
    }

    //获取商品信息
    function getCommodityInfo()
    {
    	if (!$this->checkParam(array('id'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$id = $this->input->post('id');
    	$data = $this->m_saleMeeting->getCommodityInfo($id);
    	$this->responseSuccess(array('info' => $data));
    }

    //特卖会

    //删除特卖会中的商品
    function delTMH()
    {
    	if (!$this->checkParam(array('commodity_ids'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $commodity_ids = $this->input->post('commodity_ids');
        $commodity_ids = json_decode($commodity_ids, true);
        foreach ($commodity_ids as $v) 
        {
           $res = $this->m_saleMeeting->delTMH($v); 
        }
        
        if ($res !== ERROR_OK) 
        {
            $this->responseError($res);
            return;
        }
        $this->responseSuccess($res);
    }


}