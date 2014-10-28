<?php
/**
 * 
 * @author terry
 */
class User_UserModel extends CommonModel{
    public $id;
    public $username;
    public $password;
    public $opcode;
    public $enctype;
    public $name;
    public $email;
    public $sex;
    public $position;
    public $telephone;
    public $cellphone;
    public $photo;
    public $birthdate;
    public $employeeid;
    public $smartcard;
    public $status;
    public $lastlogin;
    public $lastlogout;
    public $create_by;
    public $create_time;
    public $update_by;
    public $update_time;
    
    public function getId() {
        return $this->id;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getOpcode() {
        return $this->opcode;
    }

    public function getEnctype() {
        return $this->enctype;
    }

    public function getName() {
        return $this->name;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getSex() {
        return $this->sex;
    }

    public function getPosition() {
        return $this->position;
    }

    public function getTelephone() {
        return $this->telephone;
    }

    public function getCellphone() {
        return $this->cellphone;
    }

    public function getPhoto() {
        return $this->photo;
    }

    public function getBirthdate() {
        return $this->birthdate;
    }

    public function getEmployeeid() {
        return $this->employeeid;
    }

    public function getSmartcard() {
        return $this->smartcard;
    }

    public function getStatus() {
        return $this->status;
    }

    public function getLastlogin() {
        return $this->lastlogin;
    }

    public function getLastlogout() {
        return $this->lastlogout;
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

    public function setUsername($username) {
        $this->username = $username;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function setOpcode($opcode) {
        $this->opcode = $opcode;
    }

    public function setEnctype($enctype) {
        $this->enctype = $enctype;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setSex($sex) {
        $this->sex = $sex;
    }

    public function setPosition($position) {
        $this->position = $position;
    }

    public function setTelephone($telephone) {
        $this->telephone = $telephone;
    }

    public function setCellphone($cellphone) {
        $this->cellphone = $cellphone;
    }

    public function setPhoto($photo) {
        $this->photo = $photo;
    }

    public function setBirthdate($birthdate) {
        $this->birthdate = $birthdate;
    }

    public function setEmployeeid($employeeid) {
        $this->employeeid = $employeeid;
    }

    public function setSmartcard($smartcard) {
        $this->smartcard = $smartcard;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function setLastlogin($lastlogin) {
        $this->lastlogin = $lastlogin;
    }

    public function setLastlogout($lastlogout) {
        $this->lastlogout = $lastlogout;
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

    
}
