<?php

/**
* create by mxl
* time 2017-2-21
* prizesquiz table status:
* 0:auction
* 1:prizesquiz
* 2:admin quit it, cnum<3
* 3:admin quit it, auction fail,
* 4: normal over
*/
class M_prizesQuiz extends My_Model
{
	static $itemInfo = array();
	
	function __construct()
	{
		# code...
		parent::__construct();
		$this->load->driver('cache');
		if(!$this->cache->redis->is_supported())
		{
            $this->log->write_log('error', "redis not supported!!!");
        }

        $this->cache->redis->retain();
	}

	//create prizes quiz info
	function createQuiz($auctionId, $goods_bak_id, $tickets, $limitNum)
	{
		$goodsInfo = $this->db->select('goods_name,goods_pics')->from('goods_bak')->where('goods_bak_id',$goods_bak_id)->get()->row();
		$data = array();
		$data['auction_id'] = $auctionId;
		$data['goods_name'] = $goodsInfo->goods_name;
		$data['goods_icon'] = $goodsInfo->goods_pics;
		$data['tickets'] = $tickets;
		$data['limitNum'] = $limitNum;
		$data['status'] = PQ_STATUS_QUIZ;//quiz status
		$this->db->insert('prizesquiz',$data);
	}

	// user takes part in prizes quiz
	// @param: goods_id
	// @param: quizPrice
	// @param: userId
	function partakeQuiz($auctionId, $quizPrice, $userId){
		$auctionStartTime = $this->db->select('startTime')->from('auctionitems')->where('id',$auctionId)->get()->row_array();
		if ($auctionStartTime['startTime'] <= time()) {
			//the goods is auction, can't be quiz
			return PQ_AUCTION_ON;
		}
		
		$arr = array('user_id'=>$userId,'auction_id'=>$auctionId);
		$count = $this->db->select('count')->from('quizuser')->where($arr)->get()->row_array();
		if (!empty($count) && $count['count'] == 1) {
			//judge count, if count = 1, forbidden user to partake quiz
			return PQ_REPEAT;
		}
		//judge user balance
		$this->load->model('m_user');
		$userObj = $this->m_user->getSelfUserObj();
		$tickets = $this->db->select('tickets')->from('prizesquiz')->where('auction_id',$auctionId)->get()->row_array();
		if ($userObj->balance < $tickets['tickets']) {
			return PQ_BALANCE_NOT_ENOUGH;
		}
		//jugde user nums
		$prizesQuizObj = $this->db->select('currentNum,limitNum,sum')->where('auction_id',$auctionId)->from('prizesquiz')->get()->row();
		if ($prizesQuizObj && $prizesQuizObj->currentNum >= $prizesQuizObj->limitNum) {
			//user over limit num
			return PQ_NUM_FULL;
		}

		$data = array('auction_id'=>$auctionId,'user_id'=>$userId,'quiz_price'=>$quizPrice,'count'=>1,'part_time'=>time());
		$res = $this->db->insert('quizuser',$data);
		if ($res) {
			//success
			//user cost tickets
			$balance = $userObj->balance - $tickets['tickets'];
			$this->db->where('userId',$userId)->update('user',array('balance'=>$balance));
			//prize goods sum add tickets, people nums add 1
			$prizesQuizObj->sum += $tickets['tickets'];
			$prizesQuizObj->currentNum += 1;
			$this->db->where('auction_id',$auctionId)->update('prizesquiz',array('sum'=>$prizesQuizObj->sum,'currentNum'=>$prizesQuizObj->currentNum));
			return ERROR_OK;
			
		}else{
			//fail
			return PQ_FAIL;
		}
		
		//
	}

	// administrator quit the quiz
	// param auctionId
	function quitQuiz($auctionId)
	{
		//quiz user nums < 3
		$prizesQuizObj = $this->db->where('auction_id',$auctionId)->from('prizesquiz')->get()->row();
		if ($prizesQuizObj->currentNum >= 3) {
			return PQ_NOT_QUIT;
			exit;
		}else if ($prizesQuizObj->currentNum != 0) {
			//current num = 1,2
			$partUser = $this->where('auctionId',$auctionId)->from('quizuser')->select('user_id')->get()->result_array();
			$tickets = $this->db->select('tickets')->from('prizesquiz')->where('auction_id',$auctionId)->get()->row();
			for ($i=0; $i < $prizesQuizObj->currentNum ; $i++) { 
				$cuserid = $partUser[$i]['user_id'];
				$balance = $this->db->select('balance')->from('user')->where('userId',$cuserid)->get()->row_array();
				$balance['balance'] += $tickets->tickets;
				$this->db->where('userId',$cuserid)->update('user',array('balance'=>$balance['balance']));
			}
		}
		//set this quiz status 2
		$this->db->where('auction_id',$auctionId)->update('prizesquiz',array('status'=>PQ_ADMIN_QUIT));

		return ERROR_OK;
	}

	

