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
        if (!$this->checkParam(array('pushType')))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $pushType = intval($this->input->post('pushType'));
        $msg_title = $this->input->post('msg_title');
        $msg_content = $this->input->post('msg_content');
        $phoneNum = $this->input->post('phoneNum');

        $res = $this->m_messagePush->pushMessage($pushType, $msg_title, $msg_content, $phoneNum);
        if ($res != ERROR_OK) {
            $this->responseError($res);
        }
        $this->responseSuccess($res);
    }


}