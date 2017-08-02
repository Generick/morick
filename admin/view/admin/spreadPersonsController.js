
var spreadPersonsCtr = {
	
	scope : null,
	
	getListModel : {
		
		startIndex1 : 0,
		currentPage1 : 1,
		friendOrders : [],
		
		startIndex2 : 0,
		currentPage2 : 1,
		friendList : [],
		
		startIndex3 : 0,
		currentPage3 : 1,
		payDataList : [],
	},
	
	sortModel : {

    	name :'',
    	id : null,
    	
    },
    
	tabModel:{
		name : '',
		id : null
	},
	goodsModel : {
    	
    	addUserName : '',
    
	    addUserAccount :'',
	    
	    addUserPassword : '',
	    
	    modUserPassword : '',
	    
	    modUserAccount :'',
	    
	    isSelectAll : false,
        
        speradList: [],
        
        chooseArr : [],
        
        showIndex : null,
        
        isShowInfo : false,
        
        conditionsArr : [     
           
        ],
         
        erWeiCodeUrlInner : null,
         
        erWeiCodeUrl : null,
        
	    startTime: null, //开始时间
	    
        endTime: null, //结束时间
        
	    userId : null,
	    
	    userTel : null,
	    
	    userN : '',
	    
	    userName :'',
	    
	    userTelephone : null,
	    
	    userWaitCheckAmount : null,
	    
	    userFriendsTotalFee : null,
	    
	    userHistoryReturnTotal : null,
	    
	    userQrcode : null,
	    
	    isTabIndex : 1,
    },
	
	
	init: function($scope){
		
		this.scope = $scope;
		
		this.initData();
		
		this.scope.sortModel = this.sortModel;
		
		this.scope.tabModel = this.tabModel;
		
		this.scope.goodsModel = this.goodsModel;
		
	    this.scope.getListModel = this.getListModel;
		
		this.getSpreadList();
		
		this.eventBind();
	},
	
	initData : function(){
		
		var self = this;
		
		 var start = {
            format:"YYYY-MM-DD hh:mm:ss",
            minDate:"1900-01-01 00:00:00",
            maxDate:"2099-12-31 23:59:59",
            choosefun: function(elem, datas) {
                end.minDate = datas;
            }
        };
        var end = {
            format:"YYYY-MM-DD hh:mm:ss",
            minDate:"1900-01-01 00:00:00",
            maxDate:"2099-12-31 23:59:59",
            choosefun: function(elem, datas) {
                start.maxDate = datas;
            }
        };

        $("#sTime").jeDate(start);
        $("#eTime").jeDate(end);
	},
	
	
	getSpreadList : function(){
		
		var self = this;
		pageController.pageInit(self.scope, api.API_GET_SPREAD_LIST, {},
           
            function(data){
//          	console.log(JSON.stringify(data))
                if(data.count == 0)
                {
                	 layer.msg("暂无数据！", {time: 1600, anim: 5});
                }
              
                if(self.scope.page.selectPageNum)
                {
                    var pageNum = Math.ceil(data.count / self.scope.page.selectPageNum);
                    pageController.pageNum(pageNum);
                }

                self.goodsModel.speradList = data.promotersList;

                for(var i = 0; i < self.goodsModel.speradList.length; i++)
                {
                   self.goodsModel.speradList[i].selected = false;
                   
                }
//              alert(JSON.stringify(data))
                self.scope.$apply();
                $(".canBeDis").attr("disabled",true);
                $(".canBeDis").css({"background":"#ffffff","border":"none"});
            })
		
	},
	
	
	eventBind : function(){
		
		var self = this;
		
		
		self.scope.toTab = function(){
			
			if($("#online-div-22").css("display")=="none")
			{
				$("#online-div-22").css("display","block")
			}
			else{
				$("#online-div-22").css("display","none")
			}
			
			
		};
		
		self.scope.chooseTab = function(type){
			if(type == 0)
			{
				self.tabModel.name = '注册时间';
				self.tabModel.id = 0;
			}
			else if(type == 1)
			{
				self.tabModel.name = '消费金额';
				self.tabModel.id = 1;
			}
			else if(type == 2)
			{
				self.tabModel.name = '最近消费时间';
				self.tabModel.id = 2;
			}
			else{}
			self.scope.tabModel = self.tabModel;
			$("#online-div-22").css("display","none")
		};
		
	
		
		self.scope.toSort = function(){
			if($("#online-div-33").css("display")=="none")
			{
				$("#online-div-33").css("display","block")
			}
			else{
				$("#online-div-33").css("display","none")
			}
		    
		};
		
		self.scope.chooseSort = function(type){
			if(type == 0)
			{
				self.sortModel.name = '倒序';
                self.sortModel.id = 0;
			}
			else if(type == 1)
			{
				self.sortModel.name = '顺序';
                self.sortModel.id = 1;
			}
			else{}
			self.scope.sortModel = self.sortModel;
			$("#online-div-33").css("display","none")
		};
		
		
		
		self.scope.searchFriends = function(){
			
			self.getFriendList();
			
		};
		
		self.scope.chooseWhichTab = function(type){
			
			
			$(".firstTab").eq(type-1).css({"background":"#5FBEAA","color":"#ffffff"}).siblings().css({"background":"#ededed","color":"#666666"})
			self.goodsModel.isTabIndex = type;
			self.scope.goodsModel.isTabIndex = self.goodsModel.isTabIndex;
			if(type == 1)
			{
				self.getFriendOrders();
			}else if(type == 2)
			{
				self.getFriendList();
			}
			else {
				self.getPayList();
			}
			
		};
		
		self.scope.addConditions = function(){
			
			if(self.goodsModel.conditionsArr.length > 0)
			{
				if(self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 1].isUped == false)
				{   
					 layer.msg("请先填写空白条件！", {time: 1600, anim: 5});
				     return;
				}
				else{
		    	
		    	var obj = {};
				obj.numb = null;
				obj.persent = null;
				obj.isUped = false;
				obj.id = -1;
				self.goodsModel.conditionsArr.push(obj);
				
			    }
				
			}
			else
			{
				var obj = {};
				obj.numb = null;
				obj.persent = null;
				obj.isUped = false;
				obj.id = -1;
				self.goodsModel.conditionsArr.push(obj);
			}
		    self.scope.goodsModel.conditionsArr = self.goodsModel.conditionsArr;
				self.scope.$apply()
		};
		
		self.scope.setConditionsOk = function(){
			if(self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 1].numb <= 0)
			{
				 layer.msg("当前条件金额应大于0！", {time: 1600, anim: 5});
			     return;
			}
			if(self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 1].persent <= 0)
			{
				 layer.msg("当前条件分成比例应大于0！", {time: 1600, anim: 5});
			     return;
			}
			if(self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 1].persent > 100)
			{
				 layer.msg("当前条件分成比例应小于100！", {time: 1600, anim: 5});
			     return;
			}
			if(self.goodsModel.conditionsArr.length > 1)
			{
				if(self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 1].numb <= self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 2].numb)
				{
					 layer.msg("当前条件金额应大于上一条金额！", {time: 1600, anim: 5});
				     return;
				}
				if(self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 1].persent <= self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 2].persent)
				{
					 layer.msg("当前条件分成比例应大于上一条分成比例！", {time: 1600, anim: 5});
				     return;
				}
			}
			if(self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 1].id != -1)
			{
				layer.msg("请添加条件！", {time: 1600, anim: 5});
				return;
			}
			
			var params= {};
