app.controller('erWeiCtr',function($scope){
	
	erWeiCtr.init($scope)
})

var erWeiCtr = {
	
	scope : null,
	
	init : function($scope){
		
		this.scope = $scope;
		$(".animation3").css("display","block");
		
		this.getDate();
		
	},
	
	getDate : function(){
		var self = this;
		
		var urlstr = localStorage.getItem(localStorageKey.urlStr);
		if(urlstr == null)
		{
			$dialog.msg("您还未登录，请先登录！");
					setTimeout(function(){
						
						location.href = pageUrl.LOGIN_PAGE;
						
		    },1200)
		}
		else{
			   var  parameter = urlstr.split("PMTID=")[1];
				var  stra = urlstr.split("?PMTID=")[0];
				
				var obj =new Base64();
				var para = obj.encode(parameter);
		//		str = "192.168.0.163/auction/login.html";
				var str = stra +"?PMTID=" + para;
				str = encodeURI(str);
		//		alert(str)
		   	   if(str != '' && str != null)
		   	   {    
			   	   	if($("canvas").length > 0)
		            {
		
		            	$("#qrcode canvas:first-of-type").remove();
		            	
		            }
		            else{}
//		   	   	    jQuery('#qrcode').qrcode({width: 200,height: 200,text: str});
                        $("#qrcode").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "220",               //二维码的宽度
				            height : "200",              //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
		   	   }
		   	   else{
		   	   	  
		   	   	  $dialog.msg("参数错误！");
		   	   	  location.href = pageUrl.LOGIN_PAGE;
		   	   }
		   	   
		   	   
					$(".container3").css("opacity",1);
					$(".animation3").css("display","none");
		}
		
	},
}