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
class ClassName extends My_Controller
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->model('m_prizeQuiz');
	}

	function getPrizesList()
	{
		$data = $this->m_prizeQuiz->getQuizList();
		return $this->responseSuccess($data);
	}
}