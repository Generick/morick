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
    }
    // withdraw cash
    function withdrawCash($userId, $withdrawCash, $wx_account)
    {
    	$balance  = $this->db->select('balance')->from('user')->where('userId',$userId)->get()->row_array();
    	if ($balance['balance'] < $withdrawCash) {
    		return WC_BALANCE_NOT_ENOUGH;
    	}

    	$data = array('user_id'=>$userId,'withdraw_cash'=>$withdrawCash,'wx_account'=>$wx_account,'apply_time'=>time(),'status'=>1);
    	$this->db->insert('withdrawcash',$data);
    	// add transaction
    	$this->load->model('m_transaction');
    	$this->m_transaction->addTransaction($userId,TRANSACTION_WITHDRAWAL,$withdrawCash);
    	return ERROR_OK;
    }

    //get withdraw list
    function getWithDrawList($startIndex, $num, &$data, &$count, $status)
    {
    	switch ($status) {
    		case 0:
    			$whr = array('status'=>0);
    			break;
    		case 1:
    			$whr = array('status'=>1);
    			break;
    		case 2:
    			$whr = array('status'=>2);
    			break;
    		
    		default:
    			$whr = array();
    			break;
    	}
    	$data = $this->db->from('withdrawcash')->where($whr)->join('user','withdrawcash.user_id = user.userId')->select('user_id,name,telephone,balance,withdraw_cash,wx_account,apply_time,status,id')->order_by('apply_time desc')->limit($num,$startIndex)->get()->result_array();
    	$count = count($data);
    }

    //refuse withdraw
    function refuseWithDraw($id, $reason)
    {
    	$this->db->where('id',$id)->update('withdrawcash',array('status'=>2,'refuse_reason'=>$reason));
    	return ERROR_OK;
    }

    //accept withdraw
    function acceptWithDraw($id)
    {
    	$this->db->where('id',$id)->update('withdrawcash',array('status'=>0));
    	return ERROR_OK;
    }

    //get user withdraw records
    function getUserWithDrawList($userId,&$data)
    {
    	$data = $this->db->from('withdrawcash')->where('user_id',$userId)->get()->result_array();
    }

}