<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-17
 * Time: 下午6:45
 */
class U_proxyBid extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_proxyBid");
        $this->load->model("m_user");
    }

    /**
     * 设置委托出价
     */
    function setProxyBid()
    {
        if(!$this->checkParam(array("auctionId", "bids")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $auctionId = intval($this->input->post("auctionId"));
        $bids = json_decode(trim($this->input->post("bids")), true);

        $userId = $this->m_user->getSelfUserId();
        $setTime = now();
        foreach($bids as &$bid)
        {
            $bid["auctionId"] = $auctionId;
            $bid["userId"] = $userId;
            $bid["setTime"] = $setTime;
        }

        $retCode = $this->m_proxyBid->setProxyBid($auctionId, $userId, $bids);
        $this->responseError($retCode);
        return;
    }

    /**
     * 获取委托出价列表信息
     */
    function getProxyBid()
    {
        if(!$this->checkParam(array("auctionId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $whereArr = array();
        $whereArr["auctionId"] = intval($this->input->post("auctionId"));
        $userId = $this->m_user->getSelfUserId();
        $whereArr["userId"] = $userId;

        $bids = array();
        $count = 0;
        $retCode = $this->m_proxyBid->getProxyBid(0, 0, $whereArr, $bids, $count);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }
        $this->responseSuccess(array("bids" => $bids));
        return;
    }
}