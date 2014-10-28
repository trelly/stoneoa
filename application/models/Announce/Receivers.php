<?php
/**
 * Description of Receiver
 *
 * @author terry
 */
class Announce_ReceiversModel extends Table{
    
    protected $table = 'announcement_receiver';
    
    public function getById($id){
        if(is_array($id)){
            return $this->select(array('receiver_id'=>$id))->toArray();
        }else{
            return $this->select(array('receiver_id'=>$id))->current();
        }
    }

	public function getByAnnId($id){
        $this->select->from($this->table)->where(array(
            'announce_id'=>$id
        ));
        return $this->selectWith($this->select)->toArray();
    }
    
    public function add(Announce_ReceiverModel $receiver){
        $this->insert($receiver->toArray());
    }

	public function del($did){
        $stmt = $this->adapter->createStatement("delete from $this->table where announce_id=?",array($did));
        $ret = $this->delete(array('announce_id'=>$did));
		
        if($ret){
            return true;
        }else{
            return false;
        }
    }
}
