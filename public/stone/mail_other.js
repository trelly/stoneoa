;(function(){	
	$('[data-form=uniform]').uniform();
	$('#btn-create').click(function(){
		var account = $('#mail').serializeArray();
                var accounts = {};
		for(var i in account){
                    accounts[account[i]['name']] = account[i]['value'];
                }
                console.log(accounts);
		jsonReq.post('/open/mail','addAccount',{account:accounts},function(d){
			if(d.result){
				location.href = "/mail/manages#"+d.result
			}else{
				alert('绑定失败')	
			}
		})
		return false;
	})
})()