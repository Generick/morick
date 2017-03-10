<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/9/2017
 * Time: 12:02 PM
 */

class M_messagePush extends My_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    //create message
    //msg_type value:
    //0: sys msg
    //1: quiz award
    //2: auction obtain
    //3: order deliver status
    function createMessage($pushType, $title, $content, $msg_type, $userId = 0, $href_id = 0)
    {
    	$data = array(
    		'msg_title'=>$title,
    		'msg_content'=>$content,
    		'msg_type'=>$msg_type,
    		'create_time'=>time(),
    		'href_id'=>$href_id,
    		'push_type'=>$pushType,
    		'user_id'=>$userId);
    	$this->db->insert('message',$data);
    	return $this->db->insert_id();
    }

    //admin push message
    // push_type value:
    // 0: not vip 
    // 1: vip 
    // 2: all 
    // 3: single user
    function pushMessage($pushType, $msg_title, $msg_content, $phoneNum)
    {
    	//create message
    	
    	//0 means system msg
    	$msg_type = 0;
    	if (!empty($phoneNum) && $pushType == 3) {
    		$userId = $this->getUserIdByPhone($phoneNum);
    		if ($userId == 0) {
    			return USER_NOT_FOUND;
    		}
    		$msg_id = $this->createMessage($pushType, $msg_title, $msg_content,$msg_type, $userId);
    	}else{
    		$msg_id = $this->createMessage($pushType, $msg_title, $msg_content,$msg_type);
    	}

    	return ERROR_OK;
    }

    //get user id by phone number
    function getUserIdByPhone($phoneNum)
    {
    	$userId = $this->select('userId')->from('user')->where('telephone',$phoneNum)->get()->row_array();
    	if (is_array($userId)) {
    		return $userId['userId'];
    	}else{
    		return 0;
    	}
    }

    //create user-msg read log
    function createReadLog($user_id, $msg_id)
    {
    	$data = array('user_id'=>$user_id,'msg_id'=>$msg_id);
    	$this->db->insert('usermsglog',$data);
    }

    //get user msg list
    
    function getUserMsgList($startIndex, $num, $userId, &$data, &$count)
    {
        $isVIP = $this->db->select('isVIP')->from('user')->where('userId',$userId)->get()->row_array();
        if ($isVIP['isVIP'] == 1) {
             $whr = array('push_type !='=>0,'user_id'=>0);
         }else{
             $whr = array('push_type !='=>1,'user_id'=>0);
         }

         $data = $this->db->from('message')->where($whr)->or_where('user_id',$userId)->order_by('create_time desc')->limit($num,$startIndex)->get()->result_array();
         $user_msg = $this->db->select('msg_id')->from('usermsglog')->where('user_id',$userId)->get()->result_array();
         $readMsg = $unreadMsg = $hasRead = array();
         foreach ($user_msg as $v) {
         	$hasRead[] = $v['msg_id'];
         }
         
         //handle msg unread or read
         foreach ($data as $v) {
         	if (is_array($user_msg)) {
         		if (in_array($v['msg_id'],$hasRead)) {
	                 $v['isRead'] = 1;
	                 $readMsg[] = $v;
	             }else{
	                $v['isRead'] = 0;
	                $unreadMsg[] = $v;
	             }
         	}else{
         		$v['isRead'] = 0;
	            $unreadMsg[] = $v;
         	}
             
         }
         $data = array_merge($unreadMsg,$readMsg);
         $count = count($data);
         return ERROR_OK;
    }


    //user view message
    function viewMsg($userId, $msg_id, $msg_type, $href_id, &$data)
    {
    	if ($msg_type == 0) {
    		$data = $this->db->select('msg_title,msg_content')->from('message')->where('msg_id',$msg_id)->get()->row_array();
    	}else{
    		$data = array('userId'=>$userId,'msg_type'=>$msg_type,'href_id'=>$href_id);
    		$this->createReadLog($userId,$msg_id);
    	}

    	
    }

    //create user message
    function createUserMsg($userId,$msg_type,$href_id)
    {
    	switch ($msg_type) {
    		case 1:
    			$msg_content = MP_QUIZAWARD;
    			$msg_title = MP_QUIZAWARD_TITLE;
    			break;
    		case 2:
    			$msg_content = MP_AUCTIONOBTAIN;
    			$msg_title = MP_AUCTIONOBTAIN_TITLE;
    			break;
    		case 3:
    			$msg_content = MP_ORDERSTATUS;
    			$msg_title = MP_ORDERSTATUS_TITLE;
    			break;
    		default:
    			# code...
    			break;
    	}

    	$msg_id = $this->createMessage(3,$msg_title, $msg_content, $msg_type, $user_id, $href_id);
    }

}