var editor = UE.getEditor('editor');
$('[data-form="uniform"]').uniform();
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
		var strTo = $('[name="reseiver"]').val(),
			to = strTo?strTo.split(','):"",
			strCc = $('[name="ccreseiver"]').val(),
			cc = strCc?strCc.split(','):"",
			subject = $('[name="subject"]').val(),
			content = editor.getContent(),
			attachments = [];
		$('#attachment [name="attachments"]').each(function(){
			attachments.push($(this).val())
		})

		if(to.length>0&&content){
			jsonReq.post('/open/mail','send',{"messages":{
				to : to,
				cc : cc,
				subject : subject,
				content : content,
				attachments : attachments
			}},function(d){
				alert('发送成功')	
			})
		}
		return false;
	})

	var uploadify = new CNC.Uploadify($('#upload'),{
        'fileName': "file",
        'fileTypes': "",             
        'existFileNum':0,       //显示的图片数量
        'uploadingTempl':'<div class="task active" id=$file_id><span class="task-header"><img src="/img/loader_16.gif"> <strong>$file_name</strong></span><span class="task-desc"><i>0</i> KB of $file_size KB</span><div class="progress progress-striped active" rel="tooltip" data-original-title="0%"><div class="bar bar-success" style="width: 0%;"></div></div></div>',    //自定义上传模板样式
        'editTempl':'<div class="task fade in"> <i class="icofont-ok-sign color-green" title="success"></i> <span class="task-desc">$file_name</span> <button data-dismiss="alert" class="close">&times;</button> </div>',            //自定义编辑模板样式
        'errorTempl':'<div class="task fade in"> <i class="icofont-remove-sign color-red" title="error"></i> <span class="task-desc">$file_name</span> <button data-dismiss="alert" class="close">&times;</button> </div>',            //自定义编辑模板样式
		'uploadUrl':'/mail/attachment', 
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
			$('#attachment').append('<span type="panel">'+d.result.name+'<input name="attachments" type="hidden" value="'+d.result.id+'" /><a href="javascript:;" class="icon-remove"></a></span> ');
		},
		'extendParams' : function(){
			
		}
    });


	$('#attachment').on('click','.icon-remove',function(){
		$(this).closest('[type="panel"]').remove();
	})