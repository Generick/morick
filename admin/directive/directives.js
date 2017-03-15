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
        		var lastIndex = files.length - 1;
        		uploadMulImage(files, lastIndex);
        	};
        	
        	scope.delPic = function(idx){
        		scope.url.splice(idx, 1);
	        };
	        
	        var uploadMulImage = function(files , i)
	        {
	        	if(i < 0)
	        	{
	        		document.getElementById("file-form").reset();
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
		            });
		            
		            uploadMulImage(files,--i);
		        };
	        }
        }
    }; 
}); 

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