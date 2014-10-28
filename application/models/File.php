<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class FileModel extends BaseModel{
    protected $table = 'document';

	/**
     * 上传文件
     * @return type
     */
    public function upload(){
        var_dump( $_FILES);
    }
}
?>
