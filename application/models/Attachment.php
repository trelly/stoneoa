<?php
/**
 * Description of Attachment
 *
 * @author terry
 */
class AttachmentModel extends Table{
    
    protected $table='attachment';
    
    public $attachment;
    
    function add($file,$path,$md5){
        $data = array(
            'name'=>$file['name'],
            'type'=>$file['type'],
            'createtime'=>time(),
            'path'=>$path,
            'md5'=>$md5,
        );
        $this->insert($data);
        if($id = $this->lastInsertValue){
            return $this->get(array('id'=>$id));
        }else{
            return false;
        }
    }
    
    function get($file){
        return $this->select($file)->current();
    }
            
    function remove($id){
        
    }
}
