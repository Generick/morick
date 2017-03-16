<?php 

session_start();
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
require_once 'log.php';

$orderId = $_SESSION["rechargeId"];
$cost = $_SESSION["price"];
//$cost = 1;

//初始化日志
$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);

//打印输出数组信息
function printf_info($data)
{
    foreach($data as $key=>$value){
        echo "<font color='#00ff55;'>$key</font> : $value <br/>";
    }
}
//①、获取用户openid
$tools = new JsApiPay();
$openId = $tools->GetOpenid();


//②、统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody("雅玩之家");
$input->SetAttach("雅玩之家订单");
$input->SetOut_trade_no($orderId);
$input->SetTotal_fee($cost);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag("雅玩之家");
$input->SetNotify_url("http://meeno.f3322.net:8082/auction/index.php/wx/WxCallback/notify");
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openId);
$order = WxPayApi::unifiedOrder($input);
$jsApiParameters = $tools->GetJsApiParameters($order);

?>
<!---->
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/> 
    <title>微信支付</title>
    <script type="text/javascript" src="../../js/config.js" ></script>
    <script src="../../plugin/layerMobile/layer.js"></script>
    <script src="../../module/dialog/dialog.js"></script>
    <script type="text/javascript">
	//调用微信JS api 支付
	function jsApiCall()
	{  
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			<?php echo $jsApiParameters; ?>,
			function(res){
				WeixinJSBridge.log(res.err_msg);
				if(res.err_msg == "get_brand_wcpay_request:ok")
				{
                    
				    location.href = pageUrl.MY_ACCOUNT;
		
				}
				else
				{
					
					$dialog.msg("支付失败");

				}
			}
		);
	}
    
	function callpay()
	{
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    jsApiCall();
		}
	}
	</script>
</head>
<body>
</body>
<script>
	window.onload = function(){
		callpay();
	}
</script>

</html>