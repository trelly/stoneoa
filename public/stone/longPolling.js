/*function longPolling() {
  $.ajax({
	  url: "/open/push",
	  data: JSON.stringify({
		id : "stone",
		method : 'message',
		params : {}
	}),
	  type : 'post',
	  dataType: "json",
	  timeout: 5000,
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		  $('#noticeUl').html('<li class="dropdown-header grd-white">暂无通知</li>');
		  $('#noticeTitle').attr('title','0条新消息').html('通知');
		  if (textStatus == "timeout") { // 请求超时
			  longPolling(); // 递归调用
		  } else {
			  longPolling();
		  }
	  },
	  success: function(data, textStatus) {
		 // console.log(data);
		  if (textStatus == "success") { // 请求成功
			  var tpl = '',item ,len = data.result.length;
			  for(var i=0;i<len;i++){
				item = data.result[i];
				tpl += ' <li class="new">'+
                       '     <a href="'+item['url']+'">'+
                       //'         <div class="notification">Request new order</div>'+
                       '         <div class="media">'+
                      // '             <img class="media-object pull-left" data-src="js/holder.js/30x30" />\
                       '             <div class="media-body">'+
                       '                 <h4 class="media-heading">'+item['title']+'</h4>'+
                       //'                 <p>Vegan fanny pack odio cillum wes anderson 8-bit.</p>\
                       '             </div>'+
                       '         </div>'+
                       '     </a>'+
                       ' </li>'
			  }
			  $('#noticeUl').html(tpl);
			  $('#noticeTitle').attr('title',len + '条新消息').html(len);
		  }else{
			$('#noticeUl').html('<li class="dropdown-header grd-white">暂无通知</li>');
			  $('#noticeTitle').attr('title','0条新消息').html('通知');
		  }
		  longPolling();
	  }
  });
}
longPolling()*/

function polling(){
	var types = {}
	jsonReq.post('/open/push','message',{},function(data){
		var tpl = '',item ,len = data.result?data.result.length:0;
		if(len == 0){
			$('#noticeUl').html('<li class="dropdown-header grd-white">暂无通知</li>');
			$('#noticeTitle').attr('title','0条新消息').html('通知');
		}else{
			for(var i=0;i<len;i++){
				item = data.result[i];
				tpl += ' <li class="new">'+
					   '     <a href="'+item['url']+'">'+
					   //'         <div class="notification">Request new order</div>'+
					   '         <div class="media">'+
					  // '             <img class="media-object pull-left" data-src="js/holder.js/30x30" />\
					   '             <div class="media-body">'+
					   '                 <h4 class="media-heading">'+item['title']+'</h4>'+
					   //'                 <p>Vegan fanny pack odio cillum wes anderson 8-bit.</p>\
					   '             </div>'+
					   '         </div>'+
					   '     </a>'+
					   ' </li>'
				if(item.type == 1){
					if(typeof types.approve == 'undefined'){
						types.approve = 1;
					}else{
						types.approve += 1;
					}
				}
				if(item.type == 2){
					if(typeof types.project == 'undefined'){
						types.project = 1;
					}else{
						types.project += 1;
					}
				}
			  }
			  $('#noticeUl').html(tpl);
			  $('#noticeTitle').attr('title',len + '条新消息').html(len);

			  types.project && $('#project_l_count').text(types.project);
			  types.approve && $('#approve_l_count').text(types.approve);
		}
		  setTimeout(polling,10000)
	})
}

polling();