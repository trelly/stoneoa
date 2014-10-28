<?php
/**
 * 公司排班类
 *
 * @author terry
 */
class AttendanceSetModel extends Table{
    
    protected $table = 'attendance_set';
    
    /**
     * 获取公司排班列表
     * @param string $start
     * @param string $end
     * @return array 
     */
    public function get($start,$end){
        $select = new \Zend\Db\Sql\Select();
        $where = "`date` between '$start' and '$end'";
        $select->from($this->table)->where($where)->order(array('date'=>'asc'));
        return $this->selectWith($select)->toArray();
    }

    /**
     * 排班
     * @param type $set
     * @return bool 
     */
    public function arrange($set){
        if(!isset($set['date'])){
            return false;
        }
        if($this->isArranged($set['date'])){
            return $this->update($set,  array(
                'date'=>$set['date']
            ));
        }  else {
            return $this->insert($set);
        }
    }
    
    /**
     * 判断是否已经被排班
     * @param string $day
     * @return bool
     */
    public function isArranged($day){
        return $this->select(array(
            'date'=>$day
        ))->current();
    }

    /**
     * 取消排班
     */
    public function cancel($day){
        return $this->delete(array(
            'date'=>$day
        ));
    }
    
    
}
