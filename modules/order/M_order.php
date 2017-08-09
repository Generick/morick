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
        $this->load->model('m_saleMeeting');
        $this->load->model('m_messagePush');
        $this->load->model('m_merchant');
        $this->load->model('m_promoter');
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
            if (empty($orderObj->acceptName)) 
            {
                $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $orderObj->userId);
                $orderObj->telephone = $userObj->telephone;
            }
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
        if ($orderObj->orderType == 2) 
        {
            if ($type == 1) 
            {
                foreach ($orderObj->orderGoods as $v) 
                {
                    $commodityInfo = $this->m_saleMeeting->getCommodityInfo($v->id);
                    $this->m_saleMeeting->modCommodity($v->id, array('stock_num' => $v->goodsNum + $commodityInfo->stock_num));
                } 
            }else if($type == 0)
            {
                foreach ($orderObj->orderGoods as $v) 
                {
                    $commodityObj = $this->m_saleMeeting->getCommodityInfo($v->id);
                    if ($commodityObj->CID > 0) 
                    {
                        $mchCommodityObj = $this->m_merchant->getCommodityInfo($commodityObj->CID);
                        $this->m_messagePush->createUserMsg($mchCommodityObj->userId, MP_MSG_TYPE_MCH_C_ORDER, $commodityObj->CID, $mchCommodityObj->mch_commodity_name);
                    }
                }
            }

        }
        return ERROR_OK;
    }

    //特卖会支付
    function payTMH($userId, $commodity_id, $clientPrice, $clientTime, $buyNum, &$order_no)
    {
        $this->load->model('m_user');
        $this->load->model('m_shippingAddress');
        $this->load->model('m_transaction');
        $TMH = $this->db->where('commodity_id', $commodity_id)->get('sale_meeting')->row_array();
        if (empty($TMH)) return ERROR_NOT_TMH_COMMODITY;
        $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $userId);
        $commodityObj = $this->m_saleMeeting->getCommodityInfo($commodity_id);
        if ($commodityObj->commodity_attr == 0 && $buyNum > 1) return ERROR_BUY_NUM_ERROR;
        if ($commodityObj->stock_num <= 0 || $commodityObj->stock_num < $buyNum) return ERROR_STOCK_NUM_NOT_ENOUGH;
        
        // if ($userObj->balance < $commodityObj->commodity_price) 
        // {
        //     return ERROR_BALANCE_NOT_ENOUGH;
        // }

        //add
        $up_time = $this->db->select('add_time')->where('commodity_id', $commodity_id)->get('sale_meeting')->row_array();
        $leapYear = $this->leapYear();
        $serverPrice = $commodityObj->commodity_price*(1+($commodityObj->annualized_return/($leapYear*1440)/100*(($clientTime-$up_time['add_time'])/60)));
        $price = (int)floor($serverPrice);
        if($clientPrice != $price) return ERROR_TIME_OUT;
        //end
        $totalPrice = $price * $buyNum;
        $orderInfo = array(
            'order_no' => date('Ymd') . mt_rand(100000, 999999),
            'userId' => $userId,
            'deliveryType' => 0,
            'orderTime' => time(),
            'goodsPrice' => $commodityObj->commodity_price,
            'payPrice' => $totalPrice,
            'orderType' => 2,
            'orderStatus' => 1,
            'payType' => 3,//contact with custom service and pay for the bill
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
            $this->m_transaction->addTransaction($userId, TRANSACTION_COMMODITY, $totalPrice);
            //contact with custom service and pay for the bill, don't use balance
            // $newBalance = $userObj->balance - $commodityObj->commodity_price;
            // $userObj->modInfoWithPrivilege(array('balance' => $newBalance));
            $order_goods_arr = array('order_no' => $orderInfo['order_no'], 'goodsId' => $commodity_id, 'goodsNum' => $buyNum);
            $this->db->insert('order_goods', $order_goods_arr);
            $order_logs_arr = array('order_no' => $orderInfo['order_no'], 'orderStatus' => 1, 'statusTime' => time());
            $this->db->insert('order_logs', $order_logs_arr);
            $arr = array(
                'commodity_id' => $commodity_id,
                'commodity_name' => $commodityObj->commodity_name,
                'commodity_price' => $price,
                'sale_num' => $buyNum,
                'sale_time' => time(),
                'bid_price' => $commodityObj->bid_price>0?$commodityObj->bid_price:ceil($clientPrice*0.85),
                );
            $this->db->insert('sale_record', $arr);
            $this->m_saleMeeting->modCommodity($commodity_id, array('stock_num' => $commodityObj->stock_num - $buyNum, 'sold_time' => $clientTime));
            $this->m_messagePush->createUserMsg($userId, MP_MSG_TYPE_COMMODITY, $orderInfo['order_no'], $commodityObj->commodity_name);
            $order_no = $orderInfo['order_no'];
            
            return ERROR_OK;
        }
        return ERROR_SYSTEM;

        
    }

    //闰年判断
    function leapYear()
    {
        $year = date('Y', time());
        if (($year % 4 == 0 && $year % 100 != 0) || ($year % 400 == 0)) return 366;
        return 365;
    }

    //价格判断
    function priceJudge($commodityObj, $clientPrice, $clientTime)
    {
        $leapYear = $this->leapYear();
        $up_time = $this->db->select('add_time')->where('commodity_id', $commodityObj->id)->get('sale_meeting')->row_array();
        $serverPrice = $commodityObj->commodity_price*(1+($commodityObj->annualized_return/($leapYear*1440)/100*(($clientTime-$up_time['add_time'])/60)));
        $price = (int)floor($serverPrice);
        //return 0.01;
        //if ($price == $clientPrice) return 0.01;
        if ($price == $clientPrice)
        {
            if ($price > 1) 
            {
                return (int)$price;
            }
           return $price; 
        }
        return false;
    }

    //微信支付宝支付商品
    function wxPayTMH($userId, $commodity_id, $clientPrice, $clientTime, $buyNum, &$ret, $payEnv, $returnUrl, $openId = '')
    {
        $this->load->model('m_user');
        $this->load->model('m_shippingAddress');
        $this->load->model('m_transaction');
        $TMH = $this->db->where('commodity_id', $commodity_id)->get('sale_meeting')->row_array();
        if (empty($TMH)) return ERROR_NOT_TMH_COMMODITY;
        $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $userId);
        $commodityObj = $this->m_saleMeeting->getCommodityInfo($commodity_id);
        if ($commodityObj->stock_num <= 0) return ERROR_STOCK_NUM_NOT_ENOUGH;
        if ($payEnv == 5 && empty($openId)) return ERROR_OPEN_ID_NULL;
        $price = $this->priceJudge($commodityObj, $clientPrice, $clientTime);
        //var_dump($price);die;
        if (!$price) return ERROR_TIME_OUT;
        //$price = 0.01;
        $totalPrice = $price * $buyNum;
        $orderInfo = array(
            'order_no' => 'wx'.date('Ymd') . mt_rand(100000, 999999),
            'userId' => $userId,
            'deliveryType' => 0,
            'orderTime' => $clientTime,
            'goodsPrice' => $commodityObj->commodity_price,
            'payPrice' => $totalPrice,
            'orderType' => 2,
            'orderStatus' => 1,
            'payType' => $payEnv+10,//pay method + 10
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
            $ret['url'] = '';
            $orderInfo['buyNum'] = $buyNum;
            //$res = $this->callPayAPI($orderInfo, $commodityObj, $payEnv, $returnUrl, $ret);
            //$res = $this->otherThirdPay($orderInfo['order_no'], $totalPrice, $payEnv, $openId, $ret);
            $this->m_transaction->addTransaction($userId, TRANSACTION_COMMODITY, $totalPrice);
            //contact with custom service and pay for the bill, don't use balance
            // $newBalance = $userObj->balance - $commodityObj->commodity_price;
            // $userObj->modInfoWithPrivilege(array('balance' => $newBalance));
            $order_goods_arr = array('order_no' => $orderInfo['order_no'], 'goodsId' => $commodity_id, 'goodsNum' => $buyNum);
            $this->db->insert('order_goods', $order_goods_arr);
            $order_logs_arr = array('order_no' => $orderInfo['order_no'], 'orderStatus' => 1, 'statusTime' => time());
            $this->db->insert('order_logs', $order_logs_arr);
            $arr = array(
                'commodity_id' => $commodity_id,
                'commodity_name' => $commodityObj->commodity_name,
                'commodity_price' => $price,
                'sale_num' => $buyNum,
                'sale_time' => time(),
                'bid_price' => $commodityObj->bid_price>0?$commodityObj->bid_price:ceil($clientPrice*0.85),
                );
            $this->db->insert('sale_record', $arr);
            $this->m_saleMeeting->modCommodity($commodity_id, array('stock_num' => $commodityObj->stock_num - $buyNum, 'sold_time' => $clientTime));
            $this->m_messagePush->createUserMsg($userId, MP_MSG_TYPE_COMMODITY, $orderInfo['order_no'], $commodityObj->commodity_name);
            $ret['order_no'] = $orderInfo['order_no'];
            return ERROR_OK;
            //return $res;
        }
        return ERROR_SYSTEM;
        
    }

    //另一家第三方支付-_-||
    function otherThirdPay($order_no, $money, $payType, $openId = '', &$ret)
    {
        //md5(payUserId + appId + money + time + key),
        //$money = 1;//测试用的支付金额，单位是分
        $payUserId = T_PAY_USER_ID; //2
        $appId = T_APP_ID;//8
        $key = T_KEY;//A85CE8F77D2917013D4963CEC6B7522E
        //test params above
        $time = time();
        $sign = md5($payUserId.$appId.$money.$time.$key);
        $params = array(
            'payUserId' => $payUserId,
            'appId' => $appId,
            'money' => $money,
            'time' => $time,
            'payType' => $payType,
            'sign' => $sign,
            'userOrderNo' => $order_no,
            );
        if ($payType == 5) 
        {
            $params['openId'] = $openId;
        }
        //$url = "http://pay.uerbx.com/xqh/financial/pay?";
        $url = "http://139.196.51.152:8080/xqh/financial/pay?";
        // example url
        //http://host/xqh/financial/pay?payUserId=1&appId=1&money=1&time=1494252321&payType=1&sign=7ceb9f192d455868e9353f297f320c97&userOrderNo=3&userParam=param3
        foreach ($params as $k => $v) 
        {
            $url .= $k."=".$v.'&';
        }
        $url = rtrim($url, '&');
        $ret['url'] = $url;
        if ($payType == 5) 
        {
            $result = $this->sendHTTP($url);
            log_message('error', '----------request URL--------:'.$url);
            log_message('error', '----------third pay PUBLIC PAY return data--------:'.$result);
            $arr = is_array($result)?$result:json_decode($result, true);
            $ret['prepayInfo'] = $arr;
        }
    }

    //发送HTTP请求
    function sendHTTP($url, $data = array())
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if (!empty($data)){
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($curl);
        curl_close($curl);
        return $output;
    }


    //调用支付API
    function callPayAPI($orderInfo, $commodityObj, $payEnv, $returnUrl, &$ret)
    {
        log_message('error', '-|----|----|----start call pay API---|---|----');
        $params = array();
        $params['version'] = "1.1";
        $params['merchantId'] = THIRD_MCHID;
        //$params['merchantId'] = 100001;
        $params['merchantTime'] = date("YmdHis");
        $params['traceNO'] = $orderInfo['order_no'];
        $params['requestAmount'] = $orderInfo['payPrice'];
        //$params['requestAmount'] = 0.01;
        $params['paymentCount'] = 1;
        $params['payment_1'] = $payEnv.'_'.$orderInfo['payPrice'];
        //$params['payment_1'] = $payEnv.'_0.01';
        $params['payment_2'] = '';
        $params['returnUrl'] = $returnUrl;
        $params['notifyUrl'] = $this->getNotifyUrl();
        $params['goodsName'] = $commodityObj->commodity_name;
        $params['goodsCount'] = $orderInfo['buyNum'];
        $params['ip'] = $this->getIP();
        $params['extend'] = $this->getExtend($payEnv, $orderInfo['order_no']);
        $params['sign'] = $this->getSign($params);
        $params['extend'] = $payEnv == 7 ? $params['extend'] : urlencode($params['extend']);
        //$params = $this->testParams();
        log_message('error', 'prePayParams:---->:'.json_encode($params));
        
        $url = '';

        switch ((int)$payEnv) 
        {
            case 5:
                $url = API_COMMON_PAY;
                break;
            case 6:
                $url = API_COMMON_PAY;
                break;
            case 7:
                $url = API_WX_PUBLIC_PAY;
                break;
            default:
                $url = API_COMMON_PAY;
                break;
        }

        
        if ((int)$payEnv == 7)
        {
            $ret['params'] = $params;
            return ERROR_OK;
        }
        //echo date("Ymd").'---'.$url."<br>";
        $res = $this->http_request($url, $params);
        
        if (!empty($res)) 
        {
            //echo $res;die;
            $resArr = explode("|", $res);
            //var_dump($resArr);die;
            if(count($resArr) < 3)
            {
                log_message('error', 'API return error-------->'.$res);
                return ERROR_CALL_API;
            }
            $resCode = $resArr[0];
            $resDATA = $resArr[1];
            $resSign = $resArr[2];
            if ($resCode == '000') 
            {
                $data = json_decode($resDATA, true);
                // if ($data['errorMsg'] != "交易成功" || $data['errorMsg'] != "收单成功") 
                // {
                //     log_message('error', 'data[errorMsg]================='.$data['errorMsg']);
                //     log_message('error', 'trade fail--|-----|-----|---->:'.$res);
                //     return ERROR_TRADE_FAIL;
                // }
                //var_dump($data);
                if (isset($data['payments'])) 
                {
                    $payments = $data['payments'];
                    //var_dump($data['payments']);
                    if (isset($payments[0]['itemResponseMsg'])) 
                    {
                        $itemResponseMsg = $payments[0]['itemResponseMsg'];
                        //var_dump($itemResponseMsg);
                        switch ((int)$payEnv) 
                        {
                            case 5:
                                $ret['url'] = $itemResponseMsg['wxurl'];
                                break;
                            case 6:
                                $ret['url'] = $itemResponseMsg['barcodeInfo'];
                                break;
                            case 7:
                                $ret['url'] = $itemResponseMsg['localUrl'];
                                break;
                            default:
                                break;
                        }
                        return ERROR_OK;
                    }
                }
                log_message('error', 'trade fail--|-----|-----|---->:'.$res);
                return ERROR_TRADE_FAIL;
            }
            log_message('error', 'trade fail--|-----|-----|---->:'.$res);
            return $this->errorHandle($resCode);
        }
        return ERROR_API_RETURN_NULL;
    }

    //sign
    function getSign($params = array())
    {
        ksort($params);
        $str = '';
        foreach ($params as $v) 
        {
            $str .= $v;
        }
        $str .= THIRD_APPSECRET;
        //$str .= "1234512345";
        $sign = hash('sha256', $str);
        return $sign;
    }

    function getExtend($payEnv, $orderId)
    {
        if ((int)$payEnv == 5) 
        {
            $extend = "wap_url=".$_SERVER['HTTP_HOST']."&wap_name=雅玩之家&"."orderId=".$orderId;
            return $extend;
        }
        return "orderId=".$orderId;
    }

    function getIP()
    {
       //  return '140.206.112.170';
        if(strtolower(substr(PHP_OS,0,3)) == "win") return '140.206.112.170';
        return '123.206.106.123';
        if(isset($_SERVER))
        {
            if($_SERVER['SERVER_ADDR'])
            {
                $server_ip=$_SERVER['SERVER_ADDR'];
            }else
            {
                $server_ip=$_SERVER['LOCAL_ADDR'];
            }
        }else
        {
          $server_ip = getenv('SERVER_ADDR');
        }
      return $server_ip;
    }

    function getNotifyUrl()
    {
        $httpType = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')) ? 'https://' : 'http://';
        $port = strpos($_SERVER['HTTP_HOST'], $_SERVER['SERVER_PORT']) > 0 ? '' : ":".$_SERVER['SERVER_PORT'];
        $path = $this->getIP() != '123.206.106.123' ? '/auction/index.php' : '';
        $url = $httpType.$_SERVER['HTTP_HOST'].$port.$path."/wx/WxCallback/callbackFunc";
        return $url;
    }

    //发送请求
    function http_request($url, $data = array())
    {
        $str = '';
        foreach ($data as $k => $v) 
        {
            $str .= $k.'='.$v.'&';
        }
        $str = rtrim($str,'&');
        //$data = urlencode($str);
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if (!empty($str)){
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $str);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($curl);
        curl_close($curl);
        return $output;
    }

    function errorHandle($errorCode)
    {
        switch ($errorCode) 
        {
            case '001':
                return ERROR_MCH_ORDER_NO_NOT_NULL;
                break;
            case '002':
                return ERROR_CARD_NOT_BIG_THAN_MIAN;
                break;
            case '003':
                return ERROR_CARD_VERIFY_NOT_PAY;
                break;
            case '004':
                return ERROR_GOODS_NAME_LENGTH_ERROR;
                break;
            case '005':
                return ERROR_MCH_NOT_AUTH_PAY_TOOL;
                break;
            case '006':
                return ERROR_MCH_NOT_ALLOW_CREATE_PAY_ORDER;
                break;
            case '007':
                return ERROR_PAY_MONEY_LOW_THAN_REQUIRE_MONEY;
                break;
            case '009':
                return ERROR_SIGN_ERROR;
                break;
            case '010':
                return ERROR_MCH_NOT_ALLOW_CREATE_TUI;
                break;
            case '014':
                return ERROR_MCH_TIME_NOT_NULL;
                break;
            case '015':
                return ERROR_NO_RETURN_URL;
                break;
            case '016':
                return ERROR_ORDER_MONEY_ILLEGAL;
                break;
            case '018':
                return ERROR_PAY_MONEY_NOT_ILLEGAL;
                break;
            case '019':
                return ERROR_PAY_RESULT_NOTICE_URL_NOT_NULL;
                break;
            case '020':
                return ERROR_GOOGS_NUM_ILLEGAL;
                break;
            case '901':
                return ERROR_CARD_BALANCE_NOT_ENOUGH;
                break;
            case '999':
                return ERROR_OTHER_EXCEPTION;
                break;
            
            default:
                return ERROR_OTHER_EXCEPTION;
                break;
        }
    }

    //test data
    function testParams()
    {
        $params = array();
        $params['version'] = "1.1";
        $params['merchantId'] = 100001;
        $params['merchantTime'] = "20140221205200";
        $params['traceNO'] = time().mt_rand(1000,9999);
        $params['requestAmount'] = 0.01;
        $params['paymentCount'] = 1;
        $params['payment_1'] = "5_0.01";
        $params['payment_2'] = '';
        $params['returnUrl'] = "http://www.jd.com/returnUrl.htm";
        $params['notifyUrl'] = "http://www.jd.com/notifyUrl.htm";
        $params['goodsName'] = "牙刷";
        $params['goodsCount'] = 1;
        $params['ip'] = "140.206.112.170";
        $params['extend'] = "app_name=极品影院extreme&package_name=com.media.extreme&周年纪念版";
        $params['sign'] = $this->getSign($params);
        $params['extend'] = urlencode($params['extend']);
        return $params;
    }

    //支付回调
    function callbackFunc()
    {
        log_message('error', '---|----|----|----start pay API call back--|-----|----|----');
        $this->otherCallBack();
        return;
        $raw_data = $_REQUEST['msg'];
        log_message('error', 'raw_data---->:'.$raw_data);
        if (empty($raw_data)) 
        {
            echo "Y";
            return;
        }
        $data = explode('|', $raw_data);
        $code = $data[0];
        $callbackData = json_decode($data[1], true);
        $sign = $data[2];
        if ($code == '000') 
        {
            switch ((int)$callbackData['orderStatus']) 
            {
                case 0:
                    # code...
                    break;
                case 1:
                    $this->wxPaySuccess($callbackData['traceNO']);
                    break;
                case 2:
                    $this->payFail($callbackData['traceNO']);
                    break;
                case 3:
                    # code...
                    break;
                case 4:
                    # code...
                    break;
                case 9:
                    # code...
                    break;
                
                default:
                    # code...
                    break;
            }
        }
        echo "Y";
    }

    function otherCallBack()
    {
        ob_clean();
        log_message('error', '-------r-eceived data-------:'.json_encode($_REQUEST));
        $order_no = isset($_REQUEST['userOrderNo'])?$_REQUEST['userOrderNo']:'';
        log_message('error', '-|-|-|-|receive order_no-----------:'.$order_no);
        if (empty($order_no))
        {
            echo 1;
            return;
        } 
        $this->wxPaySuccess($order_no);
    }

    //支付成功处理
    function wxPaySuccess($orderId)
    {
        $orderInfo = $this->getOrderAll($orderId);
        if (empty($orderInfo))
        {
            echo 1;
            return;
        }
        if ($orderInfo->orderStatus > 1)
        {
            echo 1;
            return;
        }
        $this->modOrderInfo($orderId, array('orderStatus'=>2));
        $commodityObj = $this->m_saleMeeting->getCommodityInfo($orderInfo->orderGoods[0]->id);
        $this->m_messagePush->createUserMsg($orderInfo->userId, MP_MSG_TYPE_PAY_SUCCESS, $orderId, $commodityObj->commodity_name);
        if ($commodityObj->CID > 0) 
        {
            $mchCommodityObj = $this->m_merchant->getCommodityInfo($commodityObj->CID);
            $this->m_messagePush->createUserMsg($mchCommodityObj->userId, MP_MSG_TYPE_MCH_C_ORDER, $commodityObj->CID, $mchCommodityObj->mch_commodity_name);
        }
        $this->m_promoter->updateUserOrderStatistics($orderInfo->userId);
        echo 1;
    }

    //支付失败处理
    function payFail($orderId)
    {
        $orderInfo = $this->getOrderAll($orderId);
        $this->modOrderInfo($orderId, array('orderStatus'=>1));
        $commodityObj = $this->m_saleMeeting->getCommodityInfo($orderInfo->orderGoods[0]->id);
        $this->m_messagePush->createUserMsg($orderInfo->userId, MP_MSG_TYPE_PAY_FAIL, $orderId, $commodityObj->commodity_name);
    }

    //继续支付
    function continuePay($order_no, $returnUrl, $openId = '', &$res)
    {
        log_message('error', '---|----|---start continue pay---|------|----');
        $orderObj = $this->getOrderAll($order_no);
        if (!$orderObj) return ERROR_ORDER_NOT_FOUND;
        if (!isset($orderObj->orderGoods)) return ERROR_ORDER_GOODS_ERROR;
        $commodityObj = $this->m_saleMeeting->getCommodityInfo($orderObj->orderGoods[0]->id);
        $leapYear = $this->leapYear();
        $up_time = $this->db->select('add_time')->where('commodity_id', $commodityObj->id)->get('sale_meeting')->row_array();
        $price = $commodityObj->commodity_price*(1+($commodityObj->annualized_return/($leapYear*1440)/100*(($orderObj->orderTime-$up_time['add_time'])/60)));
        //$price = 0.01;
        if ($price >= 1) 
        {
            $price = (int)$price;
        }
        $totalPrice = $orderObj->orderGoods[0]->goodsNum * $price;
        $orderInfo = array(
            'order_no' => $order_no,
            'userId' => $orderObj->userId,
            'deliveryType' => $orderObj->deliveryType,
            'orderTime' => $orderObj->orderTime,
            'goodsPrice' => $commodityObj->commodity_price,
            'payPrice' => $totalPrice*100,//以分为单位
            //'payPrice' => 0.01,
            'orderType' => 2,
            'orderStatus' => 1,
            'payType' => $orderObj->payType,
            'buyNum' => $orderObj->orderGoods[0]->goodsNum,
            );
        log_message('error', 'continue pay order params:-------->'.json_encode($orderInfo));
        if ($orderObj->payType-10 == 5 && empty($openId)) return ERROR_OPEN_ID_NULL;
        $this->otherThirdPay($order_no, $totalPrice*100, $orderObj->payType-10, $openId, $res);
        return ERROR_OK;
        //return $this->callPayAPI($orderInfo, $commodityObj, $orderInfo['payType'], $returnUrl, $res);
    }

    function continuePayTest($openId, &$res)
    {
        if(empty($openId)) return ERROR_OPEN_ID_NULL;
        $order_no = date("YmdHis").mt_rand(100000, 999999);
        $this->otherThirdPay($order_no, 1, 5, $openId, $res);
        return ERROR_OK;
    }

    //特卖会订单详情
    function TMHOrderInfo()
    {
        //
    }

}
