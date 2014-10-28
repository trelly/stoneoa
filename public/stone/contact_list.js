var tpl = "";
var group = ["IT部","人事部","行政部","销售部"]
for(var i=0;i<100;i++){
	tpl += '<tr><td><a href="#">姓名'+i+'</a></td><td>test@stone.com</td><td><a href="#">'+group[i%4]+'</a></td><td>工程师</td><td>0123</td><td>12345678902</td><td>朔黄10层东区12-05</td></tr>'
}	
$('#datatables tbody').html(tpl)
var odataTable = $('#datatables').dataTable({
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
$('#datatables').delegate('a','click',function(){
	odataTable.fnFilter( $(this).text());
	return false;
})