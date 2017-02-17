/**
 * Created by Administrator on 2017/1/4.
 */
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
                location.href = pageUrl.SELECTED_GOODS;
            }
            if (index == 1)
            {
                location.href = pageUrl.AUCTION_HISTORY;
            }
            if (index == 2)
            {
                location.href = pageUrl.PERSON_CENTER;
            }
        }
    }
};