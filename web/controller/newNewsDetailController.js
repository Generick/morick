
/*
 * 我的消息列表页
 */

app.controller('ctrl',function($scope){
	localStorage.removeItem("messlistOrauction")
	localStorage.removeItem("comeIntoOrder")
	MessagesController.init($scope);
})

var MessagesController = {
	scope : null,

	title : '',
	
	time: null,
	
	content : '',

	init : function($scope){
		
		this.scope = $scope;
	    
//	    this.scope.title = this.title;
//		this.scope.time = this.time;
//		this.scope.content = this.content;
//	    
	    this.getUserInfo();

	},
	
	
	getUserInfo : function(){
		var self = this;
		$('.animation').css('display','block'); //加载动画
		$('.container').css('opacity','0');
		var param = {};
		param = JSON.parse(localStorage.getItem("systemMessage"));

		self.title = param.title;
		self.time = param.time;
		self.content = param.content;

		self.scope.title = self.title;
		self.scope.time = self.time;
		self.scope.content = self.content;
		
//	    self.scope.$apply();
		$('.animation').css('display','none');
	    $('.container').css('opacity','1');
	},
	
	

};
