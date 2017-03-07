<?php
/**
* create by mxl
* time 2017-2-21
*/
class U_prizesQuiz extends User_Controller
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->model('m_user');
		$this->load->model('m_prizesQuiz');
	}

	// take part in prizes quiz
	function partakeQuiz()
	{
		//some code here
		if (!$this->checkParam(array('auctionId','quizPrice'))) {
			$this->responseError(ERROR_PARAM);
			exit;
		}
		$auctionId = $this->input->post('auctionId');
		$quizPrice = $this->input->post('quizPrice');
		$userId = $this->m_user->getSelfUserId();
		$res = $this->m_prizesQuiz->partakeQuiz($auctionId, $quizPrice, $userId);
		if ($res != ERROR_OK) {
			$this->responseError($res);
			exit;
		}

		$this->responseSuccess($res);
		
	}

	// get quiz user list
	function getQuizUserList()
	{
		if (!$this->checkParam(array('auctionId'))) {
			$this->responseError(ERROR_PARAM);
			return;
		}
		$auctionId = $this->input->post('auctionId');
		$data = null;
		$res = $this->m_prizesQuiz->getQuizUserList($auctionId, $data);
		$this->responseSuccess($data);
	}


}