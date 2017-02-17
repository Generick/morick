<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-26
 * Time: 下午8:57
 */
class CollectionLog extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_collectionLog");
    }

    function collectionOrCancel()
    {
        if(!$this->checkParam(array("collectionType", "collectionId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $collectionType = intval($this->input->post("collectionType"));
        $collectionId = intval($this->input->post("collectionId"));

        $this->load->model("m_account");
        $userId = intval($this->m_account->getSessionData("userId"));

        $callBackStatus = CALL_BACK_STATUS_NONE;//0表示不回调  1表示收藏回调 2表示取消收藏回调
        if($this->m_common->get_one("collectionLog", array("userId" => $userId, "collectionType" => $collectionType, "collectionId" => $collectionId)))
        {
            //有记录 说明操作为取消收藏
            if($this->m_common->delete("collectionLog", array("userId" => $userId, "collectionType" => $collectionType, "collectionId" => $collectionId)) >= 1)
            {
                //删除成功
                //执行回调
                $callBackStatus = CALL_BACK_STATUS_REDUCE;
            }
        }
        else
        {
            //收藏操作
            if($this->m_common->insert("collectionLog", array("userId" => $userId, "collectionType" => $collectionType, "collectionId" => $collectionId, "collectionTime" => now())))
            {
                //插入成功、
                //执行回调
                $callBackStatus = CALL_BACK_STATUS_ADD;
            }
        }

        if(defined('COLLECTION_CALL_BACK_FNS'))
        {
            $collectionCallBackFns = unserialize(COLLECTION_CALL_BACK_FNS);
            if(array_key_exists($collectionType, $collectionCallBackFns))
            {
                $modelName = $collectionCallBackFns[$collectionType][0];
                $fnsName = $collectionCallBackFns[$collectionType][1];

                $this->load->model($modelName);
                $this->$modelName->$fnsName($collectionId, $callBackStatus);
            }
        }
        $this->responseError(ERROR_OK);
        return;
    }
}
