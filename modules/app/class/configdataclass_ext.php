<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-12-20
 * Time: 下午4:13
 */

CConfigData::registerFields(array(
    "cfg_sms"        =>       array('id' => CONSTANT_TYPE_SMS, 'type' => CONFIG_FIELD_TYPE_STRING),
    "cfg_bids"        =>       array('id' => CONSTANT_TYPE_BIDS, 'type' => CONFIG_FIELD_TYPE_STRING),
));

CClientConfigData::registerFields(array(
    "cfg_sms",
    "cfg_bids",
));