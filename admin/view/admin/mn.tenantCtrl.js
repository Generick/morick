/**
 * Created by Jack on 2016/11/18.
 */
var tenantCtrl = {
    
    scope: null,
    
    goodsModel : {
    	
    	addUserName : '',
    
	    addUserAccount :'',
	    
	    addUserPassword : '',
	    
	    modUserPassword : '',
	    
	    modUserAccount :'',
	    
	    isSelectAll : false,
        
        tenantList: [],
        
        chooseArr : [],
        
        showIndex : null,
    },
    
   
    init:function($scope){
    	
    	this.scope = $scope;
    	
    	this.scope.goodsModel = this.goodsModel;
    	
    	this.getTenantList();
    	
    	this.bindEvent();
    },
    
    getTenantList : function(){
    	
    	var self = this;
    
        pageController.pageInit(self.scope, api.API_GET_TENANTlIST, {},
           
            function(data){
//          	console.log(JSON.stringify(data))

              
                if(self.scope.page.selectPageNum)
                {
                    var pageNum = Math.ceil(data.count / self.scope.page.selectPageNum);
                    pageController.pageNum(pageNum);
                }

                self.goodsModel.tenantList = data.MCHList;

                for(var i = 0; i < self.goodsModel.tenantList.length; i++)
                {
                   self.goodsModel.tenantList[i].selected = false;
                  
                }
//              alert(JSON.stringify(data))
                self.scope.$apply();
            })
 
    },
    
    
    bindEvent : function(){
    	
    	var self = this;
    	
    	self.scope.addTenant = function(title){
    		
    		
    		
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
	    			 layer.msg("账号不能为空！", {time: 1600, anim: 5});
	    			  return;
	    		}
	    		if(self.goodsModel.addUserAccount.length < 4)
	    		{
	    			 layer.msg("账号不能少于4位！", {time: 1600, anim: 5});
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
	    		params.accountName = self.goodsModel.addUserAccount;
	    		params.password = self.goodsModel.addUserPassword;
	    		params.name = self.goodsModel.addUserName;
	    		$data.httpRequest("post", api.API_ADD_TENANT, params, function(){
	                self.getTenantList();
	                layer.close(self.goodsModel.showIndex);
	                layer.msg("添加商户成功！", {time: 1600, anim: 5});
	                self.goodsModel.addUserName = '';
	                self.goodsModel.addUserAccount = '';
	                self.goodsModel.addUserPassword = '';
	                self.scope.goodsModel = self.goodsModel;
                })
            }
        })
    		
    	};
    	
    	self.scope.deleteTenant = function(){
    		
    		var arr = [];
    		for(var i = 0; i < self.goodsModel.tenantList.length; i++)
    		{
    			if(self.goodsModel.tenantList[i].selected)
    			{
    				arr.push(self.goodsModel.tenantList[i].userId)
    			}
    		}
    	    if(arr.length == 0)
    	    {
    	    	 layer.msg("请选择商户！", {time: 1600, anim: 5});
    	    	 return;
    	    }
    	    var params = {};
    	    params.ids = JSON.stringify(arr);
    		$data.httpRequest("post", api.API_DELETE_TENANT, params, function(){
                self.getTenantList();

                layer.msg("删除商户成功！", {time: 1600, anim: 5});
            })
    	};
    	
    	
    	self.scope.modPwd = function(item){
    		
//  		alert(JSON.stringify(item))
    		
    		self.goodsModel.modUserAccount = item.accountName;
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
                if(self.goodsModel.modUserAccount == null ||self.goodsModel.modUserAccount == '' || self.goodsModel.modUserAccount == "")
                {
                	layer.msg("账号不能为空！", {time: 1600, anim: 5});
	    			  return;
                }
                if(self.goodsModel.modUserPassword == null || self.goodsModel.modUserPassword == "" || self.goodsModel.modUserPassword == '')
                {
                	layer.msg("新密码不能为空！", {time: 1600, anim: 5});
	    			  return;
                }
                if(self.goodsModel.modUserAccount.length < 4)
                {
                	layer.msg("账号不能少于4位！", {time: 1600, anim: 5});
	    			  return;
                }
                if(self.goodsModel.modUserPassword.length < 5)
                {
                	layer.msg("新密码不能少于5位！", {time: 1600, anim: 5});
	    			  return;
                }
                var params = {};
                params.accountName = self.goodsModel.modUserAccount;
    			params.newPWD = self.goodsModel.modUserPassword;
    			
    			$data.httpRequest("post", api.API_MOD_TENANT_PASSWORD, params, function(){
                	self.getTenantList();

               	 layer.msg("密码修改成功！", {time: 1600, anim: 5});
                })
    		     layer.close(self.goodsModel.showIndex);
    		     self.goodsModel.modUserPassword = '';
    		     self.scope.goodsModel.modUserPassword = self.goodsModel.modUserPassword;
        
             }
            })
    	};
    	
    	
    	
    	self.scope.oneSel = function(item){
    		
    		item.selected = !item.selected;
    		var judje = true;
    		for(var i = 0; i < self.goodsModel.tenantList.length; i++)
            {
            	if(!self.goodsModel.tenantList[i].selected)
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
    			for(var i = 0; i < self.goodsModel.tenantList.length; i++)
	            {
	            
	                 self.goodsModel.tenantList[i].selected = true;
	            }
    		}
    		else{
    			for(var i = 0; i < self.goodsModel.tenantList.length; i++)
	            {
	            
	                self.goodsModel.tenantList[i].selected = false;
	            }
    		}
    	};
    },
};