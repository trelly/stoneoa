<?php
/**
 * 基本模型类
 * @author terry
 */
class CommonModel {
    public function toArray(){
        $data = (array)$this;
        foreach($data as $key=>$val){
            if(is_null($val)){
                unset($data[$key]);
            }
        }
        return $data;
    }
}
