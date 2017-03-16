<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/8/2017
 * Time: 6:22 PM
 */

class  M_withdrawCash extends My_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('m_transaction');
        $this->load->model('m_user');
    }
    // withdraw cash
    function withdrawCash($userId, $withdrawCash, $wx_account)
    {
    	$balance = $this->db->select('balance')->from('user')->where('userId', $userId)->get()->row_array();
    	if ($balance['balance'] < $withdrawCash) 
    	{
    		return ERROR_WC_BALANCE_NOT_ENOUGH;
    	}

    	$data = array('user_id' => $userId, 'withdraw_cash' => $withdrawCash, 'wx_account' => $wx_account, 'apply_time' => time(),'status' => 1);
    	$this->db->insert('withdrawcash', $data);
    	// add transaction about user withdraw
    	$this->m_transaction->addTransaction($userId, TRANSACTION_WITHDRAWAL, $withdrawCash);
    	return ERROR_OK;
    }

    //get withdraw list
    function getWithDrawList($startIndex, $num, &$data, $status, $fields, $whr)
    {
    	//status 
    	//0: completed
    	//1: waiting handle
    	//2: refuse
    	//3: all
    	
    	if (!empty($fields)) 
    	{
    		$data = $this->searchWithDrawUserList($fields, $startIndex, $num, $whr);
    		// $data = $res['data'];
    		// $count = $res['count'];
    		return ERROR_OK;
    	}
    	$res = $this->db->from('withdrawcash')->where($whr)->join('user','withdrawcash.user_id = user.userId')->select('user_id,name,telephone,balance,withdraw_cash,wx_account,apply_time,status,id')->order_by('apply_time desc')->limit($num, $startIndex)->get()->result_array();
    	$count = $this->db->where($whr)->from('withdrawcash')->count_all_results();
    	$data = array('data' => $res, 'count' => $count);
    }

    //search user withdraw list
    function searchWithDrawUserList($fields, $startIndex, $num, $whr)
    {
    	$userIds = $this->db->select('userId')->from('user')->like('userId', $fields)->or_like('name', $fields)->or_like('telephone', $fields)->get()->result_array();
    	$uids = array();
    	foreach ($userIds as $v) 
    	{
    		$uids[] = $v['userId'];
    	}
    	if (empty($uids)) 
    	{
    	return array('data'=>array(),'count'=>0);
    	}
    	$data = $this->db->from('withdrawcash')->where($whr)->where_in('user_id', $uids)->join('user','withdrawcash.user_id = user.userId')->order_by('apply_time desc')->limit($num, $startIndex)->get()->result_array();
    	$count = $this->db->from('withdrawcash')->where($whr)->where_in('user_id', $uids)->count_all_results();
    	return array('data' => $data, 'count' => $count);
    	
    }

    //refuse withdraw
    function refuseWithDraw($id, $userId, $withdrawCash, $reason)
    {
    	$withdrawobj = $this->getWithDrawObj($id);
    	if (empty($withdrawobj)) 
    	{
    		return ERROR_WITHDRAW_NOT_FOUND;
    	}
    	//add transaction about refuse withdraw
    	$this->m_transaction->addTransaction($userId, TRANSACTION_REFUSEWITHDRAW, $withdrawCash);
    	$this->db->where('id',$id)->update('withdrawcash',array('status' => WC_STATUS_ALL, 'refuse_reason' => $reason));
    	return ERROR_OK;
    }

    //accept withdraw
    function acceptWithDraw($id)
    {
    	$withdrawobj = $this->getWithDrawObj($id);
    	if (empty($withdrawobj)) 
    	{
    		return ERROR_WITHDRAW_NOT_FOUND;
    	}
    	$this->db->where('id',$id)->update('withdrawcash',array('status' => WC_STATUS_COMPLETED));
    	return ERROR_OK;
    }

    //get withdraw obj by id
    function getWithDrawObj($id)
    {
    	$withdrawobj = $this->db->from('withdrawcash')->where('id', $id)->get()->row_array();
    	return $withdrawobj;
    }

    

}