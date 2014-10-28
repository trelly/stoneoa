<?php
/**
 * Description of Annouce
 *
 * @author terry
 */
class Announce_AnnouceModel {
    
    public $title;
    public $content;
    public $create_by;
    public $create_time;
    public $update_by;
    public $update_time;
    public $ann_type;

    public function getTitle() {
        return $this->title;
    }

    public function getContent() {
        return $this->content;
    }

    public function getSortorder() {
        return $this->sortorder;
    }

    public function getCreate_by() {
        return $this->create_by;
    }

    public function getCreate_time() {
        return $this->create_time;
    }

    public function getUpdate_by() {
        return $this->update_by;
    }

	public function getAnn_type() {
        return $this->ann_type;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function setContent($content) {
        $this->content = $content;
    }

    public function setSortorder($sortorder) {
        $this->sortorder = $sortorder;
    }

    public function setCreate_by($create_by) {
        $this->create_by = $create_by;
    }

    public function setCreate_time($create_time) {
        $this->create_time = $create_time;
    }

    public function setUpdate_by($update_by) {
        $this->update_by = $update_by;
    }

	public function setAnn_type($ann_type) {
        $this->ann_type = $ann_type;
    }

    
    public function toArray(){
        return (array)$this;
    }
}
