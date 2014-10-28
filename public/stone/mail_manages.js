$('#datatables').dataTable({
		"sPaginationType": "bootstrap",
		"oLanguage": Global.oLanguage
	});

$('[data-form="uniform"]').uniform();

$('#maillist').on('click','[node-act="del"]',function(){
	var tr = $(this).closest('tr'), id = tr.data('id');
	jsonReq.post('/open/mail','removeAccount',{id:id},function(d){
		if(d.result){
			tr.remove();
		}
	})
})

$('#maillist').on('click','[node-act="setdefault"]',function(){
	var tr = $(this).closest('tr'), id = tr.data('id');
	jsonReq.post('/open/mail','setDefault',{id:id},function(d){
		if(d.result){
			location.reload();
		}
	})
})