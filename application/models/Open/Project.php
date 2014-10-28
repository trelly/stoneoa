<?php
/**
 * 项目接口类
 *
 * @author terry
 */
class Open_ProjectModel {
    
    private $project_obj;
    private $projects_obj;
    private $participant;
    private $participants;
    private $task;
    private $tasks;
    private $user;

    public function __construct() {
        $this->user = Yaf_Session::getInstance()->get('user');
        $this->project_obj = new Project_ProjectModel();
        $this->projects_obj = new Project_ProjectsModel();
        $this->participant = new Project_ParticipantModel();
        $this->participants = new Project_ParticipantsModel();
        $this->task = new Project_TaskModel();
        $this->tasks = new Project_TasksModel();
    }

    public function add($title,$participants){
        $this->project_obj->setName($title);
        $this->project_obj->setStart_time(date('Y-m-d H:i:s'));
        $this->project_obj->setCreate_time(date('Y-m-d H:i:s'));
        $this->project_obj->setUpdate_time(date('Y-m-d H:i:s'));
        $this->project_obj->setCreate_by($this->user['id']);
        $projectid = $this->projects_obj->add($this->project_obj);        
        if($participants){
            array_push($participants, $this->user['id']);
            $participants = array_unique($participants);
            $push = new Push_MessageModel(); 
            $push->title = '项目创建成功';
            $push->url = 'http://www.stone.com/project/detail#'.$projectid;
            $push->type = 2;
                       
            foreach ($participants as $item){
                $push->touser = $item;
                $push->save();
                $item == $this->user['id'] && $this->participant->setIsowner(1);
                $this->participant->setParticipant_id($item);
                $this->participant->setProject_id($projectid);
                $this->participants->add($this->participant);
            }
        }
        return $projectid;
    }
    
    public function fetch(){
        $projects = $this->participants->getByParticipantId(array($this->user['id']));
        $projectids = array();
        foreach($projects as $project){
            $projectids[] = $project['project_id']; 
        }
        $infos = $this->projects_obj->getById($projectids);
        $user_obj = new UserModel();
        foreach($infos as &$item){
            $user = $user_obj->getById($item['create_by']);
            $item['username'] = $user['name'];
        }
        return $infos;
    }
    
    public function fetchAll($page=1,$pagesize=20){
        $infos = $this->projects_obj->fetchAll($page,$pagesize);
        foreach($infos as &$item){
            $user = $user_obj->getById($item['create_by']);
            $item['username'] = $user['name'];
        }
        return $infos;
    }    
    
    public function getTask($projectid,$isself = false){
        if($isself){
            $this->task->setManager_id($this->user['id']);           
        }
        $this->task->setProject_id($projectid);
        $tasks = $this->tasks->get($this->task);
        $user = new UserModel();
        foreach ($tasks as &$task){
            $userinfo = $user->getById($task['manager_id']);
            $task['manager'] = $userinfo['name'];
        }
        return $tasks;
    }
    
    public function getTaskByMileStone($milestoneid){
        $this->task->setMilestone($milestoneid);
        $tasks = $this->tasks->get($this->task);
        return $tasks;        
    }

    public function saveTask($task){
        isset($task['id']) && $this->task->setId($task['id']);
        $managerid = is_numeric($task['manager'])?$task['manager']:  $this->user['id'];
        $this->task->setEnd_date($task['end_date']);
        $this->task->setManager_id($managerid);
        $this->task->setCreate_by($this->user['id']);
        $this->task->setStart_date($task['start_date']);
        $this->task->setDescription($task['description']);
        $this->task->setProgress($task['progress']);
        $this->task->setMilestone($task['milestone']);
        $this->task->setTitle($task['title']);
        $this->task->setProject_id($task['projectid']);
        $this->task->setCreate_time(date('Y-m-d H:i:s'));
        return $this->tasks->save($this->task);
    }
    
    public function task($id){
        $this->task->setId($id);
        return $this->tasks->get($this->task);
    }

    public function getMember($projectid)
    {
        $members = $this->participants->getByProjectId($projectid);
        //var_dump($members);
        $user_obj = new UserModel();
        //$userids = array();
        $users = array();
        foreach($members as &$member){
            //$userids[] = $member['participant_id'];
             $user = $user_obj->getById($member['participant_id']);
             
            if($member['isowner']){
                $users[] = array(
                    'uid'=>$user['id'],
                    'name'=>$user['name'],
                    'role'=>'负责人',
                    'department'=>'IT'
                );
            }else{
                $users[] = array(
                    'uid'=>$user['id'],
                    'name'=>$user['name'],
                    'role'=>'成员',
                    'department'=>'IT'
                );                
            }
        }
        return $users;
    }
    
    public function addMember($projectid,$member){
        $this->participant->setProject_id($projectid);
        $this->participant->setParticipant_id($member);
        return $this->participants->add($this->participant);
    }

    public function saveMilestone($milestone){
        $milestone_obj = new Project_MilestoneModel();
        $milestones = new Project_MilestonesModel();
        $milestone_obj->setName($milestone['name']);
        $milestone_obj->setProject_id($milestone['projectid']);
        $milestone_obj->setTime_point($milestone['timepoint']);
        return $milestones->add($milestone_obj);
    }
    
    public function getMilestone($projectid){
        $milestone_obj = new Project_MilestoneModel();
        $milestones = new Project_MilestonesModel();
        $milestone_obj->setProject_id($projectid);
        return $milestones->get($milestone_obj);
    }
    
    public function getMilestoneById($id){
        $milestone_obj = new Project_MilestoneModel();
        $milestones = new Project_MilestonesModel();
        $milestone_obj->setId($id);
        return $milestones->get($milestone_obj);
    }
    
    public function getDocument($projectid,$taskid = 0){
        $document = new Project_DocumentModel();
        $documents = new Project_DocumentsModel();
        
        $document->setProject_id($projectid);
        $document->setTask_id($taskid);
        
        return $documents->get($document);
    }
    
    public function upload($files,$project_id,$task_id){
        if(empty($files)){
            return false;
        }
        $filename = time();
        $dist_file = '/data/netdisk/project/'.$filename;
        switch($files['error']){
          case 1:
              throw new Exception("上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值");
          case 2:
              throw new Exception("上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值");
          case 3:
              throw new Exception("文件只有部分被上传");
          case 4:
              throw new Exception("没有文件被上传");
          case 6:
              throw new Exception("找不到临时文件夹");
          case 7:
              throw new Exception("文件写入失败");
        }
        $ret = move_uploaded_file($files['tmp_name'], $dist_file);
        if($ret){
            $document = new Project_DocumentModel();
            $documents = new Project_DocumentsModel();
            $document->setPath($filename);
            $document->setName($files['name']);
            $document->setProject_id($project_id);
            $document->setTask_id($task_id);
            $document->setCreate_time(date('Y-m-d H:i:s',time()));
            $documentid = $documents->add($document);
            return $documents->getById($documentid);
        }  else {
            return false;
        }        
    }
    
}
