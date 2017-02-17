<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-19
 * Time: 下午8:22
 */
class U_freeze extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_freeze");
        $this->load->model("m_user");
    }

    /**
     * 是否已冻结
     */
    function isFreeze()
    {
        if(!$this->checkParam(array("freezeType", "freezeId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $userId = $this->m_user->getSelfUserId();
        $freezeType = intval($this->input->post("freezeType"));
        $freezeId = intval($this->input->post("freezeId"));

        $isFreeze = false;
        $retCode = $this->m_freeze->isFreeze($userId, $freezeType, $freezeId, $isFreeze);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }
        $this->responseSuccess(array("isFreeze" => $isFreeze));
        return;
    }
}