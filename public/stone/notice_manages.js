;(function(){
	$('#annlist').on('click','[act="del"]',function(){
		var did = $(this).attr('did');
		var that = $(this);
		jsonReq.post('/open/announce','del',{'did':did},function(d){
			if(d.result){
				that.closest('tr').remove();
			}
		})
	})
})()