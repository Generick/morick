<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 15-3-23
 * Time: 下午8:34
 */


/**
 * Class Common
 * 客户接口
 */
class Common extends My_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("m_common");
    }

    function test()
    {
    }

    /////////////////////////////////////////////////////////////
    // 清缓存
    /////////////////////////////////////////////////////////////
    function clearRedis()
    {
        $this->load->driver('cache');

        if(!$this->cache->redis->is_supported())
        {
            $this->log->write_log('error', "redis not supported!!!");
        }
        else
        {
            $this->cache->redis->clean();
        }

        $this->cache->redis->retain();
        $this->cache->redis->release();
        $this->responseSuccess();
    }

    /////////////////////////////////////////////////////////////
    // 获取配置
    /////////////////////////////////////////////////////////////
    function getConfigData()
    {
        // 还要获取一些常量
        $this->load->model("m_appconfig");
        $constants = $this->m_appconfig->getConfigData()->getClientData();

        $data = array(
            'configData' => $constants,
        );

        $this->responseSuccess($data);
    }

    /**
     * 获取推广广告位
     */
    function getBanner()
    {
        if (!$this->checkParam(array('position')))
        {
            $this->responseError(ERROR_PARAM);
            return;
        }

        $position = $this->input->post('position');

        $banner = $this->m_common->getBanner($position);
        $data = array(
            "banner" => $banner
        );

        $this->responseSuccess($data);
    }
}
