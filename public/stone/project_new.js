;(function(){
	setContactList("pro_group");

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

	
	$('[data-form=uniform]').uniform();


	$('#btn-create').click(function(){
		var title = $('#pro_name').val(),
			participants = $('#pro_group').val();
		
		jsonReq.post('/open/project','add',{title:title,participants:participants},function(d){
			if(d.result){
				location.href = "/project/detail#"+d.result
			}
		})
		return false;
	})
})()