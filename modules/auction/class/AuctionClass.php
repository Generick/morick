<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-3
 * Time: 下午7:22
 */
class CAuctionSmallInfo extends IExtractInfo
{
    public static $fields = null;
    private static $staticConstructed = false;
    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        self::$fields = array(
            "id",
            "goods_bak_id",
            "currentPrice",
            "createTime",
            "endTime",
            "bidsNum"
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class CAuctionBaseInfo extends IExtractInfo {
    public static $fields = null;
    private static $staticConstructed = false;
    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        self::$fields = array(
            "id",
            "owner_id",
            "goods_bak_id",
            "readNum",
            "collectionNum",
            "shareNum",
            "currentUser",
            "currentPrice",
            "bidsNum",
            "initialPrice",
            "lowestPremium",
            //"referencePrice",
            "postponeTime",
            "margin",
            "isVIP",
            "status",
            "startTime",
            "endTime",
            "cappedPrice"
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class CAuctionAllInfo extends IExtractInfo {
    public static $fields = null;
    private static $staticConstructed = false;
    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        self::$fields = array(
            "id",
            "owner_id",
            "goods_bak_id",
            "readNum",
            "collectionNum",
            "shareNum",
            "currentUser",
            "currentPrice",
            "bidsNum",
            "initialPrice",
            "lowestPremium",
            //"referencePrice",
            "postponeTime",
            "margin",
            "isFreeShipment",
            "isFreeExchange",
            "isVIP",
            "status",
            "startTime",
            "endTime",
            "createTime",
            "isCreateOrder",
            "isRemind",
            "cappedPrice"
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class CAuction extends CDataClassBase {
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
            "owner_id" => new CField(FIELD_TYPE_NORMAL),
            "goods_bak_id" => new CField(FIELD_TYPE_NORMAL),
            "readNum" => new CField(FIELD_TYPE_NORMAL),
            "collectionNum" => new CField(FIELD_TYPE_NORMAL),
            "shareNum" => new CField(FIELD_TYPE_NORMAL),
            "currentUser" => new CField(FIELD_TYPE_NORMAL),
            "currentPrice" => new CField(FIELD_TYPE_NORMAL),
            "bidsNum" => new CField(FIELD_TYPE_NORMAL),
            "initialPrice" => new CField(FIELD_TYPE_NORMAL),
            "lowestPremium" => new CField(FIELD_TYPE_NORMAL),
            //"referencePrice" => new CField(FIELD_TYPE_NORMAL),
            "postponeTime" => new CField(FIELD_TYPE_NORMAL),
            "margin" => new CField(FIELD_TYPE_NORMAL),
            "isFreeShipment" => new CField(FIELD_TYPE_NORMAL),
            "isFreeExchange" => new CField(FIELD_TYPE_NORMAL),
            "isVIP" => new CField(FIELD_TYPE_NORMAL),
            "status" => new CField(FIELD_TYPE_NORMAL),
            "startTime" => new CField(FIELD_TYPE_NORMAL),
            "endTime" => new CField(FIELD_TYPE_NORMAL),
            "createTime" => new CField(FIELD_TYPE_NORMAL),
            "isCreateOrder" => new CField(FIELD_TYPE_NORMAL),
            "isRemind" => new CField(FIELD_TYPE_NORMAL),
            "cappedPrice" => new CField(FIELD_TYPE_NORMAL),
        );

        self::$modInfo = array(
            "readNum",
            "collectionNum",
            "shareNum",
            "currentUser",
            "currentPrice",
            "bidsNum",
            "initialPrice",
            "lowestPremium",
            //"referencePrice",
            "postponeTime",
            "margin",
            "isFreeShipment",
            "isFreeExchange",
            "isVIP",
            "status",
            "startTime",
            "endTime",
            "isCreateOrder",
            "isRemind",
            "cappedPrice"
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
    public $itemId = 0;
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
        parent::defaultInitWithDBData($dbResult, self::$fields, array('id'));
    }


    public function saveCache()
    {
        $CI = &get_instance();
        $CI->cache->redis->save(CACHE_PREFIX_AUCTION . $this->itemId, serialize($this), CACHE_AUCTION_LIVE_TIME);
    }

    public function deleteCache()
    {
        $CI = &get_instance();
        $CI->cache->redis->delete(CACHE_PREFIX_AUCTION . $this->itemId);
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

        $affectedRows = $CI->m_common->update('auctionItems', $updateFields, array('id' => $this->itemId));
        if ($affectedRows < 1)
        {
            $CI->log->write_log('error', "Update auctionItem failed: {$this->itemId}");
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
        parent::defaultModInfoWithPrivilege($info, self::$fields);
    }

    public function getAuctionSmallInfo()
    {
        $data = new CAuctionSmallInfo();
        $data->copyFromObj(CAuctionSmallInfo::$fields, $this);
        return $data;
    }

    public function getAuctionBaseData()
    {
        $data = new CAuctionBaseInfo();
        $data->copyFromObj(CAuctionBaseInfo::$fields, $this);
        return $data;
    }

    public function getAuctionAllData()
    {
        $data = new CAuctionAllInfo();
        $data->copyFromObj(CAuctionAllInfo::$fields, $this);
        return $data;
    }
}

// 在最后执行静态构造函数
CAuction::staticConstruct();
CAuctionSmallInfo::staticConstruct();
CAuctionBaseInfo::staticConstruct();
CAuctionAllInfo::staticConstruct();