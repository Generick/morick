<!DOCTYPE html>
<?php
    require_once "wx/jssdk.php";
	$jssdk = new JSSDK("wx8aa4883c737caaaa", "620937dd20bdecf9e84f369d2ef64305");
	$signPackage = $jssdk->GetSignPackage();
?>

<html ng-app="app" style="background: #FFFFFF;">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="format-detection" content="telephone=no">
		<meta name="format-detection" content="email=no">
        <title>雅玩之家精选店，明码标价，童叟无欺</title>
       
        <link rel="stylesheet" href="css/ui.base.css" />
        <link rel="stylesheet" href="css/selected.css" />
        <link rel="stylesheet" href="popUpModal/popUp.css" />
        <link rel="stylesheet" href="plugin/layerMobile/need/layer.css" />
        <link rel="stylesheet" href="css/newPersonal.css" />
	</head>
	<body ng-controller="ctrl" style="background: #FFFFFF;">
		<div id="myself-head"  ng-click="jumpToSelfZone3()" style="position: fixed;top:10px;left:10px;width:16vw;height:16vw;display: block;z-index: 99999;">
			<img src="img/personal-enter.png"> 
		</div>
		<!--加载动画-->
		<div class="animation">
			<img src="img/loading.gif" />
		</div>
		<!--<div class="fix-clock">
			
		</div>-->
		<!--<div class="fix-round">
			<canvas id="myCanvas" width="300" height="300"></canvas>
			<div id="img-box-s" class="rotate-s" >
		  		<img id="clock_indicator-s" src="img/newPic/indicator.png" />
		  	</div>
	    </div>-->
		
		
		<!--<div class="fix-round">
			<span id="changing-number">10</span>
			<span id="changing-words">s</span>
	    </div>-->
		<div class="container scroll fullwidthHtml" style="background-color: #fff !important;padding:0.8%;margin-bottom: 60px;overflow:hidden;height:100%;">
			<div class="list" id="list-empty" style="background-color: #fff;overflow: hidden;padding-bottom: 0;">
				<ul id="selected-ul">
					<div on-finish-render-filters class="oneList sell-list-item" style="position: relative;"  id="test_{{item.commodity_id}}"  ng-click="onClickToAuctionHistoryDetail(item)" ng-repeat="item in auctionHistoryModel.TMHList">
						<!--李小波 改动-->
						
						<!--<div class="sell-list-item-img" style="background-image: url({{item.pictures}})">
						
						</div>-->
						<div class="sell-list-item-img" style="position: relative;">
							<!--<img ng-src="{{item.pictures}}" style="border-radius: 1px;"/>-->
							<!--<div  class="shade-pic" ng-show="item.info.stock_num == 0">
								<img src="img/newPic/sell-out-i.png">
							</div>-->
							
							<div class="create-img-box">
								<img ng-src="{{item.pictures}}">
								<!--<div class="masking">
									<img src="img/newPic/sell-out-i.png"> 
								</div>	-->
							</div>
							
						</div>
						<div class="sell-list-item-name" ng-bind="item.info.commodity_name">
							传送到对方水范德萨范德萨范德萨水电费水电
						</div>
						<div class="sell-list-item-price-box">
							
							<!--<div class="sell-list-item-price-word" ng-bind="'￥'+item.info.viewPrice">
								
							</div>-->
							<div style="line-height: 25px;height:25px;text-align: center;color:#C4996D" ng-show="item.info.stock_num == 0" ng-if="item.info.stock_num == 0">已售</div>
							<span style="color:#C4996D;font-size:13px;display:block;line-height: 25px;height:25px" ng-show="item.info.stock_num != 0">￥</span>
							<div class="sell-list-item-price-word" id="sb_{{item.commodity_id}}" ng-show="item.info.stock_num != 0">
							    <div class="flip" ng-class = "item.newName">
							      
							        <div class="price-div">
							          <!--<div class="w-k number"></div>-->
							          <div class="q-k number"></div>
							          <div class="h-k number"></div>
							          <div class="t-k number"></div>
							          <div class="k number"></div>
							          <!--<div class="comma sign">,</div>-->
							          <div class="h number"></div>
							          <div class="t number"></div>
							          <div class="single number"></div>
							          <div class="sign dot">.</div>
							          <div class="t-d number" style="width:7px;-webkit-transform: scaleX(0.9);font-size:12px"></div>
							          <div class="h-d number" style="width:7px;-webkit-transform: scaleX(0.9);font-size:12px;"></div>
							          <div class="q-d number" style="width:7px;-webkit-transform: scaleX(0.9);font-size:12px"></div>
							          <div class="w-d number" style="width:7px;-webkit-transform: scaleX(0.9);font-size:12px"></div>
							        </div>
							      </div>
							</div>	
						</div>
					</div>
			   </ul>
            </div>

