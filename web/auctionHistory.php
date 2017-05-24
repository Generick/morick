<!DOCTYPE html>
<?php
    require_once "wx/jssdk.php";
	$jssdk = new JSSDK("wx8aa4883c737caaaa", "620937dd20bdecf9e84f369d2ef64305");
	$signPackage = $jssdk->GetSignPackage();
?>

<html ng-app="app">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="format-detection" content="telephone=no">
		<meta name="format-detection" content="email=no">
        <title>雅玩之家</title>
       
        <link rel="stylesheet" href="css/ui.base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="popUpModal/popUp.css" />
        <link rel="stylesheet" href="plugin/layerMobile/need/layer.css" />
        <style>
        	html,body
        	{
        		background: #EEEEEE;
        		width:100%;
        		height:100%;
        	}
        	
        	.fullwidthHtml{
        		 width: inherit;
                 height: inherit;
        	}
        	.contents-img-box{
        		 width: inherit;
                 height: inherit;
        	}
        	
        	.contents-img {
		        width: 50vw;
		        height: 63vw;
		        margin:auto 25vw;
		        margin-top:22vh;
		    }
        </style>
	</head>
	<body ng-controller="ctrl">
		<div id="myself-head"  ng-click="jumpToSelfZone3()" style="position: fixed;top:10px;left:10px;width:16vw;height:16vw;display: block;z-index: 99999;">
			<img src="img/personal-enter.png"> 
		</div>
		<!--加载动画-->
		<div class="animation">
			<img src="img/loading.gif" />
		</div>
		
		<!--style="background-color: #fff;margin-bottom: 40px;position:absolute; overflow:auto;-webkit-overflow-scrolling: touch; top:0; left:0; bottom:0; right:0;"-->
		
		<div class="container scroll fullwidthHtml">
			         
			         <div class="contents-img-box">
			         	<img class="contents-img" src="img/pleaseWaiting.png">
			         </div> 
					
					
					<!--<li ng-repeat="item in auctionItems" id="test_{{item.id}}" ng-click="onClickToAuctionHistoryDetail(item)" on-finish-render-filters>
						<div class="item-img">
                            <b style="background-image: url({{item.aucted}})"></b>
                            <img style="position: absolute;top:1vw;left:0px;z-index: 5;width:14vw;height:14vw;" class="smallvippic" ng-show="(item.isVIP == 1)" src="img/newVip.png">
                            <b>
                            	<img src="img/aucted0.png"> 
                            </b>
							<img ng-src="{{item.goodsInfo.goods_cover}}">
						</div>
						<div class="price">
							<div ng-bind="item.goodsInfo.goods_name"></div>
							<div class="aucted-content">
								<span>{{item.status==1?"流拍":item.isAucted?"成交价￥":"流拍"}}</span>
								 <span ng-show="item.status==0 && item.isAucted" ng-bind="item.currentPrice"></span>
							</div>
						</div>
					</li>-->
			
			<!--暂无数据-->
			<div class="no-data">暂无数据！</div>
		</div>
        
        <div id="acfixed-shade"  ng-click="acOkToShut()">
        	<div class="acmodied-box" id="acsure-remark">
			    <div class="acvipMark-box">
			        <img src="img/newBigVip.png">
			    </div>
			    <div class="accontents-box">
			                        本件拍品为 “VIP专享”，只有VIP才能查看详情和参与竞价。 申请成为VIP，请联系VIP客服专员, 微信号：tldwzhg(陶兰都吴掌柜)
			    </div>
			    <div class="acsure-to-do">
			    	确定
			    </div> 
			</div>
        </div>
        
        <div class="acu-chrysanthemums">
			<img src="img/loading.gif"/>
		</div>
		<div ng-include="'module/tab/tab.html'"></div>
	</body>

	<!--系统js-->
	<script type="text/javascript" src="js/zepto.min.js"></script>
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/weixin.js"></script> 
	<script type="text/javascript" src="js/angular.min.js"></script>
	<script type="text/javascript" src="js/jqAjaxRequest.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/config.js"></script>
    <script src="js/commonArr.js"></script>
    <script src="plugin/layerMobile/layer.js"></script>
    <script src="module/dialog/dialog.js"></script>
    <script src="module/tab/tab.js"></script>
    <script src="controller/app.js"></script>
    <!--插件-->
	<script type="text/javascript" src="js/fastclick.js" ></script>
    
	<!--controller-->
	<script type="text/javascript" src="controller/auctionHistoryController.js" ></script>
	
	
	<!--<script type="text/javascript" src="js/htmlNoScroll.js" ></script>-->
	
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
		    		location.href = pageUrl.AUCTION_HISTORY;
		    		
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
		
		app.controller("ctrl", function ($scope)
		{   
			
			
			var wxParams = {};
	        wxParams.appId =  '<?php echo $signPackage["appId"];?>';
	        wxParams.timestamp =  '<?php echo $signPackage["timestamp"];?>';
	        wxParams.nonceStr =  '<?php echo $signPackage["nonceStr"];?>';
	        wxParams.signature =  '<?php echo $signPackage["signature"];?>';
	        
		    AuctionHistoryCtrl.init($scope,wxParams);
		   
		});

		
	</script>
</html>
