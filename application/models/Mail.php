<?php

/**
 * 邮件类
 * @author terry
 * @since 1.0
 */
class MailModel{
    
    private $config = array();
    private $folder = 'INBOX';
    private $accounts;
    private $imap;
            
    function __construct($id = 1) {
        $this->accounts = new Open_MailModel();
        $account = $this->accounts->getAccountById($id);
        $conf = array(
            'host' => $account['server'],
            'user' => $account['username'],
            'password' => $account['password'],
            'port'=>$account['port'],
            'ssl'=>false
        );
        $this->config = $conf;
        if($account['type'] == 0){
            $this->imap = new Zend\Mail\Storage\Imap($this->config);    
        }else{
            $this->imap = new \Zend\Mail\Storage\Pop3($this->config);
        }  
    }
    
    public function setConfig($config){
        $this->config = $config;
    }

    /**
     * 获取邮件
     */
    public function Mails(){
        $this->imap->selectFolder('INBOX');
        //$this->imap->getUniqueId($id)
        foreach($this->imap as $im){
            var_dump($im,$im->messageid,  $this->imap->getUniqueId(1));
            exit;
        }
        return $this->imap;
    }
    
    /**
     * 获取邮箱目录列表
     * @return type
     */
    public function getFolders(){
        return $this->imap->getFolders();
    }
    
    public function setFolder($folder){
        $this->folder = $folder;
    }

    public function getMessages(){
        $this->imap->selectFolder($this->folder);
        return $this->imap;
    }

    public function count(){
        $this->imap->selectFolder($this->folder);
        return $this->imap->countMessages();
    }
    
    public function getMessage($id){
        $message =  $this->imap->getMessage($id);
        return $message;
    }
}
?>
