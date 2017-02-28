<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-9
 * Time: 下午8:47
 */
class M_readLog extends My_Model
{
    function __construct()
    {
        parent::__construct();
    }

    function getReadObjList($startIndex, $num, $whereArr = array(), $whereNotArr = array(), &$readList, &$count)
    {
        $this->db->start_cache();

        $this->db->distinct()->select("readId")->from("readLog");
        //$this->db->select("readId")->from("readLog");
        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }

        if(!empty($whereNotArr))
        {
            $this->db->where_not_in("readId", $whereNotArr);
        }
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        var_dump($this->db->last_query());
        $this->db->distinct();
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $this->db->order_by("readTime desc");
        //$count = $this->db->count_all_results();
        var_dump($this->db->get_compiled_select());
        $readList = $this->db->get()->result_array();
        var_dump($this->db->last_query());
        var_dump($readList);
        $this->db->flush_cache();
    }
}