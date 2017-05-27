/**
 *  angular init
 */

//自定义repeat完成事件
app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});



/*
app.directive('uiKindeditor', function ($timeout) {
    return {
        restrict: 'EA',
        require: '?ngModel',
        link: function(scope, element, attrs, ctrl) 
        {
        	var fexUe = 
        	{
        		initContent : null,
        		editor : null,
        		
        		initEditor : function()
        		{
        			fexUe.editor = KindEditor.create(element[0],{
        				resizeType : 1,
						allowPreviewEmoticons : false,
						allowImageUpload : false,
						width: '100%',
						height : "360px",
						items : [
							'fontname',
							'fontsize', 
							'|', 
							'forecolor', 
							'hilitecolor', 
							'bold', 
							'italic', 
							'underline',
							'removeformat', 
							'|', 
							'justifyleft', 
							'justifycenter', 
							'justifyright', 
							'insertorderedlist',
							'insertunorderedlist',
							'uploadImage'
						],
						afterChange : function ()
						{
                            ctrl.$setViewValue(this.html());
                        }
        			});
        			
        			var inputfile = '<input type="file" style="opacity:0" onchange="angular.element(this).scope().imgUpload(this.files)">';
        			$(".ke-icon-uploadImage").append(inputfile);
        		},
        		
        		setContent : function(content)
        		{
        			if(this.editor)
        			{
        				this.editor.html(content);
        			}
        		}
        	}
        	
        	if (!ctrl) 
        	{
                return;
            }
        	
        	fexUe.initContent = ctrl.$viewValue;
        	
        	ctrl.$render = function () {
                fexUe.initContent = ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue;
                fexUe.setContent(fexUe.initContent);
            };
        	
        	fexUe.initEditor();
        	
        	scope.imgUpload = function(files)
        	{
        		var xhr = new XMLHttpRequest();
				var data = new FormData();
				data.append("file", files[0]);
		        xhr.open("post",api.API_UP_FILE,true);
		        xhr.send(data);	      
				
				xhr.onload = function (){
		            var tex = xhr.responseText;	
		            var dataUrl = JSON.parse(tex).data.file[0].url;	
		            var html = '<img style="width: 100%" src="'+ dataUrl +'" />';
		            fexUe.editor.insertHtml(html);
		        };	
        	}
        }
    };
});



*/

/**
 * 自定义富文本
 * 
 */
app.directive('uiKindeditor', function ($timeout) {
    return {
        restrict: 'EA',
        require: '?ngModel',
        link: function(scope, element, attrs, ctrl) 
        {
        	var fexUe = 
        	{
        		initContent : null,
        		editor : null,
        		
        		initEditor : function()
        		{
        			fexUe.editor = KindEditor.create(element[0],{
        				resizeType : 1,
						allowPreviewEmoticons : false,
						allowImageUpload : false,
						width: '500px',
						height : "600px",
						items : [
						
                        'source', '|', 'undo', 'redo', '|', 'preview', '|', 
                        'justifyleft','justifycenter', 'justifyright',
        				'justifyfull', 'insertorderedlist', 'insertunorderedlist',
        				'indent', 'outdent', 'subscript','superscript', 'clearhtml',
        				'quickformat', 'selectall', 'fullscreen','formatblock', 
        				'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
        				'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat',
        				'|', 'table', 'hr','|',  'baidumap', 'pagebreak',
        				'anchor', 'link', 'unlink','media', 'uploadImage'
        				

						],
						afterChange : function ()
						{
                            ctrl.$setViewValue(this.html());
                        }
        			});
        			
        			var inputfile = '<input type="file" style="opacity:0" onchange="angular.element(this).scope().imgUpload(this.files)">';
        			$(".ke-icon-uploadImage").append(inputfile);
        			var inputfile2 = '<input type="file" style="opacity:0" onchange="angular.element(this).scope().videoUpload(this.files)">';
        			$(".ke-icon-media").append(inputfile2);
        		},
        		
        		setContent : function(content)
        		{
        			if(this.editor)
        			{
        				this.editor.html(content);
        			}
        		}
        	}
        	
        	if (!ctrl) 
        	{
                return;
            }
        	
        	fexUe.initContent = ctrl.$viewValue;
        	
        	ctrl.$render = function () {
                fexUe.initContent = ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue;
                fexUe.setContent(fexUe.initContent);
            };
        	
        	fexUe.initEditor();
        	
        	scope.imgUpload = function(files)
        	{
        		var xhr = new XMLHttpRequest();
				var data = new FormData();
				data.append("file", files[0]);
		        xhr.open("post",api.API_UP_FILE,true);
		        xhr.send(data);	      
			
				xhr.onload = function (){
		            var tex = xhr.responseText;	
		          
		            var dataUrl = JSON.parse(tex).data.file[0].url;	
		           
		            var html = '<img style="width: 100%" src="'+ dataUrl +'" />';
                   
		            fexUe.editor.insertHtml(html);
		           
		        };	
        	}
        	
        	scope.videoUpload = function(files)
        	{
        		var xhr = new XMLHttpRequest();
				var data = new FormData();
				data.append("file", files[0]);
		        xhr.open("post",api.API_UP_FILE,true);
		        xhr.send(data);	      
			
				xhr.onload = function (){
		            var tex = xhr.responseText;	
		          
		            var dataUrl = JSON.parse(tex).data.file[0].url;	
        

//                  var html = '<iframe frameborder="0" width="640" height="498" src="https://v.qq.com/iframe/player.html?vid=w0186y4948o&amp;tiny=0&amp;auto=0" data-ke-src="https://v.qq.com/iframe/player.html?vid=w0186y4948o&amp;amp;tiny=0&amp;amp;auto=0"></iframe>';
                    var html = '<iframe frameborder="0" width="640" height="340" src="'+dataUrl+'" data-ke-src="'+dataUrl+'"></iframe>';
//                  var html = '<iframe frameborder="0" width="640" height="320" src="https://v.qq.com/iframe/player.html?vid=o0507d2plwm&tiny=0&auto=0" allowfullscreen></iframe>';
		            fexUe.editor.insertHtml(html);
		         
		        };	
        	}
        }
    };
});




