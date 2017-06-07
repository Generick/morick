<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-19
 * Time: 上午11:12
 */


class CInformationBaseInfo extends IExtractInfo {
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
            "type",
            "cover",
            "title",
            "content",
            "isRelease",
            "createTime",
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class CInformationAllInfo extends IExtractInfo {
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
            "adminId",
            "type",
            "cover",
            "title",
            "content",
            "summary",
            "isRelease",
            "createTime",
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class CInformation extends CDataClassBase {
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
            "adminId" => new CField(FIELD_TYPE_NORMAL),
            "type" => new CField(FIELD_TYPE_NORMAL),
            "cover" => new CField(FIELD_TYPE_NORMAL),
            "title" => new CField(FIELD_TYPE_NORMAL),
            "content" => new CField(FIELD_TYPE_NORMAL),
            "summary" => new CField(FIELD_TYPE_NORMAL),
            "isDelete" => new CField(FIELD_TYPE_NORMAL),
            "isRelease" => new CField(FIELD_TYPE_NORMAL),
            "createTime" => new CField(FIELD_TYPE_NORMAL),
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
    public $informationId = 0;
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
        $CI->cache->redis->save(CACHE_PREFIX_INFORMATION . $this->informationId, serialize($this), CACHE_INFORMATION_LIVE_TIME);
    }

    public function deleteCache()
    {
        $CI = &get_instance();
        $CI->cache->redis->delete(CACHE_PREFIX_INFORMATION . $this->informationId);
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

        $affectedRows = $CI->m_common->update('information', $updateFields, array('id' => $this->informationId));
        if ($affectedRows < 1)
        {
            $CI->log->write_log('error', "Update information failed: {$this->informationId}");
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
    public function getInformationBaseData()
    {
        $data = new CInformationBaseInfo();
        $data->copyFromObj(CInformationBaseInfo::$fields, $this);
        return $data;
    }

    public function getInformationAllData()
    {
        $data = new CInformationAllInfo();
        $data->copyFromObj(CInformationAllInfo::$fields, $this);
        return $data;
    }
}

// 在最后执行静态构造函数
CInformation::staticConstruct();
CInformationAllInfo::staticConstruct();
CInformationBaseInfo::staticConstruct();