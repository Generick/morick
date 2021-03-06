<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-16
 * Time: 上午11:06
 */
class WxPay extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->library("Wxpay");
        $this->load->model("m_recharge");
    }

    function notify()
    {
        log_message("error", "wx pay notify......");
        $orderId = "";
        $transaction_id = "";
        $openid = "";
        $split = "A";
        $postData = (array)simplexml_load_string(file_get_contents('php://input', 'r'), null, LIBXML_NOCDATA);
        if ($this->wxpay->verifyNotify($orderId, $transaction_id, $openid, $postData))
        {
            $this->log->write_log('error',  "WX pay success....");
            $orderHeaderStr = substr($orderId,0,2);

            //修改订单状态
            if (strpos($orderId, $split) === false)
            {
                if($orderHeaderStr == "cz")
                {
                    $retCode = $this->m_recharge->rechargeSuccess($orderId);
                    if($retCode == ERROR_OK)
                    {
                        log_message('error', "recharge successfully. rechargeId: " . $orderId);
                    }
                    else
                    {
                        log_message('error', "recharge failed!!! rechargeId: " . $orderId);
                    }
                }
            }
            else
            {
                // 有逗号，多个订单
                $orderIdArray = explode($split, $orderId);
                foreach($orderIdArray as $k => $v)
                {
                    $v = trim($v);
                    if ($v != '' &&  $orderHeaderStr == "cz")
                    {
                        $retCode = $this->m_recharge->rechargeSuccess($v);
                        if($retCode == ERROR_OK)
                        {
                            log_message('error', "recharge successfully. rechargeId: " . $v);
                        }
                        else
                        {
                            log_message('error', "recharge failed!!! rechargeId: " . $v);
                        }
                    }
                }
            }
        }
        else
        {
            $this->log->write_log('error',  "WX pay fail....");
        }
    }
}
