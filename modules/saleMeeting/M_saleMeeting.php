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
        $this->load->model('m_merchant');
    }

    //商品管理
    
    //添加商品
    function addCommodity($info)
    {
        if (!isset($info['commodity_attr']) || $info['commodity_attr'] == 0) 
        {
            $info['stock_num'] = 1;
        }
        $info['pos'] = 1;
        $maxPos = $this->db->select_max('pos')->get('commodity')->row_array();
        if(isset($maxPos['pos']) && !empty($maxPos['pos'])) $info['pos'] = (int)$maxPos['pos']+1;
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
            $this->db->group_start();
    		$this->db->like('id', $fields);
    		$this->db->or_like('commodity_name', $fields);
            $this->db->group_end();
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
    	$ids = $this->db->order_by('pos desc')->get()->result_array();
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
            if ($info->CID > 0) 
            {
                $this->m_merchant->modCommodity($info->CID, array('up_status' => 0));
            }
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
    function saleRecord($startIndex, $num, $whr, &$data, &$count, &$statistics, $fields = '', $wh = array())
    {
        // $this->db->start_cache();
        // $this->db->from('sale_record');
        // $this->db->where($whr);
        // if (!empty($fields)) 
        // {
        //     $this->db->like('commodity_name', $fields);
        // }
        // $this->db->stop_cache();
        // $count = $this->db->count_all_results();
        // if ($num > 0) 
        // {
        //     $this->db->limit($num, $startIndex);
        // }
        // $data = $this->db->order_by('sale_time desc')->get()->result_array();
        // $this->db->flush_cache();
        // $total = $this->db->select_sum('commodity_price')->get('sale_record')->row_array();
        // $total = $total['commodity_price'];


        $this->db->start_cache();
        $this->db->from('sale_record');
        $this->db->select('commodity_id, sum(sale_num) as nums, sum(sale_num * commodity_price) as saleAmount, sum(sale_num * bid_price) as total_bid, commodity_name, max(sale_time) as sale_time');
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
        foreach ($data as &$v) 
        {
            $v['singleProfit'] = $v['saleAmount'] - $v['total_bid'];
            $v['sale_time'] = date("Y-m-d H:i:s", $v['sale_time']);
            $commodityObj = $this->getCommodityInfo($v['commodity_id']);
            $v['originBidPrice'] = $commodityObj->bid_price;
        }
        //统计信息
        // $numAndPrice = $this->db->select('commodity_price, sale_num')->get('sale_record')->result_array();
        // foreach ($numAndPrice as $v) 
        // {
        //     $total = 0;
        //     $single = $v['commodity_price'] * $v['sale_num'];
        //     $total += $single;
        // }
        // $statistics['total'] = $total;

        $sql = "select sum(bid_price) as bidTotalPrice, sum(sale_num) as saleTotalNum, sum(sale_num * commodity_price) as saleTotalMoney from mn_sale_record";
        $statistics = $this->db->query($sql)->row_array();
        $statistics['totalProfit'] = $statistics['saleTotalMoney'] - $statistics['bidTotalPrice'];
        //var_dump($statistics);die;


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

    //移动商品顺序
    function moveCommodityOrder($commodityIdA, $commodityIdB)
    {
        $infoA = $this->getCommodityInfo($commodityIdA);
        $infoB = $this->getCommodityInfo($commodityIdB);
        if (empty($infoA) || empty($infoB)) return ERROR_NO_COMMODITY;
        $this->modCommodity($commodityIdA, array('pos' => $infoB->pos));
        $this->modCommodity($commodityIdB, array('pos' => $infoA->pos));
        return ERROR_OK;
    }

    //上架商品到特卖会
    function upCommodityToTMH($id)
    {
    	$info = $this->getCommodityInfo($id);
    	if (empty($info)) return ERROR_NO_COMMODITY;
        $hasUp = $this->db->select('commodity_id')->where('commodity_id', $id)->get('sale_meeting')->result_array();
        if ($hasUp)
        {
            $upCommodityId = array_column($hasUp, 'commodity_id');
            foreach ($upCommodityId as $v) 
            {
                $this->db->where('commodity_id', $v)->delete('sale_meeting');
            }
           //return ERROR_OK; 
        } 
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
        if (empty($data->sold_time)) 
        {
            $sold_time = $this->db->select('orderTime')->where(array('goodsId' => $data->id))->join('order', 'order_goods.order_no = order.order_no')->order_by('orderTime desc')->get('order_goods')->row_array();
            $data->sold_time = empty($sold_time)? "" : $sold_time['orderTime'];
        }
        $data->comeFrom = '';
        $data->mch_is_delete = '';
        if ($data->CID > 0) 
        {
            $mchCommodityObj = $this->m_merchant->getCommodityInfo($data->CID);
            if ($mchCommodityObj)
            {
                $data->mch_is_delete = $mchCommodityObj->mch_is_delete;
                $userObj = $this->m_user->getUserObj(USER_TYPE_MCH, $mchCommodityObj->userId);
                if ($userObj)  $data->comeFrom = $userObj->name;
            }
            
        }
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
        $res = $this->db->where('commodity_id', $commodity_id)->delete('sale_meeting');
        //$res = $this->db->where('commodity_id', $commodity_id)->update('sale_meeting', array('is_delete' => DELETE_YES));
        if ($res) 
        {
            if ($info->CID > 0) 
            {
                $this->m_merchant->modCommodity($info->CID, array('up_status' => 0));
            }
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
    	$ids = $this->db->order_by('commodity.pos desc')->get()->result_array();
    	$this->db->flush_cache();
    	return $ids;
    }

    //获取特卖会商品信息
    function getTMHCommodityInfo($id)
    {
    	$info = $this->getCommodityInfo($id);
        if(empty($info)) return "";
        $up_time = $this->db->select('add_time')->where('commodity_id', $id)->get('sale_meeting')->row_array();
        $info->up_time = $up_time['add_time'];
        return $info;
    }

    function saveCache()
    {
    	$CI = &get_instance();
    	$CI->cache->redis->save(CACHE_PREFIX_COMMODITY . self::$commodity_id, self::$loadedCommodity[self::$commodity_id], CACHE_LIVE_TIME_COMMODITY);
    }
}