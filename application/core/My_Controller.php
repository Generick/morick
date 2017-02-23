<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: HumphreyLiu
 * Date: 14-12-6
 * Time: 下午6:06
 */

include_once (APPPATH . 'core/defines.php');

/**
 * Class My_Controller
 * 基础Controller，其中定义了很多常量和最基础的调用方法
 */
class My_Controller extends CI_Controller
{
    private $errCode = 0;
    private $errMsg = "";
    private $retData = array();
    private $selfObj = null;

    /**
     * 构造函数，定义一些变量
     */
    function __construct()
    {
        parent::__construct();
    }

    public function _remap($method, $params = array())
    {
        $this->$method($params);
    }

    public function __call($method, $params)
    {
        $className = get_class($this);
        if (method_exists($className, $method))
        {
            // 如果当前类有此方法，则可能是因为调用了私有方法
            log_message("error", "[My_Controller] $className called private method: " . $method);
            throw new Exception("[My_Controller] $className called private method: " . $method);
            // return call_user_func_array(array($this, $method), $params);
            return;
        }
        else if (isset($this->$method))
        {
            // 判断是否有扩展的方法
            $func = $this->$method;

            $p = array($this);
            $p = array_merge($p);
            return call_user_func_array($func, $p);
        }
        else
        {
            // 没有此方法，提示错误
            log_message("error", "[My_Controller] $className does not have this method: " . $method);

            throw new Exception("[My_Controller] $className does not have this method: " . $method);
        }
    }
    /**
     * 设置错误码，在其中会同时设置好错误信息
     * @param $errCode  错误码
     */
    function setErr($errCode)
    {
        if ($this->errCode != ERROR_OK)
        {
            $this->log->write_log('notice', 'Error code is set, are you sure of setting error code again???');
        }

        $this->errCode = $errCode;
        $this->errMsg = $this->m_errors->getErrMsg($errCode);
		$RTR =& load_class('Router', 'core');
		log_message("error","[methodError]:[".$this->errMsg."]:".APPPATH.'controllers/'.$RTR->fetch_directory().$RTR->fetch_class().'.php:'. $RTR->fetch_method().':'.json_encode($this->input->post()));
    }

    /**
     * 获取当前的错误码
     * @return int  当前错误码
     */
    function getErrCode()
    {
        return $this->errCode;
    }

    /**
     * 获取当前的错误描述
     * @return string   当前错误描述
     */
    function getErrMsg()
    {
        return $this->errMsg;
    }

    //return json to font-end
    function returnJson($data){
        if (is_array($data)) {
            echo json_encode($data);
        }else{
            $data = (array)$data;
            echo json_encode($data);
        }
    }

    /**
     * 设置当前的返回数据，此数值会被直接放到返回json的data中
     * @param $retData
     */
    function setRetData($retData)
    {
        $this->retData = $retData;
    }

    /**
     * 设置自己的对象
     * @param $selfObj
     */
    function setSelfObj($selfObj)
    {
        $this->selfObj = $selfObj;
    }

    /**
     * 加载默认的View，其中只是返回json串
     */
    function loadDefaultView($isError = false)
    {
        $changedData = (object)(array());
        if ($this->selfObj != null)
        {
            $changedData = $this->selfObj->fetchChangedData();
        }

        $this->load->view('common_output',
            array
            (
                'err' => $this->errCode,
                'errMsg' => $this->errMsg,
                'data' => $this->retData,
                'isError' => $isError,
                'selfChanged' => $changedData
            )
        );
    }
    
    /**
     * 简化的回复方法（失败）
     * @param unknown $errCode
     */
    function responseError($errCode)
    {
        $this->setErr($errCode);
        $this->loadDefaultView(true);
    }
    
    /**
     * 简化的回复方法（成功）
     * @param array $data
     */
    function responseSuccess($data = null)
    {
        if ($data == null)
        {
            $data = (object)array();
        }
        $this->setRetData($data);
        $this->loadDefaultView();
    }

	/**
	 * 参数判断
	 *
	 */
	public  function checkParam($key){
		foreach($key as $kv){
			if($this->input->post($kv) === null){
                log_message('error', "Lack of param: " . $kv);
				return false;
			}
		}
		return true;
	}
    public function checkGetParam($key){
		foreach($key as $kv){
			if($this->input->get($kv) === null){
				return false;
			}
		}
		return true;
	}

    // 打印接口被弃用的日志
    protected function logDeprecated()
    {
        $RTR =& load_class('Router', 'core');
        $method = $RTR->fetch_class() . '/' . $RTR->fetch_method();

        $session = $this->m_account->getSessionData();

        if ($session == false)
        {
            // 未登录
            log_message("error","[Call Deprecated]\t" . $method . ', IP: ' . $_SERVER['REMOTE_ADDR']);
        }
        else
        {
            // 已登录
            log_message("error","[Call Deprecated]\t" . $method . ', userId: ' . $session['accountId'] . ', IP: ' . $_SERVER['REMOTE_ADDR']);
        }
    }
}

/**
 * Class User_Controller
 * 此Controller是会判断session的，所以在登录之后的就用继承自它的Controller
 */
class User_Controller extends My_Controller
{
    function __construct()
    {
        parent::__construct();

        $userType = $this->m_account->getSessionData('userType');

        if ($userType == false)
        {
            $this->responseError(ERROR_SESSION_ERROR);
            return;
        }

        // 账号类型判断
        if ($userType != USER_TYPE_USER)
        {
            $RTR =& load_class('Router', 'core');
            $method = $RTR->fetch_class() . '/' . $RTR->fetch_method();

            $userId = $this->m_account->getSessionData('userId');
            log_message("error", "IP:{$_SERVER['REMOTE_ADDR']}\tNOT ADMIN using this method! \tUserId:$userId\tUserType:$userType\tMethod:$method\tParams:" . json_encode($_REQUEST));

            $this->responseError(ERROR_SESSION_PRIVILEGE_ERROR);
            return;
        }
    }
}

/**
 * Class Admin_Controller
 * 管理员的接口
 */
class Admin_Controller extends My_Controller
{
    function __construct()
    {
        parent::__construct();

        $userType = $this->m_account->getSessionData('userType');
        if ($userType == false)
        {
            $this->responseError(ERROR_SESSION_ERROR);
            return;
        }

        // 账号类型判断
        if ($userType != USER_TYPE_ADMIN)
        {
            $RTR =& load_class('Router', 'core');
            $method = $RTR->fetch_class() . '/' . $RTR->fetch_method();

            $userId = $this->m_account->getSessionData('userId');
            log_message("error", "IP:{$_SERVER['REMOTE_ADDR']}\tNOT ADMIN using this method! \tUserId:$userId\tUserType:$userType\tMethod:$method\tParams:" . json_encode($_REQUEST));
            $this->responseError(ERROR_SESSION_PRIVILEGE_ERROR);
            return;
        }
    }
}

