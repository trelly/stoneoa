<?php

/**
 * Description of Push
 *
 * @author tianyi
 */
class PushController extends Yaf_Controller_Abstract {
    
    public function messageAction(){
        Yaf_Dispatcher::getInstance ()->disableView ();
        $id = $this->getRequest()->getParam('id');
        $message = new Push_MessageModel();
        $message->findById($id);
        $message->readed();
        $message->save();
        $this->redirect($message->url);
    }
}
