<?php

class Layout{

    private $_layoutDir;
    private $_layoutFile;
    private $_layoutVars =array();

    public function __construct($template, $templatePath = null){
        $this->_layoutFile = $template;
    }

    public function  __set($name, $value) {
        $this->_layoutVars[$name] = $value;
    }
    
    /**
     * 设置布局文件路径
     * @param type $path
     */
    public function setTemplatePath($path = ''){
        $this->_layoutDir = $path;
    }
    
    /**
     * 设置布局文件
     * @param type $file
     */
    public function setView($file = ''){
        $this->_layoutFile = $file;
    }

    public function getView(){
        $layout = new Yaf_View_Simple($this->_layoutDir);
        $layout->content = $body;
        $layout->assign('layout', $this->_layoutVars);
        $layout->render($this->_layoutFile);
    }
    
    /**
     * 设置模版变量
     * @param type $var
     */
    public function assign($var){
        is_array($var) && array_merge($this->_layoutVars, $var);
    }

        public function getTemplate(){
        
    }
}

