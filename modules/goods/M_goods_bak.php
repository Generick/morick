<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-9
 * Time: 下午3:08
 */

class M_goods_bak extends My_Model
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
        foreach (self::$loadedItems as $goodsBakId => $goodsBakObj)
        {
            if (!$goodsBakObj->saveDB())
            {
                $this->log->write_log('error', "Save goodsBak failed: $goodsBakId");
            }
        }

        $this->cache->redis->release();
    }

    /**
     * 获取商品快照对象
     * @param $goodsBakId
     * @return CGoodsBak|mixed|null
     */
    function getGoodsBakObj($goodsBakId)
    {
        $goodsBakObj = null;
        if(isset(self::$loadedItems[$goodsBakId]))
        {
            $goodsBakObj = self::$loadedItems[$goodsBakId];
            return $goodsBakObj;
        }

        $goodsBakObj = unserialize($this->cache->redis->get(CACHE_PREFIX_GOODS_BAK . $goodsBakId));
        if($goodsBakObj)
        {
            self::$loadedItems[$goodsBakId] = $goodsBakObj;
            return $goodsBakObj;
        }

        $result = $this->m_common->get_one("goods_bak", array("goods_bak_id" => $goodsBakId));
        if(!empty($result))
        {
            $goodsBakObj = new CGoodsBak();
            $goodsBakObj->itemId = $goodsBakId;
            $goodsBakObj->initWithDBData($result);
            $goodsBakObj->saveCache();
            self::$loadedItems[$goodsBakId] = $goodsBakObj;
            return $goodsBakObj;
        }
        return null;
    }

    /**
     * 获取商品快照基础信息
     * @param $goodsBakId
     * @return CGoodsBakBaseInfo|null
     */
    function getGoodsBakBase($goodsBakId)
    {
        $goodsBakObj = $this->getGoodsBakObj($goodsBakId);
        if(!$goodsBakObj)
        {
            return null;
        }
        $baseData = $goodsBakObj->getGoodsBakBaseData();
        return $baseData;
    }

    /**
     * 获取商品快照详情信息
     * @param $goodsBakId
     * @return CGoodsBakAllInfo|null
     */
    function getGoodsBakAll($goodsBakId)
    {
        $goodsBakObj = $this->getGoodsBakObj($goodsBakId);
        if(!$goodsBakObj)
        {
            return null;
        }
        $allData = $goodsBakObj->getGoodsBakAllData();
        return $allData;
    }

    /**
     * 获取当前商品的快照ID
     * @param $goodsId
     * @return int
     */
    function getGoodsBakIdWithGoodsId($goodsId, &$bak_id)
    {
        $this->load->model("m_goods");
        $goodsObj = $this->m_goods->getGoodsObj($goodsId);
        if(!$goodsObj)
        {
            return ERROR_GOODS_NOT_FOUND;
        }

        $goodsInfo = $this->m_common->objectToArray($goodsObj->getGoodsAllData());
        $bak_id = $goodsInfo["bak_id"];
        if($bak_id == 0)
        {
            //需要创建一个新的快照
            $bak_id = $this->createGoodsBak($goodsInfo);
            $goodsObj->modInfo(array("bak_id" => $bak_id));
        }
        return ERROR_OK;
    }

    /**
     * 创建快照
     * @param $goodsInfo
     * @return int
     */
    private function createGoodsBak($goodsInfo)
    {
        unset($goodsInfo["bak_id"]);
        unset($goodsInfo["create_time"]);
        $goods_bak_id = 0;
        if($this->db->insert("goods_bak", $goodsInfo))
        {
            $goods_bak_id =  $this->db->insert_id();
        }
        return $goods_bak_id;
    }

}