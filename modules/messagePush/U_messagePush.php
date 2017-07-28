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
        $unReadNum;

    	$isVIP = $this->db->select('isVIP')->from('user')->where('userId', $userId)->get()->row_array();//$isVIP['isVIP']
    	
        if ($isVIP['isVIP'] == 1) 
        {
             $whr = array('push_type !='=>0,'user_id'=> 0);
         }else{
             $whr = array('push_type !='=>1,'user_id'=> 0);
         }

    	$this->m_messagePush->getUserMsgList($startIndex, $num, $userId, $data, $count, $whr);
        $msg = array();
        $or_whr = array('user_id' => $userId, 'push_type' => 2);
        $this->m_messagePush->getUnReadMSG(0,1,$whr,$or_whr,$msg,$unReadNum);
    	$this->responseSuccess(array('data' => $data, 'count' => $count, 'unReadNum' => $unReadNum));
    }

    //获取用户未批阅的消息
    function getUnReadMSG()
    {
        if (!$this->checkParam(array('userId', 'startIndex', 'num'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $userId = $this->input->post('userId');
        $startIndex = $this->input->post('startIndex');
        $num = $this->input->post('num');

        $whr = array();
        $or_whr = array('user_id' => $userId);
        $or_whr['push_type'] = 2;
        $whr['user_id'] = 0;
        $push_type = 0;
        $isVIP = $this->db->select('isVIP')->where('userId', $userId)->get('user')->row_array();
        if ($isVIP['isVIP'] == 1) $push_type = 1;
        $whr['push_type'] = $push_type;
        $data = array();
        $count = 0;
        $this->m_messagePush->getUnReadMSG($startIndex, $num, $whr, $or_whr, $data, $count);
        $this->responseSuccess(array('msgList' => $data, 'count' => $count));
    }

    //获取已批阅消息
    function getHasReadMSG()
    {
        if (!$this->checkParam(array('userId', 'startIndex', 'num'))) 
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $userId = $this->input->post('userId');
        $startIndex = $this->input->post('startIndex');
        $num = $this->input->post('num');

        $whr = array('usermsglog.user_id' => $userId);

        $data = array();
        $count = 0;
        $this->m_messagePush->getHasReadMSG($startIndex, $num, $whr, $data, $count);
        $this->responseSuccess(array('msgList' => $data, 'count' => $count));
    }


    //用户查看消息
    function viewMsg()
    {
    	if (!$this->checkParam(array('userId', 'msg_id'))) 
        {
    		$this->responseError(ERROR_PARAM);
    		return;
    	}
    	$msg_id = $this->input->post('msg_id');
    	$userId = $this->input->post('userId');
        
    	$res = $this->m_messagePush->viewMsg($userId, $msg_id);
    	$this->responseSuccess($res);
    }

}