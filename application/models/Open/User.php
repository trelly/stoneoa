<?php
/**
 * 用户管理类
 * @author terry
 */
class Open_UserModel {
    
    private $user;
    private $userManage;
    private $loginuser;

    public function __construct() {
        $this->user = new User_UserModel();
        $this->userManage = new User_ManageModel();
        $this->loginuser = Yaf_Session::getInstance()->get('user');
    }
    
    public function passwd($oldpasswords,$password){
        $this->user->setId($this->loginuser['id']);
        if(md5($oldpasswords) == $this->loginuser['password']){
            $this->user->setPassword(md5($password));
            return $this->userManage->save($this->user);
        }  else {
            throw new Exception('用户原密码错误');
        }
    }
    
    public function update($user){
        $this->user->setId($this->loginuser['id']);
        $this->user->setBirthdate($user['birthdate']);
        $this->user->setSex($user['sex']);
        $this->user->setName($user['name']);
        $this->user->setPhoto($user['photo']);
        $this->user->setCellphone($user['cellphone']);
        $this->user->setPosition($user['position']);
        $this->user->setTelephone($user['telephone']);
        //$this->user->setEmail($user['email']);
        $this->user->setEmployeeid($user['employeeid']);
        return $this->userManage->save($this->user);
    }
    
    public function status(){
        return $this->userManage->getById($this->loginuser['id']);
    }
    
    public function login($email,$password,$auto=false){
        $auth = System_Auth::getInstance();
        $ret = $auth->login($email,$password,$auto);
        if($ret){
            return '登录成功';
        }else{
            throw new Exception('用户名或密码错误');
        }
    }
    
    public function getGByUid(){
        $group = new UserGroupModel();
        return $group->getByUid($this->loginuser['id']);
    }
    
    public function photo($files){
        $local = '/photo/' . $this->loginuser['id'];
        $basepath = "/data/netdisk";
        $path = $basepath.$local;
        if(move_uploaded_file($files['tmp_name'], $path)){
            return array('path'=>$local,'name'=>$files['name']);
        }else{
            return false;
        }
    }
    
   /**
    * 密码找回
    * @param type $email
    */
    public function findPassword($email){
        $user_obj = new UserModel();
        $user = $user_obj->getByEmail($email);
        if(!$user){
            throw new Exception('用户不存在');
        }
        $this->smtp = new Zend\Mail\Transport\Smtp();
        $account = new Mail_AccountsModel();
        $accounts = $account->getDefault($user['id']);
        //var_dump($accounts);
        $message = new \Zend\Mail\Message();
        $message->setSubject('账号密码找回');
        $message->setFrom("service@stone.com");
        $message->setTo($accounts['username']);
        $url = 'http://www.stone.com/system/sign?token='.  $this->token($user['username'].$user['password']).'&username='.$user['email'];
        $content = "<h3>Hi,%s:</h3><br/>点击链接修改您的密码：<a target='blank' href='%s'>%s</a>";
        
        $content = sprintf($content, $user['username'],$url,$url);
        $part = new \Zend\Mime\Part($content);
        $part->type = 'text/html';
        $body = new Zend\Mime\Message();
        $body->setParts(array($part));
        $message->setBody($body);
        $part->type = 'text/html';
        
        
        $message->setBody($body);
        $ret = $this->smtp->send($message);
        return TRUE;
    }
    
    public function updatePassword($token,$email,$password){
        $user_obj = new UserModel();
        $user = $user_obj->getByEmail($email);
        $mytoken = $this->token($user['username'].$user['password']);
        if($token && $token == $mytoken){
            return $user_obj->update(array(
                'password'=>md5($password)
            ), array(
                'email'=>$email
            ));
        }else{
            return false;
        }
    }
    
    public function getEmail($email){
        $user_obj = new UserModel();
        $user = $user_obj->getByEmail($email);
        if(!$user){
            throw new Exception('用户不存在');
        }
        $account = new Mail_AccountsModel();
        return $account->getDefault($user['id']);
    }

    private function token($info){
        return md5($info);
    }
    
}
