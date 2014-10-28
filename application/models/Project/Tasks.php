<?php
/**
 * 项目任务
 *
 * @author terry
 */
class Project_TasksModel extends Table{
    
    protected $table = 'project_task';


    public function add(Project_TaskModel $task){
        $this->insert($task->toArray());
        return $this->lastInsertValue;
    }
    
    public function edit(Project_TaskModel $task){
        return $this->update($task->toArray(),array('id'=>$task->getId()));
    }
    
    public function save(Project_TaskModel $task){
        if($task->id){
            return $this->edit($task);
        }else{
            return $this->add($task);
        }
    }

    public function get(Project_TaskModel $task){
        return $this->select($task->toArray())->toArray();
    }
    
    
}
