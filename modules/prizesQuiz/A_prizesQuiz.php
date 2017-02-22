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

	function test(){
		$this->m_prizesQuiz->test();
	}
}