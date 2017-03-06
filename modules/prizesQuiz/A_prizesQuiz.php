<?php
/**
* create by mxl
* time 2017-2-21
*/
class A_prizesQuiz extends Admin_Controller
{
	
	function __construct()
	{
		# code...
		parent::__construct();
		$this->load->model('m_prizesQuiz');
	}

	//adminisstration qiut the quiz
	function quitQuiz()
	{
		if (!$this->checkParam(array('quizItemId'))) {
		$this->responseError(ERROR_PARAM);
		}

		$quizItemId = $this->input->post('quizItemId');
		$res = $this->m_prizesQuiz->quitQuiz($quizItemId);
		return $this->responseError($res);
	}


	// get quiz list
	function getQuizList()
	{
		$data = null;
		$this->m_prizesQuiz->getQuizList($data);
		return $this->responseSuccess($data);
	}

	//get quiz user list
	function getQuizUserList()
	{
		$quizUserList = $this->m_prizesQuiz->getQuizUserList();
		return $this->responseSuccess($quizUserList);
	}

	// search quiz user by id or telephone or name
	function searchQuizList()
	{
		if (!$this->checkParam(array('fields'))) 
		{
			$this->responseError(ERROR_PARAM);
			return;
		}

		$data = null;
		$this->m_prizesQuiz->searchQuizList($fields,$data);
		return $this->responseSuccess($data);
	}

	// view quiz
	function viewQuiz()
	{
		if (!$this->checkParam(array('auctionId'))) {
			$this->responseError(ERROR_PARAM);
			return;
		}
		$auctionId = $this->input->post('auctionId');
		$data = null;
		$this->m_prizesQuiz->viewQuiz($auctionId,$data);
		return $this->responseSuccess($data);
	}

	function test()
	{

		echo date("Y-m-d h:i:s");echo "<br>";
		echo date("Y-m-d h:i:s","4686464844");
		echo PQ_AUCTION_ON;
		if (date("Y-m-d") < date("Y-m-d","546465464")) {
			echo "ok";
		}else{
			echo "string";
		}
		
		$arr = $this->m_prizesQuiz->test();
		var_dump($arr) ;die;
		//$data = $this->m_prizesQuiz->getQuizUserList(1);
		//return $this->returnJson($data);
		// $data = $this->m_prizesQuiz->test();
		// echo $this->returnJson($data);
	}
}