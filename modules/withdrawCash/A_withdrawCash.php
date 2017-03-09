<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/8/2017
 * Time: 6:21 PM
 */

class A_withdrawCash extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_withdrawCash');
    }

    //get user withdraw list
    function getWithDrawList()
    {
    	$data = $count = null;
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$status = $this->input->post('status');
    	$this->m_withdrawCash->getWithDrawList($startIndex, $num, $data, $count, $status);
    	return $this->responseSuccess(array('data'=>$data,'count'=>$count));
    }

    //refuse withdraw
    function refuseWithDraw()
    {
    	if (!$this->checkParam(array('id'))) {
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$id = $this->input->post('id');
    	$reason = $this->input->post('reason');
    	$res = $this->m_withdrawCash->refuseWithDraw($id, $reason);
    	$this->responseSuccess($res);
    }

    //accept withdraw
    function acceptWithDraw()
    {
    	if (!$this->checkParam(array('id'))) {
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$id = $this->input->post('id');
    	$reason = $this->input->post('reason');
    	$res = $this->m_withdrawCash->acceptWithDraw($id, $reason);
    	$this->responseSuccess($res);
    }

}