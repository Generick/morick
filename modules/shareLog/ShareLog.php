<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-26
 * Time: 下午7:58
 */
class ShareLog extends My_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    /**
     * 分享具体对象
     */
    function shareWithType()
    {
        if(!$this->checkParam(array("shareType", "shareId", "sharePlatform")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $shareType = intval($this->input->post("shareType"));
        $shareId = intval($this->input->post("shareId"));
        $sharePlatform = intval($this->input->post("sharePlatform"));

        //判断用户是否登录 没登录则无需插入记录  等待用户账号完成后再调整
        $this->load->model("m_account");
        $userId = intval($this->m_account->getSessionData("userId"));
        $needCallBack = true;
        if($userId != 0)
        {
            $shareData = array(
                "userId" => $userId,
                "shareType" => $shareType,
                "shareId" => $shareId,
                "sharePlatform" => $sharePlatform,
                "shareTime" => now()
            );
            if(!$this->m_common->insert("shareLog", $shareData))
            {
                $needCallBack = false;
            }
        }

        if($needCallBack)
        {
            //执行回调
            if(defined('SHARE_CALL_BACK_FNS'))
            {
                $readCallBackFns = unserialize(SHARE_CALL_BACK_FNS);
                if(array_key_exists($shareType, $readCallBackFns))
                {
                    $modelName = $readCallBackFns[$shareType][0];
                    $fnsName = $readCallBackFns[$shareType][1];

                    $this->load->model($modelName);
                    $this->$modelName->$fnsName($shareId);
                }
            }
        }

        $this->responseError(ERROR_OK);
        return;
    }
}