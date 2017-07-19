<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/17/2017
 * Time: 10:56 AM
 */
class M_promoter extends My_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_user');
    }

    //添加推广员
    function addPromoter($name, $telephone, $password)
    {
    	$accountId = 0;
    	$err = $this->createPassport(PLATFORM_TYPE_SELF, $telephone, $password, $accountId);
    	if ($err !== ERROR_OK && $err !== ERROR_ACCOUNT_PASSPORT_EXISTS) 
    	{
    		return $err;
    	}
    	$userId = 0;
    	$err = $this->m_account->createNormalPMT($accountId, $userId, $telephone, $name);
    	if ($err !== ERROR_OK) 
    	{
    		return $err;
    	}
    	return ERROR_OK;
    }

    function createPassport($platform, $platformId, $password, &$accountId = 0)
    {
    	$whereArr = array(
            'platform' => $platform,
            'platformId' => $platformId,
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

    function createNormalPMT($userId, $platformId = "", $name)
    {
        $result = $this->m_common->get_one("pmt", array("userId" => $userId));
        if(count($result) > 0)
        {
        	if ($result['is_delete'] == DELETE_NO) 
        	{
        		log_message('error', "[createNormalUser] User already exists!!!");
            	return ERROR_ACCOUNT_USER_EXISTS;
        	}
        	$mch = $this->m_user->getUserObj(USER_TYPE_PMT, $userId);
        	$mch->modInfoWithPrivilege(array('is_delete' => DELETE_NO));
          	return ERROR_OK;  
        }

        $ret = $this->m_common->insert("pmt", array("userId" => $userId, "name" => $name, "registerTime" => now(), 'telephone' => $platformId));
        if (!$ret)
        {
            log_message('error', "Insert into user failed!!!");
            return ERROR_SYSTEM;
        }

        return ERROR_OK;
    }

    //修改推广员密码
    function modPMTPassword($platformId, $newPWD)
    {
    	$res = $this->db->where('platformId', $platformId)->update('passport', array('password' => str_md5($newPWD)));
    	if ($res) return ERROR_OK;
    	return ERROR_SYSTEM;
    }

    //删除推广员
    function delPromoter($userId)
    {
    	$pmt = $this->m_user->getUserObj(USER_TYPE_PMT, $userId);
    	if (!$pmt) return ERROR_MCH_NOT_EXISTS;
    	$pmt->modInfoWithPrivilege(array('is_delete' => DELETE_YES));
    	return ERROR_OK;
    }

    //获取推广员列表
    function getPromoters($startIndex, $num, $whr, &$data, &$count)
    {
    	$this->db->start_cache();
    	$this->db->select('userId');
    	$this->db->from('pmt');
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
    		$pmt = $this->m_user->getAllUserObj(USER_TYPE_PMT, $v['userId']);
    		$pmt->invitedNum = $this->db->where('PMTID', $v['userId'])->count_all_results('user');
    		$pmt->waitCheckAmount = $this->getWaitCheckAmount($v['userId']);
    		$pmt->url = $this->getUrl($v['userId']);
    		//$pmt->url = 'http://www.yawan365.com/login.html?PMTID='.$v['userId'];
    		$data[] = $pmt;
    	}
    }

    function getUrl($userId)
    {
    	$httpType = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')) ? 'https://' : 'http://';
        $port = strpos($_SERVER['HTTP_HOST'], $_SERVER['SERVER_PORT']) > 0 ? '' : ":".$_SERVER['SERVER_PORT'];
        if (strtolower(substr(PHP_OS,0,3)) == 'win') 
        {
        	return 'http://www.yawan365.com:8080/login.html?PMTID='.$userId;
        }
        $url = $httpType.$_SERVER['HTTP_HOST'].$port."/login.html?PMTID=".$userId;
        return $url;
    }

    function getIP()
    {
    	if(strtolower(substr(PHP_OS,0,3)) == "win") return '140.206.112.170';
        return '123.206.106.123';
    }

    //修改二维码
    function modPromoter($userId, $modInfo)
    {
    	$pmt = $this->m_user->getUserObj(USER_TYPE_PMT, $userId);
    	if (!$pmt) return ERROR_NO_PROMOTER;
    	$pmt->modInfoWithPrivilege($modInfo);
    	return ERROR_OK;
    }

    //结账
    function adminCheckBill($userId, $amount)
    {
    	$userObj = $this->m_user->getUserObj(USER_TYPE_PMT, $userId);
    	if (!$userObj) return ERROR_NO_PROMOTER;
    	$data = array('userId' => $userId, 'amount' => $amount, 'check_time' => time());
    	$res = $this->db->insert('check', $data);
    	if ($res) return ERROR_OK;
    	return ERROR_CHECK_BILL_FAIL;
    }

    //管理员添加条件
    function adminAddCondition($userId, $condition_money, $condition_rate)
    {
    	$lastCondition = $this->db->where('userId', $userId)->order_by('condition_money desc')->get('prompt_condition')->row_array();
    	if ($lastCondition && ($lastCondition['condition_money'] >= $condition_money || $lastCondition['condition_rate'] >= $condition_rate)) return ERROR_CONDITION_ERROR;
    	$data = array(
    			'userId' => $userId,
    			'condition_money' => $condition_money,
    			'condition_rate' => $condition_rate,
    			'add_time' => time(),
    		);
    	$res = $this->db->insert('prompt_condition', $data);
    	if ($res) return ERROR_OK;
    	return ERROR_ADD_CONDITION_FAIL;
    }

    //获取推广员的分成条件
    function getPromoterConditions($userId)
    {
    	$data = $this->db->where('userId', $userId)->order_by('condition_money asc')->get('prompt_condition')->result_array();
    	return $data;
    }

    //删除分成条件
    function adminDelCondition($id)
    {
    	$condition = $this->db->where('id', $id)->get('prompt_condition')->row_array();
    	if (!$condition) return ERROR_NO_CONDITION;
    	$res = $this->db->where('id', $id)->delete('prompt_condition');
    	if ($res) return ERROR_OK;
    	return ERROR_DEL_CONDITION_FAIL;
    }

    //结账记录
    function getCheckBillRecords($startIndex, $num, $whr, &$data, &$count)
    {
    	$this->db->start_cache();
    	$this->db->from('check');
    	$this->db->where($whr);
    	$this->db->stop_cache();
    	$count = $this->db->count_all_results();
    	if ($num > 0) 
    	{
    		$this->db->limit($num, $startIndex);
    	}
    	$data = $this->db->order_by('check_time desc')->get()->result_array();
    	$this->db->flush_cache();
    }

    //获取待结金额以及好友的总消费
    function getWaitCheckAmount($userId)
    {
    	$waitCheckAmount = 0;
    	$friendsTotalFee = 0;
    	$check_time = 0;
    	$lastCheckBill = $this->db->select('check_time')->where('userId', $userId)->order_by('check_time desc')->get('check')->row_array();
    	$hisFriends = $this->db->select('userId')->where('PMTID', $userId)->get('user')->result_array();
    	$condition = $this->db->select('condition_money, condition_rate')->where('userId', $userId)->get('prompt_condition')->result_array();
    	if (!empty($hisFriends)) 
    	{
    		$friendsUserId = array_column($hisFriends, 'userId');
    		foreach ($friendsUserId as $v) 
    		{
    			$whr = "userId = {$v} and orderStatus not in (0,1)";
    			$ordersPayPrice = $this->db->select('payPrice')->where($whr)->get('order')->result_array();
    			$total = array_sum(array_map(create_function('$val', 'return $val["payPrice"];'), $ordersPayPrice));
    			$friendsTotalFee += $total;
    			$whr = "userId = {$v} and orderTime > {$check_time} and orderStatus not in (0,1)";
    			$waitCheckAmount += $this->getSingleUserReturnMoney($userId, $whr, $condition);
    		}
    	}
    	return $waitCheckAmount;
    }

    //获取推广员信息
    function getPromoterInfo($userId, &$data)
    {
    	$pmt = $this->m_user->getUserObj(USER_TYPE_PMT, $userId);
    	if (!$pmt) return ERROR_NO_PROMOTER;
    	$historyReturnTotal = $this->db->select_sum('amount')->where('userId', $userId)->get('check')->row_array();
    	$pmt->historyReturnTotal = (empty($historyReturnTotal)||empty($historyReturnTotal['amount']))?0:$historyReturnTotal['amount'];
    	$pmt->friendsTotalFee = 0;
    	$pmt->waitCheckAmount = 0;
    	$check_time = 0;
    	$lastCheckBill = $this->db->select('check_time')->where('userId', $userId)->order_by('check_time desc')->get('check')->row_array();
    	if (!empty($lastCheckBill)) $check_time = $lastCheckBill['check_time'];
    	$hisFriends = $this->db->select('userId')->where('PMTID', $userId)->get('user')->result_array();
    	$condition = $this->db->select('condition_money, condition_rate')->where('userId', $userId)->get('prompt_condition')->result_array();
    	if (!empty($hisFriends)) 
    	{
    		$friendsUserId = array_column($hisFriends, 'userId');
    		foreach ($friendsUserId as $v) 
    		{
    			$whr = "userId = {$v} and orderStatus not in (0,1)";
    			$ordersPayPrice = $this->db->select('payPrice')->where($whr)->get('order')->result_array();
    			$total = array_sum(array_map(create_function('$val', 'return $val["payPrice"];'), $ordersPayPrice));
    			$pmt->friendsTotalFee += $total;
    			$whr = "userId = {$v} and orderTime > {$check_time} and orderStatus not in (0,1)";
    			$pmt->waitCheckAmount += $this->getSingleUserReturnMoney($userId, $whr, $condition);
    		}
    	}
    	$data = $pmt;
    	return ERROR_OK;
    	
    }

    //获取好友
    function getFriends($startIndex, $num, $userId, &$data, &$count)
    {
    	$this->db->start_cache();
    	$this->db->from('user');
    	$this->db->select('userId');
    	$this->db->where(array('PMTID' => $userId));
    	$this->db->stop_cache();
    	$count = $this->db->count_all_results();
    	if ($num > 0) 
    	{
    		$this->db->limit($num, $startIndex);
    	}
    	$userIds = $this->db->get()->result_array();
    	$this->db->flush_cache();
    	if (empty($userIds)) return ERROR_OK;
    	$condition = $this->db->select('condition_money, condition_rate')->where('userId', $userId)->get('prompt_condition')->result_array();
    	foreach ($userIds as $v) 
    	{
    		$one = array();
    		$one['nickname'] = '';
    		$one['telephone'] = '';
    		$one['registerTime'] = '';
    		$one['tradeNum'] = '';
    		$one['totalFee'] = '';
    		$one['returnFee'] = '';
    		$one['recentOrderTime'] = '';
    		$userObj = $this->m_user->getUserObj(USER_TYPE_USER, $v['userId']);
    		if ($userObj)
    		{
    			$one['nickname'] = $userObj->name;
    			$one['telephone'] = $userObj->telephone;
    			$one['registerTime'] = $userObj->registerTime;
    		}
    		$lastOrder = $this->db->select('orderTime')->where('userId', $v['userId'])->order_by('orderTime desc')->get('order')->row_array();
    		if($lastOrder) $one['recentOrderTime'] = $lastOrder['orderTime'];
    		$one['tradeNum'] = $this->db->where('userId', $v['userId'])->count_all_results('order');
    		$whr = "userId = {$v['userId']} and orderStatus not in (0,1)";
    		$totalFee = $this->db->select_sum('payPrice')->where($whr)->get('order')->row_array();
    		$one['totalFee'] = $totalFee['payPrice'];
    		$one['returnFee'] = $this->getSingleUserReturnMoney($userId, $whr, $condition);
    		$data[] = $one;
    	}
    }

    //获取单个好友的返现金额
    function getSingleUserReturnMoney($userId, $whr, $condition = array())
    {
    	if (empty($condition)) return 0;
    	$orders = $this->db->select('payPrice')->where($whr)->get('order')->result_array();
    	$sum = 0;
		if (!empty($orders))
		{
			foreach ($orders as $v) 
			{
				$singleOrderFee = $this->getSingleOrderReturnMoney($condition, $v['payPrice']);
				$sum += $singleOrderFee;
			}
		}
		return $sum;
    }

    //获取单个订单的返现金额
    function getSingleOrderReturnMoney($condition, $payPrice)
    {
    	if (empty($condition)) return 0;
    	$singleOrderFee = 0;
    	foreach ($condition as $v) 
    	{
    		if ($payPrice >= $v['condition_money']) 
    		{
    			$singleOrderFee = $payPrice * $v['condition_rate'] / 100;
    			break;
    		}
    		continue;
    	}
    	return ceil($singleOrderFee);
    }

    //好友下单记录
    function getFriendsOrders($startIndex, $num, $userId, $whr, &$data, &$count)
    {
    	$hisFriendsUserIds = $this->db->select('userId')->where('PMTID', $userId)->get('user')->result_array();
    	$friendsUserIds = array();
    	if (empty($hisFriendsUserIds)) return ERROR_NO_FRIENDS;
     	$friendsUserIds = array_column($hisFriendsUserIds, 'userId');
    	$this->db->start_cache();
    	$this->db->from('order');
    	$this->db->select('order_no, userId, payPrice, orderTime, orderStatus');
    	$this->db->where($whr);
    	$this->db->where_in($friendsUserIds);
    	$this->db->stop_cache();
    	$count = $this->db->count_all_results();
    	if ($num > 0) 
    	{
    		$this->db->limit($num, $startIndex);
    	}
    	$data = $this->db->order_by('orderTime desc')->get()->result_array();
    	$this->db->flush_cache();
    	if (empty($data)) return ERROR_OK;
    	$lastCheckBill = $this->db->select('check_time')->where('userId', $userId)->order_by('check_time desc')->get('check')->row_array();
    	$condition = $this->db->select('condition_money,condition_rate')->where('userId', $userId)->order_by('id desc')->get('prompt_condition')->result_array();
    	foreach ($data as &$v) 
    	{
    		$userObj = $this->m_user->getUserObj(USER_TYPE_USER, $v['userId']);
    		$v['friendTelephone'] = $userObj->telephone;
    		$v['isChecked'] = false;
    		if ($lastCheckBill && $lastCheckBill['check_time'] >= $v['orderTime']) $v['isChecked'] = true;    		
    		$v['returnFee'] = $this->getSingleOrderReturnMoney($condition, $v['payPrice']);
    	}
    	return ERROR_OK;
    }
    
}