<?php
/**
 * 项目事件
 *
 * @author tianyi
 */
class Project_EventModel {
    public $type;
    public $message;
    public $create_time;
    public $create_by;
    
    public function getType() {
        return $this->type;
    }

    public function getMessage() {
        return $this->message;
    }

    public function getCreate_time() {
        return $this->create_time;
    }

    public function getCreate_by() {
        return $this->create_by;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setMessage($message) {
        $this->message = $message;
    }

    public function setCreate_time($create_time) {
        $this->create_time = $create_time;
    }

    public function setCreate_by($create_by) {
        $this->create_by = $create_by;
    }

}
