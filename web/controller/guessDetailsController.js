/*
 * 商品详情
 */


var GuessInfoCtrl = {
	
	scope: null,
	
	wxParams :{},
	
	shareInfo : {},
	
	informationContent : '',
	
	informationTime: '',
	
	informationTitle : '',
	
	informationSummny : '',
	
	thisDetailPage : null,
	
	thisDataId : null,
	
	init: function($scope,wxParams){
		
		this.scope = $scope;
		
		this.wxParams = wxParams;
		
		this.getUrlAndIds();
		
		this.getData();
		
		this.eventBind();
		
    	initTab.start(this.scope, -1); //底部导航
	},
	
	
	getUrlAndIds :function(){
    	
    	var self = this;
    	var arr = [];
    	if(commonFu.getUrlPublic(location.href).length == 2)
    	{
    		arr = commonFu.getUrlPublic(location.href);
	    	self.thisDetailPage = arr[0];
	    	self.thisDataId = arr[1];
    	}
    	

    },
	
	
	getData : function(){
		
		var self = this;
		$(".container").css({"opacity":"0"});

		var params = {};
		params.informationId = self.thisDataId;
		
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_INFORMATION_INFO, params, function(data){

            if(!commonFu.isEmpty(data.informationInfo))
            {   
				
//          	self.informationContent = data.informationInfo.content;
//              self.scope.informationContent = self.informationContent;
                self.informationSummny = data.informationInfo.summary;
            	self.informationTitle = data.informationInfo.title;
            	self.informationTime = data.informationInfo.createTime;
            	self.informationTime = commonFu.getFormatDate(self.informationTime,1)
	    		$("#preImages").append(data.informationInfo.content);
	    		self.shareInfo.img = data.informationInfo.cover;
	    		if(!commonFu.isEmpty(data.informationInfo.summary))
	    		{
	    			self.shareInfo.content = commonFu.returnRightReg(data.informationInfo.summary).substr(0,63);
	    		}
	    		else
	    		{
	    			self.shareInfo.content = commonFu.returnRightReg(data.informationInfo.content).substr(0,63);
	    		}
	    		
	    		self.shareInfo.title =  commonFu.returnRightReg(data.informationInfo.title);
//	    		
//	    		alert("title"+self.shareInfo.title)
//	    		alert("content"+self.shareInfo.content)
            }
             
//          alert($("#preImages").html())
//          
//	    	if($("#preImages").find("embed")[0].src == "http://192.168.0.88:8082/auction/uploads/video/1495423990_59225bf6b784e.mp4")
//	    	{
//	    		$("#preImages").find("video").attr("width","100px");
//	    		alert(333)
//	    	}
//          setTitle(data.informationInfo.title);
            self.scope.informationSummny = self.informationSummny;
            self.scope.informationTitle = self.informationTitle;
            self.scope.informationTime = self.informationTime;
  		    self.scope.messageCenterModel = self.messageCenterModel;
  		    $(".container").css("opacity","1");
  		    self.setShareTimeLine();
	    	self.scope.$apply();
	    	
    	});
//		function setTitle(title){
//			
//			 document.title = title + " - 雅玩之家";
//		};
		
	},
	
	
	eventBind : function(){
		
		var self = this;
		
	},
	
	
	 /**
	 * 设置二次分享
	 */
	setShareTimeLine : function()
	{    
		var self = this;
        
		wx.config({
		    debug: false,
		    appId: self.wxParams.appId,
		    timestamp: self.wxParams.timestamp,
		    nonceStr: self.wxParams.nonceStr,
		    signature: self.wxParams.signature,
		    jsApiList: [
				'onMenuShareTimeline',	// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
				'onMenuShareAppMessage',  // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
		    ]
		});
	
		wx.ready(function(){
			
		
		        var srcList = [];
		        $.each($('#preImages img'),function(i,item){
		            if(item.src) {
		                srcList.push(item.src);
		                $(item).click(function(e){
		                
		                    wx.previewImage({
		                        current: this.src,
		                        urls: srcList
		                    });
		                });
		            }
		        });
		    
			//普通 分享到微信好友
			wx.onMenuShareAppMessage({
			    title: self.shareInfo.title, // 分享标题
			    desc: self.shareInfo.content, // 分享描述
			    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: self.shareInfo.img, // 分享图标
			    success: function () { 
//			        $dialog.msg("已分享");// 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        $dialog.msg("已取消");// 用户取消分享后执行的回调函数
			    }
			});
			
			//普通 分享到微信朋友圈
			wx.onMenuShareTimeline({
			    title: self.shareInfo.title, // 分享标题
			    desc: self.shareInfo.content, // 分享描述
			    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: self.shareInfo.img, // 分享图标
			    success: function () { 
//			        $dialog.msg("已分享");// 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        $dialog.msg("已取消");// 用户取消分享后执行的回调函数
			    }
			});
			
		})
		
	},
};
