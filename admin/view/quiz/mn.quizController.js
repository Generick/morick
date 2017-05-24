//竞猜

var QuizController = {
	
	//作用域
	scope: null,
	
	//数据模型
	quizModel: {
		isShowInfo: false,//是否显示Info
		listData: [],
		fields: null,
	},
	
	//初始化
	init: function($scope){
		this.scope = $scope;
		this.scope.quizModel = this.quizModel;
		this.getQuizList();
		
		this.bindEvent();
	},
	
	//获取竞猜列表
	getQuizList: function(){
		var self = this;
		
		var params = {
			
		};
		
		pageController.pageInit(self.scope, api.API_GET_QUIZ_LIST, params, function(data)
		{
			//分页
			var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                pageController.pageNum(totalPage);
            
//          console.log(JSON.stringify(data))
            self.quizModel.listData = data.data;
//			for(var i = 0; i < data.data.length; i++)
//			{    
//				
//				data.data[i].goods_icon = JSON.parse(data.data[i].goods_icon);
// 			    data.data[i].goods_icon = data.data[i].goods_cover;
//				data.data[i].type =  self.fundAuctionType(data.data[i].status);
//			}
			if(self.quizModel.listData.length == 0)
			{
				$dialog.msg("暂无数据！")
			}
			for(var i = 0; i < self.quizModel.listData.length; i++)
			{    

			    self.quizModel.listData[i].type =  self.fundAuctionType(self.quizModel.listData[i].status);
			}
			self.scope.quizModel = self.quizModel;
			self.scope.$apply();
		});
	},
	
	//状态转换
	fundAuctionType: function(status){
		
		var params = {
			0 : "正在拍卖",
			1 : "有奖竞猜中",
			2 : "人数少于3人",
			3 : "流拍",
			4 : "正常结束"
		}
        return params[status];
        
    },
	
	//点击事件
	bindEvent: function(){
		
		var self = this;
		//搜索
		self.scope.search = function(){
			var params = {
				fields: null
			};
			params.fields = self.quizModel.fields;
			$data.httpRequest('post', api.API_SEARCH_QUIZ_LIST, params, function(data)
			{
				self.quizModel.listData = data;
				self.scope.$apply();
			})
		};
				
		//查看竞猜
		self.scope.onClickCheckInfo = function(ID){
			self.quizModel.isShowInfo = true;
			self.scope.quizModel = self.quizModel;
            QuizInfoController.init(self.scope, ID);
		};
		
		//结束竞猜
		self.scope.onClickQuizFinish = function(item){
			var params = {
				auctionId: null
			};
			
			params.auctionId = item.auction_id;
			$data.httpRequest('post', api.API_QUIT_QUIZ, params, function(data)
			{
				item.status = 0;
				self.scope.quizModel = self.quizModel;
				self.scope.$apply();
			});
		};
		
		//返回
		self.scope.backQuizList = function(){
			self.quizModel.isShowInfo = false;
		}
	}
};


var QuizInfoController = {
	
	//作用域
	scope: null,
	
	//数据模型
	quizInfoModel: {
		limitNum: 100,
		list: {},
		startIndex: 0,
		curPage: 1,
		count: 0
	},
	
	//竞猜品id
	auctionID: null,
	
	//初始化
	init: function($scope, ID){
		this.scope = $scope;
		this.scope.quizInfoModel = this.quizInfoModel;
		this.auctionID = ID;
		this.getItemInfo();
		
		this.bindEvent();
	},
	
	//获取某件竞猜品的详情
	getItemInfo: function(){
		var self = this;
		
		var params = {
			auctionId: self.auctionID,
		};
		$data.httpRequest("post", api.API_VIEW_QUIZ, params, function(data)
		{
			var totalPage = Math.ceil(data.count / 10);
			
			for(var i = 0; i < data.data.length; i++){
				if(_utility.isEmpty(data.data[i].purchasePrice)){
					data.data[i].purchasePrice = '---';
				}
			};
			self.quizInfoModel.count = data.count;
			self.quizInfoModel.list = data;
			self.scope.quizInfoModel.limitNum = parseInt(self.quizInfoModel.list.limitNum);
			self.scope.$apply();
			
			$("#simplePage").createPage({
                pageCount: totalPage,
                current: self.quizInfoModel.curPage,
                backFn: function(curPage){
                    self.quizInfoModel.curPage = curPage;
                    self.quizInfoModel.startIndex = (curPage - 1)*10;
                    self.getItemInfo();
                }
            });
		})
	},
	
	bindEvent: function(){
		var self = this;
		
		self.scope.Determine = function(){
			var params = {
				auctionId: self.auctionID,
				limitNum: self.quizInfoModel.limitNum,
			};
			
			if(self.quizInfoModel.limitNum < 3){
				layer.msg('竞猜人数不可以少于3人');
				return;
			}
			if(self.quizInfoModel.limitNum < self.quizInfoModel.count){
				layer.msg('竞猜人数不可少于已竞猜人数');
				return;
			}
			
			$data.httpRequest('post', api.API_UPDATE_LIMIT_NUM, params, function(data)
			{
//				console.log(data);
			})
		}
	}
}
