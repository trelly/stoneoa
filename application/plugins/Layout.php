<?php
/**
 * LayOut插件
 * @package  plugins
 * @author   tianyi <tianyi1@staff.sina.com.cn>
 *
 */
class LayoutPlugin extends Yaf_Plugin_Abstract {

    public function __construct($layoutFile, $layoutDir=null){

    }

    public function  __set($name, $value) {

    }

    public function dispatchLoopShutdown ( Yaf_Request_Abstract $request , Yaf_Response_Abstract $response ){
        echo $request->getControllerName();
    }

    public function dispatchLoopStartup ( Yaf_Request_Abstract $request , Yaf_Response_Abstract $response ){

    }

    public function postDispatch ( Yaf_Request_Abstract $request , Yaf_Response_Abstract $response ){
        /* wrap it in the layout */
        $layout = new Yaf_View_Simple($this->_layoutDir);
        $layout->content = $body;
        $layout->assign('layout', $this->_layoutVars);

        /* set the response to use the wrapped version of the content */
        $response->setBody($layout->render($this->_layoutFile));
    }

    public function preDispatch ( Yaf_Request_Abstract $request , Yaf_Response_Abstract $response ){
 
    }

    public function preResponse ( Yaf_Request_Abstract $request , Yaf_Response_Abstract $response ){
        
    }

    public function routerShutdown ( Yaf_Request_Abstract $request , Yaf_Response_Abstract $response ){

    }

    public function routerStartup ( Yaf_Request_Abstract $request , Yaf_Response_Abstract $response ){

    }
}
