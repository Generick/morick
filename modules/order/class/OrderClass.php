<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-12
 * Time: 下午4:03
 */

class COrderSmallInfo extends IExtractInfo{
    public static $fields = null;
    private static $staticConstructed = false;
    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        self::$fields = array(
            "order_no",
            "userId",
            "payPrice",
            "payTime",
            "orderGoods",
            "orderTime",
            "orderStatus",
            "orderType",
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class COrderBaseInfo extends IExtractInfo {
    public static $fields = null;
    private static $staticConstructed = false;
    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        self::$fields = array(
            "order_no",
            "userId",
            "deliveryType",
            "logistics_no",
            "payPrice",
            "payTime",
            "orderTime",
            "orderStatus",
            "orderGoods",
            "orderType",
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class COrderAllInfo extends IExtractInfo {
    public static $fields = null;
    private static $staticConstructed = false;
    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        self::$fields = array(
            "order_no",
            "userId",
            "deliveryType",
            "logistics_no",
            "acceptName",
            "province",
            "city",
            "district",
            "address",
            "mobile",
            "goodsBid",
            "goodsPrice",
            "prepaidPrice",
            "payPrice",
            "payTime",
            "orderTime",
            "orderStatus",
            "orderGoods",
            "orderLogs",
            "orderType",
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class COrder extends CDataClassBase {
    // 属性的保存方式
    // Array中保存的是array(objField => CSaveField, ...)
    private static $fields = null;
    // 修改属性的配置：type(修改属性) => 关联的属性field
    private static $modInfo = null;
    private static $staticConstructed = false;

    private static $registeredExtFunctions = array();

    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        // 字段（和数据库对应），同时和类型对应
        self::$fields = array(
            "id" => new CField(FIELD_TYPE_NORMAL),
            "order_no" => new CField(FIELD_TYPE_NORMAL),
            "userId" => new CField(FIELD_TYPE_NORMAL),
            "deliveryType" => new CField(FIELD_TYPE_NORMAL),
            "logistics_no" => new CField(FIELD_TYPE_NORMAL),
            "integral" => new CField(FIELD_TYPE_NORMAL),
            "obtainedIntegral" => new CField(FIELD_TYPE_NORMAL),
            "couponId" => new CField(FIELD_TYPE_NORMAL),
            "acceptName" => new CField(FIELD_TYPE_NORMAL),
            "province" => new CField(FIELD_TYPE_NORMAL),
            "city" => new CField(FIELD_TYPE_NORMAL),
            "district" => new CField(FIELD_TYPE_NORMAL),
            "address" => new CField(FIELD_TYPE_NORMAL),
            "mobile" => new CField(FIELD_TYPE_NORMAL),
            "invoiceInfo" => new CField(FIELD_TYPE_NORMAL),
            "goodsBid" => new CField(FIELD_TYPE_NORMAL),
            "goodsPrice" => new CField(FIELD_TYPE_NORMAL),
            "carriage" => new CField(FIELD_TYPE_NORMAL),
            "tax" => new CField(FIELD_TYPE_NORMAL),
            "integralDeduction" => new CField(FIELD_TYPE_NORMAL),
            "couponDeduction" => new CField(FIELD_TYPE_NORMAL),
            "prepaidPrice" => new CField(FIELD_TYPE_NORMAL),
            "payPrice" => new CField(FIELD_TYPE_NORMAL),
            "payType" => new CField(FIELD_TYPE_NORMAL),
            "payTime" => new CField(FIELD_TYPE_NORMAL),
            "orderTime" => new CField(FIELD_TYPE_NORMAL),
            "orderStatus" => new CField(FIELD_TYPE_NORMAL),
            "isDelete" => new CField(FIELD_TYPE_NORMAL),
            "orderType" => new CField(FIELD_TYPE_NORMAL),
        );
        self::$modInfo = array(
            "deliveryType",
            "logistics_no",
            "payTime",
            "orderStatus",
            "isDelete"
        );

        self::$staticConstructed = true;
    }

    // 注册新的字段，用于扩展
    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }

    public static function registerExtFunction($functionName, $function)
    {
        self::$registeredExtFunctions[$functionName] = $function;
    }

    //////////////////////////////////////////
    // 成员
    public $order_no = 0;
    public $orderGoods = null;//订单商品列表
    public $orderLogs = null;//订单状态变更列表
    public $cacheDeleted = false;

    function __construct()
    {
        parent::__construct();
    }

    function __call($method, $args)
    {
        if (isset(self::$registeredExtFunctions[$method]))
        {
            $function = self::$registeredExtFunctions[$method];
            $function($this, $args);
        }
    }
    /**
     * 使用数据库的数据进行对象的初始化
     * @param $dbResult
     */
    public function initWithDBData($dbResult)
    {
        parent::defaultInitWithDBData($dbResult, self::$fields, array('order_no'));

        //订单商品信息
        $this->initOrderGoods();
        //订单日志信息（状态变化
        $this->initOrderLogs();
    }

    /**
     * 订单商品列表
     */
    public function initOrderGoods()
    {
        $CI = &get_instance();

        $orderGoods = $CI->m_common->get_all("order_goods", array("order_no" => $this->order_no));
        if ($this->orderType == 1) 
        {
            $CI->load->model("m_goods");
            $this->orderGoods = array();
            foreach($orderGoods as $oneGoods)
            {
                $goodsInfo = $CI->m_goods->getGoodsBase($oneGoods["goodsId"]);
                if($goodsInfo)
                {
                    $goodsInfo->goodsNum = $oneGoods["goodsNum"];
                }
                $this->orderGoods[] = $goodsInfo;
            }
            return;
        }
        $CI->load->model('m_saleMeeting');
        $this->orderGoods = array();
        $commodityInfo = $CI->m_saleMeeting->getCommodityInfo($orderGoods[0]['goodsId']);
        if ($commodityInfo) 
        {
            $this->orderGoods[] = $commodityInfo;
        }
        
    }

    /**
     * 订单状态变更记录
     */
    public  function initOrderLogs()
    {
        $CI = &get_instance();
        $this->orderLogs = $CI->m_common->get_all("order_logs", array("order_no" => $this->order_no), "orderStatus, statusTime");
    }

    public function saveCache()
    {
        $CI = &get_instance();
        $CI->cache->redis->save(CACHE_PREFIX_ORDER . $this->order_no, serialize($this), CACHE_ORDER_LIVE_TIME);
    }

    public function deleteCache()
    {
        $CI = &get_instance();
        $CI->cache->redis->delete(CACHE_PREFIX_ORDER . $this->order_no);
        $this->cacheDeleted = true;
    }

    /**
     * 保存到DB中，这个函数会在每次会话结束的时候统一调用
     * @return bool 表示保存成功
     */
    public function saveDB()
    {
        // 获取超级对象
        $CI = &get_instance();
        $updateFields = $this->generateUpdateFields(self::$fields);

        if (count($updateFields) == 0)
        {
            return true;
        }

        $affectedRows = $CI->m_common->update('order', $updateFields, array('order_no' => $this->order_no));
        if ($affectedRows < 1)
        {
            $CI->log->write_log('error', "Update order failed: {$this->order_no}");
            return false;
        }

        if (!$this->cacheDeleted)
        {
            $this->saveCache();
        }
        return true;
    }

    /**
     * 修改用户属性：只包括Normal字段或者类型为CNormalKV的字段
     * @param $info     数组：{key => value}
     * @return bool
     */
    public function modInfo($info)
    {
        return parent::defaultModInfo($info, self::$modInfo, self::$fields);
    }

    public function modInfoWithPrivilege($info)
    {
        return parent::defaultModInfoWithPrivilege($info, self::$fields);
    }

    public function getOrderSmallData()
    {
        $data = new COrderSmallInfo();
        $data->copyFromObj(COrderSmallInfo::$fields, $this);
        return $data;
    }

    /**
     * 组一份简易信息发给客户端，只包含最关键的内容
     */
    public function getOrderBaseData()
    {
        $data = new COrderBaseInfo();
        $data->copyFromObj(COrderBaseInfo::$fields, $this);
        return $data;
    }

    public function getOrderAllData()
    {
        $data = new COrderAllInfo();
        $data->copyFromObj(COrderAllInfo::$fields, $this);
        return $data;
    }
}

// 在最后执行静态构造函数
COrder::staticConstruct();
COrderSmallInfo::staticConstruct();
COrderAllInfo::staticConstruct();
COrderBaseInfo::staticConstruct();
