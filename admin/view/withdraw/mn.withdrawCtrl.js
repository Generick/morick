//提现

var WithdrawCtrl = {
	//作用域
    scope: null,
	
	//数据模型
    withdrawModel: {
		listArr: [],
		status: 3,
		keywords: null
    },
	
	//初始化
    init: function($scope){
        this.scope = $scope;
		this.scope.withdrawModel = this.withdrawModel;
        this.initData();
        
        this.getWithdrawList(this.withdrawModel.status, this.withdrawModel.keywords);

        this.onEvent();

    },

    //初始化数据
    initData: function(){
        var self = this;

        //tab
        self.scope.tabs = [
        	{
        		title: '全部',
                url: 'allList',
                status: 3
        	},
            {
                title: '待处理',
                url: 'reviewList',
                status: 1
            },
            {
                title: '已拒绝',
                url: 'noList',
                status: 2
            },
            {
                title: '已完成',
                url: 'yesList',
                status: 0
            }
        ];

        //默认项
        self.scope.currentTab = 'allList';

        self.scope.onClickTab = function(tab){
            self.scope.currentTab = tab.url;
            self.withdrawModel.status = tab.status;
            self.getWithdrawList(self.withdrawModel.status);
        };

        self.scope.isActiveTab = function(tabUrl){
            return tabUrl == self.scope.currentTab;
        };
    },
	
	//获取列表数据
	getWithdrawList: function(status, fields){
		var self = this;
		
		var params = {
			status: null,
			fields: null,
		};
		
		params.status = status;
		params.fields = fields;
		
		pageController.pageInit(self.scope, api.API_GET_WITHDRAW_LIST, params, function(data){
			//分页
			var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
//          console.log(JSON.stringify(data))
            pageController.pageNum(totalPage);
            if(data.data.length == 0)
			{
				$dialog.msg("暂无数据！")
			}
            for(var i = 0; i < data.data.length; i++){
            	data.data[i].type = self.turnStatus(data.data[i].status);
            }
            self.withdrawModel.listArr = data.data;
            self.scope.$apply();
		})
	},
	
	//状态转换
	turnStatus: function(status){
		
		var params = {
			0: '已通过',
			1: '待处理',
			2: '已拒绝',
			3: '已拒绝'
		}
		
		return params[status];
	},
	
    //绑定事件
    onEvent: function(){
        var self = this;
        
		//通过
		self.scope.acceptBtn = function(id){
			layer.prompt({title: '通过提现申请', value: '您好，恭喜您的提现申请已通过，请耐心等待7个工作日，如有疑问请联系客服！', formType: 2}, function(text, index){
			    layer.close(index);
			    
			    var params = {
			    	id: id
			    };
			    
			    $data.httpRequest("post", api.API_ACCEPT_WITHDRAW, params, function(data){
			    	self.getWithdrawList(self.withdrawModel.status);
			    })
			});
		};
		
		//拒绝
		self.scope.refuseBtn = function(id, userId, withdrawCash){
			layer.prompt({title: '拒绝提现申请', formType: 2}, function(text, index){
			    layer.close(index);
			    
			    var params = {
			    	id: id,
			    	userId: userId,
			    	withdrawCash: withdrawCash,
			    	reason: text
			    };
			    
			    $data.httpRequest("post", api.API_REFUSE_WITHDRAW, params, function(data){
			    	self.getWithdrawList(self.withdrawModel.status);
			    })
			});
		};
		
		//搜索
		self.scope.search = function(){
			self.getWithdrawList(self.withdrawModel.status, self.withdrawModel.keywords);
		}
    }
};