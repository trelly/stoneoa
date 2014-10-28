<?php
/**
 * Description of ApproveTemplate
 *
 * @author terry
 */
class Approve_TypeModel extends Table{
    //put your code here
    protected $table = 'approve_type';
    
    public function lists(){
         return $this->select()->toArray();
    }
    
    public function add($name){
        $this->insert(array(
            'name'=>$name
        ));
        return $this->lastInsertValue;
    }
    
    public function rename($id,$name){
        return $this->update(
            array('name'=>$name), 
            array('id'=>$id)
        );
    }

	public function del($id){
        return $this->delete(array(
            'id'=>$id
        ));
    }
}
