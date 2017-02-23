<?php
/**
* create by mxl
* time 2017-2-21
*/
class A_prizesQuiz extends Admin_Controller{
	
	function __construct(){
		# code...
		parent::__construct();
		$this->load->model('m_prizesQuiz');
	}

	//qiut quiz
	function quitQuiz(){
		if (!$this->checkParam(array('quizItemId'))) {
		$this->responseError(ERROR_PARAM);
		}

		$quizItemId = $this->input->post('quizItemId');
		$res = $this->m_prizesQuiz->quitQuiz($quizItemId);
		return $this->responseError($res);
	}

	//get prizes quiz lists
	function getQuizList(){
		$quizList = $this->m_prizesQuiz->getQuizList();
		return $this->returnJson($quizList);
	}

	function getQuizUserList(){
		$quizUserList = $this->m_prizesQuiz->getQuizUserList();
		return $this->returnJson($quizUserList);
	}

	function test(){
		$data = $this->m_prizesQuiz->getQuizUserList(1);
		return $this->returnJson($data);
		//echo date("y-m-d h:i:s");die;
		// $data = $this->m_prizesQuiz->test();
		// echo $this->returnJson($data);
	}
}