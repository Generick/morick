<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 8/15/2017
 * Time: 10:05 AM
 */

class Promoter extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_user');
    }

    //获取推广员的口号
    function getPMTSlogan()
    {
        if (!$this->checkParam(array('userId')))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $userId = $this->input->post('userId');
        $pmt = $this->m_user->getUserObj(USER_TYPE_PMT, $userId);
        if (!$pmt) 
        {
            $this->responseError(ERROR_NO_PROMOTER);
            return;
        }
        $this->responseSuccess(array('slogan' => $pmt->slogan));
    }
}