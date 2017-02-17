<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-19
 * Time: 下午8:37
 */
class M_area extends My_Model
{
    function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取地区列表
     * @param $parent_id
     * @return mixed
     */
    function getAreas($parent_id)
    {
        $this->db->select("id,name")->from("area");
        $this->db->where(array("parent_id" => $parent_id));
        $this->db->order_by("sort asc");
        return $this->db->get()->result_array();
    }

    /**
     * 根据ID获取区域信息
     * @param $areaIdArr
     * @param $areaInfo
     * @return mixed
     */
    function getAreaInfo($areaIdArr, &$areaInfo)
    {
        if(empty($areaIdArr))
        {
            return ERROR_PARAM;
        }

        $this->db->select("id, name")->from("area");
        $this->db->where_in("id", $areaIdArr);
        $areaInfo = $this->db->get()->result_array();
        return ERROR_OK;
    }
}