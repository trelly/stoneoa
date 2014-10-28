<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UserManager
 *
 * @author terry
 */
class UserManagerModel {
    //put your code here
    private $user_obj;
    private $usergroup_obj;
    private $group_obj;
    
    function __construct() {
        $this->user_obj = new UserModel();
        $this->group_obj = new GroupModel();
        $this->group_obj = new UserGroupModel();
    }
    
    public function getList(){
        $usergroup_obj = new UserGroupModel();
        $usergroup = $usergroup_obj->getByUidBatch($uids);
        $group_obj = new GroupModel();
    }
}
