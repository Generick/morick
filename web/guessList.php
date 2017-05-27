<?php
    require_once "wx/jssdk.php";
	$jssdk = new JSSDK("wx8aa4883c737caaaa", "620937dd20bdecf9e84f369d2ef64305");
	$signPackage = $jssdk->GetSignPackage();
?>

<!DOCTYPE html>
<html ng-app="app">
	<head>
		<meta charset="UTF-8">
        <!--		
		<meta  http-equivV="pragma" content="no-cache"> 
        <meta  http-equiv="Cache-Control" content="no-cache, must-revalidate"> 
        <meta  http-equiv="expires" content="0">-->
	
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="format-detection" content="telephone=no">
		<meta name="format-detection" content="email=no">
        <title>雅玩之家</title>
        <link rel="stylesheet" href="css/ui.base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="popUpModal/popUp.css" />
      
	</head>
	<body ng-controller="ctrl">
		<div id="myself-head"  ng-click="jumpToSelfZone1()" style="position: fixed;top:10px;left:10px;width:16vw;height:16vw;display: block;z-index: 99999;">
			<img src="img/personal-enter.png"> 
		</div>
		<!--加载动画-->
		<div class="animation" style="position:absolute;">
			<img src="img/loading.gif"/>
		</div>
		
        <div id="container" class="container scroll">
           
            <div class="list" id="list-empty" style="background-color: #fff;padding-bottom: 60px;">
				<ul id="selected-ul" class="guess-list-ul" style="padding-bottom:0px">
					
					<li class="oneList oneList-2" style="padding-bottom:0px;margin-bottom:8px;" ng-repeat = "item in auctionItems" id="guess_{{item.id}}" ng-click = "onClickToGoodsDetail(item,$index)" on-finish-render-filters>
                        <div class="item-img-2">
                        	<img class="videobg" ng-show="item.type == 1 || item.type == 2"  src="img/playIt.png" />
                            <img ng-show="item.type ==0" ng-src="{{item.cover}}">
                        <!--<video x5-video-player-fullscreen="true" playsinline="true" style="position: absolute;top:0;left:0;" webkit-playsinline="true" x5-video-player-type='h5' class="c-h5" >-->
			                <video   class="c-h5"  x5-video-player-fullscreen="true" ng-if="item.type ==1 || item.type == 2"  ng-show="item.type ==1 || item.type == 2">
								
							</video>
							<iframe frameborder="0" width="640" height="320" src="" ng-if="item.type ==3" ng-show="item.type == 3" allowfullscreen></iframe>
                            <div class="bottom-title-content" ng-bind="item.title"></div>
                        </div> 
					</li>
				
				</ul>
			    <!--<div class="no-more-data" style="bottom:54px;position: fixed;z-index: 11;">
					更多精彩拍品，每晚十点上拍！
				</div>-->
			</div>
			
			<!--暂无数据-->
			<div class="no-data">暂无数据！</div>
		</div>
         
        <div class="chrysanthemums">
			<img src="img/loading.gif"/>
		</div>
		
		<div ng-include="'module/tab/tab.html'"></div>
		
	</body>
    
	<!--系统js-->
	<script type="text/javascript" src="js/zepto.min.js" ></script>
	<script type="text/javascript" src="js/angular.min.js" ></script>
	<script type="text/javascript" src="js/weixin.js"></script> 
	<script type="text/javascript" src="js/jqAjaxRequest.js" ></script>
	<script type="text/javascript" src="js/common.js" ></script>
	<script type="text/javascript" src="js/config.js" ></script>
    <script src="js/commonArr.js"></script>
    <script src="module/tab/tab.js"></script>
	<script type="text/javascript" src="popUpModal/confirmTip.js" ></script>
    <script src="controller/app.js"></script>
    <script src="plugin/layerMobile/layer.js"></script>
    <script src="module/dialog/dialog.js"></script>
    <script  type="text/javascript" >
    	
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
	<!--插件-->
	<script type="text/javascript" src="js/fastclick.js"></script>
	<!--<script type="text/javascript" src="js/htmlNoScroll.js"></script>-->
	<!--<script type="text/javascript" src="js/xzl-down-rerfresh-guess.js" ></script>-->
	
	<!--controller-->
	<script type="text/javascript" src="controller/guessListController.js" ></script>
	
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
		    		location.href = pageUrl.GUESS_PAGE;
		    		
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
    <script type="text/javascript" >
        app.controller("ctrl", function ($scope)
	    {  
	    	
			var wxParams = {};
	        wxParams.appId =  '<?php echo $signPackage["appId"];?>';
	        wxParams.timestamp =  '<?php echo $signPackage["timestamp"];?>';
	        wxParams.nonceStr =  '<?php echo $signPackage["nonceStr"];?>';
	        wxParams.signature =  '<?php echo $signPackage["signature"];?>';
//			alert(12323213)
		   
			GuessListCtrl.init($scope,wxParams);
//			 localStorage.clear();sessionStorage.clear()
//		    alert(8989)
		});
        
        
        
   </script> 

</html>