	//quiz normal over
	function quizOver($auctionId)
	{
		//get quiz goods purchase price
		$purchasePrice = $this->select('currentPrice')->from('auctionitems')->where(array('id'=>$auctionId, 'endTime <='=>time()))->get()->row_array();
		//get quiz sum 
		$sum = $this->db->select('sum')->from('prizesquiz')->where('auction_id', $auctionId)->get()->row_array();
		$userId_quizPrice = $this->db->select('user_id,quiz_price')->from('quizuser')->where('auction_id', $auctionId)->get()->result_array();
		//get first three user ids
		$awardUser = $this->getFTUserId($purchasePrice['purchasePrice'], $userId_quizPrice);

		//award every award-user money
		for ($i=0; $i <count($awardUser) ; $i++) 
		{ 
			switch ($i) {
				case 0:
					//first prize users obtain award
					$awardMoney = $sum['sum'] * 6 / 10 / count($awardUser[$i]);
					$award = FIRST_PRIZE;
					break;
				case 1:
					//second prize users obtain award
					$awardMoney = $sum['sum'] * 3 / 10 / count($awardUser[$i]);
					$award = SECOND_PRIZE;
					break;
				case 2:
					//third prize users obtain award
					$awardMoney = $sum['sum'] * 1 / 10 / count($awardUser[$i]);
					$award = THIRD_PRIZE;
					break;
				default:
					$awardMoney = 0;
					break;
			}
			
			for ($j=0; $j <count($awardUser[$i]) ; $j++) { 
				$cuserid = $awardUser[$i][$j];
				$balance = $this->db->select('balance')->from('user')->where('userId',$cuserid)->get()->row_array();
				$balance['balance'] += $awardMoney;
				//update award-user balance and award level
				$this->db->where('userId',$cuserid)->update('user',array('balance'=>$balance['balance']));
				$this->db->where('user_id',$cuserid)->update('quizuser',array('award'=>$award,'awardMoney'=>$awardMoney));
				//create award message to user
				$this->load->model('m_messagePush');
				$this->m_messagePush->createUserMsg($cuserid,1,$auction_id);
			}
		}
		$this->db->where('auction_id',$auctionId)->update('prizesquiz',array('status'=>PQ_NORMAL_OVER));
		
	}

	//get first three userids
	function getFTUserId($purchasePrice,$UID_Price_array)
	{
		$UID_Price_diff = $UID_Price_array;
		$diff_arr = array();
		for ($i=0; $i < count($UID_Price_array); $i++) { 
			$sub = $purchasePrice - $UID_Price_array[$i]['quiz_price'];
			$diff = abs($sub);
			$UID_Price_diff[$i]['quiz_price'] = $diff;
			array_push($diff_arr,$diff);
		}

		sort($diff_arr);
		$diff_arr_sort = array_unique($diff_arr);
		$f_userid = $s_userid = $t_userid = $awardUser = array();
		for ($i=0; $i < count($UID_Price_diff); $i++) { 
			if ($UID_Price_diff[$i]['quiz_price'] == $diff_arr_sort[0]) {
				$f_userid[] = $UID_Price_diff[$i]['user_id'];
			}
			if ($UID_Price_diff[$i]['quiz_price'] == $diff_arr_sort[1]) {
				$s_userid[] = $UID_Price_diff[$i]['user_id'];
			}
			if ($UID_Price_diff[$i]['quiz_price'] == $diff_arr_sort[2]) {
				$t_userid[] = $UID_Price_diff[$i]['user_id'];
			}
		}

		array_push($awardUser,$f_userid,$s_userid,$t_userid);
		return $awardUser;
	}

	//get prizes quiz lists
	function getQuizList($startIndex, $num, &$data, &$count)
	{
		$data = $this->db->from('prizesquiz')->join('auctionitems',"prizesquiz.auction_id = auctionitems.id")->select("auction_id,startTime,goods_icon,goods_name,limitNum,currentNum,sum,prizesquiz.status,isQuiz")->order_by('auctionitems.createTime')->limit($num,$startIndex)->get()->result_array();
		foreach ($data as &$v) {
			$auction = $this->db->select('endTime,currentPrice')->from('auctionitems')->where('id',$v['auction_id'])->get()->row_array();
			if ($auction['endTime'] <= time()) {
				$v['purchasePrice'] = $auction['currentPrice'];
			}else{
				$v['purchasePrice'] = null;
			}
		}
		$count = $this->db->count_all_results('prizesquiz');
		return ERROR_OK;
	}