//			params.userId = self.userId;
            params.userId =  self.goodsModel.userId;
			params.condition_money = parseInt(self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 1].numb);
			params.condition_rate = parseInt(self.goodsModel.conditionsArr[self.goodsModel.conditionsArr.length - 1].persent);
			$data.httpRequest("post", api.API_ADD_SPREAD_CONDITIONS, params, function(){
		                
		                $(".canBeDis").attr("disabled",true);
                        $(".canBeDis").css({"background":"#ffffff","border":"none"});
		                layer.close(self.goodsModel.showIndex);
		                layer.msg("添加成功！", {time: 1600, anim: 5});
		                self.getConditons()
		              
		                
	        })
		};
		
		self.scope.back2UserList = function(){
			
			self.goodsModel.isShowInfo = false;
			
			self.scope.goodsModel = self.goodsModel;
			self.getSpreadList();
		};
		
		self.scope.oneSel = function(item){
    		
    		item.selected = !item.selected;
    		var judje = true;
    		for(var i = 0; i < self.goodsModel.speradList.length; i++)
            {
            	if(!self.goodsModel.speradList[i].selected)
            	{
            		judje = false;
            	}
                 
            }
    		if(judje)
    		{
    			self.goodsModel.isSelectAll = true;
    		
    		}
    		else{
    			self.goodsModel.isSelectAll = false;
    		}
    			self.scope.goodsModel = self.goodsModel;
    	};
    	
    	self.scope.allSel = function(){
    		
    		self.goodsModel.isSelectAll = !self.goodsModel.isSelectAll;
    		self.scope.goodsModel = self.goodsModel;
    		if(self.goodsModel.isSelectAll)
    		{
    			for(var i = 0; i < self.goodsModel.speradList.length; i++)
	            {
	            
	                 self.goodsModel.speradList[i].selected = true;
	            }
    		}
    		else{
    			for(var i = 0; i < self.goodsModel.speradList.length; i++)
	            {
	            
	                self.goodsModel.speradList[i].selected = false;
	            }
    		}
    	};
		
		
		self.scope.deletePersons = function(){
			
			var arr = [];
    		for(var i = 0; i < self.goodsModel.speradList.length; i++)
    		{
    			if(self.goodsModel.speradList[i].selected)
    			{
    				arr.push(self.goodsModel.speradList[i].userId)
    			}
    		}
    	    if(arr.length == 0)
    	    {
    	    	 layer.msg("请选择推广员！", {time: 1600, anim: 5});
    	    	 return;
    	    }
    	    var params = {};
    	    params.userIds = JSON.stringify(arr);
    		$data.httpRequest("post", api.API_DELETE_SPREAD, params, function(){
                self.getSpreadList();

                layer.msg("删除推广员成功！", {time: 1600, anim: 5});
            })
		};
		
		
		self.scope.toSeeDetail = function(item){
			
			self.goodsModel.userId = item.userId;
//			self.goodsModel.userId = 41;
			
			self.goodsModel.isShowInfo = true;
			
			self.scope.goodsModel = self.goodsModel;
			
			self.resetData();
			
		    self.getConditons();
		    
			self.getSpreadInfo();
			
			self.getFriendOrders();
			
			$(".firstTab").eq(0).css({"background":"#5FBEAA","color":"#ffffff"}).siblings().css({"background":"#ededed","color":"#666666"})
		};
		
		
		
		self.scope.deleteCondition = function(item,index){
			
			var params = {};
			if(item.id == -1)
			{
				self.goodsModel.conditionsArr.splice(index,1);
				self.getConditons()
			}
			else{
				for(var i = 0; i < self.goodsModel.conditionsArr.length; i++)
				{
					if(index == i)
					{   
						params.id = item.id;
						self.goodsModel.conditionsArr.splice(index,1)
					}
				}
				
	//			obj.id = -1;
				$data.httpRequest("post", api.API_DELETE_SPREAD_CONDITIONS, params, function(){
					self.getConditons()
					
				})
			}
			
			
		};
		
		
		
		self.scope.settleAccounts = function(item){
			if(item.waitCheckAmount == 0){
				layer.msg("该推广员没有待结金额！", {time: 1600, anim: 5});
                  return;
			}
			var params = {};
			params.userId = item.userId;
			params.amount = item.waitCheckAmount;
			$data.httpRequest("post", api.API_SETTLE_ACCOUNTS, params, function(){
		                self.getSpreadList();
		                layer.close(self.goodsModel.showIndex);
		                layer.msg("结账成功！", {time: 1600, anim: 5});
		                
		                self.scope.goodsModel = self.goodsModel;
	        })
		};
		
		self.scope.addPersons = function(title){
			
				layer.open({
	            type: 1,
	            skin: 'layer-ex-skin',
	            title: title,
	            area: '600px',
	            btn: ['确定', '取消'],
	            content: $('#layerBoxtenadd'),
	            yes: function(index){
	            	self.goodsModel.showIndex = index;
	             	if(self.goodsModel.addUserName == "" || self.goodsModel.addUserName == '')
		    		{   
		    			 layer.msg("昵称不能为空！", {time: 1600, anim: 5});
		    			  return;
		    		}
		    		if(self.goodsModel.addUserName.length < 4)
		    		{   
		    			 layer.msg("昵称不能少于4位！", {time: 1600, anim: 5});
		    			  return;
		    		}
		    		if(self.goodsModel.addUserAccount == ""|| self.goodsModel.addUserAccount == '')
		    		{
		    			 layer.msg("手机号不能为空！", {time: 1600, anim: 5});
		    			  return;
		    		}
		    		if(!(/^1[34578]\d{9}$/.test(self.goodsModel.addUserAccount))){
		    			
		    			layer.msg("请输入正确的手机号！", {time: 1600, anim: 5});
		    			  return;
		    		}

		    		if(self.goodsModel.addUserPassword == "" || self.goodsModel.addUserPassword == '')
		    		{
		    			 layer.msg("密码不能为空！", {time: 1600, anim: 5});
		    			 return;
		    		}
		    		if(self.goodsModel.addUserPassword.length< 5)
		    		{
		    			 layer.msg("密码不能少于5位！", {time: 1600, anim: 5});
		    			 return;
		    		}
		    		
		    		var params = {};
		    		params.telephone = self.goodsModel.addUserAccount;
		    		params.password = self.goodsModel.addUserPassword;
		    		params.name = self.goodsModel.addUserName;
		    		
		    		$data.httpRequest("post", api.API_ADD_SPREAD, params, function(){
		                self.getSpreadList();
		                layer.close(self.goodsModel.showIndex);
		                layer.msg("添加推广员成功！", {time: 1600, anim: 5});
		                self.goodsModel.addUserName = '';
		                self.goodsModel.addUserAccount = '';
		                self.goodsModel.addUserPassword = '';
		                self.scope.goodsModel = self.goodsModel;
	                })
	            }
	        })
		};
		
		
		self.scope.modPwd = function(item){
			
			self.goodsModel.modUserAccount = item.telephone;
    		self.scope.goodsModel = self.goodsModel;

	
			layer.open({
		            type: 1,
		            skin: 'layer-ex-skin',
		            title: "修改密码",
		            area: '600px',
		            btn: ['确定', '取消'],
		            content: $('#layerBoxtenmod'),
		            yes: function(index){
		               self.goodsModel.showIndex = index;
		                
		                if(self.goodsModel.modUserPassword == null || self.goodsModel.modUserPassword == "" || self.goodsModel.modUserPassword == '')
		                {
		                	layer.msg("新密码不能为空！", {time: 1600, anim: 5});
			    			  return;
		                }
		                
		                if(self.goodsModel.modUserPassword.length < 5)
		                {
		                	layer.msg("新密码不能少于5位！", {time: 1600, anim: 5});
			    			  return;
		                }
		                var params = {};
		                params.telephone = self.goodsModel.modUserAccount;
		    			params.newPWD = self.goodsModel.modUserPassword;
		    			
		    			$data.httpRequest("post", api.API_MOD_SPERAD_PWD, params, function(){
		                	self.getSpreadList();
		
		               	 layer.msg("密码修改成功！", {time: 1600, anim: 5});
		                })
		    		     layer.close(self.goodsModel.showIndex);
		    		     self.goodsModel.modUserPassword = '';
		    		     self.scope.goodsModel.modUserPassword = self.goodsModel.modUserPassword;
		        
		        }
		    })
		};
		self.scope.searchFriendOrder = function(){
			
			self.getFriendOrders();
			
		};
		
		self.scope.generateQr = function(item){//生成二维码
			
			$(".erWeiCode-fix,.erWeiCode").css("display","block")
			        
			        self.goodsModel.userTel = item.telephone;
			        self.goodsModel.userN = item.name;
			
			    	//创建二维码
		            var  parameter = item.url.split("PMTID=")[1];
		            var  str = item.url.split("?PMTID=")[0];
			   	    var obj =new Base64();
			   	    var para = obj.encode(parameter);
//			   	    str = "192.168.0.163/auction/login.html";
			   	    var str = str +"?PMTID=" + para;
			   	    str = encodeURI(str)
			   	    self.goodsModel.erWeiCodeUrl = str;
			   	   
			   	   if(str != '' && str != null)
			   	   {    
				   	   	if($("#qrcode canvas").length > 0)
			            {
			
			            	$("#qrcode canvas:first-of-type").remove();
			            	
			            }
			            else{}
			   	   	    jQuery('#qrcode').qrcode({width: 200,height: 200,text: str});
			   	   }
			
			   
			    
		};
		
		self.scope.saveQrCode = function(){
			
			var canvas = $('#qrcode').find("canvas").get(0);
			    try {
			    	//解决IE转base64时缓存不足，canvas转blob下载
			        var blob = canvas.msToBlob();
			        navigator.msSaveBlob(blob, 'qrcode.jpg');
			    } catch (e) {
			    	//如果为其他浏览器，使用base64转码下载
			        var url = canvas.toDataURL('image/jpeg');
			        $("#download").attr({'href': url,"download":"昵称："+self.goodsModel.userN + ' ; ' + "电话："+self.goodsModel.userTel}).get(0).click();
			    }
			    return false;
		};
		
		
		self.scope.saveQrCodeInner = function(){
			
			var canvas = $('#qrcodeInner').find("canvas").get(0);
			    try {
			    	//解决IE转base64时缓存不足，canvas转blob下载
			        var blob = canvas.msToBlob();
			        navigator.msSaveBlob(blob, 'qrcodeInner.jpg');
			    } catch (e) {
			    	//如果为其他浏览器，使用base64转码下载
			        var url = canvas.toDataURL('image/jpeg');
			        $("#downloadInner").attr({'href': url,"download":"昵称："+self.goodsModel.userName + ' ; ' +"电话："+ self.goodsModel.userTelephone}).get(0).click();
			    }
			    return false;
			
		};
		
		self.scope.hideErWei = function(){
			
			
			$(".erWeiCode-fix,.erWeiCode").css("display","none");
		};
		
		
		self.scope.jiezhangInner = function(){
			if(self.goodsModel.userWaitCheckAmount == 0){
				layer.msg("该推广员没有待结金额！", {time: 1600, anim: 5});
                  return;
			}
			var params = {};
			params.userId = self.goodsModel.userId;
			params.amount = self.goodsModel.userWaitCheckAmount;
			$data.httpRequest("post", api.API_SETTLE_ACCOUNTS, params, function(){
		               
						self.getSpreadInfo();
						self.getFriendOrders();
						self.getFriendList();
						self.getPayList();
		                layer.close(self.goodsModel.showIndex);
		                layer.msg("结账成功！", {time: 1600, anim: 5});
		                
//		                self.scope.goodsModel = self.goodsModel;
	        })
			
		};
	},
	
	
	
	getConditons : function(){
		var self = this;
		var params = {};
//		params.userId = self.userId;
		params.userId =  self.goodsModel.userId;
		params.startIndex = 0;
		params.num = 0;
		$data.httpRequest("post", api.API_GET_SPREAD_CONDTIONS, params, function(data){
//		   alert(JSON.stringify(data))
		   
            var objArr = data.conditions;
		    var objCopyArr = [];
		    if(objArr.length > 0)
		    {
		    	for(var i = 0; i < objArr.length; i++)
			    {
			    	var obj = {};
			    	obj.numb = parseInt(objArr[i].condition_money);
			    	obj.persent = parseInt(objArr[i].condition_rate);
			    	obj.isUped = true;
			    	obj.id = objArr[i].id;
			    	objCopyArr.push(obj);
			    	
			    }
			    self.goodsModel.conditionsArr = objCopyArr;
		    }
		    
//		    alert(JSON.stringify(self.goodsModel.conditionsArr))
		    self.scope.goodsModel.conditionsArr = self.goodsModel.conditionsArr;

		   
		    self.scope.$apply()
			$(".canBeDis").attr("disabled",true);
            $(".canBeDis").css({"background":"#ffffff","border":"none"});
//          alert(JSON.stringify(self.goodsModel.conditionsArr))
		})
	},
	
	
	
	getSpreadInfo : function(){
		var self = this;
		
		var params= {};
		params.userId = self.goodsModel.userId;
		$data.httpRequest("post", api.API_GET_SPREAD_DETAIL, params, function(data){
			
//			alert(JSON.stringify(data))
			self.goodsModel.userName = data.info.name;
			self.goodsModel.userTelephone = data.info.telephone;
			self.goodsModel.userWaitCheckAmount = data.info.waitCheckAmount;
			self.goodsModel.userFriendsTotalFee = data.info.friendsTotalFee;
			self.goodsModel.userHistoryReturnTotal = data.info.historyReturnTotal;
			self.goodsModel.userQrcode = data.info.qrcode;
			
			var  parameter = data.info.url.split("PMTID=")[1];
		    var  str = data.info.url.split("?PMTID=")[0];
			var obj =new Base64();
			var para = obj.encode(parameter);
//			str = "192.168.0.163/auction/login.html";
			var str = str +"?PMTID=" + para;
			str = encodeURI(str)
			self.goodsModel.erWeiCodeUrlInner = str;
		
			if(str != '' && str != null)
			{    
				if($("#qrcodeInner canvas").length > 0)
			    {
			
			        $("#qrcodeInner canvas:first-of-type").remove();
			            	
			    }
			    else{}
			   	   	    jQuery('#qrcodeInner').qrcode({width: 200,height: 200,text: str});
			}
			
			
			self.scope.goodsModel = self.goodsModel;
			self.scope.$apply()
			
		})
	},
	
	
	
	getFriendOrders : function(){
		var self = this;
		
//		API_FRIEND_ORDERS
          var $sTime = $("#sTime").val();
          var  $eTime = $("#eTime").val();
          var  params = {
                startIndex: self.getListModel.startIndex1,
                num: 10,
                userId: self.goodsModel.userId,
                
            };
             if(!_utility.isEmpty($sTime))
            {
                params.startTime = _utility.dateToUnix($sTime)
            }
            if(!_utility.isEmpty($eTime))
            {
                params.endTime = _utility.dateToUnix($eTime)
            }
//          alert(JSON.stringify(params))
        $data.httpRequest("post", api.API_FRIEND_ORDERS, params,

            /**
             * 购买记录
             * @param data.count
             * @param data.orderList 订单列表
             * @param data.orderList.orderGoods 藏品
             * @param data.orderList.order_no 订单号
             * @param data.orderList.payPrice 金额
             * @param data.orderList.payTime 付款时间
             */
            function(data){
                var totalPage = Math.ceil(data.count / 10);

                self.getListModel.friendOrders = data.friendsOrders;
//              for(var i = 0; i < self.getListModel.friendOrders.length; i++)
//              {
//                  self.getListModel.friendOrders[i].name = self.getListModel.friendOrders[i].orderGoods[0].goods_name;
//                  self.getListModel.friendOrders[i].img = JSON.parse(self.getListModel.friendOrders[i].orderGoods[0].goods_pics)[0];
//                  self.getListModel.friendOrders[i].payPrice  = _utility.toDecimalTwo(self.getListModel.friendOrders[i].payPrice);//保留两位小树
//              }
				self.scope.getListModel.friendOrders = self.getListModel.friendOrders;
				
                self.scope.$apply();
                $("#simplePage_64").createPage({
                    pageCount: totalPage,
                    current: self.getListModel.currentPage1,
                    backFn: function(curPage){
                        self.getListModel.currentPage1 = curPage;
                        self.getListModel.startIndex1 = (curPage-1)*10;
                        self.scope.getListModel = self.getListModel;
                        self.getFriendOrders();
                    }
                });
            }
        )



	},
	
	getFriendList : function(){
		var self = this;
		
//		
        var  params = {
                startIndex: self.getListModel.startIndex2,
                num: 10,
                userId: self.goodsModel.userId,
                
            };
            
            params.sort = self.tabModel.id;
            params.direction = self.sortModel.id;
            
//          alert(JSON.stringify(params))
        $data.httpRequest("post", api.API_FREIND_LIST, params,

            /**
             * 购买记录
             * @param data.count
             * @param data.orderList 订单列表
             * @param data.orderList.orderGoods 藏品
             * @param data.orderList.order_no 订单号
             * @param data.orderList.payPrice 金额
             * @param data.orderList.payTime 付款时间
             */
            function(data){
                var totalPage = Math.ceil(data.count / 10);
                if(data.count == 0)
                {
                	layer.msg("暂无数据！", {time: 1600, anim: 5});
                }
                self.getListModel.friendList = data.friends;
//              for(var i = 0; i < self.getListModel.friendOrders.length; i++)
//              {
//                  self.getListModel.friendOrders[i].name = self.getListModel.friendOrders[i].orderGoods[0].goods_name;
//                  self.getListModel.friendOrders[i].img = JSON.parse(self.getListModel.friendOrders[i].orderGoods[0].goods_pics)[0];
//                  self.getListModel.friendOrders[i].payPrice  = _utility.toDecimalTwo(self.getListModel.friendOrders[i].payPrice);//保留两位小树
//              }
				self.scope.getListModel.friendList = self.getListModel.friendList;
				
                self.scope.$apply();

                $("#simplePage_65").createPage({
                    pageCount: totalPage,
                    current: self.getListModel.currentPage2,
                    backFn: function(curPage){
                        self.getListModel.currentPage2 = curPage;
                        self.getListModel.startIndex2 = (curPage-1)*10;
                        self.scope.getListModel = self.getListModel;
                        self.getFriendList();
                    }
                });
            }
        )
        
	},
	
	getPayList : function(){
		var self = this;
		
//		
        var  params = {
                startIndex: self.getListModel.startIndex3,
                num: 10,
                userId: self.goodsModel.userId,
                
            };
            
//          alert(JSON.stringify(params))
        $data.httpRequest("post", api.API_COMDITIONS_LIST, params,

            /**
             * 购买记录
             * @param data.count
             * @param data.orderList 订单列表
             * @param data.orderList.orderGoods 藏品
             * @param data.orderList.order_no 订单号
             * @param data.orderList.payPrice 金额
             * @param data.orderList.payTime 付款时间
             */
            function(data){
                var totalPage = Math.ceil(data.count / 10);
                 if(data.count == 0)
                {
                	layer.msg("暂无数据！", {time: 1600, anim: 5});
                }
                self.getListModel.payDataList = data.billRecords;
//              for(var i = 0; i < self.getListModel.friendOrders.length; i++)
//              {
//                  self.getListModel.friendOrders[i].name = self.getListModel.friendOrders[i].orderGoods[0].goods_name;
//                  self.getListModel.friendOrders[i].img = JSON.parse(self.getListModel.friendOrders[i].orderGoods[0].goods_pics)[0];
//                  self.getListModel.friendOrders[i].payPrice  = _utility.toDecimalTwo(self.getListModel.friendOrders[i].payPrice);//保留两位小树
//              }
				self.scope.getListModel.payDataList = self.getListModel.payDataList;
				
                self.scope.$apply();

                $("#simplePage_66").createPage({
                    pageCount: totalPage,
                    current: self.getListModel.currentPage3,
                    backFn: function(curPage){
                        self.getListModel.currentPage3 = curPage;
                        self.getListModel.startIndex3 = (curPage-1)*10;
                        self.scope.getListModel = self.getListModel;
                        self.getPayList();
                    }
                });
            }
        )

	},
	
	
	resetData : function(){
		
		var self = this;
		self.tabModel.id = null;
        self.sortModel.id = null;
        self.tabModel.name = '';
         self.sortModel.name = '';
		self.scope.tabModel = self.tabModel;
		self.scope.sortModel  = self.sortModel;
		self.getListModel.startIndex1 = 0;
		self.getListModel.startIndex2 = 0;
		self.getListModel.startIndex3 = 0;
		self.getListModel.currentPage1 = 1;
		self.getListModel.currentPage2 = 1;
		self.getListModel.currentPage3 = 1;
		self.getListModel.friendOrders = [];
		self.getListModel.friendList = [];
		self.getListModel.payDataList = [];
		self.scope.getListModel = self.getListModel;
	},

}
