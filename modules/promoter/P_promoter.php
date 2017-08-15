<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/17/2017
 * Time: 10:57 AM
 */
class P_promoter extends Pmt_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_promoter');
        $this->load->model('m_user');
    }

    //推广员获取个人信息
    function getPromoterInfo()
    {
    	if (!$this->checkParam(array('userId'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$data = array();
    	$res = $this->m_promoter->getPromoterInfo($userId, $data);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess(array('info' => $data));
    }

    //我推荐的用户
    function myPromptUsers()
    {
    	if (!$this->checkParam(array('userId', 'startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$sort = $this->input->post('sort');
    	$direction = $this->input->post('direction');
    	$data = array();
    	$count = 0;
    	$this->m_promoter->getFriends($startIndex, $num, $userId, $data, $count, $sort, $direction);
    	$this->responseSuccess(array('userList' => $data, 'count' => $count));
    }

    //推荐好友详情
    function getPromptUserInfo()
    {
    	if (!$this->checkParam(array('userId', 'friendUserId', 'startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$friendUserId = $this->input->post('friendUserId');
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$userInfo = $this->m_promoter->getSingleUserInfo($userId, $friendUserId);
    	$data = array();
    	$count = 0;
    	$this->m_promoter->getSingleUserOrders($startIndex, $num, $userId, $friendUserId, $data, $count);
    	$this->responseSuccess(array('friendInfo' => $userInfo, 'orderInfo' => array('orderList' => $data, 'count' => $count)));
    }

    //获取待结金额详情
    function getWaitCheckBill()
    {
    	if (!$this->checkParam(array('userId', 'startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$data = array();
    	$count = 0;
    	$info = array();
    	$this->m_promoter->getWaitCheckBill($startIndex, $num, $userId, $data, $count);
    	$this->m_promoter->getPromoterInfo($userId, $info);
    	$this->responseSuccess(array('bills' => $data, 'count' => $count, 'historyReturnTotal' => $info->historyReturnTotal, 'waitCheckAmount' => $info->waitCheckAmount));
    }

    //推广员给用户设置备注
    function setRemark()
    {
    	if (!$this->checkParam(array('userId', 'remark'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$remark = $this->input->post('remark');
    	$userObj = $this->m_user->getUserObj(USER_TYPE_USER, $userId);
    	if (!$userObj)
    	{
    		$this->responseError(ERROR_USER_NOT_FOUND);
    		return;
    	}
    	$res = $userObj->modInfoWithPrivilege(array('remark' => $remark));
    	if ($res) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess(ERROR_OK);
    }

    //推广员给自己设置口号
    function setSelfSlogan()
    {
    	if (!$this->checkParam(array('userId', 'slogan'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$slogan = $this->input->post('slogan');
    	$pmt = $this->m_user->getUserObj(USER_TYPE_PMT, $userId);
    	if (!$pmt) 
    	{
    		$this->responseError(ERROR_NO_PROMOTER);
    		return;
    	}
    	$modInfo = array('slogan' => $slogan);
    	$pmt->modInfoWithPrivilege($modInfo);
    	$this->responseSuccess(ERROR_OK);
    }
}