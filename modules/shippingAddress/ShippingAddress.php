<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-9
 * Time: 下午3:53
 */
class ShippingAddress extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_shippingAddress");
    }

    /**
     * 获取个人收货地址
     */
    function getShippingAddress()
    {
        if(!$this->checkParam(array("startIndex", "num", "userId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $whereArr["userId"] = intval($this->input->post("userId"));
        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $shippingAddressList = array();
        $count = 0;

        $retCode = $this->m_shippingAddress->getShippingAddress($startIndex, $num, $whereArr, $shippingAddressList, $count);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $this->responseSuccess(array("shippingAddressList" => $shippingAddressList, "count" => $count));
        return;
    }
}