/**
 * Created by Jack on 2016/11/17.
 */

 
var BiddingCtrl = {
    scope: null,
    
    personNote : '',
    
    
    biddingModel: {
        modelArr: [],
        biddingID: null, //当前竞拍ID
        selNum: null, //分页数
        nowPage: null, //当前页
        totalPage: null, //总页数
        inputPage: null //跳转页
    },
    
    noteWord : '',
    
    noteId : null,
    
    init: function($scope){
        this.scope = $scope;
        
        this.scope.noteWord = this.noteWord;
        
        this.biddingModel.biddingID = _utility.getQueryString("biddingID");
        this.biddingModel.selNum = _utility.getQueryString("selNum");
        this.biddingModel.nowPage = _utility.getQueryString("nowPage");
        this.biddingModel.totalPage = _utility.getQueryString("totalPage");
        this.biddingModel.inputPage = _utility.getQueryString("inputPage");
        
        this.scope.biddingModel = this.biddingModel;

        this.getBiddingList();

        this.onEvent();
    },

    getBiddingList: function(){
    
        var self = this,
            params = {
                itemId: self.biddingModel.biddingID
            };

        pageController.pageInit(self.scope, api.API_GET_BIDDING_LIST, params,

            /**
             * 竞拍列表
             * @param data.count 计数
             * @param data.biddingList 列表数据
             * @param data.biddingList.userData 用户数据
             * @param data.biddingList.nowPrice 当前价格
             * @param data.biddingList.createTime 竞拍时间
             */
            function(data){
                if(self.scope.page.selectPageNum)
                {
                    var totalPage = Math.ceil(data.count / self.scope.page.selectPageNum);
                    pageController.pageNum(totalPage);
                }

                self.biddingModel.modelArr = data.biddingList;
                for(var i = 0;i < self.biddingModel.modelArr.length; i++)
                {   
                
                	self.biddingModel.modelArr[i].userData.note = (self.biddingModel.modelArr[i].userData.note == "")? "无" : self.biddingModel.modelArr[i].userData.note;
                	self.biddingModel.modelArr[i].nowPrice = _utility.toDecimalTwo(parseFloat(self.biddingModel.modelArr[i].nowPrice));
                }
                self.scope.$apply();
            }
        )
    },
       
    onEvent: function(){
        var self = this;
         
         
        self.scope.showPersonDetail  = function(item){
    		
    		$("#big-box-two").css("display","block");
    		self.personNote = item.userData.note;
    		self.scope.personNote = self.personNote;
    	};
    	
    	
    	self.scope.closeMol= function(){
    		
    		$("#big-box-two").css("display","none");
    	};
    	
         
         
         
        self.scope.back2AuctionList = function(){
        	
        	var params = {};
        	params.selNum = self.biddingModel.selNum;
        	params.nowPage = self.biddingModel.nowPage;
        	params.totalPage = self.biddingModel.totalPage;
        	params.inputPage = self.biddingModel.inputPage;
        	localStorage.setItem("auctionData",JSON.stringify(params))
            location.href = JUMP_URL.AUCTION_LIST + "?selNum=" + self.biddingModel.selNum
                            + "&nowPage=" + self.biddingModel.nowPage
                            + "&totalPage=" + self.biddingModel.totalPage
                            + "&inputPage=" + self.biddingModel.inputPage;
        };
        
        self.scope.junpToUserInfo = function(item){
        	var params = {};
        	params.gender = item.userData.gender;
        	params.name = item.userData.name;
        	params.smallIcon = item.userData.smallIcon;
        	params.telephone = item.userData.telephone;
        	params.balance = item.userData.balance;
        	params.userId = item.userId;
        	
        	localStorage.setItem("userInfoData",JSON.stringify(params));
        
        	location.href = JUMP_URL.ACTION_USERINFO + "?biddingID=" + self.biddingModel.biddingID
                    + "&selNum=" + self.biddingModel.selNum + "&nowPage=" + self.biddingModel.nowPage
                    + "&totalPage=" + self.biddingModel.totalPage + "&inputPage=" + self.biddingModel.inputPage;
        	
        };
        
        
        self.scope.reMark = function(item){
        	self.showBox();
        	self.noteId = item.id;
        	self.noteWord = item.note;
        	self.scope.noteWord = self.noteWord;
        	
        };
       
        
        self.scope.hideShadow = function(){
        	self.hideBox();
        	
        };
        self.scope.submitData = function(){
        	
        	
        	var   params = {}
        	params.id = self.noteId;
        	params.note = self.scope.noteWord;
        	$data.httpRequest("post", api.API_SET_AUCTION_NOTE, params, function(data){
	            
	            self.hideBox();
	            self.getBiddingList();
	            self.scope.$apply;
	        })
        	
    
        };
    },
    
     //遮罩层的展示和隐藏
    
    showBox : function(){
    	var self = this;
    	$("#big-box-auct").show()
    },
    hideBox : function(){
    	var self = this;
    	$("#big-box-auct").hide()

    },
    
};