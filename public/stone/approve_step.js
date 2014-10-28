;(function(){

	var setVisibleStep,getCompIdByName,tmplid,approveid = location.hash.substr(1);
	
	var stepData = {},sendids = [],step;

	jsonReq.post('/open/approve','show',{id:approveid},function(data){
		var strUsers = [];
		stepData = data.result;
		step = stepData.status;
		$('#approve_name p span').html(stepData.name);
		$(stepData.users).each(function(){
			strUsers.push('<em>'+this.name+'</em>')
			sendids.push(this.id);
		})
		$('#next-user span').html(strUsers.join(','))

		if(stepData.end){
			$('#btn-send,#btn-back,#btn-complete,#senderEl').remove();
		}

		if(stepData.flow.terminal == 1){
			$('#btn-complete').show();
		}

		if(!stepData.hasNext){
			$('#btn-send').remove();
		}
		jsonReq.post('/open/approve','get',[stepData.tmpl_id],function(d){
			initTemplate(d.result);
		})
	})

	function formatComps(){
		var coms = stepData.components,arr = [],o;
		for(var i=0;i<coms.length;i++){
			o = {};
			o[coms[i].id] = coms[i].value;
			arr.push(o)
		}
		return arr;
	}

	function transObject(arr){
		var b  = {},c = [];
		$(arr).each(function(){
			$.extend(b,this);
		})
		for(var o in b){
			var s = {};
			s[o] = b[o]
			c.push(s)
		}
		return c;
	}

	$('#btn-send').click(function(){
		var coms = getCompIdByName(step-1);

		jsonReq.post('/open/approve','next',{
			approveid:approveid,
			components : transObject(formatComps().concat(coms)),
			sender : sendids.join(',')
		},function(d){
			if(d.result){
				location.href = '/approve/deal'
			}
		})
		return false;
	})

	$('#btn-back').click(function(){
		var coms = getCompIdByName(step-1);

		jsonReq.post('/open/approve','back',{
			approveid:approveid,
			components : formatComps().concat(coms),
			sender : sendids.join(',')
		},function(d){
			if(d.result){
				location.href = '/approve/deal'
			}
		})
		return false;
	})
	
	$('#btn-complete').click(function(){
		var coms = getCompIdByName(step-1);

		jsonReq.post('/open/approve','complete',{
			approveid:approveid,
			components : formatComps().concat(coms)
		},function(d){
			if(d.result){
				location.href = '/approve/deal'
			}
		})
		return false;
	})

	function initTemplate(data){

		$('#table').html(data.content).find('table').addClass('table table-bordered responsive dataTable');

		var date = new Date(),
			dateStr = date.getFullYear()+"-"+(date.getMonth()+1)+'-'+date.getDate()+' 00:00:00';
		
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

		function fStepDataComs(arr){
			var obj = {},narr = [];
			for(var i=0;i<arr.length;i++){
				obj[arr[i].id] = arr[i].value;
			}
			for(var o in obj){
				var to = {};
				to[o] = obj[o];
				narr.push(to)
			}
			return narr;
		}


		getCompIdByName = function(step){
			var arr = [];
			$(data.components).each(function(){
				if(this.flowsets[step].editable){
					var o = {};
					o[this.id] = $('#table [name="'+this.name+'"]').val();
					arr.push(o)
				}
			})
			
			return arr;
		}

		function setComById(){
			var stepComs = stepData.components,stepCom;
			var arr = [];
			for(var i=0;i<stepComs.length;i++){
				stepCom = stepComs[i];
				for(var j=0;j<data.components.length;j++){
					if(stepCom.id == data.components[j].id){
						var el = $('#table').find('[name="'+data.components[j].name+'"]');
						if(el.attr('data-form') == "datepicker"){
							el.attr('data-date',stepCom.value).val(stepCom.value);
						}else{
							el.val(stepCom.value)
						}
					}
				}
			}
		}
		setComById()

		setVisibleStep = function(step){
			var arr = [],index = Number(step)-1;
			if(stepData.end) return '';
			$(data.components).each(function(){
				if(this.flowsets[index] && this.flowsets[index].editable){
					arr.push('[name="'+this.name+'"]');
				}
			})
			return arr.join(',');
		}
		
		var namefilters = setVisibleStep(stepData.status);
		$(namefilters).each(function(){
			if($(this).attr('data-form') == "datepicker"){
				if($(this).val() == "年-月-日 时:分:秒"){
					$(this).val(dateStr)
				}
				$(this).datepicker();
			}else if($(this).attr('data-form') == "select2"){
				$(this).removeAttr('disabled').removeAttr('readonly');
				$(this).css('width',220).select2();
			}else{
				$(this).removeAttr('disabled').removeAttr('readonly');
			}
		})
	}
	
})()