<?php
/**
 * Description of ApproveTemplate
 *
 * @author terry
 */
class Approve_TemplateModel extends Table{
    //put your code here
    protected $table = 'approve_template';
    
    public function getById($id){
        if(is_array($id)){
            return $this->select(array(
                'id'=>$id
            ))->toArray();
        }
        return $this->select(array(
            'id'=>$id
        ))->current();
    }
    
    public function getByTypeId($type){
        return $this->select(array(
            'typeid'=>$type
        ))->toArray();
    }
    
    public function add($type,$name,$content){
        $this->insert(
            array(
                'typeid'=>$type,
                'name'=>$name,
                'content'=>$content
            )
        );
        return $this->lastInsertValue;
    }
    
    public function edit($tmplid,$type,$name,$content){
         return $this->update(
            array(
                'typeid'=>$type,
                'name'=>$name,
                'content'=>$content
            ),
            array('id'=>$tmplid)
        );
    }
    
}
