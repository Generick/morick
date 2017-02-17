<?php
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 16-1-2
 * Time: 下午2:38
 */

/**
// 快速排序
 * @param $arr
 * @param $sortType     1为升序，2为降序
 * @param $sortDictKey
 * @return array
 */
function fastSortDictArray($arr, $sortType, $sortDictKey)
{
    $len = count($arr);
    if($len <= 1)
    {
        return $arr;
    }

    $key = $arr[0];
    $left_arr = array();
    $right_arr = array();
    for($i = 1; $i < $len; $i++)
    {
        if($arr[$i] <= $key)
        {
            $left_arr[] = $arr[$i];
        }
        else
        {
            $right_arr[] = $arr[$i];
        }
    }
    $left_arr = fastSortDictArray($left_arr, $sortType, $sortDictKey);
    $right_arr = fastSortDictArray($right_arr, $sortType, $sortDictKey);
    return array_merge($left_arr, array($key), $right_arr);
}

function my_mkdir($dir, $mode = 0777)
{
    if(is_dir($dir) || @mkdir($dir, $mode))
    {
        return true;
    }

    if(!my_mkdir(dirname($dir), $mode))
    {
        return false;
    }

    return @mkdir($dir, $mode);
}
