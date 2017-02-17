<?php
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 2016/10/25
 * Time: 9:24
 */

class M_appconfig extends My_Model{
    private static $configData = null;

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
        $this->cache->redis->release();
    }

    function getConfigData()
    {
        if (self::$configData != null)
        {
            return self::$configData;
        }

        $memConfig = unserialize($this->cache->redis->get(CACHE_PREFIX_CONFIG_DATA));
        if ($memConfig)
        {
            self::$configData = $memConfig;
            return self::$configData;
        }

        $dbData = $this->m_common->get_all('configdata', array(), 'id, content');
        $configDataObj = new CConfigData();
        $configDataObj->initWithDBData($dbData);
        // 加载后放入Redis中
        $this->cache->redis->save(CACHE_PREFIX_CONFIG_DATA, serialize($configDataObj));

        self::$configData = $configDataObj;
        return self::$configData;
    }

    /**
     * 获取管理员可进入的页面结构数据
     */
    function getAdminPageEntries()
    {
        $dbResult = $this->m_common->get_all('adminpageentry');

        $pageEntries = array();

        for($i = 0; $i < count($dbResult); $i++)
        {
            $entry = $dbResult[$i];
            $entryId = $entry['entryId'];
            $parentEntryId = $entry['parentEntryId'];

            if ($parentEntryId == 0)
            {
                if (!array_key_exists($entryId, $pageEntries))
                {
                    // 自己就是一级节点，插入数据
                    $pageEntries[$entryId] = array();
                }
                continue;
            }

            // 父节点还没有找到，那么插入父节点
            if (!array_key_exists($parentEntryId, $pageEntries))
            {
                $pageEntries[$parentEntryId] = array();
            }
            $pageEntries[$parentEntryId][] = $entryId;
        }
        return $pageEntries;
    }
}
