<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 16-5-30
 * Time: 下午4:51
 */

class Account extends My_Controller{

    function __construct()
    {
        parent::__construct();

        $this->load->model("m_account");
        $this->load->helper('my_md5');
    }

    public function registerUser()
    {
        if(!$this->checkParam(array("platformId","password","verifyCode")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $platform = PLATFORM_TYPE_SELF;
        $platformId = $this->input->post("platformId");
        $password = $this->input->post("password");
        $verifyCode = $this->input->post("verifyCode");
        $PMTID = $this->input->post("PMTID");

        //验证码
        $this->load->model("m_smsCode");
        $errCode = $this->m_smsCode->validateCode($platformId, $verifyCode, SMS_CODE_TYPE_REGISTER);
        if($errCode != ERROR_OK)
        {
            $this->responseError($errCode);
            return $errCode;
        }

        // 创建passport
        $accountId = 0;
        $errCode = $this->m_account->createPassport($platform, $platformId, $password, $accountId);
        if ($errCode != ERROR_OK && $errCode != ERROR_ACCOUNT_PASSPORT_EXISTS)
        {
            $this->responseError($errCode);
            return;
        }

        // 创建用户
        $userId = 0;
        $errCode = $this->m_account->createNormalUser($accountId, $userId, $platformId, $PMTID);
        if ($errCode != ERROR_OK)
        {
            $this->responseError($errCode);
            return;
        }

        $this->onLoginSuccess(USER_TYPE_USER, $userId, PLATFORM_TYPE_SELF, $platformId, $accountId);
    }

    /**
     * 生成重连接Token
     * @param $loginData
     * @return mixed
     */
    public function onLoginSuccess($userType, $userId, $platform, $platformId, $accountId)
    {
        $this->load->model("m_user");
        $userObj = $this->m_user->getUserObj($userType, $userId);
        if ($userType == USER_TYPE_MCH && $userObj->is_delete == DELETE_YES) 
        {
            $this->responseError(ERROR_MCH_DELETE);
            return;
        }
        if ($userType == USER_TYPE_PMT && $userObj->is_delete == DELETE_YES) 
        {
            $this->responseError(ERROR_PMT_DELETE);
            return;
        }
        $nowTime = now();

        $token = generate_token();
        $updateFields = array(
            'token' => $token,
            'tokenEndTime' => $nowTime + TOKEN_AVAILABLE_TIME
        );

        $whereFields = array(
            'platform' => $platform,
            'platformId' => $platformId
        );
        $this->m_common->update("passport", $updateFields, $whereFields);

        // 更新上次登录时间
        $this->m_common->update("user_relation", array('lastLoginTime' => $nowTime), array('id' => $userId));
        
        if ($userObj == null)
        {
            log_message('error', 'User can not be found after register!');

            $this->responseError(ERROR_USER_NOT_FOUND);
            return;
        }
        // 设置session数据
        $this->m_account->setSessionData($userType, $userId, array(
            'platform' => $platform,
            'platformId' => $platformId,
            'accountId' => $accountId,
        ));
        // 还要获取一些常量
        $this->load->model("m_appconfig");
        $configData = $this->m_appconfig->getConfigData()->getClientData();

        $userInfo = $userObj->getUserSelfData();
        $userInfo->platformId = $platformId;
        $data = array(
            'userInfo' => $userInfo,
            'configData' => $configData,
            'token' => $token,
            'sessionId' => session_id(),
        );

        $this->responseSuccess($data);
    }

    /**
     * 登录
     */
    public function login()
    {
        if(!$this->checkParam(array("userType", "platformId","platform")) ||
            (isset($_POST["platform"]) && $_POST["platform"] == PLATFORM_TYPE_SELF && !isset($_POST["password"])))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $userType = $this->input->post("userType");
        $platform = $this->input->post("platform");
        $platformId = $this->input->post("platformId");
        $password = $this->input->post("password");
        $PMTID = $this->input->post("PMTID");

        if (($userType == USER_TYPE_PMT || $userType == USER_TYPE_MCH) && $platform == 5) 
        {
            $this->responseError(ERROR_NO_USE_PHONE_CODE_TO_LOGIN);
            return;
        }
        $userId = 0;
        $accountId = 0;
        $errCode = $this->m_account->loginNormal($platform, $platformId, $password, $userType, $accountId, $userId, $PMTID);
        if ($errCode != ERROR_OK)
        {
            $this->responseError($errCode);
            return;
        }

        $this->onLoginSuccess($userType, $userId, $platform, $platformId, $accountId);
    }

    /**
     * 重登录
     */
    public function reLogin()
    {
        if(!$this->checkParam(array("userType","token")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $userType = $this->input->post("userType");
        $token = $this->input->post("token");

        $userId = 0;
        $accountId = 0;
        $platform = 0;
        $platformId = '';
        $errCode = $this->m_account->loginRelogin($userType, $token, $platform, $platformId, $accountId, $userId);
        if ($errCode != ERROR_OK)
        {
            $this->responseError($errCode);
            return;
        }

        $this->onLoginSuccess($userType, $userId, $platform, $platformId, $accountId);
    }

    /**
     * 忘记密码
     */
    function changePassword()
    {
        if(!$this->checkParam(array("platformId","password","verifyCode")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $platformId = $this->input->post("platformId");
        $password = $this->input->post("password");
        $verifyCode = $this->input->post("verifyCode");

        $errCode = $this->m_account->changePasswordWithVerifyCode($platformId, $verifyCode, $password);
        if ($errCode != ERROR_OK)
        {
            $this->responseError($errCode);
            return;
        }

        $this->responseSuccess();

        return;
    }

    /**
     * 获取手机验证码
     */
    function getMobileCode()
    {
        $this->load->model("m_smsCode");
        $mobile = $this->input->post('mobile');
        $type = $this->input->post("type");

        $errCode = $this->m_smsCode->requestMobileCode($mobile, $type);

        $this->setErr($errCode);
        $this->loadDefaultView();
        return;
    }

    //region 管理员相关
    //////////////////////////////////////////////
    /**
     * 管理员登录
     */
    public function adminLogin()
    {
        if(!$this->checkParam(array("accountId","password")))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $accountId = $this->input->post("accountId");
        $password = $this->input->post("password");

        $adminType = ADMIN_TYPE_NORMAL;
        $err = $this->m_account->adminLogin($accountId, $password, $adminType);
        if ($err != ERROR_OK)
        {
            $this->responseError($err);
            return;
        }

        $this->onAdminLoginSuccess($accountId, $adminType);
    }

    /**
     * 管理员登录成功
     * @param $accountId
     * @param $adminType    管理员类型
     */
    function onAdminLoginSuccess($accountId, $adminType)
    {
        // 生成重登录的token
        $nowTime = now();
        $token = generate_token();
        $updateFields = array(
            'token' => $token,
            'tokenEndTime' => $nowTime + TOKEN_AVAILABLE_TIME,
            'lastLoginTime' => $nowTime
        );

        $whereFields = array(
            'accountId' => $accountId,
        );

        $this->m_common->update("adminaccount", $updateFields, $whereFields);

        // 设置session数据
        $this->m_account->setSessionData(USER_TYPE_ADMIN, $accountId, array(
            'adminType' => $adminType,
        ));

        // 获取可以访问的接口，获取入口对象
        $entries = array();
        if ($adminType != ADMIN_TYPE_SUPER)
        {
            $entries = $this->m_account->fetchAdminEntries($accountId);
        }

        // 还要获取一些常量
        $this->load->model("m_appconfig");
        $configData = $this->m_appconfig->getConfigData()->getClientData();

        $data = array(
            'token' => $token,
            'sessionId' => session_id(),
            'adminType' => $adminType,
            'configData' => $configData,
            'entries' => $entries,
        );

        $this->responseSuccess($data);
    }
    //////////////////////////////////////////////
    //endregion
    
    //判断用户是否登录
    function hasLogin()
    {
        $hasLogin = false;
        $this->load->model("m_account");
        if($this->m_account->getSessionData("userType") == USER_TYPE_USER)
        {
            $hasLogin = true;
        }
         $this->responseSuccess($hasLogin);
    }

}

