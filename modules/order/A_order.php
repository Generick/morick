<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-12
 * Time: 下午4:00
 */
class A_order extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_order");
    }

    /**
     * 获取个人订单列表
     */
    function getPersonalOrderList()
    {
        if(!$this->checkParam(array("startIndex", "num", "userId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));
        $whereArr["order.userId"] = intval($this->input->post("userId"));
        $whereArr["payTime >"] = 0;
        $orderList = array();
        $count = 0;

        $retCode = $this->m_order->getOrderList($startIndex, $num, $whereArr, "", $orderList, $count);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }
        $this->responseSuccess(array("orderList" => $orderList, "count" => $count));
        return;
    }

    /**
     * 获取订单列表
     */
    function getOrderList()
    {
        $startIndex = $this->input->post('startIndex')?$this->input->post('startIndex') : 0;
        $num = $this->input->post('num')?$this->input->post('num') : 10;
        // if(!$this->checkParam(array("startIndex", "num")))
        // {
        //     $this->responseError(ERROR_PARAM);
        //     return;
        // }

        // $startIndex = intval($this->input->post("startIndex"));
        // $num = intval($this->input->post("num"));
        $whereArr = array();
        $likeStr = "";
        if(isset($_POST["orderType"]))
        {
            $whereArr["orderStatus"] = intval($this->input->post("orderType"));
        }

        if(isset($_POST["likeStr"]))
        {
            $likeStr = trim($this->input->post("likeStr"));
        }

        if(isset($_POST["deliveryType"]))
        {
            $whereArr["deliveryType"] = intval($this->input->post("deliveryType"));
        }

        $orderList = array();
        $count = 0;

        $retCode = $this->m_order->getOrderList($startIndex, $num, $whereArr, $likeStr, $orderList, $count);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }
        $this->responseSuccess(array("orderList" => $orderList, "count" => $count));
        return;
    }

    /**
     * 发货
     */
    function deliverOrder()
    {
        if(!$this->checkParam(array("order_no", "logistics_no")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $order_no = trim($this->input->post("order_no"));
        $logistics_no = trim($this->input->post("logistics_no"));

        $retCode = $this->m_order->modOrderInfo($order_no, array("logistics_no" => $logistics_no, "orderStatus" => ORDER_STATUS_WAIT_RECEIVE));
        //create order status message
        //user id ,msg type, href id=> order id
        $this->load->model('m_messagePush');
        $order_user_id = $this->db->select('id,userId')->from('order')->where('order_no',$order_no)->get()->row_array();
        $this->m_messagePush->createUserMsg($order_user_id['userId'],3,$order_user_id['id']);
        //over
        $this->responseError($retCode);
        return;
    }

    function orderStatistical()
    {
        if(!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $whereArr = array("orderStatus >= " => ORDER_STATUS_PAY);

        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        if(isset($_POST["startTime"]))
        {
            $whereArr["orderTime >= "] = intval($this->input->post("startTime"));
        }

        if(isset($_POST["endTime"]))
        {
            $whereArr["orderTime <= "] = intval($this->input->post("endTime"));
        }

        $totalTurnover = 0;
        $totalBid = 0;
        $count = 0;
        $orderList = array();

        $retCode = $this->m_order->orderStatistical($startIndex, $num, $whereArr, $totalTurnover, $totalBid, $count, $orderList);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $this->responseSuccess(array("totalTurnover" => $totalTurnover, "totalBid" => $totalBid, "count" => $count, "orderList" => $orderList));
        return;
    }

    function getLogisticsInfo()
    {
        if(!$this->checkParam(array("order_no")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $order_no = trim($this->input->post("order_no"));
        $orderData = $this->m_order->getOrderBase($order_no);
        $traces = null;
        if(isset($orderData->logistics_no))
        {
            $this->load->model("m_logistics");
            $logisticsInfo = json_decode($this->m_logistics->getOrderTraces("SF", $orderData->logistics_no), true);
            if($logisticsInfo["Success"])
            {
                $traces = $logisticsInfo["Traces"];
            }
        }
        $this->responseSuccess(array("traces" => $traces));
        return;
    }

    //operate order status
    function operateOrder(){
        if (!$this->checkParam(array('order_no','type'))) {
            $this->responseError(ERROR_PARAM);
            exit;
        }
        $order_no = $this->input->post('order_no');
        $type = $this->input->post('type');
        $res = $this->m_order->sure_cancel_order($order_no,$type);
        if ($res != ERROR_OK) {
            $this->responseError($res);
            exit;
        }
        $this->responseSuccess($res);
    }

}