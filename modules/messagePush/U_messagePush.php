<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/9/2017
 * Time: 2:27 PM
 */

class U_messagePush extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_messagePush');
    }

    //用户获取消息
    function getUserMsgList()
    {
    	if (!$this->checkParam(array('userId', 'startIndex', 'num'))) 
    	{
    		$this->responseError(ERROR_PARAM);
    		return;
    	}

    	$userId = $this->input->post('userId');
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$data = array();
    	$count = 0;

    	$isVIP = $this->db->select('isVIP')->from('user')->where('userId', $userId)->get()->row_array();//$isVIP['isVIP']
    	
        if ($isVIP['isVIP'] == 1) 
        {
             $whr = array('push_type !='=>0,'user_id'=> 0);
         }else{
             $whr = array('push_type !='=>1,'user_id'=> 0);
         }

    	$this->m_messagePush->getUserMsgList($startIndex, $num, $userId, $data, $count, $whr);
    	$this->responseSuccess(array('data' => $data, 'count' => $count));
    }


    //用户查看消息
    function viewMsg()
    {
    	if (!$this->checkParam(array('userId', 'msg_id', 'msg_type', 'href_id'))) {
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$msg_type = $this->input->post('msg_type');
    	$msg_id = $this->input->post('msg_id');
    	$href_id = $this->input->post('href_id');
    	$userId = $this->input->post('userId');
    	$data = null;
    	$this->m_messagePush->viewMsg($userId, $msg_id, $msg_type, $href_id, $data);
    	$this->responseSuccess($data);
    }

}