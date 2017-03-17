<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-14
 * Time: 下午3:43
 */
class TimedTask extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_auction");
        $this->load->model("m_order");
        $this->load->model("m_freeze");
        $this->load->model("m_goods_bak");
        $this->load->model("m_user");
        $this->load->model("m_smsCode");
        $this->load->model("m_shippingAddress");
        $this->load->model('m_messagePush');
    }

    /**
     * 定时触发 创建订单
     */
    function createOrder()
    {
        log_message("error", "timedTask start.createOrder");
        $auctionItems = array();
        $count = 0;

        $whereArr = array(
            "currentUser !=" => 0,//有人出价
            "endTime <" => now(),//已结束
            "isCreateOrder" => 0,//未处理
            "status" => AUCTION_ON
        );

        $this->m_auction->getAuctionItems(0, 0, $whereArr, array(), "", $auctionItems, $count);
        foreach($auctionItems as $one)
        {
            $orderInfo = array();
            $orderInfo["order_no"] = date('Ymd') .rand(100000, 999999);
            $orderInfo["userId"] = $one->currentUser;
            $orderInfo["goodsBid"] = $one->goodsInfo->goods_bid;
            $orderInfo["goodsPrice"] =  $one->currentPrice;//暂时goodsPrice 跟payPrice一样 后续有需求再调整。
            $orderInfo["prepaidPrice"] = $one->margin;//保证金 作为预支付金额
            $orderInfo["payPrice"] = (($one->currentPrice - $one->margin) > 0) ? ($one->currentPrice - $one->margin) : 0;
            $orderInfo["orderTime"] = now();

            //获取用户的默认收货地址
            $addressList = array();
            $count = 0;
            $this->m_shippingAddress->getShippingAddress(0, 0, array("userId" => $one->currentUser, "isCommon" => 1), $addressList, $count);
            if(count($addressList) > 0)
            {
                $oneAddress = $addressList[0];
                $orderInfo["acceptName"] = $oneAddress->acceptName;
                $orderInfo["province"] = $oneAddress->province;
                $orderInfo["city"] = $oneAddress->city;
                $orderInfo["district"] = $oneAddress->district;
                $orderInfo["address"] = $oneAddress->address;
                $orderInfo["mobile"] = $oneAddress->mobile;
            }

            $retCode = $this->m_order->createOrder($orderInfo, $one->goodsInfo->goods_id);

            if($retCode == ERROR_OK)
            {
                if($orderInfo["payPrice"] == 0)
                {
                    //说明保证金 大于等于拍品金额 直接修改订单状态为已付款
                    $this->m_order->modOrderInfo($orderInfo["order_no"], array("payTime" => now(), "orderStatus" => ORDER_STATUS_PAY));
                }
                $this->m_auction->modActionItem($one->id, array("isCreateOrder" => 1));

                //返还冻结保证金
                $this->m_freeze->unfreeze(FREEZE_AUCTION, $one->id, $one);

                //创建获拍消息
                //userid , msg type,href id=>auction id
                $this->m_messagePush->createUserMsg($one->currentUser, MP_MSG_TYPE_AUCTION, $orderInfo['order_no']);

                //竞拍成功 短信提醒
                // if($this->m_common->get_one("paid_services", array("userId" =>$one->currentUser, "serviceType" => SERVICE_SMS_MONTHLY, "startTime <=" => now(), "endTime >=" => now())))
                // {
                //     $goodsInfo = $this->m_goods_bak->getGoodsBakBase($one->goods_bak_id);
                //     if($goodsInfo)
                //     {
                //         $content = $this->m_common->format(SMS_OBTAIN, $goodsInfo->goods_name, $one->currentPrice);

                //         $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $one->currentUser);
                //         if($userObj)
                //         {
                //             //close message notification
                //             //$this->m_smsCode->sendMsg($userObj->telephone, $content);
                //             $this->m_common->insert("sms_remind", array("remindType" => 1, "userId" => $one->currentUser, "auctionId" => $one->id, "remindTime" => now()));
                //         }
                //     }
                // }
                //code
            }
        }

        $this->m_common->insert("timetask_logs", array("timetask_type" => 0, "timetask_time" => now()));
        return;
    }

    function remindNearEnd()
    {
        log_message("error", "timedTask start.remindNearEnd");
        $auctionItems = array();
        $count = 0;

        $whereArr = array(
            "currentUser !=" => 0,//有人出价
            "endTime <=" => (now() + 60 * 60),//已结束
            "isRemind" => 0,//未处理
            "status" => AUCTION_ON
        );

        $this->m_auction->getAuctionItems(0, 0, $whereArr, array(), "", $auctionItems, $count);
        foreach($auctionItems as $one)
        {
            $auctionId = $one->id;

            //获取所有竞拍者
            $this->db->select("distinct(userId)")->from("biddingLogs");
            $this->db->where(array("auctionItemId" => $auctionId));
            $users = $this->db->get()->result_array();

            foreach($users as $user)
            {
                if($this->m_common->get_one("paid_services", array("userId" => $user["userId"], "serviceType" => SERVICE_SMS_MONTHLY, "startTime <=" => now(), "endTime >=" => now())))
                {
                    $goodsInfo = $this->m_goods_bak->getGoodsBakBase($one->goods_bak_id);
                    if($goodsInfo)
                    {
                        $content = $this->m_common->format(SMS_NEAR_END, $goodsInfo->goods_name, $one->currentPrice);

                        $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $user["userId"]);
                        if($userObj)
                        {
                            //close message notification
                            //$this->m_smsCode->sendMsg($userObj->telephone, $content);
                            $this->m_common->insert("sms_remind", array("remindType" => 2, "userId" => $one->currentUser, "auctionId" => $one->id, "remindTime" => now()));
                        }
                    }
                }
            }

            $this->m_auction->modActionItem($auctionId, array("isRemind" => 1));
        }

        $this->m_common->insert("timetask_logs", array("timetask_type" => 1, "timetask_time" => now()));
        return;
    }
}