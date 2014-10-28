<?php
/**
 * 审批流程
 *
 * @author terry
 */
class Approve_ComponentsModel extends Table{

    protected $table = 'approve_components';
    
    public function add(Approve_ComponentModel $component){
        $this->insert($component->toArray());
        return $this->lastInsertValue;
    }
    
    public function edit($compid,Approve_ComponentModel $component){
        $this->update(
            $component->toArray(),
            array('id'=>$compid)
        );
    }

    public function getByTmplId($tmpl_id){
        $components = $this->select(array('tmpl_id'=>$tmpl_id))->toArray();
        if($components){
            foreach($components as &$item){
                $item['sflowsets'] = json_decode($item['sflowsets']);
                $item['flowsets'] = json_decode($item['flowsets']);
            }
        }
        return $components;
    }
    
    public function removeByTmplId($tmplid){
        return $this->delete(array(
            'tmpl_id'=>$tmplid
        ));
    }
}