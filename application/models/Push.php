<?php
/**
 * Description of Push
 *
 * @author terry
 */
class PushModel extends Table {
    
    protected $table='push';
    
    public function add($message){
        return $this->insert($message);
    }
    
    public function get($message){
        var_dump($message);
        $messages = $this->select($message);
        if($messages){
            return $messages->toArray();
        }
        return false;
    }
}
