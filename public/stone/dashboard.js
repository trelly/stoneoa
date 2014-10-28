$(document).ready(function() {

	/* 系统监控 */
	jsonReq.post('/open/system','status',{},function(data){
		var d = data.result;
		$('#cpu').attr('title',('usage '+d.cpu.cur+' of '+d.cpu.max)).find('[data-chart=knob]').attr({
			value : d.cpu.cur,
			"data-min" : d.cpu.min,
			"data-max" : d.cpu.max
		})
		$('#memory').attr('title',('usage '+d.memory.cur+'kb of '+d.memory.max+'kb')).find('[data-chart=knob]').attr({
			value : d.memory.cur,
			"data-min" : d.memory.min,
			"data-max" : d.memory.max
		})
		$('#disk').attr('title','usage '+d.disk.cur+'G of '+d.disk.max+'G').find('[data-chart=knob]').attr({
			value : d.disk.cur,
			"data-min" : d.disk.min,
			"data-max" : d.disk.max
		})
		$("input[data-chart=knob]").knob();
	})

	// system stat flot
	d1 = [ ['1月', 231], ['2月', 243], ['3月', 323], ['4月', 352], ['5月', 354], ['6月', 467], ['7月', 429]];
	d2 = [ ['jan', 87], ['feb', 67], ['mar', 96], ['apr', 105], ['maj', 98], ['jun', 53], ['jul', 87] ];
	d3 = [ ['jan', 34], ['feb', 27], ['mar', 46], ['apr', 65], ['maj', 47], ['jun', 79], ['jul', 95] ];
	
	var visitor = $("#visitor-stat"),
	order = $("#order-stat"),
	user = $("#user-stat"),
	
	data_visitor = [{
			data: d1,
			color: '#00A600'
		}],
	data_order = [{
			data: d2,
			color: '#2E8DEF'
		}],
	data_user = [{
			data: d3,
			color: '#DC572E'
		}],
	 
	
	options_lines = {
		series: {
			lines: {
				show: true,
				fill: true
			},
			points: {
				show: true
			},
			hoverable: true
		},
		grid: {
			backgroundColor: '#FFFFFF',
			borderWidth: 1,
			borderColor: '#CDCDCD',
			hoverable: true
		},
		legend: {
			show: false
		},
		xaxis: {
			mode: "categories",
			tickLength: 0
		},
		yaxis: {
			autoscaleMargin: 2
		}

	};
	
	// render stat flot
	$.plot(visitor, data_visitor, options_lines);
	$.plot(order, data_order, options_lines);
	$.plot(user, data_user, options_lines);
	
	// tootips chart
	function showTooltip(x, y, contents) {
		$('<div id="tooltip" class="bg-black corner-all color-white">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '0px',
			padding: '2px 10px 2px 10px',
			opacity: 0.9,
			'font-size' : '11px'
		}).appendTo("body").fadeIn(200);
	}

	var previousPoint = null;
	$('#visitor-stat, #order-stat, #user-stat').bind("plothover", function (event, pos, item) {
		
		if (item) {
			if (previousPoint != item.dataIndex) {
				previousPoint = item.dataIndex;

				$("#tooltip").remove();
				var x = item.datapoint[0].toFixed(2),
				y = item.datapoint[1].toFixed(2);
				label = item.series.xaxis.ticks[item.datapoint[0]].label;
				
				showTooltip(item.pageX, item.pageY,
				label + " = " + y);
			}
		}
		else {
			$("#tooltip").remove();
			previousPoint = null;            
		}
		
	});
    // end tootips chart
	/* 系统监控 */

	/* 公告 */
	jsonReq.post('/open/announce','fetch',{},function(d){
		if(!d.result) return;
		var list = d.result;
		setNoticeList(list)
	})
	
	function setNoticeList(list){
		var tmpl = 	'<div class="media">'+
					'	<div class="media-body">'+
					'		<h4 class="media-heading"><a href="javascript:;">{{title}}</a></h4>'+
					'		<p>{{content}}</p>'+
					'		<p><span>发布人：{{uname}}</span><span style="margin-left:30px;">发布时间：{{create_time}}</span></p>'+
					'	</div>'+
					'</div>';
		var render = template.compile(tmpl);

		
		var str = '',maxL = list.length>3?3:list.length;
		for(var i=0;i<maxL;i++){
			var tpl = render(list[i]);
			str += tpl;
		}
		$('#recent-orders [node-id="notice_list"]').html(str);
	}
	/* 公告 */


	var calendar = $('#calendar').fullCalendar({
		header: {
			left: 'title',
			center: '',
			right: 'prev,next today,month,basicWeek,basicDay'
		},
		events: function(start,end,callback){
			jsonReq.post('/json/memo',"get",{
				start : start,
				end : end
			},function(data){
				var datas = data.result;
				for(var i=0;i<datas.length;i++){
					datas[i]['title'] = datas[i]['content'];
					datas[i]['start'] = datas[i]['start_datetime'];
					datas[i]['end'] = datas[i]['end_datetime'];

					if(datas[i].status == 1){
						datas[i].backgroundColor = "#bd362f"
					}
				}
				callback(datas);

			})
			
		}
	}); 


	//email 
	function send(){
		var strTo = $('[name="reseiver"]').val(),
			to = strTo?strTo.split(','):"",
			strCc = $('[name="ccreseiver"]').val(),
			cc = strCc?strCc.split(','):"",
			subject = $('[name="subject"]').val(),
			content = $('[name="message"]').val();
		
		if(to.length>0&&content){
			jsonReq.post('/open/mail','send',{"messages":{
				to : to,
				cc : cc,
				subject : subject,
				content : content
			}},function(d){
				if(d.result){
					$('#email_msg').html('发送成功').css('color','');
					setTimeout(function(){
						$('#email_msg').html('').closest('form')[0].reset()
					},3000)
				}else{
					$('#email_msg').html('发送失败').css('color','#f20000')	
				}
			})
		}

		//	{"messages":{"to":"516901168@qq.com","cc":"tjgaotianyi@163.com","subject":"test","content":"<p>sdfsdfsf</p>"
	}

	$('#btn-send').click(function(){
		send();
	})
});