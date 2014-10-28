<?php
/**
 * Description of MyAdpter
 *
 * @author terry
 */
use Zend\Db\Adapter\Adapter;
class MyAdpter {
    
    private static $instance;
    
    private function __construct() {
        
    }
    
    public static function getInstance(){
        if(self::$instance){
            return self::$instance;
        }
        $config = new Yaf_Config_Ini( APP_PATH . "/configs/db.ini", 'master');
        self::$instance = new Adapter(
            array(
                'host' => $config->host,
                'driver' => $config->driver,
                'database' => $config->database,
                'username' => $config->username,
                'password' => $config->password,
                'driver_options' => array(
                    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES "UTF8"',
                    PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
                    PDO::ATTR_EMULATE_PREPARES => 0,
                )
            )
        );
        return self::$instance;
    }
}
