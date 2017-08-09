<?php
	session_start();
	$openId = isset($_SESSION['openId'])?$_SESSION['openId']:'';

?>


<!DOCTYPE html>
<html ng-app="app">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="email=no">
        <meta name="format-detection" content="telephone=no">
        <title>订单详情</title>
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
	</head>
	<body ng-controller="ctrl">
		<!--加载动画-->
		<div class="animation">
			<img src="img/loading.gif" />
		</div>
		<div class="container">
			<div class="order-detail-title">
				<div ng-bind="orderDetailModel.orderInfo.orderTypeText"></div>
				<p ng-show="orderDetailModel.unPay && orderDetailModel.orderInfo.orderType != 2">付款时间剩余<span ng-bind="orderDetailModel.lastTime"></span>小时自动关闭</p>
			    <p ng-show="orderDetailModel.unPay && orderDetailModel.orderInfo.orderType == 2" style="text-align: justify;">请在72小时内完成付款，逾期未付款的订单将自动取消，但会影响您在「雅玩之家」的信用。</p>
			</div>
			<div ng-show="orderDetailModel.orderInfo.deliveryType == 0" class="accept-detail clear" ng-click="selAddress()">
				<div class="accept-lf"><img src="img/personCenter/address-icon.png" /></div>
				<div class="accept-mid">
					<div>收货人: <span ng-bind="orderDetailModel.orderInfo.acceptName"></span><span ng-bind="orderDetailModel.orderInfo.mobile" style="margin-left: 10px;"></span></div>
					<div>收货地址: <span ng-bind="orderDetailModel.orderInfo.addressAll"></span></div>
				</div>
                <!--<div ng-hide="!orderDetailModel.unPay" class="accept-rg"><img src="../img/personCenter/right_icon.png"></div>-->
			</div>
			<div style="color: #FF4506;text-align: center;line-height:22px;padding:8px 0px;font-size:12px;" ng-show="orderDetailModel.orderInfo.deliveryType == 1 && orderDetailModel.orderInfo.orderStatus == 1">
				您选择了当面交易方式，请在当面交易时，支付订单金额。
			</div>
			<div class="order-mid fix">
                <div class="f bidding-img">
                    <img ng-if="orderDetailModel.orderInfo.orderType != 2" ng-show="orderDetailModel.orderInfo.orderType != 2"  ng-src="{{orderDetailModel.orderInfo.orderGoods[0].goods_cover}}">
                    <img ng-if="orderDetailModel.orderInfo.orderType == 2" ng-show="orderDetailModel.orderInfo.orderType == 2" ng-src="{{orderDetailModel.orderInfo.orderGoods[0].commodity_cover}}">
                </div>
                <div class="bidding-txt f">
                    <h4 ng-if="orderDetailModel.orderInfo.orderType != 2" ng-show="orderDetailModel.orderInfo.orderType != 2"  style="color: #555; font-weight: 500;">{{orderDetailModel.orderInfo.orderGoods[0].goods_name}}</h4>
                    <h4 ng-if="orderDetailModel.orderInfo.orderType == 2" ng-show="orderDetailModel.orderInfo.orderType == 2"  style="color: #555; font-weight: 500;">{{orderDetailModel.orderInfo.orderGoods[0].commodity_name}}</h4>
                    
                    <div ng-if="orderDetailModel.orderInfo.orderType != 2" ng-show="orderDetailModel.orderInfo.orderType != 2"  class="price-init" style="color: #FF4506;">¥{{orderDetailModel.orderInfo.goodsPrice}}</div>
                    <div ng-if="orderDetailModel.orderInfo.orderType == 2" ng-show="orderDetailModel.orderInfo.orderType == 2"  class="price-init" style="color: #FF4506;">¥{{everyGoosPrice}}</div>
                    <div class="price-tag">
                    	<span style="margin-left: 3px;" class="order-item-num">x</span>
                    	<span class="order-item-num"  ng-if="orderDetailModel.orderInfo.orderType != 2" ng-show="orderDetailModel.orderInfo.orderType != 2"   ng-bind="orderDetailModel.orderInfo.orderGoods[0].goodsNum"></span>
                    	<span class="order-item-num"  ng-if="orderDetailModel.orderInfo.orderType == 2" ng-show="orderDetailModel.orderInfo.orderType == 2"  ng-bind="orderDetailModel.orderInfo.orderGoods[0].goodsNum"></span>
                        <!--<span ng-show="!orderDetailModel.unPay && orderDetailModel.orderInfo.deliveryType == 0" style="padding-right:10px;float:right;color:#FF4506">在线订单</span>
                        <span ng-show="orderDetailModel.orderInfo.deliveryType == 1" style="padding-right:10px;float:right;color:#FF4506">当面付订单</span>-->
                    </div>
                </div>
			</div>

			<div class="order-bottom" style="background-color: #fff;margin-top: 0;padding: 8px 8px 8px 0;">
                <div ng-show="orderDetailModel.orderInfo.orderType != 2">保证金抵扣¥ <span>{{orderDetailModel.orderInfo.prepaidPrice}}</span>元</div>
                <div ng-show="orderDetailModel.orderInfo.orderType != 2 && (isMoreThanPrice > '0')">保证金退回¥ <span>{{isMoreThanPrice}}</span>元</div>
				<ul class="clear">
					<li class="pay-li">实付¥<span ng-bind="orderDetailModel.orderInfo.payPrice"></span></li>
					<li style="font-size: 12px;margin: 0 10px;color: #4a4a4a;">小计(不含运费) : </li>
					<li   ng-if="orderDetailModel.orderInfo.orderType != 2" ng-show="orderDetailModel.orderInfo.orderType != 2"    style="font-size: 12px;color: #4a4a4a;">共<span ng-bind="orderDetailModel.orderInfo.orderGoods[0].goodsNum"></span>件商品</li>
					<li   ng-if="orderDetailModel.orderInfo.orderType == 2" ng-show="orderDetailModel.orderInfo.orderType == 2"    style="font-size: 12px;color: #4a4a4a;">共<span ng-bind="orderDetailModel.orderInfo.orderGoods[0].goodsNum"></span>件商品</li>
				</ul>
			</div>
			<div class="pay-ways" ng-show="orderDetailModel.unPay && orderDetailModel.orderInfo.orderType == 1">
				<li>
					<span class="pay-title">选择快递方式</span>
					<div style="display: inline-block;">
						<span class="fast-title">快递</span><p id="fastSend" class="fast-send sen-check" ng-click="fastOrFace(0)"></p>
						<span class="face-title">当面交易</span><p id="faceSend" class="face-send" ng-click="fastOrFace(1)"></p>
					</div>
				</li>
				
			</div>
			
			<div class="other-detail">
				<li style="margin-bottom:0px;line-height:22px;">订单类型: 
					<span ng-show="orderDetailModel.orderInfo.orderType == 2">商品订单</span>
					<span ng-show="orderDetailModel.orderInfo.orderType != 2">拍品订单</span>
				</li>
				<li style="margin-bottom:0px;line-height:22px;">订单编号: <span ng-bind="orderDetailModel.orderInfo.order_no"></span></li>
				<li style="margin-bottom:0px;line-height:22px;"  ng-show="orderDetailModel.orderInfo.orderType != 2"  ng-if="orderDetailModel.orderInfo.orderType != 2" >创建时间: <span ng-bind="orderDetailModel.orderInfo.orderTime*1000|date:'yyyy-MM-dd HH:mm:ss'"></span></li>
				<li style="margin-bottom:0px;line-height:22px;" ng-show="orderDetailModel.orderInfo.orderType == 2"  ng-if="orderDetailModel.orderInfo.orderType == 2" >创建时间: <span ng-bind="orderDetailModel.orderInfo.orderTime*1000|date:'yyyy-MM-dd HH:mm:ss'"></span></li>
				<li style="margin-bottom:0px;line-height:22px;" ng-show="orderDetailModel.orderInfo.orderType == 2"  ng-if="orderDetailModel.orderInfo.orderType == 2" >支付方式: 
					<span ng-show="orderDetailModel.orderInfo.payType == 3">人工支付</span>
				    <span ng-show="orderDetailModel.orderInfo.payType == 5 || orderDetailModel.orderInfo.payType == 7  || orderDetailModel.orderInfo.payType == 15 || orderDetailModel.orderInfo.payType == 11">微信支付</span>
				    <span ng-show="orderDetailModel.orderInfo.payType == 6 || orderDetailModel.orderInfo.payType == 12">支付宝支付</span>
				</li>
				<li class="clear" ng-show="orderDetailModel.unPay">
					<!--<div style="float:left;line-height:30px;">更多订单信息，请至个人中心~~</div>-->
					<!--ng-hide="orderDetailModel.orderInfo.payType == 3 && orderDetailModel.orderInfo.orderType == 2"-->
					<button id="go-to-pay" class="other-detail-btn"  class="btn-active" ng-click="onClickToPayOrder(0)">去支付</button>
					<button ng-show="orderDetailModel.orderInfo.orderType == 1" id="up-data" class="other-detail-btn" class="btn-active" ng-click="onClickToPayOrder(1)">提交申请</button>
				   
				</li>
				<li class="clear"  ng-show="orderDetailModel.orderInfo.orderStatus == 3">
				
				     <button class="btn-active to-sure-accept" ng-click="onClickToConfirmReceipt()">确认收货</button>
				</li>
				
			</div>
			<div style="background: #FFFFFF;line-height:40px;height:40px;border-top:1px solid #DDDDDD;border-bottom: 1px solid #DDDDDD;" ng-show="orderDetailModel.orderInfo.orderStatus == 1 && orderDetailModel.orderInfo.deliveryType == 1">
				<li>
					<span  style="text-align: center;float:left;margin-left:8px;">配送方式</span>	 
				    <span style="text-align: center;float:right;margin-right:8px;">当面交易</span>
				</li>
			</div>
			<!--物流信息-->
			<ul class="logistics-container" ng-show="orderDetailModel.showLogistics && orderDetailModel.orderInfo.payType != 3">
				<span style="font-size: 16px;color: #656565;">物流信息</span>
				<div style="padding: 6px 0;color: #656565;">承运来源: <span>顺丰快递</span></div>
				<div style="padding-bottom: 10px;color: #656565;">运单编号: <span ng-bind="orderDetailModel.orderInfo.logistics_no"></span></div>
				<li class="clear" ng-repeat="item in traces track by $index">
					<div class="logistics-line"></div>
					<div class="logistics-left">
						<img ng-src="{{item.logisticsPic}}" />
					</div>
					<div class="logistics-rg">
						<span class="{{item.lastLogStyle}}" ng-bind="item.AcceptStation"></span>
						<p class="{{item.lastLogStyle}}" ng-bind="item.AcceptTime"></p>
					</div>
				</li>
			</ul>
			
		</div>
		<div id="shenqing" ng-click="hideIt()">
			<div class="shenqing-content">
				<p class="cancleITt">X</p>
				<p class="title-notice">当面付申请提示</p>
			  <span class="titleone">恭喜您的当面付申请提交成功，请耐心等待客服审核,如有疑问请联系客服，谢谢您的合作！</span>
			
			</div>
			
		</div>
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
			</form>	
			
			
			<form name="fm2" action="http://api.99epay.net/h5Pay/pub/toAcquireOrder.htm" method="post">
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
	</body>
	<!--系统js-->
	<script type="text/javascript" src="js/weixin.js"></script> 
	<script type="text/javascript" src="js/zepto.min.js" ></script>
	<script type="text/javascript" src="js/angular.min.js" ></script>
	<script type="text/javascript" src="js/jqAjaxRequest.js" ></script>
	<script type="text/javascript" src="js/common.js" ></script>
	<script type="text/javascript" src="js/config.js" ></script>
	<script type="text/javascript" src="popUpModal/confirmTip.js" ></script>
    <script src="plugin/layerMobile/layer.js"></script>
    <script src="module/dialog/dialog.js"></script>
    <script src="controller/app.js"></script>
    <script src="popUpModal/confirmDialog.js"></script> 
	<!--controller-->
	<script type="text/javascript" src="controller/personCenter/orderDetailController.js" ></script>
	
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
                if(bool)
                {  
                    if(!commonFu.isEmpty(localStorage.getItem(localStorageKey.TOKEN)))
                    {    
 
						
                        if(localStorage.getItem("comewidthgoto")== 2)
                        {
                           
                           var obj = new Base64();
						   	
							var id_base64 = obj.encode("3");
		
							var str =  pageUrl.MY_PAY_ORDER_PAGE + "?comfromSpecial=" + id_base64;		    	
											
							location.href = encodeURI(str);
                  
                        	localStorage.removeItem("comewidthgoto");
                        }
                        else if(localStorage.getItem("comewidthgoto")== 3){  	
                        	location.href = pageUrl.PERSON_INFO; 
                        }
                        else if(localStorage.getItem("comewidthgoto") == 8){
                        	
                        	location.href = pageUrl.PRE_PAY_PAGE;
                        }
                        else{
                        	
                        	location.href = pageUrl.PERSON_CENTER;
                        }
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
    
	    app.controller("ctrl", function($scope) {
	    	var open = '<?php echo $openId;?>';
	    	
	  		OrderDetailCtrl.init($scope,open);
	  	
		});
     
    	
    </script>
</html>
