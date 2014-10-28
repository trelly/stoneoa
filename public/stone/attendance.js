$(document).ready(function() {
    // try your js

    // uniform
    $('[data-form=uniform]').uniform();

    // calendar
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('div.external-event').each(function() {

            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                    title: $.trim($(this).text()) // use the element's text as the event title
            };

            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);

            // make the event draggable using jQuery UI
            $(this).draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
            });

    }).css({
        'cursor' : 'move'
    });

	function LongThen9(start,end){
		end = end||start;
		var arrS = start.split(':'),arrE = end.split(":");
		return (arrE[0]*60*60+arrE[1]*60+arrE[2]) - (arrS[0]*60*60+arrS[1]*60+arrS[2]) >= 9*60*60*60;
	}

	function fd(date){
		return $.fullCalendar.formatDate(date,"yyyy-MM-dd");
	}

	function setAttendanceByDay(event,selected,cell){
		if(!event || !event.start) return;
		var str_start = fix2(event.start.getHours())+":"+fix2(event.start.getMinutes())+":"+fix2(event.start.getSeconds()),str_end = "";
		if(!event){
			$('#dutyTime').val("");
			return;
		}
		if(event.end){
			str_end = fix2(event.end.getHours())+":"+fix2(event.end.getMinutes())+":"+fix2(event.end.getSeconds());
		}
		var id = "";
		if(!isNaN(event.id)){
			id = event.id;
		}
		$('#dutyTime').val(str_start+"-"+str_end).data('id',id).data('date',fd(event.start));
		$('#atten_panel').show();
	}

	function setTime(start,end,sign_start,sign_end){
		var arrS = sign_start?sign_start.split(':'):[],arrE = sign_end?sign_end.split(":"):[];
		if(start){
			start.setHours(parseInt(arrS[0]));
			start.setMinutes(arrS[1]);
			start.setSeconds(arrS[2]);
		}
		if(end){
			end.setHours(arrE[0]||0);
			end.setMinutes(arrE[1]||0);
			end.setSeconds(arrE[2]||0);
		}

		return {
			start : start,
			end : end
		}
	}

	function fix2(num){
		return Number(num)<10?'0'+num:num;
	}

    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'title',
            center: '',
            right: 'prev,next today,month'
        },
		firstDay : 1,
        events: function(start,end,callback){
			var defaultEvents = eachCalendar(start,end);
			getAttendance(start,end,function(data){
				var res = data.result,len = res.length;
				var delen = defaultEvents.length;
					for(var j=0;j<delen;j++){
						for(var i=0;i<len;i++){
							if($.fullCalendar.formatDate(defaultEvents[j].start,'yyyy-MM-dd') == res[i].sign_date 
								&& defaultEvents[j].start.getDay()!==0 && defaultEvents[j].start.getDay() !==6){
								if(res[i].sign_start && LongThen9(res[i].sign_start,res[i].sign_end)){
									defaultEvents[j].title = "正常";
									var obj = setTime(defaultEvents[j].start,defaultEvents[j].end,res[i].sign_start,res[i].sign_end);
									defaultEvents[j].start = obj.start;
									defaultEvents[j].end = obj.end;
									defaultEvents[j].backgroundColor = "green";
									defaultEvents[j].id = res[i].id;
								}else{
									if(res[i].update_reason){
										defaultEvents[j].title = res[i].update_reason
										defaultEvents[j].backgroundColor = "#C2BC2C"
										var obj = setTime(defaultEvents[j].start,defaultEvents[j].end,res[i].update_start,res[i].update_end);
										defaultEvents[j].start = obj.start;
										defaultEvents[j].end = obj.end;
									}else{
										defaultEvents[j].title = "时间不足"
										defaultEvents[j].backgroundColor = "#953b39"
										if(new Date(res[i].sign_date).getDate() == new Date().getDate()){
											defaultEvents[j].title = res[i].sign_start
											defaultEvents[j].backgroundColor = "green"
										}
										var obj = setTime(defaultEvents[j].start,defaultEvents[j].end,res[i].sign_start,res[i].sign_end);
										defaultEvents[j].start = obj.start;
										defaultEvents[j].end = obj.end;
									}
									defaultEvents[j].id = res[i].id;
								}
								break;
							}else if(defaultEvents[j].start.getDay()==0 || defaultEvents[j].start.getDay() ==6){
								defaultEvents[j].title = "休息日"
							}else{
								defaultEvents[j].title = "未打卡"
								defaultEvents[j].backgroundColor = "#EE150C"
							}
						}
					}
				console.log(defaultEvents)
				callback(defaultEvents);
			});
		},
		dayClick: function(date,fullday,e,view) {
			var event = $('#calendar').fullCalendar('clientEvents',function(e,i){
				if(fd(date) == fd(e.start)) return true;
			});
			var _thisCell = $(e.currentTarget),selected;
			
			if(_thisCell.data('selected')){
				selected = false;
				_thisCell.data('selected',false).removeClass('cellselected');
			}else{
				selected = true;
				$('#calendar tbody td').data('selected',false).removeClass('cellselected');
				_thisCell.data('selected',true).addClass('cellselected');
			}
			setAttendanceByDay(event[0],selected,_thisCell);
		},
		eventClick : function(event){
			var pos = $('#calendar').fullCalendar('getView').dateCell(event.start);
			var cell = $('#calendar tbody tr').eq(pos.row).find('td').eq(pos.col);
			cell.trigger('click')
		}
    });

	function eachCalendar(start,end){
		var strStart = $.fullCalendar.formatDate(start,'yyyy-MM-dd');
		var tmp = new Date(strStart),events = [];
		tmp.setHours(0);
		end = end>new Date()?new Date():end;
		while(tmp<end){
			(function(date){
				var str = $.fullCalendar.formatDate(date,'yyyy-MM-dd');
				var title = "未打卡",bgcolor = "red";
				if(date.getDay() == 6||date.getDay() == 0){
					title = "休息日"
					bgcolor = "green"
				}
				var sdate = new Date(str);
				sdate.setHours(0);
				var edate = new Date(str);
				edate.setHours(0);
				events.push({	
								id : 't_'+new Date().getTime(),
								title: title,
								start: sdate,
								end: edate,
								backgroundColor : bgcolor
						});
			})(tmp)
			tmp.setDate(tmp.getDate()+1);
		}
		return events;
	}

	function getAttendance(start,end,callback){
		var sstart = $.fullCalendar.formatDate(start,"yyyy-MM-dd"),send = $.fullCalendar.formatDate(end,"yyyy-MM-dd");
		jsonReq.post('/json/attendance',"get",{"start":sstart,"end":send},function(data){
			calendar.fullCalendar('removeEvents','')
			callback(data);
		})
	}

	//	eachCalendar(new Date('2014-02-23'),new Date('2014-04-06'))


	$('[data-form=select2]').select2();

	//$('[data-form="datepicker"]').datepicker();

	$('#btn-save').click(function(){
		var date = $('#dutyTime').data('date'),d = new Date(date),time = $('#dutyTime').val().split('-'),update_start = time[0],update_end = time[1],reason = $('#reason').val();
		var reg = /(^[0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/;
		if(!reg.test(update_start) || !reg.test(update_end)){
			alert('填写错误');
			return;
		}else if(d.getDay() == 6 ||d.getDay() == 0 || d.getDate() == new Date().getDate()){
			alert('不需要维护')
			return;
		}
		jsonReq.post('/open/attendance','updateCheck',{
			sign_date : date,
			update_start : update_start,
			update_end : update_end,
			reason : reason,
			id : $('#dutyTime').data('id')||""
		},function(d){
			$('#btn-save').attr('disabled',true);
			location.reload();
		})
	})
});