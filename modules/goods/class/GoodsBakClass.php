<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-9
 * Time: 下午3:08
 */

class CGoodsBakBaseInfo extends IExtractInfo {
    public static $fields = null;
    private static $staticConstructed = false;
    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        self::$fields = array(
            "goods_id",
            "goods_name",
            "goods_pics",
            "goods_detail",
            "goods_bid",
            "goods_cover",
            "outLibrary",
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class CGoodsBakAllInfo extends IExtractInfo {
    public static $fields = null;
    private static $staticConstructed = false;
    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        self::$fields = array(
            "goods_bak_id",
            "goods_id",
            "cat_id",
            "goods_type",
            "brand_id",
            "tag_id",
            "owner_id",
            "goods_name",
            "goods_detail",
            "goods_pics",
            "goods_bid",
            "goods_cover",
            "outLibrary",
            //"has_bak",
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class CGoodsBak extends CDataClassBase {
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
            "goods_bak_id" => new CField(FIELD_TYPE_NORMAL),
            "goods_id" => new CField(FIELD_TYPE_NORMAL),
            "cat_id" => new CField(FIELD_TYPE_NORMAL),
            "goods_type" => new CField(FIELD_TYPE_NORMAL),
            "brand_id" => new CField(FIELD_TYPE_NORMAL),
            "tag_id" => new CField(FIELD_TYPE_NORMAL),
            "owner_id" => new CField(FIELD_TYPE_NORMAL),
            "goods_name" => new CField(FIELD_TYPE_NORMAL),
            "goods_detail" => new CField(FIELD_TYPE_NORMAL),
            "goods_pics" => new CField(FIELD_TYPE_NORMAL),
            "goods_bid" => new CField(FIELD_TYPE_NORMAL),
            "goods_cover" => new CField(FIELD_TYPE_NORMAL),
            "outLibrary" => new CField(FIELD_TYPE_NORMAL),
            //"has_bak" => new CField(FIELD_TYPE_NORMAL),
        );

        self::$modInfo = array(
            "cat_id",
            "goods_type",
            "brand_id",
            "tag_id",
            "owner_id",
            "goods_name",
            "goods_detail",
            "goods_pics",
            "goods_bid",
            "goods_cover",
            "outLibrary",
            //"has_bak",
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
    public $goods_bak_id = 0;
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
        parent::defaultInitWithDBData($dbResult, self::$fields, array('goods_bak_id'));
    }


    public function saveCache()
    {
        $CI = &get_instance();
        $CI->cache->redis->save(CACHE_PREFIX_GOODS_BAK . $this->goods_bak_id, serialize($this), CACHE_GOODS_LIVE_TIME);
    }

    public function deleteCache()
    {
        $CI = &get_instance();
        $CI->cache->redis->delete(CACHE_PREFIX_GOODS_BAK . $this->goods_bak_id);
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

        $affectedRows = $CI->m_common->update('goods_bak', $updateFields, array('goods_bak_id' => $this->goods_bak_id));
        if ($affectedRows < 1)
        {
            $CI->log->write_log('error', "Update goods_bak failed: {$this->goods_bak_id}");
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

    /**
     * 组一份简易信息发给客户端，只包含最关键的内容
     */
    public function getGoodsBakBaseData()
    {
        $data = new CGoodsBakBaseInfo();
        $data->copyFromObj(CGoodsBakBaseInfo::$fields, $this);
        return $data;
    }

    public function getGoodsBakAllData()
    {
        $data = new CGoodsBakAllInfo();
        $data->copyFromObj(CGoodsBakAllInfo::$fields, $this);
        return $data;
    }
}

// 在最后执行静态构造函数
CGoodsBak::staticConstruct();
CGoodsBakAllInfo::staticConstruct();
CGoodsBakBaseInfo::staticConstruct();
