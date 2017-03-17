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
		//$status = PQ_STATUS_QUIZ;
		$startIndex = $this->input->post('startIndex');
		$num = $this->input->post('num');
		$whr = array('prizesquiz.status' => $status, 'auctionitems.startTime >' => time());
		$data = array();
		$res = $this->m_prizesQuiz->getPrizesList($status, $startIndex, $num, $data, $whr);
		$count = count($data);
		return $this->responseSuccess(array('data'=>$data,'count'=>$count));
	}

	//获取竞猜信息
	function getQuizInfo()
	{
		if (!$this->checkParam(array('auctionId'))) {
			$this->responseError(ERROR_PARAM);
			return;
		}

		$auctionId = $this->input->post('auctionId');
		$data = array();
		$this->m_prizesQuiz->getQuizInfo($auctionId, $data);
		//judge has login
		$data['hasLogin'] = true;
        $this->load->model("m_account");
        if($this->m_account->getSessionData("userType") != USER_TYPE_USER)
        {
            $data['hasLogin'] = false;
        }

		$this->responseSuccess($data);
	}

	// 获取拍品参与的用户列表
	function getQuizUserList()
	{
		if (!$this->checkParam(array('auctionId'))) 
		{
			$this->responseError(ERROR_PARAM);
			return;
		}

		$startIndex = $this->input->post('startIndex');
		$num = $this->input->post('num');
		$auctionId = $this->input->post('auctionId');
		$data = array();
		$sum = $count = null;
		$res = $this->m_prizesQuiz->getQuizUserList($auctionId, $startIndex, $num, $data, $sum, $count);
		$this->responseSuccess(array('data'=>$data,'sum'=>$sum['sum'],'count'=>$count));
	}

	//获取拍品竞猜中奖用户
	function getAwardUserList()
	{
		if (!$this->checkParam(array('auctionId'))) 
		{
			$this->responseError(ERROR_PARAM);
			return;
		}
		$auctionId = $this->input->post('auctionId');
		$data = array();
		$this->m_prizesQuiz->getAwardUserList($auctionId, $data);
		$this->responseSuccess($data);
	}

	function autoQuizOver()
	{
		$this->m_prizesQuiz->autoQuizOver();
	}

	//test
	function createQuiz()
	{
		$auctionId = $this->input->post('auctionId');
		$goods_bak_id = $this->input->post('goods_bak_id');
		$tickets = $this->input->post('tickets');
		$limitNum = $this->input->post('limitNum');
		$this->m_prizesQuiz->createQuiz($auctionId, $goods_bak_id, $tickets, $limitNum);
	}

}