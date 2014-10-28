<?php
/**
 * 用户文件
 */
class FileController extends Controller{

    private $filesystem;
    
    public function init(){
        $this->filesystem = new Open_FilesystemModel();
    }

    public function IndexAction(){
		$this->stylesheets[] = '/public/css/prettyPhoto.css';
        $this->scripts[] = '/public/js/prettyPhoto/jquery.prettyPhoto.js';
		$this->scripts[] = '/public/js/uniform/jquery.uniform.js';
		$this->scripts[] = '/public/js/uploadify/uploadify.js';
		$this->scripts[] = '/public/js/filterable/filterable.js';
		$this->scripts[] = '/public/js/filterable/jquery.easing.1.3.js';
		$this->scripts[] = '/public/stone/file_index.js';
        $this->content = $this->getView()->render('file/index.phtml',array());     
    }

	 public function privateAction(){
		$this->stylesheets[] = '/public/css/prettyPhoto.css';
        $this->scripts[] = '/public/js/prettyPhoto/jquery.prettyPhoto.js';
		$this->scripts[] = '/public/js/uniform/jquery.uniform.js';
		$this->scripts[] = '/public/js/uploadify/uploadify.js';
		$this->scripts[] = '/public/js/filterable/filterable.js';
		$this->scripts[] = '/public/js/filterable/jquery.easing.1.3.js';
		$this->scripts[] = '/public/stone/file_index.js';
		$this->scripts[] = '/public/stone/file_private.js';
        $this->content = $this->getView()->render('file/index.phtml',array());     
    }

    public function UploadAction(){
            $this->enableLayout = FALSE;
            $files = $this->getRequest()->getFiles('file');
            $path = $this->getRequest()->getPost('path');
            $result = $this->filesystem->upload($files, $path);
            if($result){
                echo json_encode(array('result'=>$result));
            }else{
                echo json_encode(array('error'=>'上传失败'));
            }
     }

    public function UeditorAction(){
            $this->scripts[] = '/public/js/ueditor/ueditor.config.js';
            $this->scripts[] = '/public/js/ueditor/ueditor.all.min.js';
            $this->scripts[] = '/public/stone/file_ueditor.js';
            $this->content = $this->getView()->render('file/test.phtml',array());   
    }
    
    public function getAction(){
        
        $path = $this->getRequest()->getQuery('path');
        
        $realpath = $this->filesystem->getRealPath($path);
        
        header("Content-type: application/octet-stream");

        header("Content-Disposition: attachment; filename=".  basename($realpath));

        echo file_get_contents($realpath);
    }
    
    public function previewAction(){
        
    }
}