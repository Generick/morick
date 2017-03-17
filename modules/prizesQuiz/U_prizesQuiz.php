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

	// 参与有奖竞猜
	function partakeQuiz()
	{
		if (!$this->checkParam(array('auctionId','quizPrice'))) {
			$this->responseError(ERROR_PARAM);
			return;
		}
		$auctionId = $this->input->post('auctionId');
		$quizPrice = $this->input->post('quizPrice');
		$userId = $this->m_user->getSelfUserId();
		$res = $this->m_prizesQuiz->partakeQuiz($auctionId, $quizPrice, $userId);
		if ($res !== ERROR_OK) {
			$this->responseError($res);
			return;
		}

		$this->responseSuccess($res);
		
	}

	//获取用户参与有奖竞猜记录
	function getUserQuiz()
	{
		if (!$this->checkParam(array('userId'))) {
			$this->responseError(ERROR_PARAM);
			return;
		}

		$userId = $this->input->post('userId');
		$data = array();
		$this->m_prizesQuiz->getUserQuiz($userId, $data);
		$this->responseSuccess($data);
	}

	


}