<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 15-10-30
 * Time: 下午3:59
 */

/**
 * 短信验证码
 * Class M_smsCode
 */
class M_smsCode extends My_Model
{
    function __construct()
    {
        parent::__construct();
    }

    function requestMobileCode($mobile, $type)
    {
        //查询该手机是否已经发送信息
        $ret = $this->m_common->get_one('phoneCode', array("mobile" => $mobile, "type" => $type));
        $sendTime = time();

        //判断用户是否频繁发送
        if(count($ret) > 0)
        {
            $jic = $ret['sendTime'] + MOBILE_CODE_INTERVAL;

            if( $jic > $sendTime )
            {
                //不到一分钟再次发送短信会出错
                return ERROR_GET_CODE_ILLEGAL;
            }
        }

        //拼接短信验证码内容
        $code = rand(1000, 9999);

        $data = array(
            'mobile' => $mobile,
            'code' => $code,
            'type' => $type,
            'sendTime' => $sendTime
        );

        $edit = array(
            'code' => $code,
            'sendTime' => $sendTime
        );

        $content = $this->m_common->format(MOBILE_CODE, $code);
        $html = $this->sendMsg($mobile, $content);

        if(strpos($html,'returnstatus') > 0)
        {
            $xml = simplexml_load_string($html);
            $status = (string)$xml->returnstatus;
            if($status == 'Success')
            {
                if(count($ret) > 0)
                {
                    //再一次使用第三方软件发送信息是，发送到的手机号码已存在，这时候就修改数据库里面的验证码和时间
                    $this->m_common->update('phoneCode', $edit, array('mobile'=>$mobile, 'type' => $type));
                }
                else
                {
                    //该手机号原先没有发过一次短信
                    $this->m_common->insert('phoneCode',$data);
                }
                return ERROR_OK;
            }
            else
            {
                log_message("error", (string)$xml->message);//记录失败信息
                return ERROR_GET_CODE_FAILED;
            }
        }
    }

    /**
     * 判断手机短信验证码是否正确
     * @param $postData
     * @return mixed
     */
    function validateCode($phoneNum, $smsCode, $type)
    {
        //测试时使用
        if($smsCode == "8888")
        {
            return ERROR_OK;
        }

        $result = $this->m_common->get_one('phoneCode', array('mobile' => $phoneNum, 'code' => $smsCode, 'type' => $type));

        if($result)
        {
            //存在验证码
            if(($result["sendTime"] + MOBILE_CODE_ACTIVE) < time())
            {
                return ERROR_GET_CODE_FAILED;
            }
            return ERROR_OK;
        }
        //不存在验证码
        return ERROR_GET_PHONENUM_NOT_FOUND;
    }


    /**
     * 发送短信
     * @param $mobile
     * @param $content
     * @return string
     */
    function sendMsg($mobile, $content)
    {
        $userId = MOBILE_CODE_USER_ID;
        $account = MOBILE_CODE_ACCOUNT;
        $password = MOBILE_CODE_PASSWORD;
        $contents =preg_replace("/\s/","",$content);
        $mobiles = preg_replace("/\s/","",$mobile);
        $smsUrl = 'http://sh2.ipyy.com/sms.aspx?action=send&userid='.$userId.'&account='.$account.'&password='.$password.'&mobile='.$mobiles.'&content='.$contents.'&sendTime=&extno=';
        return file_get_contents($smsUrl);
    }
} 