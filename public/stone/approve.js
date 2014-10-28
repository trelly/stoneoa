;(function(){
	var tmpl =  '{{each list}}'
				+'<tr class="odd gradeX">'
				+'	 <td><a href="/approve/step#{{$value.id}}" >{{$value.name}}</a></td>'
				+'	 <td>{{$value.cdate}}</td>'
				+'	 <td class="center">{{$value.flowname}}</td>'
				+'	 <td class="center">{{$value.username}}</td>'
				+'</tr>'
				+'{{/each}}';

	
	var render = template.compile(tmpl);

	jsonReq.post('/open/approve','getHandle',{},function(d){
		var tpl = render({list:d.result});
		$('#datatables tbody').html(tpl);

		$('#datatables').dataTable({
          "sDom": "<'row-fluid'<'tbl'l><'tbr'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
          "sPaginationType": "bootstrap",
          "oLanguage": Global.oLanguage
      });
	})
})()