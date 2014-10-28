<?php

/**
 * 角色类
 * @author terry
 * @since 1.0
 */
class RoleModel extends Table{
    
    protected $table = 'role';
   
    public function lists($page,$limit=20){
        $lists = $this->select()->toArray();
        return $this->hash($lists);
    }
    
    
    public function getById($rid){
        return $this->select(array('id'=>$rid))->current();
    }

    public function del($rid){
        $stmt = $this->adapter->createStatement("delete from $this->table where id=?",array($rid));
        $ret = $this->delete(array('id'=>$rid));
        if($ret){
            return true;
        }else{
            return false;
        }
    }    
    
    public function edit($rid,$name,$status,$desc){
        $ret = $this->update(array(
            'name'=>$name,
            'description'=>$desc,
            'status'=>$status
        ),array(
            'id'=>$rid
        ));
        if($ret){
            return true;
        }else{
            return false;
        }
    }

    public function add($name,$status,$desc,$startpage){
        $this->insert(array(
            'name'=>$name,
            'description'=>$desc,
            'status'=>$status,
            'create_time'=>date('Y-m-d H:i:s',  time())
        ));
        return $this->lastInsertValue;
    }   
}
?>