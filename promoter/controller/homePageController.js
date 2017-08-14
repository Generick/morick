
app.controller('HomeCtr',function($scope){
	
	HomeCtr.init($scope)
})

var HomeCtr = {
	
	scope : null,
	
	personalName : '',
	
	userId : null,
	
	waitCheckAmount : null,
	
	invitedNum : null,
	
	erWeiUrl : '',
	
	init:function($scope){
		
		this.scope = $scope;
		

		$(".animation3").css("display","block")
		
		this.initData();
		
		this.eventBind();
	},
	
	initData : function(){
		
		var self = this;
		var params = {};
		
		params.userId = localStorage.getItem(localStorageKey.userId);
	
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_PROMOTER_GET_SELF, params,function(data){
        	 	
//              console.log(JSON.stringify(data))
        	    self.personalName = data.info.name;
        	    self.waitCheckAmount = data.info.waitCheckAmount;
        	    self.invitedNum = data.info.invitedNum;
        	    self.erWeiUrl = data.info.url;
        	    self.scope.waitCheckAmount = self.waitCheckAmount;
        	    self.scope.invitedNum = self.invitedNum;
        	    self.scope.personalName = self.personalName;
        	   
        	 	self.createErWeiCode(self.erWeiUrl);
                self.scope.$apply()
        	 	
              
        })
		
	},
	
	
	
	eventBind : function(){
		
		var self = this;
		
		
		self.scope.exitHome = function(){
			localStorage.removeItem(localStorageKey.SESSIONID);
        	localStorage.removeItem(localStorageKey.TOKEN);
        	localStorage.removeItem(localStorageKey.userId);
			location.href = pageUrl.LOGIN_PAGE;
		};
		
		self.scope.toErWeiPage = function(){
			
			localStorage.setItem(localStorageKey.urlStr,encodeURI(self.erWeiUrl));
			localStorage.setItem("personPushName",encodeURI(self.personalName));
			location.href = pageUrl.ERWEICODE;
		};
		self.scope.toMyPic = function(){
			
			localStorage.setItem(localStorageKey.urlStr,encodeURI(self.erWeiUrl));
			localStorage.setItem("personPushName",encodeURI(self.personalName));
			location.href = pageUrl.MY_PUSH_PIC;
		};
	
		
		self.scope.toPushList = function(){
			
			location.href = pageUrl.PUSH_LIST;
		};
		
		
		self.scope.toMyOwn = function(){
			
			location.href = pageUrl.MY_OWN_DETAIL;
		}
	},
	
	
	
	createErWeiCode : function(urlstr){
		
		var self = this;
		
		        
			    var  parameter = urlstr.split("PMTID=")[1];
				var  stra = urlstr.split("?PMTID=")[0];
				var  nameter = self.personalName;
			
				var obj =new Base64();
				var para = obj.encode(parameter);
				var name = obj.encode(nameter);
		//		str = "192.168.0.163/auction/login.html";
				var str = stra +"?PMTID=" + para + "&name=" + name;
				
				str = encodeURI(str);
				
				str = self.changeCode(str);
				
		   	   if(str != '' && str != null)
		   	   {    
			   	   	if($("canvas").length > 0)
		            {
		
		            	$("#qrcode canvas:first-of-type").remove();
		            	
		            }
		            else{}
		            
		         
				         $("#qrcode").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "220",               //二维码的宽度
				            height : "200",              //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
				   
		            
//		   	   	    jQuery('#qrcode').qrcode({width: 200,height: 200,text: str});
		   	   }
		   	   else{
		   	   	  
		   	   	  $dialog.msg("参数错误！");
		   	   	  location.href = pageUrl.LOGIN_PAGE;
		   	   }
		   	   
					$(".container3").css("opacity",1);
					$(".animation3").css("display","none");
	
	},
	
	
	changeCode : function(str){
		
		var self = this;
		  
		    var out, i, len, c;     
		    out = "";     
		    len = str.length;     
		    for(i = 0; i < len; i++) {     
		    c = str.charCodeAt(i);     
		    if ((c >= 0x0001) && (c <= 0x007F)) {     
		        out += str.charAt(i);     
		    } else if (c > 0x07FF) {     
		        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));     
		        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));     
		        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));     
		    } else {     
		        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));     
		        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));     
		    }     
		    }    
		    return out;     
  
	},
}
