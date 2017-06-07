

var elegantController = 
{
	scope : null,
	
	isMaps : true,
	
	Type : 0,
	
	isShowIframS : false,
	
	isAbleToSend : localStorage.getItem("isAbleToSend"),
	
//	isAsuper : false,
	
	isSelected : false,
	
	informationId : null,
//	
//	wapVideoHref : '',
//	
	informationList : [],
	
	selectedIds : [],
	
	infoTitle : '', 
	
	infoAbstract : '',
	
//	isLocalVideo : -1,
	
//	localVideoHref : '',
	
	imgUrl : '',
	
	isAdd : false,
	
	elegantModel :{
		
		editor : '',
		video : ''
	},
    
	
	init : function($scope){
		
		this.scope = $scope;
		
		this.scope.imgUrl = this.imgUrl;
		
		this.scope.isMaps = this.isMaps;
		
		this.scope.infoTitle  = this.infoTitle, 
	
	    this.scope.infoAbstract =  this.scope.infoAbstract;
		
		this.scope.isShowIframS = this.isShowIframS;
		
		this.scope.isAbleToSend = this.isAbleToSend;
		
		this.getData();
		
		this.eventBind();
	},
	
	
	getData : function(){
		
		var self = this;
		
		var self = this;
      
        pageController.pageInit(self.scope,api.API_GET_INFORMATION_LIST,{},function(data){
        	
        	if(self.scope.page.selectPageNum)
            {
                var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                pageController.pageNum(totalPage);
            }
            self.informationList = data.informationList;
            for(var i = 0; i < self.informationList.length; i++)
            {
            	
            	self.informationList[i].selected = false;
            	
            }
             
            self.scope.isSelected = self.isSelected;
            self.scope.informationList= self.informationList;
            self.scope.$apply();
        })
	
	},
	
	
	eventBind : function(){
		
		var self = this;
		
		//发布或取消发布
		self.scope.sendMessage = function(item){
			
			var params = {};
			params.informationId = item.id;
			
			
			$data.httpRequest("post", api.API_SET_INFORMATION_LIST, params, function(data){
				
				if(item.isRelease == 0)
				{   
					
					layer.msg("已发布！", {time: 1600, anim: 5});
				}
				else
				{
					layer.msg("已取消发布！", {time: 1600, anim: 5});
				}
				self.getData();
			
			})
			
		};
		
//		
//		self.scope.changeType = function(type){
//			
//			if(type == 0)
//			{   
//				
//				self.isShowIframS = false;
//				self.scope.isShowIframS = self.isShowIframS;
//				$("#map-mes").addClass("round-box-selecting");
//				$("#video-mes").removeClass("round-box-selecting");
//				self.isMaps = true;
//				self.Type = 0;
//				self.localVideoHref = '';
//				self.scope.localVideoHref = self.localVideoHref;
//				self.wapVideoHref = '';
//				self.scope.wapVideoHref = self.wapVideoHref;
//				self.isLocalVideo = -1;
//				self.scope.isLocalVideo =  self.isLocalVideo;
//			}
//			else
//			{
//				
//			    self.isLocalVideo = 1;
//			    self.scope.isLocalVideo = self.isLocalVideo;
//				$("#video-mes").addClass("round-box-selecting");
//				$("#map-mes").removeClass("round-box-selecting");
//				self.isMaps = false;
//				
//				self.elegantModel.editor = '';
//				self.scope.elegantModel.editor = self.elegantModel.editor;
//			}
//			self.scope.isMaps = self.isMaps;
//          
//          
//          
//          if(self.isLocalVideo == 0)
//          {   
//          	self.isShowIframS = false;
//		        self.scope.isShowIframS =  self.isShowIframS;
//          	self.Type = 2;
//          	$("#wap-href").removeClass("round-box-selecting");
//          	$("#href-video").addClass("round-box-selecting");
//				$("#local-video").removeClass("round-box-selecting");
//          }
//          if(self.isLocalVideo == 1)
//          {   
//          	self.isShowIframS = false;
//		        self.scope.isShowIframS =  self.isShowIframS;
//          	self.Type = 1;
//          	$("#wap-href").removeClass("round-box-selecting");
//          	$("#local-video").addClass("round-box-selecting");
//				$("#href-video").removeClass("round-box-selecting");
//				
//          }
//          
//          if(self.isLocalVideo == 2)
//          {
//          	self.Type = 3;
//          	$("#wap-href").addClass("round-box-selecting");
//          	$("#local-video").removeClass("round-box-selecting");
//				$("#href-video").removeClass("round-box-selecting");
//          }
//          self.scope.isLocalVideo = self.isLocalVideo;
//          
//          
//		};
//		
//		self.scope.changeVideoType = function(type){
//			
//			
//			if(type == 0)
//			{
//				
//				self.isShowIframS = false;
//		        self.scope.isShowIframS =  self.isShowIframS;
//				$("#wap-href").removeClass("round-box-selecting");
//				$("#local-video").addClass("round-box-selecting");
//				$("#href-video").removeClass("round-box-selecting");
//				self.isLocalVideo = 1;
//				self.Type = 1;
//				if(!_utility.isEmpty(self.scope.localVideoHref))
//				{  
//
//					self.elegantModel.video =   $("#local-inp").val();
//					self.scope.elegantModel.video = self.elegantModel.video;
//					self.localVideoHref = self.scope.elegantModel.video;
//					self.scope.localVideoHref = self.localVideoHref;
//					$("#uplo-videos").attr("src",self.scope.localVideoHref);
//
//				}
//
//			}
//			else if(type == 1)
//			{  
//				self.isShowIframS = false;
//		        self.scope.isShowIframS =  self.isShowIframS;
//				$("#wap-href").removeClass("round-box-selecting");
//				$("#href-video").addClass("round-box-selecting");
//				$("#local-video").removeClass("round-box-selecting");
//				self.isLocalVideo = 0;
//				self.Type = 2;
//				if(!_utility.isEmpty(self.scope.elegantModel.video))
//				{   
//
//			
//					self.localVideoHref =  self.scope.elegantModel.video;
//					self.scope.localVideoHref = self.localVideoHref;
//					self.elegantModel.video  = self.scope.localVideoHref;
//					self.scope.elegantModel.video = self.elegantModel.video;
//
//				}
//
//			}
//			else
//			{
//				
//				$("#wap-href").addClass("round-box-selecting");
//				$("#href-video").removeClass("round-box-selecting");
//				$("#local-video").removeClass("round-box-selecting");
//				self.isLocalVideo = 2;
//				self.Type = 3;
//				self.scope.wapVideoHref = self.wapVideoHref;
//				self.localVideoHref =  "";
//				self.scope.localVideoHref = self.localVideoHref;
//				self.elegantModel.video  = self.scope.localVideoHref;
//				self.elegantModel.video  = self.scope.wapVideoHref; 
//				self.scope.elegantModel.video = self.elegantModel.video;
//			}
//			self.scope.isLocalVideo = self.isLocalVideo;
//		};
		
		
		self.scope.onClickToAddGoods = function(){
			
			self.resetAllData();
			
			self.elegantModel  = {
		    
				editor : '',
				video : ''
		    };
		    
		    
		    
//		    self.wapVideoHref = "";
//		    self.scope.wapVideoHref =  self.wapVideoHref;
		    self.scope.elegantModel = self.elegantModel;
		    $("#uplo-videos").attr("src",'');
			self.showView(1);
			self.isAdd = true;
		};
		
		
		self.scope.onClickSelectAll = function()
    	{   
    		
    		self.isSelected = !self.isSelected;
			self.scope.isSelected = self.isSelected;

			for(var i = 0 ; i < self.informationList.length ; i ++)
			{
				self.informationList[i].selected = self.isSelected;
			}
    	};
    	
    	//单选
    	self.scope.onClickItemSelected = function(id)
    	{
    		
    		for(var i = 0 ; i < self.informationList.length ; i ++)
			{
				if(self.informationList[i].id == id)
				{  
					self.informationList[i].selected = !self.informationList[i].selected;
				}
			}
			
			self.checkSelectAll();
    	};
    	
        //点击删除藏品
    	self.scope.onClickToDeleteGoods = function()
    	{
            
            var idArr = [];
            for(var j = 0; j < self.informationList.length; j ++)
            {
            	if(self.informationList[j].selected)
            	{
            		idArr.push(self.informationList[j].id)
            	}
            }
            if(!_utility.isEmpty(idArr))
            {
            	self.selectedIds = idArr;
            	$("#all-fixed-table-goods").css({"display":"block"}) 
            }
            else
            {
            	 layer.msg("请勾选！", {time: 1600, anim: 5});
            }
           
        };
    	
    	self.scope.yesToDelete = function(type){
        	
        	if(type == 0)
        	{
        		$("#all-fixed-table-goods").css({"display":"none"});
        		self.isSelected = false;
        		self.scope.isSelected = self.isSelected;
        		 for(var i = 0; i < self.informationList.length; i++)
	            {
	            	
	            	self.informationList[i].selected = false;
	            	
	            }
        	}
        	 else
        	 {
        	 	
        	 	var params = {};
        	 	params.informationIds = JSON.stringify(self.selectedIds);
        	 	$data.httpRequest("post", api.API_DELETE_INFORMATION, params, function(data){
	                   
	                    layer.msg("已删除！", {time: 1600, anim: 5});
	                  
	                    self.resetAllData();
	                    self.isSelected = false;
        		        self.scope.isSelected = self.isSelected;
        		         for(var i = 0; i < self.informationList.length; i++)
			            {
			            	
			            	self.informationList[i].selected = false;
			            	
			            }
        		        self.getData();
        		        $("#all-fixed-table-goods").css({"display":"none"});
				})
        	 	
        	 	
        	 }
        	
        	
        };
        
        
        self.scope.modified = function(id){
        	
        	self.informationId = id;
        	self.isAdd = false;
        	self.showView(1);
//      	self.elegantModel.video = "";
//		    self.scope.elegantModel = self.elegantModel;
		    $("#uplo-videos").attr("src",'');
        	self.getInformationInfo();
        	
        };
        
        self.scope.onClickBack = function(){
        	
        	
        	self.showView(0);
            self.resetAllData();
        };
		
		
		
		self.scope.canOnlySeven = function(){
			
			var erq = /^([\u4e00-\u9fa5]{1,50}|[a-zA-Z]{1,100})$/g;
			
			if(!erq.test($(".scr-max-fifty").val().trim()))
			{   
				$(".scr-max-fifty").val($(".scr-max-fifty").val().substr(0,50));
			
			}
			
		};
		
//		self.scope.showTheIframe = function(){
//			
//		
//			if(_utility.isEmpty(self.scope.wapVideoHref))
//			{
//				layer.msg("请输入正确的通用代码！", {time: 1600, anim: 5});
//				
//				return;
//			}
//			var reg = /src=\"([^\"]*?)\"/gi;
//	    	var cont = self.scope.wapVideoHref.trim().match(reg);
//	    	var src = "";
//	    	if(cont == null)
//	    	{   
//	    		
//	    		var reg2 = /src=\'([^\']*?)\'/gi;
//	    		cont = self.scope.wapVideoHref.trim().match(reg2);
//	    		
//	    	}
//	    	
//	    	if(_utility.isEmpty(cont) || cont.length < 1)
//	    	{  
//	    		layer.msg("请输入正确的通用代码！", {time: 1600, anim: 5});
//	    		return;
//	    	}
//	    	for(var i= 0;i<cont.length;i++)
//	    	{ 
//
//              src  = RegExp.$1
//
//	    	}
//	      
//          if(src.substr(0,4) == "http")
//          {
//          	
//          	self.isShowIframS = true;
//			    self.scope.isShowIframS = self.isShowIframS;
//			    $("#preShowIframe").prop("src",src)
//          }
//	    	else
//	    	{
//	    		layer.msg("请输入正确的通用代码！", {time: 1600, anim: 5});
//	    	}
//			 
//		};
		
		
//		self.scope.hideTheIframe = function()
//		{
//			self.isShowIframS = false;
//			self.scope.isShowIframS = self.isShowIframS;
//		    $(".preShowIframe").prop("src",'')
//		};
//		
//		
		self.scope.onClickSubmit = function(){
			if(self.isAdd)
			{
				var params = {};
				params.type = self.Type;
				params.title = self.scope.infoTitle;
				
				params.cover = self.scope.imgUrl;
			    params.summary = self.scope.infoAbstract;
			    
				if(_utility.isEmpty(params.title))
				{
					layer.msg("标题不能为空！", {time: 1600, anim: 5});
					return;
					
				}
				if(_utility.isEmpty(params.cover))
				{
					layer.msg("封面图不能为空！", {time: 1600, anim: 5});
					return;
				}
				if(params.type == 0)
				{
					params.content =  self.scope.elegantModel.editor;
					
					if(_utility.isEmpty(params.content))
					{
						layer.msg("内容不能为空！", {time: 1600, anim: 5});
						return;
					}
				}
//				else
//				{
//					if(self.isLocalVideo == 0)
//					{
//						params.content = self.scope.localVideoHref.trim();
//						if(_utility.isEmpty(params.content))
//						{
//							layer.msg("链接不能为空！", {time: 1600, anim: 5});
//							return;
//						}
//					}
//		            else if(self.isLocalVideo == 1)
//		            {
//		            	params.content = self.scope.elegantModel.video.trim();
//		            	if(_utility.isEmpty(params.content))
//						{
//							layer.msg("请上传视频！", {time: 1600, anim: 5});
//							return;
//						}
//		            }
//		            else if(self.isLocalVideo == 2)
//		            {
//		            	params.content = self.scope.wapVideoHref.trim();
//						if(_utility.isEmpty(params.content))
//						{
//							layer.msg("通用代码不能为空！", {time: 1600, anim: 5});
//							return;
//						}
//		            }
//				}
				
		
				$data.httpRequest("post", api.API_ADD_INFORMATION_LIST, params, function(data){
	                    layer.msg("添加！", {time: 1600, anim: 5});
	                    self.showView(0);
	                    self.resetAllData();
	                    self.getData();
				})
			}
			else
			{
				
				var params = {};
				params.informationId = self.informationId;
				params.modInfo = {};
				params.modInfo.type = self.Type;
				params.modInfo.title = self.scope.infoTitle;
				params.modInfo.cover = self.scope.imgUrl;
				
				params.modInfo.summary   = self.scope.infoAbstract;
				if(_utility.isEmpty(params.modInfo.title))
				{
					layer.msg("标题不能为空！", {time: 1600, anim: 5});
					return;
					
				}
				if(_utility.isEmpty(params.modInfo.cover))
				{
					layer.msg("封面图不能为空！", {time: 1600, anim: 5});
					return;
					
				}
				if(self.Type == 0)
				{
					params.modInfo.content =  self.scope.elegantModel.editor;
					if(_utility.isEmpty(params.modInfo.content))
					{
						layer.msg("内容不能为空！", {time: 1600, anim: 5});
						return;
					}
				}
//				else
//				{
//					if(self.isLocalVideo == 0)
//					{
//						params.modInfo.content = self.scope.localVideoHref.trim();
//						if(_utility.isEmpty(params.modInfo.content))
//						{
//							layer.msg("链接不能为空！", {time: 1600, anim: 5});
//							return;
//						}
//					}
//		            else if(self.isLocalVideo == 1)
//		            {
//		            	params.modInfo.content = self.scope.elegantModel.video.trim();
//		            	if(_utility.isEmpty(params.modInfo.content))
//						{
//							layer.msg("请上传视频！", {time: 1600, anim: 5});
//							return;
//						}
//		            }
//		            else if (self.isLocalVideo == 2)
//		            {
//		            	
//						params.modInfo.content = self.scope.wapVideoHref.trim();
//						if(_utility.isEmpty(params.modInfo.content))
//						{
//							layer.msg("通用代码不能为空！", {time: 1600, anim: 5});
//							return;
//						}
//		
//		            }
//				}
				
				params.modInfo = JSON.stringify(params.modInfo);
				
				
				$data.httpRequest("post", api.API_MOD_INFORMATION_LIST, params, function(data){
	                 layer.msg("修改成功！", {time: 1600, anim: 5});
	                 self.showView(0);
	                 self.resetAllData();
	                 self.getData();
				})
			}
			
		};
		
		
		
		self.scope.preview = function() {
        	
        	var nowTime =  commonFn.getNowFormatDate();
        	if(self.isMaps == false){
        		layer.msg("视频类资讯不能预览！", {time: 1600, anim: 5});
        		return;
        	}
        	if(_utility.isEmpty(self.scope.infoTitle))
        	{
        		layer.msg("请填写标题！", {time: 1600, anim: 5});
        		return;
        	}
        	if(_utility.isEmpty(self.scope.imgUrl))
        	{
        		layer.msg("请上传封面！", {time: 1600, anim: 5});
        		return;
        	}
        	if(_utility.isEmpty(self.scope.elegantModel.editor))
        	{   
        		layer.msg("请填写内容！", {time: 1600, anim: 5});
        		return;
        	}
        	
        	$(".prew-title").html(self.scope.infoTitle);
        	$(".prew-time").html(nowTime);
        	$(".prew-rich-box").html(self.scope.elegantModel.editor);
        	
        	$(".preview-content").css("display","block")
			$(".close-fixed").css("display","block")
			$(".preview-box").css("display","block")
        	
        };
		
		self.scope.closeFixed = function(){
			
			
			$(".preview-content").css("display","none")
			$(".close-fixed").css("display","none")
			$(".preview-box").css("display","none")
		};
		
	},
	
	
	
	checkSelectAll : function()
	{
		var isSelectAll = true;
		for (var i = 0; i < this.informationList.length; i++)
		{
			if (!this.informationList[i].selected)
			{
				isSelectAll = false;
				break;
			}
		}

		this.scope.isSelected = isSelectAll;
	},
	
	//显示和隐藏
    showView : function(index)
    {
    	$(".item").hide();
    	$(".item").eq(index).show();
    },
	
	
	getInformationInfo : function(){
		var self = this;
		
		
		var params = {};
		params.informationId = self.informationId;
		
		$data.httpRequest("post", api.API_GET_INFORMATION_DETAIL, params, function(data){
	               
	        self.infoTitle = data.info.title;
	        self.infoAbstract = data.info.summary;
	      
	       
	        
	        self.imgUrl =  data.info.cover;
	        if(data.info.type == 0)
	        {    
	        	
	        	$("#map-mes").addClass("round-box-selecting");
				$("#video-mes").removeClass("round-box-selecting");
				$("#wap-href").removeClass("round-box-selecting");
				self.isMaps = true;
				self.Type = 0;
//				self.localVideoHref = '';
//				self.scope.localVideoHref = self.localVideoHref;
//				self.wapVideoHref = "";
//	        	self.scope.wapVideoHref = self.wapVideoHref;
	        	self.elegantModel.editor = data.info.content;
	        	self.scope.isMaps = self.isMaps;
	        	self.scope.elegantModel.editor = self.elegantModel.editor;
	        	self.isShowIframS = false;
		        self.scope.isShowIframS =  self.isShowIframS;
	        }
//	        else
//	        {
//	        	if(data.info.type == 1)
//	        	{
//	        		$("#video-mes").addClass("round-box-selecting");
//					$("#map-mes").removeClass("round-box-selecting");
//		        	self.isMaps  = false;
//		        	self.Type = 1;
//		        	self.elegantModel.video = data.info.content;
//		        	self.localVideoHref = data.info.content;
//		        	self.isLocalVideo = 1;
//		        	$("#local-video").addClass("round-box-selecting");
//					$("#href-video").removeClass("round-box-selecting");
//					$("#wap-href").removeClass("round-box-selecting");
//				    self.wapVideoHref = "";
//		        	self.scope.wapVideoHref = self.wapVideoHref;
//		        	self.scope.isMaps = self.isMaps;
//		        	self.scope.elegantModel.video  = self.elegantModel.video;
//		        	self.scope.localVideoHref = self.localVideoHref;
//		        	self.scope.isLocalVideo = self.isLocalVideo;
//		        	$("#uplo-videos").attr("src",self.scope.localVideoHref);
//		        	self.isShowIframS = false;
//		            self.scope.isShowIframS =  self.isShowIframS;
//	        	}
//	        	else if(data.info.type == 2)
//	        	{
//	        		$("#video-mes").addClass("round-box-selecting");
//					$("#map-mes").removeClass("round-box-selecting");
//		        	self.isMaps  = false;
//		        	self.Type = 2;
//		        	self.elegantModel.video = data.info.content;
//		        	self.localVideoHref = data.info.content;
//		        	self.isLocalVideo = 0;
//		        	$("#local-video").removeClass("round-box-selecting");
//					$("#href-video").addClass("round-box-selecting");
//					$("#wap-href").removeClass("round-box-selecting");
//				    self.wapVideoHref = "";
//		        	self.scope.wapVideoHref = self.wapVideoHref;
//		        	self.scope.isMaps = self.isMaps;
//		        	self.scope.elegantModel.video  = self.elegantModel.video;
//		        	self.scope.localVideoHref = self.localVideoHref;
//		        	self.scope.isLocalVideo = self.isLocalVideo;
//		        	$("#uplo-videos").attr("src",self.scope.localVideoHref);
//		        	self.isShowIframS = false;
//		            self.scope.isShowIframS =  self.isShowIframS;
//	        	}
//	        	else
//	        	{
//	        		$("#video-mes").addClass("round-box-selecting");
//					$("#map-mes").removeClass("round-box-selecting");
//		        	self.isMaps  = false;
//		        	self.Type = 3;
//		        	self.elegantModel.video = "";
//		        	self.localVideoHref = "";
//		        	self.isLocalVideo = 2;
//		        	$("#local-video").removeClass("round-box-selecting");
//					$("#href-video").removeClass("round-box-selecting");
//				    $("#wap-href").addClass("round-box-selecting");
//		        	self.scope.isMaps = self.isMaps;
//		        	self.scope.elegantModel.video  = "";
//		        	self.scope.localVideoHref = "";
//		        	self.scope.isLocalVideo = self.isLocalVideo;
//		        	self.wapVideoHref = data.info.content;
//		        	self.scope.wapVideoHref = self.wapVideoHref;
//		        	$("#uplo-videos").attr("src",'');
//	        	}
//				
//	        }
	       
	        self.scope.imgUrl = self.imgUrl;
	        
	        self.scope.infoAbstract = self.infoAbstract;
	        self.scope.infoTitle = self.infoTitle;
	        self.scope.$apply()
	    })
		
	},
	
	resetAllData : function(){
		var self = this;
		
		self.isMaps  =  true,
	   
	    self.Type = 0;
	   
		self.isSelected = false,
		
		self.informationId  = null,
		
		self.selectedIds  = [],
		
		self.infoAbstract = '';
		
		self.infoTitle  =  '',
//		
//		self.isLocalVideo  = -1,
//		
//		self.localVideoHref  = '',
		
		self.imgUrl  = '',
		
		self.isAdd  = false,
		
//		self.isShowIframS = false;
//		self.scope.isShowIframS =  self.isShowIframS;
//		
		self.elegantModel  = {
		
			editor : '',
			video : ''
		};
		self.scope.Type = self.Type;
		self.scope.isMaps = self.isMaps;
//		$("#map-mes").addClass("round-box-selecting");
//		$("#video-mes").removeClass("round-box-selecting");
//      self.wapVideoHref = "";
//      self.scope.wapVideoHref = self.wapVideoHref;
		self.scope.isSelected =  self.isSelected;
		self.scope.informationId =  self.informationId;
		self.scope.selectedIds =  self.selectedIds;
		self.scope.infoTitle =  self.infoTitle;
		
		self.scope.infoAbstract = self.infoAbstract;
//		self.scope.isLocalVideo =  self.isLocalVideo;
//		self.scope.localVideoHref =  self.localVideoHref;
		self.scope.imgUrl =  self.imgUrl;
		self.scope.isAdd =  self.isAdd;
		document.getElementById("file-form-3").reset();
		self.scope.elegantModel =  self.elegantModel;
//		self.scope.$apply();
	}
	
};
