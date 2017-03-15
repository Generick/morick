/*
 * 
 * 地区选择
 * 
 */
var addressChooseApp = angular.module('addressChooseApp', []); 
//点击事件的初始化
addressChooseApp.run(function (){
    FastClick.attach(document.body); 
})


addressChooseApp.controller("addressChooseController", function ($scope)
{
    addressChooseController.init($scope);
});


var addressChooseController = 
{
    scope : null,
    mySwiper : null,
	currentNavIndex : 0,
    
    locationParams : {
		province : {
			id : null,
			name : null
		},
		city : {
			id : null,
			name : null
		},
		district : {
			id : null,
			name : null
		},
	},
    
    
    addressModel : 
    {
    	province : [],
    	city : [],
    	district : [],
    	
    	totalAddress : {},
    },
    
    init : function($scope){
		
		this.scope = $scope;
		
		this.getAreaList(0,1);
		
		this.onClickFunction();
		
		this.swiperInit();
		
	},
	
	
	/*
	 * 获取地址
	 */
	getAreaList : function(parentId,type)
	{
		
		var params = {};
		params.parentId = parentId;
		
		var self = this;
		jqAjaxRequest.asyncAjaxRequest(apiUrl.API_GET_AREAS, params, function(data){
			
//			console.log(data)
			if(type == 1)
			{
				self.addressModel.province = data.areas;
			}
			else if(type == 2)
			{
				self.addressModel.city = data.areas;
			}
			else
			{
				self.addressModel.district = data.areas;
			}
			
			self.scope.addressModel = self.addressModel;
			self.scope.$apply();
		})
		
	},
	
	
	/*
	 * 点击事件
	 */
	onClickFunction : function()
	{
		
		var self = this;
		
		this.scope.selAddress = function(index,name,id){
			
			self.currentNavIndex = parseInt(index) + 1;
			$("body").scrollTop(0);
			if(index == 0)
			{
				self.locationParams.province.id = id;
				self.locationParams.province.name = name;
				
				self.getAreaList(id,2);
				self.mySwiper.slideTo(self.currentNavIndex);
			}
			else if(index == 1)
			{
				self.locationParams.city.id = id;
				self.locationParams.city.name = name;
				
				self.getAreaList(id,3);
				self.mySwiper.slideTo(self.currentNavIndex);
			}
			else if(index == 2)
			{
				self.locationParams.district.id = id;
				self.locationParams.district.name = name;
				
				self.addressModel.totalAddress.province = self.locationParams.province.name;
				self.addressModel.totalAddress.city = self.locationParams.city.name;
				self.addressModel.totalAddress.district = self.locationParams.district.name;
				
				localStorage.setItem(localStorageKey.TOTALADDRESS, JSON.stringify(self.addressModel.totalAddress));
				
				var type = commonFu.getQueryStringByKey("addressType");
				
				if (type == 0)
				{
					location.href = pageUrl.MOD_ADDRESS;
				}
				else if (type == 1)
				{
					var id = localStorage.getItem(localStorageKey.addressId);
					location.href = pageUrl.MOD_ADDRESS_LIST + "?id=" + id;
					localStorage.setItem(localStorageKey.addressId,"");
				}
				else
				{
					location.href = pageUrl.ADD_ADDRESS;
				}
			}
			
		}
		
		/*
		 * type,0表示所有省；1，表示省下所有城市，2表示市下所有地区
		 */
		this.scope.selAll = function(type){
			if(type == 0)
			{
				var params = {};
				params.id = "";
				params.name = "全部";
			}
			else if(type == 1)
			{
				var params = {};
				params.id = self.locationParams.province.id;
				params.name = self.locationParams.province.name;
				
			}
			else
			{
				var params = {};
				params.id = self.locationParams.city.id;
				params.name = self.locationParams.city.name;
				
			}
		}
		
	},
	
	
	/*
	 * swiper初始化
	 */
	swiperInit : function(){
		var self = this;
			
		self.mySwiper = new Swiper('.swiper-container', {
			
		});
		self.mySwiper.detachEvents();
		
	}
    
    
}
