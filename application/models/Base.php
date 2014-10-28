<?php

/*
 * oa系统底层类
 * @author terry
 * @since 2013/10/27
 */
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Sql;

class BaseModel{
    
    protected $table;
    protected $adapter;
    protected $ishash = true;
    protected $primary = 'id';
    
    function __construct() {
        $config = new Yaf_Config_Ini( APP_PATH . "/configs/db.ini", 'master');
        $this->adapter = new Adapter(
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
    }
    
    protected function fetchOne($id){
        $stmt = $this->adapter->createStatement("select * from $this->table where id=?",array($id));
        $result = $stmt->execute();
        $resultSet = new ResultSet();
        $resultSet->initialize($result);
        return $result->current();
    }
    
    protected function count(){
        $stmt = $this->adapter->query("select count(*) as total from $this->table");
        $result = $stmt->execute();
        $resultSet = new ResultSet();
        $resultSet->initialize($result);
        return $result->current();
    }
    
    protected function idEscape($identifier){
        $this->adapter->platform->quoteIdentifier($identifier);
    }
    
    protected function paramEscape($name){
        $this->adapter->driver->formatParameterName($name);
    }
    
    /**
     * 对返回的数据进行hash
     * @param type $arrays
     * @param type $keyname
     * @return type
     */
    protected function hash($arrays,$keyname='id'){
        /*
        $search = key($arrays[0]);
        if(!key_exists($keyname, $search)){
            trigger_error('不存在的键值');
            return false;
        }*/
        $temp = array();
        foreach ($arrays as $array){
            $temp[$array[$keyname]] = $array;
        }
        return $temp;
    }

    public function fetchAll($page = 1,$pagesize =20){
        $offset = ($page-1)*$pagesize;
        $limit = $pagesize;
        //return $offset.$limit;
        $stmt = $this->adapter->createStatement("select * from $this->table limit ?,?",array($offset,$limit));
        $result = $stmt->execute();
        $resultSet = new ResultSet();
        return $resultSet->initialize($result)->toArray();
        //return $result;;
    }
    
    
}
?>
