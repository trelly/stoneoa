<?php
/**
 * 流程负责人
 * @author terry
 */
class Approve_FlowuserModel extends Table{
    
    protected $table = 'approve_flow_user';
    
    public function add($flowid,$userid){
        $this->insert(
            array(
                'flow_id'=>$flowid,
                'user_id'=>$userid
            )       
        );
    }
    
    public function remove($flowid){
        return $this->delete(array(
            'flow_id'=>$flowid
        ));
    }
    
    public function getById($flowid){
        return $this->select(array('flow_id'=>$flowid))->toArray();
    }
}
