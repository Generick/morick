/*
 *公用确认框 
 * 
 * 
 */

var $confirmDialog = {
	
	body : $("body"),
	
	show : function(tip, callback){
		
		var html = '';
		html += '<div class="popUp-bg"></div>';
		html += '<div class="popUp-container2">';
		html += '<div class="popUp-tip2">'+tip+'</div>';
		html += '<p class="popUp-confirm-sure">确认</p>';
		html += '<p class="popUp-confirm-cancel">取消</p>';
		html += '</div>';
		html += '</div>';
		
		this.body.append(html);
		
		$(".popUp-confirm-cancel").on("click",function(){
			$confirmDialog.hide();
		});
		
		$(".popUp-bg").on("click",function(){
			$confirmDialog.hide();
		});
		
		$(".popUp-confirm-sure").on("click",function(){
			callback();
			$confirmDialog.hide();
		});
		
	},
	
	hide : function(){
		
		$(".popUp-bg").remove();
		$(".popUp-container2").remove();
		
	}
	
}
