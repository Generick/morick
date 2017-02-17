<?php
/**
 * Created by PhpStorm.
 * User: HumphreyLiu
 * Date: 14-12-9
 * Time: 下午11:57
 */


/**
 * Class CField
 * 字段类，其内容为字段类型和字段对应的类
 */

define("FIELD_TYPE_NORMAL", 1);
define("FIELD_TYPE_OBJECT", 2);
define("FIELD_TYPE_TIME", 3);

class CField
{
    function __construct($method, $fieldClassName = "")
    {
        $this->fieldType = $method;
        $this->fieldClassName = $fieldClassName;
    }

    public $fieldClassName = "";
    public $fieldType = 0;
}

/**
 * Class CDataClassBase
 * 数据类的基类
 */
abstract class CDataClassBase
{
    // 下面两个常量表示某数据保存生成SQL时如何生成

    // 被修改过的成员(即objField)
    protected $dirtyFields = array();

    function __construct()
    {

    }
    /**
     * 设置某个数据为脏
     * @param $val
     */
    public function setFieldDirty($val)
    {
        $this->dirtyFields[$val] = 1;
    }

    /**
     * 重置脏数据
     */
    public function resetDirty()
    {
        $this->dirtyFields = array();
    }

    /**
     * 生成Update用的fields
     * @return array    要更新的字段
     */
    public function generateUpdateFields($fields)
    {
        // 获取Logger，方便打日志
        $CI =& get_instance();

        $updateFields = array();
        foreach ($this->dirtyFields as $objField => $val)
        {
            if (!array_key_exists($objField, $fields))
            {
                $CI->log->write_log('error', "Key not found in fields: $objField");
                continue;
            }

            $obj = $fields[$objField];

            if ($obj->fieldType == FIELD_TYPE_NORMAL)
            {
                // 平常数据，只需要xxx=yyy即可
                $updateFields[$objField] = $this->$objField;
            }
            else if ($obj->fieldType == FIELD_TYPE_OBJECT)
            {
                // 自己有toString方法
                $str = $this->$objField->toString();
                $updateFields[$objField] = $str;
            }
            else
            {
                // 出错！
                $CI->log->write_log('error', "Unknown fieldType: " . print_r($obj, true));
            }
        }

        // 重置脏数据
        $this->resetDirty();
        return $updateFields;
    }

    /**
     * 使用类的fields配置以及数据库数据，初始化对象内容
     * @param $dbResult
     * @param $classFields
     * @param $ignoreFields     忽略报警的字段
     */
    public function defaultInitWithDBData($dbResult, $classFields, $ignoreFields = array())
    {
        $CI = &get_instance();
        foreach ($dbResult as $key => $val)
        {
            if (!array_key_exists($key, $classFields))
            {
                // 如果不在忽略报警的fields里则打日志
                if (!in_array($key, $ignoreFields))
                {
                    $CI->log->write_log('error', "DBField is not found in fields: $key");
                }
                continue;
            }

            $obj = $classFields[$key];
            if ($obj->fieldType == FIELD_TYPE_NORMAL)
            {
                $this->$key = $val;
            }
            else if ($obj->fieldType == FIELD_TYPE_TIME)
            {
                $this->$key = strtotime($val);
            }
            else if ($obj->fieldType == FIELD_TYPE_OBJECT)
            {
                $fieldClassName = $obj->fieldClassName;
                $this->$key = new $fieldClassName();
                $this->$key->initWithDBData($val);
            }
            else
            {
                $CI->log->write_log('error', "Unknown fieldType: " . print_r($obj, true));
            }
        }
    }

    /**
     * 用于处理有限制的modInfo，一般由客户端发来的数据直接调用
     * @param $info
     * @param $classModifyInfoFields
     * @param $classFields
     * @return bool
     */
    public function defaultModInfo($info, $classModifyInfoFields, $classFields)
    {
        if (count($info) <= 0)
        {
            return true;
        }

        // 获取Logger，方便打日志
        $CI = &get_instance();

        foreach ($info as $key => $value)
        {
            if (!in_array($key, $classModifyInfoFields))
            {
                $CI->log->write_log('error', "[modinfo] key not found in self::modInfo : $key");
                return false;
            }

            $modInfoField = $key;//$classModifyInfoFields[$key];

            if (!array_key_exists($modInfoField, $classFields))
            {
                $CI->log->write_log('error', "[modinfo] key not found userFields: $modInfoField");
                return false;
            }

            $userFieldObj = $classFields[$modInfoField];

            if ($userFieldObj->fieldType == FIELD_TYPE_NORMAL)
            {
                // 如果是用户的普通属性，则直接设置即可
                $this->$modInfoField = $value;
            }
            else if ($userFieldObj->fieldType == FIELD_TYPE_OBJECT)
            {
                // 如果是对象属性，则调用对象的modInfo，传入key和value
                $this->$modInfoField->modInfo($key, $value);
            }

            $this->setFieldDirty($modInfoField);
        }

        return true;
    }

