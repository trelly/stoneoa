$(document).ready(function() {
     var cjson = {
		"tmplid": 0,
		"name": "",
		"typeid": "",
		"used": false,
		"flows": [
			
		],
		"components": [
			
		],
		"content": ''
	}
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


     // select2
     $('[data-form=select2]').select2();
     $('[data-form=select2-group]').select2();

     // uniform
     $('[data-form=uniform]').uniform();
	
	 var typeid = location.hash.substr(4);

	 jsonReq.post('/open/approve',"types",{},function(data){
		var rows = data.result,tpl='',row,i=1;
		for(var o in rows){
			row = rows[o];
			tpl += '<option value="'+row["id"]+'">'+row['name']+'</option>'
		}	
		$('#group_selector').html(tpl).select2("val",typeid)
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
	
	 setContactList("contact_1");

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

	$('#approve-steps').on('click','.icofont-remove',function(){
		$(this).closest('.control-group').remove();
		$('#approve-steps').find('.icofont-remove:last').show();
		return false;
	})

	function getCjson(){
		var stepslen = $('[name="step"]').length;

		cjson['name'] = $('[name="name"]').val();
		cjson['typeid'] = $('[name="type"]').val();
		cjson['content'] = editor.getContent();
		cjson['flows'] = [];

		$('[name="step"]').each(function(i){
			var approvers = $('[name="approver"]').eq(i).val();
			cjson['flows'].push({
				"id": 0,
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
				o.fidx = 0;
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

 });

