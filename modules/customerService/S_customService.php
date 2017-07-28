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
    	$res = $this->m_order->sure_cancel_order($order_no, $type);
    	if ($res !== ERROR_OK) 
    	{
    		$this->responseError($res);
    		return;
    	}
    	$toStatus = ORDER_STATUS_RECEIVE;
    	if ($type == 1) $toStatus = ORDER_STATUS_CANCEL;
    	$this->m_customService->addOPREC($userId, $orderObj->orderStatus,$toStatus);
    	$this->responseSuccess($res);
    }

    //发货
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
    	$orderObj = $this->m_order->getOrderObj($order_no);
    	if (!$orderObj)
    	{
    		$this->responseError(ERROR_ORDER_NOT_FOUND);
    		return;
    	} 
    	$retCode = $this->m_order->modOrderInfo($order_no, array("logistics_no" => $logistics_no, "orderStatus" => ORDER_STATUS_WAIT_RECEIVE));
    	$this->m_customService->addOPREC($userId, $orderObj->orderStatus, ORDER_STATUS_WAIT_RECEIVE);
        //创建发货信息
        //user id ,msg type, href id=> order id
        if ($retCode == ERROR_OK) 
        {
            $this->load->model('m_messagePush');
            //user id 
            $user_id = $this->db->select('userId, orderType')->from('order')->where('order_no', $order_no)->get()->row_array();
            $msgType = $user_id['orderType'] == 2 ? MP_MSG_TYPE_COMMODITY_ORDER : MP_MSG_TYPE_ORDER;
            $res = $this->m_messagePush->createUserMsg($user_id['userId'], $msgType, $order_no);
            if (empty($res)) 
            {
                $this->responseError(MP_MSG_CREATE_FAIL);
            }
            $this->responseSuccess(ERROR_OK);
        }
        
        $this->responseError($retCode);
    }
}