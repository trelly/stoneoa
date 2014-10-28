$(function(){
	
	var id = location.hash.substr(1)
	
	jsonReq.post('/open/approve','get',[id],function(d){
		//console.log(d.result.components)
		initTemplate(d.result);
	})

	var editor = UE.getEditor('editor');
	$(window).resize(function(){
		var width = $('.gallery').width();
		$('.edui-editor,.edui-editor-toolbarboxinner,.edui-editor-iframeholder').width(width)
	})
	
	function initTemplate(cjson){
		//var cjson = {"tmplid":0,"name":"请假申请单","typeid":"12","used":false,"flows":[{"id":1,"name":"提交请假单","desc":"","terminal":false,"sendid":""},{"id":2,"name":"部门审批","desc":"","terminal":true,"sendid":"3"},{"id":3,"name":"人事备案","desc":"","terminal":true,"sendid":""}],"components":[{"name":"user","default":"","type":"INPUT","sflowsets":["1"],"width":"250","height":"100","options":"","flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"date","default":"","type":"DATE","sflowsets":["1"],"flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"htype","default":"","type":"SELECT","options":"年假\n事假\n婚假\n调休","sflowsets":["1"],"width":"250","height":"100","flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"reason","default":"","type":"TEXTAREA","sflowsets":["1"],"width":"250","height":"100","options":"","flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"from","default":"","type":"DATE","sflowsets":["1"],"flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"to","default":"","type":"DATE","sflowsets":["1"],"flowsets":[{"editable":true,"fidx":1},{"editable":false,"fidx":2},{"editable":false,"fidx":3}]},{"name":"depother","default":"","type":"TEXTAREA","sflowsets":["2"],"width":"250","height":"100","options":"","flowsets":[{"editable":false,"fidx":1},{"editable":true,"fidx":2},{"editable":false,"fidx":3}]},{"name":"dep","default":"","type":"SELECT","options":"同意\n不同意","sflowsets":["2"],"width":"250","height":"100","flowsets":[{"editable":false,"fidx":1},{"editable":true,"fidx":2},{"editable":false,"fidx":3}]},{"name":"hr","default":"","type":"SELECT","options":"同意\n不同意","sflowsets":["3"],"width":"250","height":"100","flowsets":[{"editable":false,"fidx":1},{"editable":false,"fidx":2},{"editable":true,"fidx":3}]},{"name":"hrother","default":"","type":"TEXTAREA","sflowsets":["3"],"width":"250","height":"100","options":"","flowsets":[{"editable":false,"fidx":1},{"editable":false,"fidx":2},{"editable":true,"fidx":3}]}],"content":"<table data-sort=\"sortDisabled\"><tbody><tr class=\"firstRow\"><td valign=\"top\" rowspan=\"1\" colspan=\"4\" style=\"word-break: break-all;\" align=\"center\"><span style=\"font-size: 36px;\">请假单</span><br/></td></tr><tr><td width=\"215\" valign=\"top\" style=\"word-break: break-all;\">申请人：<br/></td><td width=\"215\" valign=\"top\" style=\"word-break: break-all;\"><input type=\"text\" readonly=\"true\" steps=\"1\" name=\"user\" value=\"\"/></td><td width=\"215\" valign=\"top\" style=\"word-break: break-all;\">申请时间：</td><td width=\"215\" valign=\"top\"><input data-form=\"datepicker\" class=\"grd-white\" data-date=\"2012-12-02\" data-date-format=\"yyyy-mm-dd\" data-time-format=\"hh:mm:ss\" name=\"date\" size=\"16\" type=\"text\" value=\"年-月-日 时:分:秒\" readonly=\"true\"/></td></tr><tr><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">请假类型：<br/></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><select readonly=\"true\" disabled=\"disabled\" steps=\"1\" name=\"htype\"><option>年假</option><option>事假</option><option>婚假</option><option>调休</option></select></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">请假原因：</td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><textarea readonly=\"true\" steps=\"1\" name=\"reason\"></textarea></td></tr><tr><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">请假时间：从<br/></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><input data-form=\"datepicker\" class=\"grd-white\" data-date=\"2012-12-02\" data-date-format=\"yyyy-mm-dd\" data-time-format=\"hh:mm:ss\" name=\"from\" size=\"16\" type=\"text\" value=\"年-月-日 时:分:秒\" readonly=\"true\"/></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">到：</td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><input data-form=\"datepicker\" class=\"grd-white\" data-date=\"2012-12-02\" data-date-format=\"yyyy-mm-dd\" data-time-format=\"hh:mm:ss\" name=\"to\" size=\"16\" type=\"text\" value=\"年-月-日 时:分:秒\" readonly=\"true\"/></td></tr><tr><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">领导意见：<br/></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\"><select readonly=\"true\" disabled=\"disabled\" steps=\"2\" name=\"dep\"><option>同意</option><option>不同意</option></select></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">附言：</td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><textarea readonly=\"true\" steps=\"2\" name=\"depother\"></textarea><span id=\"_baidu_bookmark_start_15\" style=\"display: none; line-height: 0px;\">‍</span></td></tr><tr><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">人事部审批：<br/></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><select readonly=\"true\" disabled=\"disabled\" steps=\"3\" name=\"hr\"><option>同意</option><option>不同意</option></select></td><td valign=\"top\" colspan=\"1\" rowspan=\"1\" style=\"word-break: break-all;\">附言：</td><td valign=\"top\" colspan=\"1\" rowspan=\"1\"><textarea readonly=\"true\" steps=\"3\" name=\"hrother\"></textarea></td></tr></tbody></table><p><br/></p>"};

		var html = template.render('approve_name_tmpl', cjson);
		$('#approve_name_container').html(html);

		var html1 = template.render('approve-steps-tmpl', {list:cjson.flows});
		$('#approve-steps').html(html1);
		

		 // select2
		 $('[data-form=select2]').select2();
		 $('[data-form=select2-group]').select2();

		 // uniform
		 $('[data-form=uniform]').uniform();
		

		function setContactList(id,val){
			var i = 0;
			if(contact_list.length < 1){
				setTimeout(function(){
					setContactList(id,val)
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
			$('#'+id).select2().select2('val',val);
		}


		function init(){
			editor.addListener( 'ready', function() {
				 editor.setContent(cjson.content );
			});

			$('#approve-steps select[name="approver"]').each(function(i){
				//console.log($(this),i)
				setContactList($(this).attr('id'),cjson.flows[i].sendid);
			})
		}
		init();

		editor.addListener('contentChange',function(){
			var content = $(editor.getContent());
			for(var i=0;i<cjson.components.length;i++){
				var com = cjson.components[i];
				if(content.find('[name="'+com['name']+'"]').length<1){
					cjson.components.splice(i,1);
					continue;
				}
			}
		})

		$(document).on('showapprove',function(e,data){
			Dialog.approve(data.type,function(html){
				$(document).trigger('insertHTML',{html:html});
			});
		})


		function checkReName(name){
			var content = $(editor.getContent());
			for(var i=0;i<cjson.components.length;i++){
				var com = cjson.components[i];
				if(content.find('[name="'+com['name']+'"]').length<1){
					cjson.components.splice(i,1);
					continue;
				}
				if(name == com['name']){
					return false
				}
			}
			return true;
		}

		$(document).on('checkComponent',function(e,data){
			var res = checkReName(data.component.name);
			if(res){
				cjson.components.push(data.component);
			}
			data.callback(res);
		})
		
		 var typeid = location.hash.substr(4);

		 jsonReq.post('/open/approve',"types",{},function(data){
			var rows = data.result,tpl='',row,i=1;
			for(var o in rows){
				row = rows[o];
				tpl += '<option value="'+row["id"]+'">'+row['name']+'</option>'
			}	
			$('#group_selector').html(tpl).select2("val",cjson.typeid)
		})

		$('#group_selector').change(function(){
			typeid = $(this).val();
		})

		 $('#btn-add-step').click(function(){
			var len = $('#approve-steps .control-group').length+1,randId = new Date().getTime();
			var tpl = '<div class="control-group">'
					+'		<label class="control-label" for="inputSelectMulti">第'+len+'步</label>'
					+'		<div class="controls">'
					+'		<p><input type="text" class="grd-white" placeholder="步骤名"  name="step" />&nbsp;<input  name="stepdesc" type="text" class="grd-white" placeholder="步骤说明" />'
					+'      <a style="margin:0 0 0 5px;" href="javascript:;" class="icofont-remove"></a></p>'
					+'		<select id="contact_'+randId+'" data-form="select2" name="approver" style="width:220px" data-placeholder="审批人" multiple="">'

					+'		</select>'
					+'		<label class="checkbox" style="padding:0;">	<input id="step'+len+'" type="checkbox" data-form="uniform" name="stependable" value="1" />可在此结束流程</label>'
					+'		</div>'
					+'	</div> ';
			$('#approve-steps').find('.icofont-remove').hide();
			$('#approve-steps').append(tpl);
			$('#step'+len).uniform()
			
			setContactList("contact_"+randId);
		 })
		

		$('#approve-steps').on('click','.icofont-remove',function(){
			var p = $(this).closest('.control-group'),flowid = p.attr('data-id');
			jsonReq.post('/open/approve','flowRemove',{flowid:flowid},function(d){
				if(d.result){
					p.remove();
					$('#approve-steps').find('.icofont-remove:last').show();
				}else{
					alert('删除失败')
				}
			})
			return false;
		})
		$('#approve-steps').find('.icofont-remove:last').show();


		function getCjson(){
			var stepslen = $('[name="step"]').length;

			cjson['name'] = $('[name="name"]').val();
			cjson['typeid'] = $('[name="type"]').val();
			cjson['content'] = editor.getContent();
			cjson['flows'] = [];

			$('[name="step"]').each(function(i){
				var approvers = $('[name="approver"]').eq(i).val();
				var p = $(this).closest('.control-group'),flowid = p.attr('data-id')||0;
				cjson['flows'].push({
					"id": flowid,
					"name": $(this).val(),
					"desc": $('[name="stepdesc"]').eq(i).val(),
					"terminal": $('[name="stependable"]').eq(i).attr('checked')?true:false,
					"sendid": approvers?approvers.join(','):''
				});
			})

			$(cjson['components']).each(function(i){
				var o,arr = []
				for(var j=0;j<stepslen;j++){
					o = {};
					if($.inArray((j+1)+'',this.sflowsets) == -1){
						o["editable"] = false 
					}else{
						o["editable"] = true 	
					}
					o.fidx = j+1;
					arr.push(o);
				}
				this.flowsets = arr;
			})

		}

		$('#btn-save').click(function(){
			getCjson();
			var params = $.extend({ispublish:0},cjson);
			$.post('/approve/templateadd',{tmpl:JSON.stringify(cjson)},function(data){
				if(data.result){
					location.href = "/approve/set"
				}
			},'json')
		})

		$('#btn-publish').click(function(){
			getCjson();
			var params = $.extend({ispublish:1},cjson);
			$.post('/approve/templateadd',{tmpl:JSON.stringify(cjson)},function(data){
				if(data.result){
					location.href = "/approve/set"
				}
			},'json')		
		})
	}

})