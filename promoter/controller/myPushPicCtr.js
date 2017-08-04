
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
			    var min_size = Math.min(w, h);
			    if (r > min_size / 2) r = min_size / 2;
			    // 开始绘制
			    this.beginPath();
			    this.moveTo(x + r, y);
			    this.arcTo(x + w, y, x + w, y + h, r);
			    this.arcTo(x + w, y + h, x, y + h, r);
			    this.arcTo(x, y + h, x, y, r);
			    this.arcTo(x, y, x + w, y, r);
			    this.closePath();
			    return this;
}
function  justDoIt1(){
	        var data={
						name:"ihge",
						shopname:"中国五粮液",
						image:["img/first.png",""]
					},imgPath;
				
                 data.image[1] = $("#showIds_01").get(0).src;
			   
	         
	 function draw(){
				var mycanvas= document.getElementById('canvas1');
				document.body.appendChild(mycanvas);
				var len=data.image.length;
				mycanvas.width= parseInt(document.body.clientWidth)*2;
//				alert(mycanvas.width)
				mycanvas.height= parseInt(myPushPicCtr.heih_01)*2;
				if(mycanvas.getContext){
					var context=mycanvas.getContext('2d');
			
					var h=0;
					function drawing(num){
						if(num<len){
							var img=new Image;
							img.src=data.image[num];
							if(num==0){
								img.onerror=function(){
									context.fillStyle='#fff';
									context.stokeStyle='#dfdfdf';
									context.fillRect(0,0,100,100);
									context.strokeRect(0,0,100,100);
									context.font='24px 微软雅黑';
									context.textAlign='center';
									context.textBaseline='middle';
									context.fillStyle='#333';
									context.fillText('LOGO',70,70);
									drawing(num+1);
								}
								img.onload=function(){
									context.drawImage(img,0,0,mycanvas.width,mycanvas.height);
									drawing(num+1);
								}
							}
							else if(num==1){
								img.onerror=function(){
									h=140;
									drawing(num+1);
								}
								img.onload=function(){
									context.drawImage(img,mycanvas.width*0.66,mycanvas.height*0.42,mycanvas.height*0.28,mycanvas.height*0.28);
									h=440;
									drawing(num+1);
								}
							}		
						}else{
							imgPath= mycanvas.toDataURL("image/png");
//							alert(imgPath)
							document.getElementById('img1').src=mycanvas.toDataURL("image/png");
						}
					}
					drawing(0);
				}
			}
			
			draw(); 
	
	
}





function  justDoIt2(){
	        var data={
						name:"ihge",
						shopname:"中国五粮液",
						image:["img/second.png",""]
					},imgPath;
				
                 data.image[1] = $("#showIds_02").get(0).src;
			    
	
	 function draw(){
				var mycanvas= document.getElementById('canvas2');
				document.body.appendChild(mycanvas);
				var len=data.image.length;
				mycanvas.width= parseInt(document.body.clientWidth)*2;
//				alert(mycanvas.width)
				mycanvas.height= parseInt(myPushPicCtr.heih_02)*2;
				if(mycanvas.getContext){
					var context=mycanvas.getContext('2d');
			
					var h=0;
					function drawing(num){
						if(num<len){
							var img=new Image;
							img.src=data.image[num];
							if(num==0){
								img.onerror=function(){
									context.fillStyle='#fff';
									context.stokeStyle='#dfdfdf';
									context.fillRect(0,0,100,100);
									context.strokeRect(0,0,100,100);
									context.font='24px 微软雅黑';
									context.textAlign='center';
									context.textBaseline='middle';
									context.fillStyle='#333';
									context.fillText('LOGO',70,70);
									drawing(num+1);
								}
								img.onload=function(){
									context.drawImage(img,0,0,mycanvas.width,mycanvas.height);
									drawing(num+1);
								}
							}
							else if(num==1){
								img.onerror=function(){
									h=140;
									drawing(num+1);
								}
								img.onload=function(){
									context.drawImage(img,mycanvas.width*0.54,mycanvas.height*0.43,mycanvas.height*0.28,mycanvas.height*0.28);
									h=440;
									drawing(num+1);
								}
							}		
						}else{
							imgPath= mycanvas.toDataURL("image/png");
//							alert(imgPath)
							document.getElementById('img2').src=mycanvas.toDataURL("image/png");
						}
					}
					drawing(0);
				}
			}
			
			draw(); 
	
	
}



