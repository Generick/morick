<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/28/2017
 * Time: 11:19 AM
 */
class S_srv extends Srv_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('m_user');
    }

    function getSelfInfo()
    {
        $userObj = $this->m_user->getSelfUserObj();

        $data = array(
            'userInfo' => $userObj->getUserSelfData()
        );

        $this->responseSuccess($data);
    }

    function modInfo()
    {
        if(!$this->checkParam(array("modInfo")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $modInfoString = $this->input->post('modInfo');

        $modInfo = json_decode($modInfoString);

        $userObj = $this->m_user->getSelfUserObj();
        $userObj->modInfoWithPrivilege($modInfo);

        $this->responseSuccess(array(
            "modInfo" => $modInfo
        ));
    }
}