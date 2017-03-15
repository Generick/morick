<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/8/2017
 * Time: 6:18 PM
 */

class U_withdrawCash extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_withdrawCash');
        $this->load->model("m_user");
    }

    function withdrawCash()
    {
        if (!$this->checkParam(array('withdrawCash', 'wx_account'))) {
        	$this->responseError(ERROR_PARAM);
        	return;
        }
        //$userId = $this->input->post('userId');
        $userId = $this->m_user->getSelfUserId();
        $withdrawCash = $this->input->post('withdrawCash');
        $wx_account = $this->input->post('wx_account');
        $res = $this->m_withdrawCash->withdrawCash($userId, intval($withdrawCash), $wx_account);
        if ($res !== ERROR_OK) {
        	$this->responseError($res);
        	return;
        }
        $this->responseSuccess($res);
    }    

}