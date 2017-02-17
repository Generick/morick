<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-9
 * Time: 下午5:18
 */
class U_readLog extends User_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_readLog");
    }

    /**
     * 获取阅读列表
     */
    function getReadObjList()
    {
        if(!$this->checkParam(array("readType", "startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }
        $readType = intval($this->input->post("readType"));
        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));
        $this->load->model("m_account");
        $userId = intval($this->m_account->getSessionData("userId"));

        $readList = array();
        $count = 0;

        //单个用户的竞拍记录
        $whereNotArr = array();
        $auctionItemArr = $this->db->select("auctionItemId")->from("biddingLogs")->where(array("userId" => $userId))->group_by("auctionItemId")->get()->result_array();
        foreach($auctionItemArr as $oneItem)
        {
            $whereNotArr[] = $oneItem["auctionItemId"];
        }

        $whereArr = array("userId" => $userId, "readType" => $readType);
        $this->m_readLog->getReadObjList($startIndex, $num, $whereArr, $whereNotArr, $readList, $count);

        $readObjList = array();
        foreach($readList as $one)
        {
            if(defined('READ_OBJ_ARR'))
            {
                $readObjArr = unserialize(READ_OBJ_ARR);
                if(array_key_exists($readType, $readObjArr))
                {
                    $modelName = $readObjArr[$readType][0];
                    $fnsName = $readObjArr[$readType][1];

                    $this->load->model($modelName);
                    $readObjList[] = $this->$modelName->$fnsName($one["readId"]);
                }
            }
        }

        $this->responseSuccess(array("readObjList" => $readObjList, "count" => $count));
        return;
    }
}