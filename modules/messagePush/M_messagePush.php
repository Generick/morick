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
    function createMessage($pushType, $title, $content, $type, $href_id = 0,$userId = 0)
    {
    	$data = array('msg_title'=>$title,'msg_content'=>$content,'msg_type'=>$type,'create_time'=>time(),'href_id'=>$href_id,'pushType'=>$pushType,'userId'=>$userId);
    	$this->db->insert('message',$data);
    	return $this->db->insert_id();
    }

    //admin push message
    function pushMessage($pushType, $msg_title, $msg_content)
    {
    	//create message
    	$type = 0;
    	$msg_id = $this->createMessage($pushType, $msg_title, $msg_content,$type);

    	// $userIds = $this->db->select('userId')->from('user')->where($whr)->get()->result_array();

    	// foreach ($userIds as $v) {
    	// 	$this->createUM($v['userId'], $msg_id);
    	// }

    	return ERROR_OK;
    }

    //create user-msg relationship
    function createUM($user_id, $msg_id)
    {
    	$data = array('user_id'=>$user_id,'msg_id'=>$msg_id,'status'=>1);
    	$this->db->insert('usermsg',$data);
    }

    //get user msg list
    function getUserMsgList($startIndex, $num, $userId, &$data, &$count)
    {
    	// $data = $this->db->from('usermsg')->where('user_id',$userId)->join('message','usermsg.msg_id = message.msg_id')->order_by('status desc,create_time desc')->limit($num,$startIndex)->get()->result_array();
    	// $count = $this->db->from('usermsg')->where('user_id',$userId)->count_all_results();

    	// return ERROR_OK;
        $isVIP = $this->db->select('isVIP')->from('user')->where('userId',$userId)->get()->row_array();
        if ($isVIP['isVIP'] = 1) {
             $whr = array('pushType !='=>0,'userId'=>0);
         } else{
            $whr = array('pushType !='=>1,'userId'=>0);
         }

         $data = $this->db->from('message')->where($whr)->or_where('user_id',$userId)->order_by('create_time desc')->limit($num,$startIndex)->get()->result_array();
         $user_msg = $this->db->select('msg_id')->from('readlogs')->where('user_id',$userId)->get()->result_array();
         $readMsg = $unreadMsg = array();
         foreach ($data as $v) {
             if (in_array($v['msg_id'],$user_msg)) {
                 $v['isRead'] = 1;
                 $readMsg[] = $v;
             }else{
                $v['isRead'] = 0;
                $unreadMsg[] = $v;
             }
         }
         $data = array_merge($unreadMsg,$readMsg);
    }

    //get three unread messages
    function getThreeMsg($userId, &$data)
    {
    	$data = $this->db->from('usermsg')->where(array('user_id'=>$userId,'status'=>1))->join('message','usermsg.msg_id = message.msg_id')->order_by('create_time desc')->limit(3)->get()->result_array();
    	return ERROR_OK;
    }

    //user view message
    function viewMsg($userId, $msg_id, $msg_type, $href_id, &$data)
    {
    	$this->db->where(array('user_id'=>$userId,'msg_id'=>$msg_id))->update('usermsg',array('status'=>0));
    	if ($msg_type == 0) {
    		$data = $this->db->select('msg_title,msg_content')->from('message')->where('msg_id',$msg_id)->get()->row_array();
    	}else{
    		$data = array('userId'=>$userId,'msg_type'=>$msg_type,'href_id'=>$href_id);
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

    	$msg_id = $this->createMessage($msg_title, $msg_content, $msg_type, $href_id);
    	$this->createUM($userId, $msg_id);
    }

}