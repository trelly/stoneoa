<?php

/**
 * Description of Mail
 *
 * @author terry
 */
class Open_MailModel {
    
    private $account;
    private $accounts;
    private $user;
    private $imap;

    public function __construct() {
        $this->account = new Mail_AccountModel();
        $this->accounts = new Mail_AccountsModel();
        $this->user = Yaf_Session::getInstance()->get('user');
    }

    /**
     * 添加账户
     */
    public function addAccount($account){
        $conf = array(
            'host' => $account['server'],
            'user' => $account['username'],
            'password' => $account['password'],
            'port'=>$account['port'],
            'ssl'=>false
        );
        $this->config = $conf;
        try{
            $this->imap = new Zend\Mail\Storage\Imap($this->config);
            !empty($account['id']) &&  $this->account->setId($account['id']);
            $this->account->setName($account['name']);
            $this->account->setPassword($account['password']);
            $this->account->setUsername($account['username']);
            $this->account->setPort($account['port']);
            $this->account->setServer($account['server']);
            $this->account->setUser_id($this->user['id']);
            //$this->account->setSmtp($account['smtp']);
            //$this->account->setType($account['type']);
            //$this->account->setSsl($account['ssl']);
            return $this->accounts->save($this->account);            
        } catch (Exception $e) {
            var_dump($e->getMessage());
            return false;
        }
    }
    
    /**
     * 显示用户邮箱账号列表
     */
    public function listAccount(){
        return $this->accounts->getByUserId($this->user['id']);
    }
    
    /**
     * 通过id获取获取邮箱账号信息
     */
    public function getAccountById($id){
        $account =  $this->accounts->getByIdAndUserId($id,  $this->user['id']);
        return $account;
    }
    
    public function getByUserId($id){
        $accounts =  $this->accounts->getByUserId($id);
        $account = array();
        if(is_array($accounts)){
            foreach($accounts as &$item){
                if($item['default']){
                    $account = $item;
                    break;
                }
            }
        }
        return $account;
    }

    public function remove($mailid,$id){
        $this->connect($mailid);
        $this->imap->removeMessage($id);
        return true;
    }
    
    public function removeAccount($id){
        $account = new Mail_AccountsModel();
        return $account->remove($id);
    }

    private function connect($id){
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
    
    public function send($messages){
        //var_dump($messages);
        $body = new \Zend\Mime\Message();
        $part = new \Zend\Mime\Part($messages['content']);
        $part->type = 'text/html';
        $parts[] = $part;
        if(isset($messages['attachments'])&&!empty($messages['attachments'])){
            $attachmentObj = new AttachmentModel();
            $attachment = $attachmentObj->get(array('id'=>$messages['attachments']));
            if(!file_exists($attachment['path'])){
                throw new Exception('附件不存在');
            }
            $part2 = new \Zend\Mime\Part(file_get_contents($attachment['path']));
            $part2->type = $attachment['type'];
            $part2->filename = $attachment['name'];
            $parts[] = $part2;
        }
        $body->setParts($parts);
        $message = new \Zend\Mail\Message();
        !empty($messages['cc']) && $message->setCc($messages['cc']);
        if(!empty($messages['from'])){
            $message->setFrom($messages['from']);
        }else{
            $account = new Mail_AccountsModel;
            $info = $account->getDefault($this->user['id']);
            //var_dump($info->username);
            $message->setFrom('admin@stone.com');
        }
        $message->setTo($messages['to'])->setSubject($messages['subject'])->setBody($body);
        $mail = new \Zend\Mail\Transport\Smtp();
        $mail->send($message);
        return TRUE;
    }
    
    public function attachment($files){
        if(empty($files)){
            return false;
        }
        $filename = time();
        $dist_file = '/data/netdisk/attachment/'.$filename;
        switch($files['error']){
          case 1:
              throw new Exception("上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值");
          case 2:
              throw new Exception("上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值");
          case 3:
              throw new Exception("文件只有部分被上传");
          case 4:
              throw new Exception("没有文件被上传");
          case 6:
              throw new Exception("找不到临时文件夹");
          case 7:
              throw new Exception("文件写入失败");
        }
        $md5 = md5_file($files['tmp_name']);
        $ret = move_uploaded_file($files['tmp_name'], $dist_file);
        if($ret){
            $attachment = new AttachmentModel();
            $attachmentid = $attachment->add($files,$dist_file,$md5);
            return $attachmentid;
        }  else {
            return false;
        }        
    }
    
    public function suggest($keyword){
        $user = new UserModel();
        $users = $user->suggest($keyword);
        $mail = new Mail_AccountsModel();
        $result = array();
        foreach ($users as &$item){
            if($info = $mail->getDefault($item['id']))
                $tmp = array();
                $tmp['name'] = $item['name'];
                $tmp['email'] = $info['username'];
                $result[] = $tmp;
        }
        return $result;
    }

    public function setDefault($id){
        return $this->accounts->setDefault($id,  $this->user['id']);
    }
}