function  justDoIt3(){
	        var data={
						name:"ihge",
						shopname:"中国五粮液",
						image:["img/third.png",""]
					},imgPath;
			     
                 data.image[1] = $("#showIds_03").get(0).src;
			    
	
	 function draw(){
				var mycanvas= document.getElementById('canvas3');
				document.body.appendChild(mycanvas);
				var len=data.image.length;
				mycanvas.width= parseInt(document.body.clientWidth)*2;
//				alert(mycanvas.width)
				mycanvas.height= parseInt(myPushPicCtr.heih_03)*2;
				if(mycanvas.getContext){
					var context=mycanvas.getContext('2d');
			
					var h=0;
					function drawing(num){
						if(num<len){
							var img=new Image;
							img.src=data.image[num];
							if(num==0){
								img.onerror=function(){
									context.fillStyle='#fff';
									context.stokeStyle='#dfdfdf';
									context.fillRect(0,0,100,100);
									context.strokeRect(0,0,100,100);
									context.font='24px 微软雅黑';
									context.textAlign='center';
									context.textBaseline='middle';
									context.fillStyle='#333';
									context.fillText('LOGO',70,70);
									drawing(num+1);
								}
								img.onload=function(){
									context.drawImage(img,0,0,mycanvas.width,mycanvas.height);
									drawing(num+1);
								}
							}
							else if(num==1){
								img.onerror=function(){
									h=140;
									drawing(num+1);
								}
								img.onload=function(){
									context.drawImage(img,mycanvas.width*0.18,mycanvas.height*0.30,mycanvas.height*0.28,mycanvas.height*0.28);
									h=440;
									drawing(num+1);
								}
							}		
						}else{
							imgPath= mycanvas.toDataURL("image/png");
//							alert(imgPath)
							document.getElementById('img3').src=mycanvas.toDataURL("image/png");
						}
					}
					drawing(0);
				}
			}
			
			draw(); 
	
	
}




function  justDoIt4(){
	        var data={
						name:"ihge",
						shopname:"中国五粮液",
						image:["img/fouth.png",""]
					},imgPath;
				
                 data.image[1] = $("#showIds_04").get(0).src;
			    
	
	 function draw(){
				var mycanvas= document.getElementById('canvas4');
				document.body.appendChild(mycanvas);
				var len=data.image.length;
				mycanvas.width= parseInt(document.body.clientWidth)*2;
//				alert(mycanvas.width)
				mycanvas.height= parseInt(myPushPicCtr.heih_04)*2;
				if(mycanvas.getContext){
					var context=mycanvas.getContext('2d');
			
					var h=0;
					function drawing(num){
						if(num<len){
							var img=new Image;
							img.src=data.image[num];
							if(num==0){
								img.onerror=function(){
									context.fillStyle='#fff';
									context.stokeStyle='#dfdfdf';
									context.fillRect(0,0,100,100);
									context.strokeRect(0,0,100,100);
									context.font='24px 微软雅黑';
									context.textAlign='center';
									context.textBaseline='middle';
									context.fillStyle='#333';
									context.fillText('LOGO',70,70);
									drawing(num+1);
								}
								img.onload=function(){
									context.drawImage(img,0,0,mycanvas.width,mycanvas.height);
									drawing(num+1);
								}
							}
							else if(num==1){
								img.onerror=function(){
									h=140;
									drawing(num+1);
								}
								img.onload=function(){
									context.drawImage(img,mycanvas.width*0.42,mycanvas.height*0.80,mycanvas.height*0.20,mycanvas.height*0.19);
									h=440;
									drawing(num+1);
								}
							}		
						}else{
							imgPath= mycanvas.toDataURL("image/png");
//							alert(imgPath)
							document.getElementById('img4').src=mycanvas.toDataURL("image/png");
						}
					}
					drawing(0);
				}
			}
			
			draw(); 
	
	
}




