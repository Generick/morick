<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-3
 * Time: 下午6:13
 */

class Auction extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_auction");
    }

    /**
     * 获取拍品列表
     */
    function getAuctionItems()
    {
        if(!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $whereArr = array();
        $orderBy = "";
        if(isset($_POST["type"]))
        {
            $whereArr["status"] = AUCTION_ON;
            $type = intval($this->input->post("type"));
            if($type == AUCTION_ING)
            {
                //$whereArr["status"] = AUCTION_ON;
                $whereArr["startTime <="] = now();
                $whereArr["endTime >="] = now();
                $orderBy = "endTime asc";
            }
            elseif($type == AUCTION_END)
            {
                $whereArr["endTime <"] = now();
            }
            elseif($type == AUCTION_ALL)
            {
                $whereArr["startTime <="] = now();
            }
        }
        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $auctionItems = array();
        $count = 0;

        $retCode = $this->m_auction->getAuctionItems($startIndex, $num, $whereArr, array(), $orderBy, $auctionItems, $count);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $this->responseSuccess(array("auctionItems" => $auctionItems, "count" => $count));
        return;
    }

    /**
     * 根据展品ID获取展品详情
     */
    function getAuctionAllInfo()
    {
        if(!$this->checkParam(array("itemId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $itemId = intval($this->input->post("itemId"));
        $userId = intval($this->input->post("userId"));

        $allInfo = $this->m_auction->getAuctionAll($itemId, $userId);
        if(!$allInfo)
        {
            $this->responseError(ERROR_AUCTION_NOT_FOUND);
            return;
        }

        $hasLogin = true;
        $this->load->model("m_account");
        if($this->m_account->getSessionData("userType") != USER_TYPE_USER)
        {
            $hasLogin = false;
        }

        if($allInfo->isVIP == 1)
        {
            if(!$hasLogin)
            {
                //未登录
                $this->responseError(ERROR_ONLY_FOR_VIP);
                return;
            }
            else
            {
                //登录则判断当前用户是否是VIP
                $this->load->model("m_user");
                $userObj = $this->m_user->getSelfUserObj();
                if(!$userObj || $userObj->isVIP == 0)
                {
                    $this->responseError(ERROR_ONLY_FOR_VIP);
                    return;
                }
            }
        }
        $allInfo->hasLogin = $hasLogin;

        $this->responseSuccess(array("allInfo" => $allInfo));
        return;
    }

    /**
     * 获取竞拍记录
     */
    function getBiddingList()
    {
        if(!$this->checkParam(array("itemId", "startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $itemId = intval($this->input->post("itemId"));
        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $biddingList = array();
        $count = 0;

        $this->m_auction->getBiddingList($itemId, $startIndex, $num, $biddingList, $count);
        $this->responseSuccess(array("biddingList" => $biddingList, "count" => $count));
        return;
    }

    /**
     * 获取个人竞拍记录
     */
    function getPersonalBiddingList()
    {
        if(!$this->checkParam(array("userId", "startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $userId = intval($this->input->post("userId"));
        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $biddingList = array();
        $count = 0;

        $this->m_auction->getPersonalBiddingList($userId, $startIndex, $num, $biddingList, $count);
        $this->responseSuccess(array("biddingList" => $biddingList, "count" => $count));
        return;
    }
}