//消息推送

var PushController = {
	//作用域
	scope: null,
	
	//数据模型
	pushModel: {
		pushTitle: null,
		selected: '2',
		pushType:[
			{index: '2', name: '全部'},
			{index: '0', name: '注册用户'},
			{index: '1', name: 'vip用户'},
			{index: '3', name: '个人用户'}
		],
		userPhoneNum: null,
		userPhoneType: false,
		pushMsg: null,
	},
	
	
	//初始化
	init: function($scope){
		this.scope = $scope;
		this.scope.pushModel = this.pushModel;
		this.bindEvent();
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
		self.scope.changeUser = function(){
			if(self.pushModel.selected == 3){
				$('#selectUser').addClass('f');
				self.pushModel.userPhoneType = true;
			}else{
				$('#selectUser').removeClass('f');
				self.pushModel.userPhoneType = false;
			}
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
		
		$data.httpRequest('post', api.API_PUSH_MESSAGE, params, function(data){
			self.scope.pushModel.pushTitle = null;
			self.scope.pushModel.pushMsg = null;
			self.scope.pushModel.userPhoneNum = null;
			self.scope.pushModel.selected = '2';
			$('#selectUser').removeClass('f');
			self.scope.pushModel.userPhoneType = false;
			layer.msg('推送消息成功');
			self.scope.$apply();
		})
	}
}	
