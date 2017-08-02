/*
 * 我的收货地址
 */
app.controller("ctrl", function($scope) {
    AddressListCtrl.init($scope);
});

var AddressListCtrl = {
    scope : null,
    
    thisDetailPage : null,
    
    thisDataId : null,
    
    addressModel: {
    	addressArr : [],
    	userId : null,
        type: null //是否从付款页面跳进来1为是
    },

    init: function($scope) {
    	this.scope = $scope; 
    	
    	this.bindClick();
    	
    	this.initData();
    },
    
    initData: function() {
        var self = this;

    	localStorage.setItem(localStorageKey.TOTALADDRESS, "");
        
        if(!commonFu.isEmpty(localStorage.getItem("hereComeFromAuc")) && !commonFu.isEmpty(localStorage.getItem("thisAcPage")) && !commonFu.isEmpty(localStorage.getItem("commodifyId")))
        {   
        	self.thisDetailPage = 	localStorage.getItem("thisAcPage");
        	self.thisDataId = localStorage.getItem("commodifyId");
          
        }
        
        
    	$('.animation').show();
    	
    	self.getAddressList();
    },
    
    //获取我的地址列表
    getAddressList: function() {
    	localStorage.setItem(localStorageKey.TOTALADDRESS, "");
        sessionStorage.removeItem("payOrderId");
    	var self = this;
        var obj = new Base64();
        self.addressModel.userId= obj.decode(commonFu.getQueryStringByKey("userId"));
    	self.addressModel.type = localStorage.getItem(localStorageKey.IS_ADDRESS);
        sessionStorage.setItem("linshiId",self.addressModel.userId);
    	var params = 
    	{
    		startIndex : 0,
    		num : 0,
    		userId : self.addressModel.userId
    	};
    	
    	jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_SHIPPING_ADDRESS, params,
            /**
             * 地址列表
             * @param data.shippingAddressList 列表
             */
            function(data)
            {
                self.addressModel.addressArr = [];
                self.addressModel.addressArr = data.shippingAddressList;
          
                if (self.addressModel.addressArr.length > 0)
                {
                    $(".no-data").hide();
                    var jud = false;
                    for (var i = 0; i < self.addressModel.addressArr.length; i++)
                    {
                        self.addressModel.addressArr[i].mobile = commonFu.telephoneDispose(self.addressModel.addressArr[i].mobile);

                        var str = self.addressModel.addressArr[i].province + self.addressModel.addressArr[i].city + self.addressModel.addressArr[i].district;
                        self.addressModel.addressArr[i].allAddress = str.replace(" ","") + self.addressModel.addressArr[i].address;
                        if(self.addressModel.addressArr[i].isCommon == 1)
                        {
                        	jud = true;
                        }
                    
                    }
                    if(jud == false)
                    {
                    	self.setAdressDefault(self.addressModel.addressArr[0])
                    }
                   
                }
                else
                {
                    $(".no-data").show();
                }

                self.scope.addressModel = self.addressModel;

                $('.animation').hide();
                $('.container').css('opacity','1');
                self.scope.$apply();
            }
        );
    },

    //绑定事件
    bindClick: function() {
    	var self = this;

        //选择地址，返回订单设置地址
        self.scope.selAddress = function(id){
            if(!commonFu.isEmpty(self.addressModel.type)){
                
                var obj = new Base64();
                var ids = obj.encode(id);
                var str = pageUrl.ORDER_DETAIL + "?addressId=" + ids;
                location.href = encodeURI(str)
//              location.href = pageUrl.ORDER_DETAIL + "?addressId=" + id;
            }
        };

    	//是否设为默认
    	self.scope.onClickListSetDefaultAddress = function(item) {
    	
	    		if (item.isCommon == 0)
		    	{
		    		
		    		item.isCommon = 1;
		    	}
		    	else
		    	{
		    	
		    		item.isCommon = 0;
		    	}
	    	
	    		
	    		var modInfo = {};
	    		modInfo.acceptName = item.acceptName;
	    		modInfo.mobile = item.mobile;
	    		modInfo.province = item.province;
    			modInfo.city = item.city;
    			modInfo.district = item.district;
    			modInfo.address = item.address;
    			modInfo.isCommon = item.isCommon;
    			
    			var params = {
	    			addressId: item.id,
	    			modInfo: JSON.stringify(modInfo)
	    		};

	    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_MOD_SHIPPING_ADDRESS, params, function() {
	    			self.initData();
	    		})
    
    		
//  		self.scope.addressModel = self.addressModel;
    	};

    	//编辑
    	self.scope.onClickEditAddress = function(id) {
    		
    		var obj = new Base64();
    		var ids = obj.encode(id);
    		var str = pageUrl.MOD_ADDRESS_LIST + "?id=" + ids;
    		location.href = encodeURI(str);
    		localStorage.setItem(localStorageKey.addressId, id);
    	};
    	
    	//删除
    	self.scope.onClickDelAddress = function(id) {
    		var addressIds = [];
    		addressIds.push(id);
    		
    		var param = 
    		{
    			addressIds : JSON.stringify(addressIds)
    		};
    		
    		$confirmDialog.show("确认删除？",function()
    		{
    			jqAjaxRequest.asyncAjaxRequest(apiUrl.API_DEL_SHIPPING_ADDRESS, param, function()
	    		{
	    			$confirmTip.show("删除成功");
	    			self.initData();
	    		})
    		})
    	};
    	
    	//添加新地址
    	self.scope.onClickAddAddress = function() {
            localStorage.setItem(localStorageKey.addType, "");
    		location.href = pageUrl.ADD_ADDRESS;
    	}
    },
    
    setAdressDefault : function(item){
    	
    	var self = this;
    	if (item.isCommon == 0)
		    	{
		    		
		    		item.isCommon = 1;
		    	}
		    	else
		    	{
		    	
		    		item.isCommon = 0;
		    	}
	    	
	    		
	    		var modInfo = {};
	    		modInfo.acceptName = item.acceptName;
	    		modInfo.mobile = item.mobile;
	    		modInfo.province = item.province;
    			modInfo.city = item.city;
    			modInfo.district = item.district;
    			modInfo.address = item.address;
    			modInfo.isCommon = item.isCommon;
    			
    			var params = {
	    			addressId: item.id,
	    			modInfo: JSON.stringify(modInfo)
	    		};

	    		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_MOD_SHIPPING_ADDRESS, params, function() {
	    			self.initData();
	    		})
    
//  		
//  		self.scope.addressModel = self.addressModel;
    	
    },
    
    
    ngRepeatFinish: function() { //ng-repeat完成后执行的操作

		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){});
    }
};
