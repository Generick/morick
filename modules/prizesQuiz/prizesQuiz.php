<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/6/2017
 * Time: 10:46 AM
 */
/**
* 
*/
class prizesQuiz extends My_Controller
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->model('m_prizesQuiz');
	}

	function getPrizesList()
	{
		$status = $this->input->post('status');
		$startIndex = $this->input->post('startIndex');
		$num = $this->input->post('num');
		$data = null;
		$res = $this->m_prizesQuiz->getPrizesList($status, $startIndex, $num, $data);
		$count = count($data);
		return $this->responseSuccess(array('data'=>$data,'count'=>$count));
	}

	//get quiz info
	function getQuizInfo()
	{
		if (!$this->checkParam(array('auctionId'))) {
			$this->responseError(ERROR_PARAM);
			return;
		}

		$auctionId = $this->input->post('auctionId');
		$data = null;
		$this->m_prizesQuiz->getQuizInfo($auctionId, $data);
		$this->responseSuccess($data);
	}

	// get quiz user list
	function getQuizUserList()
	{
		if (!$this->checkParam(array('auctionId'))) {
			$this->responseError(ERROR_PARAM);
			return;
		}
		$auctionId = $this->input->post('auctionId');
		$data = $sum = null;
		$res = $this->m_prizesQuiz->getQuizUserList($auctionId, $data, $sum);
		$this->responseSuccess(array('data'=>$data,'sum'=>$sum['sum']));
	}

}