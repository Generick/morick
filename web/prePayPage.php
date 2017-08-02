<?php
session_start();
$openId = isset($_SESSION['openId'])?$_SESSION['openId']:'';

?>

<!DOCTYPE html>
<html ng-app="app">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="format-detection" content="telephone=no">
        <title>选择支付方式</title>
        <style>
        	form{
        		display: none;
        	}
        </style>
        <link rel="stylesheet" href="css/ui.base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="css/person_center.css" />
        <link rel="stylesheet" href="popUpModal/popUp.css" />
        <link href="plugin/layerMobile/need/layer.css">
        <link rel="stylesheet" href="css/newPersonal.css" />
	</head>
	<body ng-controller="specialctrl" style="background: #FFFFFF;">
		<!--加载动画-->
		<div class="animation">
			<img src="img/loading.gif" />
		</div>
		<div class="container" style="background: #FFFFFF;">
		    <div class="pay-special-roder-title">
		    	<span style="color:#777777;line-height: 35px;float:left;">订单金额：</span>
		    	<span style="color:#FF6600;line-height: 35px;float:right" ng-bind="'￥'+showPrice"></span>
		    	
		    </div>
		    <div style="width:100%;padding:0 3% 10px 3%;overflow: hidden;float:left;">
		    	<span style="line-height:25px;float:right;color:#FF6600">件</span>
		    	<span style="color:#FF6600;line-height: 25px;float:right;padding-left:5px;padding-right:5px" ng-bind="'x '+buyNumber"></span>
		    	<span style="color:#777777;line-height: 25px;float:right;" ng-bind="buyGoodsName"></span>
		    	<span style="color:#777777;line-height: 25px;float:left; font-size: 14px" >商品名称 :</span>
		    </div>
		    <div class="pay-special-way-title">
		    	支付方式
		    </div>
		    
		    
		    <!--<div class="every-pay-way">
		    	<div class="every-pay-way-left">
		    		<div class="every-pay-way-left-icon">
		    			<img src="img/newPic/weixinpaytype.png"/>
		    		</div>
		    		<div class="every-pay-way-left-word">
		    		   微信支付
		    		</div>
		    	</div>
		    	<div class="every-pay-way-right check-add-class" id="selfpay"  ng-click="chooseIt(0)"></div>
		    </div>
		    <div class="every-pay-way" ng-show="isShowZhiFuBao">
		    	<div class="every-pay-way-left">
		    		<div class="every-pay-way-left-icon">
		    			<img src="img/newPic/zhifubaopaytype.png"/>
		    		</div>
		    		<div class="every-pay-way-left-word">
		    		   支付宝支付
		    		</div>
		    	</div>
		    	<div class="every-pay-way-right" id="zhifubaopay"  ng-click="chooseIt(1)"></div>
		    </div>-->
		    
		    <div class="every-pay-way">
		    	<div class="every-pay-way-left">
		    		<div class="every-pay-way-left-icon">
		    			<img src="img/newPic/person-pay-icon.png"/>
		    		</div>
		    		<div class="every-pay-way-left-word">
		    			人工服务
		    		</div>
		    	</div>
		    	<div class="every-pay-way-right  check-add-class" id="peoplepay" ng-click="chooseIt(2)"></div>
		    </div>
		    <div class="bottom-pay-button" ng-click="underLinePay()">
			    下订单
			
		   </div>
		    <!--<div class="big-pre-pay-box">
		    	<div class="offline-payment">
		    	<div class="payment-way-title">
		    		线下支付
		    	</div>
		    	<div class="payment-way-word">
		    		添加微信客服后，进行支付
		    	</div>
		    	<div class="payment-way-button" ng-click="underLinePay()">
		    		确认支付
		    	</div>
		    </div>-->
		    
		    
		    <!--<div class="weixin-payment">
		    	<div class="payment-way-title">
		    		2.微信快捷支付
		    	</div>
		    	<div class="payment-way-word">
		    		微信支付，方便快捷
		    	</div>
		    	<div class="payment-way-button" ng-click="weiXinPay()">
		    		确认支付
		    	</div>
		    </div>-->
		        <!--<form name="fm" action="http://api.99epay.net/h5Pay/pub/toAcquireOrder.htm" method="post">
					<table>
						<tbody>
							<tr><td>version:</td><td><input type="text" name="version" value=""></td></tr>
							<tr><td>merchantId:</td><td><input type="text" name="merchantId" value=""></td></tr>
							<tr><td>merchantTime:</td><td><input type="text" name="merchantTime" value=""></td></tr>
							<tr><td>traceNO:</td><td><input type="text" name="traceNO" value=""></td></tr>
							<tr><td>requestAmount:</td><td><input type="text" name="requestAmount" value=""></td></tr>
							<tr><td>paymentCount:</td><td><input type="text" name="paymentCount" value=""></td></tr>
							<tr><td>payment_1:</td><td><input type="text" name="payment_1" value=""></td></tr>
							<tr><td>payment_2:</td><td><input type="text" name="payment_2" value=""></td></tr>
							<tr><td>returnUrl:</td><td><input type="text" name="returnUrl" value=""></td></tr>
							<tr><td>notifyUrl:</td><td><input type="text" name="notifyUrl" value=""></td></tr>
							<tr><td>goodsName:</td><td><input type="text" name="goodsName" value=""></td></tr>
							<tr><td>goodsCount:</td><td><input type="text" name="goodsCount" value=""></td></tr>
							
							<tr><td>ip:</td><td><input type="text" name="ip" value=""></td></tr>
							
							<tr><td>sign:</td><td><input type="text" name="sign" value=""></td></tr>
							<tr><td>extend:</td><td><input type="text" name="extend" value=""></td></tr>
							<tr><td><input type="submit" value="提交"/></td></tr>
						</tbody>
					</table>
				</form>	-->
		    </div>
		    
		
	</body>
	<!--系统js-->
	<!--<script type="text/javascript" src="../js/jquery.min.js" ></script>-->
	<script type="text/javascript" src="js/zepto.min.js" ></script>
	<script type="text/javascript" src="js/angular.min.js" ></script>
	<script type="text/javascript" src="js/jqAjaxRequest.js" ></script>
	<script type="text/javascript" src="js/common.js" ></script>
	<script type="text/javascript" src="js/config.js" ></script>
	<script type="text/javascript" src="popUpModal/confirmTip.js" ></script>
	<script type="text/javascript" src="popUpModal/confirmDialog.js" ></script>
    <script src="plugin/layerMobile/layer.js"></script>
    <script src="module/dialog/dialog.js"></script>
    <script src="controller/app.js"></script>
   
	<!--controller-->
	<script type="text/javascript" src="controller/prePayPageController.js" ></script>
	
	<!--插件-->
	<script type="text/javascript" src="js/fastclick.js" ></script>
	<script>
		$(function(){
			//监听微信返回按钮
			pushHistory();
			var bool=false;  
            setTimeout(function(){  
                bool=true;  
            },1000);
		    window.addEventListener("popstate", function(e) {
		    	if (bool)
		    	{
		    		if(!commonFu.isEmpty(localStorage.getItem(localStorageKey.TOKEN)))
			        {   
			        	var obj = new Base64();
						   	
						var id_base64 = obj.encode(specialPageController.commId);
							    	
						var thisPage_base64 = obj.encode(specialPageController.detailPage);
							
					    var str =  pageUrl.AUCTION_HISTORY_INFO + "?thisAcPage=" + thisPage_base64  + "&id=" + id_base64;	    	
						
						location.href = encodeURI(str);
						sessionStorage.removeItem("payOrderId");
			        }
		    	}
		    	pushHistory();
		    }, false); 
		    function pushHistory() { 
		        var state = { 
		            title: "title", 
		            url: "#"
		        }; 
		        window.history.pushState(state, "title", "#"); 
		    }
		})
	</script>
	<script>



        app.controller('specialctrl',function($scope){
			localStorage.removeItem("wxAddressEmpty");
			var open = '<?php echo $openId;?>';
//          alert(openId);
			
			specialPageController.init($scope,open);
			
		})
	</script>
</html>
