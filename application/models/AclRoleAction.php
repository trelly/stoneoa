<?php
/**
 * acl role与resource allow表
 * @author terry
 */
class AclRoleActionModel extends Table{
    
    protected $table = 'acl_role_action';

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
        $this->insert($set);
    }
    
    /**
     * 删除
     * @param type $where
     */
    public function remove($where) {
        $this->delete($where);
    }
    
}