<?php

/**
 * Description of Documents
 *
 * @author tianyi
 */
class Project_DocumentsModel extends Table{
    
    protected $table = "project_document";
    
    public function add(Project_DocumentModel $document){
        $this->insert($document->toArray());
        return $this->lastInsertValue;
    }
    
    public function edit(Project_DocumentModel $document){
        return $this->update($document->toArray(),array('id'=>$document->getId()));
    }
    
    public function save(Project_DocumentModel $document){
        if($document->id){
            return $this->edit($document);
        }else{
            return $this->add($document);
        }
    }

    public function get(Project_DocumentModel $document){
        return $this->select($document->toArray())->toArray();
    }
    
    public function getById($id){
        return $this->select(array('id'=>$id))->current();
    }
}
