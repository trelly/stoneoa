<?php
/**
 * 项目任务
 *
 * @author terry
 */
class Project_TaskModel {

    public $id;
    public $title;
    public $description;
    public $priority;
    public $severity;
    public $milestone;
    public $start_date;
    public $end_date;
    public $budget_cost;
    public $project_id;
    public $manager_id;
    public $parent_task_id;
    public $dependency_task_id;
    public $create_by;
    public $create_time;
    public $update_by;
    public $update_time;
    public $progress; 
    
    public function getProgress() {
        return $this->progress;
    }

    public function setProgress($progress) {
        $this->progress = $progress;
    }

    public function getEnd_date() {
        return $this->end_date;
    }

    public function setEnd_date($end_date) {
        $this->end_date = $end_date;
    }

    public function getId() {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }
    public function getManager_id() {
        return $this->manager_id;
    }

    public function setManager_id($manager_id) {
        $this->manager_id = $manager_id;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getPriority() {
        return $this->priority;
    }

    public function getSeverity() {
        return $this->severity;
    }

    public function getMilestone() {
        return $this->milestone;
    }

    public function getStart_date() {
        return $this->start_date;
    }

    public function getBudget_cost() {
        return $this->budget_cost;
    }

    public function getProject_id() {
        return $this->project_id;
    }

    public function getParent_task_id() {
        return $this->parent_task_id;
    }

    public function getDependency_task_id() {
        return $this->dependency_task_id;
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

    public function setTitle($title) {
        $this->title = $title;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setPriority($priority) {
        $this->priority = $priority;
    }

    public function setSeverity($severity) {
        $this->severity = $severity;
    }

    public function setMilestone($milestone) {
        $this->milestone = $milestone;
    }

    public function setStart_date($start_date) {
        $this->start_date = $start_date;
    }

    public function setBudget_cost($budget_cost) {
        $this->budget_cost = $budget_cost;
    }

    public function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    public function setParent_task_id($parent_task_id) {
        $this->parent_task_id = $parent_task_id;
    }

    public function setDependency_task_id($dependency_task_id) {
        $this->dependency_task_id = $dependency_task_id;
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
