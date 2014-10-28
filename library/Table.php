<?php
/**
 * db Table类
 *
 * @author terry
 */
use Zend\Db\Adapter\Adapter;
use Zend\Db\ResultSet\ResultSet;
class Table extends Zend\Db\TableGateway\TableGateway{
    //put your code here
    protected $table;
    protected $adapter;
    protected $loginuser;
    protected $select;
    protected $field;

    public function __construct() {
        $this->adapter = MyAdpter::getInstance();
        $this->loginuser = Yaf_Session::getInstance()->get('user');
        $this->select = new Zend\Db\Sql\Select();
        parent::__construct($this->table, $this->adapter);
    }
    
    protected function fetchAll($page = 1,$pagesize =20){
        $offset = ($page-1)*$pagesize;
        $limit = $pagesize;
        $stmt = $this->adapter->createStatement("select * from $this->table limit ?,?",array($offset,$limit));
        $result = $stmt->execute();
        $resultSet = new ResultSet();
        return $resultSet->initialize($result)->toArray();
    }
    
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
    
    public function toArray($flag = false){
        $data = (array)$this;
        foreach($data as $key=>$val){
            if(is_null($val)){
                unset($data[$key]);
            }
            if($flag && !in_array($key, $this->field)){
                unset($data[$key]);
            }
        }
        return $data;
    }
    
}
