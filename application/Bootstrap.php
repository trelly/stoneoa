<?php
class Bootstrap extends Yaf_Bootstrap_Abstract
{
    
    
    public function _initPlugins(Yaf_Dispatcher $dispatcher){
        $auth = new AuthPlugin();  
        $dispatcher->registerPlugin($auth); 
    }

    public function _initRouter(Yaf_Dispatcher $dispatcher){
        $config = new Yaf_Config_Ini( APP_PATH . "/configs/router.ini", 'common');
        $router = Yaf_Dispatcher::getInstance()->getRouter();
        $router->addConfig($config->routes);
    }    
    
    /**
     * 设置默认路径
     * @param Yaf_Dispatcher $dispatcher
     */
    public function _initDefaultName(Yaf_Dispatcher $dispatcher) {
        $dispatcher->setDefaultModule("Index")->setDefaultController("System")->setDefaultAction("Index");
        Yaf_Dispatcher::getInstance()->autoRender(false);
    }
    
    /**
     * 初始化加载本地类
     * @param Yaf_Dispatcher $dispatcher
     */
    public function _initLocal(Yaf_Dispatcher $dispatcher){
        $loader = Yaf_Loader::getInstance();
        $loader->registerLocalNamespace(array("System"));
    }
}
?>
