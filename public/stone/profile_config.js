;(function(){
	$('[data-form="select2"]').select2();
	$('[data-form="uniform"]').uniform();
	$('[data-form="datepicker"]').datepicker();

	function formatObj(params){
		var obj = {};
		for(var o in params){
			var key = params[o].name,
				val = params[o].value;
			obj[key] = val;
		}
		return obj;
	}

	$('#save').click(function(){
		var formData = $('#profile_form').serializeArray();
		var fdata = formatObj(formData);
		jsonReq.post('/open/user','update',{'user':fdata},function(d){
			alert('更新成功');
			location.reload();
		})
		return false;
	})

	var uploadify = new CNC.Uploadify($('#photo'),{
        'fileName': "file",
        'fileTypes': "",             
        'existFileNum':0,       //显示的图片数量
        'uploadingTempl':'<div class="task active" id=$file_id><span class="task-header"><img src="/img/loader_16.gif"> <strong>$file_name</strong></span><span class="task-desc"><i>0</i> KB of $file_size KB</span><div class="progress progress-striped active" rel="tooltip" data-original-title="0%"><div class="bar bar-success" style="width: 0%;"></div></div></div>',    //自定义上传模板样式
        'editTempl':'<div class="task fade in"> <i class="icofont-ok-sign color-green" title="success"></i> <span class="task-desc">$file_name</span> <button data-dismiss="alert" class="close">&times;</button> </div>',            //自定义编辑模板样式
        'errorTempl':'<div class="task fade in"> <i class="icofont-remove-sign color-red" title="error"></i> <span class="task-desc">$file_name</span> <button data-dismiss="alert" class="close">&times;</button> </div>',            //自定义编辑模板样式
		'uploadUrl':'/profile/photo', 
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
			$('#img_photo').attr('src','/profile/photoView/?path='+d.result.path);
			$('[name="photo"]').val(d.result.path);
		},
		'extendParams' : function(){
			
		}
    });
})()