<?php

/**
 * 部门管理
 */
class GroupModel extends Table{
    
    protected $table = 'group';
    
    /**
     * 获取部门列表
     * @return type
     */
    public function lists(){
        $list = Array();
		$groups = $this->listByPid(0);
		foreach ($groups as $group){
			array_push($list,$group);
			$children = $this->listByPid($group["id"]);
			foreach($children as $g){
				array_push($list,$g);
				$children1 = $this->listByPid($group["id"].'-'.$g["id"]);
				foreach($children1 as $gt){
					array_push($list,$gt);
				}
			}
		}
		return $list;
    }

	/**
     * 获取部门列表
     * @return type
     */
    public function listByPid($pid){
        $select = new \Zend\Db\Sql\Select();
        $where = "pid='$pid'";
        $select->from($this->table)->where($where)->order(array(
            
        ));
        return $this->selectWith($select)->toArray();
    }

	/**
     * 获取部门前两层列表
     * @return type
     */
    public function listByPid2(){
        $g = Array();
		$grouplist = $this->listByPid(0);
		foreach($grouplist as $group){
			$clist = $this->listByPid($group['id']);
			$tmp = Array(
				'group' => $group,
				'children' => $clist
			);
			array_push($g,$tmp);
		}
		return $g;
    }
    

    public function getById($did){
        if(is_array($did)){
            return $this->select(array('id'=>$did))->toArray();
        }  else {
            return $this->select(array('id'=>$did))->current();
        }
    }

    public function del($did){
        $stmt = $this->adapter->createStatement("delete from $this->table where id=?",array($did));
		$this->deepDel($did);
        $ret = $this->delete(array('id'=>$did));
        if($ret){
            return true;
        }else{
            return false;
        }
    }

	function deepDel($did){
		$t = $this->getById($did);
		$pid = $t['pid'] == 0?$did:$t['pid'].'-'.$did;
		$list = $this->listByPid($pid);
		foreach($list as $group){
			$pid = $group['pid'];
			$id = $group['id'];
			$this->del($id);
		}
	}

    public function add($name,$status,$desc){
        $sql = sprintf("insert into %s (`name`,`description`,`status`,`create_time`) values ('%s','%s',%d,'%s')",
            $this->table,
            mysql_escape_string($name),
            mysql_escape_string($desc),
            $status,
            date('Y-M-D h:i:s',  time())
        );
        $stmt = $this->adapter->createStatement($sql);
        return $stmt->execute();
    }    
}
?>
