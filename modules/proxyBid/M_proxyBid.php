<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-17
 * Time: 下午6:46
 */
class M_proxyBid extends My_Model
{
    function __construct()
    {
        parent::__construct();
    }

    /**
     * 新增委托出价服务
     * @param $bids
     * @return mixed
     */
    function setProxyBid($auctionId, $userId, $bids)
    {
        $this->load->model("m_auction");
        $auctionItemObj = $this->m_auction->getAuctionItemObj($auctionId);
        if(!$auctionItemObj)
        {
            return ERROR_AUCTION_NOT_FOUND;
        }

        //判断用户委托出价包月服务是否开通
        //no fee to authorize price
//        if(!$this->m_common->get_one("paid_services", array("userId" => $userId, "serviceType" => SERVICE_ENTRUST_MONTHLY, "endTime >=" => now())))
//        {
//            return ERROR_NO_PAID_SERVICES;
//        }

        //判断是否已达委托上限
        $this->db->where(array("auctionId" => $auctionId, "userId" => $userId));
        if($this->db->count_all_results("proxyBid") >= MAX_PROXY_BID)
        {
            return ERROR_MAX_PAID_SERVICES;
        }

        if($this->db->insert_batch("proxyBid", $bids))
        {
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }

    /**
     * 获取委托出价信息
     * @param $startIndex
     * @param $num
     * @param array $whereArr
     * @param $bids
     * @param $count
     * @return mixed
     */
    function getProxyBid($startIndex, $num, $whereArr = array(), &$bids, &$count)
    {
        $this->db->start_cache();
        $this->db->select("*")->from("proxyBid");
        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }
        $this->db->order_by("setTime asc");
        $this->db->stop_cache();
        $count = $this->db->count_all_results();

        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }

        $bids = $this->db->get()->result_array();
        $this->db->flush_cache();
        return ERROR_OK;
    }

    /**
     * 委托出价
     * @param $auctionId
     * @param $userId
     * @param $price
     */
    function startProxyBid($auctionId, $userId, $price, $lowestPremium)
    {
        $bids = array();
        $count = 0;
        $whereArr = array(
            "auctionId" => $auctionId,
            "userId !=" => $userId,
            "triggerPrice <=" => $price,
            "offerPrice >=" => ($price + $lowestPremium),
            "isTrigger" => 0
        );
        $this->getProxyBid(0, 1, $whereArr, $bids, $count);

        $this->load->model("m_auction");
        foreach($bids as $one)
        {
         //   if($this->m_common->get_one("paid_services", array("userId" =>  $one["userId"], "serviceType" => SERVICE_ENTRUST_MONTHLY, "startTime <=" => now(), "endTime >=" => now())))
         //   {
            if($this->m_auction->biddingAuctionItem($auctionId, $one["userId"], $one["offerPrice"]) == ERROR_OK)
            {
                $this->m_common->update("proxyBid", array("isTrigger" => 1), array("id" => $one["id"]));
            }
            break;
         //   }
        }
    }
}