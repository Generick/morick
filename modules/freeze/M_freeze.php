<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-19
 * Time: 下午8:22
 */
class M_freeze extends My_Model
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_user");
        $this->load->model("m_transaction");
    }

    /**
     * 新增冻结
     * @param $freezeType
     * @param $userId
     * @param $freezeId
     * @param $freezePrice
     * @return mixed
     */
    function addFreeze($freezeType, $userId, $freezeId, $freezePrice)
    {
        switch($freezeType)
        {
            case FREEZE_AUCTION:
                if($this->m_common->get_one("freeze", array("freezeType" => FREEZE_AUCTION, "userId" => $userId, "freezeId" => $freezeId)))
                {
                   return ERROR_OK;
                }
                break;
            default:
                return ERROR_FREEZE_TYPE;
                break;
        }

        //判断余额是否足够
        $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $userId);
        if($userObj->balance < $freezePrice)
        {
            return ERROR_BALANCE_NOT_ENOUGH;
        }

        if(!$this->m_common->insert("freeze", array("freezeType" => $freezeType, "userId" => $userId, "freezeId" => $freezeId, "freezePrice" => $freezePrice, "freezeTime" => now())))
        {
            return ERROR_ADD_FREEZE_FAILED;
        }

        //冻结金额变更
        $userObj->modInfoWithPrivilege(array("frozen" => ($userObj->frozen + $freezePrice)));

        //新增交易明细
        $retCode = $this->m_transaction->addTransaction($userId, TRANSACTION_MARGIN, $freezePrice);
        return $retCode;
    }

    /**
     * 解冻
     * @param $freezeType
     * @param $freezeId
     * @param $auctionItem
     */
    function unfreeze($freezeType, $freezeId, $auctionItem)
    {
        $this->db->select("*")->from("freeze");
        $this->db->where(array("freezeType" => $freezeType, "freezeId" => $freezeId, "isReturn" => 0));
        $unFreezeList = $this->db->get()->result_array();
        foreach($unFreezeList as $one)
        {
            //冻结金额变更
            $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $one["userId"]);
            $frozen = (($userObj->frozen - $one["freezePrice"]) > 0) ? ($userObj->frozen - $one["freezePrice"]) : 0;
            $userObj->modInfoWithPrivilege(array("frozen" => $frozen));

            //新增交易明细
            $this->load->model("m_transaction");
            $freezePrice = $one["freezePrice"];
            if($one["userId"] == $auctionItem->currentUser && ($one["freezePrice"] - $auctionItem->currentPrice) > 0)
            {
                //判断是否需要退差额  当保证金【冻结金额】大于最终竞拍价 则退还差额
                $freezePrice = $one["freezePrice"] - $auctionItem->currentPrice;
            }
            $this->m_transaction->addTransaction($one["userId"], TRANSACTION_RETURN_MARGIN, $freezePrice);

            //冻结状态修改
            $this->m_common->update("freeze", array("isReturn" => 1), array("id" => $one["id"]));
        }

        return ERROR_OK;
    }

    /**
     * 获取是否冻结
     * @param $userId
     * @param $freezeType
     * @param $freezeId
     * @param $isFreeze
     * @return mixed
     */
    function isFreeze($userId, $freezeType, $freezeId, &$isFreeze)
    {
        if($this->m_common->get_one("freeze", array("freezeType" => $freezeType, "userId" => $userId, "freezeId" => $freezeId)))
        {
            $isFreeze = true;
        }
        return ERROR_OK;
    }
}