function  justDoIt5(){
	        var data={
						name:"ihge",
						shopname:"中国五粮液",
						image:["img/fifth.png",""]
					},imgPath;
				
                 data.image[1] = $("#showIds_05").get(0).src;
			    
	
	 function draw(){
				var mycanvas= document.getElementById('canvas5');
				document.body.appendChild(mycanvas);
				var len=data.image.length;
				mycanvas.width= parseInt(document.body.clientWidth)*2;
//				alert(mycanvas.width)
				mycanvas.height= parseInt(myPushPicCtr.heih_05)*2;
				if(mycanvas.getContext){
					var context=mycanvas.getContext('2d');
			
					var h=0;
					function drawing(num){
						if(num<len){
							var img=new Image;
							img.src=data.image[num];
							if(num==0){
								img.onerror=function(){
									context.fillStyle='#fff';
									context.stokeStyle='#dfdfdf';
									context.fillRect(0,0,100,100);
									context.strokeRect(0,0,100,100);
									context.font='24px 微软雅黑';
									context.textAlign='center';
									context.textBaseline='middle';
									context.fillStyle='#333';
									context.fillText('LOGO',70,70);
									drawing(num+1);
								}
								img.onload=function(){
									context.drawImage(img,0,0,mycanvas.width,mycanvas.height);
									drawing(num+1);
								}
							}
							else if(num==1){
								img.onerror=function(){
									h=140;
									drawing(num+1);
								}
								img.onload=function(){
									context.drawImage(img,mycanvas.width*0.65,mycanvas.height*0.20,mycanvas.height*0.28,mycanvas.height*0.28);
									h=440;
									drawing(num+1);
								}
							}		
						}else{
							imgPath= mycanvas.toDataURL("image/png");
//							alert(imgPath)
							document.getElementById('img5').src=mycanvas.toDataURL("image/png");
						}
					}
					drawing(0);
				}
			}
			
			draw(); 
	
	
}

app.controller('myPushPicCtr',function($scope){
	
	myPushPicCtr.init($scope)
})

var myPushPicCtr = {
	
    heih_01 : null,
    
    heih_02: null,
    
    heih_03 : null,
    
    heih_04 : null,
    
    heih_05 : null,
    
	scope : null,
	
	init : function($scope){
		
		$(".animation3").css("display","block");
        $(".container3").css("opacity",0);
       
		
		this.scope = $scope;
		
		this.getData();
		
		this.eventBind();
		
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
				var str = stra +"?PMTID=" + para;
				str = encodeURI(str);
	
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
                        
                        
                        $("#qrcodefir").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "500",               //二维码的宽度
				            height : "500",              //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
				         
				          $("#qrcodesec").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "500",               //二维码的宽度
				            height : "500",              //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
				          $("#qrcodethi").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "500",               //二维码的宽度
				            height : "500",               //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
				          $("#qrcodefou").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "500",               //二维码的宽度
				            height : "500",              //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
				          $("#qrcodefiv").qrcode({
				            render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				            text : str,    //扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				            width : "500",               //二维码的宽度
				            height : "500",              //二维码的高度
				            background : "#ffffff",       //二维码的后景色
				            foreground : "#000000",        //二维码的前景色
				            src: 'img/share-to-other.jpg'             //二维码中间的图片
				         });
					        $("#img_01").attr("src","img/first.png").load(function(){
									
									self.heih_01 = $("#img_01").height();
									
							});
							$("#img_02").attr("src","img/second.png").load(function(){
								
								self.heih_02 = $("#img_02").height();
								
							});
							$("#img_03").attr("src","img/third.png").load(function(){
								
								self.heih_03 = $("#img_03").height();
								
							});
							$("#img_04").attr("src","img/fouth.png").load(function(){
								
								self.heih_04 = $("#img_04").height();
								
							});
							$("#img_05").attr("src","img/fifth.png").load(function(){
								
								self.heih_05 = $("#img_05").height();
								
							});
				       
				            setTimeout(function(){
								$("#showIds_01").attr("src",$("#qrcodefir canvas").get(0).toDataURL("image/png"));
									        	
								$("#showIds_02").attr("src",$("#qrcodesec canvas").get(0).toDataURL("image/png"));
									        	
								$("#showIds_03").attr("src",$("#qrcodethi canvas").get(0).toDataURL("image/png"));
									        	
								$("#showIds_04").attr("src",$("#qrcodefou canvas").get(0).toDataURL("image/png"));
									        
								$("#showIds_05").attr("src",$("#qrcodefiv canvas").get(0).toDataURL("image/png"));
								justDoIt1();
									        	
								justDoIt2();
									        
								justDoIt3();
									        	
								justDoIt4();
									        	
								justDoIt5();
								
								setTimeout(function(){
									$(".animation3").css("display","none");
					            	$(".container3").css("opacity",1);
					            	
								},50)
								self.ngRepeatFinish();
									   
							},560)
					
		   	   }
		   	   else{
		   	   	  
		   	   	  $dialog.msg("参数错误！");
		   	   	  location.href = pageUrl.LOGIN_PAGE;
		   	   }
		   	   
		   	   
				

	}	
},
	
	eventBind : function(){
		var self = this;
		
		self.scope.toInit = function(){
			
			
			
		};
	},
	
	ngRepeatFinish: function() {
        var self = this;
 			
            
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplayDisableOnInteraction: false,
                prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
            });
       
	      self.scope.$apply()
					    	     
				      
    }
};
