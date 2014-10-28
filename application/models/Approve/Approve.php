<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Approve_ApproveModel extends Table{
    
    protected $table = 'approve';
    
    public function add($tmplid,$userid,$name,$components,$sender,$steps = 2){
        $this->insert(array(
            'tmpl_id'=>$tmplid,
            'user_id'=>$userid,
            'name'=>$name,
            'components'=>$components,
            'sender'=>$sender,
            'steps'=>$steps
        ));
        $approveid = $this->lastInsertValue;
        $push = new Push_MessageModel();
        $push->touser = $userid;
        $push->title = '审批已经送审';
        $push->type = 1;
        $push->url = 'http://www.stone.com/approve/step#'.$approveid;
        $push->save();
        return $approveid;
    }
    
    public function getById($id){
        return $this->select(array(
            'id'=>$id
        ))->current();
    }
    
    public function remove($id){
        return $this->delete(array(
            'id'=>$id
        ));
    }
    
    public function next($approveid,$components,$sender){
       $approve = $this->getById($approveid);
       if($approve['status'] >= $approve['steps'] ){
           return true;
       }
       
        $push = new Push_MessageModel();
        $push->touser = $sender;
        $push->title = '审批待处理';
        $push->type =1;
        $push->url = 'http://www.stone.com/approve/step#'.$approveid;
        $push->save();       
       return $this->update(
            array(
                'components'=>$components,
                'sender'=>$sender,
                'status'=>$approve['status']+1
            ),
            array('id'=>$approveid)
       );
    }
    
    public function back($approveid,$components,$sender){
       $approve = $this->getById($approveid);
       if($approve['status'] <= 1 ){
           return true;
       }
        $push = new Push_MessageModel();
        $push->touser = $sender;
        $push->title = '审批被驳回';
        $push->type = 1;
        $push->url = 'http://www.stone.com/approve/step#'.$approveid;
        $push->save();              
       return $this->update(
            array(
                'components'=>$components,
                'sender'=>$sender,
                'status'=>$approve['status']-1
            ), 
            array('id'=>$approveid)
       );        
    }
    
    public function complete($approveid,$components){
       return $this->update(
            array(
                'components'=>$components,
                'completed'=>1
            ), 
            array('id'=>$approveid)
       );        
    }

    public function getByCid($cid,$completed = 0){
        return $this->select(array(
            'user_id'=>$cid,
            'completed'=>$completed)
        )->toArray();
    }
    
    public function getBySender($cid){
        return $this->select(array(
            'sender'=>$cid)
        )->toArray();
    }    
}
?>
