<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class AttendanceSetModel extends Table{
    
    protected $table = 'stone_attendance_set';

    public function set($set){
        $start = $set['start'];
        $end = $set['end'];
        $offsetDay = intval((strtotime($end) - strtotime($start))/864200);
        if($offsetDay >= 31){
            throw new Exception('设置日期过大', '10020',$offsetDay);
        }else{
            
        }
    }
     
}
?>
