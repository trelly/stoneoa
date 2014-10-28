$(function(){
	var oTaskTables,task = {};

	$('#btn-addtask').click(function(){
		$('#layer-addtask').slideDown();
		$('#sub_add_task').text('添加')
	})

	$('#cancel-task').click(function(){
		$('#layer-addtask')[0].reset();
		$('[name="manager"]').select2('val','');
		delete task.editid;
		$('#layer-addtask').slideUp();
	})

	$('#btn-addmember').click(function(){
		$('[name="member"]').select2('val','');
		$('#layer-addmember').slideDown();
	})

	$('#cancel-member').click(function(){
		$('#layer-addmember').slideUp();
	})
	
	$('#btn-addlandmark').click(function(){
		$('#layer-addlandmark').slideDown();
	})

	$('#cancel-landmark').click(function(){
		$('#layer-addlandmark').slideUp();
	})

	$('.nav-tabs li a[data-toggle="tab"]').click(function(){
		var index = $('.nav-tabs>li').index($(this).closest('[node-type="atab"]'));
		$('.nav-tabs li').removeClass('active');
		$(this).closest('[node-type="atab"]').addClass('active');
		$('[node-id="panel"]').hide().eq(index).show();
		active($(this).attr('node-data'));
	})

	function active(type){
		switch(type){
			case 'task-my':
				fetchTask('my')
			break;
			case 'task-all':
				fetchTask('all')
			break;
			case 'member':
				fetchMember();
			break;
			case 'landmark':
				fetchMilestone();
			break;
			default:
			break;
		}
	}

	function getMemberListView(list){
		var tmpl =  '{{each list}}'+
					'<tr class="odd gradeX">'+
					'    <td class="center">{{$value.name}}</td>'+
					'	 <td class="center">{{$value.department}}</td>'+
					'	 <td class="">{{$value.role}}</td>'+
					'	 <td class="center"><a class="btn btn-small" title="升级为项目负责人" href="/user/edit#id=23"><i class="icofont-arrow-up"></i></a><a class="btn btn-small" title="降级为项目成员" href="/user/edit#id=23"><i class=" icofont-remove-sign"></i></a></td>'+
					'</tr>'+
					'{{/each}}';
		var render = template.compile(tmpl);
		var tpl = render({list:list});
		
		$('#memberlist tbody').html(tpl);
	}

	function fetchMember(){
		var projectid = location.hash?location.hash.substr(1):'';
		if(!projectid) return;
		jsonReq.post('/open/project','getMember',{"projectid":projectid},function(d){
			getMemberListView(d.result);
		})
	}

	$('#sub-member').click(function(){
		var formEl = $(this).closest('form');
		var projectid = location.hash?location.hash.substr(1):'';
		if(!projectid){
			alert('数据错误，没有指定项目')
			return false;
		}
		var param = serialize(formEl.serializeArray());
		if(!param.member){
			alert('请输入要添加的人')
			return false;
		}
		$.extend(param,{projectid:projectid});
		jsonReq.post('/open/project','addMember',param,function(d){
			if(d.result){
				$('[name="member"]').select2('val','');
				fetchMember();
			}
		})
	})

	function getMilestoneListView(list){
		var tmpl =  '{{each list}}'+
					'<tr class="odd gradeX">'+
					'    <td class="center"><a href="/project/milestone/id/{{$value.id}}">{{$value.name}}</a></td>'+
					'	 <td class="">{{$value.time_point}}</td>'+
					'</tr>'+
					'{{/each}}';
		var render = template.compile(tmpl);
		var tpl = render({list:list});
		
		$('#milestonelist tbody').html(tpl);
	}

	function fetchMilestone(){
		var projectid = location.hash?location.hash.substr(1):'';
		if(!projectid) return;
		jsonReq.post('/open/project','getMilestone',{"projectid":projectid},function(d){
			getMilestoneListView(d.result);
		})
	}

	$('#sub-milestone').click(function(){
		var formEl = $(this).closest('form');
		var projectid = location.hash?location.hash.substr(1):'';
		if(!projectid){
			alert('数据错误，没有指定项目')
			return false;
		}
		var param = serialize(formEl.serializeArray());
		if(!param.name){
			alert('请输入名称')
			return false;
		}
		$.extend(param,{projectid:projectid});
		jsonReq.post('/open/project','saveMilestone',{milestone:param},function(d){
			if(d.result){
				fetchMilestone();
			}
		})
	})

	function serialize(arr){
		var obj = {};
		$(arr).each(function(){
			obj[this.name] = this.value
		})
		return obj;
	}

	$('#sub_add_task').click(function(){
		var formEl = $(this).closest('form');
		var projectid = location.hash?location.hash.substr(1):'';
		if(!projectid){
			alert('数据错误，没有指定项目')
			return false;
		}

		var param = serialize(formEl.serializeArray());
		if(!param.title){
			alert('请输入任务名称')
			return false;
		}
		if(task.editid){
			param['id'] = task.editid;
		}
		$.extend(param,{projectid:projectid});
		jsonReq.post('/open/project','saveTask',{task:param},function(d){
			if(d.result){
				formEl[0].reset();
				$('[name="manager"]').select2('val','');
				fetchTask(task._cur)
				$('#layer-addtask').slideUp();
				delete task.editid;
			}
		})
	})


	function getTaskListView(list){
		var tmpl =  '{{each list}}'+
					'<tr class="odd gradeX">'+
					'    <td><a href="/project/task/id/{{$value.id}}">{{$value.title}}</a></td>'+
					'	 <td>{{$value.manager}}</td>'+
					'	 <td>{{$progress($value.progress)}}</td>'+
					'	 <td class="center">{{$value.start_date}}</td>'+
					'	 <td class="center">{{$value.end_date}}</td>'+
					'	 <td class="">{{$value.description}}</td>'+
					'	 <td class="center"><a class="btn btn-small" title="修改任务" href="javascript:;" node-act="edittask" node-data="{{$value.id}}"><i class="icofont-edit"></i></a><!--a class="btn btn-small" title="更新任务" href="javascript:;" node-act="updatetask" node-data="{{$value.id}}"><i class="icofont-edit"></i></a--></td>'+
					'</tr>'+
					'{{/each}}';
		var render = template.compile(tmpl);
		template.helper('$progress', function(v1){
			return ({
				"0":"未启动",
				"1":"已启动",
				"2":"25%",
				"3":"50%",
				"4":"75%",
				"5":"已完成",
				"6":"暂停"
			})[v1]
		})

		var tpl = render({list:list});
		
		$('#tasklist tbody').html(tpl);

		/*if(oTaskTables){
			oTaskTables.fnDestroy();
		}
		oTaskTables = $('#tasklist').dataTable({
			"sPaginationType": "bootstrap",
			"oLanguage": {
				"sSearch": "搜索:",
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sZeroRecords": "没有检索到数据",
				"sInfo": "显示 _START_ 至 _END_ 条 &nbsp;&nbsp;共 _TOTAL_ 条",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "末页"
				}
			}
		});*/
	}

	function fetchTask(type){
		var projectid = location.hash?location.hash.substr(1):'';
		var isself = type=="my";
		if(!projectid) return;
		task._cur = type;
		jsonReq.post('/open/project','getTask',{"projectid":projectid,"isself":isself},function(d){
			getTaskListView(d.result);
		})
		
		jsonReq.post('/open/project','getMilestone',{"projectid":projectid},function(d){
			var tpl = '<option value="">请选择</option>',ms;
			for(var i =0;i< d.result.length;i++){
				ms = d.result[i];
				tpl += '<option value="'+ms.id+'">'+ms.name+'</option>';
			}
			$('#select_milestone').html(tpl).select2('val','')
		})
	}
	fetchTask('my');

	function editTaskView(data){
		var form = $('#layer-addtask');
		form.find('[name]').each(function(){
			if($(this)[0].nodeName == "SELECT"){
				$(this).select2('val',data[$(this).attr('name')])
			}else{
				$(this).val(data[$(this).attr('name')])	
			}
		})
	}

	function closeDialog(el){
		$('#masklayer').hide();
		el.addClass('fade hide').removeClass('active');
		el.find('form')[0].reset();
	}

	$('#tasklist').on('click','[node-act="edittask"]',function(){
		var id = $(this).attr('node-data');
		$('#sub_add_task').text('保存')
		jsonReq.post('/open/project','task',{id:id},function(d){
			var data = d.result[0];
			data.manager = data.manager_id;
			editTaskView(data);
			$('#layer-addtask').slideDown();
			task.editid = data.id;
		})
	}).on('click','[node-act="updatetask"]',function(){
		var id = $(this).attr('node-data');
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
		$('#layer_updatetask').data('taskid',id).removeClass('fade hide').addClass('active');
	})

	$('#layer_updatetask').on('click',"[node-act]",function(){
		var that = $(this),act = $(this).attr('node-act'),el = that.closest('[role="dialog"]');
		if(act == "close"||act=="cancel"){
			closeDialog(el);
		}
		if(act == 'sure'){
			closeDialog(el);
		}
	})

	var uploadify = new CNC.Uploadify($('#task_file_input'),{
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
			$('#task_file_list').append('<dt><a target="_blank" href="javascript:;">'+d.result.name+'</a></dt>')
		},
		'extendParams' : function(){
			var projectid = location.hash?location.hash.substr(1):'';
			this.params.projectid = projectid;			
			this.params.taskid = $('#layer_updatetask').data('taskid');
		}
    });
})

$(function(){
	var date = new Date(),
		strDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
	$('[data-form="datepicker"]').attr('data-date',strDate).datepicker();
	$('[data-form="datepicker"] input').val(strDate)

	function setContactList(id){
		var i = 0;
		if(contact_list.length < 1){
			setTimeout(function(){
				setContactList(id)
			},500);
			return;
		}
		var tpl = '<option value="">请选择</option>';
		for(var o in contact_list){
			row = contact_list[o];
			tpl += '<option value="'+row['id']+'">'+row['name']+'</option>';
			i++;
		}
		$(id).append(tpl);
		$(id).select2();
		$(id).select2('val','');
	}
	setContactList('[name="manager"]');
	setContactList('[name="member"]');

	$('[data-form=uniform]').uniform();
	$('[data-form="select2"]').select2();
})