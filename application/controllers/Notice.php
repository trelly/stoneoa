<?php
/**
 * 通知管理
 */
class NoticeController extends Controller
{

	private $announce_obj;
	private $announce_receiver_obj;

    public function init()
    {
        $this->announce_obj = new Announce_AnnoucesModel();
		$this->announce_receiver_obj = new Announce_ReceiversModel();
    }
    
    public function indexAction()
    {
        
    }
    
    public function listAction(){
        $this->scripts[] = '/public/stone/notice.js';
        $this->content = $this->getView()->render('notice/list.phtml',array()); 
    }
	
	/**
	 * 设置公告
	 */
	public function setAction(){
        $this->scripts[] = '/public/js/ztree/js/jquery.ztree.core-3.5.min.js';
		$this->scripts[] = '/public/js/ztree/js/jquery.ztree.excheck-3.5.min.js';
		$this->stylesheets[] = '/public/js/ztree/css/zTreeStyle/zTreeStyle.css';
		$this->scripts[] = '/public/stone/notice_set.js';
		
		$annid = $this->getRequest()->getParam('id');
		if($annid){
			$announce = $this->announce_obj->getById($annid);
			$announce_receiverlist = $this->announce_receiver_obj->getByAnnId($annid);
			$announce["receiver"] = $announce_receiverlist;
		}else{
			$announce = "";
		}
		//var_dump(json_encode($announce));
        $this->content = $this->getView()->render('notice/set.phtml',array(
			'announce' =>  json_encode($announce)
		)); 
    }

	/**
     * 我的公告
     */
    public function managesAction(){
		$list = $this->announce_obj->getByMy();
		$this->scripts[] = '/public/stone/notice_manages.js';
        $this->content = $this->getView()->render('notice/manages.phtml',Array(
			'announceList' => $list	
		));
    }

	/**
     * 公告详情
     */
    public function detailAction(){
		$noticeId = $this->getRequest()->getParam('id');
		//var_dump($this->announce_obj->getById($noticeId));
        $this->content = $this->getView()->render('notice/detail.phtml',Array(
			'notice' => $this->announce_obj->getById($noticeId)	
		));
    }

}
