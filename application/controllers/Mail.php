<?php
/**
 * 邮件管理
 */
class MailController extends Controller
{
    private $mail;
    private $mailbox;
    private $user;


    public function init()
    {
        $this->mailbox = intval($this->getRequest()->getParam('mailbox'));
        try {
            $this->mailbox && $this->mail = new MailModel($this->mailbox);
            $account_obj = new Mail_AccountsModel();
            $this->account = $account_obj->getAccountById($this->mailbox);
        } catch (Exception $ex) {
            $this->redirect('http://www.stone.com/error/e404');
        }
        $this->user = Yaf_Session::getInstance()->get('user');
    }
    
    public function indexAction(){
        $this->redirect('mail/list');
    }

    /**
     * 设置页面
     */
    public function setAction()
    {
        $this->scripts[] = '/public/stone/dashboard.js';
        $this->content = $this->getView()->render('mail/set.phtml',array());    
    }

    /**
     * 设置页面
     */
    public function sendAction()
    {
        $this->scripts[] = '/public/js/ueditor/ueditor.config.js';
        $this->scripts[] = '/public/js/ueditor/ueditor.all.js';       
        $this->scripts[] = '/public/js/uploadify/uploadify.js';
        $this->scripts[] = '/public/stone/mail_send.js';
        $this->content = $this->getView()->render('mail/send.phtml',array());      
    }
    
    /**
     * 邮件列表
     */
    public function listAction()
    {
        try {
            $this->mail->setFolder('INBOX');
            $count = $this->mail->count();
            $maillist = $this->mail->getMessages();
            $this->scripts[] = '/public/stone/mail_list.js';
            $this->content = $this->getView()->render('mail/list.phtml',array(
                'maillist'=>$maillist,
                'count'=>$count,
                'mailbox'=>$this->mailbox,
                'account'=>  $this->account
            ));            
        } catch (Exception $ex) {
            $this->redirect('http://www.stone.com/error/e404');
        }
    }
    
    /**
     * 邮件读取
     */
    public function readAction()
    {
        $id = $this->getRequest()->getParam('id');
		$this->scripts[] = '/public/js/ueditor/ueditor.config.js';
        $this->scripts[] = '/public/js/ueditor/ueditor.all.js';  
        $this->scripts[] = '/public/stone/mail_read.js';
        $message = $this->mail->getMessage($id);
        $this->content = $this->getView()->render('mail/read.phtml',array(
            'id'=>  intval($id),
            'message'=>$message,
            'mailbox'=>$this->mailbox
        )); 
    }

	/**
     * 邮件转发
     */
    public function forwardAction()
    {
        $id = $this->getRequest()->getParam('id');
		$this->scripts[] = '/public/js/ueditor/ueditor.config.js';
        $this->scripts[] = '/public/js/ueditor/ueditor.all.js';      
        $this->scripts[] = '/public/js/uploadify/uploadify.js'; 
        $this->scripts[] = '/public/stone/mail_forward.js';
        $message = $this->mail->getMessage($id);
        $this->content = $this->getView()->render('mail/forward.phtml',array(
            'id'=>  intval($id),
            'message'=>$message,
            'mailbox'=>$this->mailbox
        )); 
    }
    
    public function contentAction(){
        $this->enableLayout = false;
        $id = $this->getRequest()->getParam('id');
        //$message = new \Zend\Mail\Storage\Message($params);
        //$gh = new \Zend\Mail\Header\GenericHeader();
        //$gh->toString();
        $message = $this->mail->getMessage($id);
        //isset($_GET['debug']) && var_dump($message->getHeader('contenttransferencoding')->getFieldValue());
        //isset($_GET['debug']) && var_dump($message->getHeaders()->toString());
        //var_dump($message->getHeader('content-type')->getParameters());
        $this->content = $this->getView()->render('mail/content.phtml',array(
            'message'=>$message
        ));
        echo $this->content;
    }

    /**
     * 添加第三方邮箱
     */
    public function otherAction()
    {
        $this->scripts[] = '/public/stone/mail_other.js';
        $this->content = $this->getView()->render('mail/other.phtml',array()); 
    }

	 /**
     * 编辑第三方邮箱
     */
    public function editAction()
    {
		$id = $this->getRequest()->getParam('id');
        $this->scripts[] = '/public/stone/account_edit.js';
	
		$open_mail = new Open_MailModel();
		$account = $open_mail->getAccountById($id);
		//var_dump($account);
        $this->content = $this->getView()->render('mail/maccount_edit.phtml',array(
			'account' => $account
		)); 
    }
    
    /**
     * 管理第三方邮件
     */
    public function managesAction()
    {
        $this->scripts[] = '/public/stone/mail_manages.js';
        
        $accounts_obj = new Mail_AccountsModel();
        $accounts = $accounts_obj->getByUserId($this->user['id']);
        $this->content = $this->getView()->render('mail/manages.phtml',array(
            'accounts'=>$accounts
        )); 
    }
    
    public function attachmentAction(){
        $this->enableLayout = false;
        $files = $this->getRequest()->getFiles('file');
        $mail = new Open_MailModel();
        $ret =  $mail->attachment($files);
        echo json_encode(array('result'=>$ret));
    }
    
}
