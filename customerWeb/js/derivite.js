


/**
 * 自定义上传图片
 */
app.directive('uploadMap', function() { 
    return { 
        restrict : 'AE', 
        templateUrl : 'module/uploadmul/upload-map.html', 
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
	        	
//	        	alert(2)
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
		        xhr.open("post",apiUrl.API_UP_FILE,true);
		        xhr.send(data);	 
		        
		        xhr.onload = function (){
		            var tex = xhr.responseText;	
//		            alert(JSON.parse(tex).data.file[0].url)
		            var dataUrl = JSON.parse(tex).data.file[0].url;	
		            var arr = scope.url;
//		            alert()
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
					if(!juges)
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
app.directive('uploadSep', function() { 
    return { 
        restrict : 'AE', 
        templateUrl : 'module/uploadmul/upload-sep.html', 
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
        		if($(".goods-img-1").children(".select-round-1").eq(idx).hasClass("round-has-select"))
	        	{   
	        		$(".goods-img-1").children(".select-round-1").eq(idx).removeClass("round-has-select").parent().siblings().find(".select-round-1").removeClass("round-has-select");
	        		
	        		$(".goods-img-1").children(".select-round-1").eq(0).addClass("round-has-select").parent().siblings().find(".select-round-1").removeClass("round-has-select")
	        	
	        	}
	            else{
	            	
	            	for(var i = 0; i < scope.url.length; i++ )
	            	{
	            		if($(".goods-img-1").children(".select-round-1").eq(i).hasClass("round-has-select"))
			        	{   
			        		
			        		if(i > idx)
			        		{
			        			$(".goods-img-1").children(".select-round-1").eq(i -1).addClass("round-has-select").parent().siblings().find(".select-round-1").removeClass("round-has-select")
			        	       
			        		}
			        		
			        	}
	            	}
	            }
	            
        		scope.url.splice(idx, 1);
        		
	        };
	        
	        scope.setFaceImg = function(index){
	        	
//	        	alert(2)
	        	if($(".goods-img-1").children(".select-round-1").eq(index).hasClass("round-has-select"))
	        	{   
	        		$(".goods-img-1").children(".select-round-1").eq(index).removeClass("round-has-select").parent().siblings().find(".select-round-1").removeClass("round-has-select");
	        		
	        		$(".goods-img-1").children(".select-round-1").eq(index).addClass("round-has-select").parent().siblings().find(".select-round-1").removeClass("round-has-select")
	        	
	        	}
	            else{
	            	$(".goods-img-1").children(".select-round-1").eq(index).addClass("round-has-select").parent().siblings().find(".select-round-1").removeClass("round-has-select")
	            }
	            
	        }
	        
	        var uploadMulImage = function(files , i)
	        {  
	        	if(i < 0)
	        	{
	        		document.getElementById("file-form-1").reset();
	        		return;
	        	}
	        	if(JSON.stringify(files)  == "{}"){
	        		
	        		$(".fixed-chrysanthemum2").css("display","none")
	        		return;
	        	}
	        	
	        	var xhr = new XMLHttpRequest();
				var data = new FormData();
				data.append("file", files[i]);
		        xhr.open("post",apiUrl.API_UP_FILE,true);
		        xhr.send(data);	 
		        
		        xhr.onload = function (){
		            var tex = xhr.responseText;	
//		            alert(JSON.parse(tex).data.file[0].url)
		            var dataUrl = JSON.parse(tex).data.file[0].url;	
		            var arr = scope.url;
//		            alert()
		            arr.push(dataUrl);
		            
		            scope.$apply(function(){
		            	
		            	
						scope.url = arr;
						  $(".fixed-chrysanthemum2").css("display","none")
		            });
		            var juges = false;
					for(var s = 0; s < scope.url.length; s++ )
		            {
		            	if($(".goods-img-1").children(".select-round-1").eq(s).hasClass("round-has-select"))
		            	{
		            		juges = true;
		            	}
		            		
		            }
					if(!juges)
					{
					    $(".goods-img-1").children(".select-round-1").eq(0).addClass("round-has-select").parent().siblings().find(".select-round-1").removeClass("round-has-select")
					}  
		            uploadMulImage(files,--i);
		          
		        };
	        }
        }
    }; 
}); 




