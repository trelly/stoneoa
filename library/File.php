<?php
/**
 * 文件类
 *
 * @author terry
 */
class File {
    
    protected $file;
    
    public function setFile($file){
        $this->file = $file;
    }

    public function getInfo(){
        if(!file_exists($this->file)){
            throw new Exception($this->file."文件不存在");
        }
        if(is_dir($this->file)){
            $dirs = explode('/', $this->file);
            $name = array_pop($dirs);
            $path = dirname($this->file).DIRECTORY_SEPARATOR;
        }else{
            $name = basename($this->file);
            $path = dirname($this->file).DIRECTORY_SEPARATOR;
        }
        return array(
            'type'=>  filetype($this->file),
            'size'=> filesize($this->file),
            'ctime'=> filectime($this->file),
            'mtime'=>  filemtime($this->file),
            'name'=> $name,
            'path'=> preg_replace("{^/data/netdisk/\d{1,}}",'',$path)
        );
    }
    
}
