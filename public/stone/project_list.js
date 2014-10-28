;(function(){
	
	jsonReq.post('/open/project','fetch',{},function(d){
		renderList(d.result);
	})

	function renderList(d){
		var tpl = '',l;
		for(var i=0;i<d.length;i++){
			l = d[i];
			tpl += '<tr><td><a href="/project/detail#'+l.id+'" >'+l.name+'</a></td><td></td><td>'+getStatus(l.status)+'</td><td>'+l.start_time+'</td><td>'+l.update_time+'</td></tr>'
		}
		$('#datatables tbody').html(tpl);
		$('#datatables').dataTable({
			"sPaginationType": "bootstrap",
			"oLanguage": {
				"sSearch": "搜索:",
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sZeroRecords": "没有检索到数据",
				"sInfo": "显示 _START_ 至 _END_ 条 &nbsp;&nbsp;共 _TOTAL_ 条",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "末页"
				}
			}
		})
	}

	function getStatus(code){
		return ({
			'0' : '正常'
		})[code]
	}
})()