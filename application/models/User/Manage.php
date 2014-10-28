<?php
/**
 * 用户管理类
 * @author terry
 */

class User_ManageModel extends Table{
    
    protected $table = 'user';
    
    public function save(User_UserModel $user){
        if($user->getId()){
            return $this->edit($user);
        }  else {
            return $this->add($user);
        }
    }

    private function edit(User_UserModel $user) {
        $set = $user->toArray();
        return $this->update($set, 
              array('id'=>$user->getId())
        );
    }
    
    private function add(User_UserModel $user) {
        $set = $user->toArray();
        $this->insert($set);
        return $this->lastInsertValue;
    }
    
    public function getById($id){
        return $this->select(array('id'=>$id))->current();
    }
}
