<?php
/**
 * 联系管理
 */
class ContactController extends Controller{

    public function init(){
        
    }

    public function IndexAction(){
        $this->scripts[] = '/public/stone/approve.js';
        $this->content = $this->getView()->render('contact/index.phtml',array());    
    }
	
	public function listAction(){
        $this->scripts[] = '/public/stone/contact_list.js';
        $this->content = $this->getView()->render('contact/list.phtml',array());
    }
}