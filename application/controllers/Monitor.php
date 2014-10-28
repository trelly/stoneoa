<?php
class GroupController extends Controller{

    public function init(){
        $this->group = new GroupModel();
    }

    public function IndexAction(){
        
    }

    public function AddAction(){
    
    }

    public function ListAction(){
        $userlist = $this->group->fetchAll();
        $this->getView()->assign(
           array(
                'userlist'=>$userlist
           )
        );
    }
    
    public function EditAction(){
        
    }
}
