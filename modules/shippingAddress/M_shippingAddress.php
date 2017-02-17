<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-9
 * Time: 下午3:54
 */
class M_shippingAddress extends My_Model
{
    static  $loadedItems = array();
    function __construct()
    {
        parent::__construct();

        $this->load->driver("cache");
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
        foreach (self::$loadedItems as $addressId => $addressObj)
        {
            if (!$addressObj->saveDB())
            {
                $this->log->write_log('error', "Save shipping_address failed: $addressId");
            }
        }

        $this->cache->redis->release();
    }

    /**
     * 获取收货地址对象
     * @param $addressId
     * @return CShippingAddress|mixed|null
     */
    function getAddressObj($addressId)
    {
        $addressObj = null;
        if(isset(self::$loadedItems[$addressId]))
        {
            $addressObj = self::$loadedItems[$addressId];
            return $addressObj;
        }

        $addressObj = unserialize($this->cache->redis->get(CACHE_PREFIX_ADDRESS . $addressId));
        if($addressObj)
        {
            self::$loadedItems[$addressId] = $addressObj;
            return $addressObj;
        }

        $result = $this->m_common->get_one("shipping_address", array("id" => $addressId));
        if(!empty($result))
        {
            $addressObj = new CShippingAddress();
            $addressObj->addressId = $addressId;
            $addressObj->initWithDBData($result);
            $addressObj->saveCache();
            self::$loadedItems[$addressId] = $addressObj;
            return $addressObj;
        }
        return null;
    }

    /**
     * 获取收货信息
     * @param $addressId
     * @return CShippingAddressInfo|null
     */
    function getAddressInfo($addressId)
    {
        $addressObj = $this->getAddressObj($addressId);
        if(!$addressObj)
        {
            return null;
        }
        $addressInfo = $addressObj->getShippingAddressInfo();
        return $addressInfo;
    }

    /**
     * 获取收货地址
     * @param $startIndex
     * @param $num
     * @param array $whereArr
     * @param $shippingAddressList
     * @param $count
     * @return mixed
     */
    function getShippingAddress($startIndex, $num, $whereArr = array(), &$shippingAddressList, &$count)
    {
        $this->db->start_cache();
        $this->db->select("id")->from("shipping_address");
        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $this->db->order_by("isCommon desc");
        $ret = $this->db->get()->result_array();
        $this->db->flush_cache();
        foreach($ret as $one)
        {
            $shippingAddressList[] = $this->getAddressInfo($one["id"]);
        }
        return ERROR_OK;
    }

    /**
     * 新增收货地址
     * @param $addressInfo
     * @return mixed
     */
    function addShippingAddress($addressInfo)
    {
        $this->load->model("m_account");
        $addressInfo["userId"] = intval($this->m_account->getSessionData("userId"));

        if($this->db->insert("shipping_address", $addressInfo))
        {
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }

    /**
     * 修改收货地址
     * @param $addressId
     * @param $modInfo
     * @return mixed
     */
    function modShippingAddress($addressId, $modInfo)
    {
        $addressObj = $this->getAddressObj($addressId);
        if(!$addressObj)
        {
            return ERROR_ADDRESS_NOT_FOUND;
        }
        $this->load->model("m_account");
        $userId = intval($this->m_account->getSessionData("userId"));
        if(isset($modInfo["isCommon"]) && $modInfo["isCommon"] == 1)
        {
            $ret = $this->m_common->get_one("shipping_address", array("userId" => $userId, "isCommon" => 1));
            if($ret)
            {
                $this->getAddressObj($ret["id"])->modInfoWithPrivilege(array("isCommon" => 0));
            }
        }

        if(!$addressObj->modInfoWithPrivilege($modInfo))
        {
            //修改出错
            return ERROR_MOD_ADDRESS_FAILED;
        }
        return ERROR_OK;
    }

    /**
     * 删除收货地址
     * @param $addressId
     * @return mixed
     */
    function delShippingAddress($addressId)
    {
        $addressObj = $this->getAddressObj($addressId);
        if(!$addressObj)
        {
            return ERROR_ADDRESS_NOT_FOUND;
        }

        if($this->m_common->delete("shipping_address", array("id" => $addressId)) >= 1)
        {
            $addressObj->deleteCache();
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }
}
