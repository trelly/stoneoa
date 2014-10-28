<?php
/**
 * 审批流程
 *
 * @author terry
 */
class Approve_ComponentModel{

    public $tmpl_id;
    public $name;
    public $type;
    public $default;
    public $optional;
    public $options;
    public $width;
    public $height;
    public $flowsets;
    public $sflowsets;
    
    public function getTmpl_id() {
        return $this->tmpl_id;
    }

    public function getName() {
        return $this->name;
    }

    public function getType() {
        return $this->type;
    }

    public function getDefault() {
        return $this->default;
    }

    public function getOptional() {
        return $this->optional;
    }

    public function getOptions() {
        return $this->options;
    }

    public function getWidth() {
        return $this->width;
    }

    public function getHeight() {
        return $this->height;
    }

    public function getFlowsets() {
        return $this->flowsets;
    }

    public function getSflowsets() {
        return $this->sflowsets;
    }

    public function setTmpl_id($tmpl_id) {
        $this->tmpl_id = $tmpl_id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setDefault($default) {
        $this->default = $default;
    }

    public function setOptional($optional) {
        $this->optional = $optional;
    }

    public function setOptions($options) {
        $this->options = $options;
    }

    public function setWidth($width) {
        $this->width = $width;
    }

    public function setHeight($height) {
        $this->height = $height;
    }

    public function setFlowsets($flowsets) {
        $this->flowsets = $flowsets;
    }

    public function setSflowsets($sflowsets) {
        $this->sflowsets = $sflowsets;
    }
   
    public function toArray(){
        return (array)$this;
    }
}
    