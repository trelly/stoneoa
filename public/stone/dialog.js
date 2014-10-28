;(function($){
	var defaultComponentData = {
			"idx": 1,
			"type": "TEXTFIELD",
			"name": "",
			"default": "",
			"width": "250",
			"height": "100",
			"options": "",
			"flowsets": [
				/*{
					"fidx": 1,
					"editable": true
				},
				{
					"fidx": 2,
					"editable": false
				}*/
			]
		};

	function initApproveDialog(type){
		var steps = $('#approve-steps .control-group').length;
		$('#approveSteps').html('');
		for(var i=0;i<steps;i++){
			$('#approveSteps').append('<option value="'+(i+1)+'">第'+(i+1)+'步</option>')
		}
		$('#approveSteps').select2('val',1);
		$('#approveInitC').show();


		if(type == 'select'){
			$('#approveOptionsC').show();
			$('#approveOptions').select2();
			$('#approveInitC').hide();
		}
		if(type == "datetime"){
			$('#approveInitC').hide();			
		}
		$('#approveSteps').select2('val',[1]);
	}

	function createInput(){
		var obj = {
			'name' : $('#approveInputName').val(),
			'default' : $('#approveInit').val(),
			'type' : 'INPUT',
			'sflowsets' : $('#approveSteps').select2('val'),
			"width": "250",
			"height": "100",
			"options": ""
		};
		
		return {
			componentData : obj,
			html :'<input type="text" readonly="true" steps="'+$('#approveSteps').select2('val')+'" name="'+$('#approveInputName').val()+'" value="'+$('#approveInit').val()+'" />'
		}
	}

	function createTextarea(){
		var obj = {
			'name' : $('#approveInputName').val(),
			'default' : $('#approveInit').val(),
			'type' : 'TEXTAREA',
			'sflowsets' : $('#approveSteps').select2('val'),
			"width": "250",
			"height": "100",
			"options": ""
		};
		
		return {
			componentData : obj,
			html : '<textarea readonly="true" steps="'+$('#approveSteps').select2('val')+'" name="'+$('#approveInputName').val()+'">'+$('#approveInit').val()+'</textarea>'
		}
	}

	function createSelect(){		
		var ovals = $('#approveOptions').select2('val');

		var obj = {
			'name' : $('#approveInputName').val(),
			'default' : $('#approveInit').val(),
			'type' : 'SELECT',
			'options' : ovals.join('\n'),
			'sflowsets' : $('#approveSteps').select2('val'),
			"width": "250",
			"height": "100"
		};
		

		var tpl = '<select data-form="select2" readonly="true" disabled="disabled" steps="'+$('#approveSteps').select2('val')+'" name="'+$('#approveInputName').val()+'" >'
		
		for(var i=0;i<ovals.length;i++){
			tpl += '<option>'+ovals[i]+'</option>';
		}
		tpl += '</select>';
		
		return {
			componentData : obj,
			html : tpl
		}
	}
	
	function createDateTime(){
		var obj = {
			'name' : $('#approveInputName').val(),
			'default' : $('#approveInit').val(),
			'type' : 'DATE',
			'sflowsets' : $('#approveSteps').select2('val'),
			"width": "250",
			"height": "100",
			"options": ""
		};
		
		return {
			componentData : obj,
			html : '<input data-form="datepicker" class="grd-white" steps="'+$('#approveSteps').select2('val')+'" data-date="2012-12-02" data-date-format="yyyy-mm-dd" data-time-format="hh:mm:ss" name="'+$('#approveInputName').val()+'" size="16" type="text" value="年-月-日 时:分:秒" readonly="true"/>'
		}
	}

	function getHtml(type){
		var html = '',nameEl = $('#approveInputName');
		if($.trim(nameEl.val()) == ""){
			nameEl.css('border-color','red');
			setTimeout(function(){
				nameEl.css('border-color','');			
			},1000)
			return false;
		}
		switch(type){
			case 'input':
				html = createInput();
			break;
			case 'textarea':
				html = createTextarea();
			break;
			case 'select':
				html = createSelect();
			break;
			case 'datetime':
				html = createDateTime();
			break;
			default:
			break;
		}
		return html;
	}

	var Dialog = {
		approve : function(type,callback){
			
			initApproveDialog(type);
			
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

			$('#approveLayer1').removeClass('hide fade').addClass('active')
			.on('click','[node-act]',function(e){
				var act = $(this).attr('node-act'),that = $(this);
				if(act == "cancel"||act=="close"){
					callback('');
					Dialog.fireClose(act,$(this).closest('[role="dialog"]'));
				}else if(act=="sure"){
					var html = getHtml(type);
					if(!html){
						return false;
					}
					if(!$('#approveSteps').val()){
						$('#s2id_approveSteps ul').css('border-color','red');
						setTimeout(function(){
							$('#s2id_approveSteps ul').css('border-color','');
						},300)
						return false;
					}
					$(document).trigger('checkComponent',{
						component : html.componentData,
						callback : function(res){
							if(res){
								callback(html.html)
								Dialog.fireClose(act,that.closest('[role="dialog"]'));
							}else{
								alert('重名了')
							}
						}
					})
					//$(document).trigger('addComponent',html.componentData)
				}else if(act=="addlink"){
					$('#approveNewOptionC').show();	
					return false;
				}else if(act == "addOption"){
					var v = $('#approveNewOption').val();
					if($.trim(v)||v===0||v===false){
						$('#approveOptions').append('<option selected>'+$.trim(v)+'</option>').select2('destroy').select2();
						$('#approveNewOption').val('')
					}
					return false;
				}
			})
		},
		fireClose : function(event,el){
			el.addClass('hide fade').removeClass('active');
			$('#masklayer').hide();
			el.off('click');
			el.find('form')[0].reset();
			$('#approveNewOptionC').hide();	
			$('#approveOptionsC').hide();
			$('#approveOptions').val(['同意','不同意']);
		}
	}

	$.extend(window,{'Dialog':Dialog});
})(jQuery)