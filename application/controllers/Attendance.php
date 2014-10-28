<?php
/**
 * 联系人
 */
class AttendanceController extends Controller{

    public function init(){
        
    }

    public function IndexAction(){
        $this->stylesheets[] = '/public/css/fullcalendar.css';
        $this->scripts[] = '/public/js/calendar/fullcalendar.js';
        $this->scripts[] = '/public/stone/attendance.js';
        $this->content = $this->getView()->render('attendance/index.phtml',array());    
    }

	public function RecordAction(){
		$this->stylesheets[] = '/public/css/datepicker.css';
        $this->content = $this->getView()->render('attendance/record.phtml',array());    
		$this->scripts[] = '/public/js/datepicker/bootstrap-datepicker.js';
		$this->scripts[] = '/public/stone/attendance_record.js'; 
	}

	public function ManagesAction(){
		$this->stylesheets[] = '/public/css/fullcalendar.css';
        $this->scripts[] = '/public/js/calendar/fullcalendar.js';
        $this->scripts[] = '/public/stone/attendance_manages.js';
        $this->content = $this->getView()->render('attendance/manages.phtml',array());    
    }
    
    public function ExportAction(){
        $this->enableLayout = false;
        $startdate = $this->getRequest()->getQuery('startdate');
        $enddate = $this->getRequest()->getQuery('enddate');
        $groupid = $this->getRequest()->getQuery('groupid');
        $group_obj = new GroupModel();
        $group = $group_obj->getById($groupid);
        $filename = $group['name'].'('.$startdate.'-'.$enddate.')'.'.xls';
        header("Content-type: application/octet-stream;charset=utf8");
        header("Content-Disposition: attachment; filename=" . $filename . ";" );
        $tables = array();
        $tables[] = array(
            "用户名",
            "考勤日期",
            "工作时间",
            "工作时长",
            "考勤状态",
            "维护时长"
        );
        $attendance = new Open_AttendanceModel();
        $attendances = $attendance->getAttendanceByGroup($start, $end, $groupid);
        foreach ($tables as &$item){
            echo (string)implode("\t", $item)."\n";
        }
        foreach ($attendances as &$item){
            echo (string)implode("\t", $item)."\n";
        }      
    }

}