<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 站点公共模型
 * @author      lensic [mhy]
 * @link        http://www.lensic.cn/
 * @copyright   Copyright (c) 2013 - , lensic [mhy].
 */
class M_common extends My_Model
{
	function __construct()
	{
		parent::__construct();
	}

    /**
     * 格式化输出字符串
     * @return mixed
     */
    function format()
    {
        $args = func_get_args();
        if (count($args) == 0) { return;}

        if (count($args) == 1) { return $args[0]; }

        $str = array_shift($args);

        $str = preg_replace_callback('/\\{(0|[1-9]\\d*)\\}/', create_function('$match', '$args = '.var_export($args, true).'; return isset($args[$match[1]]) ? $args[$match[1]] : $match[0];'), $str);

        return $str;
    }
	
	/**
	 * 获取单条数据
	 * 
	 * @access   public
	 * @param    string   表名
	 * @param    array    条件数组
	 * @param    string   查询字段
	 * @return   array    一维数据数组
	 */
	function get_one($table, $where = array(), $fields = '*')
	{
		if($where)
		{
			$this->db->where($where);
		}
		return $this->db->select($fields)->from($table)->get()->row_array();
	}
	
	/**
	 * 获取多条数据
	 * 
	 * @access   public
	 * @param    string   表名
	 * @param    array    条件数组
	 * @param    string   查询字段
	 * @return   array    多维数据数组
	 */
	function get_all($table, $where = array(), $fields = '*')
	{
		if($where)
		{
			$this->db->where($where);
		}
		return $this->db->select($fields)->from($table)->get()->result_array();
	}
	
	/*
	 * 添加数据
	 * 
	 * @access   public
	 * @param    string   表名
	 * @param    array    数据数组
	 * @return   number   添加的记录 ID
	 */
	function insert($table, $post)
	{
		return $this->db->insert($table, $post);
	}
	
	/*
	 * 删除数据
	 * 
	 * @access   public
	 * @param    string   表名
	 * @param    array    条件数组
	 * @return   number   影响行数
	 */
	function delete($table, $where)
	{
		$this->db->delete($table, $where);
		return $this->db->affected_rows();
	}
	
	/*
	 * 更新数据
	 * 
	 * @access   public
	 * @param    string   表名
	 * @param    array    数据数组
	 * @param    array    条件数组
	 * @return   number   影响行数
	 */
	function update($table, $post, $where = array())
	{
		if($where)
		{
			$this->db->where($where);
		}
		$this->db->update($table, $post);
		return $this->db->affected_rows();
	}

    /**
     * 获取banner信息
     * @param $position
     * @return array
     */
    function getBanner($position)
    {
        $result = $this->m_common->get_all('banner', array('position' => $position));

        if ($result)
        {
            return $result;
        }

        return array();
    }

    //写入日志服务器
    public function sendSocket($data, $shouldRecv = true)
    {
        try{
            $host = "139.224.28.235";
            $port = "9001";

            $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
            if (!$socket)
            {
                $errorNo = socket_last_error();
                log_message('error', 'Create socket failed, errorNo: ' . $errorNo . ', errorStr: ' . socket_strerror($errorNo));
                return false;
            }
            $result = @ socket_connect($socket, $host, $port);
            if (!$result)
            {
                $errorNo = socket_last_error();
                log_message('error', 'Socket connect failed, errorNo: ' . $errorNo . ', errorStr: ' . socket_strerror($errorNo));
                return false;
            }

            $dataString = json_encode($data);
            //封包
            $length = strlen($dataString);
            $mark = 0xAA55;
            $checkSum = (($length & 0xFFFF) ^ 0xBBCC) & 0x88AA;
            $sendData = pack("nNn", $mark, $length, $checkSum);

            $sendData = $sendData . $dataString;

            if(!socket_write($socket, $sendData, strlen($sendData)))
            {
                $errorNo = socket_last_error();
                log_message('error', 'Socket send failed, errorNo: ' . $errorNo . ', errorStr: ' . socket_strerror($errorNo));
                return false;
            }
        }
        catch(Exception $e){}

        return "";
    }

    function arrayToObject($e)
    {
        if( gettype($e)!='array' ) return;
        foreach($e as $k=>$v){
            if( gettype($v)=='array' || getType($v)=='object' )
                $e[$k]=(object)arrayToObject($v);
        }
        return (object)$e;
    }

    function objectToArray($e)
    {
        $e=(array)$e;
        foreach($e as $k=>$v){
            if( gettype($v)=='resource' ) return;
            if( gettype($v)=='object' || gettype($v)=='array' )
                $e[$k]=(array)objectToArray($v);
        }
        return $e;
    }
}

/* End of file m_common.php */
/* Location: ./application/models/m_common.php */

