<?php
    require_once "wx/jssdk.php";
	$jssdk = new JSSDK("wx8aa4883c737caaaa", "620937dd20bdecf9e84f369d2ef64305");
	$signPackage = $jssdk->GetSignPackage();
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
	<body ng-controller="ctrl" style="background: #FFFFFF;">
		<!--加载动画-->
		<div class="animation">
			<img src="img/loading.gif" />
		</div>
		<div class="container" style="overflow-y: scroll;padding-bottom: 65px;background: #FFFFFF;">
			<!-- Swiper -->
		    <div class="swiper-container">
		        <div class="swiper-wrapper" id="preImages">
		            <div class="swiper-slide item-img" ng-repeat="item in specilSellPictureArr" on-Finish-Render-Filters>
		            	<img ng-src="{{item}}">
		            </div>
		        </div>
 
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <div class="goods-content" style="padding-bottom:0;width:100%;overflow:hidden">
            	<p class="special-sell-name" ng-bind="specialName">
            		第三方第三方三发斯蒂芬大师法第三地方撒第三方大分
            	</p>
            	<p class="special-sell-content" ng-bind="specialDesc">
            		的广泛的施工方覆盖是的法规地方地方撒对方是个对方是个广东佛山覆盖格式个地方和高度规范规范沪电股份沪电股份沪电股份
            	</p>
            </div>
            <div class="sell-price-number-box">
            	<span style="padding-left:5px" class="sell-price-box" ng-bind="'￥'+specialPrice">
            		￥50000
            	</span>
            	<span class="sell-number-box">
            	     <span>库存</span>
            	     <span ng-bind="specialNumber">222</span>
            	     <span>件</span>
            	</span>
            </div>
            
            <div class="special-sell-rich"  id="preImagesTwo">
            	<p class="special-sell-rich-title">
            		商品详情
            	</p>
            	
            	<div id="special-sell-detail-content"></div>
            </div>
		</div>
		<div class="bottom-bye-button" ng-click="jumpToBye()">
			立即购买
			<div class="opc-bye-button"></div>
			
		</div>
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
		    		if(sessionStorage.getItem("comeWithGuess") == 4)//表示从个人中心跳转过来的
			        {   
			        
			        	location.href = pageUrl.PERSON_CENTER;
			        }
			        else if(sessionStorage.getItem("comeWithGuess") == 5)//表示从个人信息跳转过来的
			        {   
			        	
			        	location.href = pageUrl.MY_MESSAGE;
			        }
		    		else
		    		{       
		    			    
		    			    sessionStorage.setItem("needPageId",1)
		    			    if(sessionStorage.getItem("messlistOrauction") == 0)//表示从拍卖历史跳转过来的
			        	    {   
			        	    	location.href = pageUrl.AUCTION_HISTORY + "?backPage=" + specialSellController.thisDetailPage + "&thisDataId=" + specialSellController.thisDataId;

			        	    }
			        	    else if(sessionStorage.getItem("messlistOrauction") == 1)//表示从从消息中心跳转过来的
			        	    {
			        	    	 
			        	    	location.href = pageUrl.MY_MESSAGE;
			        	    }
			    			
			    		   
		    		}
		    	}
		    	pushHistory();
		        
		    }, false); 
		    function pushHistory(){
		        var state = {
		            title: "title",
		            url: "#"
		        }; 
		        window.history.pushState(state, "title", "#");
		    }
		})
	</script>
	<!--插件-->
	<script type="text/javascript" src="js/fastclick.js" ></script>
	<script type="text/javascript" src="swiper/swiper.min.js" ></script>
	<!--controller-->
	<script src="controller/auctedGoodsDetailController.js" ></script>
	<script>

		app.controller("ctrl", function ($scope)
		{
			
			sessionStorage.setItem("itIsAuctionPage",1);
		    
		    var wxParams = {};
	        wxParams.appId =  '<?php echo $signPackage["appId"];?>';
	        wxParams.timestamp =  '<?php echo $signPackage["timestamp"];?>';
	        wxParams.nonceStr =  '<?php echo $signPackage["nonceStr"];?>';
	        wxParams.signature =  '<?php echo $signPackage["signature"];?>';
	       
		    specialSellController.init($scope,wxParams); 
		  
		});

	</script>
	
</html>
