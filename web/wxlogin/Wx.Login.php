<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 16-12-12
 * Time: 下午5:39
 */
	session_start();
	
	include_once("Wx.Config.php");
	include_once("Wx.Common.php");
	
	$currentUrl = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . "&hasMakeCode=1";
	
	$rechargeId = $_GET["rechargeId"];
	$price = $_GET["price"];
	
	$common = new Common();
	
	if(!isset($_GET["hasMakeCode"]))
	{
	    $common->getCode($currentUrl);
	}
	else
	{
	    $code = $_REQUEST["code"];
	    $api_get_openId = $common->format(API_GET_OPEN_ID,$code);
	    $output =  $common->httpRequest($api_get_openId);
	    $ret = json_decode($output,true);
	    if(isset($ret["errcode"]))
	    {
	        $common->getCode($currentUrl);
	    }
	    else
	    {
	        $access_token = $ret["access_token"];
			
	        $_SESSION["accessToken"] = $access_token;
			
			$_SESSION["rechargeId"] = $rechargeId;
			$_SESSION["price"] = $price;
			
	        $openid = $ret["openid"];
			
			header("Location:".URL_WX_PAY);
//			var_dump(111);
			
//	        $api_get_user = $common->format(API_GET_USER_INFO,$access_token,$openid);
//	        $userInfo = $common->httpRequest($api_get_user);
	    }
	}
	
	
?>
<!DOCTYPE html>
<html ng-app="app">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <meta name="format-detection" content="email=no" />
    <meta name="format-detection" content="telephone=no" />
    <title></title>
    <link rel="stylesheet" href="../assets/css/ui.base.css" />
    <link rel="stylesheet" href="../assets/css/ui.phone.bind.css" />
</head>
<body ng-controller="ctrl">

</body>
</html>





