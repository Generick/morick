<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: HumphreyLiu
 * Date: 14-12-7
 * Time: 上午12:56
 */
$retMsg = array(
    'err' => $err,
    'errMsg' => $errMsg,
    'data' => $data,
    'selfChanged' => $selfChanged,
);

// $isError是为了判断如果出错则直接exit
if (isset($_GET["callback"]))
{
    $callback = $_GET["callback"];
    if ($isError)
    {
        exit ($callback . "(" . json_encode($retMsg) . ")");
    }
    else
    {
        echo $callback . "(" . json_encode($retMsg) . ")";
    }
}
else
{
    if ($isError)
    {
        exit (json_encode($retMsg));
    }
    else
    {
        echo json_encode($retMsg);
    }
}



