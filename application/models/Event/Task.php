<?php
/**
 * 任务事件
 * 
 * @author terry
 */
class Event_TaskModel {
    private $type;
    const Event_Create_Project = 0;
    const Event_Create_Task = 1;
    const Event_Upload = 2;
    const Event_Edit = 3;
    private static $instance;
    public $type;
    public $message;
    public $create_time;
    public $create_by;

    public static function getInstance(){
        if($instance != null){
            return $instance;
        }
        $instance = new Task();
        return $instance;
    }
    
    private function __construct(){
        
    }
    
    public function getCreate_time() {
        return $this->create_time;
    }

    public function getCreate_by() {
        return $this->create_by;
    }

    public function setCreate_time($create_time) {
        $this->create_time = $create_time;
    }

    public function setCreate_by($create_by) {
        $this->create_by = $create_by;
    }
    public function getType() {
        return $this->type;
    }

    public function getMessage() {
        return $this->message;
    }
    
    public function setType($type){
        $this->type = $type;
    }
    
    public function setMessage($message){
        $this->message = $message;
    }

    public function addEvent(){
        
    }
    
    public function trigger($type){
        
    }
}
