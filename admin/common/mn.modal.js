/*
 *  模态框的控制事件 
 * 
 */

var editorModal = {
	
	showUploadImage : function()
	{
		
		var x = $(".ke-icon-uploadImage").offset().left;
		var y = $(".ke-icon-uploadImage").offset().top;
		
		var currentTop = parseInt(y) + 50;
		var currentLeft = parseInt(x) - 200;
		
		$(".up-img-modal").css({"top" : currentTop , "left" : currentLeft});
		
		$(".up-img-modal").show();
		
		$(".up-header-rg").click(function(){
			$(".up-img-modal").hide();
		});
	},
	
	hideUploadImage : function()
	{
		$(".up-img-modal").hide();
	}
}

