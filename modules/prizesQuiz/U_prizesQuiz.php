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
		if (!$this->checkParam(array('auctionItemId','quizPrice'))) {
			$this->responseError(ERROR_PARAM);
			exit;
		}
		$quizItemId = $this->input->post('auctionItemId');
		$quizPrice = $this->input->post('quizPrice');
		$userId = $this->m_user->getSelfUserId();
		$res = $this->m_prizesQuiz->partakeQuiz($auctionItemId, $quizPrice, $userId);
		if ($res != ERROR_OK) {
			$this->responseError($res);
			exit;
		}

		$this->responseSuccess($res);
		
	}


}