<!--			<div class="sell-list-item"  ng-click="onClickToAuctionHistoryDetail()">
				<div class="sell-list-item-img">
					<img src="img/newPic/test1.png" />
				</div>
				<div class="sell-list-item-name">
					传送到对方水
				</div>
				<div class="sell-list-item-price-box">
					
					<div class="sell-list-item-price-word">
						￥555550
					</div>
				</div>
			</div>
			
			
			<div class="sell-list-item"  ng-click="onClickToAuctionHistoryDetail()">
				<div class="sell-list-item-img">
					<img src="img/newPic/test2.png" />
				</div>
				<div class="sell-list-item-name">
					传送到对方水
				</div>
				<div class="sell-list-item-price-box">
					
					<div class="sell-list-item-price-word">
						￥222222
					</div>
				</div>
			</div>
			
			<div class="sell-list-item"  ng-click="onClickToAuctionHistoryDetail()">
				<div class="sell-list-item-img">
					<img src="img/newPic/test3.png" />
				</div>
				<div class="sell-list-item-name">
					传送到对方水
				</div>
				<div class="sell-list-item-price-box">
					
					<div class="sell-list-item-price-word">
						￥100000
					</div>
				</div>
			</div>-->
			<div class="no-data" style="height:70vh">暂无数据！</div>
		</div>
        
        <div class="goods-cars">
        	
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
	<!--<script type="text/javascript" src="js/jquery-1.9.0.js"></script>-->
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

        
        
//      function initClock(){
//  	
//	    		var c = document.getElementById('myCanvas');
//	    		
//		   		var ctx = c.getContext('2d');
//	  
//		   		var imgs = document.getElementById("img-box-s");
//
//				CanvasRenderingContext2D.prototype.sector = function(x,y,r,angle1,angle2){
//				
//		            this.save();
//		            this.beginPath();
//		            this.moveTo(x,y);
//		            this.arc(x,y,r,angle1*Math.PI/180,angle2*Math.PI/180,false);
//		            this.closePath();    
//		            this.restore();
//		            
//		            return this;
//		        }
//	            
//		        var angle = 270.0;
//		        var timer = null;
//		        
//		        
//		        timer = setInterval(function(){
//		            imgs.style.transform='rotate('+ (270.0 + angle) +'deg)';
//	                
//	                if(angle > 630.0){
//
//		            	ctx.clearRect(0,0,30,30);
////		                clearInterval(timer); 
//		                angle = 270.0;
//		            }
//		            
//		            ctx.fillStyle = '#F68588';
//				    ctx.sector(15,15,13,270.0,angle).fill();
//		            drawRound(angle);
//		            angle+= 6.0;
//		          
//		        },100);
//			    
//			    
//			  function drawRound(angle){
//			  	    
//			  	    ctx.save();
//		            ctx.beginPath();
//				    ctx.lineWidth = 2;
//				    ctx.strokeStyle = '#C4996D';
//				    ctx.arc(15, 15, 13,270.0*Math.PI/180,angle*Math.PI/180,false);
//				    ctx.stroke();
//				    ctx.closePath();
//				    ctx.restore();
//			  };
//	        };
//  	initClock();
    </script>
    <!--插件-->
	<script type="text/javascript" src="js/fastclick.js" ></script>
    
	<!--controller-->
	<script type="text/javascript" src="js/auctionAminate.js"></script>
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
