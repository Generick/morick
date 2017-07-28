<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/17/2017
 * Time: 10:53 AM
 */
class A_promoter extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_promoter');
    }

    //添加推广员
    function addPromoter()
    {
    	if (!$this->checkParam(array('name', 'telephone', 'password'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$name = $this->input->post('name');
    	$telephone = $this->input->post('telephone');
    	$password = $this->input->post('password');
    	$res = $this->m_promoter->addPromoter($name, $telephone, $password);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //获取推广员列表
    function getPromoters()
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
    	$this->m_promoter->getPromoters($startIndex, $num, $whr, $data, $count);
    	$this->responseSuccess(array('promotersList'=> $data, 'count' => $count));
    }

    //删除推广员
    function delPromoter()
    {
    	if (!$this->checkParam(array('userIds'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userIds = $this->input->post('userIds');
    	$userIds = is_array($userIds) ? $userIds : json_decode($userIds, true);
    	foreach ($userIds as $v) 
    	{
    		$res = $this->m_promoter->delPromoter($v);
    	}
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //修改推广员密码
    function modPMTPassword()
    {
    	if (!$this->checkParam(array('telephone', 'newPWD'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$telephone = $this->input->post('telephone');
    	$newPWD = $this->input->post('newPWD');
    	$res = $this->m_promoter->modPMTPassword($telephone, $newPWD);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //结账
   	function adminCheckBill()
   	{
   		if (!$this->checkParam(array('userId', 'amount'))) 
   		{
   			$this->responseError(ERROR_PARAM);
   			return;
   		}
   		$userId = $this->input->post('userId');
   		$amount = $this->input->post('amount');
   		$res = $this->m_promoter->adminCheckBill($userId, $amount);
   		if ($res !== ERROR_OK) 
   		{
   			$this->responseError($res);
   			return;
   		}
   		$this->responseSuccess($res);
   	}

   	//生成二维码后修改推广员的二维码地址
   	function modPromoter()
   	{
   		if (!$this->checkParam(array('userId', 'qrcode'))) 
   		{
   			$this->responseError(ERROR_PARAM);
   			return;
   		}
   		$userId = $this->input->post('userId');
   		$qrcode = $this->input->post('qrcode');
   		$modInfo = array('qrcode' => $qrcode);
   		$res = $this->m_promoter->modPromoter($userId, $modInfo);
   		if ($res !== ERROR_OK) 
   		{
   			$this->responseError($res);
   			return;
   		}
   		$this->responseSuccess($res);
   	}

   	//获取推广员的分成条件
   	function getPromoterConditions()
   	{
   		if (!$this->checkParam(array('userId'))) 
   		{
   			$this->responseError(ERROR_PARAM);
   			return;
   		}
   		$userId = $this->input->post('userId');
   		$data = $this->m_promoter->getPromoterConditions($userId);
   		$this->responseSuccess(array('conditions' => $data));
   	}

   	//管理员添加条件
   	function adminAddCondition()
   	{
   		if (!$this->checkParam(array('userId', 'condition_money', 'condition_rate'))) 
   		{
   			$this->responseError(ERROR_PARAM);
   			return;
   		}
   		$userId = $this->input->post('userId');
   		$condition_money = $this->input->post('condition_money');
   		$condition_rate = $this->input->post('condition_rate');
   		$res = $this->m_promoter->adminAddCondition($userId, $condition_money, $condition_rate);
   		if ($res !== ERROR_OK) 
   		{
   			$this->responseError($res);
   			return;
   		}
   		$this->responseSuccess($res);
   	}

   	//管理员删除分成条件
   	function adminDelCondition()
   	{
   		if (!$this->checkParam(array('id'))) 
   		{
   			$this->responseError(ERROR_PARAM);
   			return;
   		}
   		$id = $this->input->post('id');
   		$res = $this->m_promoter->adminDelCondition($id);
   		if ($res !== ERROR_OK) 
   		{
   			$this->responseError($res);
   			return;
   		}
   		$this->responseSuccess($res);
   	}

   	//好友下单记录
   	function getFriendsOrders()
   	{
   		if (!$this->checkParam(array('userId', 'startIndex', 'num'))) 
   		{
   			$this->responseError(ERROR_PARAM);
   			return;
   		}
   		$userId = $this->input->post('userId');
   		$startIndex = $this->input->post('startIndex');
   		$num = $this->input->post('num');
   		$startTime = $this->input->post('startTime');
   		$endTime = $this->input->post('endTime');
   		$whr = "orderStatus not in (0,1) and orderType = 2";
   		if (!empty($startTime) && !empty($endTime)) 
   		{
   			$whr .= " and orderTime >= {$startTime} and orderTime <= {$endTime}";
   		}
   		$count = 0;
   		$data = array();
   		$res = $this->m_promoter->getFriendsOrders($startIndex, $num, $userId, $whr, $data, $count);
   		if ($res !== ERROR_OK) 
   		{
   			$this->responseError($res);
   			return;
   		}
   		$this->responseSuccess(array('friendsOrders' => $data, 'count' => $count));
   	}

   	//好友列表
   	function getFriends()
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
   		$this->responseSuccess(array('friends' => $data, 'count' => $count));
   	}

   	//结账记录
   	function getCheckBillRecords()
   	{
   		if (!$this->checkParam(array('userId', 'startIndex', 'num'))) 
   		{
   			$this->responseError(ERROR_PARAM);
   			return;
   		}
   		$userId = $this->input->post('userId');
   		$startIndex = $this->input->post('startIndex');
   		$num = $this->input->post('num');
   		$whr = array('userId' => $userId);
   		$count = 0;
   		$data = array();
   		$this->m_promoter->getCheckBillRecords($startIndex, $num, $whr, $data, $count);
   		$this->responseSuccess(array('billRecords' => $data, 'count' => $count));
   	}

   	//获取推广员信息
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
}