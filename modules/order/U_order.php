<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-12
 * Time: 下午4:00
 */
class U_order extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_order");
        $this->load->model("m_user");
    }
    /**
     * 获取订单列表
     */
    function getOrderList()
    {
        if(!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $whereArr = array();
        $whereArr["order.userId"] = $this->m_user->getSelfUserId();
        if(isset($_POST["orderType"]))
        {
            $whereArr["orderStatus"] = intval($this->input->post("orderType"));
        }

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
     * 获取订单信息
     */
    function getOrderInfo()
    {
        if(!$this->checkParam(array("order_no")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $order_no = trim($this->input->post("order_no"));

        $orderInfo = $this->m_order->getOrderAll($order_no);
        $this->responseSuccess(array("orderInfo" => $orderInfo));
        return;
    }

    /**
     * 获取物流信息
     */
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

    /**
     * 确认收货
     */
    function confirmReceipt()
    {
        if(!$this->checkParam(array("order_no")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $order_no = trim($this->input->post("order_no"));

        $retCode = $this->m_order->modOrderInfo($order_no, array("orderStatus" => ORDER_STATUS_RECEIVE));
        $this->responseError($retCode);
        return;
    }

    /**
     * 设置收货地址
     */
    function setShippingAddress()
    {
        if(!$this->checkParam(array("order_no", "address")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $order_no = trim($this->input->post("order_no"));
        $address = intval($this->input->post("address"));
        $this->load->model("m_shippingAddress");
        $addressInfo = $this->m_shippingAddress->getAddressInfo($address);
        if(!$addressInfo)
        {
            $this->responseError(ERROR_ADDRESS_NOT_FOUND);
            return;
        }
        $modOrderInfo = array(
            "acceptName" => $addressInfo->acceptName,
            "province" => $addressInfo->province,
            "city" => $addressInfo->city,
            "district" => $addressInfo->district,
            "address" => $addressInfo->address,
            "mobile" => $addressInfo->mobile
        );

        $retCode = $this->m_order->modOrderInfo($order_no, $modOrderInfo);
        $this->responseError($retCode);
        return;
    }

    /**
     * 支付订单
     */
    function payOrder()
    {
        if(!$this->checkParam(array("order_no", "deliveryType")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $modOrderInfo = array();
        //判断订单是否存在
        $order_no = trim($this->input->post("order_no"));
        $deliveryType = intval($this->input->post("deliveryType"));
        $orderInfo = $this->m_order->getOrderAll($order_no);
        if(!$orderInfo)
        {
            $this->responseError(ERROR_ORDER_NOT_FOUND);
            return;
        }

        $modOrderInfo["deliveryType"] = $deliveryType;
        if($deliveryType == 0)
        {
            if(empty($orderInfo->acceptName))
            {
                $this->responseError(ERROR_ADDRESS_NOT_EXIST);
                return;
            }

            //判断余额是否足够
            $this->load->model("m_user");
            $userObj = $this->m_user->getSelfUserObj();
            if($userObj->balance < $orderInfo->payPrice)
            {
                $this->responseError(ERROR_BALANCE_NOT_ENOUGH);
                return;
            }
            $modOrderInfo["payTime"] = now();
            $modOrderInfo["orderStatus"] = ORDER_STATUS_PAY;
        }

        //修改订单信息
        $retCode = $this->m_order->modOrderInfo($order_no, $modOrderInfo);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $retCode = ERROR_OK;
        if($deliveryType == 0)
        {
            //新增交易明细
            $this->load->model("m_transaction");
            $retCode = $this->m_transaction->addTransaction($userObj->userId, TRANSACTION_PAY, $orderInfo->payPrice);
        }

        $this->responseError($retCode);
    }
}