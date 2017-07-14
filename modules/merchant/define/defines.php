<?php
/**
 * Created by PhpStorm.
 * User: MXL
 * Date: 7/11/2017
 * Time: 11:47 AM
 */

 define('CACHE_PREFIX_MCH_COMMODITY', CACHE_PREFIX . 'MCH_COMMODITY_');
 define('CACHE_LIVE_TIME_MCH_COMMODITY', 3600);
 define('REQUEST_UP_ON', 1);//上架申请
 define('REQUEST_UP_OFF', 2);//下架申请
 define('REQUEST_SYNC', 3);//同步申请

 define('MCH_C_STATUS_UP', 1);//商户商品上架
 define('MCH_C_STATUS_OFF', 2);//商户商品下架
 define('MCH_C_STATUS_NULL', 0);//商户商品状态为空

 define('MCH_REQUEST_ALLOW', 1);//请求同意
 define('MCH_REQUEST_REJECT', 2);//请求拒绝