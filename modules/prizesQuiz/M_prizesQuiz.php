<?php

/**
* create by mxl
* time 2017-2-21
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

	// user takes part in prizes quiz
	function partakeQuiz($itemId,$quizPrice,$userId){
		$itemInfo = $this->getItemInfo($itemId);
		if (!empty($itemInfo)) {
			//the goods is auction, can't be quiz
			$this->responseError('1');
			exit;
		}
		//
	}

	// administrator quit the quiz
	function quitQuiz(){
		//
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

		$res = $this->m_common->get_one('auctionItems',array('id'=>$itemId));
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

}