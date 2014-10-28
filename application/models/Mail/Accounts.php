<?php
/**
 * 邮箱账号
 *
 * @author terry
 */
class Mail_AccountsModel extends Table{
    protected $table = "mail_account";
    
    public function save(Mail_AccountModel $account){
        if($account->getId()){
            return $this->update($account->toArray(), array('id'=>$account->getId()));
        }else{
            $this->insert($account->toArray());
            return $this->lastInsertValue;
        }        
    }
    
    public function getByUserId($userid){
        return $this->select(array('user_id'=>$userid))->toArray();
    }
    
    public function getAccountById($id){
        return $this->select(array('id'=>$id))->current();
    }

    public function getByIdAndUserId($id,$userid){
        return $this->select(array('id'=>$id,'user_id'=>$userid))->current();
    }
    
    public function getDefault($userid){
        return $this->select(array('user_id'=>$userid,'default'=>1))->current();
    }

    public function remove($id){
        return $this->delete(array('id'=>$id));
    }
    
    public function setDefault($id,$uid){
        $this->update(array('default'=>0),array('user_id'=>$uid));
        $this->update(array('default'=>1),array('id'=>$id));
        return true;
    }
}
