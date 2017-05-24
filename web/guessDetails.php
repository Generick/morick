<?php
    require_once "wx/jssdk.php";
	$jssdk = new JSSDK("wx8aa4883c737caaaa", "620937dd20bdecf9e84f369d2ef64305");
	$signPackage = $jssdk->GetSignPackage();
?>

<!DOCTYPE html>
<html ng-app="app">
	<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="format-detection" content="email=no">
        <meta name="format-detection" content="telephone=no">
        <title></title>
        <link rel="stylesheet" href="swiper/swiper.css" />
        <link rel="stylesheet" href="css/base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="popUpModal/popUp.css" />
        <link href="plugin/layerMobile/need/layer.css">
        
	</head>
	<body ng-controller="ctrl">

		<!--加载动画-->
		<div class="animation">
			<img src="img/loading.gif" />
		</div>

        <div class="container noScroll" style="overflow-y: scroll;padding-bottom: 65px;background: white;">
			<!--<div class="elegant-title" ng-bind="informationTitle">
		
			</div>
			<div class="elegant-time" ng-bind="informationTime">
			
			</div>-->
			<!--<div class="rich-content" id="preImages" ng-bind="informationContent">-->
			<div class="rich-content" id="preImages">
			    <!--<div id="preImages">
			     	<img src="http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg"/>
			     	<img src="http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg"/>
			        <img src="http://img02.tooopen.com/images/20141231/sy_78327074576.jpg"/>
			        <img src="http://img02.tooopen.com/images/20141225/sy_77939178247.jpg"/>
			    </div>-->
			</div>
		</div>	
	    <div ng-include="'module/tab/tab.html'"></div>
	</body>
	
	<!--系统js-->
	<script type="text/javascript" src="js/weixin.js"></script> 
	<!--<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>-->
	<script type="text/javascript" src="js/zepto.min.js" ></script>
	
	<script type="text/javascript" src="js/angular.min.js" ></script>
	<script type="text/javascript" src="js/jqAjaxRequest.js" ></script>
	
	<script type="text/javascript" src="js/common.js" ></script>
	<script type="text/javascript" src="js/config.js" ></script>
	
    <script src="plugin/layerMobile/layer.js"></script>
    <script src="module/dialog/dialog.js"></script>
    <script src="controller/app.js"></script>
    
 	<script src="js/commonArr.js"></script>
 	<script>
 	
		$(function() {
			
			//监听微信返回按钮
			pushHistory();
			var bool=false;

            setTimeout(function(){
                bool=true;
            },1000);
		    window.addEventListener("popstate", function(e) {
		    	if (bool)
		    	{
		    		  
		    		sessionStorage.setItem("needGuessPage",1)
		    		location.href = pageUrl.GUESS_PAGE +"?backPage=" + GuessInfoCtrl.thisDetailPage + "&thisDataId=" + GuessInfoCtrl.thisDataId;

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
	<script src="module/tab/tab.js"></script>     
	<script type="text/javascript" src="popUpModal/confirmTip.js" ></script>
	<script type="text/javascript" src="popUpModal/confirmDialog.js" ></script>
	
	
	<!--插件-->
	<script type="text/javascript" src="js/fastclick.js" ></script>
	<!--<script type="text/javascript" src="swiper/swiper.min.js" ></script>-->
    <!--<script type="text/javascript" src="../js/htmlNoScroll.js" ></script>-->
	<!--controller-->
	<script type="text/javascript" src="controller/guessDetailsController.js" ></script>
	<script>
        
        
		app.controller("ctrl", function($scope) {
			
			sessionStorage.setItem("itIsGuessPage",1)
		 
		    var wxParams = {};
	        wxParams.appId =  '<?php echo $signPackage["appId"];?>';
	        wxParams.timestamp =  '<?php echo $signPackage["timestamp"];?>';
	        wxParams.nonceStr =  '<?php echo $signPackage["nonceStr"];?>';
	        wxParams.signature =  '<?php echo $signPackage["signature"];?>';
	       
		    GuessInfoCtrl.init($scope,wxParams); 
		   
		});

       
	</script>
</html>