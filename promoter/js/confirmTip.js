/*
 *公用确认框 
 * 
 * 
 */

var $confirmTip = {
	
	body : $("body"),
	
	show : function(tip){
		var html = '';
//		html += '<div class="popUp-bg"></div>';
		html += '<div class="popUp-container">';
		html += '<div class="popUp-tip">'+tip+'</div>';
		html += '</div>';
		
		this.body.append(html);
		
		setTimeout(function(){
			$confirmTip.hide();
		},1500);
			
	},
	
	hide : function(){
		
		$(".popUp-container").remove();
		
	}
	
}
