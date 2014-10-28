<?php
/*
 * 系统管理
 * @author terry
 * @since 2013/11/26
 */
class SystemController extends Controller{

    protected function init(){
        Yaf_Dispatcher::getInstance()->autoRender(false);
        $this->user = new UserModel();
    }
    
    public function indexAction(){
        $this->redirect('/system/dashboard');
    }

    /*
     * 用户登录页面
     */
    public function signAction(){
        $this->enableLayout = FALSE;
        $this->content = $this->getView()->render('sign.phtml',array(
            
        ));
        echo $this->content;
    }
    
    public function logoutAction(){
        $auth = System_Auth::getInstance();
        $auth->logout();
        $this->redirect('/');
    }

    public function loginAction(){
        
    }


    /*
     * 快捷面板
     */
    public function DashboardAction(){
		$this->scripts[] = '/public/js/knob/jquery.knob.js';
        $this->scripts[] = '/public/js/flot/jquery.flot.js';
        $this->scripts[] = '/public/js/flot/jquery.flot.resize.js';
        $this->scripts[] = '/public/js/flot/jquery.flot.categories.js';
        $this->stylesheets[] = '/public/css/fullcalendar.css';
        $this->scripts[] = '/public/js/calendar/fullcalendar.js';
		$this->scripts[] = '/public/stone/dashboard.js';
        $this->content = $this->getView()->render('dashboard/list.phtml',array(
            
        ));
    }
    
    /*
     * 用户管理
     */
    public function UserAction(){
        $userlist = $this->user->fetchAll();
        $this->content = $this->getView()->render('user/list.phtml',array(
            'userlist'=>$userlist
        ));
    }
    
    /*
     * 用户管理
     */
    public function UserdetailAction(){
        $userlist = $this->user->fetchAll();
        $this->content = $this->getView()->render('user/list.phtml',array(
            'userlist'=>$userlist
        ));
    }
    
    /*
     * 用户添加
     */
    public function UseraddAction(){
        $userlist = $this->user->fetchAll();
        $this->content = $this->getView()->render('user/add.phtml',array(
            'userlist'=>$userlist
        ));
    }
    /*
     * 用户编辑
     */
    public function UsereditAction(){
        $userlist = $this->user->fetchAll();
        $this->content = $this->getView()->render('user/edit.phtml',array(
            'userlist'=>$userlist
        ));
    }
    
    /*
     * 用户组管理
     */
    public function GroupAction(){
        $group = new GroupModel();
        $grouplist = $group->fetchAll();
        $this->content = $this->getView()->render('group/list.phtml',array(
            'userlist'=>$grouplist
        ));
    }
   
    
    /*
     * 系统监测
     */
    public function MonitorAction(){
        $this->scripts[] = '/public/js/knob/jquery.knob.js';
        $this->scripts[] = '/public/js/flot/jquery.flot.js';
        $this->scripts[] = '/public/js/flot/jquery.flot.resize.js';
        $this->scripts[] = '/public/js/flot/jquery.flot.categories.js';
        $this->scripts[] = '/public/stone/system_monitor.js';
		
        $this->content = $this->getView()->render('system/monitor.phtml',array()); 
    }
    
    /*
     * 系统日志
     */
    public function LogsAction(){
        
    }
    
    public function OtherAction(){
        
    }
    
    
    public function componentActionAction(){
        
    }
    
    public function findpasswordAction(){
        $mail_obj = new System_Mail();
        $mail_obj->send('dogemail@foxmail.com');
    }
    
}
?>
