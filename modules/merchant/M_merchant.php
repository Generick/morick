<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/11/2017
 * Time: 11:49 AM
 */

class M_merchant extends My_Model
{
	static $loadedCommodity = array();
	static $commodity_id = 0;
    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_user');
        $this->load->model('m_saleMeeting');
        $this->load->model('m_messagePush');
    }

    function addMCH($platformId, $password, $name)
    {
    	$accountId = 0;
    	$err = $this->createPassport(PLATFORM_TYPE_SELF, $platformId, $password, $accountId);
    	if ($err !== ERROR_OK && $err !== ERROR_ACCOUNT_PASSPORT_EXISTS) 
    	{
    		return $err;
    	}
    	$userId = 0;
    	$err = $this->m_account->createNormalMCH($accountId, $userId, $platformId, $name);
    	if ($err !== ERROR_OK) 
    	{
    		return $err;
    	}
    	return ERROR_OK;
    }

    //修改商户密码
    function modMCHPWD($platformId, $newPWD)
    {
    	$res = $this->db->where('platformId', $platformId)->update('passport', array('password' => str_md5($newPWD)));
    	if ($res) return ERROR_OK;
    	return ERROR_SYSTEM;
    }

    function createPassport($platform, $platformId, $password, &$accountId = 0)
    {
    	$whereArr = array(
            'platform' => $platform,
            'platformId' => $platformId
        );

        $dbData = $this->m_common->get_one("passport", $whereArr);
        if($dbData)
        {
            //存在
            $accountId = $dbData['id'];
            $data = array(
            	'password' => str_md5($password),
            	'createTime' => time(),
            	'token' => '',
            	'tokenEndTime' => '',
            	);
            $this->db->where('platformId', $platformId)->update('passport', $data);
            $data = array('lastLoginTime' => '', 'registerTime' => time());
            $this->db->where('accountId', $accountId)->update('user_relation', $data);
            return ERROR_ACCOUNT_PASSPORT_EXISTS;
        }

        //插入新数据
        $passportData = array(
            'platform' => $platform,
            'platformId' => $platformId,
        );

        if ($password !== '')
        {
            $passportData["password"] = str_md5($password);
        }

        $passportData["createTime"] = time();
        if(!$this->m_common->insert("passport", $passportData))
        {
            return ERROR_SYSTEM;
        }
        $accountId = $this->db->insert_id();
        return ERROR_OK;
    }

    function createNormalMCH($userId, $platformId = "", $name)
    {
        $result = $this->m_common->get_one("mch", array("userId" => $userId));
        if(count($result) > 0)
        {
        	if ($result['is_delete'] == DELETE_NO) 
        	{
        		log_message('error', "[createNormalUser] User already exists!!!");
            	return ERROR_ACCOUNT_USER_EXISTS;
        	}
        	$mch = $this->m_user->getUserObj(USER_TYPE_MCH, $userId);
        	$mch->modInfoWithPrivilege(array('is_delete' => DELETE_NO, 'name' => $name));
          	return ERROR_OK;  
        }

        $ret = $this->m_common->insert("mch", array("userId" => $userId, "name" => $name, "registerTime" => now(), 'accountName' => $platformId));
        if (!$ret)
        {
            log_message('error', "Insert into user failed!!!");
            return ERROR_SYSTEM;
        }

        return ERROR_OK;
    }

    //添加商户商品
    function addCommodity($info)
    {
    	if (!isset($info['mch_commodity_attr']) || $info['mch_commodity_attr'] == 0) 
        {
            $info['mch_stock_num'] = 1;
        }
    	$res = $this->db->insert('mch_commodity', $info);
    	if (!$res) 
    	{
    		return ERROR_ADD_COMMODITY_FAIL;
    	}
    	return ERROR_OK;
    }

    //商户修改商品
    function modCommodity($id, $modInfo)
    {
    	$info = $this->getCommodityInfo($id);
    	if (empty($info)) return ERROR_NO_COMMODITY;
    	if ($this->db->where('id', $id)->update('mch_commodity', $modInfo)) 
    	{
    		if (isset(self::$loadedCommodity[$id])) unset(self::$loadedCommodity[$id]);
    		get_instance()->cache->redis->save(CACHE_PREFIX_MCH_COMMODITY . $id, '', CACHE_LIVE_TIME_MCH_COMMODITY);
    		return ERROR_OK;
    	}
    	return ERROR_SYSTEM;
    }

    //商户删除商品
    function delCommodity($id)
    {
    	$info = $this->getCommodityInfo($id);
    	if (empty($info)) return ERROR_NO_COMMODITY;
    	$res = $this->modCommodity($id, array('mch_is_delete' => DELETE_YES));
    	return $res;
    }

    //获取商品信息
    function getCommodityInfo($id)
    {
    	$data = null;
    	self::$commodity_id = $id;
    	if (isset(self::$loadedCommodity[$id]) && !empty(self::$loadedCommodity[$id])) 
    	{
    		$data = self::$loadedCommodity[$id];
    		return $data;
    	}
    	$data = $this->cache->redis->get(CACHE_PREFIX_MCH_COMMODITY . self::$commodity_id);
    	if ($data) 
    	{
    		self::$loadedCommodity[self::$commodity_id] = $data;
    		return $data;
    	}

    	$data = $this->db->where('id', $id)->get('mch_commodity')->row();
    	if(empty($data)) return null;
        if (empty($data->sold_time)) 
        {
            $sold_time = $this->db->select('orderTime')->where(array('goodsId' => $data->id))->join('order', 'order_goods.order_no = order.order_no')->order_by('orderTime desc')->get('order_goods')->row_array();
            $data->sold_time = empty($sold_time)? "" : $sold_time['orderTime'];
        }
        $data->hasUp = false;
        $hasUp = $this->db->select('id')->where('CID', $id)->get('commodity')->row_array();
        if($hasUp) $data->hasUp = true;
    	self::$loadedCommodity[self::$commodity_id] = $data;
    	$this->saveCache();
    	return $data;
    }

    //商户获取商品列表
    function getCommodities($startIndex, $num, $whr, &$data, &$count)
    {
    	$this->db->start_cache();
    	$this->db->select('id');
    	$this->db->from('mch_commodity');
    	$this->db->where($whr);
    	$this->db->stop_cache();
    	$count = $this->db->count_all_results();
    	if ($num > 0) 
    	{
    		$this->db->limit($num, $startIndex);
    	}
    	$ids = $this->db->order_by('mch_add_time desc')->get()->result_array();
    	$this->db->flush_cache();
    	if (empty($ids)) return ERROR_OK;
    	foreach ($ids as $v) 
    	{
    		$commodityInfo = $this->getCommodityInfo($v['id']);
    		unset($commodityInfo->mch_commodity_detail);
    		$data[] = $commodityInfo;
    	}
    }

    //管理员获取商户账号列表
    function getMCHList($startIndex, $num, $whr, &$data, &$count)
    {
    	$this->db->start_cache();
    	$this->db->select('userId');
    	$this->db->from('mch');
    	$this->db->where($whr);
    	$this->db->stop_cache();
    	$count = $this->db->count_all_results();
    	if ($num > 0) 
    	{
    		$this->db->limit($num, $startIndex);
    	}
    	$ids = $this->db->order_by('registerTime desc')->get()->result_array();
    	$this->db->flush_cache();
    	if (empty($ids)) return ERROR_OK;
    	foreach ($ids as $v) 
    	{
    		$data[] = $this->m_user->getAllUserObj(USER_TYPE_MCH, $v['userId']);
    	}
    }

    function delMCH($userId)
    {
    	$mch = $this->m_user->getUserObj(USER_TYPE_MCH, $userId);
    	if (!$mch) return ERROR_MCH_NOT_EXISTS;
    	$mch->modInfoWithPrivilege(array('is_delete' => DELETE_YES));
    	return ERROR_OK;
    }

    function saveCache()
    {
    	$CI = &get_instance();
    	$CI->cache->redis->save(CACHE_PREFIX_MCH_COMMODITY . self::$commodity_id, self::$loadedCommodity[self::$commodity_id], CACHE_LIVE_TIME_MCH_COMMODITY);
    }

    //商户请求
    function merchantRequest($commodity_id, $requestType, $userId)
    {
    	if (!in_array($requestType, array(1,2,3))) return ERROR_NO_REQUEST;
    	$whr = array(
    		'mch_commodity_id' => $commodity_id,
    		'requestType' => $requestType,
    		'handleResult' => 0,
    		);
    	$hasRequest = $this->db->where($whr)->get('mch_request')->row_array();
    	if ($hasRequest) return ERROR_REQUEST_HAS_SUBMIT;
    	$data = array(
    		'mch_commodity_id' => $commodity_id,
    		'requestType' => $requestType,
    		'requestTime' => time(),
    		'is_delete' => DELETE_NO,
    		'userId' => $userId,
    		);
    	if ($this->db->insert('mch_request', $data)) 
    	{
    		return ERROR_OK;
    	}
    	return ERROR_SYSTEM;
    }

    //获取商户请求列表
    function getRequestList($startIndex, $num, $whr, &$data, &$count)
    {
    	$this->db->start_cache();
    	$this->db->from('mch_request');
    	$this->db->where($whr);
    	$this->db->stop_cache();
    	$count = $this->db->count_all_results();
    	if ($num > 0) 
    	{
    		$this->db->limit($num, $startIndex);
    	}
    	$data = $this->db->order_by('requestTime desc')->get()->result_array();
    	$this->db->flush_cache();
    	if (empty($data)) return ERROR_OK;
    	foreach ($data as &$v) 
    	{
    		$v['requestUserName'] = '';
    		$userObj = $this->m_user->getUserObj(USER_TYPE_MCH, $v['userId']);
    		if ($userObj) $v['requestUserName'] = $userObj->name;
    		$v['commodityInfo'] = $this->getCommodityInfo($v['mch_commodity_id']);
    	}
    }

    //管理员删除商户请求
    function adminDelRequest($id)
    {
    	if ($this->db->where('id', $id)->update('mch_request', array('is_delete' => DELETE_YES))) {
    		return ERROR_OK;
    	}
    	return ERROR_SYSTEM;
    }

    //管理员处理商户请求
    function adminHandleRequest($id, $handleResult, $isChange = false)
    {
    	$request = $this->db->where('id', $id)->get('mch_request')->row_array();
    	if (!$request) return ERROR_NULL_REQUEST;
    	if ($request['handleResult'] > 0) return ERROR_OK;

    	if ($this->db->where('id', $id)->update('mch_request', array('handleResult' => $handleResult))) 
    	{
    		//同意
	    	if ($handleResult == 1) 
	    	{
	    		switch ((int)$request['requestType']) 
	    		{
	    			case REQUEST_UP_ON:
	    				return $this->up_off_handle($request['mch_commodity_id'], true, $isChange);
	    				break;
	    			case REQUEST_UP_OFF:
	    				return $this->up_off_handle($request['mch_commodity_id']);
	    				break;
	    			case REQUEST_SYNC:
	    				return $this->syncHandle($request['mch_commodity_id'], $isChange);
	    				break;
	    			
	    			default:
	    				# code...
	    				break;
	    		}
	    	}
	    	switch ((int)$request['requestType']) 
	    	{
	    		case REQUEST_UP_ON:
	    			$msg_type = MP_MSG_TYPE_MCH_UP_REJECT;
	    			break;
	    		case REQUEST_UP_OFF:
	    			$msg_type = MP_MSG_TYPE_MCH_OFF_REJECT;
	    			break;
	    		case REQUEST_SYNC:
	    			$msg_type = MP_MSG_TYPE_MCH_SYNC_REJECT;
	    			break;
	    		
	    		default:
	    			# code...
	    			break;
	    	}
	    	$commodityObj = $this->getCommodityInfo($request['mch_commodity_id']);
	    	$this->m_messagePush->createUserMsg($request['userId'], $msg_type, $request['mch_commodity_id'], $commodityObj->mch_commodity_name);
	    	return ERROR_OK;
    	}
    	return ERROR_SYSTEM;
    	
    }

    //上下架处理
    function up_off_handle($commodity_id, $flag = false, $isChange = false)
    {
    	$commodityInfo = $this->getCommodityInfo($commodity_id);
    	//上架
    	if ($flag) 
    	{
    		$data = $this->dataSwitch($commodityInfo);
    		$exists = $this->db->select('id')->where('CID', $commodity_id)->get('commodity')->row_array();
    		$commodityId = '';
    		if ($exists) 
    		{
    			if ($isChange) 
    			{
    				unset($data);
    				$data = array('is_up' => UP_ON);
    			}
    			$commodityId = $exists['id'];
    			$this->m_saleMeeting->modCommodity($commodityId, $data);
    		}else
    		{
    			$data['is_delete'] = DELETE_NO;
	    		$data['is_up'] = UP_ON;
	    		$data['add_time'] = time();
	    		$data['sold_time'] = '';
	    		$data['CID'] = $commodity_id;
				$this->db->insert('commodity', $data);
				$commodityId = $this->db->insert_id();
    		}
    		if (empty($commodityId)) return ERROR_SYSTEM;
    		$this->m_saleMeeting->upCommodityToTMH($commodityId);
    		$this->modCommodity($commodity_id, array('up_status' => MCH_C_STATUS_UP));
    		$this->m_messagePush->createUserMsg($commodityInfo->userId, MP_MSG_TYPE_MCH_C_UP, $commodity_id, $commodityInfo->mch_commodity_name);
    		return ERROR_OK;
    	}
    	//下架
    	$commodityId = $this->db->select('id')->where('CID', $commodity_id)->get('commodity')->row_array();
    	$this->m_saleMeeting->upCommodity($commodityId['id'], UP_OFF);
    	$this->modCommodity($commodity_id, array('up_status' => MCH_C_STATUS_OFF));
    	$this->m_messagePush->createUserMsg($commodityInfo->userId, MP_MSG_TYPE_MCH_C_OFF, $commodity_id, $commodityInfo->mch_commodity_name);
    	return ERROR_OK;
    }

    //同步处理
    function syncHandle($commodity_id, $isChange = false)
    {
    	$commodityInfo = $this->getCommodityInfo($commodity_id);
    	$commodityId = $this->db->select('id')->where('CID', $commodity_id)->get('commodity')->row_array();
    	$res = ERROR_OK;
    	if (!$isChange) 
    	{
    		$modInfo = $this->dataSwitch($commodityInfo);
    		$res = $this->m_saleMeeting->modCommodity($commodityId['id'], $modInfo);
    	}
    	
    	if ($res !== ERROR_OK) 
    	{
    		return $res;
    	}
    	$this->m_messagePush->createUserMsg($commodityInfo->userId, MP_MSG_TYPE_MCH_C_SYNC, $commodity_id, $commodityInfo->mch_commodity_name);
    	return ERROR_OK;
    }

    function dataSwitch($commodityObj)
    {
    	$data = array(
    			'commodity_name' => $commodityObj->mch_commodity_name,
    			'commodity_pic' => $commodityObj->mch_commodity_pic,
    			'commodity_desc' => $commodityObj->mch_commodity_desc,
    			'commodity_price' => $commodityObj->mch_commodity_price,
    			'stock_num' => $commodityObj->mch_stock_num,
    			'commodity_detail' => $commodityObj->mch_commodity_detail,
    			'commodity_cover' => $commodityObj->mch_commodity_cover,
    			'bid_price' => $commodityObj->mch_bid_price,
    			'annualized_return' => $commodityObj->mch_annualized_return,
    			'commodity_attr' => $commodityObj->mch_commodity_attr,
    		);
    	return $data;
    }

    //管理员在请求列表中修改商户商品并同意
    function adminSaveCInfoInRequest($id, $info)
    {
    	$request = $this->db->where('id', $id)->get('mch_request')->row_array();
    	if (!$request) return ERROR_NO_REQUEST;
    	$exists = $this->db->where('CID', $request['mch_commodity_id'])->get('commodity')->row_array();
    	if ($request['requestType'] == REQUEST_UP_ON) 
    	{
    		if ($exists) 
    		{
    			$res = $this->m_saleMeeting->modCommodity($exists['id'], $info);
    		}else
    		{
    			if (!isset($info['CID']) || empty($info['CID'])) $info['CID'] = $request['mch_commodity_id'];
    			$info['add_time'] = time();
    			$res = $this->m_saleMeeting->addCommodity($info);
    		}
    		
    	}else if($request['requestType'] == REQUEST_SYNC)
    	{
    		$res = $this->m_saleMeeting->modCommodity($exists['id'], $info);
    	} else
    	{
    		return ERROR_OPERATE;
    	}
    	
    	if ($res === ERROR_OK) 
    	{
    		$res = $this->adminHandleRequest($id, MCH_REQUEST_ALLOW, true);
    	}
    	return $res;
    }
}