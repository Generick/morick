<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-9
 * Time: 下午3:53
 */
class U_shippingAddress extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_shippingAddress");
    }

    /**
     * 修改收货地址
     */
    function modShippingAddress()
    {
        if(!$this->checkParam(array("addressId", "modInfo")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $addressId = intval($this->input->post("addressId"));
        $modInfo = json_decode(trim($this->input->post("modInfo")), true);
        if(empty($modInfo))
        {
            $this->responseError(ERROR_PARAM);
        }

        $retCode = $this->m_shippingAddress->modShippingAddress($addressId, $modInfo);
        $this->responseError($retCode);
        return;
    }

    /**
     * 新增收货地址
     */
    function addShippingAddress()
    {
        if(!$this->checkParam(array("acceptName", "province", "city", "district", "address","isCommon")))
        {
            $this->responseError(ERROR_PARAM);
        }

        $addressInfo["acceptName"] = trim($this->input->post("acceptName"));
        $addressInfo["province"] = trim($this->input->post("province"));
        $addressInfo["city"] = trim($this->input->post("city"));
        $addressInfo["district"] = trim($this->input->post("district"));
        $addressInfo["address"] = trim($this->input->post("address"));
        $addressInfo["mobile"] = trim($this->input->post("mobile"));
        $addressInfo["isCommon"] = intval($this->input->post("isCommon"));

        $retCode = $this->m_shippingAddress->addShippingAddress($addressInfo);
        $this->responseError($retCode);
        return;
    }

    /**
     * 删除收货地址
     */
    function delShippingAddress()
    {
        if(!$this->checkParam(array("addressIds")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $addressIds = trim($this->input->post("addressIds"));
        $addressIdArr = json_decode($addressIds, true) ? json_decode($addressIds, true) : array();
        if(empty($addressIdArr))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $delArr = array();
        foreach($addressIdArr as $addressId)
        {
            $retCode = $this->m_shippingAddress->delShippingAddress($addressId);
            if($retCode == ERROR_OK)
            {
                $delArr[] = $addressId;
            }
        }

        $this->responseSuccess(array("delArr" => $delArr));
        return;
    }

    /**
     * 获取收货地址详情
     */
    function getShippingAddress()
    {
        if(!$this->checkParam(array("addressId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $addressId = intval($this->input->post("addressId"));

        $addressInfo = $this->m_shippingAddress->getAddressInfo($addressId);
        $this->responseSuccess(array("addressInfo" => $addressInfo));
        return;
    }
}