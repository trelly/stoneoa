<?php
/**
 * Description of Push
 *
 * @author terry
 */
class Open_PushModel {

    
    public function __construct() {
        $this->user = Yaf_Session::getInstance()->get('user');
    }

    public function message(){
        $notification = new Push_MessageModel();
        $message = $notification->findByUser($this->user['id']);
        return $message;
    }
}
