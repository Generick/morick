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
class M_prizesQuiz extends My_Model{
	static $itemInfo = array();
	
	function __construct(){
		# code...
		parent::__construct();
		$this->load->driver('cache');
		if(!$this->cache->redis->is_supported()){
            $this->log->write_log('error', "redis not supported!!!");
        }

        $this->cache->redis->retain();
	}

	//create prizes quiz info
	function createQuiz($goodsId,$tickets,$limitNum){
		$goodsInfo = $this->db->select('goods_name,goods_pics')->from('goods')->where('goods_id',$goodsId)->get()->row_array();
		$data = array();
		$data['goods_id'] = $goodsId;
		$data['goods_name'] = $goodsInfo['goods_name'];
		$data['goods_icon'] = $goodsInfo['goods_pics'];
		$data['tickets'] = $tickets;
		$data['limitNum'] = $limitNum;
		$data['status'] = 1;//quiz status
		$this->db->insert('prizesquiz',$data);
	}

	// user takes part in prizes quiz
	// @param: goods_id
	// @param: quizPrice
	// @param: userId
	function partakeQuiz($itemId,$quizPrice,$userId){
		$auctionInfo = $this->getAuctionObj($itemId);
		if (!empty($auctionInfo)) {
			//the goods is auction, can't be quiz
			return PQ_AUCTION_ON;
			exit;
		}
		
		$arr = array('user_id'=>$userId,'goods_id'=>$itemId);
		$count = $this->db->select('count')->from('prizesuser')->where($arr)->get()->row_array();
		if (!empty($count) && $count['count'] == 1) {
			//judge count, if count = 1, forbidden user to partake quiz
			return PQ_REPEAT;
			exit;
		}
		//judge user balance
		$this->load->model('m_user');
		$userObj = $this->m_user->getSelfUserObj();
		$tickets = $this->db->select('tickets')->from('prizesquiz')->where('goods_id',$itemId)->get()->row_array();
		//$userObj = $this->db->where('userId',$userId)->from('user')->get()->row();
		if ($userObj->balance < $tickets['tickets']) {
			return PQ_BALANCE_NOT_ENOUGH;
			exit;
		}
		//jugde user nums
		$prizesQuizObj = $this->db->select('currentNum,limitNum,sum')->where('goods_id',$itemId)->from('prizesquiz')->get()->row();
		if ($prizesQuizObj && $prizesQuizObj->currentNum >= $prizesQuizObj->limitNum) {
			//user over limit num
			return PQ_NUM_FULL;
			exit;
		}

		$data = array('goods_id'=>$itemId,'user_id'=>$userId,'quiz_price'=>$quizPrice,'count'=>1,'part_time'=>time());
		$res = $this->db->insert('quizuser',$data);
		if ($res) {
			//success
			//user cost tickets
			$balance = $userObj->balance - $tickets;
			$this->db->where('userId',$userId)->update('user',array('balance'=>$balance));
			//prize goods sum add tickets, people nums add 1
			$prizesQuizObj->sum += $tickets;
			$prizesQuizObj->currentNum += 1;
			$this->db->where('goods_id',$itemId)->update('prizesquiz',array('sum'=>$prizesQuizObj->sum,'currentNum'=>$prizesQuizObj->currentNum));
			return ERROR_OK;
			
		}else{
			//fail
			return PQ_FAIL;
			exit;
		}
		
		//
	}

	// administrator quit the quiz
	// param goods_bak_id
	function quitQuiz($goods_bak_id){
		//quiz user nums < 3
		$prizesQuizObj = $this->db->where('goods_id',$goods_bak_id)->from('prizesquiz')->get()->row();
		if ($prizesQuizObj->currentNum >= 3) {
			return '参与人数大于3，不能停止';
			exit;
		}
		if ($prizesQuizObj->currentNum != 0) {
			$partUser = $this->where('goods_id',$goods_bak_id)->from('quizuser')->select('user_id')->get()->result_array();
			for ($i=0; $i <$prizesQuizObj->currentNum ; $i++) { 
				$cuserid = $partUser[$i]['user_id'];
				$balance = $this->db->select('balance')->from('user')->where('userId',$cuserid)->get()->row_array();
				$balance['balance'] += 5;
				$this->db->where('userId',$cuserid)->update('user',array('balance'=>$balance['balance']));
			}
		}
		//set this quiz status 2
		$this->db->where('goods_id',$goods_bak_id)->update('prizesquiz',array('status'=>2));
	}

	//get auction object
	function getItemInfo($itemId){
		$item = null;
		if (isset(self::$itemInfo[$itemId])) {
			$item = self::$itemInfo[$itemId];
			return $item;
		}
		$key = CACHE_PREFIX_AUCTION.$itemId;
		$item = unserialize($this->cache->redis->get($key));
		if ($item) {
			self::$itemInfo[$itemId] = $item;
			return $item;
		}

		$res = $this->m_common->get_one('prizesquiz',array('id'=>$itemId));
		if (!empty($res)) {
			$item = new CAuction();
			$item->itemId = $itemId;
			$item->initWithDBData($res);
			$item->saveCache();
			self::$itemInfo[$itemId] = $item;
			return $item;
		}
		return $item;

	}

	//quiz normal over
	function quizOver($itemId){
		//get quiz goods purchase
		$purchasePrice_Sum = $this->db->select('purchasePrice,sum')->from('prizesquiz')->where('goods_id',$itemId)->get()->row_array();
		$userId_quizPrice = $this->db->select('user_id,quiz_price')->from('quizuser')->where('goods_id',$itemId)->get()->result_array();
		$awardUser = $this->getFTUserId($purchasePrice_Sum['purchasePrice'],$userId_quizPrice);

		//award every award-user money
		for ($i=0; $i <count($awardUser) ; $i++) { 
			switch ($i) {
				case 0:
					//first prize users obtain award
					$awardMoney = $purchasePrice_Sum['sum'] / count($awardUser[$i]) * 6 / 10;
					$award = 1;
					break;
				case 1:
					//second prize users obtain award
					$awardMoney = $purchasePrice_Sum['sum'] / count($awardUser[$i]) * 3 / 10;
					$award = 2;
					break;
				case 2:
					//third prize users obtain award
					$awardMoney = $purchasePrice_Sum['sum'] / count($awardUser[$i]) * 1 / 10;
					$award = 3;
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
				$this->db->where('user_id',$cuserid)->update('quizuser',array('award'=>$award));
			}
		}
		$this->db->where('goods_id',$itemId)->update('prizesquiz',array('status'=>4));
		
	}

	//get first three userids
	function getFTUserId($purchasePrice,$UID_Price_array){
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
	function getQuizList(){
		$data = $this->db->get('prizesquiz',0,20)->result_array();
		return $data;
	}

	//get quiz user list
	//contain user icon,telphone,part_time,quiz_price,award
	function getQuizUserList($itemId){
		$data = $this->db->from('quizuser')->where('goods_id',$itemId)->join('user',"quizuser.user_id = user.userId")->select('icon,telephone,part_time,quiz_price,award')->get()->result_array();
		return $data;
	}

	//get auction info by goods_id
	function getAuctionObj($goods_id){
		$goods_bak_id = $this->db->select('goods_bak_id')->from('goods_bak')->where('goods_id',$goods_id)->get()->row_array();
		$goods_bak_id = $goods_bak_id['goods_bak_id'];
		$auctionObj = $this->db->from('auctionitems')->where('goods_bak_id',$goods_bak_id)->get()->row();
		return $auctionObj;
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