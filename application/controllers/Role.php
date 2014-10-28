<?php
class RoleController extends Controller{

    public function init(){
        $this->group = new RoleModel();
    }

    public function IndexAction(){
        
    }

    public function ListAction(){
        $this->scripts[] = '/public/stone/role_list.js';
        $this->content = $this->getView()->render('role/list.phtml',array());    
    }    
    
    public function AddAction(){
		$this->scripts[] = '/public/stone/role_add.js';
        $this->content = $this->getView()->render('role/add.phtml',array()); 
    }
    
    public function EditAction(){
        $this->scripts[] = '/public/stone/role_edit.js';
        $this->content = $this->getView()->render('role/edit.phtml',array()); 
    }
}
