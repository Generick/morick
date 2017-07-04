<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-10
 * Time: 下午4:56
 */
class M_transaction extends My_Model
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_user");
    }

    /**
     * 获取交易明细
     * @param $startIndex
     * @param $num
     * @param array $whereArr
     * @param $transactionList
     * @param $count
     * @return mixed
     */
    function getTransactionList($startIndex, $num, $whereArr = array(), &$transactionList, &$count)
    {
        $this->db->start_cache();
        if(isset($whereArr["transactionType >= "]))
        {
            $this->db->select("transaction.*,user.name as username, user.telephone, admin.name")->from("transaction");
            $this->db->join("user", "user.userId = transaction.userId");
            $this->db->join("admin", "admin.userId = transaction.adminId");
        }
        else
        {
            $this->db->select("*")->from("transaction");
        }

        if(!empty($whereArr))
        {
            $this->db->where($whereArr);
        }
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        $this->db->order_by("transactionTime desc");
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $transactionList = $this->db->get()->result_array();
        $this->db->flush_cache();
        return ERROR_OK;
    }

    /**
     * 新增交易明细
     * @param $transactionData
     * @return mixed
     */
    function addTransaction($userId, $transactionType, $money, $adminId = 0)
    {
        $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $userId);
        if(empty($userObj))
        {
            return ERROR_USER_NOT_FOUND;
        }

        $afterBalance = 0;
        switch($transactionType)
        {
            //增加
            case TRANSACTION_RECHARGE:
            case TRANSACTION_RETURN_MARGIN:
            case TRANSACTION_SYSTEM_ADD:
            case TRANSACTION_REFUSE_WITHDRAW:
            case TRANSACTION_QUIZ_TICKETS_RETURN:
            case TRANSACTION_AWARD:
                $afterBalance = $userObj->balance + $money;
                break;
            //减少
            case TRANSACTION_MARGIN:
            case TRANSACTION_WITHDRAWAL:
            case TRANSACTION_SERVICE:
            case TRANSACTION_PAY:
            case TRANSACTION_SYSTEM_REDUCE:
            case TRANSACTION_QUIZ_TICKETS:
            //case TRANSACTION_COMMODITY:
                if($userObj->balance < $money)
                {
                    return ERROR_BALANCE_NOT_ENOUGH;
                }
                $afterBalance = $userObj->balance - $money;
                break;
            case TRANSACTION_COMMODITY:
                //user contact kefu and pay, so the balance isn't changed
                $afterBalance = $userObj->balance;
                break;
            default:
                log_message("error", "addTransaction type error. the type:" . $transactionType);
                break;
        }
        log_message("error", "user:" .$userId. "balance change. the transactionType:" . $transactionType ."before:" . $userObj->balance . " after:" . $afterBalance);
        $userObj->modInfoWithPrivilege(array("balance" => $afterBalance));

        $transactionData = array(
            "adminId" => $adminId,
            "userId" => $userId,
            "transactionType" => $transactionType,
            "money" => $money,
            "afterBalance" => $afterBalance,
            "transactionTime" => now()
        );
        if($this->m_common->insert("transaction", $transactionData))
        {
            return ERROR_OK;
        }
        return ERROR_SYSTEM;
    }
}