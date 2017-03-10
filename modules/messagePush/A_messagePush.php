<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 3/9/2017
 * Time: 12:00 PM
 */

class A_messagePush extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('m_messagePush');
    }

    function pushMessage()
    {
        //$whr = array();
        //$userIds = $this->db->select('userId,isVIP')->from('user')->where($whr)->get()->result_array();
        //var_dump($userIds);die;
        if (!$this->checkParam(array('pushType')))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $pushType = intval($this->input->post('pushType'));
        $msg_title = $this->input->post('msg_title');
        $msg_content = $this->input->post('msg_content');
        $userId = $this->input->post('userId');
        //$phoneNum = $this->input->post('phoneNum');

        // switch ($pushType) {
        //     //push all
        //     case 2:
        //         $whr = array();
        //         break;
        //     //push vip
        //     case 1:
        //         $whr = array('isVIP'=>1);
        //         break;
        //     //push not vip
        //     case 0:
        //         $whr = array('isVIP'=>0);
            
        //     default:
        //         $this->sendMsg($phoneNum,$msg_content);
        //         return;
        //         break;
        // }

        $res = $this->m_messagePush->pushMessage($pushType, $msg_title, $msg_content, $userId);
        $this->responseSuccess($res);
    }


}