	//app get quiz list
	function getPrizesList($status,$startIndex, $num, &$data)
	{
		$data = $this->db->from('prizesquiz')->where('prizesquiz.status',$status)->join('auctionitems','prizesquiz.auction_id = auctionitems.id')->order_by('auctionitems.createTime')->limit($num, $startIndex)->get()->result_array();

		foreach ($data as &$v) {
			$auction = $this->db->select('endTime,currentPrice')->from('auctionitems')->where('id',$v['auction_id'])->get()->row_array();
			if ($auction['endTime'] <= time()) {
				$v['purchasePrice'] = $auction['currentPrice'];
			}else{
				$v['purchasePrice'] = null;
			}
		}
		return ERROR_OK;
	}

	//font-end get quiz info
	function getQuizInfo($auctionId, &$data)
	{
		$data = $this->db->from('prizesquiz')->where('auction_id',$auctionId)->join('auctionitems','prizesquiz.auction_id = auctionitems.id')->get()->row_array();
		$goods_detail = $this->db->select('goods_detail')->from('goods_bak')->where('goods_bak_id',$data['goods_bak_id'])->get()->row_array();
		$data['goods_detail'] = $goods_detail['goods_detail'];
		return ERROR_OK;
	}

	//manager view single quiz
	function viewQuiz($auctionId, $startIndex, $num, &$data, &$count)
	{
		$data = $this->db->from('quizuser')->where('auction_id',$auctionId)->join('user',"quizuser.user_id = user.userId")->select('part_time,name,telephone,quiz_price,auction_id')->order_by('part_time desc')->limit($num,$startIndex)->get()->result_array();
		foreach ($data as &$v) {
			$auction = $this->db->select('endTime,currentPrice')->from('auctionitems')->where('id',$v['auction_id'])->get()->row_array();
			if ($auction['endTime'] > time()) {
				$v['purchasePrice'] = null;
			}else{
				$v['purchasePrice'] = $auction['currentPrice'];
			}
		}

		$count = $this->db->from('quizuser')->where('auction_id',$auctionId)->count_all_results();

		return ERROR_OK;
	}

	//update limit num
	function updateLimitNum($auctionId, $limitNum)
	{
		$currentNum = $this->select('currentNum')->from('prizesquiz')->where('auction_id',$auctionId)->get()->row_array();
		if ($limitNum <= $currentNum['currentNum']) {
			return PQ_LIMITNUM_ERROR;
		}
		$this->db->where('auction_id',$auctionId)->update("prizesquiz",array('limitNum'=>$limitNum));
		return ERROR_OK;
	}

	//get quiz user list
	//contain user icon,telphone,part_time,quiz_price,award
	function getQuizUserList($auctionId, $startIndex, $num, &$data, &$sum, &$count)
	{
		$data = $this->db->from('quizuser')->where('auction_id',$auctionId)->join('user',"quizuser.user_id = user.userId")->select('icon,telephone,part_time,quiz_price,award,awardMoney')->order_by('award asc,part_time desc')->limit($num,$startIndex)->get()->result_array();
		$sum = $this->db->select('sum')->from('prizesquiz')->where('auction_id',$auctionId)->get()->row_array();
		$count = $this->db->from('quizuser')->where('auction_id',$auctionId)->count_all_results();
		return ERROR_OK;
	}

	//get award user list
	function getAwardUserList($auctionId, &$data)
	{
		$data = $this->db->from('quizuser')->where('auction_id',$auctionId)->where('award !=',0)->join('user','quizuser.user_id = user.userId')->order_by('award asc')->get()->result_array();
	}

	//search
	function searchQuizList($fields, &$data)
	{
		// code

		$data = $this->db->from('prizesquiz')->like('auction_id',$fields)->or_like('goods_name',$fields)->get()->result_array();

		foreach ($data as &$v) {
			$auction = $this->db->select('endTime,currentPrice')->from('auctionitems')->where('id',$v['auction_id'])->get()->row_array();
			if ($auction['endTime'] <= time()) {
				$v['purchasePrice'] = $auction['currentPrice'];
			}else{
				$v['purchasePrice'] = null;
			}
		}

		return ERROR_OK;
	}


	function test(){
		return $this->db->select('user_id')->from('quizuser')->where('count',1)->get()->result_array();
		return array(1,array(1,5));
		$price = 25;
		$testdata = array(array('user_id'=>1,'quiz_price'=>20),array('user_id'=>2,'quiz_price'=>15),array('user_id'=>3,'quiz_price'=>50),array('user_id'=>4,'quiz_price'=>15),array('user_id'=>5,'quiz_price'=>18));
		$res = $this->getFTUserId($price,$testdata);
		var_dump($res);die;
		$somedata = $this->db->select('currentPrice,bidsNum')->from('auctionitems')->where('isRemind',2)->get()->result_array();
		var_dump($somedata);
	}

}