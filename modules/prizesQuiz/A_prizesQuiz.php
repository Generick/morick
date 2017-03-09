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
		if (!$this->checkParam(array('auctionId'))) {
		$this->responseError(ERROR_PARAM);
		}

		$auctionId = $this->input->post('auctionId');
		$res = $this->m_prizesQuiz->quitQuiz($auctionId);
		$this->responseError($res);
	}


	// get quiz list
	function getQuizList()
	{
		$startIndex = $this->input->post('startIndex');
		$num = $this->input->post('num');
		$data = $count = null;
		$this->m_prizesQuiz->getQuizList($startIndex, $num, $data, $count);
		return $this->responseSuccess(array('data'=>$data,'count'=>$count));
	}

	//get quiz user list
	function getQuizUserList()
	{
		$data = null;
		$quizUserList = $this->m_prizesQuiz->getQuizUserList($auctionId, $data);
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

		$fields = $this->input->post('fields');
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
		$startIndex = $this->input->post('startIndex');
		$num = $this->input->post('num');
		$data = $count = null;
		$this->m_prizesQuiz->viewQuiz($auctionId, $startIndex, $num, $data, $count);
		return $this->responseSuccess(array('data'=>$data,'count'=>$count));
	}

	// update limit num
	function updateLimitNum(){
		if (!$this->checkParam(array('auctionId','limitNum'))) {
			$this->responseError(ERROR_PARAM);
			return;
		}
		$auctionId = $this->input->post('auctionId');
		$limitNum = $this->input->post('limitNum');
		$this->m_prizesQuiz->updateLimitNum($auctionId,$limitNum);
		$this->responseSuccess(ERROR_OK);
	}

	function test()
	{
		if ('啊啊啊' === ERROR_OK) {
			$this->responseError('dasdaff');
			return;
		}

		$hasLogin = true;
        $this->load->model("m_account");
        if($this->m_account->getSessionData("userType") != USER_TYPE_USER)
        {
            $hasLogin = false;
        }
        var_dump($this->m_account->getSessionData('userType'));
		$this->responseSuccess(PQ_REPEAT);die;

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