<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 5/31/2017
 * Time: 2:44 PM
 */

class M_saleMeeting extends My_Model
{
	static $loadedCommodity = array();
	static $commodity_id = 0;
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_user');
    }

    //商品管理
    
    //添加商品
    function addCommodity($info)
    {
    	$res = $this->db->insert('commodity', $info);
    	if (!$res) 
    	{
    		return ERROR_ADD_COMMODITY_FAIL;
    	}
    	return ERROR_OK;
    }

    //获取商品列表信息
    function getCommodities($startIndex, $num, $whr, $fields, &$data, &$count)
    {
    	$ids = $this->getCommodityId($startIndex, $num, $whr, $fields, $count);
    	if (empty($ids)) return;
    	foreach ($ids as $v) 
    	{
    		$oneInfo = $this->getCommodityInfo($v['id']);
    		unset($oneInfo->commodity_detail);
    		$data[] = $oneInfo;
    	}
    }

    //获取商品id
    function getCommodityId($startIndex, $num, $whr, $fields, &$count, $whereNotIn = array())
    {
    	$this->db->start_cache();
    	$this->db->from('commodity');
    	$this->db->select('id');
    	$this->db->where($whr);
    	if (!empty($fields)) 
    	{
    		$this->db->like('id', $fields);
    		$this->db->or_like('commodity_name', $fields);
    	}
    	if (!empty($whereNotIn)) 
    	{
    		$this->db->where_not_in('id', $whereNotIn);
    	}
    	$this->db->stop_cache();
    	$count = $this->db->count_all_results();
    	if ($num > 0) 
    	{
    		$this->db->limit($num, $startIndex);
    	}
    	$ids = $this->db->order_by('add_time desc')->get()->result_array();
    	$this->db->flush_cache();
    	return $ids;
    }

    //获取上架商品
    function getUpCommodities($startIndex, $num, $whr, $fields, &$data, &$count)
    {
    	$upIds = $this->db->select('commodity_id')->get('sale_meeting')->result_array();
    	if (!empty($upIds)) 
    	{
    		$upIds = array_column($upIds, 'commodity_id');
    	}
    	
    	$ids = $this->getCommodityId($startIndex, $num, $whr, $fields, $count, $upIds);
    	foreach ($ids as $v) 
    	{
    		$data[] = $this->getCommodityInfo($v['id']);
    	}
    }

    //删除商品
    function delCommodity($id)
    {
    	$info = $this->getCommodityInfo($id);
    	if (empty($info)) return ERROR_NO_COMMODITY;
    	if ($this->db->where('id', $id)->update('commodity', array('is_delete' => DELETE_YES))) 
    	{
            $admin_id = $this->m_user->getSelfUserId();
            $data = array('admin_id' => $admin_id, 'commodity_id' => $id, 'delete_time' => time());
            $this->db->insert('commodity_del_record', $data);
            $this->db->where('commodity_id', $id)->update('sale_meeting', array('is_delete' => DELETE_YES));
    		return ERROR_OK;
    	}
    	return ERROR_SYSTEM;
    }

    //商品删除记录
    function commodityDelRec($startIndex, $num, $whr, &$data, &$count)
    {
        $this->db->start_cache();
        $this->db->from('commodity_del_record');
        $this->db->where($whr);
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        if ($num > 0) 
        {
            $this->db->limit($num, $startIndex);
        }
        $delRec = $this->db->order_by('delete_time desc')->get()->result_array();
        $this->db->flush_cache();
        foreach ($delRec as $v) 
        {
            $oneCommodity = $this->getCommodityInfo($v['commodity_id']);
            $one = array();
            $one['commodity_name'] = '';
            $one['commodity_pic'] = '';
            if ($oneCommodity) 
            {
                $one['commodity_cover'] = $oneCommodity->commodity_cover;
                $one['commodity_name'] = $oneCommodity->commodity_name;
            }
            $admin = $this->m_user->getUserObj(USER_TYPE_ADMIN, $v['admin_id']);
            $one['admin_name'] = $admin->name;
            $one['delete_time'] = date('Y-m-d H:i:s', $v['delete_time']);
            $data[] = $one;
        }
    }

    //销售记录
    function saleRecord($startIndex, $num, $whr, &$data, &$count, &$total, $wh = array())
    {
        $this->db->start_cache();
        $this->db->from('sale_record');
        $this->db->select('commodity_id, sum(sale_num) as nums, sum(sale_num * commodity_price) as saleAmount, commodity_name, sale_time');
        $this->db->where($whr);
        $this->db->group_by('commodity_id');
        $this->db->stop_cache();
        //$count = $this->db->count_all_results();
        if ($num > 0) 
        {
            $this->db->limit($num, $startIndex);
        }
        
        $data = $this->db->order_by('sale_time desc')->get()->result_array();
        $this->db->flush_cache();
        //
        $numAndPrice = $this->db->select('commodity_price, sale_num')->get('sale_record')->result_array();
        foreach ($numAndPrice as $v) 
        {
            $single = $v['commodity_price'] * $v['sale_num'];
            $total += $single;
        }

        $sql = "select count(*) as count from (select count(*) from mn_sale_record ";
        if (!empty($whr)) 
        {
            $sql .= "where sale_time >= {$wh['startTime']} and sale_time <= {$wh['endTime']} ";
        }
        $sql .= "group by commodity_id) W";
        $res = $this->db->query($sql)->row_array();
        $count = (int)$res['count'];
    }

    //修改商品
    function modCommodity($id, $modInfo)
    {
    	$info = $this->getCommodityInfo($id);
    	if (empty($info)) return ERROR_NO_COMMODITY;
    	if ($this->db->where('id', $id)->update('commodity', $modInfo)) 
    	{
    		if (isset(self::$loadedCommodity[$id])) unset(self::$loadedCommodity[$id]);
    		get_instance()->cache->redis->save(CACHE_PREFIX_COMMODITY . $id, '', CACHE_LIVE_TIME_COMMODITY);
    		return ERROR_OK;
    	}
    	return ERROR_SYSTEM;
    }

    //上架商品到特卖会
    function upCommodityToTMH($id)
    {
    	$info = $this->getCommodityInfo($id);
    	if (empty($info)) return ERROR_NO_COMMODITY;
    	$data = array('commodity_id' => $id, 'add_time' => time());
    	if ($this->db->insert('sale_meeting', $data)) 
    	{
    		return ERROR_OK;
    	}
    	return ERROR_SYSTEM;
    }

    //上架商品
    function upCommodity($id, $is_up)
    {
        $info = $this->getCommodityInfo($id);
        if (empty($info)) return ERROR_NO_COMMODITY;
        if ($this->db->where('id', $id)->update('commodity', array('is_up' => $is_up))) 
        {
            if (isset(self::$loadedCommodity[$id])) unset(self::$loadedCommodity[$id]);
            get_instance()->cache->redis->save(CACHE_PREFIX_COMMODITY . $id, '', CACHE_LIVE_TIME_COMMODITY);
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }

    //获取商品信息
    function getCommodityInfo($id)
    {
    	$data = null;
    	self::$commodity_id = $id;
    	if (isset(self::$loadedCommodity[$id]) && !empty(self::$loadedCommodity[$id])) 
    	{
    		$data = self::$loadedCommodity[$id];
    		return $data;
    	}
    	$data = $this->cache->redis->get(CACHE_PREFIX_COMMODITY . self::$commodity_id);
    	if ($data) 
    	{
    		self::$loadedCommodity[self::$commodity_id] = $data;
    		return $data;
    	}

    	$data = $this->db->where('id', $id)->get('commodity')->row();
    	if(empty($data)) return null;
    	self::$loadedCommodity[self::$commodity_id] = $data;
    	$this->saveCache();
    	return $data;
    }

    //特卖会
    //获取特卖会商品列表
    function getTMHList($startIndex, $num, $whr, $fields, &$data, &$count)
    {
    	$data = $this->getTMHCommodityId($startIndex, $num, $whr, $fields, $count);
    	if (empty($data)) return;
    	foreach ($data as &$v) 
    	{
    		$v['info'] = $this->getCommodityInfo($v['commodity_id']);
    	}
    }

    //删除特卖会中的商品
    function delTMH($commodity_id)
    {
        $info = $this->getCommodityInfo($commodity_id);
        if (empty($info)) return ERROR_NO_COMMODITY;
        if ($this->db->where('commodity_id', $commodity_id)->update('sale_meeting', array('is_delete' => DELETE_YES))) 
        {
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }

    //获取特卖会商品id
    function getTMHCommodityId($startIndex, $num, $whr, $fields, &$count)
    {
    	$this->db->start_cache();
    	$this->db->from('sale_meeting');
        $this->db->select('sale_meeting.*');
    	$this->db->where($whr);
    	$this->db->join('commodity', 'sale_meeting.commodity_id = commodity.id');
    	if (!empty($fields)) 
    	{
    		$this->db->like('commodity.id', $fields);
    		$this->db->or_like('commodity.commodity_name', $fields);
    	}
    	$this->db->stop_cache();
    	$count = $this->db->count_all_results();
    	if ($num > 0) 
    	{
    		$this->db->limit($num, $startIndex);
    	}
    	$ids = $this->db->order_by('sale_meeting.add_time desc')->get()->result_array();
    	$this->db->flush_cache();
    	return $ids;
    }

    //获取特卖会商品信息
    function getTMHCommodityInfo($id)
    {
    	return $this->getCommodityInfo($id);
    }

    function saveCache()
    {
    	$CI = &get_instance();
    	$CI->cache->redis->save(CACHE_PREFIX_COMMODITY . self::$commodity_id, self::$loadedCommodity[self::$commodity_id], CACHE_LIVE_TIME_COMMODITY);
    }
}