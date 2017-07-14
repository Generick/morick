


var initTab = {
    /**
     * ��ʼ���ײ�����
     * @param $scope ������
     * @param page 0��ʾ�н����£�1������������2��ʾ������ʷ��3��ʾ�ҵ�
     */
    start: function($scope, page){
    	$scope.tabs = tab;
    	if(page != -1){
        	tab[page].isActive = true;
    	}
        
        $scope.onClickSwitchTab = function(index)
        {   
            //3����Ҫ�޸�index��ֵ
            if (index == 0)
            {        
		        //刷新  、跳转到指定位置【详情页】 	
		        //刷新   非正在拍卖的详情页点击
				//跳转指定位置  正在拍卖的详情点击
            	if(!commonFu.isEmpty(sessionStorage.getItem("itIsGuessPage")))
            	{ 
            				
            		sessionStorage.removeItem("itIsAuctionPage")
	            	sessionStorage.removeItem("itIsSelectPage")
	            	sessionStorage.removeItem("itIsGuessPage")
            		if(commonFu.isEmpty(sessionStorage.getItem("guessAlreadyGet")))
            		{  
            				   
	            		if(!commonFu.isEmpty(GuessInfoCtrl.thisDetailPage) && !commonFu.isEmpty(GuessInfoCtrl.thisDataId))
	            		{    
	            			sessionStorage.setItem("needGuessPage",1)
//	            			location.href = pageUrl.GUESS_PAGE  +"?backPage=" + GuessInfoCtrl.thisDetailPage + "&thisDataId=" + GuessInfoCtrl.thisDataId;
//	            		    
	            		    var obj = new Base64();
						   	
							var id_base64 = obj.encode(GuessInfoCtrl.thisDataId);
									    	
							var thisPage_base64 = obj.encode(GuessInfoCtrl.thisDetailPage);
									
							var str = pageUrl.GUESS_PAGE +"?backPage=" +thisPage_base64 + "&thisDataId=" + id_base64;		    	
								
							location.href = encodeURI(str);
	            		    
	            		    
	            		    
	            		
	            		}
	            		else
	            		{
	            				
	            			location.href = pageUrl.GUESS_PAGE;
	            		}
            		}
            		else 
            		{    
                                
            			location.href = pageUrl.GUESS_PAGE;
            		}
            	}
            	else
            	{  
            		sessionStorage.removeItem("itIsAuctionPage")
	            	sessionStorage.removeItem("itIsSelectPage")
	            	sessionStorage.removeItem("itIsGuessPage")
            		location.href = pageUrl.GUESS_PAGE;
            	}    			  
            	
            }
            else if (index == 1)
            {    
            	
            	//  刷新  、跳转到指定位置【详情页】
		            	
		        //刷新   非正在拍卖的详情页点击
				//跳转指定位置  正在拍卖的详情点击
            	if(!commonFu.isEmpty(sessionStorage.getItem("itIsSelectPage")))
            	{ 
            				
            		sessionStorage.removeItem("itIsAuctionPage")
	            	sessionStorage.removeItem("itIsSelectPage")
	            	sessionStorage.removeItem("itIsGuessPage")
            		if(commonFu.isEmpty(sessionStorage.getItem("alreadyGet")))
            		{  
            				   
	            		if(!commonFu.isEmpty(GoodsInfoCtrl.thisDetailPage) && !commonFu.isEmpty(GoodsInfoCtrl.thisDataId))
	            		{    
	            			sessionStorage.setItem("needPage",1);
	            			
	            			var obj = new Base64();
						   	
							var id_base64 = obj.encode(GoodsInfoCtrl.thisDataId);
									    	
							var thisPage_base64 = obj.encode(GoodsInfoCtrl.thisDetailPage);
									
							var str = pageUrl.SELECTED_GOODS +"?backPage=" +thisPage_base64 + "&thisDataId=" + id_base64;		    	
								
							location.href = encodeURI(str);
	            			
	            			
//	            			location.href = pageUrl.SELECTED_GOODS  +"?backPage=" + GoodsInfoCtrl.thisDetailPage + "&thisDataId=" + GoodsInfoCtrl.thisDataId;
	            		}
	            		else
	            		{
	            				
	            			location.href = pageUrl.SELECTED_GOODS;
	            		}
            		}
            		else 
            		{    
                                
            			location.href = pageUrl.SELECTED_GOODS;
            		}
            	}
            	else
            	{  
            		sessionStorage.removeItem("itIsAuctionPage")
	            	sessionStorage.removeItem("itIsSelectPage")
	            	sessionStorage.removeItem("itIsGuessPage")
            		location.href = pageUrl.SELECTED_GOODS;
            	}    			
  
            }
            else if (index == 2)
            {   
                if(!commonFu.isEmpty(sessionStorage.getItem("itIsAuctionPage")))
            	{    
            		sessionStorage.removeItem("itIsAuctionPage")
	            	sessionStorage.removeItem("itIsSelectPage")
	            	sessionStorage.removeItem("itIsGuessPage")
            		if(commonFu.isEmpty(sessionStorage.getItem("hasGetData")))
            		{  
            				    
	            		if(!commonFu.isEmpty(auctedGoodsDetailController.thisDetailPage) && !commonFu.isEmpty(auctedGoodsDetailController.thisDataId))
	            		{   
	            			sessionStorage.setItem("needPageId",1);
	            			
	            			
	            			
	            			var obj = new Base64();
						   	
							var id_base64 = obj.encode(auctedGoodsDetailController.thisDataId);
									    	
							var thisPage_base64 = obj.encode(auctedGoodsDetailController.thisDetailPage);
									
							var str = pageUrl.AUCTION_HISTORY +"?backPage=" +thisPage_base64 + "&thisDataId=" + id_base64;		    	
								
							location.href = encodeURI(str);
	            			
//	            			location.href = pageUrl.AUCTION_HISTORY  +"?backPage=" + auctedGoodsDetailController.thisDetailPage + "&thisDataId=" + auctedGoodsDetailController.thisDataId;
	            		}
	            		else
	            		{   
                                   
	            			location.href = pageUrl.AUCTION_HISTORY;
	            		}
	            				
	            	}
	            	else 
	            	{    
	            	          
	            		location.href = pageUrl.AUCTION_HISTORY;
	            	}
            	}
            	else
            	{  
            		sessionStorage.removeItem("itIsAuctionPage")
	            	sessionStorage.removeItem("itIsSelectPage")
	            	sessionStorage.removeItem("itIsGuessPage")
            		location.href = pageUrl.AUCTION_HISTORY;
            	}
             
            }
        }
    }
};