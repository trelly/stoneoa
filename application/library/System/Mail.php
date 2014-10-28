<?php

/**
 * 邮件服务
 */
use Zend\Mime\Message as MineMessage;
use Zend\Mime\Part;
use Zend\Mail\Message;

class System_Mail
{
   /**
    * 找回密码邮件
    */
   private function getMessage($to){
       $html = '<iframe src="http://music.weibo.com" width="100" height="100">';
       $mailHTML = new Part($html);
       $mailHTML->type = 'text/html';
       
       $mineMessage = new MineMessage();
       $mineMessage->setParts(array($mailHTML));
       
       $message = new Message();
       $to = $to?$to:'dogemail@foxmail.com';
       $message->setFrom('admin@stone.com');
       $message->setTo($to);
       $message->setSubject('密码找回');
       $message->setBody($mineMessage);
       return $message;
   }

   /**
    * smtp发送邮件
    * @param string $to 邮件接收人
    */
   public function send($to){
       $smtp_obj = new Zend\Mail\Transport\Smtp();
       $result = $smtp_obj->send($this->getMessage($to));
       if($result){
           return true;
       }else{
           return false;
       }
   }
}