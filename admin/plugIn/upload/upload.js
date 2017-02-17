/*
 * 上传文件到服务器
 */

var upLoadFile = {
	//注意每次打开一个上传页面都要重置inputIdArr和formIdArr（否则再次打开上传页面不能完成事件绑定）
    inputIdArr : [], //存储所有上传按钮ID
    formIdArr : [], //存储所有form表单ID
    
    curInputID: null, //当前点击的上传按钮ID
    curFormat: null, //当前需要验证的格式
   
    /**
     * 上传文件到本地服务器
     * @param formId 表单ID
     * @param inputId 上传按钮ID
     * @param type 上传文件类型1表示图片，2表示视频，3表示不限制格式
     * @param callback 成功回调
     */
    start : function(formId, inputId, type, callback){

        var self = this;
    	
        var options = {
            url : api.API_UP_FILE,
            beforeSubmit:  self.showRequest,
            success : callback,
            resetForm: true,
            dataType:  'json'
        };

        self.curInputID = inputId;
        self.curFormat = type;

        if(!self.checkIfInit(self.inputIdArr, inputId)) //相同的ID只綁定一次事件
        {
            $("#" + inputId).on("change", function(){
                $("#" + formId).submit();
            });
            self.inputIdArr.push(inputId);
        }

        if(!self.checkIfInit(self.formIdArr, formId))
        {
            var $formID = $("#" + formId);
            $formID.ajaxForm(function(){});

            $formID.submit(function(){
                $(this).ajaxSubmit(options);
                return false;
            });
            self.formIdArr.push(formId);
        }
    },

    /**
     * 上传提交前处理数据
     * @param formData 上传表单所有文件组成的一个数组
     */
    showRequest: function(formData){
        var file = formData[0].value.type,
            formatArr = []; //这里可以限定上传图片和视频格式
            formatArr[1] = !/\/(?:jpg|png|jpeg|gif|bmp)/i.test(file);
            formatArr[2] = !/\/(?:mp4|WebM|ogg|MOV)/i.test(file);
            formatArr[3] = false; //不限制格式

        if(formatArr[upLoadFile.curFormat]) {
            alert("格式不正确！");

            $("#"+ upLoadFile.curInputID).val(""); //如果不成功就清空文件域，tip:在IE中安全设置的原因不允许清空文件域
            return false; //“beforeSubmit”回调函数返回false，那么表单将不被提交
        }
    },

    /**
     * 检查是否已经初始化以保证相同ID只初始化一次
     * @param arr 存储所有上传或提交按钮ID
     * @param curID 当前点击对象的ID
     */
    checkIfInit: function(arr, curID){
        for(var i = 0; i < arr.length; i++)
        {
            if(arr[i] == curID)
            {
                return true;
            }
        }
        return false;
    }
};

var upLoadLocalFile = {
	
    start: function(upInputID, callback)
    {  
        document.getElementById(upInputID).addEventListener('change', function(){   
        	var xhr = new XMLHttpRequest();
			var data = new FormData();
			
//			alert(this.files[0])
			data.append("file", this.files[0]);
	        xhr.open("post",api.API_UP_FILE,true);
	        xhr.send(data);	      
			
			xhr.onload = function (){
	            var tex = xhr.responseText;	
	            var dataUrl = JSON.parse(tex).data.file[0].url;	

	            callback(dataUrl);
	        };		
        });
    },
};
