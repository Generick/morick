<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-26
 * Time: 下午7:58
 */
class ReadLog extends My_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    /**
     * 阅读具体对象
     */
    function readWithType()
    {
        if(!$this->checkParam(array("readType", "readId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $readType = intval($this->input->post("readType"));
        $readId = intval($this->input->post("readId"));

        //判断用户是否登录 没登录则无需插入记录 等待用户账号完成后再调整
        $this->load->model("m_account");
        $userId = intval($this->m_account->getSessionData("userId"));
        $needCallBack = true;
        if($userId != 0)
        {
            $readData = array(
                "userId" => $userId,
                "readType" => $readType,
                "readId" => $readId,
                "readTime" => now()
            );

            if(!$this->m_common->insert("readLog", $readData))
            {
                $needCallBack = false;
            }
        }

        if($needCallBack)
        {
            //执行回调
            if(defined('READ_CALL_BACK_FNS'))
            {
                $readCallBackFns = unserialize(READ_CALL_BACK_FNS);
                if(array_key_exists($readType, $readCallBackFns))
                {
                    $modelName = $readCallBackFns[$readType][0];
                    $fnsName = $readCallBackFns[$readType][1];

                    $this->load->model($modelName);
                    $this->$modelName->$fnsName($readId);
                }
            }
        }

        $this->responseError(ERROR_OK);
        return;
    }
}