<?php
/**
 * 用户备忘
 */
class MemoController extends Controller{

    public function init(){
        
    }

    public function IndexAction(){
        $this->stylesheets[] = '/public/css/fullcalendar.css';
        $this->scripts[] = '/public/js/calendar/fullcalendar.js';
        $this->scripts[] = '/public/stone/memo.js';
		$memo_model = new MemoModel();
        $types = $memo_model->tags();
        $rlist = $memo_model->getListsR();
		$overlist = $memo_model->getOverList();
        $this->content = $this->getView()->render('memo/index.phtml',array(
			"types" => $types,
			"rlists" => $rlist,
			'overlist' => $overlist
		));         
    }
    
}
