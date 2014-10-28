<?php
/**
 * 用户备忘
 * @author terry
 * @since 1.0
 */
class MemoModel extends Table{
    
    protected $table = 'stone_memo';
    
    /**
     * 按日期区间返回用户所有备忘
     * @param type $start
     * @param type $end
     * @return type
     */
    public function get($start,$end){
        $select = new \Zend\Db\Sql\Select();
        $where = "(start_datetime between '$start' and '$end' or end_datetime between '$start' and '$end') and user_id = {$this->loginuser['id']} and flag!='0'";
        $select->from($this->table)->where($where)->order(array(
            'start_datetime'=>'desc'
        ));
        return $this->selectWith($select)->toArray();
    }

    /**
     * 返回右侧定义的事件
     * 
     * @return type
     */
    public function getListsR(){
        $select = new \Zend\Db\Sql\Select();
        $where = "user_id = {$this->loginuser['id']} and flag='0' and status != '2'";
        $select->from($this->table)->where($where)->order(array(
            'status'=>'desc',
			'start_datetime'=>'desc'
        ));
        return $this->selectWith($select)->toArray();
    }
    
    /**
     * 返回右侧已完成的事件
     * 
     * @return type
     */
    public function getOverList(){
        $select = new \Zend\Db\Sql\Select();
        $where = "user_id = {$this->loginuser['id']} and flag='0' and status='2'";
        $select->from($this->table)->where($where)->order(array(
            'start_datetime'=>'desc'
        ));
        return $this->selectWith($select)->toArray();
    }
    
    /**
     * 返回用户备忘
     * @param type $day
     * @return type
     */
    public function day($day){
        return $this->select(array(
            'user_id'=>  $this->loginuser['id'],
            'start_datetime'=>$day
        ))->toArray();
    }

    /**
     * 添加备忘
     * @param type $content
     */
    public function write($content,$start,$end,$flag=0,$status){
        $this->insert(array(
            'user_id'=>$this->loginuser['id'],
            'content'=>$content,
            'start_datetime'=>date('Y-m-d H:i:s', strtotime($start)),
            'end_datetime'=>date('Y-m-d H:i:s', strtotime($end)),
			'flag'=>$flag,
			'status'=>$status
        ));
        return $this->lastInsertValue;
    }

	/**
     * 修改备忘
     * @param type $content
     */
    public function updateEvent($content,$start,$end,$flag=0,$id){
        return $this->update(array(
            'user_id'=>$this->loginuser['id'],
            'content'=>$content,
            'start_datetime'=>date('Y-m-d H:i:s', strtotime($start)),
            'end_datetime'=>date('Y-m-d H:i:s', strtotime($end)),
			'flag'=> $flag
        ),array('id'=>$id));
    }
    
    /**
     * 修改备忘内容
     * @param int $id
     * @param string $content
     * @return bool
     */
    public function edit($id,$content,$start,$end){
        return $this->update(array(
            'user_id'=>  $this->loginuser['id'],
            'content'=>$content,
            'start_datetime'=>date('Y-m-d H:i:s', strtotime($start)),
            'end_datetime'=>date('Y-m-d H:i:s', strtotime($end))
        ),array('id'=>$id));
    }
    
    /**
     * 删除备忘
     * @param int $id
     * @return bool
     */
    public function remove($id){
        return $this->delete(array(
            'id'=>$id,
            'user_id'=>  $this->loginuser['id'],
        ));
    }
    
    /**
     * 标识备注
     * @param int $id
     * @param int $tag
     * @return boolean
     */
    public function mark($id,$tag = 0){
        return $this->update(array(
            'status'=>$tag
        ),array(
            'id'=>$id,
            'user_id'=>  $this->loginuser['id']
        ));
    }
    
    /**
     * 获取备忘标识类型
     * @return array
     */
    public function tags(){
        return array(
            array('desc'=>'正常','tag'=>0),
            array('desc'=>'紧急','tag'=>1)
        );
    }
    
    public function unfinished(){
        
    }
}
?>
