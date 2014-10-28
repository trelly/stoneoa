//;(function(){
	var tmpl =  '{{each list}}'
				+'<tr class="odd gradeX">'
				+'	 <td><a href="/approve/step#{{$value.id}}" >{{$value.name}}</a></td>'
				+'	 <td>{{$value.cdate}}</td>'
				+'	 <td class="center">{{$value.flowname}}</td>'
				+'	 <td class="center">{{$value.sender}}</td>'
				+'</tr>'
				+'{{/each}}';

	
	var render = template.compile(tmpl);
	var g_table = $('#datatables').dataTable({
		  "sDom": "<'row-fluid'<'tbl'l><'tbr'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
		  "sPaginationType": "bootstrap",
		  "oLanguage": Global.oLanguage
	  });
	function get(completed){

		jsonReq.post('/open/approve','getList',{completed:completed},function(d){
			var tpl = render({list:d.result});
			g_table.fnClearTable();
			$('#datatables tbody').html(tpl);
			g_table.fnDestroy()
			g_table = $('#datatables').dataTable({
			  "sDom": "<'row-fluid'<'tbl'l><'tbr'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
			  "sPaginationType": "bootstrap",
			  "oLanguage": Global.oLanguage
		  });
		})
	}


	$('#approveTabs a').click(function(){
		var id = $(this).attr('node-id');
		get(id);
	})

	get(0);
//})()