<?php
/**
 * 系统用户类
 * @author terry
 * @since 1.0
 */
class UserModel extends Table{
    
    protected $table = 'user';
    
    
    public function login($email,$password){
        $auth = System_Auth::getInstance();
        $ret = $auth->login($email,$password);
        return $ret;
    }

    /**
     * 通过邮箱账号获取用户信息
     * @param string $email
     * @return array
     */
    public function getByEmail($email){
        return $this->select(array('email'=>$email))->current();
    }
    
    public function suggest($keyword){
        $where = new Zend\Db\Sql\Where();
        $predicate = $where->like("name", "%$keyword%");
        $select = new \Zend\Db\Sql\Select();
        $select->from($this->table)->where($predicate);
        return $this->selectWith($select)->toArray();
    }

    
    public function getByUsername($username){
        return $this->select(array('username'=>$username))->current();
    }
    
    public function del($uid){
        return $this->delete(array('id'=>$uid));
    }

    /**
     * 通过id获取用户信息
     * @param type $id
     * @return type
     */
    public function getById($id){
        if(is_array($id)){
            return $this->select(array('id'=>$id))->toArray();
        }
        return $this->select(array('id'=>$id))->current();
    }

	public function getGByUid($uid){
        $group = new UserGroupModel();
        return $group->getByUid($uid);
    }

	 /**
     * 通过id获取用户信息
     * @param type $id
     * @return type
     */
    public function getEditById($id){
		$user = $this->getById($id);
        $user_group_obj = new UserGroupModel();
		$user_group = $user_group_obj->getByUid($id);
        $user['group'] = $user_group['group_id'];
        return $user;
    }
    
    public function insert($set) {
        if(isset($set) && is_array($set)){
            $set['password'] = md5('11111111');
            $set['status'] = 1;
        }  else {
            return false;
        }
        return parent::insert($set);
    }


    /**
     * 修改密码
     * @param type $oldpasswords
     * @param type $password
     * @return type
     */
    public function updatePwd($oldpasswords,$password){
        $user = Yaf_Session::getInstance()->get('user');
        $id = $user['id'];
        return $this->update(array('password'=>  md5($password)), array('id'=>$id));      
    }

    /**
     * 获取用户登录信息
     * @return type
     */
    public function getInfo(){
        $user = Yaf_Session::getInstance()->get('user');
        $myuser = $this->select(array('id'=>$user['id']))->current();
        return array(
            'username'=>$myuser['username'],
            'opcode'=>$myuser['opcode']
        );  
    }
    
    
    public function insertInfo($set,$group){
        $userid = $this->insert($set);
        if($userid){
            $group['user_id'] = $this->getLastInsertValue();
        }  else {
            return false;
        }
        $user_group = new UserGroupModel();
        return $user_group->insert($group);
    }

    public function updateInfo($set,$where,$group){
        $this->update($set,$where);
        $user_group = new UserGroupModel();
        if($user_group->getByUid($where['id'])){
            return $user_group->update($group,array('user_id'=>$where['id']));
        }
        else {
            $group['user_id'] = $where['id'];
            return $user_group->insert($group);
        }
    }

    /**
     * 获取用户列表
     * @param int $start
     * @param int $limit
     * @return type
     */
    public function lists($start,$limit){ 
        $users = $this->select()->toArray();
        $group_obj = new GroupModel();
        $user_group_obj = new UserGroupModel();
        
        foreach($users as &$user){
            $user_group = $user_group_obj->getByUid($user['id']);
            $group = $group_obj->getById($user_group['group_id']);
            $user['group'] = $group['name'];
        }
        return $this->hash($users); 
    }

    /**
     * 获取用户总数
     * @return type
     */
    public function total(){
        return $this->count();
    }
    
}
