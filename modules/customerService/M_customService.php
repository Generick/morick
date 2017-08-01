<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/27/2017
 * Time: 4:07 PM
 */
class M_customService extends My_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_user');
    }

    //添加推广员
    function addService($name, $accountName, $password)
    {
    	$accountId = 0;
    	$err = $this->createPassport(PLATFORM_TYPE_SELF, $accountName, $password, $accountId);
    	if ($err !== ERROR_OK && $err !== ERROR_ACCOUNT_PASSPORT_EXISTS) 
    	{
    		return $err;
    	}
    	$userId = 0;
    	$err = $this->m_account->createNormalSRV($accountId, $userId, $accountName, $name);
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

    function createNormalSRV($userId, $platformId = "", $name)
    {
        $result = $this->m_common->get_one("srv", array("userId" => $userId));
        if(count($result) > 0)
        {
        	if ($result['is_delete'] == DELETE_NO) 
        	{
        		log_message('error', "[createNormalUser] User already exists!!!");
            	return ERROR_ACCOUNT_USER_EXISTS;
        	}
        	$mch = $this->m_user->getUserObj(USER_TYPE_SRV, $userId);
        	$mch->modInfoWithPrivilege(array('is_delete' => DELETE_NO, 'name' => $name));
          	return ERROR_OK;  
        }

        $ret = $this->m_common->insert("srv", array("userId" => $userId, "name" => $name, "registerTime" => now(), 'accountName' => $platformId));
        if (!$ret)
        {
            log_message('error', "Insert into user failed!!!");
            return ERROR_SYSTEM;
        }

        return ERROR_OK;
    }

    //修改客服密码
    function modServicePassword($platformId, $newPWD)
    {
    	$res = $this->db->where('platformId', $platformId)->update('passport', array('password' => str_md5($newPWD)));
    	if ($res) return ERROR_OK;
    	return ERROR_SYSTEM;
    }

    //删除客服
    function delService($userId)
    {
    	$srv = $this->m_user->getUserObj(USER_TYPE_SRV, $userId);
    	if (!$pmt) return ERROR_NO_SERVICE;
    	$srv->modInfoWithPrivilege(array('is_delete' => DELETE_YES));
    	return ERROR_OK;
    }

    //获取客服账号列表
    function getServices($startIndex, $num, $whr, &$data, &$count)
    {
    	$this->db->start_cache();
    	$this->db->from('srv');
    	$this->db->select('userId');
    	$this->db->where($whr);
    	$this->db->stop_cache();
    	$count = $this->db->count_all_results();
    	if ($num > 0) 
    	{
    		$this->db->limit($num, $startIndex);
    	}
    	$userIds = $this->db->order_by('registerTime desc')->get()->result_array();
    	$this->db->flush_cache();
    	if (empty($userIds)) return;
    	foreach ($userIds as $v) 
    	{
    		$oneSrv = $this->m_user->getUserObj(USER_TYPE_SRV, $v['userId']);
    		if (!$oneSrv) 
    		{
    			$oneSrv->lastLoginTime = '';
    			$lastLoginTime = $this->db->select('lastLoginTime')->where('id', $v['userId'])->get('user_relation')->row_array();
    			if (!empty($lastLoginTime)) $oneSrv->lastLoginTime = $lastLoginTime['lastLoginTime'];
    		}
    		$data[] = $oneSrv;
    	}
    }

    //添加操作记录
    function addOPREC($userId, $fromStatus, $toStatus)
    {
    	$data = array(
    		'userId' => $userId,
    		'fromStatus' => $fromStatus,
    		'toStatus' => $toStatus,
    		'opTime' => time(),
    		);
    	$res = $this->db->insert('srv_op_rec', $data);
    	if ($res) return ERROR_OK;
    	return ERROR_ADD_OP_REC_FAIL;
    }

    //获取操作记录
    function getOPREC($startIndex, $num, $whr, &$data, &$count)
    {
    	$this->db->start_cache();
    	$this->db->from('srv_op_rec');
    	$this->db->where($whr);
    	$this->db->stop_cache();
    	$count = $this->db->count_all_results();
    	if ($num > 0) 
    	{
    		$this->db->limit($num, $startIndex);
    	}
    	$data = $this->db->order_by('opTime desc')->get()->result_array();
    	$this->db->flush_cache();
    	if (empty($data)) return;
    	foreach ($data as &$v) 
    	{
    		$v['opName'] = '';
    		$srv = $this->m_user->getUserObj(USER_TYPE_SRV, $v['userId']);
    		if ($srv) $v['opName'] = $srv->name;
    	}
    }
}