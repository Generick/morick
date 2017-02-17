<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: humphrey
 * Date: 14-12-17
 * Time: 下午3:45
 */

/**
 * 判断两天是否相连
 * @param $lastTimeStamp        前面的timestamp
 * @param $thisTimeStamp        后面的timestamp
 * @return bool
 */
function isStreakDays($lastTimeStamp, $thisTimeStamp)
{
    $last_date = getdate($lastTimeStamp);
    $this_date = getdate($thisTimeStamp);

    if(
        ($last_date['year'] === $this_date['year']) &&
        ($this_date['yday'] - $last_date['yday'] === 1)
    )
    {
        return true;
    }
    elseif(
        ($this_date['year'] - $last_date['year'] === 1) &&
        ($last_date['mon'] - $this_date['mon'] = 11) &&
        ($last_date['mday'] - $this_date['mday'] === 30)
    )
    {
        return true;
    }
    else
    {
        return false;
    }
}

/**
 * //判断两天是否是同一天
 * @param $lastTimeStamp
 * @param $thisTimeStamp
 * @return bool
 */
function isSameDays($lastTimeStamp, $thisTimeStamp)
{
    $last_date = getdate($lastTimeStamp);
    $this_date = getdate($thisTimeStamp);

    if(
        ($last_date['year'] === $this_date['year']) &&
        ($this_date['yday'] === $last_date['yday'])
    )
    {
        return true;
    }
    else
    {
        return false;
    }
}