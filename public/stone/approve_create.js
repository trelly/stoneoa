;(function(){

	$('#btn-begin').click(function(){
		if(!typeSelected) return;
		$('#table,#senderEl').fadeIn();
		var namefilters = setVisibleStep(1);
		$(namefilters).removeAttr('disabled').removeAttr('readonly');
	})

	var setVisibleStep,getCompIdByName,tmplid;

	//var data = {"tmplid":0,"name":"请假申请单","typeid":"7","used":false,"flows":[{"id":1,"name":"提交请假单","desc":"","terminal":false,"sendid":""},{"id":2,"name":"部门审批","desc":"","terminal":false,"sendid":""},{"id":3,"name":"人事备案","desc":"","terminal":false,"sendid":""}],"components":[{"name":"user","default":"","type":"INPUT","sflowsets":["1"],"width":"250","height":"100","options":"","flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"date","default":"","type":"DATE","sflowsets":["1"],"flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"htype","default":"","type":"SELECT","options":"年假\n事假\n婚假\n调休","sflowsets":["1"],"width":"250","height":"100","flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"reason","default":"","type":"TEXTAREA","sflowsets":["1"],"width":"250","height":"100","options":"","flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"from","default":"","type":"DATE","sflowsets":["1"],"flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"to","default":"","type":"DATE","sflowsets":["1"],"flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"depother","default":"","type":"TEXTAREA","sflowsets":["2"],"width":"250","height":"100","options":"","flowsets":[{"editable":false,"fidx":1},{"editable":true,"fidx":2},{"editable":false,"fidx":3}]},{"name":"dep","default":"","type":"SELECT","options":"同意\n不同意","sflowsets":["2"],"width":"250","height":"100","flowsets":[{"editable":false,"fidx":1},{"editable":true,"fidx":2},{"editable":false,"fidx":3}]},{"name":"hr","default":"","type":"SELECT","options":"同意\n不同意","sflowsets":["3"],"width":"250","height":"100","flowsets":[{"editable":false,"fidx":1},{"editable":false,"fidx":2},{"editable":true,"fidx":3}]},{"name":"hrother","default":"","type":"TEXTAREA","sflowsets":["3"],"width":"250","height":"100","options":"","flowsets":[{"editable":false,"fidx":1},{"editable":false,"fidx":2},{"editable":true,"fidx":3}]}],"content":"<table data-sort=\"sortDisabled\"><tbody><tr class=\"firstRow\"><td valign=\"top\" rowspan=\"1\" colspan=\"4\" style=\"word-break: break-all;\" align=\"center\"><span style=\"font-size: 36px;\">请假单</span><br/></td></tr><tr><td width=\"215\" valign=\"top\" style=\"word-break: break-all;\">申请人：<br/></td><td width=\"215\" valign=\"top\" style=\"word-break: break-all;\"><input type=\"text\" readonly=\"true\" steps=\"1\" name=\"user\" value=\"\"/></td><td width=\"215\" valign=\"top\" style=\"word-break: break-all;\">申请时间：</td><td width=\"215\" valign=\"top\"><input data-form=\"datepicker\" class=\"grd-white\" data-date=\"2012-12-02\" data-date-format=\"yyyy-mm-dd\" data-time-format=\"hh:mm:ss\" name=\"date\" size=\"16\" type=\"text\" value=\"年-月-日 时:分:秒\" readonly=\"true\"/></td></tr><tr><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">请假类型：<br/></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><select readonly=\"true\" disabled=\"disabled\" steps=\"1\" name=\"htype\"><option>年假</option><option>事假</option><option>婚假</option><option>调休</option></select></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">请假原因：</td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><textarea readonly=\"true\" steps=\"1\" name=\"reason\"></textarea></td></tr><tr><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">请假时间：从<br/></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><input data-form=\"datepicker\" class=\"grd-white\" data-date=\"2012-12-02\" data-date-format=\"yyyy-mm-dd\" data-time-format=\"hh:mm:ss\" name=\"from\" size=\"16\" type=\"text\" value=\"年-月-日 时:分:秒\" readonly=\"true\"/></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">到：</td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><input data-form=\"datepicker\" class=\"grd-white\" data-date=\"2012-12-02\" data-date-format=\"yyyy-mm-dd\" data-time-format=\"hh:mm:ss\" name=\"to\" size=\"16\" type=\"text\" value=\"年-月-日 时:分:秒\" readonly=\"true\"/></td></tr><tr><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">领导意见：<br/></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\"><select readonly=\"true\" disabled=\"disabled\" steps=\"2\" name=\"dep\"><option>同意</option><option>不同意</option></select></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">附言：</td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><textarea readonly=\"true\" steps=\"2\" name=\"depother\"></textarea><span id=\"_baidu_bookmark_start_15\" style=\"display: none; line-height: 0px;\">‍</span></td></tr><tr><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">人事部审批：<br/></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><select readonly=\"true\" disabled=\"disabled\" steps=\"3\" name=\"hr\"><option>同意</option><option>不同意</option></select></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">附言：</td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><textarea readonly=\"true\" steps=\"3\" name=\"hrother\"></textarea></td></tr></tbody></table><p><br/></p>"};
	
	var typeSelected = false,sendids = [];
	$('#group_selector').change(function(){
		$('#approve-steps').fadeIn();
		typeSelected = true;
		var val = $(this).val();
		$('#approve_name').val($(this).find('option[value="'+val+'"]').text())
		jsonReq.post('/open/approve','get',[val],function(d){
			initTemplate(d.result);
			//initTemplate(data);
			tmplid = val;
		})
		jsonReq.post('/open/approve','getUser',{tmpid:val},function(d){
			var arr = [];
			$(d.result).each(function(){
				sendids.push(this.id);
				arr.push('<em data-id="'+this.id+'">'+this.name+'</em>');
			})
			$('#next-user p span').html(arr.join(','))
		})
	})


	$('#btn-send').click(function(){
		var coms = getCompIdByName(0);

		jsonReq.post('/open/approve','send',{
			tmplid:tmplid,
			name:$('#approve_name').val(),
			components : coms,
			sender : sendids.join(',')
		},function(d){
			//console.log(d)
			location.href = '/approve/launch'
		})
		return false;
	})

	function initTemplate(data){

		$('#table').html(data.content).find('table').addClass('table table-bordered responsive dataTable');

		var date = new Date(),
			dateStr = date.getFullYear()+"-"+(date.getMonth()+1)+'-'+date.getDate()+' 00:00:00';
		
		//$('[data-form="datepicker"]').val(dateStr);//.datepicker();
		$('[data-form="select2"]').select2();
		
		var tmpl =  '{{each list}}'+
					'<div class="control-group">'+
					'    <label class="control-label">第{{$index+1}}步</label>'+
					'	<div class="controls">'+
					'		<p><span class="input-xlarge uneditable-input">{{$value.name}}</span></p>'+
					'		<p><span class="input-xlarge uneditable-input">{{$value.desc}}</span></p>'+
					'	</div>'+
					'</div>'+
					'{{/each}}';
		var render = template.compile(tmpl);

		var tpl = render({list:data.flows});
		$('#approve-steps-list').html(tpl);


		getCompIdByName = function(step){
			var arr = [];
			$(data.components).each(function(){
				if(this.flowsets[step]&&this.flowsets[step].editable){
					var o = {};
					o[this.id] = $('#table [name="'+this.name+'"]').val();
					arr.push(o)
				}
			})
			
			return arr;
		}

		function setContactList(id){
			var i = 0;
			if(contact_list.length < 1){
				setTimeout(function(){
					setContactList(id)
				},500);
				return;
			}
			var tpl = '';
			for(var o in contact_list){
				row = contact_list[o];
				tpl += '<option value="'+row['id']+'">'+row['name']+'</option>';
				i++;
			}
			$('#'+id).append(tpl);
			$('#'+id).select2();
		}
		setContactList('sender');

		setVisibleStep = function(step){
			var arr = [],index = Number(step)-1;
			$(data.components).each(function(){
				if(this.flowsets[index].editable){
					arr.push('[name="'+this.name+'"]');
				}
			})
			return arr.join(',');
		}


		var namefilters = setVisibleStep(1);
		$(namefilters).each(function(){
			if($(this).attr('data-form') == "datepicker"){
				if($(this).val() == "年-月-日 时:分:秒"){
					$(this).val(dateStr)
				}
				$(this).datepicker();
			}else if($(this).attr('data-form') == "select2"){
				$(this).removeAttr('disabled').removeAttr('readonly');
				$(this).select2();
			}else{
				$(this).removeAttr('disabled').removeAttr('readonly');
			}
		})
	}
	
})()