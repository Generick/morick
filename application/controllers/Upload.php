<?php
/**
 * Created by PhpStorm.
 * User: Saturn
 * Date: 16-10-24
 * Time: 下午6:31
 */
class Upload extends My_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    public function uploadImages()
    {
        $upload_path = PATH_UPLOAD_PHOTO;
        if(is_array($_FILES) && isset($_FILES["file"]["type"]))
        {
            if(($_FILES["file"]["type"] == "image/gif") || ($_FILES["file"]["type"] == "image/jpeg") || ($_FILES["file"]["type"] == "image/pjpeg"))
            {
                $upload_path = PATH_UPLOAD_PHOTO;
            }
            elseif(($_FILES["file"]["type"] == "video/x-ms-wmv") || ($_FILES["file"]["type"] == "audio/mpeg") || ($_FILES["file"]["type"] == "video/mp4"))
            {
                $upload_path = PATH_UPLOAD_VIDEO;
            }
            else
            {
                $upload_path = PATH_UPLOAD_OTHER;
            }
        }

        $config = array();
        $config['allowed_types'] = '*';
        $config['upload_path'] = $upload_path;
        $config['file_name'] = genFileName();

        $this->load->library('upload', $config);

        $filesInfo = array();

        foreach ($_FILES as $key => $value)
        {
            if ($this->upload->do_upload($key))
            {
                $uploadData = $this->upload->data();
                $newFileName = $uploadData['file_name'];
                $filesInfo[] = array(
                    "url" => base_url() . $upload_path . $newFileName,
                );
            }
        }
        $this->responseSuccess(array("file" => $filesInfo ));
        return;
    }
}