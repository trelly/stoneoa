<?php
/**
 * 项目参与人
 *
 * @author terry
 */
class Project_ParticipantModel {
    
    public $project_id;
    public $participant_id;
    public $isowner;

    public function getIsowner() {
        return $this->isowner;
    }

    public function setIsowner($isowner) {
        $this->isowner = $isowner;
    }

    public function getProject_id() {
        return $this->project_id;
    }

    public function getParticipant_id() {
        return $this->participant_id;
    }

    public function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    public function setParticipant_id($participant_id) {
        $this->participant_id = $participant_id;
    }
    
    public function toArray(){
        $data = (array)$this;
        foreach($data as $key=>$val){
            if(is_null($val)){
                unset($data[$key]);
            }
        }
        return $data;
    }
}
