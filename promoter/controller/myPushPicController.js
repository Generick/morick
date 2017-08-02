app.controller('myPushPicCtr',function($scope){
	
	myPushPicCtr.init($scope)
})

var myPushPicCtr = {
	
	myPicArr : [
	   "img/fir.jpg",
	   "img/sec.jpg",
	   "img/thi.jpg",
	   "img/fou.jpg",
	   "img/fiv.jpg",
	],
	
	scope : null,
	
	init : function($scope){
		
		$(".animation3").css("display","block");
        $(".container3").css("opacity",1)
   
		
		this.scope = $scope;
		
		this.scope.myPicArr = this.myPicArr;
		
		this.getData();
		
		this.eventBind();
		
		this.ngRepeatFinish();
	},
	
	
	getData : function(){
		
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
		
		            	$("#qrcodefir canvas:first-of-type").remove();
		            	$("#qrcodesec canvas:first-of-type").remove();
		            	$("#qrcodethi canvas:first-of-type").remove();
		            	$("#qrcodefou canvas:first-of-type").remove();
		            	$("#qrcodefiv canvas:first-of-type").remove();
		            	
		            }
		            else{}
//		   	   	    jQuery('#qrcode').qrcode({width: 200,height: 200,text: str});
                        $("#qrcodefir").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "68",               //二维码的宽度
				            height : "68",              //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
				          $("#qrcodesec").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "68",               //二维码的宽度
				            height : "68",              //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
				          $("#qrcodethi").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "68",               //二维码的宽度
				            height : "68",               //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
				          $("#qrcodefou").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "52",               //二维码的宽度
				            height : "52",              //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
				          $("#qrcodefiv").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "70",               //二维码的宽度
				            height : "70",              //二维码的高度
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
	
	eventBind : function(){
		var self = this;
		
		self.scope.toInit = function(){
			
			
			
		};
	},
	
	ngRepeatFinish: function() {
        var self = this;

//      self.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
//              autoplay: 3000,
//				loop:true,
                autoplayDisableOnInteraction: false,
                prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
            });
           
//      });
    }
}
