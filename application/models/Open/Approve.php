<?php
/**
 * 审批相关接口
 *
 * @author terry
 */
class  Open_ApproveModel {
    private $type_obj;
    private $template_obj;
    private $flow_obj;
    private $flowuser_obj;
    private $component_obj;
    private $components_obj;
    private $approve_obj;
    private $user_obj;


    public function __construct(){
        $this->type_obj = new Approve_TypeModel();
        $this->template_obj = new Approve_TemplateModel();
        $this->flow_obj = new Approve_FlowModel();
        $this->flowuser_obj = new Approve_FlowuserModel();
        $this->components_obj = new Approve_ComponentsModel();
        $this->component_obj = new Approve_ComponentModel();
        $this->approve_obj = new Approve_ApproveModel();
        $this->user_obj = new UserModel();
    }
    
    /**
     * 获取审批类型
     * @return type
     */
    public function types(){
        return $this->type_obj->lists();
    }
    
    /**
     * 修改类型名
     * @param int $id
     * @param string $name
     * @return bool
     */
    public function typeRename($id,$name){
        return $this->type_obj->rename($id, $name);
    }
    
    /**
     * 添加类型
     * @param string $name
     * @return int
     */
    public function typeAdd($name){
        return $this->type_obj->add($name);
    }

	 /**
     * 添加类型
     * @param string $name
     * @return int
     */
    public function typeDel($id){
        return $this->type_obj->del($id);
    }
    
    /**
     * 删除步骤
     * @param int $flowid
     * @return type
     */
    public function flowRemove($flowid){
        $ret = $this->flow_obj->remove($flowid);
        if($ret){
            return $this->flowuser_obj->remove($flowid);
        }else{
            return false;
        }
    }

    /**
     * 
     * @param string $tmpl
     * @throws Exception
     */
    public function add($tmpl){
        $tmplid = $this->template_obj->add(
            $tmpl['typeid'], 
            $tmpl['name'],
            $tmpl['content']
        );
        if($tmplid){
            $i = 0;
            $steps = count($tmpl['flows']);
            foreach($tmpl['flows'] as $flow){
                ++$i;
                if ($steps == $i){ $flow['terminal'] = 1; }
                $flowid = $this->flow_obj->add(
                    $tmplid, 
                    $flow['name'], 
                    $flow['desc'],  
                    $flow['terminal'],
                    $i
               );
               $uids = explode(',', $flow['sendid']);
               foreach ($uids  as $userid){
                   $this->flowuser_obj->add($flowid, $userid);
               }
            }
            foreach($tmpl['components'] as $component){
                $this->component_obj->setTmpl_id($tmplid);
                $this->component_obj->setName($component['name']);
                $this->component_obj->setDefault($component['default']);
                $this->component_obj->setType($component['type']);
                $this->component_obj->setOptions($component['options']);
                $this->components_obj->add($this->component_obj);
            }
            return $tmplid;
        }else{
            throw new Exception('添加失败');
        }
    }

    public function get($tmplid){
        $template = $this->template_obj->getById($tmplid);
        $flows = $this->flow_obj->getByTmplId($tmplid);
        $components = $this->components_obj->getByTmplId($tmplid);
        $template['flows'] = $flows;
        $template['components'] = $components;
        return $template;
    }
    
    public function send($tmplid,$name,$components,$sender){
        $this->loginuser = Yaf_Session::getInstance()->get('user');
        $userid = $this->loginuser['id'];
        $steps = $this->flow_obj->countByTmplId($tmplid);
        return $this->approve_obj->add(
            $tmplid, 
            $userid, 
            $name,
            json_encode($components), 
            $sender,
            $steps
       );
    }
    
    public function next($approveid,$components,$sender){
        return $this->approve_obj->next($approveid, json_encode($components),$sender);
    }
    
    public function back($approveid,$components,$sender){
        return $this->approve_obj->back($approveid, json_encode($components),$sender);
    }
    
    public function complete($approveid,$components){
        return $this->approve_obj->complete($approveid, json_encode($components));
    }
    
    public function getUser($tmpid,$sort=2){
        $flows = $this->flow_obj->getByTmplIdAndSort($tmpid,  intval($sort));
        if($flows){
            $user_ids = $this->flowuser_obj->getById($flows['flow_id']);
            foreach ($user_ids as $user_id){
                $ids[] = $user_id['user_id'];
            }
            $user_obj = new UserModel();
            $users = $user_obj->getById($ids);
            //var_dump($users,$ids,$user_ids);
            return $users;
        }else{
            return array();
        }
    }

    public function show($id){
        $approve = $this->approve_obj->getById($id);
        $items = json_decode($approve['components']);
        $components = array();
        if(is_array($items)){
            foreach ($items as $item){
                foreach($item as $key=>$val){
                    $component['id'] = $key;
                    $component['value'] = $val;
                    $components[] = $component;
                }
            } 
        }
        //$status = $status == 1?$approve['status']:2;
        if($approve['status'] <= 1){
            $status = 2;
        }else{
            $status = intval($approve['status']);
        }
        $flows = $this->flow_obj->getByTmplIdAndSort($approve['tmpl_id'],  $status);
        if($flows && $approve['completed'] == 0){
            $user_ids = $this->flowuser_obj->getById($flows['flow_id']);
            foreach ($user_ids as $user_id){
                $ids[] = $user_id['user_id'];
            }
            $user_obj = new UserModel();
            $users = $user_obj->getById($ids);
            //var_dump($users,$ids,$user_ids);
            $approve['users'] = $users;
            $approve['end'] = false;
        }else{
            $approve['end'] = true;
        }
        $approve['hasNext'] = true;
        if($approve['status'] == $approve['steps']) {$approve['hasNext'] = false;}
        $approve['flow'] = $flows;
        $approve['components'] = $components;
        return $approve;
    }
    
    /**
     * 获取当前用户发起的审批列表
     * @return type
     */
    public function getList($completed = 0){
        $this->loginuser = Yaf_Session::getInstance()->get('user');
        $userid = $this->loginuser['id'];
        $approves = $this->approve_obj->getByCid($userid,$completed);
        return $this->getApprove($approves);
    }
    
    private function getApprove($approves){
        if(empty($approves)) return array();
        $items = array();
        foreach($approves as &$approve){
            $sender = $this->user_obj->getById($approve['sender']);
            $approve['sender'] = $sender['name'];
            $user = $this->user_obj->getById($approve['user_id']);
            $approve['username'] = $user['name'];
            $flow = $this->flow_obj->getByTmplIdAndSort($approve['tmpl_id'], $approve['status']);
            $approve['flowname'] = $flow['name'];
        }
        return $approves;
    }

    /**
     * 获取当前用户待处理的审批列表
     * @return type
     */
    public function getHandle(){
        $this->loginuser = Yaf_Session::getInstance()->get('user');
        $userid = $this->loginuser['id'];
        $approves = $this->approve_obj->getBySender($userid);
        return $this->getApprove($approves);
    }    

}
