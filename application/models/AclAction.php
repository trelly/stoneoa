<?php
/**
 * acl resource
 * @author terry
 */
class AclActionModel extends Table{
    
    protected $table = 'acl_action';

    public function lists(){
        return $this->select()->toArray();
    }
    
    public function count(){
        return $this->select()->count();
    }
    
    public function getById($id){
        return $this->select(array('id'=>$id))->toArray();
    }

    /**
     * 添加资源列表
     * @param type $set
     */
    public function add($set){
        try {
            $this->insert($set);
        } catch (Exception $exc) {
            throw $exc;
        } 
    }
    
    /**
     * 删除
     * @param type $where
     */
    public function remove($where) {
        $this->delete($where);
    }
    
}