/**
 * 自定义上传视频文件
 */
app.directive('uploadVideo', function() { 
    return { 
        restrict : 'AE', 
        templateUrl : 'modules/uploadmul/upload-video.html', 
        replace : true,
        scope : {
        	url : "=url"
        },
        link : function(scope, element, attrs)
        {
        	scope.$watch('url', function(newValue)
            {  
            	scope.url = newValue;
            	
            });
	        
	       
        	scope.videoUpload = function(files)
        	{  
        		$(".fixed-chrysanthemum").css("display","block")
        		uploadMulVideo(files);
        		
        	};
        	
        	
	        var uploadMulVideo = function(files)
	        { 
	        	
	        	if(JSON.stringify(files)  == "{}"){
	        		
	        		$(".fixed-chrysanthemum").css("display","none")
	        		return;
	        	}
	        	var xhr = new XMLHttpRequest();
				var data = new FormData();
				data.append("file", files[0]);
		        xhr.open("post",api.API_UP_FILE,true);
		        xhr.send(data);	 
		      
		        xhr.onload = function (){ 
		            var tex = xhr.responseText;	
		            var dataUrl = JSON.parse(tex).data.file[0].url;	
		          
		            element.find("video").attr("src",dataUrl);
		            
		            setTimeout(function(){
		            	
		            	layer.msg("视频上传成功！", {time: 1600, anim: 5});
		            	$(".fixed-chrysanthemum").css("display","none")
		            },2000);
                    
		            scope.$apply(function(){
					    scope.url = dataUrl;
		            });
		           
		        };
	        }
        }
    }; 
}); 



/**
 * 自定义上传图片
 */
