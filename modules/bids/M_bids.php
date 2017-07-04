<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 3/2/2017
 * Time: 2:27 PM
 */
class M_bids extends My_Model{

    function __construct(){
        parent::__construct();
        $this->load->model('m_auction');
        $this->load->driver("cache");
        if(!$this->cache->redis->is_supported())
        {
            $this->log->write_log('error', "redis not supported!!!");
        }

        $this->cache->redis->retain();
    }

    //获取用户出价列表
    function getBidList($startIndex, $num, $auctionItemId, &$count, &$bidList){
        $this->db->start_cache();
        $this->db->from('biddingLogs');
        if (!empty($auctionItemId)) 
        {
            $this->db->where('biddingLogs.auctionItemId', $auctionItemId);
        }
        $this->db->join('user',"biddingLogs.userId = user.userId");
        $this->db->join('auctionItems', 'biddingLogs.auctionItemId = auctionItems.id');
        $this->db->select("biddingLogs.userId,biddingLogs.auctionItemId,isHigh,name,note,nowPrice, biddingLogs.createTime,telephone");
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        $bidList = $this->db->limit($num, $startIndex)->order_by('createTime desc')->get()->result_array();
        $this->db->flush_cache();
        //get the newest bids records
        //$bidList = $this->db->from('biddingLogs')->join('user',"biddingLogs.userId = user.userId")->select("biddingLogs.userId,biddingLogs.auctionItemId,isHigh,name,nowPrice,createTime,telephone")->order_by('createTime','DESC')->limit($num, $startIndex)->get()->result_array();//limit(1,2)=>sql limit 2,1
        foreach ($bidList as &$v)
        {
            $auctionObj = $this->m_auction->getAuctionBase($v['auctionItemId']);            
            if(!$auctionObj)
            {
                continue;
            }
            $goodsInfo = $this->db->select('goods_name, goods_cover')->from('goods_bak')->where('goods_bak_id', $auctionObj->goods_bak_id)->get()->row_array();
            $goodsInfo = is_array($goodsInfo) ? $goodsInfo : array();
            $v = array_merge($v, $goodsInfo);
            
        }
        //die;

        return ERROR_OK;
    }
}