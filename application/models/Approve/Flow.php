<?php
/**
 * 审批流程
 *
 * @author terry
 */
class Approve_FlowModel extends Table{
    //put your code here
    protected $table = 'approve_flow';
    
    public function add($tmplid,$name,$desc,$terminal,$sort){
        $this->insert(
            array(
                'tmpl_id'=>$tmplid,
                'name'=>$name,
                'desc'=>$desc,
                'terminal'=>$terminal,
                'sort'=>$sort
            )
        );
        return $this->lastInsertValue;
    }
    
    public function edit($flowid,$name,$desc,$terminal,$sort){
        return $this->insert(
            array(
                'flow_id'=>$flowid,
                'name'=>$name,
                'desc'=>$desc,
                'terminal'=>$terminal,
                'sort'=>$sort
            )
        );
    }
    
    public function remove($flowid){
        return $this->delete(array('flow_id'=>$flowid));
    }

    public function getByTmplId($tmplid){
        $flows =  $this->select(array('tmpl_id'=>$tmplid))->toArray();
        return $flows;
    }
    
    public function countByTmplId($tmplid){
        return $this->select(array('tmpl_id'=>$tmplid))->count();
    }

    public function getByTmplIdAndSort($tmplid,$sort=1){
        $flows =  $this->select(array('tmpl_id'=>$tmplid,'sort'=>$sort))->current();
        return $flows;        
    }
}