<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 17-3-18
 * Time: 下午2:41
 */
class PrizesQuiz extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_prizesQuiz');
    }

    //前端获取竞猜列表
    function getPrizesList()
    {
        $status = $this->input->post('status');
        //$status = PQ_STATUS_QUIZ;
        $startIndex = $this->input->post('startIndex');
        $num = $this->input->post('num');
        $whr = array('prizesquiz.status' => $status, 'auctionItems.startTime >' => time());
        $data = array();
        $count = 0;
        $res = $this->m_prizesQuiz->getPrizesList($status, $startIndex, $num, $data, $count, $whr);
        $this->responseSuccess(array('data'=>$data,'count'=>$count));
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
        //判断用户是否登录
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
        $count = null;
        $res = $this->m_prizesQuiz->getQuizUserList($auctionId, $startIndex, $num, $data, $count);
        $this->responseSuccess(array('data'=>$data, 'count'=>$count));
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
        $whr = array('auction_id' => $auctionId, 'award !=' => NO_AWARD);
        $this->m_prizesQuiz->getAwardUserList($auctionId, $data, $whr);
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