app.directive('uploadMul', function() { 
    return { 
        restrict : 'AE', 
        templateUrl : 'modules/uploadmul/upload-mul.html', 
        replace : true,
        scope : {
        
        	url : "=url"
        },
        link : function(scope, element, attrs)
        {
        	scope.$watch('url', function(newValue)
            {    
            	scope.url = newValue;
            
            });
	        
	       
        	scope.imgUpload = function(files)
        	{   
        		
        		$(".fixed-chrysanthemum2").css("display","block")
        		var lastIndex = files.length - 1;
        		uploadMulImage(files, lastIndex);
        	
        	};
        	
        	scope.delPic = function(idx){
        		if($(".goods-img").children(".select-round").eq(idx).hasClass("round-has-select"))
	        	{   
	        		$(".goods-img").children(".select-round").eq(idx).removeClass("round-has-select").parent().siblings().find(".select-round").removeClass("round-has-select")
	        	    $(".goods-img").children(".select-round").eq(0).addClass("round-has-select").parent().siblings().find(".select-round").removeClass("round-has-select")
	        	}
	            else{
	            	
	            	for(var i = 0; i < scope.url.length; i++ )
	            	{
	            		if($(".goods-img").children(".select-round").eq(i).hasClass("round-has-select"))
			        	{   
			        		
			        		if(i > idx)
			        		{
			        			$(".goods-img").children(".select-round").eq(i -1).addClass("round-has-select").parent().siblings().find(".select-round").removeClass("round-has-select")
			        	       
			        		}
			        		
			        	}
	            	}
	            }
        		scope.url.splice(idx, 1);
        		
	        };
	        
	        scope.setFaceImg = function(index){
	        	
	        	if($(".goods-img").children(".select-round").eq(index).hasClass("round-has-select"))
	        	{   
	        		$(".goods-img").children(".select-round").eq(index).removeClass("round-has-select").parent().siblings().find(".select-round").removeClass("round-has-select")
	        	    $(".goods-img").children(".select-round").eq(0).addClass("round-has-select").parent().siblings().find(".select-round").removeClass("round-has-select")
	        	}
	            else{
	            	$(".goods-img").children(".select-round").eq(index).addClass("round-has-select").parent().siblings().find(".select-round").removeClass("round-has-select")
	            }
	            
	        }
	        
	        var uploadMulImage = function(files , i)
	        {  
	        	if(i < 0)
	        	{
	        		document.getElementById("file-form-2").reset();
	        		return;
	        	}
	        	if(JSON.stringify(files)  == "{}"){
	        		
	        		$(".fixed-chrysanthemum2").css("display","none")
	        		return;
	        	}
	        	var xhr = new XMLHttpRequest();
				var data = new FormData();
				data.append("file", files[i]);
		        xhr.open("post",api.API_UP_FILE,true);
		        xhr.send(data);	 
		       
		        xhr.onload = function (){
		            var tex = xhr.responseText;	
		            var dataUrl = JSON.parse(tex).data.file[0].url;	
		            var arr = scope.url;
		            arr.push(dataUrl);
		          
		            scope.$apply(function(){
		            	
						scope.url = arr;
						 $(".fixed-chrysanthemum2").css("display","none")
		            });
		            var juge = false;
					for(var j = 0; j < scope.url.length; j++ )
		            {
		            	if($(".goods-img").children(".select-round").eq(j).hasClass("round-has-select"))
		            	{  
		            		juge = true;
		            	}
		            		
		            }
					if(!juge)
					{  
					    $(".goods-img").children(".select-round").eq(0).addClass("round-has-select").parent().siblings().find(".select-round").removeClass("round-has-select")
					}
		            uploadMulImage(files,--i);
		           
		        };
	        }
        }
    }; 
}); 




/**
 * 自定义上传图片
 */
