<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 16-5-30
 * Time: 下午2:43
 */

class M_account extends My_Model{

    function __construct()
    {
        parent::__construct();
        $this->load->helper('my_md5');
        $this->load->library('session');
    }
    /**
     * @param $userType
     * @param $userId
     * @param $data
     */
    function setSessionData($userType, $userId, $data = array())
    {
        $session['userType']      = $userType;
        $session['userId']        = $userId;
        $session = array_merge($session, $data);
        $this->session->set_userdata($session);
    }
    /**
     * 获取session中的数据
     * @param $key
     * @return mixed
     */
    function getSessionData($key)
    {
        $sessionValue = $this->session->userdata($key);
        return $sessionValue;
    }

    /**
     * 创建一个通行证
     * @param $platform
     * @param $platformId
     * @param $password
     * @param int $accountId
     */
    function createPassport($platform, $platformId, $password, &$accountId = 0)
    {
        $whereArr = array(
            'platform' => $platform,
            'platformId' => $platformId
        );

        $dbData = $this->m_common->get_one("passport", $whereArr);
        if($dbData)
        {
            // 如果已经存在，则获取accountId
            $accountId = $dbData['id'];
            return ERROR_ACCOUNT_PASSPORT_EXISTS;
        }

        //插入新数据
        $passportData = array(
            'platform' => $platform,
            'platformId' => $platformId,
        );

        if ($password !== '')
        {
            $passportData["password"] = str_md5($password);
        }

        $passportData["createTime"] = time();
        if(!$this->m_common->insert("passport", $passportData))
        {
            return ERROR_SYSTEM;
        }
        $accountId = $this->db->insert_id();
        return ERROR_OK;
    }

    /**
     * 创建普通用户
     * @param $accountId
     * @param $userId
     * @return mixed
     */
    public function createNormalUser($accountId, &$userId, $platformId)
    {
        $nowTime = now();
        // 首先判断在user_relation表中是否已经存在
        $whereArr = array(
            'userType' => USER_TYPE_USER,
            'accountId' => $accountId
        );

        $dbData = $this->m_common->get_one("user_relation", $whereArr);
        if($dbData)
        {
            // 如果已经存在，则获取userId
            $userId = $dbData['id'];
        }
        else
        {
            // 如果不存在则插入新数据
            $userRelationData = array(
                'userType' => USER_TYPE_USER,
                'accountId' => $accountId,
                'lastLoginTime' => $nowTime,
                'registerTime' => $nowTime,
            );

            $this->m_common->insert("user_relation", $userRelationData);

            $userId = $this->db->insert_id();
        }

        $this->load->model("m_user");
        $errCode = $this->m_user->createNormalUser($userId, $platformId);
        if ($errCode != ERROR_OK)
        {
            return $errCode;
        }

        return ERROR_OK;
    }

    /**
     * 创建管理员
     * @param $accountId
     * @param $adminType
     * @param $pageEntriesString
     * @param $userId
     * @return mixed
     */
    public function createAdminUser($accountId, $adminType, $pageEntriesString, &$userId)
    {
        $nowTime = now();
        // 首先判断在user_relation表中是否已经存在
        $whereArr = array(
            'userType' => USER_TYPE_ADMIN,
            'accountId' => $accountId
        );

        $dbData = $this->m_common->get_one("user_relation", $whereArr);
        if($dbData)
        {
            // 如果已经存在，则获取userId
            $userId = $dbData['id'];
        }
        else
        {
            // 如果不存在则插入新数据
            $userRelationData = array(
                'userType' => USER_TYPE_ADMIN,
                'accountId' => $accountId,
                'lastLoginTime' => $nowTime,
                'registerTime' => $nowTime,
            );

            $this->m_common->insert("user_relation", $userRelationData);

            $userId = $this->db->insert_id();
        }

        $this->load->model("m_admin");
        $errCode = $this->m_admin->createAdminUser($userId, $adminType, $accountId, $pageEntriesString);
        if ($errCode != ERROR_OK)
        {
            return $errCode;
        }
        return ERROR_OK;
    }

