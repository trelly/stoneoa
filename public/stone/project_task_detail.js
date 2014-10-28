$(function(){
	var uploadify = new CNC.Uploadify($('#addtaskfile'),{
        'fileName': "file",
        'fileTypes': "",             
        'existFileNum':0,       //显示的图片数量
        'uploadingTempl':'<div class="task active" id=$file_id><span class="task-header"><img src="/img/loader_16.gif"> <strong>$file_name</strong></span><span class="task-desc"><i>0</i> KB of $file_size KB</span><div class="progress progress-striped active" rel="tooltip" data-original-title="0%"><div class="bar bar-success" style="width: 0%;"></div></div></div>',    //自定义上传模板样式
        'editTempl':'<div class="task fade in"> <i class="icofont-ok-sign color-green" title="success"></i> <span class="task-desc">$file_name</span> <button data-dismiss="alert" class="close">&times;</button> </div>',            //自定义编辑模板样式
        'errorTempl':'<div class="task fade in"> <i class="icofont-remove-sign color-red" title="error"></i> <span class="task-desc">$file_name</span> <button data-dismiss="alert" class="close">&times;</button> </div>',            //自定义编辑模板样式
		'uploadUrl':'/project/upload', 
        'swfurl' : "../lib/uploadify/swfupload.js",
        'flash_url': "../lib/uploadify/uploadify.swf",
        'swfOnly':false,
        'buttonWidth': 132,
        'buttonHeight': 40,
		'beforeUpload' : function(){
			$('.sidebar-right-control [node-id="fileupload"] a').trigger('click');
			$('[node-id="upprogress"]').show();
		},
		'successCallback' : function(d){
			var file = d.result;
			$('#taskfiles_list tbody').append('<tr><td class="center"><a href="#">'+file.name+'</a></td><td>'+file.create_time+'</td></tr>')
			//$('#task_file_list').append('<dt><a target="_blank" href="javascript:;">'+d.result.name+'('+d.result.size+')</a></dt>')
		},
		'extendParams' : function(){
			this.params.projectid = projectid;			
			this.params.taskid = taskid;
		}
    });

	jsonReq.post('/open/project','getDocument',{projectid:projectid,taskid:taskid},function(d){
		var tpl = '',file;
		for(var i=0;i<d.result.length;i++){
			file = d.result[i];
			tpl += '<tr><td class="center"><a target="_blank" href="/project/download/id/'+file.id+'">'+file.name+'</a></td><td>'+file.create_time+'</td></tr>'
		}
		$('#taskfiles_list tbody').html(tpl);
	})
})