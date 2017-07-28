<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-9
 * Time: 上午11:07
 */
class M_goods extends My_Model
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
        foreach (self::$loadedItems as $goodsId => $goodsObj)
        {
            if (!$goodsObj->saveDB())
            {
                $this->log->write_log('error', "Save goods failed: $goodsId");
            }
        }

        $this->cache->redis->release();
    }

    /**
     * 获取商品对象
     * @param $goodsId
     * @return CGoods|mixed|null
     */
    function getGoodsObj($goodsId)
    {
        $goodsObj = null;
        if(isset(self::$loadedItems[$goodsId]))
        {
            $goodsObj = self::$loadedItems[$goodsId];
            return $goodsObj;
        }

        $goodsObj = unserialize($this->cache->redis->get(CACHE_PREFIX_GOODS . $goodsId));
        if($goodsObj)
        {
            self::$loadedItems[$goodsId] = $goodsObj;
            return $goodsObj;
        }

        $result = $this->m_common->get_one("goods", array("goods_id" => $goodsId));
        if(!empty($result))
        {
            $goodsObj = new CGoods();
            $goodsObj->itemId = $goodsId;
            $goodsObj->initWithDBData($result);
            $goodsObj->saveCache();
            self::$loadedItems[$goodsId] = $goodsObj;
            return $goodsObj;
        }
        return null;
    }

    /**
     * 获取商品基础信息
     * @param $goodsId
     * @return CGoodsBaseInfo|null
     */
    function getGoodsBase($goodsId)
    {
        $goodsObj = $this->getGoodsObj($goodsId);
        if(!$goodsObj)
        {
            return null;
        }
        $baseData = $goodsObj->getGoodsBaseData();
        return $baseData;
    }

    /**
     * 获取商品详情信息
     * @param $goodsId
     * @return CGoodsAllInfo|null
     */
    function getGoodsAll($goodsId)
    {
        $goodsObj = $this->getGoodsObj($goodsId);
        if(!$goodsObj)
        {
            return null;
        }
        $allData = $goodsObj->getGoodsAllData();
        return $allData;
    }

    /**
     * 获取商品列表
     * @param $startIndex
     * @param $num
     * @param $goods
     * @param $count
     * @param array $whereNotIn
     */
    function getGoods($startIndex, $num,  &$goods, &$count, $whereArr = array(), $likeStr = "", $whereNotIn = array())
    {
        $this->db->start_cache();
        $this->db->select("*")->from("goods");
        if(!empty($whereNotIn))
        {
            $this->db->where_not_in("goods_id", $whereNotIn);
        }
        if(!empty($likeStr))
        {
            $this->db->like(array("goods_name" => $likeStr));
            $this->db->or_like(array("goods_detail" => $likeStr));
        }
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
        $this->db->order_by("create_time desc");
        $goodsList = $this->db->get()->result_array();
        $this->db->flush_cache();

        foreach($goodsList as &$one)
        {
            $baseData = $this->getGoodsBase($one["goods_id"]);
            $goods[] = $baseData;
        }
    }

    /**
     * 新增商品信息
     * @param $goodsInfo
     * @param $goodsId
     * @return mixed
     */
    function createGoods($goodsInfo, &$goodsId)
    {
        $this->load->model("m_account");
        $goodsInfo["owner_id"] = intval($this->m_account->getSessionData("userId"));
        $goodsInfo["create_time"] = now();
        if($this->db->insert("goods", $goodsInfo))
        {
            $goodsId = $this->db->insert_id();
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }

    /**
     * 修改商品信息
     * @param $goodsId
     * @param $modInfo
     * @return mixed
     */
    function modGoods($goodsId, $modInfo)
    {
        $goodsObj = $this->getGoodsObj($goodsId);
        if(!$goodsObj)
        {
            return ERROR_GOODS_NOT_FOUND;
        }

        if(!$goodsObj->modInfo($modInfo))
        {
            //修改出错
            return ERROR_MOD_GOODS_FAILED;
        }

        $goodsObj->modInfo(array("bak_id" => 0));//修改了商品 则需要重新快照数据
        return ERROR_OK;
    }

    /**
     * 删除商品
     * @param $goodsId
     * @return mixed
     */
    function delGoods($goodsId)
    {
        $goodsObj = $this->getGoodsObj($goodsId);
        if(!$goodsObj)
        {
            return ERROR_GOODS_NOT_FOUND;
        }

        if($this->m_common->delete("goods", array("goods_id" => $goodsId)) >= 1)
        {
            $goodsObj->deleteCache();

            $this->load->model('m_account');
            $adminId = $this->m_account->getSessionData('userId');
            $cName = $goodsObj->goods_name;
            $cPic = $goodsObj->goods_pics;
            $data = array(
                'adminId' => $adminId,
                'TID' => $goodsId,
                'type' => 0,
                'cName' => $cName,
                'cPic' => $cPic,
                'delTime' => time());
            $this->db->insert('del_record', $data);
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }

    //出库
    function outLibrary($goodsId)
    {
        $goodsObj = $this->getGoodsObj($goodsId);
        if (!$goodsObj) 
        {
            return ERROR_GOODS_NOT_FOUND;
        }
        return $this->modGoods($goodsId, array('outLibrary' => 1));
        if($this->db->where('goods_id', $goodsId)->update('goods', array('outLibrary' => 1)))
        {
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }
}
