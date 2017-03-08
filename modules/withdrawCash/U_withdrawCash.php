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
        $res = $this->m_withdrawCash->withdrawCash($userId, $withdrawCash);
        $this->responseSuccess($res);
    }

}