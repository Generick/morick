<?php
/**
 * Created by PhpStorm.
 * User: mxl
 * Date: 2016/10/25
 * Time: 9:21
 */

class A_admin extends Admin_Controller
{
    function __construct()
    {
        parent::__construct();

        $this->load->model('m_admin');
    }

    function getSelfInfo()
    {
        $this->load->model("m_user");
        $userObj = $this->m_user->getSelfUserObj();
        $data = array(
            'userInfo' => $userObj->getUserSelfData()
        );

        $this->responseSuccess($data);
    }

    // region 管理员管理
    /////////////////////////////////////////////////////////////
    /**
     * 增加管理员账号
     * @param platformId
     * @param password
     * @param adminType     管理员类型
     * @param pageEntries   可访问的页面：JSONArray    页面ID的数组
     */
    function addAdminAccount()
    {
        if (!$this->checkParam(array('platformId', 'password', 'adminType', 'pageEntries')))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $platformId = $this->input->post('platformId');
        $password = $this->input->post('password');
        $adminType = $this->input->post('adminType');
        $pageEntriesString = $this->input->post('pageEntries');

        $this->load->model('m_account');
        $accountId = 0;
        $errCode = $this->m_account->createPassport(PLATFORM_TYPE_SELF, $platformId, $password, $accountId);
        if ($errCode != ERROR_OK && $errCode != ERROR_ACCOUNT_PASSPORT_EXISTS)
        {
            $this->responseError($errCode);
            return;
        }

        // 创建管理员
        $userId = 0;
        $errCode = $this->m_account->createAdminUser($accountId, $adminType, $pageEntriesString, $userId);
        if ($errCode != ERROR_OK)
        {
            $this->responseError($errCode);
            return;
        }

        $this->load->model('m_user');
        $userObj = $this->m_user->getUserObj(USER_TYPE_ADMIN, $userId);
        $userObj->modInfoWithPrivilege(array("name" => $platformId));

        $this->responseSuccess();
    }

    /**
     * 修改管理员账号
     * @param userId
     * @param modInfo     要修改的数据
     * @param pageEntries   可访问的页面：JSONArray    页面ID的数组
     */
    function modAdmin()
    {
        if (!$this->checkParam(array('userId', 'modInfo', 'pageEntries')))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $userId = $this->input->post('userId');
        $modInfo = $this->input->post('modInfo');
        $pageEntriesString = $this->input->post('pageEntries');

        $errCode = $this->m_admin->modAdmin($userId, $modInfo, $pageEntriesString);
        if ($errCode != ERROR_OK)
        {
            $this->responseError($errCode);
            return;
        }

        $this->responseSuccess();
    }

    /**
     * 修改管理员密码
     * @param accountId
     * @param password
     */
    function modAdminPassword()
    {
        if (!$this->checkParam(array('userId', 'password')))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $userId = $this->input->post('userId');
        $password = $this->input->post('password');

        $dbData = $this->m_common->get_one("user_relation", array('id' => $userId));
        if (count($dbData) <= 0)
        {
            $this->responseError(ERROR_USER_NOT_FOUND);
            return;
        }

        $accountId = $dbData['accountId'];

        $this->load->model('m_account');
        $errCode = $this->m_account->modPassportPasswordByAccountId($accountId, $password);
        if ($errCode != ERROR_OK)
        {
            $this->responseError($errCode);
            return;
        }

        $this->responseSuccess();
    }
    /**
     * 删除账号
     * @param accountId
     */
    function deleteAdmin()
    {
        if (!$this->checkParam(array('userIds')))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $userIdString = $this->input->post('userIds');

        $userIdArray = json_decode($userIdString);

        for($i = 0; $i < count($userIdArray); $i++)
        {
            $userId = $userIdArray[$i];
            $errCode = $this->m_admin->deleteAdmin($userId);
            if ($errCode != ERROR_OK)
            {
                log_message('error', "Delete account failed, userId: $userId, error: $errCode, errMsg: " . $this->m_errors->getErrMsg($errCode));
                continue;
            }
        }

        $this->responseSuccess();
    }

    /**
     * 获取管理员列表
     * @param index
     * @param num
     */
    function getAdminList()
    {
        if (!$this->checkParam(array('startIndex', 'num')))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $index = $this->input->post('startIndex');
        $num = $this->input->post('num');

        $totalNum = 0;
        $dbData = $this->m_admin->getAdminList($index, $num, $totalNum);

        $data = array(
            'totalNum' => $totalNum,
            'adminList' => $dbData
        );

        $this->responseSuccess($data);
    }

    /**
     * 用户统计
     */
    function getUserStatistics()
    {
        $statistics = array();
        $retCode = $this->m_admin->getUserStatistics($statistics);
        if($retCode != ERROR_OK)
        {
            $this->responseError($retCode);
            return;
        }
        $this->responseSuccess($statistics);
        return;
    }

    /**
     * 获取用户列表
     */
    function getUserList()
    {
        if (!$this->checkParam(array("userType", "startIndex", "num")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $userType = intval($this->input->post("userType"));
        $startIndex = intval($this->input->post("startIndex"));
        $num = intval($this->input->post("num"));

        $userList = array();
        $count = 0;

        $errCode = $this->m_admin->getUserList($userType, $startIndex, $num, array(), "", $userList, $count);
        if ($errCode != ERROR_OK)
        {
            $this->responseError($errCode);
            return;
        }

        $this->responseSuccess(array("userList" => $userList, "count" => $count));
        return;
    }

    /**
     * 修改用户信息
     */
    function modUserInfo()
    {
        if(!$this->checkParam(array("userId", "modInfo")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $userId = intval($this->input->post("userId"));
        $modInfo = json_decode($this->input->post('modInfo'), true) ? json_decode($this->input->post('modInfo'), true) : array();

        $this->load->model("m_user");
        $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $userId);
        $userObj->modInfoWithPrivilege($modInfo);

        $this->responseError(ERROR_OK);
        return;
    }

    function getUserInfo()
    {
        if(!$this->checkParam(array("userId")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $userId = intval($this->input->post("userId"));

        $this->load->model("m_user");
        $userObj = $this->m_user->getUserObj(USER_TYPE_USER, $userId);
        $userInfo = $userObj->getUserBaseData();

        $this->responseSuccess(array("userInfo" => $userInfo));
        return;
    }
    /////////////////////////////////////////////////////////////
    // end region 管理员管理



}
