<?php

/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-19
 * Time: 上午11:08
 */
class Information extends My_Controller
{
    function __construct()
    {
        parent::__construct();

        //加载model
        $this->load->model("m_information");
    }

    /**
     * 获取资讯列表
     */
    function getInformationList()
    {
        if (!$this->checkParam(array("startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $whereArr = array();
        $whereArr['isDelete'] = 0;
        $whereArr["isRelease"] = 1;

        $informationList = array();
        $count = 0;
        $retCode = $this->m_information->getInformationList($startIndex, $num, $whereArr, array(), "", $informationList, $count);
        if ($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $this->responseSuccess(array("informationList" => $informationList, "count" => $count));
        return;
    }

    /**
     * 根据资讯ID获取详情
     */
    function getInformationInfo()
    {
        if (!$this->checkParam(array("informationId"))){
            $this->responseError(ERROR_PARAM);
            return;
        }

        $informationId = trim($this->input->post("informationId"));
        $informationData = $this->m_information->getInformationAll($informationId);
        if($informationData == null)
        {
            $this->responseError(ERROR_INFORMATION_NOT_FOUND);
            return;
        }

        $this->responseSuccess(array("informationInfo" => $informationData));
        return;
    }
}