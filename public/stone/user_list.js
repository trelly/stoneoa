
jsonReq.post('/api/json/class/user',"lists",[1,200],function(data){
	var rows = data.result,tpl='',row,i=1;
	for(var o in rows){
		row = rows[o];
		var status = row.status == 1?"激活":"禁止";
		tpl += '<tr class="gradeA"><td>'+i+'</td><td><a href="/user/info?id='+row["id"]+'">'+row["name"]+'</a></td><td>'+row["email"]+'</td><td class="center"> '+row["group"]+'</td><td class="center">'+status+'</td><td class="center"><a class="btn btn-small" title="编辑" href="/user/edit#id='+row["id"]+'"><i class="icofont-edit"></i></a><a class="btn btn-small" title="删除" act="del" id="'+row["id"]+'"><i class="icofont-remove-sign"></i></a></td></tr>'
		i++;
	}	
	$('#datatables tbody').html(tpl)

	$('#datatables').dataTable({
		"sPaginationType": "bootstrap",
		"oLanguage": Global.oLanguage
	});
})

$('#datatables').delegate('[act="del"]','click',function(){
	var that = $(this);
	if(!confirm("确定要删除吗？")){
		return false;
	}
	jsonReq.post('/json/user',"del",{uid:$(this).attr('id')},function(data){
		that.closest('tr').remove();
	})

})
