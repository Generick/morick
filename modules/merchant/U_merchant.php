<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/11/2017
 * Time: 11:48 AM
 */

class U_merchant extends Mch_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_merchant');
        $this->load->model('m_messagePush');
    }

    //获取商户商品信息
    function getCommodifyInfo()
    {
    	if (!$this->checkParam(array('commodity_id'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$commodity_id = $this->input->post('commodity_id');
    	$data = $this->m_merchant->getCommodityInfo($commodity_id);
    	$this->responseSuccess(array('commodityInfo' => $data));
    }

    //商户获取商品列表
    function getCommodities()
    {
    	if (!$this->checkParam(array('startIndex', 'num', 'userId'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$userId = $this->input->post('userId');
    	$whr = array('userId' => $userId, 'mch_is_delete !=' => DELETE_YES);
    	$data = array();
    	$count = 0;
    	$this->m_merchant->getCommodities($startIndex, $num, $whr, $data, $count);
    	$this->responseSuccess(array('commodityList' => $data, 'count' => $count));
    }

    //商户添加商品
    function addCommodity()
    {
    	if (!$this->checkParam(array('info', 'userId'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$info = $this->input->post('info');
    	$info = is_array($info)?$info:json_decode($info, true);
    	$info['mch_commodity_pic'] = is_array($info['mch_commodity_pic']) ? json_encode($info['mch_commodity_pic']) : $info['mch_commodity_pic'];
    	$info['mch_add_time'] = time();
    	$info['userId'] = $userId;
    	$info['mch_annualized_return'] = 20;
    	$res = $this->m_merchant->addCommodity($info);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //商户修改商品
    function modCommodity()
    {
    	if (!$this->checkParam(array('commodity_id', 'modInfo'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$commodity_id = $this->input->post('commodity_id');
    	$modInfo = $this->input->post('modInfo');
    	$modInfo = is_array($modInfo)?$modInfo:json_decode($modInfo, true);
    	$res = $this->m_merchant->modCommodity($commodity_id, $modInfo);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //商户删除商品
    function delCommodity()
    {
    	if (!$this->checkParam(array('commodity_id'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$commodity_id = $this->input->post('commodity_id');
    	$res = $this->m_merchant->delCommodity($commodity_id);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //商户请求接口(请求上架，请求下架，请求更新)
    function merchantRequest()
    {
    	if (!$this->checkParam(array('commodity_id', 'requestType', 'userId'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$commodity_id = $this->input->post('commodity_id');
    	$requestType = $this->input->post('requestType');
    	$userId = $this->input->post('userId');
    	$res = $this->m_merchant->merchantRequest($commodity_id, $requestType, $userId);
    	if ($res !== ERROR_PARAM) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //商户获取未读消息列表
    function getUnReadMSGList()
    {
    	if (!$this->checkParam(array('userId', 'startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');

    	$whr = array();
        $or_whr = array('user_id' => $userId);
        $data = array();
        $count = 0;
        $this->m_messagePush->getUnReadMSG($startIndex, $num, $whr, $or_whr, $data, $count);
        $this->responseSuccess(array('msgList' => $data, 'count' => $count));
    }

    //商户获取已读消息列表
    function getHasReadMSGList()
    {
    	if (!$this->checkParam(array('userId', 'startIndex', 'num'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $userId = $this->input->post('userId');
        $startIndex = $this->input->post('startIndex');
        $num = $this->input->post('num');

        $whr = array('usermsglog.user_id' => $userId);

        $data = array();
        $count = 0;
        $this->m_messagePush->getHasReadMSG($startIndex, $num, $whr, $data, $count);
        $this->responseSuccess(array('msgList' => $data, 'count' => $count));
    }

    //商户获取消息内容
    function viewMSG()
    {
    	if (!$this->checkParam(array('userId', 'msg_id'))) 
        {
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$msg_id = $this->input->post('msg_id');
    	$userId = $this->input->post('userId');
        $data = array();
    	$res = $this->m_messagePush->viewMsg($userId, $msg_id, $data);
    	$this->responseSuccess($data);
    }

    //获取商户未读消息数
    function getMCHUnReadNum()
    {
    	if (!$this->checkParam(array('userId'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$whr = array();
        $or_whr = array('user_id' => $userId);
        $data = array();
        $count = 0;
        $this->m_messagePush->getUnReadMSG(0, 1, $whr, $or_whr, $data, $count);
        $this->responseSuccess(array('unReadNum' => $count));
    }

    
}