<?php
class ProfileController extends Controller{

    public function init(){
        $this->user = new UserModel();
    }

    public function IndexAction(){
        $this->scripts[] = '/public/stone/user_add.js';
        $this->content = $this->getView()->render('set/add.phtml');  
    }

    public function setAction(){
		$this->scripts[] = '/public/js/uploadify/uploadify.js';
        $this->scripts[] = '/public/stone/profile_config.js';
		$user_model = new Open_UserModel();
		$user = $user_model->status();
		$group = $user_model->getGByUid();//获取groupid
		$grouplist_model = new GroupModel();
		$grouplist = $grouplist_model->getById($group['group_id']);//获取group信息
		$user['department'] = $grouplist['name'];//设置部门名称
        $this->content = $this->getView()->render('profile/set.phtml',array(
			'user' => $user
		));    
    }
    
    public function passwordAction(){
        $this->scripts[] = '/public/stone/profile_password.js';
        $this->content = $this->getView()->render('profile/password.phtml');    
    }

	public function photoAction(){
        $this->enableLayout = false;
        $user = new Open_UserModel();
        $files = $this->getRequest()->getFiles('file');
        $ret =  $user->photo($files);
        echo json_encode(array('result'=>$ret));
    }

	public function photoViewAction(){
        $path = $this->getRequest()->getQuery('path');
        $this->enableLayout = false;
		$dist_file = '/data/netdisk/'.$path;
        header('Content-type: application/octet-stream');
        echo file_get_contents($dist_file);
    }
}
