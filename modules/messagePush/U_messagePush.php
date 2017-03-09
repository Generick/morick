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

    //user get message
    function getUserMsgList()
    {
    	$userId = $this->input->post('userId');
    	$startIndex = $this->input->post('startIndex');
    	$num = $this->input->post('num');
    	$data = $count = null;
    	$this->m_messagePush->getUserMsgList($startIndex, $num, $userId, $data, $count);
    	$this->responseSuccess(array('data'=>$data,'count'=>$count));
    }

    //get three unread message
    function getThreeMsg()
    {
    	$userId = $this->input->post('userId');
    	$data = null;
    	$this->m_messagePush->getThreeMsg($userId, $data);
    	$this->responseSuccess($data);
    }

    //user view message
    function viewMsg()
    {
    	$msg_type = $this->input->post('msg_type');
    	$msg_id = $this->input->post('msg_id');
    	$href_id = $this->input->post('href_id');
    	$userId = $this->input->post('userId');
    	$data = null;
    	$this->m_messagePush->viewMsg($userId, $msg_id, $msg_type, $href_id, $data);
    	$this->responseSuccess($data);
    }

}