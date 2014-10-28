<?php
/**
 * acl role与resource allow表
 * @author terry
 */
class AclRoleModel extends Table{
    
    protected $table = 'role';

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
     * 添加角色
     * @param type $set
     */
    public function add($set){
        return $this->insert($set);
    }
    
    /**
     * 删除角色
     * @param type $where
     * @return int 记录ID
     */
    public function remove($id) {
        return $this->delete(array('id'=>$id));
    }
    
}