
<?php
	session_start();
	$openId = isset($_SESSION['openId'])?$_SESSION['openId']:'';

?>

<!DOCTYPE html>
<html ng-app="app">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title></title>
        <link rel="stylesheet" href="swiper/swiper.css" />
        <link rel="stylesheet" href="css/base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="popUpModal/popUp.css" />
        <link rel="stylesheet" href="plugin/layerMobile/need/layer.css" />
        <link rel="stylesheet" href="css/newPersonal.css" /> 
	</head>
	<body ng-controller="ctrl" >
	     <div ng-click="toPayIt()" style="width:100px;line-height:40px;height:40px;text-align: center;border:1px solid #000000">去支付</div>
	</body>
    
	<!--系统js-->
	<script type="text/javascript" src="js/weixin.js"></script> 
	<script type="text/javascript" src="js/jquery.min.js" ></script>
	<script type="text/javascript" src="js/angular.min.js" ></script>
	<script type="text/javascript" src="js/jqAjaxRequest.js" ></script>
	<script type="text/javascript" src="js/common.js" ></script>
	<script type="text/javascript" src="js/config.js" ></script>
	<script type="text/javascript" src="popUpModal/confirmTip.js" ></script>
    <script src="plugin/layerMobile/layer.js"></script>
    <script src="module/dialog/dialog.js"></script>
    <script src="controller/app.js"></script>
	
	 <script>
    	
    	

		if (typeof localStorage === 'object') {
		    try {
				localStorage.setItem('localStorage', 1);
				localStorage.removeItem('localStorage');
			} catch (e) {
				Storage.prototype._setItem = Storage.prototype.setItem;
				Storage.prototype.setItem = function() {};
				$dialog.msg('为了正常访问，请关闭无痕模式');
			}
		}


    </script>
	<script src="js/commonArr.js"></script>
	<script src="module/tab/tab.js"></script>   
	
	
	<!--插件-->
	<script type="text/javascript" src="js/fastclick.js" ></script>
	<script type="text/javascript" src="swiper/swiper.min.js" ></script>
	<!--controller-->
	<!--<script src="controller/auctedGoodsDetailController.js" ></script>-->
	<script>

		app.controller("ctrl", function ($scope)
		{
			
			sessionStorage.setItem("itIsAuctionPage",1);
		    
		    
	        var open = '<?php echo $openId;?>';
		    specialSellController.init($scope,open); 
		    
		});
        	
		var specialSellController = {
			
			scope : null,
			
			open :  null,
			
			init : function($scope,open){
				
				this.scope = $scope;
				
				this.open = open;
				
				this.eventBind();
				
			},
			
			
			eventBind : function(){
				var self = this;
				
				self.scope.toPayIt = function(){
					
					
					var params = {};
					params.openId = self.open;
					alert(JSON.stringify(params))
					jqAjaxRequest.asyncAjaxRequest("http://auction.yawan365.com:8080/index.php/order/Order/continuePayTest", params, function(data){
						
						alert(JSON.stringify(data))
					
						      function onBridgeReady(){
								    WeixinJSBridge.invoke(
								        'getBrandWCPayRequest', {
								            "appId":data.prepayInfo.payInfo.appId,     //公众号名称，由商户传入     
								            "timeStamp":data.prepayInfo.payInfo.timeStamp,         //时间戳，自1970年以来的秒数     
								            "nonceStr":data.prepayInfo.payInfo.nonceStr, //随机串     
								            "package":data.prepayInfo.payInfo.package,     
								            "signType":data.prepayInfo.payInfo.signType,         //微信签名方式：     
								            "paySign":data.prepayInfo.payInfo.paySign //微信签名 
								        },
								        function(res){     
								            if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
								        }
								    ); 
								 }
								if (typeof WeixinJSBridge == "undefined"){
								    if( document.addEventListener ){
								        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
								    }else if (document.attachEvent){
								        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
								        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
								    }
					               
								 }else{
								    onBridgeReady();
								 } 
			
					})
					
					
				}
			}
		}
	</script>
	
</html>
