<?php
/**
 * 项目参与人
 *
 * @author terry
 */
class Project_ParticipantsModel extends Table {
    protected $table = 'project_participant';
    public function add(Project_ParticipantModel $participant){
        $ret = $this->insert($participant->toArray());
        if($ret){
            return $this->lastInsertValue;
        }else{
            throw new Exception('项目添加失败');
        }
    }
    
    public function getByProjectId($id){
            return $this->select(array('project_id'=>$id))->toArray();
    }
    
    public function getByParticipantId($id){
        if(is_array($id)){
            return $this->select(array('participant_id'=>$id))->toArray();
        }else{
            return $this->select(array('participant_id'=>$id))->current();
        }
    }    
}
