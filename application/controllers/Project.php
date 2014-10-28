<?php
/**
 * 部门管理
 */
class ProjectController extends Controller{

    public function init(){
        
    }
	
	/**
     * 新建模板
     */
    public function IndexAction(){
		$this->content = $this->getView()->render('project/index.phtml',array()); 
    }
	
	/**
     * 新建项目
     */
	public function newAction(){
		$this->scripts[] = '/public/stone/project_new.js';
		$this->content = $this->getView()->render('project/new.phtml',array()); 
    }

	/**
     * 项目详情
     */
	public function detailAction(){
		$this->scripts[] = '/public/stone/project_detail.js';
		$this->scripts[] = '/public/js/uploadify/uploadify.js';
		$this->stylesheets[] = '/public/css/timeline.css';
		$this->scripts[] = '/public/js/timeline/timeline.js';
		$this->content = $this->getView()->render('project/detail.phtml',array()); 
    }

	/**
     * 任务详情
     */
	public function taskAction(){
		$this->scripts[] = '/public/stone/project_task_detail.js';
		$this->scripts[] = '/public/js/uploadify/uploadify.js';
		$id = $this->getRequest()->getParam('id');
		$task_model = new Open_ProjectModel();
		$task = $task_model->task($id)[0];
		$user_model = new UserModel();
		$user = $user_model->getById($task['manager_id']);
		$task['manager'] = $user["name"];
		$this->content = $this->getView()->render('project/task.phtml',array(
			'task'=>$task
		)); 
    }

	/**
     * 里程碑详情
     */
	public function milestoneAction(){
		$this->scripts[] = '/public/stone/project_milestone_detail.js';
		$id = $this->getRequest()->getParam('id');
		$task_model = new Open_ProjectModel();
		$milestones = $task_model->getMilestoneById($id);
		$tasklist = $task_model->getTaskByMileStone($id);
		//var_dump($tasklist);
		$this->content = $this->getView()->render('project/milestone.phtml',array(
			'milestone'=>$milestones[0],
			'tasklist'=>$tasklist
		)); 
    }

	/**
     * 我的项目
     */
	public function listAction(){
		$this->scripts[] = '/public/stone/project_list.js';
		$this->content = $this->getView()->render('project/list.phtml',array()); 
    }

	/**
     * 全部项目
     */
	public function allAction(){
		$this->scripts[] = '/public/stone/project_all.js';
		$this->content = $this->getView()->render('project/all.phtml',array()); 
    }
    
    public function uploadAction(){
        $this->enableLayout = false;
        $project = new Open_ProjectModel();
        $files = $this->getRequest()->getFiles('file');
        $project_id = $this->getRequest()->getPost('projectid');
        $task_id = $this->getRequest()->getPost('taskid');
        $ret =  $project->upload($files, $project_id, $task_id);
        echo json_encode(array('result'=>$ret));
    }
    
    public function downloadAction(){
        $id = $this->getRequest()->getParam('id');
        $this->enableLayout = false;
        $documents = new Project_DocumentsModel();
        $document = $documents->getById($id);
        header('Content-type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.$document['name'].'"');
        echo file_get_contents('/data/netdisk/project/'.$document['path']);
    }
    
    public function list_newAction(){
        $this->content = $this->getView()->render('project/list_new.phtml',array()); 
    }
    
    public function detail_newAction(){
        $this->content = $this->getView()->render('project/detail_new.phtml',array()); 
    }    
}
