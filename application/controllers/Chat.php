<?php
/**
 * 聊天
 */
class ChatController extends Controller{

    public function init(){
        
    }

    public function IndexAction(){
		$this->scripts[] = '/public/stone/chat_index.js';
        $this->content = $this->getView()->render('chat/index.phtml',array());  
    }
    
}
