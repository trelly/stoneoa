<?php
/**
 * 审批
 */
class ApproveController extends Controller{
    
    private $type_obj;
    private $template_obj;
    private $flow_obj;
    private $flowuser_obj;
    private $component_obj;
    private $components_obj;
    
    public function init(){
        $this->type_obj = new Approve_TypeModel();
        $this->template_obj = new Approve_TemplateModel();
        $this->flow_obj = new Approve_FlowModel();
        $this->flowuser_obj = new Approve_FlowuserModel();
        $this->components_obj = new Approve_ComponentsModel();
        $this->component_obj = new Approve_ComponentModel();
    }

    public function IndexAction(){
        $this->redirect('/approve/list');
    }

    /**
     * 待审批列表
     */
    public function listAction(){
        $this->scripts[] = '/public/stone/approve.js';
        $this->content = $this->getView()->render('approve/list.phtml',array());     
    }

    /**
     * 发起审批列表
     */
    public function launchAction(){
        $this->scripts[] = '/public/stone/approve_launch.js';
        $this->content = $this->getView()->render('approve/launch.phtml',array());     
    }
	
	/**
     * 外理审批列表
     */
    public function dealAction(){
        $this->scripts[] = '/public/stone/approve.js';
        $this->content = $this->getView()->render('approve/deal.phtml',array());     
    }


    /**
     * 新建模板
     */
    public function newAction(){
        $this->scripts[] = '/public/stone/approve_new.js';
        $this->content = $this->getView()->render('approve/new.phtml',array()); 
		$this->scripts[] = '/public/js/ueditor/ueditor.config.js';
		$this->scripts[] = '/public/js/ueditor/ueditor.all.js';
		$this->scripts[] = '/public/stone/file_ueditor.js';
    }
	/**
	* 新建审批
     */
    public function createAction(){
        $this->scripts[] = '/public/stone/approve_create.js';
        $types = $this->type_obj->lists();
        foreach($types as $type){
            $templates[$type['id']] = $this->template_obj->getByTypeId($type['id']);
        }
        $this->content = $this->getView()->render('approve/create.phtml',array(
            'lists'=>$types,
            'templates'=>$templates	
	)); 
    }
    /**
     * 审批审核
     */
    public function checkAction(){
        $this->scripts[] = '/public/stone/approve_check.js';
        $this->content = $this->getView()->render('approve/check.phtml',array());    
    }
    
     /**
     * 审批设置
     */   
    public function setAction(){
        $this->scripts[] = '/public/stone/approve_set.js';
        $types = $this->type_obj->lists();
        foreach($types as $type){
            $templates[$type['id']] = $this->template_obj->getByTypeId($type['id']);
        }
        $this->content = $this->getView()->render('approve/set.phtml',array(
            'lists'=>$types,
            'templates'=>$templates
        ));            
    }

    /**
     * 审批设置
     */   
    public function editAction(){
        $this->scripts[] = '/public/js/ueditor/ueditor.config.js';
        $this->scripts[] = '/public/js/ueditor/ueditor.all.js';
        $this->scripts[] = '/public/stone/approve_edit.js';
        $this->content = $this->getView()->render('approve/edit.phtml',array(
        ));            
    }
    
    public function stepAction(){
        $this->scripts[] = '/public/stone/approve_step.js';
        $this->content = $this->getView()->render('approve/step.phtml',array(
        ));         
    }
    /**
     * 添加模版接口
     * @throws Exception
     */
    public function templateaddAction(){
        $this->enableLayout = false;
        $tmpl = json_decode($this->getRequest()->getPost('tmpl'),1);
        $this->save($tmpl);
    }
    
    private function save($tmpl){
        if(isset($tmpl['id']) && $tmpl['id'] != 0){
            $tmplid = $tmpl['id'];
            $this->template_obj->edit($tmplid,
                $tmpl['typeid'], 
                $tmpl['name'],
                $tmpl['content']
            );
        }  else {
           $tmplid = $this->template_obj->add(
                $tmpl['typeid'], 
                $tmpl['name'],
                $tmpl['content']
            );
        }
        if($tmplid){
            $this->addFlows($tmpl['flows'],$tmplid);
            $this->addComponents($tmpl['components'],$tmplid);
            echo json_encode(array('result'=>$tmplid));
        }else{
            throw new Exception('添加失败');
        }        
    }      
    
    private function addFlows($flows,$tmplid){
        if(empty($flows)){
            return false;
        }
        $i = 0;
        foreach($flows as $flow){
            $flowid = $this->flow_obj->add(
                $tmplid, 
                $flow['name'], 
                $flow['desc'],  
                $flow['terminal'],
                ++$i
           );
           $uids = explode(',', $flow['sendid']);
           foreach ($uids  as $userid){
               $this->flowuser_obj->add($flowid, $userid);
           }
        }
        return true;
    }

    private function addComponents($components,$tmplid){
        if(empty($components)){
            return false;
        }
        $this->components_obj->removeByTmplId($tmplid);
        foreach($components as $component){
            $this->component_obj->setTmpl_id($tmplid);
            $this->component_obj->setName($component['name']);
            $this->component_obj->setDefault($component['default']);
            $this->component_obj->setType($component['type']);
            isset($component['options']) && $this->component_obj->setOptions($component['options']);
            isset($component['width']) && $this->component_obj->setWidth($component['width']);
            isset($component['height']) && $this->component_obj->setHeight($component['height']);
            $this->component_obj->setSflowsets(json_encode($component['sflowsets']));
            $this->component_obj->setFlowsets(json_encode($component['flowsets']));
            $this->components_obj->add($this->component_obj);
        }
        return true;
    }
}
