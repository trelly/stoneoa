$(function(){
	var curDir = "";

	var uploadify = new CNC.Uploadify($('#btn-file-upload input'),{
        'fileName': "file",
        'fileTypes': "",             
        'existFileNum':0,       //显示的图片数量
        'uploadingTempl':'<div class="task active" id=$file_id><span class="task-header"><img src="/img/loader_16.gif"> <strong>$file_name</strong></span><span class="task-desc"><i>0</i> KB of $file_size KB</span><div class="progress progress-striped active" rel="tooltip" data-original-title="0%"><div class="bar bar-success" style="width: 0%;"></div></div></div>',    //自定义上传模板样式
        'editTempl':'<div class="task fade in"> <i class="icofont-ok-sign color-green" title="success"></i> <span class="task-desc">$file_name</span> <button data-dismiss="alert" class="close">&times;</button> </div>',            //自定义编辑模板样式
        'errorTempl':'<div class="task fade in"> <i class="icofont-remove-sign color-red" title="error"></i> <span class="task-desc">$file_name</span> <button data-dismiss="alert" class="close">&times;</button> </div>',            //自定义编辑模板样式
		'uploadUrl':'/file/upload', 
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
			var tpl = render({list:[d.result]});
			$('#portfolio-list').append(tpl);
		},
		'extendParams' : function(){
			this.params.path = curDir;
		}
    });


	var tmpl = '{{each list}}'
			+'<li class="{{$getMeta($value.name,$value.type)}}" {{if $value.type=="dir"}}node-act="dir"{{/if}} node-data="{{$value.path}}{{$value.name}}">'
			+'	<div class="thumbnail">'
			+'		<img src="{{$getImgs($value.name,$value.type,$value.path,$value.name)}}" width="120" height="120" style="width:120px;height:120px;" alt="" />'
			+'		<div class="thumbnail-control">'
			+'			<div class="controls">'
			+'	{{if $value.type=="file"}}<a href="/file/get?path={{$urlencode($value.path,$value.name)}}" target="_blank" rel="" title="下载"><i class="icofont-download-alt"></i></a>{{/if}}'
			//+'	{{if $value.type=="file"}}<a href="/file/get?path={{$urlencode($value.path,$value.name)}}" target="_blank" rel="" title="预览"><i class="icofont-search"></i></a>{{/if}}'
			+'				<a href="javascript:;" title="重命名"><i class="icofont-edit"></i></a>'
			+'				<a href="#" title="删除" data-toggle="modal"><i class="icofont-trash"></i></a>'
			+'			</div>'
			+'		</div>'
			+'		<p class="description" style="text-align:center;">{{$value.name}}</p>'
			+'	</div>'
			+'</li>'
			+'{{/each}}';

	var render = template.compile(tmpl);

	template.helper('$urlencode', function(v1,v2){
		return encodeURI(v1+v2);
	})

	template.helper('$canview', function(v1,v2){
		return encodeURI(v1+v2);
	})

	function getMeta(name,type){
		if(type == "dir"){
			return "ffolder";
		}else{
			var suffix = name.substr(name.lastIndexOf('.')+1);
			var img = ({
				'ppt':'ftxt',
				'xls':'ftxt',
				'dps':'ftxt',
				'rar':'ffile',
				'zip':'ffile',
				'fla':'ffile',
				'exe':'ffile',
				'dll':'ffile',
				'mp3':'fmedia',
				'flac':'fmedia',
				'ape':'fmedia',
				'acc':'fmedia',
				'ogg':'fmedia',
				'mpg':'fmedia',
				'mpeg':'fmedia',
				'avi':'fmedia',
				'mp4':'fmedia',
				'rmvb':'fmedia',
				'rm':'fmedia',
				'jpg': 'fimage',
				'jpeg': 'fimage',
				'gif': 'fimage',
				'png':  'fimage',
				'bmp': 'fimage',
				'txt':'ftxt',
				'doc':'ftxt',
				'docx':'ftxt',
				'wps':'ftxt'
			})[suffix];

			return img||'/public/img/file/other.png'
		}
	}

	function getImage(name,type,url){
		if(type == "dir"){
			return "/public/img/file/folder.png";
		}else{
			var suffix = name.substr(name.lastIndexOf('.')+1);
			var img = ({
				'ppt':'/public/img/file/file.png',
				'xls':'/public/img/file/file.png',
				'dps':'/public/img/file/file.png',
				'rar':'/public/img/file/file.png',
				'zip':'/public/img/file/file.png',
				'fla':'/public/img/file/file.png',
				'exe':'/public/img/file/file.png',
				'dll':'/public/img/file/file.png',
				'mp3':'/public/img/file/media.png',
				'flac':'/public/img/file/media.png',
				'ape':'/public/img/file/media.png',
				'acc':'/public/img/file/media.png',
				'ogg':'/public/img/file/media.png',
				'mpg':'/public/img/file/media.png',
				'mpeg':'/public/img/file/media.png',
				'avi':'/public/img/file/media.png',
				'mp4':'/public/img/file/media.png',
				'rmvb':'/public/img/file/media.png',
				'rm':'/public/img/file/media.png',
				'jpg':'/file/get?path='+url,//'/public/img/file/image.png',
				'jpeg':'/file/get?path='+url,//'/public/img/file/image.png',
				'gif':'/file/get?path='+url,//'/public/img/file/image.png',
				'png': '/file/get?path='+url,//'/public/img/file/image.png',
				'bmp':'/file/get?path='+url,//'/public/img/file/image.png',
				'txt':'/public/img/file/text.png',
				'doc':'/public/img/file/text.png',
				'docx':'/public/img/file/text.png',
				'wps':'/public/img/file/text.png'
			})[suffix];

			return img||'/public/img/file/other.png'
		}
	}
	template.helper('$getImgs', function(v1,v2,v3,v4){
		return getImage(v1,v2,v3+v4);
	})

	template.helper('$getType', function(v1,v2){
		var str = getImage(v1,v2);
		return 'f'+str.substr(str.lastIndexOf('/')+1).split('.')[0];
	})

	template.helper('$getMeta', function(v1,v2){
		return getMeta(v1,v2);
	})
	
	function showByPath(path){
		path = path||"";

		jsonReq.post('/open/filesystem','show',{path:path},function(d){
			//console.log(d)
			var tpl = render({list:d.result});
			$('#portfolio-list').html(tpl);

			curDir = path.lastIndexOf('/')!=path.length-1?path+"/":path;

			makePaths(curDir)
		})
	}
	showByPath(location.hash.substr(1));	

	function makePaths(curDir){
		var arr = curDir.substr(0,curDir.length-1).split('/');
		var tpl = '<li><a href="/"><i class="icofont-home"></i> 主面板</a> <span class="divider">&rsaquo;</span></li>',
			path = "",cls ="",divider = '<span class="divider">&rsaquo;</span>',act='node-act="path"';
		for(var i=0;i<arr.length;i++){
			if(i == arr.length-1){
				cls = "active";
				divider = "";
				act = '';
			}
			if(arr[i] == ""){
				tpl += '<li class="'+cls+'"><a '+act+' href="#/">上传文件</a> '+divider+'</li>'
			}else{
				path += '/'+arr[i];
				tpl += '<li class="'+cls+'"><a '+act+' href="#'+path+'">'+arr[i]+'</a> '+divider+'</li>'
			}
		}
		location.hash = path;
		$('.breadcrumb').html(tpl);
	}

	$('.breadcrumb').on('click','li a[node-act="path"]',function(){
		showByPath($(this).attr('href').substr(1))
		return false;
	})

	function closeDialog(el){
		$('#masklayer').hide();
		el.addClass('fade hide').removeClass('active');
		el.find('form')[0].reset();
		$('#layer-create-folder [node-id="message"]').text('')	
	}

	$('#layer-create-folder').on('click',"[node-act]",function(){
		var that = $(this),act = $(this).attr('node-act'),el = that.closest('[role="dialog"]'),name = el.find('[name="newname"]').val();
		if(act == "close"||act=="cancel"){
			closeDialog(el);
		}
		if(act == 'sure'){
			jsonReq.post('/open/filesystem',"mkdir",{dir:curDir+name},function(d){
				if(d.result){
					$('#portfolio-list').append(render({list:[d.result]}))
				}else if(d.error){
					$('#layer-create-folder [node-id="message"]').text(d.error.message)	
					return;
				}
				closeDialog(el);
			},'json')
		}
	})

	$('#layer_rename').on('click',"[node-act]",function(){
		var that = $(this),act = $(this).attr('node-act'),el = that.closest('[role="dialog"]'),name = el.find('[name="rename"]').val();
		if(act == "close"||act=="cancel"){
			closeDialog(el);
		}
		if(act == 'sure'){
			var sourcename = sourceEl.attr('node-data');
			jsonReq.post('/open/filesystem','mv',{source:sourcename,dist:curDir+name},function(d){
				if(d.result){
					sourceEl.attr('node-data',curDir+name).find('.description').text(name);
					closeDialog(el);
				}
			})
		}
	})

	var sourceEl = "";
	$('#portfolio-list').on('click','.icofont-edit',function(){
		var name = $(this).closest('.thumbnail').find('.description').text();
		sourceEl = $(this).closest('li');
		if($('#masklayer').length>0){
			$('#masklayer').show();
		}else{
			$('<div id="masklayer"></div>').css({
				'width':'100%',
				'height':'100%',
				'z-index':'999',
				'opacity' : '0.3',
				'background':'#ccc',
				'position' : 'fixed',
				'top' : 0,
				'left' : 0
			}).appendTo($('body')).show();
		}

		$('#layer_rename').removeClass('fade hide').addClass('active').find('[name="rename"]').val(name);
		return false;
	}).on('dblclick','[node-act="dir"]',function(){
		showByPath($(this).attr('node-data'));
		return false;
	}).on('click','.icofont-trash',function(e){
		var p = $(this).closest('li');
		if(!confirm("确定要删除吗？")){
			return false;
		}
		jsonReq.post('/open/filesystem','rm',{file:p.attr('node-data')},function(d){
			if(d.result){
				p.remove();
			}
		})
	})

	$('#btn-create-folder').click(function(){
		if($('#masklayer').length>0){
			$('#masklayer').show();
		}else{
			$('<div id="masklayer"></div>').css({
				'width':'100%',
				'height':'100%',
				'z-index':'999',
				'opacity' : '0.3',
				'background':'#ccc',
				'position' : 'fixed',
				'top' : 0,
				'left' : 0
			}).appendTo($('body')).show();
		}
		$('#layer-create-folder').removeClass('fade hide').addClass('active');
	})

	$('#portfolio-list').filterable({
		tagSelector : '.portfolio-filter a.filterable'
	});
	$('.portfolio-filter a').click(function(){
		return false;
	})

	$(".sidebar-right-content .side-task").on('click','.close',function(){
		$(this).closest('.task').remove();
		if($(".sidebar-right-content .side-task .task").length == 0){
			$('[node-id="upprogress"]').hide();
		}
	})
})