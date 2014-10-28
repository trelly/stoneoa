<?php
/**
 * 邮箱账号
 *
 * @author terry
 */
class Mail_AccountModel{
    
    public $id;
    public $name;
    public $user_id;
    public $smtp;
    public $server;
    public $username;
    public $password;
    public $port;
    public $type;
    public $ssl;

    
    public function getSmtp() {
        return $this->smtp;
    }

    public function getType() {
        return $this->type;
    }

    public function getSsl() {
        return $this->ssl;
    }

    public function setSmtp($smtp) {
        $this->smtp = $smtp;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setSsl($ssl) {
        $this->ssl = $ssl;
    }
    
    public function getPort() {
        return $this->port;
    }

    public function setPort($port) {
        $this->port = $port;
    }

        
    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getUser_id() {
        return $this->user_id;
    }

    public function getServer() {
        return $this->server;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setUser_id($user_id) {
        $this->user_id = $user_id;
    }

    public function setServer($server) {
        $this->server = $server;
    }

    public function setUsername($username) {
        $this->username = $username;
    }

    public function setPassword($password) {
        $this->password = $password;
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
