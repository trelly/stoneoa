<?php
class TestController extends Controller{
    
    const ONEMONTH = 560000;

    public function init(){
        $this->user = new UserModel();
    }

    public function IndexAction(){
       $layout = new Zend\View\Helper\Layout();

       return false;
    }
}

