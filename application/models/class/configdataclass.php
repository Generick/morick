<?php
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 2016/10/25
 * Time: 19:43
 */

define("CONFIG_FIELD_TYPE_INT",         1);
define("CONFIG_FIELD_TYPE_FLOAT",       2);
define("CONFIG_FIELD_TYPE_STRING",      3);
define("CONFIG_FIELD_TYPE_JSON_ARRAY",  4);

class CClientConfigData extends IExtractInfo {
    public static $fields = null;
    private static $staticConstructed = false;
    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        self::$fields = array(
        //    "cfgData1"
        );
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }
}

class CConfigData
{
    static $fields = array();
    static $staticConstructed = false;

    public static function staticConstruct()
    {
        if (self::$staticConstructed)
        {
            return;
        }

        // 用户身上的字段（和数据库对应），同时和类型对应
        self::$fields = array(
            // "cfgData1"        =>       array('id' => CONFIG_DATA_ANNUAL_RATE, 'type' => CONFIG_FIELD_TYPE_FLOAT),
        );

        self::$staticConstructed = true;
    }

    public static function registerFields($fields)
    {
        self::$fields = array_merge(self::$fields, $fields);
    }

    public function initWithDBData($dbData)
    {
        $cfgData = array();
        foreach($dbData as $k => $v)
        {
            $cfgData[$v['id']] = $v['content'];
        }

        foreach(self::$fields as $k => $oneField)
        {
            if (!isset($cfgData[$oneField['id']]))
            {
                continue;
            }

            $v = $cfgData[$oneField['id']];
            if ($oneField['type'] == CONFIG_FIELD_TYPE_INT)
            {
                $this->$k = intval($v);
            }
            else if ($oneField['type'] == CONFIG_FIELD_TYPE_FLOAT)
            {
                $this->$k = floatval($v);
            }
            else if ($oneField['type'] == CONFIG_FIELD_TYPE_STRING)
            {
                $this->$k = $v;
            }
            else if ($oneField['type'] == CONFIG_FIELD_TYPE_JSON_ARRAY)
            {
                $this->$k = json_decode($v);
            }
        }
    }

    /**
     * 修改数据
     * @param $modInfo
     */
    public function modInfo($modInfo)
    {
        // 先修改自己的数据
        $correctKeys = array();
        foreach($modInfo as $k => $v)
        {
            if (!isset($this->$k))
            {
                continue;
            }

            array_push($correctKeys, $k);
        }

        $CI = &get_instance();
        // 保存数据库
        for ($i = 0; $i < count($correctKeys); $i++)
        {
            $k = $correctKeys[$i];
            $v = $modInfo[$k];

            $id = self::$fields[$k]['id'];

            $CI->m_common->update('configdata', array('content' => $v), array('id' => $id));
        }

        // 删除缓存
        $CI->cache->redis->delete(CACHE_PREFIX_USER);
    }

    /**
     * 用于获取需要返回给客户端的数据
     * @return CClientConfigData
     */
    public function getClientData()
    {
        $data = new CClientConfigData();
        $data->copyFromObj(CClientConfigData::$fields, $this);
        return $data;
    }
}

CConfigData::staticConstruct();
CClientConfigData::staticConstruct();
