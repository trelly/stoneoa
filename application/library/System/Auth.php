<?php
/**
 * 当前用户身份信息判断
 * @author terry
 * @since 1.0
 */
use Zend\Crypt\PublicKey;
class System_Auth
{
    
    private static $instance;
    private $user_obj;
    private $rsa_obj;
    private $user;

    const EXPIRE = 2592000;
    
    //cookie加密的信息
    private $enable = array('username','email','password','status');

    private function __construct(){
        $this->user_obj = new UserModel();
        $config = new Yaf_Config_Ini(APP_PATH.'/configs/rsa.ini', 'key');
        $this->user = Yaf_Session::getInstance()->get('user');
        $this->rsa_obj = new PublicKey\Rsa();
        $options = new PublicKey\RsaOptions();
        $key = new PublicKey\Rsa\PrivateKey($config->privatekey);
        $pubkey = new PublicKey\Rsa\PublicKey($config->publickey);
        
        $options->setPrivateKey($key)->setPublicKey($pubkey);
        $this->rsa_obj->setOptions($options);
    }
    
    public static function getInstance()
    {
        if (self::$instance == NULL){
            self::$instance = new self;
        }
        return self::$instance;
    }

    /**
     * 用户登录
     * @param string $username 用户名
     */
    public function Login($email,$password,$auto=false){
        $user = $this->user_obj->getByUsername($email);
        if($user && $user['password'] == md5($password)){
            //注册session
            Yaf_Session::getInstance()->set('user', $user);
            setcookie('isAdmin', 0, time()+self::EXPIRE,'/');
            //cookie存储用登录认证信息
            if($auto){
                foreach($user as $key=>$val){
                    if(in_array($key, $this->enable)){
                        $user_str[] = $key.'='.rawurldecode($val);
                    }   
                }
                $user_merge = implode('&', $user_str);                
                $sue = $this->rsa_obj->encrypt($user_merge);
                if($sue){
                    setcookie('username', $user['username'], time()+self::EXPIRE,'/');
                    return setcookie('sue', $sue, time()+self::EXPIRE,'/');
                }else{
                    throw new Exception('数据校验异常');
                }                
            }
            return true;
        }else{
            throw new Exception('用户名或密码错误');
        }
    }
    
    /**
     * 判断用户是否登录
     */
    public function isLogin(){
        if(!$this->user){
            return $this->hasIdentify();
        }else{
            return $this->user;
        }
    }
    
    /**
     * 判断用户是否有登录身份信息
     * @return boolean
     */
    public function hasIdentify(){
        if(!isset($_COOKIE['sue'])){
            return false;
        }
        $encryt_user = $this->rsa_obj->decrypt($_COOKIE['sue']);
        parse_str($encryt_user,$decode_user);
        $user = $this->user_obj->getByEmail($decode_user['email']);
        if($user && $user['password'] == $decode_user['password']){
            //注册session
            Yaf_Session::getInstance()->set('user', $user);
            return true;
        }else{
            return false;
        }
    }
    
    /**
     * 获取当前登录用户信息
     */
    public function getProfile(){
        return Yaf_Session::getInstance()->get('user');
    }

    /**
     * 退出登录
     */
    public function logout(){
        setcookie('sue','',0, "/");
        return Yaf_Session::getInstance()->del('user');
    }
  
}

