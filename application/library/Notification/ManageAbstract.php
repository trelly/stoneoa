<?php
/**
 * 通知推送管理类
 * @author terry
 */
namespace Notification;
abstract class ManageAbstract {
    
    public function publish(Notification_Message $message);
    
}
