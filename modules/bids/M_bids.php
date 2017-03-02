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

    //获取列表
    function getBidList($startIndex,$num,&$count,&$bidList){
        //
        $bidList = $this->db->from('biddinglogs')->join('goods',"biddingLogs.auctionItemId = goods.goods_id")->join('user',"biddinglogs.userId = user.userId")->select("biddinglogs.userId,biddinglogs.auctionItemId,isHigh,icon,goods_name,name,nowPrice,createTime,telephone")->order_by('createTime','DESC')->limit($num,$startIndex)->get()->result_array();//limit(1,2)=>sql limit 2,1

        $count = $this->db->count_all_results('biddinglogs');

        return ERROR_OK;
    }
}