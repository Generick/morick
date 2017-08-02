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
		<div>fddsfdsgdghrtgfujtyeyhretyghrewtgrewtgewrtrewtrew</div>
		<div ng-click="diao()">确定</div>
		
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
	<script type="text/javascript" src="controller/test_02_Ctr.js" ></script>
	
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
			
			specialctrl.init($scope,open);
			
		})
	</script>
</html>