app.directive('uploadMap', function() { 
    return { 
        restrict : 'AE', 
        templateUrl : 'modules/uploadmul/upload-map.html', 
        replace : true,
        scope : {
        
        	url : "=url"
        },
        link : function(scope, element, attrs)
        {
        	scope.$watch('url', function(newValue)
            {
            	scope.url = newValue;
            	
            });
	        
	       
        	scope.imgUpload = function(files)
        	{
        		$(".fixed-chrysanthemum2").css("display","block")
        		var lastIndex = files.length - 1;
        		uploadMulImage(files, lastIndex);
        	};
        	
        	scope.delPic = function(idx){
        		if($(".goods-img-2").children(".select-round-2").eq(idx).hasClass("round-has-select"))
	        	{   
	        		$(".goods-img-2").children(".select-round-2").eq(idx).removeClass("round-has-select").parent().siblings().find(".select-round-2").removeClass("round-has-select");
	        		
	        		$(".goods-img-2").children(".select-round-2").eq(0).addClass("round-has-select").parent().siblings().find(".select-round-2").removeClass("round-has-select")
	        	
	        	}
	            else{
	            	
	            	for(var i = 0; i < scope.url.length; i++ )
	            	{
	            		if($(".goods-img-2").children(".select-round-2").eq(i).hasClass("round-has-select"))
			        	{   
			        		
			        		if(i > idx)
			        		{
			        			$(".goods-img-2").children(".select-round-2").eq(i -1).addClass("round-has-select").parent().siblings().find(".select-round-2").removeClass("round-has-select")
			        	       
			        		}
			        		
			        	}
	            	}
	            }
        		scope.url.splice(idx, 1);
        		
	        };
	        
	        scope.setFaceImg = function(index){
	        	
	        	if($(".goods-img-2").children(".select-round-2").eq(index).hasClass("round-has-select"))
	        	{   
	        		$(".goods-img-2").children(".select-round-2").eq(index).removeClass("round-has-select").parent().siblings().find(".select-round-2").removeClass("round-has-select");
	        		
	        		$(".goods-img-2").children(".select-round-2").eq(index).addClass("round-has-select").parent().siblings().find(".select-round-2").removeClass("round-has-select")
	        	
	        	}
	            else{
	            	$(".goods-img-2").children(".select-round-2").eq(index).addClass("round-has-select").parent().siblings().find(".select-round-2").removeClass("round-has-select")
	            }
	            
	        }
	        
	        var uploadMulImage = function(files , i)
	        {  
	        	if(i < 0)
	        	{
	        		document.getElementById("file-form").reset();
	        		return;
	        	}
	        	if(JSON.stringify(files)  == "{}"){
	        		
	        		$(".fixed-chrysanthemum2").css("display","none")
	        		return;
	        	}
	        	var xhr = new XMLHttpRequest();
				var data = new FormData();
				data.append("file", files[i]);
		        xhr.open("post",api.API_UP_FILE,true);
		        xhr.send(data);	 
		        
		        xhr.onload = function (){
		            var tex = xhr.responseText;	
		            var dataUrl = JSON.parse(tex).data.file[0].url;	
		            var arr = scope.url;
		            arr.push(dataUrl);
		            
		            scope.$apply(function(){
		            	
		            	
						scope.url = arr;
						  $(".fixed-chrysanthemum2").css("display","none")
		            });
		            var juges = false;
					for(var s = 0; s < scope.url.length; s++ )
		            {
		            	if($(".goods-img-2").children(".select-round-2").eq(s).hasClass("round-has-select"))
		            	{
		            		juges = true;
		            	}
		            		
		            }
					if(!juge)
					{
					    $(".goods-img-2").children(".select-round-2").eq(0).addClass("round-has-select").parent().siblings().find(".select-round-2").removeClass("round-has-select")
					}  
		            uploadMulImage(files,--i);
		          
		        };
	        }
        }
    }; 
}); 






/**
 * 自定义上传图片
 */
app.directive('uploadScrap', function() { 
    return { 
        restrict : 'AE', 
        templateUrl : 'modules/uploadmul/upload-scrap.html', 
        replace : true,
        scope : {
        
        	url : "=url"
        },
        link : function(scope, element, attrs)
        {
        	scope.$watch('url', function(newValue)
            {   
            	
            	scope.url = newValue;
            	
            });
	        
	       
        	scope.imgUpload = function(files)
        	{
//      		var lastIndex = files.length - 1;
				$(".fixed-chrysanthemum").css("display","block")
        		uploadMulImage(files);
        		
        	};
        	
//      	scope.delPic = function(idx){
//      		
//      		scope.url.splice(idx, 1);
//      		
//	        };
//	        
//	       
	        var uploadMulImage = function(files)
	        {  
//	        	if(i < 0)
//	        	{
//	        		document.getElementById("file-form-3").reset();
//	        		return;
//	        	}

            	if(JSON.stringify(files)  == "{}"){
	        		
	        		$(".fixed-chrysanthemum").css("display","none")
	        		return;
	        	}
	        	var xhr = new XMLHttpRequest();
				var data = new FormData();
				data.append("file", files[0]);
		        xhr.open("post",api.API_UP_FILE,true);
		        xhr.send(data);	 
		        
		        xhr.onload = function (){
		            var tex = xhr.responseText;	
		            var dataUrl = JSON.parse(tex).data.file[0].url;	
//		            var arr = scope.url;
//		            arr.push(dataUrl);
		            
		            scope.$apply(function(){
		            	
		            	
						scope.url = dataUrl;
						$(".fixed-chrysanthemum").css("display","none")
		            });
		           
//		            uploadMulImage(files,--i);
		        };
	        }
        }
    }; 
}); 






