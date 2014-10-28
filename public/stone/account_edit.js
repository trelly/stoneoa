$('[data-form="uniform"]').uniform();
$('#btn-create').click(function(){
	var id = $('#idHidden').val();
	var account = $('#mail').serializeArray();
			var accounts = {};
	for(var i in account){
		accounts[account[i]['name']] = account[i]['value'];
	}
	accounts.id = id;
	jsonReq.post('/open/mail','addAccount',{account:accounts},function(d){
		if(d.result){
			location.href = "/mail/manages#"+d.result
		}
	})
	return false;
})