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
    	$data = array();
    	//$count = null;
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$status = $this->input->post('status');
    	$fields = $this->input->post('fields');

    	$whr = array();
    	if ($status != WC_STATUS_ALL) {
    		$whr = array('status'=>$status);
    	}

    	$this->m_withdrawCash->getWithDrawList($startIndex, $num, $data, $status, $fields, $whr);
    	return $this->responseSuccess($data);
    }

    //refuse withdraw
    function refuseWithDraw()
    {
    	if (!$this->checkParam(array('id','userId','withdrawCash'))) {
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$id = $this->input->post('id');
    	$userId = $this->input->post('userId');
    	$reason = $this->input->post('reason');
    	$withdrawCash = $this->input->post('withdrawCash');
    	$res = $this->m_withdrawCash->refuseWithDraw($id, $userId, $withdrawCash, $reason);
    	if ($res !== ERROR_OK) {
    		$this->responseError($res);
    		return;
    	}
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
    	$res = $this->m_withdrawCash->acceptWithDraw($id);
    	if ($res !== ERROR_OK) {
    		$this->responseError($res);
    		return;
    	}
    	$this->responseSuccess($res);
    }

    //search withdraw list
    function searchWithDrawUserList()
    {
    	if (!$this->checkParam(array('fields'))) {
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$fields = $this->input->post('fields');
    	$data = null;
    	$this->m_withdrawCash->searchWithDrawUserList($fields, $data);
    	$this->responseSuccess($data);
    }

}