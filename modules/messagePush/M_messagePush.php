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

    //创建消息
    //msg_type value:
    //0: sys msg
    //1: quiz award
    //2: auction obtain
    //3: order deliver status
    function createMessage($pushType, $title, $content, $msg_type, $userId = 0, $href_id = 0)
    {
    	$data = array(
    		'msg_title' => $title,
    		'msg_content' => $content,
    		'msg_type' => $msg_type,
    		'create_time' => time(),
    		'href_id' => $href_id,
    		'push_type' => $pushType,
    		'user_id' => $userId);
    	$this->db->insert('message', $data);
    	return $this->db->insert_id();
    }

    //后台推送消息
    // push_type value:
    // 0: not vip 
    // 1: vip 
    // 2: all 
    // 3: single user
    function pushMessage($pushType, $msg_title, $msg_content, $phoneNum)
    {    	
    	//0 系统消息
    	$msg_type = MP_MSG_TYPE_SYS;
    	$userId = 0;
    	if (!empty($phoneNum) && $pushType == MP_PUSH_TYPE_SINGLE) 
    	{
    		$userId = $this->getUserIdByPhone($phoneNum);
    		if ($userId == 0) {
    			return ERROR_USER_NOT_FOUND;
    		}
    	}

    	$msg_id = $this->createMessage($pushType, $msg_title, $msg_content, $msg_type, $userId);

    	return ERROR_OK;
    }

    function getUserIdByPhone($phoneNum)
    {
    	$userId = $this->db->select('userId')->from('user')->where('telephone', $phoneNum)->get()->row_array();
    	if (is_array($userId)) 
    	{
    		return $userId['userId'];
    	}else{
    		return 0;
    	}
    }

    //创建消息记录
    function createReadLog($user_id, $msg_id)
    {
    	$isRead = $this->db->from('usermsglog')->where(array('user_id' => $user_id, 'msg_id' => $msg_id))->get()->row_array();
    	if (empty($isRead)) 
    	{
    		$data = array('user_id' => $user_id,'msg_id' => $msg_id);
    		$this->db->insert('usermsglog', $data);
    	}
    	
    	return ERROR_OK;
    }

    //用户获取消息
    
    function getUserMsgList($startIndex, $num, $userId, &$data, &$count, $whr)
    {
        
         $data = $this->db->from('message')->where($whr)->or_where('user_id', $userId)->order_by('create_time desc')->limit($num, $startIndex)->get()->result_array();
         //获取消息 
        $sRead = array();
         foreach ($data as $v) 
         {
         	$sRead[] = $v['msg_id'];
         }
         //获取已读 
        if(!empty($sRead))
        {
            $this->db->where_in('msg_id', $sRead);
        }
         $user_msg = $this->db->select('msg_id')->from('usermsglog')->where('user_id', $userId)->get()->result_array();
         $readMsg = $unreadMsg = $hasRead = array();
         foreach ($user_msg as $v) 
         {
         	$hasRead[] = $v['msg_id'];
         }
         
         //处理已读未读
         foreach ($data as $v) 
         {
         	if (is_array($user_msg)) 
         	{
         		if (in_array($v['msg_id'], $hasRead)) 
         		{
         			//已读
	                 $v['isRead'] = 1;
	                 $readMsg[] = $v;
	                 continue;
	             }
         	}
         	// 未读
         	$v['isRead'] = 0;
	        $unreadMsg[] = $v;
             
         } 
         $data = array_merge($unreadMsg, $readMsg);
         $count = $this->db->from('message')->where($whr)->or_where('user_id', $userId)->count_all_results();
         return ERROR_OK;
    }

    //获取用户未批阅的消息
    function getUnReadMSG($startIndex, $num, $whr, $or_whr = array(), &$data, &$count)
    {
        $hasRead = $this->db->select('msg_id')->where('user_id', $or_whr['user_id'])->get('usermsglog')->result_array();

        $this->db->start_cache();
        $this->db->from('message');
        $this->db->where($whr);
        $this->db->or_where($or_whr);
        if (!empty($hasRead)) 
        {
            $this->db->where_not_in('msg_id', array_column($hasRead, 'msg_id'));
        }
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        if ($num > 0) 
        {
            $this->db->limit($num, $startIndex);
        }
        $data = $this->db->order_by('create_time desc')->get()->result_array();
        $this->db->flush_cache();
    }

    //获取用户已批阅的消息
    function getHasReadMSG($startIndex, $num, $whr, &$data, &$count)
    {
        $this->db->start_cache();
        $this->db->from('usermsglog');
        $this->db->select('message.*');
        $this->db->where($whr);
        $this->db->join('message', 'usermsglog.msg_id = message.msg_id');
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        if ($num > 0) 
        {
            $this->db->limit($num, $startIndex);
        }
        $data = $this->db->order_by('message.create_time desc')->get()->result_array();
        $this->db->flush_cache();
    }


    //用户查看消息
    function viewMsg($userId, $msg_id)
    {
    	$this->createReadLog($userId, $msg_id);
    	return ERROR_OK;
    }

    //创建用户消息
    function createUserMsg($userId, $msg_type, $href_id)
    {
    	switch ($msg_type) 
    	{
    		case MP_MSG_TYPE_QUIZ:
    			$msg_content = MP_QUIZAWARD;
    			$msg_title = MP_QUIZAWARD_TITLE;
    			break;
    		case MP_MSG_TYPE_AUCTION:
    			$msg_content = MP_AUCTIONOBTAIN;
    			$msg_title = MP_AUCTIONOBTAIN_TITLE;
    			break;
    		case MP_MSG_TYPE_ORDER:
    			$msg_content = MP_ORDERSTATUS;
    			$msg_title = MP_ORDERSTATUS_TITLE;
    			break;
            case MP_MSG_TYPE_COMMODITY:
                $msg_content = MP_COMMODITY;
                $msg_title = MP_COMMODITY_TITLE;
                break;
            case MP_MSG_TYPE_COMMODITY_ORDER:
                $msg_content = MP_COMMODITY_STATUS;
                $msg_title = MP_COMMODITY_STATUS_TITLE;
                break;
            case MP_MSG_TYPE_RECEIVED:
                $msg_content = MP_RECEIVED;
                $msg_title = MP_RECEIVED_TITLE;
                break;
    		default:
    			# code...
    			break;
    	}

    	$msg_id = $this->createMessage(MP_PUSH_TYPE_SINGLE, $msg_title, $msg_content, $msg_type, $userId, $href_id);
    	return $msg_id;
    }

}