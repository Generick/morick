//消息推送

var PushController = {
	//作用域
	scope: null,
	
	//数据模型
	pushModel: {
		pushTitle: null,
		selected: '2',
		pushType:[
			{id: '2', name: '全部'},
			{id: '0', name: '注册用户'},
			{id: '1', name: 'vip用户'},
			{id: '3', name: '个人用户'}
		],
		userPhoneNum: null,
		userPhoneType: false,
		pushMsg: null,
	},
	personPhone : null,
	
	isShowSele : false,
	
	selectModel : {
		id : 2,
		name : '全部'
		
	},
	
	isShowBack : false,
	
	//初始化
	init: function($scope){
		this.scope = $scope;
		
		this.scope.pushModel = this.pushModel;
		
		this.getUrlData();
		
		this.bindEvent();
		
		this.scope.selectModel = this.selectModel;
	},
	
	
	getUrlData : function(){
		
	    var self =this;
	    if(location.href.indexOf("?") != -1)
	    {
	    	var telephone =  _utility.getQueryString('telephone'); 
		    
		    self.isShowBack = true;
		    self.scope.isShowBack = self.isShowBack;
			if(!_utility.isEmpty(telephone))
			{
				self.personPhone = telephone;
			    self.selectModel.name = '个人用户';
				self.selectModel.id = 3; 
				self.pushModel.selected = 3;
				self.scope.pushModel.selected = self.pushModel.selected ; 
			    $('#selectUser').addClass('f');
				self.pushModel.userPhoneType = true;
				self.pushModel.userPhoneNum = self.personPhone;
				self.scope.pushModel.userPhoneNum = self.pushModel.userPhoneNum;
			}
	    }
		
	},
	
	//点击事件
	bindEvent: function(){
		
		var self = this;
		//发送推送
		self.scope.onClickPushMsg = function(){
			if(_utility.isEmpty(self.pushModel.pushTitle)){
				layer.msg('推送标题不能为空');
				return;
			}
			
			if(self.pushModel.selected == 3 && _utility.isEmpty(self.pushModel.userPhoneNum)){
				layer.msg('推送用户手机号不能为空');
				return;
			}
			
			if(_utility.isEmpty(self.pushModel.pushMsg)){
				layer.msg('推送信息不能为空');
				return;
			}
			
			self.sendMsg()
		},
		
		//切换用户时
		self.scope.chooseselectModel = function(type){
			if(type == 2)
			{
				self.selectModel.name = '全部';
				self.selectModel.id = 2; 
				self.pushModel.selected = 2;
			}
			else if(type == 0)
			{
				self.selectModel.name = '注册用户';
				self.selectModel.id = 0; 
				self.pushModel.selected = 0;
			}
			else if(type == 1)
			{
				self.selectModel.name = 'vip用户';
				self.selectModel.id =  1; 
				self.pushModel.selected = 1;
			}
			else
			{
				self.selectModel.name = '个人用户';
				self.selectModel.id = 3; 
				self.pushModel.selected = 3;
			}
			if(self.isShowSele)
			{
				$("#online-div").css("display","none")
			}
			else
			{
				$("#online-div").css("display","block")
			}
			self.isShowSele = ! self.isShowSele;
			if(self.pushModel.selected == 3){
				$('#selectUser').addClass('f');
				self.pushModel.userPhoneType = true;
			}else{
				$('#selectUser').removeClass('f');
				self.pushModel.userPhoneType = false;
			}
		};
		
		
		self.scope.toShowselect = function(){
			
			if(self.isShowSele)
			{
				$("#online-div").css("display","none")
			}
			else
			{
				$("#online-div").css("display","block")
			}
			self.isShowSele = ! self.isShowSele;
			
		};
		
		self.scope.goBackUsers = function(){
			
//			location.href = JUMP_URL.USER_LIST+"?comefrom=" + 3;
            location.href = JUMP_URL.USER_LIST;
            
            var $li = $("#nav_2"),
		            toggleClass = ($(this).next("ul").css("display") == "none")? "toggle-icon fa fa-angle-left" : "toggle-icon fa fa-angle-down";
		
		        $li.find(' > a .toggle-icon').attr("class", toggleClass);
		        $li.removeClass('active').siblings("li").addClass("active");
		        $li.find('.sub-menu').slideToggle(200);
		        $li.siblings("li").find(".sub-menu").slideUp(200);
		        $li.siblings("li").find(' > a .toggle-icon').attr("class", 'toggle-icon fa fa-angle-down');
		   
		}
	},
	
	//发送推送消息
	sendMsg: function(){
		var self = this;
		
		var params = {
			pushType: self.pushModel.selected,
			msg_title: self.pushModel.pushTitle,
			msg_content: self.pushModel.pushMsg,
			phoneNum: self.pushModel.userPhoneNum
		}
		if(params.pushType != 3)
		{
			params.phoneNum = null;
		}
//		alert(JSON.stringify(params))
		$data.httpRequest('post', api.API_PUSH_MESSAGE, params, function(data){
			self.scope.pushModel.pushTitle = null;
			self.scope.pushModel.pushMsg = null;
			self.scope.pushModel.userPhoneNum = null;
			self.scope.pushModel.selected = '2';
			self.selectModel.name = '全部';
			self.scope.selectModel.name = self.selectModel.name;
			self.selectModel.id = 2; 
			$('#selectUser').removeClass('f');
			self.scope.pushModel.userPhoneType = false;
			layer.msg('推送消息成功');

			self.scope.$apply();
		})
	}
}	
