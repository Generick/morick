<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 16-5-30
 * Time: 下午3:06
 */

class M_user extends My_Model{
    static $userTypeConfig = array(
        USER_TYPE_USER => array('className' => 'CUser', 'tableName' => 'user', 'keyField' => 'userId'),
        USER_TYPE_ADMIN => array('className' => 'CAdmin', 'tableName' => 'admin', 'keyField' => 'userId'),
        USER_TYPE_MCH => array('className' => 'CMch', 'tableName' => 'mch', 'keyField' => 'userId'),
    );

    static $loadedItems = array();

    public static function registerUserType($userType, $userClassName, $tableName, $keyField)
    {
        self::$userTypeConfig[$userType] = array('className' => $userClassName, 'tableName' => $tableName, 'keyField' => $keyField);
    }

    function __construct()
    {
        parent::__construct();

        $this->load->driver('cache');
        if(!$this->cache->redis->is_supported())
        {
            $this->log->write_log('error', "redis not supported!!!");
        }

        $this->cache->redis->retain();
    }

    /**
     * 在析构函数中进行玩家数据保存
     */
    function __destruct()
    {
        foreach (self::$loadedItems as $userId => $userObj)
        {
            if (!$userObj->saveDB())
            {
                $this->log->write_log('error', "Save user failed: $userId");
            }
        }

        $this->cache->redis->release();
    }

    /**
     * 获取自己的UserId
     * @return mixed
     */
    public function getSelfUserId()
    {
        $userId = intval($this->m_account->getSessionData('userId'));
        return $userId;
    }

    /**
     * 获取自己的对象
     * @return object
     */
    public function getSelfUserObj()
    {
        $userType = intval($this->m_account->getSessionData('userType'));
        $userId = $this->getSelfUserId();
        $userObj = $this->getUserObj($userType, $userId);
        return $userObj;
    }

    /**
     * 创建普通用户
     * @param $userId
     * @return mixed
     */
    function createNormalUser($userId, $platformId = "")
    {
        $result = $this->m_common->get_one("user", array("userId" => $userId));
        if(count($result) > 0)
        {
            log_message('error', "[createNormalUser] User already exists!!!");
            return ERROR_ACCOUNT_USER_EXISTS;
        }

        $ret = $this->m_common->insert("user", array("userId" => $userId, "name" => $platformId, "telephone" => $platformId, "registerTime" => now()));
        if (!$ret)
        {
            log_message('error', "Insert into user failed!!!");
            return ERROR_SYSTEM;
        }

        return ERROR_OK;
    }

    /**
     * 获取数据
     * @param $userType
     * @param $userId
     * @return object    如果成功则返回User对象，否则为null
     */
    function getUserObj($userType, $userId)
    {
        if (isset(self::$loadedItems[$userId]))
        {
            $userObj = self::$loadedItems[$userId];
            return $userObj;
        }

        $userObj = unserialize($this->cache->redis->get(CACHE_PREFIX_USER . $userId));
        if ($userObj)
        {
            self::$loadedItems[$userId] = $userObj;
            return $userObj;
        }

        if (!isset(self::$userTypeConfig[$userType]))
        {
            log_message('error', 'User type not found: ' . $userType);
            return null;
        }

        $userTypeConfig = self::$userTypeConfig[$userType];
        $userClassName = $userTypeConfig['className'];
        $tableName = $userTypeConfig['tableName'];
        $keyField = $userTypeConfig['keyField'];

        $result = $this->m_common->get_one($tableName, array($keyField => $userId));
        if (!empty($result))
        {
            $userObj = new $userClassName();
            $userObj->userId = $userId;
            $userObj->userType = $userType;
            $userObj->initWithDBData($result);
            // 加载后放入redis中
            $userObj->saveCache();
            self::$loadedItems[$userId] = $userObj;
            return $userObj;
        }
        return null;
    }

    function getBaseUserObj($userType, $userId)
    {
        $userObj = $this->getUserObj($userType, $userId);
        if(!$userObj)
        {
            return null;
        }
        $baseData = $userObj->getUserBaseData();
        return $baseData;
    }

    function getAllUserObj($userType, $userId)
    {
        $userObj = $this->getUserObj($userType, $userId);
        if(!$userObj)
        {
            return null;
        }
        $allData = $userObj->getUserSelfData();
        return $allData;
    }
}