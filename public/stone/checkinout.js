;(function(){
	jsonReq.post('/json/attendance',"isCheck",{},function(data){
		if(data.result === false){
			$('#checkinout').text('签到');
		}else{
			$('#checkinout').text('签退');
		}

		$('#checkinout').click(function(){
			var _this = $(this);
			jsonReq.post('/json/attendance',"check",{},function(data){
				if(data.result !== false){
					if(_this.text() == "签退"){
						$('#checkinout').text('已签退');
					}else{
						$('#checkinout').text('签退');
					}
				}
			})
		})
	})
	
	var date = new Date();
	$('.muted').html(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())
})()