$(function(){
	
	var editObject = {
		editel : $('#approve_nav ul li a:eq(0)'),
		id : $('#approve_nav ul li a:eq(0)').attr('href').split("-")[2]
	};

	function closeDialog(el){
		$('#masklayer').hide();
		el.addClass('fade hide').removeClass('active');
		el.find('form')[0].reset();
	}

	$('#approve_new_type').on('click',"[node-act]",function(){
		var that = $(this),act = $(this).attr('node-act'),el = that.closest('[role="dialog"]'),name = el.find('[name="approvetypename"]').val();
		if(act == "close"||act=="cancel"){
			closeDialog(el);
		}
		if(act == 'sure'){
			jsonReq.post('/open/approve','typeAdd',{
				name : name
			},function(data){
				if(data.result){
					$('#approve_nav ul').append('<li><a data-toggle="tab" href="#boxtab-left-'+data['result']+'">'+name+'</a></li>');
					$('#approve_content ul').append('<div class="tab-pane fade" id="boxtab-left-'+data['result']+'"></div>');
					closeDialog(el);
				}
			})
		}
	})

	$('#layer_rename').on('click',"[node-act]",function(){
		var that = $(this),act = $(this).attr('node-act'),el = that.closest('[role="dialog"]'),name = el.find('[name="rename"]').val();
		if(act == "close"||act=="cancel"){
			closeDialog(el);
		}
		if(act == 'sure'){
			jsonReq.post('/open/approve','typeRename',{
				name : name,
				id : editObject.id
			},function(data){
				if(data.result){
					editObject.editel.text(name)
					editObject = {};
					closeDialog(el);
				}
			})
		}
		if(act == "del"){
			jsonReq.post('/open/approve','typeDel',{
				id : editObject.id
			},function(data){
				if(data.result){
					var curNode = editObject.editel.parent();
						nextNode = curNode.next();
					curNode.remove();
					nextNode.find('a').trigger('click');
					closeDialog(el);
				}
			})
		}
	})

	$('#new_type').click(function(){
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

		$('#approve_new_type').removeClass('fade hide').addClass('active');
	})

	$('#rename_type').click(function(){
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

		$('#layer_rename').removeClass('fade hide').addClass('active').find('[name="rename"]').val(editObject.editel.text());
	})

	$('#approve_nav ul').on('click','li a',function(){
		editObject.editel = $(this);
		editObject.id = $(this).attr('href').split("-")[2];
		$('#new_temp').attr('href','new#id='+editObject.id)
	})
})