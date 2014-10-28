<?php
/**
 * Rest接口
 */
class ApiController extends Yaf_Controller_Abstract
{
    private $server;
    private $class;
    private $method;
    private $request;


    public function init()
    {
        Yaf_Dispatcher::getInstance ()->disableView ();
        $this->server = new Zend\Json\Server\Server();
    }
    
    public function jsonAction(){
        $class = $this->getRequest()->getParam('class');
        $class = ucwords($class).'Model';
        
       
        $this->server->setClass($class);
        if ('GET' == $_SERVER['REQUEST_METHOD']) {
            // Indicate the URL endpoint, and the JSON-RPC version used:
            $this->server->setTarget('/json-rpc.php')
                   ->setEnvelope(Zend\Json\Server\Smd::ENV_JSONRPC_2);
            $smdt = $this->server->getServiceMap();
            // Return the SMD to the client
            header('Content-Type: application/json');
            echo $smdt;
            return;
        }
        $this->server->handle();
    }
    
}
