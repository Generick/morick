<?php
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 2016/10/25
 * Time: 9:26
 */

class M_admin extends My_Model{
    function __construct()
    {
        parent::__construct();
    }

    // region admin
    ///////////////////////////////////////////////////
    function createAdminUser($userId, $adminType, $accountId, $pageEntriesString)
    {
        if ( ($adminType != ADMIN_TYPE_SUPER) &&
            ($adminType != ADMIN_TYPE_NORMAL) )
        {
            log_message('error', "Input admin type is incorrect: " . $adminType);
            return ERROR_PARAM;
        }

        if ($userId == 0)
        {
            log_message('error', "Input userId is incorrect: " . $userId);
            return ERROR_PARAM;
        }
        $whereFields = array(
            'userId' => $userId
        );
        $dbData = $this->m_common->get_one('admin', $whereFields);
        if (count($dbData) > 0)
        {
            return ERROR_ACCOUNT_ADMIN_EXISTS;
        }
        else
        {
            $dbData = $this->m_common->insert('admin', array(
                'userId' => $userId,
                'adminType' => $adminType,
            ));

            if (!$dbData)
            {
                return ERROR_SYSTEM;
            }
        }

        if ($adminType == ADMIN_TYPE_NORMAL)
        {
            // 删除原来的可访问页面
            $this->m_common->delete('adminpageprivilege', array('adminUserId' => $userId));

            // 插入可以访问的页面
            $pageEntries = json_decode($pageEntriesString);
            $batchInsertData = array();
            for($i = 0; $i < count($pageEntries); $i++)
            {
                $batchInsertData[] = array(
                    'adminUserId' => $userId,
                    'entryId' => $pageEntries[$i]
                );
            }

            $dbData = $this->db->insert_batch('adminpageprivilege', $batchInsertData);
            if (!$dbData)
            {
                return ERROR_SYSTEM;
            }
        }

        return ERROR_OK;
    }

    /**
     * 修改管理员账号
     * @param $userId
     * @param $modInfoString
     * @param $pageEntriesString
     * @return mixed
     */
    function modAdmin($userId, $modInfoString, $pageEntriesString)
    {
        $this->load->model('m_user');
        $userObj = $this->m_user->getUserObj(USER_TYPE_ADMIN, $userId);

        if ($userObj == null)
        {
            log_message('error', '[modAdmin] Admin not found: ' . $userId);
            return ERROR_USER_NOT_FOUND;
        }

        $modInfo = json_decode($modInfoString, true);
        if (count($modInfo) > 0)
        {
            $adminType = $modInfo['adminType'];
            if ( ($adminType != ADMIN_TYPE_SUPER) &&
                ($adminType != ADMIN_TYPE_NORMAL) )
            {
                log_message('error', '[modAdmin] Admin type incorrect: ' . $adminType);
                return ERROR_PARAM;
            }

            $userObj->modInfoWithPrivilege($modInfo);
        }

        // 删除原来的可访问页面
        $this->m_common->delete('adminpageprivilege', array('adminUserId' => $userId));

        if ($userObj->adminType == ADMIN_TYPE_NORMAL)
        {
            // 插入可以访问的页面
            $pageEntries = json_decode($pageEntriesString);
            $batchInsertData = array();
            for($i = 0; $i < count($pageEntries); $i++)
            {
                $batchInsertData[] = array(
                    'adminUserId' => $userId,
                    'entryId' => $pageEntries[$i]
                );
            }

            $dbRet = $this->db->insert_batch('adminpageprivilege', $batchInsertData);
            if (!$dbRet)
            {
                return ERROR_SYSTEM;
            }

            $userObj->fetchAdminEntries();
        }
        $userObj->saveCache();
        return ERROR_OK;
    }

    /**
     * 删除管理员账号
     * @param $userId
     */
    function deleteAdmin($userId)
    {
        // 先判断是不是自己的账号，自己不可以删自己
        $sessionUserId = $this->m_account->getSessionData('userId');
        if ($userId == $sessionUserId)
        {
            return ERROR_ACCOUNT_ADMIN_CANT_DELETE_SELF;
        }

        $this->m_common->update("user_relation", array("userStatus" => ACCOUNT_STATUS_DEL), array("id" => $userId));
        return ERROR_OK;
    }

    /**
     * 获取管理账号列表
     * @param $index
     * @param $num
     * @param $totalNum
     * @return mixed
     */
    function getAdminList($index, $num, &$totalNum)
    {
        $this->db->select("*")->from("admin");
        $totalNum = $this->db->count_all_results();
        $dbResult = $this->db->select('userId, c.platformId, lastLoginTime')->from("admin")->join('user_relation as b', 'admin.userId = b.id', 'left')->join('passport as c', 'b.accountId = c.id', 'left')->where(array("userStatus" => ACCOUNT_STATUS_OK))->limit($num, $index)->order_by('lastLoginTime', 'desc')->get()->result_array();

        $this->load->model('m_user');
        // 获取权限
        $result = array();
        for($i = 0; $i < count($dbResult); $i++)
        {
            $oneAdmin = $dbResult[$i];
            $userId = $oneAdmin['userId'];

            $userObj = $this->m_user->getUserObj(USER_TYPE_ADMIN, $userId);
            if ($userObj == null)
            {
                continue;
            }

            $userInfo = $userObj->getUserSelfData();
            $userInfo->accountId = $oneAdmin["platformId"];
            $userInfo->lastLoginTime = $oneAdmin['lastLoginTime'];

            $result[] = $userInfo;
        }

        return $result;
    }

    /**
     * 用户统计
     * @param $statistics
     * @return mixed
     */
    function getUserStatistics(&$statistics)
    {
        $this->db->select("count(*) as count, userType")->from("user_relation")->where(array("userStatus" => ACCOUNT_STATUS_OK));
        $this->db->group_by("userType");

        $statistics = $this->db->get()->result_array();
        return ERROR_OK;
    }

    /**
     * 获取用户列表
     * @param $userType
     * @param $startIndex
     * @param $num
     * @param $userList
     * @param $count
     * @return mixed
     */
    function getUserList ($userType, $startIndex, $num, $likeStr = "", &$userList, &$count)
    {
        $this->load->model("m_user");
        $this->db->start_cache();
        $this->db->select("userId")->from( M_user::$userTypeConfig[$userType]["tableName"]);
        if(!empty($likeStr))
        {
            $this->db->like("userId", $likeStr);
            $this->db->or_like("name", $likeStr);
            $this->db->or_like("telephone", $likeStr);
        }
        $this->db->stop_cache();
        $count = $this->db->count_all_results();
        if($num > 0)
        {
            $this->db->limit($num, $startIndex);
        }
        $this->db->order_by("userId desc");
        $userIdArr = $this->db->get()->result_array();
        $this->db->flush_cache();
        foreach($userIdArr as $one)
        {
            $userList[] = $this->m_user->getAllUserObj($userType, $one["userId"]);
        }
        return ERROR_OK;
    }

    //////////////////////////////////////////////
    // end region admin
}
