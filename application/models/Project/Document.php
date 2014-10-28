<?php
/**
 * 项目文档
 *
 * @author terry
 */
class Project_DocumentModel {
    public $id;
    public $project_id;
    public $task_id;
    public $name;
    public $path;
    public $create_time;
    public $create_by;

    public function getPath() {
        return $this->path;
    }

    public function setPath($path) {
        $this->path = $path;
    }
    
    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }
    
    public function getProject_id() {
        return $this->project_id;
    }

    public function getTask_id() {
        return $this->task_id;
    }

    public function getName() {
        return $this->name;
    }

    public function getCreate_time() {
        return $this->create_time;
    }

    public function getCreate_by() {
        return $this->create_by;
    }

    public function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    public function setTask_id($task_id) {
        $this->task_id = $task_id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setCreate_time($create_time) {
        $this->create_time = $create_time;
    }

    public function setCreate_by($create_by) {
        $this->create_by = $create_by;
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
