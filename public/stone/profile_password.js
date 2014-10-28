;(function(){
	$('#save').click(function(){
		var op = $('#oldpasswd').val(),
			pwd = $('#passwd').val(),
			repwd = $('#repasswd').val();
		if(!op||!pwd||!repwd){
			alert('请填写完整信息');
			return false;
		}

		if(pwd !== repwd){
			alert('两次输入的新密码不一致');
			return false;
		}		

		jsonReq.post('/open/user','passwd',{'oldpasswords':op,'password':pwd},function(d){
			if(d.result == 1){
				alert('更新成功')
				location.reload();
			}else if(d.error){
				alert(d.error.message)
			}else{
				alert('更新失败')	
			}
		})
		return false;
	})
})()