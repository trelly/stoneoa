<?php
/**
 * 部门管理
 */
class GroupController extends Controller{

    public function init(){
        $this->group = new GroupModel();
    }

    public function IndexAction(){
        $this->redirect('/group/list');
    }

    /**
     * 部门列表
     */
    public function ListAction(){
		$this->scripts[] = '/public/js/jquery.treetable.js';
        $this->scripts[] = '/public/stone/group_list.js';
		$this->stylesheets[] = '/public/css/jquery.treetable.theme.default.css';
		$grouplist = $this->group->lists();
        $this->content = $this->getView()->render('group/list.phtml',Array(
			'grouplist' => $grouplist
		));
    }
    
    /**
     * 添加部门
     */
    public function AddAction(){
        $this->scripts[] = "/public/stone/group_add.js";
		$g = Array();
		$grouplist = $this->group->listByPid(0);
		foreach($grouplist as $group){
			$clist = $this->group->listByPid($group['id']);
			$tmp = Array(
				'group' => $group,
				'children' => $clist,
				'sign_info' => ''
			);
			array_push($g,$tmp);
		}

		$this->content = $this->getView()->render('group/add.phtml',Array(
			'grouplist' => $g	
		));
    }
    
    /**
     * 部门编辑
     */
    public function EditAction(){
        $this->scripts[] = "/public/stone/group_edit.js";
		$g = Array();
		$grouplist = $this->group->listByPid(0);
		foreach($grouplist as $group){
			$clist = $this->group->listByPid($group['id']);
			$tmp = Array(
				'group' => $group,
				'children' => $clist,
				'sign_info' => ''
			);
			array_push($g,$tmp);
		}
		$this->content = $this->getView()->render('group/edit.phtml',Array(
			'grouplist' => $g	
		));
    }
}
