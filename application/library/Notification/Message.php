<?php
/**
 * 通知消息抽象类
 * @author terry
 */
namespace Notification;
abstract class Message{
    
    public $subject;
    public $content;
    public $create_time;
    public $craete_by;


}
