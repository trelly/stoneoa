<?php
/**
 * 用户文档管理
 *
 * @author terry
 */
class FileManagerController extends Yaf_Controller_Abstract {
    
    function init(){
        
    }
    
    /**
     * 审批上传类
     */
    public function imageAction(){
        $file = $this->getRequest()->getFiles();
    }
}
