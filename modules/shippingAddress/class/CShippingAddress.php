<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-9
 * Time: 下午3:54
 */
class CShippingAddressInfo extends IExtractInfo {
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
            "userId",
            "acceptName",
            "province",
            "city",
            "district",
            "address",
            "mobile",
            "isCommon"
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}


class CShippingAddress extends CDataClassBase {
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
            "userId" => new CField(FIELD_TYPE_NORMAL),
            "acceptName" => new CField(FIELD_TYPE_NORMAL),
            "province" => new CField(FIELD_TYPE_NORMAL),
            "city" => new CField(FIELD_TYPE_NORMAL),
            "district" => new CField(FIELD_TYPE_NORMAL),
            "address" => new CField(FIELD_TYPE_NORMAL),
            "mobile" => new CField(FIELD_TYPE_NORMAL),
            "isCommon" => new CField(FIELD_TYPE_NORMAL),
        );

        self::$modInfo = array(
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
    public $addressId = 0;
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
        $CI->cache->redis->save(CACHE_PREFIX_ADDRESS . $this->addressId, serialize($this), CACHE_ADDRESS_LIVE_TIME);
    }

    public function deleteCache()
    {
        $CI = &get_instance();
        $CI->cache->redis->delete(CACHE_PREFIX_ADDRESS . $this->addressId);
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

        $affectedRows = $CI->m_common->update('shipping_address', $updateFields, array('id' => $this->addressId));
        if ($affectedRows < 1)
        {
            $CI->log->write_log('error', "Update shipping_address failed: {$this->addressId}");
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

    /**
     * 组一份简易信息发给客户端，只包含最关键的内容
     */
    public function getShippingAddressInfo()
    {
        $data = new CShippingAddressInfo();
        $data->copyFromObj(CShippingAddressInfo::$fields, $this);
        return $data;
    }
}

// 在最后执行静态构造函数
CShippingAddress::staticConstruct();
CShippingAddressInfo::staticConstruct();