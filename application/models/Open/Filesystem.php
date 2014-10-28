<?php
/**
 * 文件管理系统
 *
 * @author tianyi
 */
class Open_FilesystemModel {
    
    private $file;
    private $document_root;
    private $currentdir;
    private $user;
    private $files;


    public function __construct() {
        $this->user = Yaf_Session::getInstance()->get('user');
        if(!$this->user){
            throw new Exception("没有授权");
        }
        $this->document_root = "/data/netdisk/".$this->user['id'].DIRECTORY_SEPARATOR;
        if(!file_exists($this->document_root)){
            mkdir($this->document_root, "777");
            chmod($this->document_root,0777);
        }
        $this->file = new File();
        $this->files = array();
        $this->currentdir = $this->document_root;
    }
    
    private function opendir($path){
        if($handle = opendir($path)){
            return $handle;
        }  else {
            throw new Exception("创建失败");
        }
    }

    public function show($path = '/',$sort='time'){
        $this->changeDir($path);
        $dirs = $this->opendir($this->currentdir);
        while (($file = readdir($dirs)) !== false){
            $sub_dir = $this->currentdir . DIRECTORY_SEPARATOR .ltrim($file,'/');
            $this->file->setFile($sub_dir);
            if($file == '.' || $file == '..') {
                continue;
            }else{
                $this->files[] = $this->file->getInfo();
            }
        }
        if(empty($this->files)){
            throw new Exception('目录为空');            
        }
        foreach($this->files as $k=>$v){
            $size[$k] = $v['size'];
            $time[$k] = $v['ctime'];
            $name[$k] = $v['name'];
        }
        if($sort == 'time'){
            $type = $time;
        }elseif ($sort == 'name') {
            $type = $name;
        }  else {
            $type = $size;
        }
        array_multisort($type,SORT_DESC,SORT_STRING, $this->files);//按时间排序
        return $this->files;
    }
    
    public function changeDir($dir){
        $this->currentdir = $this->document_root . ltrim($dir,'/');
        if(file_exists($this->currentdir)){
            return $dir;
        }  else {
            throw new Exception("目录".$this->currentdir."不存在");
        }
    }
    
    public function getRealPath($dir){
        $this->currentdir = $this->document_root . ltrim($dir,'/');
        if(file_exists($this->currentdir)){
            return $this->currentdir;
        }  else {
            throw new Exception("目录".$this->currentdir."不存在");
        }
    }    
    
    public function mkdir($dir){
        $this->currentdir = $this->document_root . ltrim($dir,'/');
        if(file_exists($this->currentdir)){
            throw new Exception("目录已经存在");
        }  else {
            mkdir($this->currentdir);
            $dirs = explode('/', $this->currentdir);
            $name = array_pop($dirs);    
            return array(
                'type'=>  filetype($this->currentdir),
                'size'=> filesize($this->currentdir),
                'cdate'=> filectime($this->currentdir),
                'mdate'=> filemtime($this->currentdir),
                'name'=> $name,
                'path'=> preg_replace("{^/data/netdisk/\d{1,}}",'',dirname($this->currentdir).DIRECTORY_SEPARATOR)
            ); 
        }
        return $dir;
    }
    
    public function rm($file){
        $this->currentdir = $this->document_root . ltrim($file,'/');
        if(!file_exists($this->currentdir)){
            throw new Exception("文件不存在");
        } elseif (is_dir($this->currentdir)) {
            $ret = rmdir($this->currentdir);
            if($ret){
                return '删除成功';
            }else{
                return '删除失败';
            }
        }  else {
            unlink($this->currentdir);
            return true;
        }      
    }

    public function mv($source,$dist){
        $source_realpath = $this->document_root . ltrim($source,'/');
        $dist_realpath = $this->document_root . ltrim($dist,'/');
        if(!file_exists($source_realpath)){
            throw new Exception(" $source 文件不存在");
        } else {
             rename($source_realpath, $dist_realpath);
            return true;
        }      
    }    
    
    public function upload($files,$dir = '/'){
        $this->changeDir($dir);
        if(empty($files)){
            return false;
        }
        $dist_file = $this->currentdir.DIRECTORY_SEPARATOR.$files['name'];
        switch($files['error']){
          case 1:
              throw new Exception("上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值");
          case 2:
              throw new Exception("上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值");
          case 3:
              throw new Exception("文件只有部分被上传");
          case 4:
              throw new Exception("没有文件被上传");
          case 6:
              throw new Exception("找不到临时文件夹");
          case 7:
              throw new Exception("文件写入失败");
        }
        $ret = move_uploaded_file($files['tmp_name'], $dist_file);
        if($ret){
              return array(
                  'type'=>  filetype($dist_file),
                  'size'=> filesize($dist_file),
                  'cdate'=> filectime($dist_file),
                  'edate'=>  filemtime($dist_file),
                  'name'=> $files['name'],
                  'path'=> preg_replace("{^/data/netdisk/\d{1,}}",'',dirname($dist_file).DIRECTORY_SEPARATOR)
              );
        }
    }
}
