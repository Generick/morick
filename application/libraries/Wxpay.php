<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 15-4-25
 * Time: 下午12:56
 */

ini_set('date.timezone','Asia/Shanghai');
error_reporting(E_ERROR);
require_once APPPATH ."libraries/wxpay/lib/WxPay.Api.php";
require_once APPPATH ."libraries/wxpay/lib/WxPay.Notify.php";
//require_once APPPATH ."libraries/wxpay/lib/WxPay.JsApiPay.php";
class Wxpay extends WxPayNotify{

    function __construct()
    {
        $this->object = &get_instance();
    }

    /**
     * 验证来自微信的支付结果通知
     * @return bool
     */
    function verifyNotify(&$orderId, &$transaction_id, &$openid, $postData)
    {
        $return_code = $postData['return_code'];
        if($return_code == "SUCCESS")
        {
            log_message("error", "wx pay return success.");
            $orderId = $postData['out_trade_no'];
            $transaction_id = $postData['transaction_id'];
            $openid = $postData['openid'];
            return true;
        }
        else
        {
            log_message("error", "wx pay failed. return false :" . $postData['return_msg']);
            return false;
        }
    }

    /**
     *  获取预支付信息
     */
    public function getPrepayInfo($orderId, $realPrice)
    {
        //error_reporting(E_ALL);
        //①、获取用户openid
        //②、统一下单
        $input = new WxPayUnifiedOrder();
        $input->SetBody("雅玩之家充值");
        $input->SetOut_trade_no($orderId);
        $input->SetTotal_fee($realPrice);
        $input->SetNotify_url(WxPayConfig::PROJECT_ADDRESS);
        $input->SetFee_type("CNY");
        $input->SetTrade_type("JSAPI");
        $order = WxPayApi::unifiedOrder($input);
        log_message("error", "getPrepayInfo :" . print_r($order,true));

        $prepayInfo = array();
        if(array_key_exists("appid", $order))
        {
            $prepayInfo['appId'] = $order['appid'];
            $prepayInfo['mch_id'] = $order['mch_id'];
            $prepayInfo['nonce_str'] = $order['nonce_str'];
            $prepayInfo['prepay_id'] = $order['prepay_id'];
            $prepayInfo['sign'] = $order['sign'];
            $prepayInfo["timestamp"] = time();
        }
        log_message('error',"$$$$$$$$$$$$$$$$$$$$$$$$$$$".json_encode($prepayInfo));
        return json_encode($prepayInfo);
        
    }

    //微信支付商品
    function WXPrePayInfo($orderId, $price, $name = '')
    {
        $input = new WxPayUnifiedOrder();
        $input->SetBody("雅玩之家-".$name);
        $input->SetOut_trade_no($orderId);
        $input->SetTotal_fee($realPrice);
        $input->SetNotify_url(WxPayConfig::PROJECT_ADDRESS);
        $input->SetFee_type("CNY");
        $input->SetTrade_type("JSAPI");
        $input->SetOpenid($this->getOpenId());
        $order = WxPayApi::unifiedOrder($input);
        log_message("error", "getPrepayInfo :" . print_r($order,true));

        $prepayInfo = array();
        if(array_key_exists("appid", $order))
        {
            $prepayInfo['appId'] = $order['appid'];
            $prepayInfo['mch_id'] = $order['mch_id'];
            $prepayInfo['nonce_str'] = $order['nonce_str'];
            $prepayInfo['prepay_id'] = $order['prepay_id'];
            $prepayInfo['sign'] = $order['sign'];
            $prepayInfo["timestamp"] = time();
        }
        log_message('error',"$$$$$$$$$$$$$$$$$$$$$$$$$$$".json_encode($prepayInfo));
        return json_encode($prepayInfo);
    }

    //获取openid
    function getOpenId()
    {
        $jsapi = new JsApiPay();
        return $jsapi->GetOpenid();
    }

}
