<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-19
 * Time: 上午11:09
 */

class M_information extends MY_Model
{
    static $loadedItems = array();

    function __construct()
    {
        parent::__construct();
        $this->load->model('m_admin');

        $this->load->driver('cache');
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
        foreach (self::$loadedItems as $informationId => $informationObj)
        {
            $information = $this->getInformationObj($informationObj->informationId);
            if (!$information->saveDB())
            {
                $this->log->write_log('error', "Save information failed: $informationId");
            }
        }

        $this->cache->redis->release();
    }

    /**
     * 获取资讯对象
     * @param $informationId
     * @return CInformation|mixed|null
     */
    function getInformationObj($informationId)
    {
        $informationObj = null;
        if(isset(self::$loadedItems[$informationId]))
        {
            $informationObj = self::$loadedItems[$informationId];
            return $informationObj;
        }

        $informationObj = unserialize($this->cache->redis->get(CACHE_PREFIX_INFORMATION . $informationId));
        if($informationObj)
        {
            self::$loadedItems[$informationId] = $informationObj;
            return $informationObj;
        }

        $result = $this->m_common->get_one("information", array("id" => $informationId));
        if(!empty($result))
        {
            $informationObj = new CInformation();
            $informationObj->informationId = $informationId;
            $informationObj->initWithDBData($result);
            $informationObj->saveCache();
            self::$loadedItems[$informationId] = $informationObj;
            return $informationObj;
        }
        return null;
    }

    /**
     * 根据条件获取资讯
     * @param int $startIndex
     * @param int $num
     * @param array $whereArr
     * @param array $likeArr
     * @param string $orderBy
     * @param $informationList
     * @param $count
     */
    function getInformationList($startIndex = 0, $num = 0, $whereArr = array(), $likeArr = array(), $orderBy = "", &$informationList, &$count)
    {
        $this->db->start_cache();
        $this->db->select("id")->from("information");
        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }

        if(!empty($likeArr))
        {
            $this->db->like($likeArr);
        }
        $this->db->stop_cache();

        $count = $this->db->count_all_results();

        if(!empty($orderBy))
        {
            $this->db->order_by($orderBy);
        }
        $this->db->order_by("createTime desc");
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $informationArr = $this->db->get()->result_array();
        $this->db->flush_cache();

        foreach($informationArr as $one)
        {
            $informationList[] = $this->getInformationAll($one["id"]);
        }
    }

    /**
     * 获取资讯基础信息
     * @param $informationId
     * @return CInformationBaseInfo
     */
    function getInformationBase($informationId)
    {
        $informationObj = $this->getInformationObj($informationId);
        if(!$informationObj)
        {
            return null;
        }

        $baseData = $informationObj->getInformationBaseData();
        $ret = $this->m_common->get_one("admin", array("userId" => $baseData->adminId));

        $baseData->author = $ret ? $ret["name"] : "";
        return $baseData;
    }

    /**
     * 获取资讯详情
     * @param $informationId
     * @return CInformationAllInfo
     */
    function getInformationAll($informationId)
    {
        $informationObj = $this->getInformationObj($informationId);
        if(!$informationObj)
        {
            return null;
        }

        $allData = $informationObj->getInformationAllData();
        $ret = $this->m_common->get_one("admin", array("userId" => $allData->adminId));

        $allData->author = $ret ? $ret["name"] : "";
        return $allData;
    }

    /**
     * 创建资讯
     * @param $releaseData
     * @return mixed
     */
    function createInformation($releaseData)
    {
        if(empty($releaseData))
        {
            return ERROR_PARAM;
        }
        $ret = $this->m_common->insert("information", $releaseData);
        if(!$ret)
        {
            log_message("error", "release information failed!!!");
            return ERROR_SYSTEM;
        }
        return ERROR_OK;
    }

    /**
     * 修改资讯
     * @param $informationId
     * @param $modInfo
     * @return mixed
     */
    function modInformation($informationId, $modInfo)
    {
        $informationObj = $this->getInformationObj($informationId);
        if(!$informationObj)
        {
            return ERROR_INFORMATION_NOT_FOUND;
        }

        $informationObj->modInfoWithPrivilege($modInfo);

        return ERROR_OK;
    }

    /**
     * 删除资讯
     * @param $informationId
     * @return mixed
     */
    function deleteInformation($informationId)
    {
        $informationObj = $this->getInformationObj($informationId);
        if(!$informationObj)
        {
            return ERROR_INFORMATION_NOT_FOUND;
        }

        $this->modInformation($informationId, array("isDelete" => 1));
        return ERROR_OK;
    }
}