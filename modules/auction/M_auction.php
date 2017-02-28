<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-3
 * Time: 下午6:13
 */
class M_auction extends My_Model
{
    static  $loadedItems = array();
    function __construct()
    {
        parent::__construct();

        $this->load->driver("cache");
        if(!$this->cache->redis->is_supported())
        {
            $this->log->write_log('error', "redis not supported!!!");
        }

        $this->cache->redis->retain();
    }

    /**
     * 在析构函数中进行数据保存
     */
    function __destruct()
    {
        foreach (self::$loadedItems as $itemId => $itemObj)
        {
            if (!$itemObj->saveDB())
            {
                $this->log->write_log('error', "Save auctionItems failed: $itemId");
            }
        }

        $this->cache->redis->release();
    }

    /**
     * 获取排名藏品对象
     * @param $itemId
     * @return CAuction|mixed|null
     */
    function getAuctionItemObj($itemId)
    {
        $auctionItemObj = null;
        if(isset(self::$loadedItems[$itemId]))
        {
            $auctionItemObj = self::$loadedItems[$itemId];
            return $auctionItemObj;
        }

        $key = CACHE_PREFIX_AUCTION . $itemId;

        $auctionItemObj = unserialize($this->cache->redis->get($key));
        if($auctionItemObj)
        {
            self::$loadedItems[$itemId] = $auctionItemObj;
            return $auctionItemObj;
        }

        $result = $this->m_common->get_one("auctionItems", array("id" => $itemId));
        if(!empty($result))
        {
            $auctionItemObj = new CAuction();
            $auctionItemObj->itemId = $itemId;
            $auctionItemObj->initWithDBData($result);
            $auctionItemObj->saveCache();
            self::$loadedItems[$itemId] = $auctionItemObj;
            return $auctionItemObj;
        }
        return null;
    }

    /**
     * 获取展品精简信息
     * @param $itemId
     * @return CAuctionSmallInfo|null
     */
    function getAuctionSmall($itemId)
    {
        $auctionItemObj = $this->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            return null;
        }
        $smallData = $auctionItemObj->getAuctionSmallInfo();

        $this->load->model("m_goods_bak");
        $goodsInfo = $this->m_goods_bak->getGoodsBakBase($smallData->goods_bak_id);
        $goodsInfo->price = $smallData->currentPrice;

        $this->load->model("m_user");
        $userObj = $this->m_user->getBaseUserObj(USER_TYPE_ADMIN, $auctionItemObj->owner_id);
        $goodsInfo->ownerInfo = $userObj->name;

