$(document).ready(function() {
	// try your js
	
	// uniform
	$('[data-form=uniform]').uniform();
	
	var submitObj = {
		holiday : [],
		workday : []
	};

	function eachCalendar(start,end,arr){
		var strStart = $.fullCalendar.formatDate(start,'yyyy-MM-dd');
		var tmp = new Date(strStart),events = [];
		while(tmp<end){
			(function(date){
				var str = $.fullCalendar.formatDate(date,'yyyy-MM-dd');
				var title = "工作日",bgcolor = "#008299";
				if($.inArray(date.getDay()+"",arr) != -1){
					title = "休息日";
					bgcolor = "green";
				}
				events.push({	
						title: title,
						start: new Date(str),
						backgroundColor : bgcolor
				});
			})(tmp)
			tmp.setDate(tmp.getDate()+1);
		}

		submitObj.holiday = [];
		submitObj.workday = [];
		return events;
	}
	
	function fd(date){
		return $.fullCalendar.formatDate(date,"yyyy-MM-dd");
	}
	
	var dates_object = {};


	function setSepDays(e,selected,cell){
		if(selected){
			dates_object[e.start] = {event:e,cell:cell};
		}else{
			delete dates_object[e.start];
		}
		
	}

	var calendar = $('#calendar').fullCalendar({
		header: {
			left: 'title',
			center: '',
			right: 'prev,next'
		},
		firstDay : 1,
		events: function(start,end,callback){
			var defaultEvents = eachCalendar(start,end,$('#inputTags').val().split(','));
			$('#calendar').fullCalendar('removeEvents','')
			callback(defaultEvents);
			submitObj.start = fd(start);
			submitObj.end = fd(end);
		},
		eventClick : function(event){
			var pos = $('#calendar').fullCalendar('getView').dateCell(event.start);
			var cell = $('#calendar tbody tr').eq(pos.row).find('td').eq(pos.col);
			cell.trigger('click')
		},
		dayClick : function(date,fullday,e,view){
			var event = $('#calendar').fullCalendar('clientEvents',function(e,i){
				if(fd(date) == fd(e.start)) return true;
			});
			var _thisCell = $(e.currentTarget),selected;
			if(_thisCell.data('selected')){
				selected = false;
				_thisCell.data('selected',false).removeClass('cellselected');
			}else{
				selected = true;
				_thisCell.data('selected',true).addClass('cellselected');
			}
			setSepDays(event[0],selected,_thisCell);
		}
	});

	$('#inputTags').select2({width:"100%",tags:[{id:1,text:"星期一"}, {id:2,text:"星期二"}, {id:3,text:"星期三"},{id:4,text:"星期四"}, {id:5,text:"星期五"}, {id:6,text:"星期六"},{id:0,text:"星期日"}]});
	$('#inputTags').change(function(){
		var view = $('#calendar').fullCalendar('getView'),
			defaultEvents = eachCalendar(view.visStart,view.visEnd,$(this).val().split(','));
		$('#calendar').fullCalendar('removeEvents','')
		$('#calendar').fullCalendar( 'addEventSource', defaultEvents );
		submitObj.default = $(this).val().split(',');
	})
	submitObj.default = $('#inputTags').select2('val');
	
	function deleteWorkdays(date){
		var strDate = fd(date),
			index = $.inArray(strDate,submitObj.workday);
		if(index != -1){
			submitObj.workday.splice(index,1);
		}
	}

	function deleteHolidays(date){
		var strDate = fd(date),
			index = $.inArray(strDate,submitObj.holiday);
		if(index != -1){
			submitObj.holiday.splice(index,1);
		}
	}

	$('#btn-holiday').click(function(){
		for(var o in dates_object){
			var event = dates_object[o].event;
			event.title = "休息日";
			event.backgroundColor = "green";
			calendar.fullCalendar('updateEvent',event);
			dates_object[o].cell.trigger('click');
			if($.inArray(event.start.getDay()+"",submitObj.default) == -1){
				submitObj.holiday.push(fd(event.start));
			}
			deleteWorkdays(event.start);
		}
	})

	$('#btn-workday').click(function(){
		for(var o in dates_object){
			var event = dates_object[o].event;
			event.title = "工作日";
			event.backgroundColor = "#008299";
			calendar.fullCalendar('updateEvent',event);
			dates_object[o].cell.trigger('click');
			if($.inArray(event.start.getDay()+"",submitObj.default)  != -1){
				submitObj.workday.push(fd(event.start));
			}
			deleteHolidays(event.start);
		}
	})

	/*
		{
			default : [0,6],//代表周日，周六
			holiday : [2014-04-06,2014-04-07,2014-04-08],//节假日
			workday : [2014-04-05],//属于周末的工作日
			start : '2014-03-01',
			end : '2014-04-01'
		}
	*/

	$('#btn-atten-setting').click(function(){
		submitObj.dutytime = $('#dutytime').val();
		console.log(JSON.stringify(submitObj));
	})
});
