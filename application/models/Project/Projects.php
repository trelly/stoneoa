<?php
/**
 * Description of Project
 *
 * @author terry
 */
class Project_ProjectsModel extends Table{
    
    protected $table = 'project';
    
    public function add(Project_ProjectModel $project){
        
        $ret = $this->insert($project->toArray());
        if($ret){
            $projectid = $this->lastInsertValue;
            return $projectid;
        }else{
            throw new Exception('项目添加失败');
        }
    }

    public function getById($id){
        if(is_array($id)){
            return $this->select(array('id'=>$id))->toArray();
        }else{
            return $this->select(array('id'=>$id))->current();
        }
    }
}
