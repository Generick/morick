var ContentCtrl = {
    scope: null,
    
    
    isAbleToSend : false,
    
    isShowIndexPageInfo : false,
    
    contentModel: {
        adminNum: null,
        userNum: null,
        goodsCount : 0,
        totalMoney : 0,
        adminName: null,
        adminID: null,
        adminType: null,
        newPwd: null,
        newPwd2: null
    },

    init: function($scope){
        this.scope = $scope;
       
        this.scope.contentModel = this.contentModel;
        
        this.scope.isShowIndexPageInfo = this.isShowIndexPageInfo;
        
        this.getData();
        
        this.getStatics();
        
        this.getSelfInfo();
        
        this.onEvent();
    },

    reFresh: function(){
        var self = this;

        self.contentModel.newPwd = null;
        self.contentModel.newPwd2 = null;
    },
    
    getStatics : function(){
    	 var self= this;
    	 $data.httpRequest("post",api.API_GET_STATISTICS,{},function(data){
    	 
    	 	self.contentModel.goodsCount = data.statistics.goodsNum;
    	 	self.contentModel.totalMoney = data.statistics.totalTurnover;
    	 	if(self.contentModel.totalMoney.length>=12)
    	 	{
    	 		 self.changgeFontSize();
    	 	}
    	 	else
    	 	{
    	 		
    	 	}
    	    self.scope.$apply();
    	 })
        
     
    },
    
    
    getSelfInfo : function(){
    	
    	var self = this;
    	
    	$data.httpRequest("post",api.API_GET_SELF_INFO,{},function(data){
    		
    		if(_utility.isEmpty(data.userInfo.entries))
    		{
    			self.isAbleToSend = true;
    			self.isShowIndexPageInfo = true;
    		   
    		}
    		else{
    			
    			for(var i = 0; i< data.userInfo.entries.length; i ++ )
    			{
    				if(data.userInfo.entries[i].entryId = "10")
    				{
    				    for(var j = 0; j < data.userInfo.entries[i].children.length; j ++)
    				    {
    				    	
    				    	if(data.userInfo.entries[i].children[j].entryId == "1001")
	    				    {
	    				    	self.isAbleToSend = true;
	    				    }
    				    }
    				}
    			}
    		
    		}
    		
    		localStorage.setItem("isAbleToSend",self.isAbleToSend);
            self.scope.isShowIndexPageInfo = self.isShowIndexPageInfo;
            if(self.isShowIndexPageInfo)
            {
            	$(".mn-show-info").removeClass("hidden")
            	
            }
            self.scope.$apply();
    	})
    	
    },
    
    
    changgeFontSize :function(){
    	$(".bg-4").css({"padding-left":"10px"});
    	$(".bg-4-h").css({"font-size":"17px"});
    },
    getData: function(){
        var self = this,
            userInfo = JSON.parse(localStorage.getItem(strKey.K_USER_INFO));
            
        if(_utility.isEmpty(userInfo))
        {
        	location.href = "login.html";
        }

        self.contentModel.adminName = userInfo.platformId;
        self.contentModel.adminID = userInfo.userId;
        if(_utility.isEmpty(userInfo.entries))
        {
            self.contentModel.adminType = CN_TIPS.SUPER_ADMIN;
        }
        else
        {
            self.contentModel.adminType = CN_TIPS.COMMON_ADMIN;
        }
       
        //用户统计
        $data.httpRequest("post", api.API_GET_USER_STATISTICS, {}, function(data){

            var arr = data;
            for(var i = 0; i < arr.length; i++)
            {
                if(arr[i].userType == 1)
                {
                    self.contentModel.userNum = arr[i].count;
                }
                if(arr[i].userType == 2)
                {
                    self.contentModel.adminNum = arr[i].count;
                }
            }
            self.scope.$apply();
        })
    },

    onEvent: function(){
        var self = this;

        //修改密码
        self.scope.modPassword = function(){
            self.reFresh();

            $dialog.open('修改密码',['400px', '230px'], $('#layerBox'), function(){
                self.mod();
            });
        };
    },

    mod: function(){
        var self = this;

        var params = {
            userId: self.contentModel.adminID,
            password: self.contentModel.newPwd2
        };

        if(self.checkParams())
        {
            $data.httpRequest("post", api.API_MOD_ADMIN_PWD, params, function(){
                layer.closeAll();
                $dialog.msg(CN_TIPS.MOD_OK, 1.8);
            })
        }
    },

    checkParams: function(){
        var self = this;

        if(_utility.isEmpty(self.contentModel.newPwd))
        {
            $dialog.msg(CN_TIPS.NEW_PWD_BLANK, 1.8);
            return false;
        }
        if(self.contentModel.newPwd != self.contentModel.newPwd2)
        {
            $dialog.msg(CN_TIPS.DIFF_PWD, 1.8);
            return false;
        }

        return true;
    }
};