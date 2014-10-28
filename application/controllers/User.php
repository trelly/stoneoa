<?php
class UserController extends Controller{
    
    const ONEMONTH = 560000;

    public function init(){
        $this->user = new UserModel();
    }

    public function IndexAction(){
        $this->redirect('/user/list');
    }
   
    public function listAction(){
        $this->scripts[] = '/public/stone/user_list.js';
        $this->content = $this->getView()->render('user/list.phtml',array(
            
        ));
    }

    public function checkLoginAction(){
        $this->checkLoginAction();
    }
    

    public function SignAction(){
        if($this->getRequest()->isPost()){
            $email = $this->getRequest()->getPost('login_username');
            $password = $this->getRequest()->getPost('login_password');
            if($this->getRequest()->getPost('remerber_me')){
                /*$userinfo = $this->user->sign($email,$password);
                if($this->user->checkLogin()){
                    $this->redirect('/user/list');
                }else{
                    echo '用户名或密码错误';
                }*/
            }else{
                $userinfo = $this->user->sign($email,$password);
                if($this->user->checkLogin()){
                    $this->redirect('/user/list');
                }else{
                    echo '用户名或密码错误';
                }
            }
        }
    }
    
    public function logoutAction(){
        if($this->user->logout()){
            $this->redirect('/user/sign');
        }
    }

    public function AddAction(){
		$this->scripts[] = '/public/js/ztree/js/jquery.ztree.core-3.5.min.js';
		$this->scripts[] = '/public/js/ztree/js/jquery.ztree.excheck-3.5.min.js';
		$this->stylesheets[] = '/public/js/ztree/css/zTreeStyle/zTreeStyle.css';
        $this->scripts[] = '/public/stone/user_add.js';
        $this->content = $this->getView()->render('user/add.phtml');    
    }
    
    public function EditAction(){
		$this->scripts[] = '/public/js/ztree/js/jquery.ztree.core-3.5.min.js';
		$this->scripts[] = '/public/js/ztree/js/jquery.ztree.excheck-3.5.min.js';
		$this->stylesheets[] = '/public/js/ztree/css/zTreeStyle/zTreeStyle.css';
        $this->scripts[] = '/public/stone/user_edit.js';
		//$userlist = $this->user->getById();
        $this->content = $this->getView()->render('user/edit.phtml');
    }

	public function infoAction(){
		$this->scripts[] = '/public/js/uploadify/uploadify.js';
        $this->scripts[] = '/public/stone/profile_config.js';
		$uid = $this->getRequest()->getQuery('id');
		$user_model = new UserModel();
		$user = $user_model->getById($uid);
		$group = $user_model->getGByUid($uid);//获取groupid
		$grouplist_model = new GroupModel();
		$grouplist = $grouplist_model->getById($group['group_id']);//获取group信息
		$user['department'] = $grouplist['name'];//设置部门名称
        $this->content = $this->getView()->render('user/info.phtml',array(
			'user' => $user
		));    
    }

}
