<?php
/**
 * LayOut插件
 * @package  plugins
 * @author   tianyi <tianyi1@staff.sina.com.cn>
 *
 */
class AuthPlugin extends Yaf_Plugin_Abstract {

    public function routerStartup(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {  
        
    }  
    //路由结束之后触发，此时路由一定正确完成, 否则这个事件不会触发  
    public function routerShutdown(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {  
        $auth = System_Auth::getInstance();
        $controller = $request->getControllerName();
        $action = $request->getActionName();
        $filter = '/'.strtolower($controller).'/'.strtolower($action);
        $filters = array('/system/sign','/open/user','/open/index');
        if(!$auth->islogin() && !in_array($filter, $filters)){
            $response->setRedirect("/system/sign");
        }
    }  
    //分发循环开始之前被触发  
    public function dispatchLoopStartup(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {  
          
    }  
    //分发之前触发    如果在一个请求处理过程中, 发生了forward, 则这个事件会被触发多次  
    public function preDispatch(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {  
         
    }  
    //分发结束之后触发，此时动作已经执行结束, 视图也已经渲染完成. 和preDispatch类似, 此事件也可能触发多次  
    public function postDispatch(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {  
          
    }  
    //分发循环结束之后触发，此时表示所有的业务逻辑都已经运行完成, 但是响应还没有发送  
    public function dispatchLoopShutdown(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {  
          
    }  
    
    public function preResponse(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {  
         
    } 
}
