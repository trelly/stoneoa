<?php
/**
 * 考勤相关接口
 *
 * @author terry
 */
class  Open_AttendanceModel {
    private $attendance_obj;
	private $user_group_obj;
	private $user_obj;

    public function __construct(){
        $this->attendance_obj = new AttendanceModel();
		$this->user_group_obj = new UserGroupModel();
		$this->user_obj = new UserModel();
    }

	public function fixedNumber($num){
		return $num<10?"0".$num:$num;
	}

	public function getDateArr($sdate,$edate){
		$arr = Array();
		if (function_exists('date_default_timezone_set')) {       
			date_default_timezone_set('Asia/Chongqing');   
		}      
		$sdate = getdate(strtotime($sdate)); 
		$edate = getdate(strtotime($edate));  

		if($sdate['mon']==$edate['mon']){
			$end = getdate(mktime(0, 0, 0, $sdate['mon'], $edate['mday'], $edate['year']));
			$start = getdate(mktime(0, 0, 0, $sdate['mon'], $sdate['mday'], $sdate['year']));
			for ($i = $sdate['mday']; $i <= $end['mday']; $i++) {       
				array_push($arr,$sdate['year'].'-'.$this->fixedNumber($sdate['mon']).'-'.$this->fixedNumber($i)); 
			}
		}else{
			for($m = $sdate['mon'];$m<=$edate['mon'];$m++){
				if($m == $sdate['mon']){
					$end = getdate(mktime(0, 0, 0, $m+1, 1, $edate['year']) - 1);
					$start = getdate(mktime(0, 0, 0, $m, $sdate['mday'], $sdate['year']));
					for ($i = $sdate['mday']; $i <= $end['mday']; $i++) {       
						array_push($arr,$sdate['year'].'-'.$this->fixedNumber($m).'-'.$this->fixedNumber($i)); 
					}
				}else if($m<$edate['mon']){
					$end = getdate(mktime(0, 0, 0, $m+1, 1, $edate['year']) - 1);
					$start = getdate(mktime(0, 0, 0, $m, $sdate['mday'], $sdate['year']));
					for ($i = 1; $i <= $end['mday']; $i++) {       
						array_push($arr,$sdate['year'].'-'.$this->fixedNumber($m).'-'.$this->fixedNumber($i));  
					}
				}else{
					$end = getdate(mktime(0, 0, 0, $m+1, 1, $edate['year']) - 1);
					$start = getdate(mktime(0, 0, 0, $m, 1, $sdate['year']));
					for ($i = 1; $i <= $end['mday']; $i++) {       
						array_push($arr,$sdate['year'].'-'.$this->fixedNumber($m).'-'.$this->fixedNumber($i)); 
					}	
				}
			}
		} 

		return $arr;
	}
    
    /**
     * 维护考勤
     * @return type
     */
    public function updateCheck($sign_date,$update_start,$update_end,$reason,$id){
		if($id == ""){
			return $this->attendance_obj->addCheck($sign_date,$update_start,$update_end,$reason);
		}else{
			return $this->attendance_obj->updateCheck($sign_date,$update_start,$update_end,$reason,$id);
		}
    }


	public function getAttendanceByGroup($start,$end,$groupid){
		$arr = Array();
		$dateArr = $this->getDateArr($start,$end);
		$users = $this->user_group_obj->getUsersById($groupid);
		foreach($users as $user){
			$u = $this->user_obj->getById($user['user_id']);
			$atts = $this->attendance_obj->getByGroupId($start,$end,$user['user_id']);
			foreach($dateArr as $date){
				$tmp = Array(
					'date' => $date,
					'name' => $u['name'],
					'sign_info' => ''
				);
				foreach($atts as $att){
					if($att['sign_date'] == $date){
						$tmp['sign_info'] = $att;
					}
				}
				array_push($arr,$tmp);
			}
		}
		return $arr;
	}
        
}
