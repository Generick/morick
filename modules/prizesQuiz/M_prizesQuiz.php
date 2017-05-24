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
		parent::__construct();
		$this->load->model('m_transaction');
		$this->load->model('m_messagePush');
		$this->load->model('m_goods_bak');
		$this->load->model('m_auction');
		$this->load->model('m_user');
		$this->load->driver('cache');
		if(!$this->cache->redis->is_supported())
		{
            $this->log->write_log('error', "redis not supported!!!");
        }

        $this->cache->redis->retain();
	}

	//创建有奖竞猜
	function createQuiz($auctionId, $goods_bak_id, $tickets, $limitNum)
	{
		//$goodsInfo = $this->db->select('goods_name, goods_pics')->from('goods_bak')->where('goods_bak_id', $goods_bak_id)->get()->row();
		$goods_bak_obj = $this->m_goods_bak->getGoodsBakBase($goods_bak_id);
		$data = array();
		$data['auction_id'] = $auctionId;
		$data['goods_name'] = $goods_bak_obj->goods_name;
		$data['goods_icon'] = $goods_bak_obj->goods_pics;
        $data['goods_cover'] = $goods_bak_obj->goods_cover;
		$data['tickets'] = $tickets;
		$data['limitNum'] = $limitNum;
		$data['status'] = PQ_STATUS_QUIZ;//quiz status
		$data['isDeal'] = PQ_NO_DEAL;
		$this->db->insert('prizesquiz', $data);
	}

	// 用户参与有奖竞猜
	// @param: goods_id
	// @param: quizPrice
	// @param: userId
	function partakeQuiz($auctionId, $quizPrice, $userId){
		//$auctionStartTime = $this->db->select('startTime')->from('auctionitems')->where('id', $auctionId)->get()->row_array();
		$auctionitemsObj = $this->m_auction->getAuctionBase($auctionId);
		if ($auctionitemsObj->startTime <= time()) 
		{
			//拍品，不能参与竞猜
			return PQ_AUCTION_ON;
		}
		
		$arr = array('user_id'=>$userId,'auction_id'=>$auctionId);
		$count = $this->db->select('count')->from('quizuser')->where($arr)->get()->row_array();
		if (!empty($count) && $count['count'] == 1) 
		{
			//判断用户是否参加过
			return PQ_REPEAT;
		}
		
		//判断余额
		$userObj = $this->m_user->getAllUserObj(USER_TYPE_USER, $userId);
		$tickets = $this->db->select('tickets')->from('prizesquiz')->where('auction_id', $auctionId)->get()->row_array();
		if ($userObj->balance < $tickets['tickets']) 
		{
			return PQ_BALANCE_NOT_ENOUGH;
		}
		//判断参与人数上限
		$prizesQuizObj = $this->db->select('currentNum, limitNum, sum')->where('auction_id', $auctionId)->from('prizesquiz')->get()->row();
		if ($prizesQuizObj && $prizesQuizObj->currentNum >= $prizesQuizObj->limitNum) 
		{
			return PQ_NUM_FULL;
		}

		$data = array('auction_id'=>$auctionId,'user_id'=>$userId, 'quiz_price'=>$quizPrice, 'count'=>1, 'part_time'=>time());
		$res = $this->db->insert('quizuser', $data);
		if ($res) 
		{
			//参与成功，扣除门票，更改奖池金额以及参与人数
			//$balance = $userObj->balance - $tickets['tickets'];
			//$this->db->where('userId',$userId)->update('user',array('balance'=>$balance));
			$this->m_transaction->addTransaction($userId, TRANSACTION_QUIZ_TICKETS, $tickets['tickets']);
			$prizesQuizObj->sum += $tickets['tickets'];
			$prizesQuizObj->currentNum += 1;
			$this->db->where('auction_id',$auctionId)->update('prizesquiz',array('sum'=>$prizesQuizObj->sum,'currentNum'=>$prizesQuizObj->currentNum));
			return ERROR_OK;
			
		}
		//参与失败
		return PQ_FAIL;	
		
	}

	// 结束竞猜
	// param auctionId
	function quitQuiz($auctionId)
	{
		//参与人数大于3
		$prizesQuizObj = $this->db->where('auction_id', $auctionId)->from('prizesquiz')->get()->row();
		if (empty($prizesQuizObj)) {
			return ERROR_OK;
		}

		if ($this->isDealQuiz($auctionId)) {
			return ERROR_OK;
		}
		//var_dump($auctionId);
		//var_dump($prizesQuizObj);die;
		if ($prizesQuizObj->currentNum >= 3) 
		{
			return PQ_NOT_QUIT;
		}else if ($prizesQuizObj->currentNum != 0) 
		{
			//参与人数 为 1,2
			$partUser = $this->db->where('auction_id', $auctionId)->from('quizuser')->select('user_id')->get()->result_array();
			if (empty($partUser)) {
				return ERROR_OK;
			}
			$tickets = $this->db->select('tickets')->from('prizesquiz')->where('auction_id', $auctionId)->get()->row_array();
			for ($i=0; $i < $prizesQuizObj->currentNum ; $i++) 
			{ 
				$cUserId = $partUser[$i]['user_id'];
				//$balance = $this->db->select('balance')->from('user')->where('userId',$cuserid)->get()->row_array();
				$userObj = $this->m_user->getAllUserObj(USER_TYPE_USER, $cUserId);
				//$userObj->balance += $tickets->tickets;
				//$this->db->where('userId',$cuserid)->update('user',array('balance' => $userObj->balance));
				$this->m_transaction->addTransaction($cUserId, TRANSACTION_QUIZ_TICKETS_RETURN, $tickets['tickets']);
				$status = PQ_ADMIN_QUIT;
			}
		}else{
			//参与人数为  0
			$status = PQ_ADMIN_QUIT_LP;
		}
		$this->db->where('auction_id', $auctionId)->update('prizesquiz',array('status' => $status, 'isDeal'=> PQ_DEAL));

		return ERROR_OK;
	}

	//流拍处理
	function AuctionLP($auctionId)
	{
		$partUser = $this->db->select('user_id')->from('quizuser')->where('auction_id', $auctionId)->get()->result_array();
		$quizData = $this->db->select('sum, tickets')->from('prizesquiz')->where('auction_id', $auctionId)->get()->row_array();
		foreach ($partUser as $v) 
		{
			$this->m_transaction->addTransaction($v['user_id'], TRANSACTION_QUIZ_TICKETS_RETURN, $quizData['tickets']);
		}
		return ERROR_OK;
	}

	//判断竞猜拍品是否处理
	function isDealQuiz($auctionId)
	{
		$res = $this->db->select('isDeal')->from('prizesquiz')->where('auction_id', $auctionId)->get()->row_array();
		if ($res['isDeal'] == PQ_DEAL) {
			return true;
		}
		return false;
	}

	//有奖竞猜正常结束
	function quizOver($auctionId)
	{
		$auctionObj = $this->m_auction->getAuctionBase($auctionId);
		//判断是否流拍
		if ($auctionObj->bidsNum == 0) 
		{
			$this->AuctionLP($auctionId);
			return ERROR_OK;
		}
		//有奖竞猜参与人数小于3
		$cNum = $this->db->select('currentNum')->from('prizesquiz')->where('auction_id', $auctionId)->get()->row_array();
		if ($cNum['currentNum'] < 3) 
		{
			$this->quitQuiz($auctionId);
			return ERROR_OK;
		}
		//$purchasePrice = $this->db->select('currentPrice')->from('auctionitems')->where(array('id'=>$auctionId, 'endTime <='=>time()))->get()->row_array();
		if ($this->isDealQuiz($auctionId)) 
		{
			return ERROR_OK;
		}
		$sum = $this->db->select('sum')->from('prizesquiz')->where('auction_id', $auctionId)->get()->row_array();
		$userId_quizPrice = $this->db->select('user_id, quiz_price')->from('quizuser')->where('auction_id', $auctionId)->get()->result_array();
		//获取离成交价最近的三个价格及对应用户
		$awardUser = $this->getFTUserId($auctionObj->currentPrice, $userId_quizPrice);
		//var_dump($userId_quizPrice);die;

		//奖励每一位获奖用户
		$awardNum = count($awardUser);
		//计算比率，只有一等奖，比率为100%
		//只有一二等奖，比率为65%、35%
		//一二三等奖都有，比率为60%、30%、10%
		switch ($awardNum) {
			case 1:
				$fAwardRate = 1;
				break;
			case 2:
				$fAwardRate = 0.65;
				$sAwardRate = 0.35;
				break;
			case 3:
				$fAwardRate = 0.6;
				$sAwardRate = 0.3;
				$tAwardRate = 0.1;
				break;
			
			default:
				# code...
				break;
		}
		$awardMoney = 0;
		$award = 0;
		for ($i=0; $i < $awardNum; $i++) 
		{ 
			switch ($i) 
			{
				case 0:
					//一等奖
					if (count($awardUser[$i]) != 0) 
					{
						$awardMoney = $sum['sum'] * $fAwardRate / count($awardUser[$i]);
						$award = FIRST_PRIZE;
					}
					
					break;
				case 1:
					//二等奖
					if (count($awardUser[$i]) != 0) 
					{
						$awardMoney = $sum['sum'] * $sAwardRate / count($awardUser[$i]);
						$award = SECOND_PRIZE;
					}
					
					break;
				case 2:
					//三等奖
					if (count($awardUser[$i]) != 0) 
					{
						$awardMoney = $sum['sum'] * $tAwardRate / count($awardUser[$i]);
						$award = THIRD_PRIZE;
					}
					
					break;
				default:
					//$awardMoney = 0;
					//$award  = 0;
					break;
			}


			for ($j = 0; $j < count($awardUser[$i]) ; $j++) 
			{ 
				$cuserid = $awardUser[$i][$j];
				//$balance = $this->db->select('balance')->from('user')->where('userId', $cuserid)->get()->row_array();
				$userObj = $this->m_user->getAllUserObj(USER_TYPE_USER, $cuserid);
				//$userObj->balance += $awardMoney;
				//$this->db->where('userId', $cuserid)->update('user',array('balance' => $userObj->balance));
				$this->m_transaction->addTransaction($cuserid, TRANSACTION_AWARD, $awardMoney);
				$whr = array('user_id' => $cuserid, 'auction_id' => $auctionId);
				$this->db->where($whr)->update('quizuser',array('award' => $award,'awardMoney' => $awardMoney));
				//user id, msg type, href id=>auction id
				$this->m_messagePush->createUserMsg($cuserid, MP_MSG_TYPE_QUIZ, $auctionId);
			}
		}
		$this->db->where('auction_id',$auctionId)->update('prizesquiz',array('status'=>PQ_NORMAL_OVER, 'isDeal' => PQ_DEAL));
		
	}

	//结束竞猜，
	function autoQuizOver()
	{
		//$auctionIds = $this->db->select('id')->from('auctionItems')->where('endTime <=',time())->get()->result_array();
		$whr = array('auctionItems.endTime <=' => time());
		$auctionOver = $this->db->select('auction_id')->from('prizesquiz')->where($whr)->join('auctionItems', 'prizesquiz.auction_id = auctionItems.id')->get()->result_array();
		foreach ($auctionOver as $v) 
		{
			$this->quizOver($v['auction_id']);
			//die;
		}
	}

	function getFTUserId($purchasePrice,$UID_Price_array)
	{
		$UID_Price_diff = $UID_Price_array;
		$diff_arr = array();
		for ($i=0; $i < count($UID_Price_array); $i++) 
		{ 
			$sub = $purchasePrice - $UID_Price_array[$i]['quiz_price'];
			$diff = abs($sub);
			$UID_Price_diff[$i]['quiz_price'] = $diff;
			array_push($diff_arr,$diff);
		}

		sort($diff_arr);
		$diff_arr_sorts = array_unique($diff_arr);
		//$diff_arr_sort = array_keys(array_flip($diff_arr));
		$diff_arr_sort = array();
		foreach ($diff_arr_sorts as $v) 
		{
			$diff_arr_sort[] = $v;
		}
		$f_userid = $s_userid = $t_userid = $awardUser = array();
		for ($i=0; $i < count($UID_Price_diff); $i++) 
		{ 
			if (array_key_exists(0, $diff_arr_sort) && $UID_Price_diff[$i]['quiz_price'] == $diff_arr_sort[0]) 
			{
				$f_userid[] = $UID_Price_diff[$i]['user_id'];
			}
			if (array_key_exists(1, $diff_arr_sort) && $UID_Price_diff[$i]['quiz_price'] == $diff_arr_sort[1]) 
			{
				$s_userid[] = $UID_Price_diff[$i]['user_id'];
			}
			if (array_key_exists(2, $diff_arr_sort) && $UID_Price_diff[$i]['quiz_price'] == $diff_arr_sort[2]) 
			{
				$t_userid[] = $UID_Price_diff[$i]['user_id'];
			}
		}

		array_push($awardUser,$f_userid,$s_userid,$t_userid);
		return $awardUser;
	}

	//管理后台获取有奖竞猜列表
	function getQuizList($startIndex, $num, &$data, &$count)
	{
		$data = $this->db->from('prizesquiz')->join('auctionItems',"prizesquiz.auction_id = auctionItems.id")->select("auction_id,startTime,goods_icon, goods_cover,goods_name,limitNum,currentNum,sum,prizesquiz.status,isQuiz")->order_by('auctionItems.createTime desc')->limit($num,$startIndex)->get()->result_array();
		foreach ($data as &$v) 
		{
			//$auction = $this->db->select('endTime, currentPrice')->from('auctionItems')->where('id', $v['auction_id'])->get()->row_array();
			$auctionObj = $this->m_auction->getAuctionBase($v['auction_id']);
			if ($auctionObj->endTime <= time()) 
			{
				$v['purchasePrice'] = $auctionObj->currentPrice;
			}else{
				$v['purchasePrice'] = null;
			}
		}
		$count = $this->db->count_all_results('prizesquiz');
		return ERROR_OK;
	}

	//前端获取竞猜列表
	function getPrizesList($status, $startIndex, $num, &$data, $count, $whr)
	{
		
		$data = $this->db->from('prizesquiz')->where($whr)->join('auctionItems','prizesquiz.auction_id = auctionItems.id')->order_by('auctionItems.createTime desc')->limit($num, $startIndex)->get()->result_array();
		$count = $this->db->from('prizesquiz')->where($whr)->join('auctionItems','prizesquiz.auction_id = auctionItems.id')->count_all_results();

		foreach ($data as &$v) 
		{
			//$auction = $this->db->select('endTime, currentPrice')->from('auctionItems')->where('id', $v['auction_id'])->get()->row_array();
			$auctionObj = $this->m_auction->getAuctionBase($v['auction_id']);
			if ($auctionObj->endTime <= time()) 
			{
				$v['purchasePrice'] = $auctionObj->currentPrice;
			}else{
				$v['purchasePrice'] = null;
			}
			$v['currentQuizPrice'] = $this->getCurrentQuizPrice($v['auction_id']);
		}
		return ERROR_OK;
	}

	//前端获取有奖竞猜信息
	function getQuizInfo($auctionId, &$data)
	{
		$data = $this->db->from('prizesquiz')->where('auction_id', $auctionId)->join('auctionItems','prizesquiz.auction_id = auctionItems.id')->get()->row_array();
		if (empty($data)) 
		{
			return PQ_NO_QUIZ;
		}
		$data['goods_detail'] = '';
		//$goods_detail = $this->db->select('goods_detail')->from('goods_bak')->where('goods_bak_id', $data['goods_bak_id'])->get()->row_array();
		$goods_bak_obj = $this->m_goods_bak->getGoodsBakBase($data['goods_bak_id']);
		if (!empty($goods_bak_obj)) 
		{
			$data['goods_detail'] = $goods_bak_obj->goods_detail;
		}
		
		return ERROR_OK;
	}

	//查看竞猜详情
	function viewQuiz($auctionId, $startIndex, $num, &$data, &$count, &$limitNum)
	{
		$data = $this->db->from('quizuser')->where('auction_id', $auctionId)->join('user',"quizuser.user_id = user.userId")->select('part_time,name,telephone,quiz_price,auction_id')->order_by('part_time desc')->limit($num, $startIndex)->get()->result_array();
		foreach ($data as &$v) 
		{
			//$auction = $this->db->select('endTime, currentPrice')->from('auctionItems')->where('id', $v['auction_id'])->get()->row_array();
			$auctionObj = $this->m_auction->getAuctionBase($v['auction_id']);
			if ($auctionObj->endTime > time()) 
			{
				$v['purchasePrice'] = null;
			}else{
				$v['purchasePrice'] = $auctionObj->currentPrice;
			}
		}

		$count = $this->db->from('quizuser')->where('auction_id', $auctionId)->count_all_results();
		$limitNum = $this->db->select('limitNum')->from('prizesquiz')->where('auction_id', $auctionId)->get()->row_array();

		return ERROR_OK;
	}

	//设置人数上限
	function updateLimitNum($auctionId, $limitNum)
	{
		$currentNum = $this->select('currentNum')->from('prizesquiz')->where('auction_id', $auctionId)->get()->row_array();
		if ($limitNum <= $currentNum['currentNum']) 
		{
			return PQ_LIMITNUM_ERROR;
		}
		$this->db->where('auction_id', $auctionId)->update("prizesquiz",array('limitNum' => $limitNum));
		return ERROR_OK;
	}

	//获取拍品的参与用户列表
	//包含 icon,telphone,part_time,quiz_price,award
	function getQuizUserList($auctionId, $startIndex, $num, &$data, &$count)
	{
		$data = $this->db->from('quizuser')->where('auction_id', $auctionId)->join('user',"quizuser.user_id = user.userId")->select('icon,telephone,part_time,quiz_price,award,awardMoney')->order_by('award asc,part_time desc')->limit($num, $startIndex)->get()->result_array();
		$count = $this->db->from('quizuser')->where('auction_id', $auctionId)->count_all_results();
		return ERROR_OK;
	}

	//获取拍品中奖用户列表
	function getAwardUserList($auctionId, &$data, $whr)
	{
		$data = $this->db->from('quizuser')->where($whr)->join('user','quizuser.user_id = user.userId')->order_by('award asc')->get()->result_array();
	}

	//搜索竞猜
	function searchQuizList($fields, &$data)
	{

		$data = $this->db->from('prizesquiz')->like('auction_id', $fields)->or_like('goods_name', $fields)->get()->result_array();

		foreach ($data as &$v) 
		{
			//$auction = $this->db->select('endTime, currentPrice')->from('auctionItems')->where('id', $v['auction_id'])->get()->row_array();
			$auctionObj = $this->m_auction->getAuctionBase($v['auction_id']);
			if ($auctionObj->endTime <= time()) 
			{
				$v['purchasePrice'] = $auctionObj->currentPrice;
			}else{
				$v['purchasePrice'] = null;
			}
		}

		return ERROR_OK;
	}

	//获取用户参与的竞猜记录
	function getUserQuiz($userId, &$data)
	{
		$user_auction = $this->db->from('quizuser')->where('user_id', $userId)->order_by('part_time desc')->get()->result_array();
		$data = array();
		foreach ($user_auction as $v) 
		{
			$item = $this->db->from('auctionItems')->where('id', $v['auction_id'])->get()->row_array();
			if ($item['startTime'] <= time()) 
			{
				$item['isOver'] = 1;
			}else{
				$item['isOver'] = 0;
			}

			//$auctionInfo = $this->db->select('goods_name, goods_pics')->from('goods_bak')->where('goods_bak_id', $item['goods_bak_id'])->get()->row_array();
			$auction_goods_bak = $this->m_goods_bak->getGoodsBakBase($item['goods_bak_id']);
			$item['goods_name'] = $auction_goods_bak->goods_name;
			$item['goods_pics'] = $auction_goods_bak->goods_pics;
			//$item['currentQuizPrice'] = $this->getCurrentQuizPrice($item['id']);
			$data[] = array_merge($item, $v);
		}
		
		return ERROR_OK;
	}

	//获取当前竞猜最高价
	function getCurrentQuizPrice($auction_id)
	{
		$currentPrice = $this->db->select_max('quiz_price')->from('quizuser')->where('auction_id', $auction_id)->get()->row_array();
		return $currentPrice['quiz_price'];
	}
}