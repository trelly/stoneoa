		
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