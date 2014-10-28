;(function(){
	jsonReq.post('/api/json/class/group',"lists",{},function(data){
		var rows = data.result,tpl='',row,i=1;
		for(var o in rows){
			row = rows[o];
			tpl += '<option value="'+row["id"]+'">'+row['name']+'</option>'
		}	
		$('#group_select').html(tpl).select2()
	})

	 $('[data-form=datepicker]').datepicker();

	function fixed(num){
		return num<10?'0'+num:num;
	}

	function getHMS(t){
		if(t<=0){
			return 0;
		}
		return fixed(Math.floor(t/3600))+":" +fixed( Math.floor((t%3600)/60))+":" + fixed(t%60);
	}

	var g_table = $('#attendance_list').dataTable({
		  "sDom": "<'row-fluid'<'tbl'l><'tbr'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
		  "sPaginationType": "bootstrap",
		  "oLanguage": Global.oLanguage
	  });

	 function tplGrid(d){

		 var tmpl = '{{each list}}'
			+'<tr class="gradeA odd">'
			+'<td>{{$value.name}}</td>'
			+'<td>{{$value.date}}</td>'
			+'<td>{{$value.sign_info.sign_start}}-{{$value.sign_info.sign_end}}</td>'
			+'<td>{{$timelong($value.sign_info.sign_start,$value.sign_info.sign_end)}}</td>'
			+'<td>{{$status($value.sign_info.sign_start,$value.sign_info.sign_end,$value.sign_info.update_reason)}}</td>'
			+'<td>{{$timelong($value.sign_info.update_start,$value.sign_info.update_end)}}</td>'
			+'<td>{{$name}}</td>'
			+'{{/each}}';

		var render = template.compile(tmpl);
		template.helper('$timelong', function(v1,v2){
			if(v1&&v2){
				var arrV1 = v1.split(':'),arrV2 = v2.split(":");
				return getHMS(parseInt(arrV2[0],10)*3600+parseInt(arrV2[1],10)*60+parseInt(arrV2[2],10) - (parseInt(arrV1[0],10)*3600+parseInt(arrV1[1],10)*60+parseInt(arrV1[2])))
			}else{
				return 0;
			}
		})

		template.helper('$status', function(v1,v2,v3){
			if(v3){
				return v3;
			}
			/*if(v1&&v2){
				var longT = arrV2[0]*3600+arrV2[1]*60+arrV2[2] - arrV1[0]*3600-arrV1[1]*60-arrV1[2];
				if(longT>9*3600){
					return '正常'
				}else{
					return '异常'
				}
			}*/else{
				return '异常'
			}
		})
		var tpl = render({list:d.result});
		g_table.fnClearTable();
		$('#attendance_list tbody').html(tpl);
		g_table.fnDestroy()
		g_table = $('#attendance_list').dataTable({
		  "sDom": "<'row-fluid'<'tbl'l><'tbr'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
		  "sPaginationType": "bootstrap",
		  "oLanguage": Global.oLanguage
	  });
		
	 }

	$('#btn-search').click(function(){
		var groupid = $('#group_select').select2('val'),
			start_date = $('#start_date').val(),
			end_date = $('#end_date').val();

		jsonReq.post('/open/attendance','getAttendanceByGroup',{start:start_date,end:end_date,groupid:groupid},function(d){
			tplGrid(d);
		})
	})
	$('#btn-export').click(function(){
		var groupid = $('#group_select').select2('val'),
                    start_date = $('#start_date').val(),
                    end_date = $('#end_date').val();
                    var query = {"groupid":groupid,"startdate":start_date,"enddate":end_date};
                    var params = [];
                    for(var i in query){
                        params.push(i+'='+query[i]);
                    }
		location.href = '/attendance/export?'+params.join('&');
	})
})()