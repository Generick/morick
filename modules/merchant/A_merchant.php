<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/11/2017
 * Time: 11:54 AM
 */

class A_merchant extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_merchant');
    }

    //添加商户账号
    function addMCH()
    {
    	if (!$this->checkParam(array('accountName', 'password', 'name'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$accountName = $this->input->post('accountName');
    	$password = $this->input->post('password');
    	$name = $this->input->post('name');
    	$res = $this->m_merchant->addMCH($accountName, $password, $name);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //管理员修改商户账号密码
    function modMCHPWD()
    {
    	if (!$this->checkParam(array('accountName', 'newPWD'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$accountName = $this->input->post('accountName');
    	$newPWD = $this->input->post('newPWD');
    	$res = $this->m_merchant->modMCHPWD($accountName, $newPWD);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //商户账号列表
    function getMCHList()
    {
    	if (!$this->checkParam(array('startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$whr = array('is_delete !=' => DELETE_YES);
    	$data = array();
    	$count = 0;
    	$this->m_merchant->getMCHList($startIndex, $num, $whr, $data, $count);
    	$this->responseSuccess(array('MCHList' => $data, 'count' => $count));
    }

    //删除商户账号
    function delMCH()
    {
    	if (!$this->checkParam(array('ids'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$ids = $this->input->post('ids');
    	$ids = is_array($ids)?$ids:json_decode($ids, true);
    	foreach ($ids as $v) 
    	{
    		$res = $this->m_merchant->delMCH($v);
    	}
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //管理员获取商户商品详情
    function getMCHCommodityInfo()
    {
    	if (!$this->checkParam(array('commodity_id'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$commodity_id = $this->input->post('commodity_id');
    	$data = $this->m_merchant->getCommodityInfo($commodity_id);
    	$this->responseSuccess($data);
    }

    //管理员获取商户请求列表
    function getRequestList()
    {
    	if (!$this->checkParam(array('startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$whr = array('is_delete' => DELETE_NO);
    	$count = 0;
    	$data = array();
    	$this->m_merchant->getRequestList($startIndex, $num, $whr, $data, $count);
    	$this->responseSuccess(array('requestList' => $data, 'count' => $count));
    }

    //管理员处理商户请求
    function adminHandleRequest()
    {
    	if (!$this->checkParam(array('id', 'handleResult'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$id = $this->input->post('id');
    	$handleResult = $this->input->post('handleResult');
    	$res = $this->m_merchant->adminHandleRequest($id, $handleResult);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //管理员删除请求列表
    function adminDelRequest()
    {
    	if (!$this->checkParam(array('ids'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$ids = $this->input->post('ids');
    	$ids = is_array($ids)?$ids:json_decode($ids, true);
    	foreach ($ids as $v) 
    	{
    		$res = $this->m_merchant->adminDelRequest($v);
    	}
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //管理员在请求列表中修改保存并同意
    function adminSaveCInfoInRequest()
    {
    	if (!$this->checkParam(array('id', 'info'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$id = $this->input->post('id');
    	$info = $this->input->post('info');
    	$info = is_array($info)?$info:json_decode($info, true);
    	$info['commodity_pic'] = is_array($info['commodity_pic'])?json_encode($info['commodity_pic']):$info['commodity_pic'];
    	$data = $this->m_merchant->adminSaveCInfoInRequest($id, $info);
    	if ($data !== ERROR_OK) 
    	{
    		$this->responseError($data);
    		return;
    	}
    	$this->responseSuccess($data);
    }
}