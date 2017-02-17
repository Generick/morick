<?php

/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-20
 * Time: 下午6:46
 */
class Area extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_area");
    }

    /**
     * 获取地区
     */
    function getAreas()
    {
        $this->output->cache(2);
        if (!$this->checkParam(array("parentId"))){
            $this->responseError(ERROR_PARAM);
            return;
        }
        $parentId = intval($this->input->post("parentId"));
        $areas = $this->m_area->getAreas($parentId);
        $this->responseSuccess(array("areas" => $areas));
        return;
    }

    /**
     * 根据ID获取区域信息
     */
    function getAreaInfo()
    {
        if (!$this->checkParam(array("areaIds"))){
            $this->responseError(ERROR_PARAM);
            return;
        }
        $areaIdArr = json_decode(trim($this->input->post("areaIds")), true);

        $areaInfo = array();
        $retCode = $this->m_area->getAreaInfo($areaIdArr, $areaInfo);
        if ($retCode != ERROR_OK){
            $this->responseError($retCode);
            return;
        }
        $this->responseSuccess(array("areaInfo" => $areaInfo));
    }
}