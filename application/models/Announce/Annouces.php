<?php
/**
 * Description of Annouce
 *
 * @author terry
 */
class Announce_AnnoucesModel extends Table {
    
    protected $table = 'announcement';
    
    public function add(Announce_AnnouceModel $annouce){
        $ret = $this->insert($annouce->toArray());
        if($ret){
            return $this->lastInsertValue;
        }else{
            throw new Exception('添加失败');
        }
    }
    
    public function getList(){
        return $this->select()->toArray();
    }
    
    public function getById($id){
        $this->select->from($this->table)->where(array(
            'id'=>$id
        ))->order(array('update_time'=>'desc'));
        if(is_array($id)){
            return $this->selectWith($this->select)->toArray();
        }else{
            return $this->selectWith($this->select)->current();
        }
    }

	public function getByMy(){
		$select = new \Zend\Db\Sql\Select();
        $where = "create_by = {$this->loginuser['id']}";
        $select->from($this->table)->where($where)->order("create_time desc");
        return $this->selectWith($select)->toArray();
	}
    
	public function del($did){
        $stmt = $this->adapter->createStatement("delete from $this->table where id=?",array($did));
        $ret = $this->delete(array('id'=>$did));
		
        if($ret){
            return true;
        }else{
            return false;
        }
    }
}