    /**
     * 有权限地修改数据，一般用于服务端逻辑
     * @param $info
     */
    public function defaultModInfoWithPrivilege($info, $classFields)
    {
        foreach($info as $k => $v )
        {
            if (array_key_exists($k, $classFields))
            {
                $this->$k = $v;
                $this->setFieldDirty($k);
            }
        }
        return true;
    }
}

/**
 * Class IExtractInfo
 * 用于获取信息的一部分
 */
class IExtractInfo
{
    public function copyFromObj($fields, $obj)
    {
        foreach ($fields as $n => $f)
        {
            $this->$f = $obj->$f;
        }
    }
}
/////////////////////////////////////////////////////////////
// 定义数据结构
/////////////////////////////////////////////////////////////
abstract class IObj
{
    /**
     * 此对象生成数据库的字符串
     * @return string
     */
    abstract public function toString();

    /**
     * 用DB的数据初始化内容
     * @param $dbData   db的数据，一般是json
     */
    abstract public function initWithDBData($dbData);
}

/**
 * Class CNormalKV
 * 一般的键值类：内容为key => value
 */
class CNormalKV extends IObj
{
    static $fields = array(
        // NumData的属性
    );
    public $vars;
    
    public function __construct()
    {
        $this->vars = (object)array();
    }

    public function toString()
    {
        return json_encode($this->vars);
    }

    public function initWithDBData($dbData)
    {
        $this->vars = (object)array();
        if ($dbData != "")
        {
            $decoded = json_decode($dbData);
            if ($decoded != null)
            {
                $this->vars = $decoded;
            }
        }
    }
    /**
     * 当数据修改的时候调用此函数
     * @param $key      修改的内容
     * @param $value    相应的数值
     * @return int      错误码
     */
    public function modInfo($key, $value)
    {
        if (in_array($key, self::$fields))
        {
			$this->vars->$key = $value;
            return ERROR_OK;
        }

        return ERROR_PARAM;
    }

    /**
     * 获取内容
     * @param $key  键
     * @return mix  false表示没有该数值；或者相应的数值
     */
    public function getValue($key)
    {
        if (!isset($this->vars->$key))
        {
            return false;
        }

        return $this->vars->$key;
    }
}

/**
 * Class CNormalArray
 * 通用的数组，比如关注、粉丝、黑名单、照片、视频
 */
class CNormalArray extends IObj
{
    public $arr = array();
    public function toString()
    {
        return json_encode($this->arr);
    }

    public function initWithDBData($dbData)
    {
        $this->arr = array();
        if ($dbData != "")
        {
            $decoded = json_decode($dbData, true);
            if ($decoded != null)
            {
                $this->arr = $decoded;
            }
        }
    }

    /**
     * 获取当前数组大小
     * @return int  元素个数
     */
    public function getSize()
    {
        return count($this->arr);
    }

    /**
     * 值是否在数组中
     * @param $v
     * @return bool
     */
    public function valueExists($v)
    {
        return in_array($v, $this->arr);
    }

    public function op($op, $v)
    {
        if (!$v)
        {
            return ERROR_PARAM;
        }

        if ($op == OP_TYPE_ADD)
        {
            if (!in_array($v, $this->arr))
            {
                array_push($this->arr, $v);
                return ERROR_OK;
            }

            return ERROR_EXISTS;
        }
        else if ($op == OP_TYPE_DEL)
        {
            $keyArray = array_keys($this->arr, $v);
            if (count($keyArray) < 1)
            {
                return ERROR_NOT_EXISTS;
            }

            array_splice($this->arr, $keyArray[0], 1);
            return ERROR_OK;
        }
        else
        {
            return ERROR_PARAM;
        }

        return ERROR_OK;
    }

    /**
     * 此方法用于强制插入一条内容，同时删除一条内容
     * @param $v
     * @return bool     true 为成功
     */
    public function pushAndDelete($v)
    {
        $retCode = $this->op(OP_TYPE_ADD, $v);
        if ($retCode != ERROR_OK)
        {
            return $retCode;
        }

        array_splice($this->arr, 0, 1);
        return ERROR_OK;
    }
}


/**
 * 用户对象基类
 * Class IUserBase
 */
abstract class IUserBase extends CDataClassBase
{
    // 成员
    public $userType = 0;
    public $userId = 0;

    // 每个子类都要事先获取个人信息的接口
    abstract function getUserBaseData();
    abstract function getUserSelfData();
    abstract function initWithDBData($dbResult);

    // 保存cache
    public function saveCache()
    {
        $CI = &get_instance();
        $CI->cache->redis->save(CACHE_PREFIX_USER . $this->userId, serialize($this), CACHE_LIVE_TIME);
    }
}
