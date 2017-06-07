<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-11-17
 * Time: ����2:16
 */

class A_information extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
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

        $likeArr = array();
        if(isset($_POST["likeStr"]))
        {
            $likeArr["title"] = trim($this->input->post("likeStr"));
        }
        $whereArr = array();
        $whereArr['isDelete'] = 0;

        $informationList = array();
        $count = 0;
        $retCode = $this->m_information->getInformationList($startIndex, $num, $whereArr,$likeArr, "", $informationList, $count);
        if ($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }

        $this->responseSuccess(array("informationList" => $informationList, "count" => $count));
        return;
    }

    /**
     * 发布资讯
     */
    function createInformation()
    {
        $this->load->model("m_account");
        if(!$this->checkParam(array("type", "cover", "title", "content", "summary")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $informationInfoArr = array(
            "adminId" => $this->m_account->getSessionData('userId'),
            "type" => intval($this->input->post("type")),
            "cover" => trim($this->input->post("cover")),
            "title" => trim($this->input->post("title")),
            "content" => trim($this->input->post("content")),
            "summary" => trim($this->input->post("summary")),
            "createTime" => now(),
        );

        $retCode = $this->m_information->createInformation($informationInfoArr);
        $this->responseError($retCode);
    }

    /**
     * 发布or取消发布资讯
     * @return mixed
     */
    function releaseInformation()
    {
        if(!$this->checkParam(array("informationId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $informationId = intval($this->input->post("informationId"));
        $information = $this->m_information->getInformationAll($informationId);
        if(!$information)
        {
            return ERROR_INFORMATION_NOT_FOUND;
        }

        $modInfo = array("isRelease" => ($information->isRelease == 0) ? 1 : 0);

        $retCode = $this->m_information->modInformation($informationId, $modInfo);
        $this->responseError($retCode);
        return;
    }

    /**
     * 修改资讯
     */
    function modInformation()
    {
        $this->load->model("m_account");

        if(!$this->checkParam(array("informationId", "modInfo")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $informationId = intval($this->input->post("informationId"));
        $modInfo = json_decode(trim($this->input->post("modInfo")), true);

        $retCode = $this->m_information->modInformation($informationId, $modInfo);
        $this->responseError($retCode);
        return;
    }

    /**
     * 删除资讯
     */
    function delInformation()
    {
        $this->load->model("m_account");

        if(!$this->checkParam(array("informationIds")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $informationIdArr = json_decode($this->input->post("informationIds"));
        $delArr = array();
        foreach($informationIdArr as $informationId)
        {
            $this->m_information->deleteInformation($informationId);
        }

        $this->responseSuccess(ERROR_OK);
    }

    /**
     * 获取资讯详情
     */
    function getInformationInfo()
    {
        if (!$this->checkParam(array('informationId')))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $id = intval($this->input->post('informationId'));
        $data = $this->m_information->getInformationAll($id);
        $this->responseSuccess(array('info' => $data));
    }
}