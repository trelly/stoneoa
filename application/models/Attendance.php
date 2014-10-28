<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class AttendanceModel extends Table{
    
    protected $table = 'stone_attendance';

    public function check(){
        $attendance = $this->isCheck();
        if($attendance){
            $result = $this->checkOut($attendance);
        }else{
            $result = $this->checkIn();
        }
        return $result;
    }
    
    public function get($start,$end) {
        $select = new \Zend\Db\Sql\Select();
        $where = "sign_date between '$start' and '$end' and user_id = {$this->loginuser['id']}";
        $select->from($this->table)->where($where)->order("sign_date desc");
        return $this->selectWith($select)->toArray();
    }

	public function getByGroupId($start,$end,$userid){
		//SELECT sa.*,u.username FROM `stone_attendance` as sa , `user` as u ,`user_group` as ug  WHERE sa.user_id = u.id and u.id = ug.user_id and ug.`group_id`=6 order by u.username
		$select = new \Zend\Db\Sql\Select();
        $where = "sign_date between '$start' and '$end' and user_id = '$userid'";
        $select->from($this->table)->where($where)->order("sign_date asc");
        return $this->selectWith($select)->toArray();
	}

    public function isCheck(){
        return $this->select(array(
            'user_id'=>  $this->loginuser['id'],
            'sign_date'=>date('y-m-d',  time())
        ))->current();
    }    

    protected function checkIn(){
        $this->insert(array(
            'user_id'=>  $this->loginuser['id'],
            'sign_start'=>date("H:i:s",time()),
            'sign_date'=>  date('y-m-d',  time())
        ));
        return $this->lastInsertValue;
    }
    
    protected function checkOut($attendance){
        return $this->update(array(
            'user_id'=>  $this->loginuser['id'],
            'sign_end'=>date("H:i:s",time()),
            'sign_date'=>  date('y-m-d',  time())
        ),  array('id'=>$attendance['id']));
    }

	public function updateCheck($sign_date,$update_start,$update_end,$reason,$id){
		return $this->update(array(
            'user_id'=>  $this->loginuser['id'],
			'sign_date'=> $sign_date,
            'update_end'=> $update_end,
            'update_start'=>  $update_start,
            'update_reason'=>  $reason
        ),  array('id'=>$id));
	}

	public function addCheck($sign_date,$update_start,$update_end,$reason){
		return $this->insert(array(
            'user_id'=>  $this->loginuser['id'],
			'sign_date'=> $sign_date,
            'update_end'=> $update_end,
            'update_start'=>  $update_start,
            'update_reason'=>  $reason
        ));
	}
}
?>
