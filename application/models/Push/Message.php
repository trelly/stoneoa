<?php

/**
 * Description of Message
 *
 * @author tianyi
 */
class Push_MessageModel extends Table{
    //put your code here
    public $id;
    public $title;
    public $url;
    public $type;
    public $status;
    public $touser;
    public $ctime;

    protected $field = array('id','title','type','url','status','touser','ctime');
    protected $table = 'push';
    
    public function save(){
        if($this->id){
            $this->update(
                $this->toArray(true),
                array('id'=>  $this->id)
            );
        }else{
            $this->insert($this->toArray(TRUE));
        }
    }
    
    public function findById($id){
        $data = $this->select(array('id'=>$id))->current();
        if($data){
            foreach ($this as $key=>&$value){
                if(empty($value) && $key != 'columns' && $key != 'lastInsertValue')
                    $value = $data[$key];
            }
        }
        return $this;
    }
    
    public function findByUser($userid){
        $data = $this->select(array('touser'=>$userid,'status'=>0))->toArray();
        foreach ($data as &$item){
            $item['url'] = '/push/message/id/'.$item['id'];
        }
        return $data;
    }
    
    public function readed(){
        $this->status = 1;
    }
}
