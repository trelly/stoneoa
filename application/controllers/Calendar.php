<?php
/**
 * 日历
 */
class CalendarController extends Controller{

    public function init(){
        
    }

    public function IndexAction(){
        $this->stylesheets[] = '/public/css/fullcalendar.css';
        $this->scripts[] = '/public/js/calendar/fullcalendar.js';
        $this->scripts[] = '/public/stone/calendar.js';
        $this->content = $this->getView()->render('calendar/index.phtml',array());         
    }
    
}
