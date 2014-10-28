;(function(){
	
	$('#loginbtn').click(function(){
		login();
	})
	
	$('#login_username,#login_password').keyup(function(){
		$(this).next('span').remove();
		$(this).closest('.control-group').removeClass('error');
		$('#tips').hide()
	})
	
	function login(){
		var email = $('#login_username').val(),
			password = $('#login_password').val(),
			auto = $('#autologin').attr('checked')?true:false;
		
		if(!$.trim(email)){
			$('#login_username').next('.help-inline').remove();
			$('#login_username').after('<span class="help-inline">请输入用户名</span>').closest('.control-group').addClass('error');
			return false;
		}
		if(!$.trim(password)){
			$('#login_password').next('.help-inline').remove();
			$('#login_password').after('<span class="help-inline">请输入密码</span>').closest('.control-group').addClass('error');
			return false;
		}
		$('#tips').removeClass('error').find('.controls').html('登录中...');
		jsonReq.post('/open/user',"login",{email:email,password:password,auto:auto},function(data){
			if(data.result){
				location.href = '/';
			}else{
				$('#tips').addClass('error').show().find('.controls').html('<span class="help-inline">'+data.error.message+'</span>')
			}
		})
		
		return false;
	}

	function formatObject(str){
		var arr = str.split('&'),o = {},tmp = "";
		for(var i=0;i<arr.length;i++){
			tmp = arr[i].split('=');
			o[tmp[0]] = tmp[1]
		}
		return o;
	}

	function initStep(){
		var oSearch = location.search.substr(1);
		var params = formatObject(oSearch),
			token = params['token'],
			email = params['username'];
		if(token){
			$('#modal-recover').modal('toggle');
			$('#step1').hide();
			$('#step2').show();
			$('#step2 [name="token"]').val(token);
			$('#login_username').val(email)
		}
	}

	initStep();

	$('#getToken').click(function(){
		var email = $('#login_username').val();

		jsonReq.post('/open/user','findPassword',{email:email},function(d){
			if(d.result){
				$('#findpswTip').text('已经发送到邮箱！').parent().removeClass('error');
				/*setTimeout(function(){
					$('#step1').hide();
					$('#step2').show();
				},2000)*/
			}else{
				$('#findpswTip').text('发送失败，请重试').parent().addClass('error');
			}
		})
	})

	$('#forget-passwd').click(function(){
		var email = $('#login_username').val();

		if(!email){
			$('#login_username').next('.help-inline').remove();
			$('#login_username').after('<span class="help-inline">请输入用户名</span>').closest('.control-group').addClass('error');
			return false;
		}

		$('#step1').show();
		$('#step2').hide();
		$('#findpswTip').text('');

		jsonReq.post('/open/user',"getEmail",{email:email},function(d){
			if(d.result){
				$('#safeemail span').text(d.result.name)
			}
		})
		$('#modal-recover').modal('toggle');
	})

	$('#changePsw').click(function(){
		var psw = $('#step2 [name="psw"]').val(),
			repsw = $('#step2 [name="repsw"]').val(),
			token = $('#step2 [name="token"]').val(),
			email = $('#login_username').val();
		if(!psw){
			$('#updatepswTip').text('请输入新的密码').addClass('error');
			return false;
		}
		if(psw != repsw){
			$('#updatepswTip').text('两次输入的密码不一致').addClass('error');
			return false;
		}
		if(!token){
			$('#updatepswTip').text('请输入授权码').addClass('error');
			return false;
		}
		jsonReq.post('/open/user','updatePassword',{
			token : token,
			email : email,
			password : psw
		},function(d){
			if(d.result){
				location.href = "/system/sign"
			}else{
				$('#updatepswTip').text('修改失败').addClass('error');
			}
		})
	})
})()