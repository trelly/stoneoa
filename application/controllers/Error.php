<?php
/**
 * 部门管理
 */
class ErrorController extends Controller{
    
    public function init(){
       Yaf_Dispatcher::getInstance()->autoRender(true);
       $this->enableLayout = FALSE;
    }

    public function e404Action(){
        
    }
    
    public function _500Action(){
        
    }
}
