
jsonReq.post('/api/json/class/role',"lists",[1,20],function(data){
	var rows = data.result,tpl='',row,i=1;
	for(var o in rows){
		row = rows[o];
		var status = row.status == 1?"激活":"禁止";
		tpl += '<tr class="gradeA"><td>'+i+'</td><td><a href="/system/userdetail?id='+row["id"]+'">'+row["name"]+'</a></td><td>'+row["description"]+'</td><td class="center">'+status+'</td><td class="center"><a class="btn btn-small" title="编辑" href="/role/edit#id='+row["id"]+'"><i class="icofont-edit"></i></a><a class="btn btn-small" title="删除" act="del" id="'+row["id"]+'"><i class="icofont-remove-sign"></i></a></td></tr>';
		i++;
	}	
	$('#datatables tbody').html(tpl)

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
	});
})

$('#datatables').delegate('[act="del"]','click',function(){
	var that = $(this);
	if(!confirm("确定要删除吗？")){
		return false;
	}
	jsonReq.post('/api/json/class/role',"del",{rid:$(this).attr('id')},function(data){
		that.closest('tr').remove();
	})

})
