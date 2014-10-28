<?php
/**
 * Description of Project
 *
 * @author terry
 */
class Project_ProjectModel {
    
    public $id;
    public $name;
    public $start_time;
    public $description;
    public $budget_cost;
    public $status;
    public $priority;
    public $create_by;
    public $create_time;
    public $update_by;
    public $update_time;
    
    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getStart_time() {
        return $this->start_time;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getBudget_cost() {
        return $this->budget_cost;
    }

    public function getStatus() {
        return $this->status;
    }

    public function getPriority() {
        return $this->priority;
    }

    public function getCreate_by() {
        return $this->create_by;
    }

    public function getCreate_time() {
        return $this->create_time;
    }

    public function getUpdate_by() {
        return $this->update_by;
    }

    public function getUpdate_time() {
        return $this->update_time;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setStart_time($start_time) {
        $this->start_time = $start_time;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setBudget_cost($budget_cost) {
        $this->budget_cost = $budget_cost;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function setPriority($priority) {
        $this->priority = $priority;
    }

    public function setCreate_by($create_by) {
        $this->create_by = $create_by;
    }

    public function setCreate_time($create_time) {
        $this->create_time = $create_time;
    }

    public function setUpdate_by($update_by) {
        $this->update_by = $update_by;
    }

    public function setUpdate_time($update_time) {
        $this->update_time = $update_time;
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
