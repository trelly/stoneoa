<?php

class UserGroupModel extends Table{
    
    protected $table = 'user_group';
    
    /**
     * 获取用户部门
     * @param mixed $uid
     * @return mixed
     */
    public function getByUid($uids){
        if(is_array($uids)){
            return $this->select(array('user_id'=>$uids))->toArray();
        }else{
            return $this->select(array('user_id'=>$uids))->current();
        }
    }


	public function getUsersById($gid){
		$select = new \Zend\Db\Sql\Select();
        $where = "group_id = '$gid'";
        $select->from($this->table)->where($where);
        return $this->selectWith($select)->toArray();
	}
}