    /**
     * 普通登录
     * @param $loginData
     * @return mixed
     */
    public function loginNormal($platform, $platformId, $password, $userType, &$accountId, &$userId)
    {
        $userId = 0;
        $accountId = 0;

        // 在passport中搜索
        $whereFields = array(
            'platform' => $platform,
            'platformId' => $platformId
        );

        if($platform == PLATFORM_TYPE_SMS)
        {
            //password则是验证码
            $this->load->model("m_smsCode");
            $errCode = $this->m_smsCode->validateCode($platformId, $password, SMS_CODE_TYPE_LOGIN);
            if($errCode != ERROR_OK)
            {
                return $errCode;
            }
            $password = "";
        }

        $dbData = $this->m_common->get_one("passport", $whereFields);
        if(!$dbData)
        {

            if ($platform == PLATFORM_TYPE_SELF)
            {
                // 自有平台直接报错误
                return ERROR_ACCOUNT_NOT_EXIST_PASSPORT;
            }
            else
            {
                // 其他平台，则直接创建passport
                $errCode = $this->createPassport($platform, $platformId, $password, $accountId);
                if ($errCode != ERROR_OK)
                {
                    return $errCode;
                }

                // 创建用户
                $userId = 0;
                $errCode = $this->createNormalUser($accountId, $userId, $platformId);
                if ($errCode != ERROR_OK)
                {
                    return $errCode;
                }
            }
        }
        else
        {
            if ($platform == PLATFORM_TYPE_SELF)
            {
                // 自有平台判断密码是否正确
                if ($dbData['password'] != str_md5($password))
                {
                    return ERROR_ACCOUNT_LOGIN_FAILED;
                }
            }

            // 认证成功
            $accountId = $dbData['id'];
        }

        // 找到相应的用户
        $dbData = $this->m_common->get_one('user_relation', array('userType' => $userType, 'accountId' => $accountId));
        if (!$dbData)
        {
            return ERROR_USER_NOT_FOUND;
        }

        if($dbData["userStatus"] == ACCOUNT_STATUS_FORBIDDEN)
        {
            return ERROR_ACCOUNT_LOGIN_FAILED;
        }
        elseif($dbData["userStatus"] == ACCOUNT_STATUS_DEL)
        {
            return  ERROR_ACCOUNT_DEL;
        }

        $userId = $dbData['id'];
        return ERROR_OK;
    }

    /**
     * 验证Token是否有效
     * @param $reLoginData
     * @return mixed
     */
    public function loginRelogin($userType, $token, &$platform, &$platformId, &$accountId, &$userId)
    {
        $accountId = 0;
        $userId = 0;
        $platform = 0;
        $platformId = '';

        $whereFields = array(
            'token' => $token,
        );

        $dbData = $this->m_common->get_one("passport", $whereFields);
        if(!$dbData)
        {
            return ERROR_ACCOUNT_RELOGIN_FAILED_WRONG_TOKEN;
        }

        $nowTime = now();
        if ($dbData['tokenEndTime'] < $nowTime)
        {
            return ERROR_ACCOUNT_RELOGIN_FAILED_TOKEN_TIMEOUT;
        }

        $accountId = $dbData['id'];
        $platform = $dbData['platform'];
        $platformId = $dbData['platformId'];

        // 找到相应的用户
        $dbData = $this->m_common->get_one('user_relation', array('userType' => $userType, 'accountId' => $accountId));
        if (!$dbData)
        {
            return ERROR_USER_NOT_FOUND;
        }

        if($dbData["userStatus"] == ACCOUNT_STATUS_FORBIDDEN)
        {
            return ERROR_ACCOUNT_LOGIN_FAILED;
        }
        elseif($dbData["userStatus"] == ACCOUNT_STATUS_DEL)
        {
            return  ERROR_ACCOUNT_DEL;
        }

        $userId = $dbData['id'];
        return ERROR_OK;
    }

    /**
     * 通过手机验证码修改密码
     * @param $data
     * @return mixed
     */
    function changePasswordWithVerifyCode($platformId, $verifyCode, $password)
    {
        //验证短信验证码
        $this->load->model("m_smsCode");
        $errCode = $this->m_smsCode->validateCode($platformId, $verifyCode, SMS_CODE_TYPE_CHANGE_PASSWORD);
        if($errCode != ERROR_OK)
        {
            return $errCode;
        }

        return $this->modPassportPasswordByPlatformId($platformId, $password);
    }

    /**
     * 使用platformId修改密码
     * @param $accountId
     * @param $password
     */
    function modPassportPasswordByPlatformId($platformId, $password)
    {
        $whereFields = array(
            'platform' => PLATFORM_TYPE_SELF,
            "platformId" => $platformId
        );

        // 是否存在
        $dbData = $this->m_common->get_one("passport", $whereFields);
        if(!$dbData)
        {
            return ERROR_ACCOUNT_NOT_EXIST_PASSPORT;
        }

        $this->m_common->update("passport",  array("password" => str_md5($password)), $whereFields);

        return ERROR_OK;
    }

    /**
     * 使用accountId修改密码
     * @param $accountId
     * @param $password
     */
    function modPassportPasswordByAccountId($accountId, $password)
    {
        $whereFields = array(
            'platform' => PLATFORM_TYPE_SELF,
            "id" => $accountId
        );

        // 是否存在
        $dbData = $this->m_common->get_one("passport", $whereFields);
        if(!$dbData)
        {
            return ERROR_ACCOUNT_NOT_EXIST_PASSPORT;
        }

        $this->m_common->update("passport",  array("password" => str_md5($password)), $whereFields);

        return ERROR_OK;
    }

}