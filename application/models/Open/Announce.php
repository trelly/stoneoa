<?php
/**
 * 通告管理
 *
 * @author terry
 */
class Open_AnnounceModel {
    
    private $user;
    private $annouce_obj;
    private $annouces_obj;
    private $receiver;
    private $receivers_obj;
	private $group_obj;
	private $user_obj;

    public function __construct() {
        $this->user = Yaf_Session::getInstance()->get('user');
        $this->annouces_obj = new Announce_AnnoucesModel();
        $this->annouce_obj = new Announce_AnnouceModel();
        $this->receiver = new Announce_ReceiverModel();
        $this->receivers_obj = new Announce_ReceiversModel();
		$this->group_obj = new GroupModel();
		$this->user_obj = new UserModel();
    }

    public function publish($title,$content,$department,$type){
        $annouce = new Announce_AnnouceModel();
        $annouce->setContent($content);
        $annouce->setTitle($title);
        $annouce->setCreate_by($this->user['id']);
        $annouce->setCreate_time(date('Y-m-d H:i:s'));
        $annouce->setUpdate_by(0);
        $annouce->setUpdate_by(time());
        $annouce->setAnn_type($type);
        $annouceid = $this->annouces_obj->add($annouce);
        if($annouceid && !empty($department)){
            foreach ($department as $item){
                $this->receiver->setAnnounce_id($annouceid);
                $this->receiver->setReceiver_id($item);
                $this->receivers_obj->add($this->receiver);
            }
            return $annouceid;
        }elseif(empty ($department)) {
                $this->receiver->setAnnounce_id($annouceid);
                $this->receiver->setReceiver_id(0);
                $this->receivers_obj->add($this->receiver); 
                return $annouceid;
        }else{
            throw new Exception('发布失败');
        }
    }

	public function edit($title,$content,$department,$type,$id){
		$annouce_old = $this->annouces_obj->getById($id);
		$annouce = new Announce_AnnouceModel();
        $annouce->setContent($content);
        $annouce->setTitle($title);
        $annouce->setCreate_by($annouce_old["create_by"]);		
        $annouce->setUpdate_by(0);
        $annouce->setUpdate_by(time());
        $annouce->setAnn_type($type);
        $annouce = $annouce->toArray();
        $annouceid = $this->annouces_obj->update($annouce,Array('id'=>$id));

		$this->receivers_obj->del($id);
        if($id && !empty($department)){
            foreach ($department as $item){
                $this->receiver->setAnnounce_id($id);
                $this->receiver->setReceiver_id($item);
                $this->receivers_obj->add($this->receiver);
            }
            return $id;
        }elseif(empty ($department)) {
                $this->receiver->setAnnounce_id($id);
                $this->receiver->setReceiver_id(0);
                $this->receivers_obj->add($this->receiver); 
                return $id;
        }else{
            throw new Exception('发布失败');
        }
	return $id;
    }

	/**
     * 获取部门列表
     * @return type
     */
	public function fetchByPid($pid){
		$groupArr = Array();
		$tmp = $this->group_obj->listByPid($pid);
		$groupArr = array_merge($groupArr,$tmp);
		foreach ($tmp as $g){
			$npid = $pid == 0?$g['id']:$pid.'-'.$g['id'];
			$groupDeep2 = $this->group_obj->listByPid($npid);
			$groupArr = array_merge($groupArr,$groupDeep2);
			foreach ($groupDeep2 as $gd3){
				$groupDeep3 = $this->group_obj->listByPid($g['id'].'-'.$gd3['id']);
				$groupArr = array_merge($groupArr,$groupDeep3);
			}
		}
		return $groupArr;

	}

	/**
     * 获取部门列表
     * @return type
     */
	public function fetchByCid($group){
		$groupArr = Array();
		array_push($groupArr,$group['id']);
		if($group['pid']!="0"){
			$pid = current(preg_split("/\-/",$group['pid']));
			array_push($groupArr,$pid);
		}

		return $groupArr;

	}
    
    public function fetch(){
        $usergroup = new UserGroupModel();
        $department = $usergroup->getByUid($this->user['id']);
        $receiver_id = $this->fetchByCid($this->group_obj->getById($department['group_id']));

		array_push($receiver_id,0);
        
		$announces = $this->receivers_obj->getById($receiver_id);
        
        foreach ($announces as $item){
            $announceids[] = $item['announce_id'];
        }
        $annlist = $this->annouces_obj->getById($announceids);
		foreach($annlist as &$ann){
			$u = $this->user_obj->getById($ann["create_by"]);
			$ann["uname"] = $u["name"];
		}
		return $annlist;
    }

	/**
     * 删除公告
     * @return type
     */
	public function del($did){
		$result = $this->annouces_obj->del($did);
		$result = $this->receivers_obj->del($did);
		return $result;
	}
    
}
