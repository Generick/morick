<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-12
 * Time: 下午4:01
 */
class M_order extends My_Model
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
        foreach (self::$loadedItems as $orderId => $orderObj)
        {
            if (!$orderObj->saveDB())
            {
                $this->log->write_log('error', "Save order failed: $orderId");
            }
        }

        $this->cache->redis->release();
    }

    /**
     * 获取订单对象
     * @param $orderId
     * @return COrder|mixed|null
     */
    function getOrderObj($orderId)
    {
        $orderObj = null;
        if(isset(self::$loadedItems[$orderId]))
        {
            $orderObj = self::$loadedItems[$orderId];
            return $orderObj;
        }

        $orderObj = unserialize($this->cache->redis->get(CACHE_PREFIX_ORDER . $orderId));
        if($orderObj)
        {
            self::$loadedItems[$orderId] = $orderObj;
            return $orderObj;
        }

        $result = $this->m_common->get_one("order", array("order_no" => $orderId));
        if(!empty($result))
        {
            $orderObj = new COrder();
            $orderObj->itemId = $orderId;
            $orderObj->initWithDBData($result);
            $orderObj->saveCache();
            self::$loadedItems[$orderId] = $orderObj;
            return $orderObj;
        }
        return null;
    }

    function getOrderSmall($orderId)
    {
        $orderObj = $this->getOrderObj($orderId);
        if(!$orderObj)
        {
            return null;
        }
        $smallData = $orderObj->getOrderSmallData();
        return $smallData;
    }
    /**
     * 获取订单基础信息
     * @param $orderId
     * @return COrderBaseInfo|null
     */
    function getOrderBase($orderId)
    {
        $orderObj = $this->getOrderObj($orderId);
        if(!$orderObj)
        {
            return null;
        }
        $baseData = $orderObj->getOrderBaseData();
        return $baseData;
    }

    /**
     * 获取订单详情
     * @param $orderId
     * @return COrderAllInfo|null
     */
    function getOrderAll($orderId)
    {
        $orderObj = $this->getOrderObj($orderId);
        if(!$orderObj)
        {
            return null;
        }
        $allData = $orderObj->getOrderAllData();
        return $allData;
    }

    /**
     * 创建订单
     * @param $orderInfo
     * @param $goodsId
     * @return mixed
     */
    function createOrder($orderInfo, $goodsId)
    {
        //插入数据到order表
        $retCode = $this->m_common->insert("order", $orderInfo);
        if($retCode == false)
        {
            return ERROR_INSERT_ORDER_FAILED;
        }

        //把商品加入到order_goods表
        $this->setOrderGoods($orderInfo["order_no"], $goodsId);

        //同步数据到order_logs表
        $this->setOrderLogs($orderInfo["order_no"], ORDER_STATUS_WAIT_PAY);

        return ERROR_OK;
    }

    /**
     * 获取订单列表
     * @param $startIndex
     * @param $num
     * @param array $whereArr
     * @param string $likeStr
     * @param $orderList
     * @param $count
     * @return mixed
     */
    function getOrderList($startIndex, $num, $whereArr = array(), $likeStr = "", &$orderList, &$count, $dataType = ORDER_TYPE_ALL)
    {
        $this->db->start_cache();
        $this->db->select("order_no, name, telephone")->from("order");
        $this->db->join("user", "user.userId = order.userId");
        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }
        if(!empty($likeStr))
        {
            $this->db->like("order_no", $likeStr);
            $this->db->or_like("name", $likeStr);
        }
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $this->db->order_by("orderTime desc,payTime desc");

        $ret = $this->db->get()->result_array();
        $this->db->flush_cache();
        foreach($ret as $one)
        {
            switch($dataType)
            {
                case ORDER_TYPE_SMALL:
                    $orderInfo = $this->getOrderSmall($one["order_no"]);
                    break;
                case ORDER_TYPE_BASE:
                    $orderInfo = $this->getOrderBase($one["order_no"]);
                    break;
                case ORDER_TYPE_ALL:
                    $orderInfo = $this->getOrderAll($one["order_no"]);
                    break;
            }

            if($orderInfo->orderStatus == ORDER_STATUS_WAIT_PAY && ((now() - ORDER_CANCEL_TIME) > $orderInfo->orderTime))
            {
                //未支付
                $this->modOrderInfo($one["order_no"], array("orderStatus" => ORDER_STATUS_CANCEL));
                $orderInfo->orderStatus = ORDER_STATUS_CANCEL;
            }

            $orderInfo->name = $one["name"];
            $orderInfo->telephone = $one["telephone"];
            $orderList[] = $orderInfo;
        }
        return ERROR_OK;
    }

    function modOrderInfo($orderId, $modInfo)
    {
        $orderObj = $this->getOrderObj($orderId);
        if($orderObj == null)
        {
            return ERROR_ORDER_NOT_FOUND;
        }

        if(!$orderObj->modInfoWithPrivilege($modInfo))
        {
            return ERROR_MOD_ORDER_FAILED;
        }

        //新增订单状态变更记录
        if(array_key_exists("orderStatus", $modInfo))
        {
            $this->setOrderLogs($orderId, $modInfo["orderStatus"]);
        }
        return ERROR_OK;
    }

    function setOrderGoods($orderId, $goodsId)
    {
        $orderLog = $this->m_common->get_one("order_goods", array("order_no" => $orderId));
        if(!$orderLog)
        {
            $this->m_common->insert("order_goods", array("order_no" => $orderId, "goodsId" => $goodsId));
        }
        else
        {
            $this->m_common->update("order_goods", array("goodsId" => $goodsId), array("order_no" => $orderId));
        }

        $orderObj = $this->getOrderObj($orderId);
        if($orderObj)
        {
            $orderObj->initOrderGoods();
            $orderObj->saveCache();
        }
    }

    /**
     * 新增订单状态变更记录
     * @param $orderId
     * @param $orderStatus
     */
    function setOrderLogs($orderId, $orderStatus)
    {
        $orderLog = $this->m_common->get_one("order_logs", array("order_no" => $orderId, "orderStatus" => $orderStatus));
        if(!$orderLog)
        {
            $this->m_common->insert("order_logs", array("order_no" => $orderId, "orderStatus" => $orderStatus, "statusTime" => now()));
        }

        $orderObj = $this->getOrderObj($orderId);
        if($orderObj)
        {
            $orderObj->initOrderLogs();
            $orderObj->saveCache();
        }
    }

    /**
     * 订单统计
     * @param $startIndex
     * @param $num
     * @param $whereArr
     * @param $totalTurnover
     * @param $totalBid
     * @param $count
     * @param $orderList
     * @return mixed
     */
    function orderStatistical($startIndex, $num, $whereArr, &$totalTurnover, &$totalBid, &$count, &$orderList)
    {
        $this->db->select_sum("goodsPrice")->select_sum("goodsBid")->from("order");
        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }

        $ret = $this->db->get()->result();
        $totalTurnover = $ret[0]->goodsPrice ?  $ret[0]->goodsPrice : 0;
        $totalBid = $ret[0]->goodsBid ?  $ret[0]->goodsBid : 0;
        $this->getOrderList($startIndex, $num, $whereArr, "", $orderList, $count, ORDER_TYPE_SMALL);
        return ERROR_OK;
    }

    //operate order status
    function sure_cancel_order($order_no, $type)
    {
        $orderObj = $this->getOrderObj($order_no);
        if (!$orderObj) {
            return ERROR_ORDER_NOT_FOUND;
            exit;
        }

        switch ($type) {
            case 0:
                //sure complete order
                $status = ORDER_STATUS_RECEIVE;
                break;
            case 1:
                //cancel order
                $status = ORDER_STATUS_CANCEL;
                break;
            
            default:
                # code...
                break;
        }

        //$this->db->where('order_no',$orderObj->order_no)->update('order',array('orderStatus'=>$status));
        $this->modOrderInfo($order_no,array('orderStatus'=>$status));
        return ERROR_OK;
    }

    //特卖会支付
    function payTMH($userId, $commodity_id)
    {
        $this->load->model('m_user');
        $this->load->model('m_saleMeeting');
        $this->load->model('m_shippingAddress');
        $this->load->model('m_messagePush');
        $this->load->model('m_transaction');
        $TMH = $this->db->where('commodity_id', $commodity_id)->get('sale_meeting')->row_array();
        if (empty($TMH)) return ERROR_NOT_TMH_COMMODITY;
        $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $userId);
        $commodityObj = $this->m_saleMeeting->getCommodityInfo($commodity_id);
        if ($commodityObj->stock_num <= 0) return ERROR_STOCK_NUM_NOT_ENOUGH;
        if ($userObj->balance < $commodityObj->commodity_price) 
        {
            return ERROR_BALANCE_NOT_ENOUGH;
        }

        $orderInfo = array(
            'order_no' => date('Ymd') . mt_rand(100000, 999999),
            'userId' => $userId,
            'deliveryType' => 0,
            'orderTime' => time(),
            'goodsPrice' => $commodityObj->commodity_price,
            'payPrice' => $commodityObj->commodity_price,
            'orderType' => 2,
            'orderStatus' => 2,
            );

        //获取用户的默认收货地址
        $addressList = array();
        $count = 0;
        $this->m_shippingAddress->getShippingAddress(0, 0, array("userId" => $userId, "isCommon" => 1), $addressList, $count);
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

        if ($this->db->insert('order', $orderInfo)) 
        {
            $this->m_transaction->addTransaction($userId, TRANSACTION_COMMODITY, $commodityObj->commodity_price);
            // $newBalance = $userObj->balance - $commodityObj->commodity_price;
            // $modInfo = array('balance' => $newBalance);
            // $userObj->modInfoWithPrivilege($modInfo);
            $order_goods_arr = array('order_no' => $orderInfo['order_no'], 'goodsId' => $commodity_id, 'goodsNum' => 1);
            $this->db->insert('order_goods', $order_goods_arr);
            $order_logs_arr = array('order_no' => $orderInfo['order_no'], 'orderStatus' => 1, 'statusTime' => time());
            $this->db->insert('order_logs', $order_logs_arr);
            //$saleInfo = $this->db->where('commodity_id', $commodity_id)->get('sale_record')->row_array();
            //if (!$saleInfo) 
            //{
                $arr = array(
                    'commodity_id' => $commodity_id,
                    'commodity_name' => $commodityObj->commodity_name,
                    'commodity_price' => $commodityObj->commodity_price,
                    'sale_num' => 1,
                    'sale_time' => time(),
                    );
                $this->db->insert('sale_record', $arr);
                //return ERROR_OK;
            //}
            //$this->db->where('commodity_id', $commodity_id)->update('sale_record', array('sale_num' => $saleInfo['sale_num'] + 1, 'sale_time' => time()));
            $this->m_saleMeeting->modCommodity($commodity_id, array('stock_num' => $commodityObj->stock_num - 1));
            $this->m_messagePush->createUserMsg($userId, MP_MSG_TYPE_COMMODITY, $orderInfo['order_no']);
            
            return ERROR_OK;
        }

        
    }

    //特卖会订单详情
    function TMHOrderInfo()
    {
        //
    }

}
