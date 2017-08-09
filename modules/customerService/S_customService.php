<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/27/2017
 * Time: 4:24 PM
 */
class S_customService extends Srv_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_customService');
        $this->load->model('m_order');
        $this->load->model('m_user');
        $this->load->model('m_promoter');
    }

    //获取订单列表
    function getOrders()
    {
    	if (!$this->checkParam(array('startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$orderStatus = $this->input->post('orderStatus');
    	$whr = array();
    	$likeStr = '';
    	if ($orderStatus != null && $orderStatus != '') $whr['orderStatus'] = $orderStatus;
    	//需求更改 只需要商品订单，不需要拍品订单
        $whr['orderType'] = 2;//2商品订单 1拍品订单
    	$data = array();
    	$count = 0;
    	$this->m_order->getOrderList($startIndex, $num, $whr, $likeStr, $data, $count);
    	$this->responseSuccess(array('orderList' => $data, 'count' => $count));
    }

    //获取订单信息
    function getOrderInfo()
    {
    	if (!$this->checkParam(array('order_no'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$order_no = $this->input->post('order_no');
    	$info = $this->m_order->getOrderObj($order_no);
    	if (!$info)
    	{
    		$this->responseError(ERROR_ORDER_NOT_FOUND);
    		return;
    	}
    	$this->responseSuccess(array('orderInfo' => $info));
    }

    //客服操作订单
    function sureOrCancelOrder()
    {
    	if (!$this->checkParam(array('userId','order_no', 'type'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$order_no = $this->input->post('order_no');
    	$type = $this->input->post('type');

    	$orderObj = $this->m_order->getOrderObj($order_no);
    	if (!$orderObj)
    	{
    		$this->responseError(ERROR_ORDER_NOT_FOUND);
    		return;
    	}
    	$srv = $this->m_user->getUserObj(USER_TYPE_SRV, $userId);
    	if (!$srv)
    	{
    		$this->responseError(ERROR_NO_SERVICE);
    		return;
    	}
    	$status = array(ORDER_STATUS_CANCEL, ORDER_STATUS_RECEIVE);
    	if (in_array($orderObj->orderStatus, $status)) 
    	{
    		$re = ERROR_ORDER_HAS_RECEIVE;
    		if($type == 1) $re = ERROR_ORDER_HAS_CANCEL;
    		$this->responseError($re);
    		return;
    	}
    	$fromStatus = $orderObj->orderStatus;
    	$res = $this->m_order->sure_cancel_order($order_no, $type);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$toStatus = ORDER_STATUS_RECEIVE;
    	if ($type == 1) $toStatus = ORDER_STATUS_CANCEL;
    	$ret = $this->m_customService->addOPREC($userId, $order_no, $fromStatus,$toStatus);
    	$this->m_promoter->updateUserOrderStatistics($orderObj->userId);
    	if ($ret == ERROR_OK)
    	{
    		$this->responseSuccess($ret);
    		return;
    	} 
    	$this->responseError($ret);
    }

    //客服发货
    function deliverOrder()
    {
    	if (!$this->checkParam(array('userId','order_no', 'logistics_no'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$order_no = $this->input->post('order_no');
    	$logistics_no = $this->input->post('logistics_no');
    	$userId = $this->input->post('userId');
    	$note = $this->input->post('note');

    	$orderObj = $this->m_order->getOrderObj($order_no);
    	if (!$orderObj)
    	{
    		$this->responseError(ERROR_ORDER_NOT_FOUND);
    		return;
    	}
    	$srv = $this->m_user->getUserObj(USER_TYPE_SRV, $userId);
    	if (!$srv)
    	{
    		$this->responseError(ERROR_NO_SERVICE);
    		return;
    	}
    	if ($orderObj->orderStatus == ORDER_STATUS_WAIT_RECEIVE) 
    	{
    	 	$this->responseError(ERROR_ORDER_HAS_DELIVERED);
    	 	return;
    	}

    	$modInfo = array('orderStatus' => ORDER_STATUS_WAIT_RECEIVE);
        // if (empty($logistics_no) && empty($note)) 
        // {
        //     $this->responseError(ERROR_DELIVERY_INFO_NULL);
        //     return;
        // }
        if ($logistics_no)
        {
            $modInfo['logistics_no'] = $logistics_no;
        } else
        {
            $modInfo['note'] = $note;
        }

    	$fromStatus = $orderObj->orderStatus;
    	$retCode = $this->m_order->modOrderInfo($order_no, $modInfo);
        //创建发货信息
        //user id ,msg type, href id=> order id
        if ($retCode == ERROR_OK) 
        {
        	$this->m_customService->addOPREC($userId, $order_no, $fromStatus, ORDER_STATUS_WAIT_RECEIVE);
        	$this->m_promoter->updateUserOrderStatistics($orderObj->userId);
            $this->load->model('m_messagePush');
            //user id 
            $user_id = $this->db->select('userId, orderType')->from('order')->where('order_no', $order_no)->get()->row_array();
            $msgType = $user_id['orderType'] == 2 ? MP_MSG_TYPE_COMMODITY_ORDER : MP_MSG_TYPE_ORDER;
            $res = $this->m_messagePush->createUserMsg($user_id['userId'], $msgType, $order_no);
            if (empty($res))
            {
            	$this->responseError(MP_MSG_CREATE_FAIL);
            	return;
            } 
            $this->responseSuccess(ERROR_OK);
        }
        
        $this->responseError($retCode);
    }
}