        $goodsInfo->createTime = $smallData->createTime;
        return $goodsInfo;
    }

    /**
     * 获取展品基础信息
     * @param $itemId
     * @return CAuctionBaseInfo|null
     */
    function getAuctionBase($itemId)
    {
        var_dump("the itemId:" . $itemId);
        $auctionItemObj = $this->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            return null;
        }
        $baseData = $auctionItemObj->getAuctionBaseData();

        $this->load->model("m_goods_bak");
        $baseData->goodsInfo = $this->m_goods_bak->getGoodsBakBase($baseData->goods_bak_id);

        $this->load->model("m_user");
        $baseData->currentUserInfo = $this->m_user->getBaseUserObj(USER_TYPE_USER, $baseData->currentUser);
        return $baseData;
    }

    /**
     * 获取展品详细信息
     * @param $itemId
     * @return CAuctionAllInfo|null
     */
    function getAuctionAll($itemId)
    {
        $auctionItemObj = $this->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            return null;
        }
        $allData = $auctionItemObj->getAuctionAllData();

        $this->load->model("m_goods_bak");
        $allData->goodsInfo = $this->m_goods_bak->getGoodsBakBase($allData->goods_bak_id);
        return $allData;
    }

    /**
     * 获取排名藏品列表
     * @param $startIndex
     * @param $num
     * @param $auctionItems
     * @param $count
     * @return mixed
     */
    function getAuctionItems($startIndex, $num, $whereArr = array(), $orWhereArr = array(), &$auctionItems, &$count, $itemInfoType = AUCTION_TYPE_BASE)
    {
        $this->db->start_cache();
        $this->db->select("id, FROM_UNIXTIME(startTime), FROM_UNIXTIME(endTime), (if((endTime - unix_timestamp(now())) > 0, 1, 0)) as isOverdue")->from("auctionItems");
        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }
        if(!empty($orWhereArr))
        {
            $this->db->or_where($orWhereArr);
        }
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $this->db->order_by("isOverdue desc, startTime desc");
        $itemArr = $this->db->get()->result_array();
        $this->db->flush_cache();
        foreach($itemArr as $one)
        {
            switch($itemInfoType)
            {
                case AUCTION_TYPE_ALL:
                    $auctionItems[] = $this->getAuctionAll($one["id"]);
                    break;
                case AUCTION_TYPE_BASE:
                    $auctionItems[] = $this->getAuctionBase($one["id"]);
                    break;
                case AUCTION_TYPE_SMALL:
                    $auctionItems[] = $this->getAuctionSmall($one["id"]);
                    break;
            }
        }
        return ERROR_OK;
    }

    /**
     * 获取指定拍品的竞拍记录
     * @param $itemId
     * @param $startIndex
     * @param $num
     * @param $biddingList
     * @param $count
     * @return mixed
     */
    function getBiddingList($itemId, $startIndex, $num, &$biddingList, &$count)
    {
        $auctionItemObj = $this->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            return ERROR_AUCTION_NOT_FOUND;
        }

        $this->db->start_cache();
        $this->db->select("*")->from("biddingLogs");
        $this->db->where(array("auctionItemId" => $itemId));
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $this->db->order_by("id desc");
        $biddingList = $this->db->get()->result_array();
        $this->db->flush_cache();

        $this->load->model("m_user");
        foreach($biddingList as &$one)
        {
            $baseData = $this->m_user->getBaseUserObj(USER_TYPE_USER, $one["userId"]);
            $one["userData"] = $baseData;
        }
    }

    /**
     * @param $userId
     * @param $startIndex
     * @param $num
     * @param $biddingList
     * @param $count
     */
    function getPersonalBiddingList($userId, $startIndex, $num, &$biddingList, &$count)
    {
        $this->db->start_cache();
        $this->db->select("id, auctionItemId, userId, createTime, max(nowPrice) as nowPrice")->from("biddingLogs");
        $this->db->where(array("userId" => $userId));
        $this->db->group_by("auctionItemId");
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $this->db->order_by("createTime desc");
        $biddingArr = $this->db->get()->result_array();
        $this->db->flush_cache();

        foreach($biddingArr as $one)
        {
            $baseData = $this->getAuctionBase($one["auctionItemId"]);
            if($baseData)
            {
                if($baseData->startTime <= now() && $baseData->endTime > now())
                {
                    //进行中
                    $one["status"] = AUCTION_STATUS_GOING;
                }

                if($baseData->endTime <= now())
                {
                    //已结束
                    if($baseData->currentUser == $userId)
                    {
                        $one["status"] = AUCTION_STATUS_SELF;
                    }
                    else
                    {
                        $one["status"] = AUCTION_STATUS_ANNOUNCED;
                    }
                }

                $one["initialPrice"] = $baseData->initialPrice;
                $one["currentPrice"] = $baseData->currentPrice;
                $one["goodsInfo"] = $baseData->goodsInfo;

                $biddingList[] = $one;
            }
        }
    }

    /**
     * 竞拍展品
     * @param $itemId
     * @param $price
     * @return mixed
     */
    function biddingAuctionItem($itemId, $userId, $price)
    {
        $auctionItemObj = $this->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            return ERROR_AUCTION_NOT_FOUND;
        }

        if($auctionItemObj->endTime < now() || $auctionItemObj->startTime > now())
        {
            return ERROR_BIDDING_TIME_ILLEGAL;
        }

        //user price must over current high price
        $maxPrice = $this->db->select_max('nowPrice')->from('biddinglogs')->where('auctionItemId',$itemId)->get()->row_array();
        if ($price < $maxPrice['nowPrice']) {
            return ERROR_PRICE_IS_ILLEGAL;
        }

        if($auctionItemObj->currentPrice == $auctionItemObj->initialPrice && $auctionItemObj->initialPrice != 0)
        {
            if($price < $auctionItemObj->initialPrice)
            {
                return ERROR_PRICE_IS_ILLEGAL;
            }
        }
        else
        {
            if($price < ($auctionItemObj->currentPrice + $auctionItemObj->lowestPremium))
            {
                return ERROR_PRICE_IS_ILLEGAL;
            }
        }

        if($userId == $auctionItemObj->currentUser)
        {
            return ERROR_BIDDING_HAS_TALLEST;
        }

        //冻结资金
        if($auctionItemObj->margin > 0)
        {
            $this->load->model("m_freeze");
            $retCode = $this->m_freeze->addFreeze(FREEZE_AUCTION, $userId, $itemId, $auctionItemObj->margin);
            if($retCode != ERROR_OK)
            {
                return $retCode;
            }
        }

        if(!$this->m_common->insert("biddingLogs", array("auctionItemId" => $itemId, "userId" => $userId, "nowPrice" => $price, "createTime" => now())))
        {
            return ERROR_SYSTEM;
        }

        $modInfo = array("currentUser" => $userId, "currentPrice" => $price, "bidsNum" => ($auctionItemObj->bidsNum + 1));
        //mxl modify logic
        //user price over current auction price
        if ($auctionItemObj->cappedPrice > 0 && $price >= $auctionItemObj->cappedPrice) {
            $modInfo['endTime'] = time();
        }else if(($auctionItemObj->endTime - time()) <= $auctionItemObj->postponeTime * 60)
        {
            $modInfo["endTime"] =  (time() + $auctionItemObj->postponeTime * 60);
        }

        //超越提醒
        if($auctionItemObj->currentUser != 0)
        {
            //判断是否在指定时间内提醒过
            if(!$this->m_common->get_one("sms_remind", array("remindType" => 0, "userId" => $auctionItemObj->currentUser, "auctionId" => $auctionItemObj->id, "remindTime >" => (now() - SMS_REMIND_INTERVAL))))
            {
                $this->beyondPrice($auctionItemObj, $price);
               // $this->beyondPrice($auctionItemObj->goods_bak_id, $auctionItemObj->currentUser, $price);
            }
        }

        //修改展品表对应数据
        if(!$auctionItemObj->modInfo($modInfo))
        {
            //修改出错
            return ERROR_MOD_AUCTION_FAILED;
        }
        // $auctionItemObj->saveCache();//同步缓存
        // $auctionItemObj->saveDB();

        //处理委托出价
        $this->load->model("m_proxyBid");
        $this->m_proxyBid->startProxyBid($itemId, $userId, $price, $auctionItemObj->lowestPremium);
        //return ERROR_OK;
        return $modInfo['endTime'];
    }

    /**
     * 超价短信提醒
     * @param $auctionItemObj
     * @param $price
     */
    private function beyondPrice($auctionItemObj, $price)
    {
        //判断是否有包月服务
        $userId = $auctionItemObj->currentUser;
        $goods_bak_id = $auctionItemObj->goods_bak_id;
        $auctionId = $auctionItemObj->id;
        if($this->m_common->get_one("paid_services", array("userId" => $userId, "serviceType" => SERVICE_SMS_MONTHLY, "startTime <=" => now(), "endTime >=" => now())))
        {
            $this->load->model("m_goods_bak");
            $goodsInfo = $this->m_goods_bak->getGoodsBakBase($goods_bak_id);
            if($goodsInfo)
            {
                $content = $this->m_common->format(SMS_BEYOND_PRICE, $goodsInfo->goods_name, $price);
                $this->load->model("m_user");
                $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $userId);
                if($userObj)
                {
                    $this->load->model("m_smsCode");
                    //close message notification
                    //$this->m_smsCode->sendMsg($userObj->telephone, $content);
                    $this->m_common->insert("sms_remind", array("remindType" => 0, "userId" => $userId, "auctionId" => $auctionId, "remindTime" => now()));
                }
            }
        }
    }

    /**
     * 阅读回调
     * @param $itemId
     * @return mixed
     */
    function readCallBack($itemId)
    {
        $auctionItemObj = $this->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            return ERROR_AUCTION_NOT_FOUND;
        }
        if(!$auctionItemObj->modInfo(array("readNum" => ($auctionItemObj->readNum + 1))))
        {
            //修改出错
            return ERROR_MOD_AUCTION_FAILED;
        }
        return ERROR_OK;
    }

    /**
     * 分享回调
     * @param $itemId
     * @return mixed
     */
    function shareCallBack($itemId)
    {
        $auctionItemObj = $this->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            return ERROR_AUCTION_NOT_FOUND;
        }
        if(!$auctionItemObj->modInfo(array("shareNum" => ($auctionItemObj->shareNum + 1))))
        {
            //修改出错
            return ERROR_MOD_AUCTION_FAILED;
        }
        return ERROR_OK;
    }

    /**
     * 收藏回调
     * @param $itemId
     * @param $status
     * @return mixed
     */
    function collectionCallBack($itemId, $status)
    {
        $auctionItemObj = $this->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            return ERROR_AUCTION_NOT_FOUND;
        }
        if($status == CALL_BACK_STATUS_ADD)
        {
            if(!$auctionItemObj->modInfo(array("collectionNum" => ($auctionItemObj->collectionNum + 1))))
            {
                //修改出错
                return ERROR_MOD_AUCTION_FAILED;
            }
        }
        elseif($status == CALL_BACK_STATUS_REDUCE)
        {
            if(!$auctionItemObj->modInfo(array("collectionNum" => ($auctionItemObj->collectionNum - 1))))
            {
                //修改出错
                return ERROR_MOD_AUCTION_FAILED;
            }
        }
        return ERROR_OK;
    }

    /**
     * 发布展品
     * @param $insertData
     * @return mixed
     */
    function releaseAuctionItem($goodsId, $insertData)
    {
        $this->load->model("m_account");
        $userType = $this->m_account->getSessionData("userType");
        if(!$userType || $userType != USER_TYPE_ADMIN)
        {
            return ERROR_SESSION_PRIVILEGE_ERROR;
        }
        $insertData["owner_id"] = $this->m_account->getSessionData("userId");
        //判断当前发布的商品是否有正在拍卖的 如有则无法发布
        //是否需要判断 时间
        $auctionGoods = $this->getAuctionGoods();
        if(in_array($goodsId, $auctionGoods))
        {
            return ERROR_CAN_NOT_RELEASE;
        }

        if(!$this->m_common->insert("auctionItems", $insertData))
        {
            return ERROR_SYSTEM;
        }
        return ERROR_OK;
    }

    /**
     * 修改展品信息
     * @param $itemId
     * @param $modInfo
     * @return mixed
     */
    function modActionItem($itemId, $modInfo)
    {
        $auctionItemObj = $this->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            return ERROR_AUCTION_NOT_FOUND;
        }

        /*
        if($auctionItemObj->status == AUCTION_ON)
        {
            return ERROR_AUCTION_ON;
        }

        if($auctionItemObj->bidsNum > 0)
        {
            return ERROR_HAS_BID;
        }
        */

        if(!$auctionItemObj->modInfo($modInfo))
        {
            //修改出错
            return ERROR_MOD_AUCTION_FAILED;
        }
        return ERROR_OK;
    }

    /**
     * 删除展品
     * @param $itemId
     * @return mixed
     */
    function delAuctionItem($itemId)
    {
        $auctionItemObj = $this->getAuctionItemObj($itemId);
        if(!$auctionItemObj)
        {
            return ERROR_AUCTION_NOT_FOUND;
        }

        if($this->m_common->delete("auctionItems", array("id" => $itemId)) >= 1)
        {
            $auctionItemObj->deleteCache();
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }

    /**
     * 获取当前上架拍卖的商品ID数组
     * @return mixed
     */
    function getAuctionGoods()
    {
        $this->db->select("distinct(goods_id)")->from("auctionItems")->join("goods_bak", "goods_bak.goods_bak_id = auctionItems.goods_bak_id")->where(array("status" => AUCTION_ON));
        $auctionGoods =  $this->db->get()->result_array();
        $auctionGoodArr = array();
        foreach($auctionGoods as $one)
        {
            $auctionGoodArr[] = $one["goods_id"];
        }

        return $auctionGoodArr;
    }

    //get user bid records list
    function getBidList($offset){
        $data = $this->db->from('biddinglogs')->join('goods',"biddingLogs.auctionItemId = goods.goods_id")->join('user',"biddinglogs.userId = user.userId")->select("biddinglogs.userId,biddinglogs.auctionItemId,icon,goods_name,name,nowPrice,createTime,telephone")->limit(20,$offset)->get()->result_array();//limit(1,2)=>sql limit 2,1
        for ($i=0; $i < count($data); $i++) { 
            $itemid = $data[$i]['auctionItemId'];
            $auctionObj = $this->db->select('endTime,bidsNum')->from('auctionitems')->where('goods_bak_id',$itemid)->get()->row();
            $hightPrice = $this->db->select('nowPrice')->from('biddinglogs')->where('auctionItemId',$itemid)->order_by('nowPrice','DESC')->limit(1)->get()->row_array();
            if ($data[$i]['nowPrice'] == $hightPrice['nowPrice']) {
                if ($auctionObj->endTime < time() && $auctionObj->bidsNum > 0) {
                    $data[$i]['isSale'] = 1;
                }else{
                    $data[$i]['isHigh'] = 1;
                }
                //code
            }
        }

        return $data;
    }
}