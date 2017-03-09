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
    }

    function withdrawCash()
    {
        if (!$this->checkParam(array('userId','withdrawCash'))) {
        	$this->responseError(ERROR_PARAM);
        	return;
        }
        $userId = $this->input->post('userId');
        $withdrawCash = $this->input->post('withdrawCash');
        $wx_account = $this->input->post('wx_account');
        $res = $this->m_withdrawCash->withdrawCash($userId, intval($withdrawCash), $wx_account);
        if ($res !== ERROR_OK) {
        	$this->responseError($res);
        	return;
        }
        $this->responseSuccess($res);
    }

    //user get withdraw records
    function getUserWithDrawList()
    {
    	if (!$this->checkParam(array('userId'))) {
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$userId = $this->input->post('userId');
    	$data = null;
    	$this->m_withdrawCash->getUserWithDrawList($userId, $data);
    	$this->responseSuccess($data);
    }

}