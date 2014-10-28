<?php
/**
 * 工程里程碑
 *
 * @author tianyi
 */
class Project_MilestonesModel extends Table {
    protected $table = 'project_milestone';
    
    public function add(Project_MilestoneModel $milestone){
        $this->insert($milestone->toArray());
        return $this->lastInsertValue;
    }
    
    public function get(Project_MilestoneModel $milestone){
        return $this->select($milestone->toArray())->toArray();
    }
}
