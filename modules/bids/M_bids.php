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
        $this->load->driver("cache");
        if(!$this->cache->redis->is_supported())
        {
            $this->log->write_log('error', "redis not supported!!!");
        }

        $this->cache->redis->retain();
    }

    //get user bids list
    function getBidList($startIndex,$num,&$count,&$bidList){
        //get the newest bids records
        //$bidList = $this->db->from('biddinglogs')->join('goods',"biddingLogs.auctionItemId = goods.goods_id")->join('user',"biddinglogs.userId = user.userId")->select("biddinglogs.userId,biddinglogs.auctionItemId,isHigh,icon,goods_name,name,nowPrice,createTime,telephone")->order_by('createTime','DESC')->limit($num,$startIndex)->get()->result_array();//limit(1,2)=>sql limit 2,1
        $bidList = $this->db->from('biddinglogs')->join('user',"biddinglogs.userId = user.userId")->select("biddinglogs.userId,biddinglogs.auctionItemId,isHigh,name,nowPrice,createTime,telephone")->order_by('createTime','DESC')->limit($num,$startIndex)->get()->result_array();//limit(1,2)=>sql limit 2,1
        foreach ($bidList as &$v){
            $goods_bak_id = $this->db->select('goods_bak_id')->from('auctionitems')->where('id',$v['auctionItemId'])->get()->row_array();
            $goodsInfo = $this->db->select('goods_name,goods_pics')->from('goods_bak')->where('goods_bak_id',$goods_bak_id['goods_bak_id'])->get()->row_array();
            //var_dump($goodsInfo);die;
            $v = array_merge($v,$goodsInfo);
        }
        $count = $this->db->count_all_results('biddinglogs');

        return ERROR_OK;
    }
}