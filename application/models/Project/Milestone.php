<?php
/**
 * 里程碑
 *
 * @author tianyi
 */
class Project_MilestoneModel {
    
    public $id;
    public $name;
    public $time_point;
    public $project_id;
    
    public function getName() {
        return $this->name;
    }

    public function getTime_point() {
        return $this->time_point;
    }

    public function getProject_id() {
        return $this->project_id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setTime_point($time_point) {
        $this->time_point = $time_point;
    }

    public function setProject_id($project_id) {
        $this->project_id = $project_id;
    }
    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
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
