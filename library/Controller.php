<?php

/* 
 * 重新定义 yaf Controller.php
 */
class Controller extends Yaf_Controller_Abstract{
    protected $title = 'OA管理系统';
    protected $enableLayout = true; //是否启用整体布局
    protected $header; //顶导
    protected $menu; //菜单
    protected $content; //正文部分
    protected $panel; //右边栏
    protected $static; //公共静态资源
    protected $scripts = array(); //私有页面加载的js
    protected $stylesheets = array();  //私有页面加载的css
    protected $path;   //面包屑
    protected $config;
    protected $disenableActions = array(
        'login',
        'sign',
        'logout'
    );

    public function __destruct() {
        
        if(!$this->enableLayout){
            return;
        }
        
        $user_obj = new Open_UserModel();
        $profile = $user_obj->status();
        $usergroup = $user_obj->getGByUid();
        $group_obj = new GroupModel();
        $group = $group_obj->getById($usergroup['group_id']);
        $controllerName = $this->getRequest()->getControllerName();
        $actionName = $this->getRequest()->getActionName();
        $this->config = new Yaf_Config_Ini( APP_PATH . "/configs/ajax.ini");
        if(is_object($this->config->get($controllerName)) && is_a($this->config->get($controllerName ), $actionName)){
            return FALSE;
        }
        empty($this->content) && $this->content = $this->getView()->render('sample.phtml');
        //顶导
        empty($this->header) && $this->header = $this->getView()->render('header.phtml',  array(
            'profile'=>  $profile,
            'department'=>$group
        ));
        
        //菜单
        $mail = new Open_MailModel();
        $menu_mail = $mail->listAccount();
        empty($this->menu) && $this->menu = $this->getView()->render('menu.phtml',  
            array(
                'controller'=>  strtolower($this->getRequest()->getControllerName()),
                'menu_mail'=> $menu_mail   
            )
        );
        
        //右边栏
        $this->panel = $this->getView()->render('panel.phtml',  array(
            'action'=>  $actionName
        ));
        
        //footer
        $this->statics = new Yaf_Config_Ini( APP_PATH . "/configs/static.ini");
        $this->footer = $this->getView()->render('footer.phtml',  array(
            'scripts'=> $this->statics->get('scripts'),
            'local_scripts'=>$this->scripts
        ));
        
        $this->getView()->display(
            'layout.phtml',array(
            'title'=>$this->title,
            'stylesheets'=>$this->statics->get('stylesheets'),
            'local_stylesheets'=>$this->stylesheets,
            'header'=>$this->header,
            'menu'=>$this->menu,
            'panel'=>$this->panel,
            'footer'=>$this->footer,
            'content'=>$this->content
        ));
    }
}
