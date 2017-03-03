<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-19
 * Time: 上午11:48
 */
class A_auction extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_auction");
        $this->load->model("m_goods");
    }

    /**
     * 获取当前可参与拍卖的商品列表
     */
    function getAuctionGoods()
    {
        if(!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $likeStr = "";
        if(isset($_POST["likeStr"]))
        {
            $likeStr = trim($this->input->post("likeStr"));
        }

        $auctionGoodArr = $this->m_auction->getAuctionGoods();

        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $goods = array();
        $count = 0;
        $this->m_goods->getGoods($startIndex, $num, $goods, $count, array(), $likeStr, $auctionGoodArr);

        $this->responseSuccess(array("goods" => $goods, "count" => $count));
        return;
    }

    /**
     * 管理员获取拍品列表
     */
    function getAuctionItems()
    {
        if(!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $whereArr = array();
        if(isset($_POST["isVIP"]))
        {
            $whereArr["isVIP"] = intval($this->input->post("isVIP"));
        }

        $auctionItems = array();
        $count = 0;

        $retCode = $this->m_auction->getAuctionItems($startIndex, $num, $whereArr, array(), "", $auctionItems, $count);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $this->responseSuccess(array("auctionItems" => $auctionItems, "count" => $count));
        return;
    }

    /**
     * 发布展品
     */
    function releaseAuctionItem()
    {
        //其中isFreeShipment  isFreeExchange 后续确认具体类型 来设定单独字段来处理  单独一个类型表格
        if(!$this->checkParam(array("goodsId", "initialPrice", "lowestPremium", "margin", "isVIP", "startTime", "endTime", "cappedPrice" )))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $goodsId = intval($this->input->post("goodsId"));
        $this->load->model("m_goods_bak");
        $bak_id = 0;
        $retCode = $this->m_goods_bak->getGoodsBakIdWithGoodsId($goodsId, $bak_id);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $insertData = array(
            "goods_bak_id" => $bak_id,
            "initialPrice" => floatval($this->input->post("initialPrice")),
            "currentPrice" => floatval($this->input->post("initialPrice")),
            "lowestPremium" => floatval($this->input->post("lowestPremium")),
            "cappedPrice" => intval($this->input->post("cappedPrice")),
            "margin" => floatval($this->input->post("margin")),
            "isVIP" => intval($this->input->post("isVIP")),
            "startTime" => strtotime(trim($this->input->post("startTime"))),
            "endTime" => strtotime(trim($this->input->post("endTime"))),
            "createTime" => now(),
        );

        $retCode = $this->m_auction->releaseAuctionItem($goodsId, $insertData);
        $this->responseError($retCode);
        return;
    }

    /**
     * 下架展品
     */
    function setAuctionItemOff()
    {
        if(!$this->checkParam(array("itemId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $itemId = intval($this->input->post("itemId"));

        $auctionItemObj = $this->m_auction->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            $this->responseError(ERROR_AUCTION_NOT_FOUND);
            return;
        }

        if(!$auctionItemObj->modInfo(array("status" => AUCTION_OFF, "endTime" => now())))
        {
            //修改出错
            $this->responseError(ERROR_AUCTION_NOT_FOUND);
            return;
        }
        $this->responseError(ERROR_OK);
        return;
    }

    /**
     * 修改展品信息
     */
    function modActionItem()
    {
        if(!$this->checkParam(array("itemId", "modInfo")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $itemId = intval($this->input->post("itemId"));
        $modInfo = json_decode(trim($this->input->post("modInfo")), true) ? json_decode(trim($this->input->post("modInfo")), true) : array();
        if(empty($modInfo))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        if(isset($modInfo["startTime"]))
        {
            $modInfo["startTime"] = strtotime($modInfo["startTime"]);
        }

        if(isset($modInfo["endTime"]))
        {
            $modInfo["endTime"] = strtotime($modInfo["endTime"]);
        }

        $modInfo["status"] = AUCTION_ON;
        $retCode = $this->m_auction->modActionItem($itemId, $modInfo);
        $this->responseError($retCode);
        return;
    }

    /**
     * 删除展品
     */
    function delAuctionItems()
    {
        if(!$this->checkParam(array("itemIds")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $itemIds = trim($this->input->post("itemIds"));
        $itemIdArr = json_decode($itemIds, true) ? json_decode($itemIds, true) : array();
        if(empty($itemIdArr))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $delArr = array();
        foreach($itemIdArr as $itemId)
        {
            $retCode = $this->m_auction->delAuctionItem($itemId);
            if($retCode == ERROR_OK)
            {
                $delArr[] = $itemId;
            }
        }

        $this->responseSuccess(array("delArr" => $delArr));
    }

    /**
     * 拍品统计
     */
    function auctionStatistical()
    {
        if(!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));
        $whereArr = array();
        if(isset($_POST["startTime"]))
        {
            $whereArr["createTime >= "] = intval($this->input->post("startTime"));
        }

        if(isset($_POST["endTime"]))
        {
            $whereArr["createTime <= "] = intval($this->input->post("endTime"));
        }

        $count = 0;
        $auctionList = array();

        $retCode = $this->m_auction->getAuctionItems($startIndex, $num, $whereArr, array(), "", $auctionList, $count, AUCTION_TYPE_SMALL);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $this->responseSuccess(array("count" => $count, "auctionList" => $auctionList));
        return;
    }
}