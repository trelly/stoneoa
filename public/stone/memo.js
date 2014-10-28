$(document).ready(function() {
    // try your js
    // uniform
    $('[data-form=uniform]').uniform();

    // calendar
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

	function bindDrag(){
		$('#rightEvContent div.external-event').each(function() {

				var eventObject = {
						title: $.trim($(this).text()),
						id : $(this).data('id')
				};

				$(this).data('eventObject', eventObject);

				$(this).draggable({
						zIndex: 999,
						revert: true,  
						revertDuration: 0 
				});

		}).css({
			'cursor' : 'move'
		});
	}

    bindDrag()

	function insertEvent(start,end,content,flag,status,callback){
		jsonReq.post('/json/memo',"write",{
			start : start,
			end : end,
			content : content,
			flag : flag,
			status : status
		},function(data){
			callback(data)
		})
	}

	function updateEvent(id,start,end,content,flag){
		jsonReq.post('/json/memo',"updateEvent",{
			start : start,
			end : end,
			content : content,
			flag : flag,
			id : id
		},function(data){
			//var datas = data.result;
		})
	}

	var selectedObject = {};
	var timeouter = null;

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
			
		},
		droppable: true,
		drop: function(date, allDay) { 
				var originalEventObject = $(this).data('eventObject');

				var copiedEventObject = $.extend({}, originalEventObject);

				copiedEventObject.start = date;
				copiedEventObject.allDay = allDay;
				copiedEventObject.backgroundColor = $(this).css('background-color');

				updateEvent(copiedEventObject.id,date,date,copiedEventObject.title,1);

				$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

				$(this).remove();

		},
		eventDragRemove : function(event){
			jsonReq.post('/json/memo',"remove",{id:event._id},function(data){
				calendar.fullCalendar( 'removeEvents' ,event._id)
			})
		},
		select : function(start,end,allDay){
			var title = prompt('备忘内容:');
			if (title) {
				insertEvent($.fullCalendar.formatDate(start,'yyyy-MM-dd HH:mm:ss'),$.fullCalendar.formatDate(end,'yyyy-MM-dd HH:mm:ss'),title,1,0,function(d){
					calendar.fullCalendar('renderEvent',
							{
									title: title,
									start: start,
									end: end,
									allDay: true,
									id : d.result,
									flag : 1
							},
							true
					);
				})
					
			}
		},
		unselect : function(){
			//selectedObject = {};
		},
		selectable: true,
		selectHelper: true,
		dayClick: function(date,fullday,e,view) {
			/*var _thisCell = $(e.currentTarget);
			$('#calendar td').data('selected',false).removeClass('cellselected');
			_thisCell.data('selected',true).addClass('cellselected');
			initMemo(date)
			if(_thisCell.data('selected')){
				_thisCell.data('selected',false).removeClass('cellselected');
			}else{
				_thisCell.data('selected',true).addClass('cellselected');
				initMemo(date)
			}
			setMemo()
			//$('#panel').show();*/
		},
		editable: true,
	//	events: memo,
		eventDragStop : function(event){
			setTimeout(function(){
				updateEvent(event.id,$.fullCalendar.formatDate(event.start,'yyyy-MM-dd HH:mm:ss'),$.fullCalendar.formatDate(event.end,'yyyy-MM-dd HH:mm:ss'),event.title,event.flag)
			},1000)
			//
		},
		eventResizeStop : function(event){
			setTimeout(function(){
				updateEvent(event.id,$.fullCalendar.formatDate(event.start,'yyyy-MM-dd HH:mm:ss'),$.fullCalendar.formatDate(event.end,'yyyy-MM-dd HH:mm:ss'),event.title,event.flag)
			},1000)		
		},
		eventClick : function(event){
			//setMemo(event)
			//memoWriteCache.date = event.start;
			//$('#panel').show();
		},
		viewDisplay : function(calendar){
			/*var startStr = $.fullCalendar.formatDate(calendar.visStart,"yyyy-MM-dd"),
				endStr = $.fullCalendar.formatDate(calendar.visEnd,"yyyy-MM-dd");
			$('#calendar td').data('selected',false).removeClass('cellselected');
			//$('#panel').hide();
			//getAttendance(startStr,endStr);
			getMemo(startStr,endStr)*/
		}
	}); 

	var memoWriteCache = {};

	function initMemo(date){
		//console.log(date)
		memoWriteCache.date = date;
	}

	function setMemo(event){
		memoWriteCache.event = event;
		if(!event){
			$('#text-write-memo').val('');
			$('#SelectTime').select2("val",'00:00');
			$('#memo-update-id').val('');
		}else{
			var arr = event.title.match(/\((.*)\):(.*)/);
			$('#text-write-memo').val(arr[2]);
			$('#SelectTime').select2("val",arr[1].substr(0,5));
			$('#memo-update-id').val(event.id);
		}
	}
    
	function getMemo(startStr,endStr){
		/*jsonReq.post('/json/memo',"get",{
				start : startStr,
				end : endStr
		},function(data){
			var datas = data.result;
			var memo = [];
			for(var i in datas){
				
				memo.push({
					title: datas[i].content,
					start: datas[i].create_date,
					id : datas[i].id
				});
				
			}
			$('#calendar').fullCalendar('removeEvents','').fullCalendar( 'addEventSource', memo )
		})*/
	}
	
	$('#SelectTime').select2();

	$('#btn-write-memo').click(function(){
		var content = $.trim($('#text-write-memo').val()),
			status = $('#SelectTime').select2("val");

		if(!content){return false;}
		var method = "write",postObj = {content:content,start:new Date(),end:new Date(),flag:0,status:status};

		jsonReq.post('/json/memo',method,postObj,function(data){
			jsonReq.post('/json/memo','getListsR',{},function(d){
				var tpl = '',evs = d.result,ev,cls="";
				for(var i=0;i<evs.length;i++){
					ev = evs[i];
					if(ev.status == 0){
						cls = "btn-primary";
					}else if(ev.status == 1){
						cls = "btn-danger"
					}
					tpl += '<div data-id="'+ev.id+'" class="external-event label '+cls+'" style="display: block;padding: 5px;margin-bottom: 10px;"><input type="checkbox" data-form="uniform" />'+ev['content']+'</div>'
			    }
				$('#rightEvContent').html(tpl);
				$('[data-form=uniform]').uniform();
				$('#text-write-memo').val('');
				bindDrag();
			})
		})
	})

	$('#btn-remove-memo').click(function(){
		var memoid = $('#memo-update-id').val();
		
		if(!memoid){
			return;
		}

		jsonReq.post('/json/memo',"remove",{id:memoid},function(data){
			calendar.fullCalendar( 'removeEvents' ,memoid)
			setMemo();
			//$('#panel').hide();
		})
	})

	$('#rightEvContent').on('click','input',function(){
		var that = $(this),memoid = $(this).closest('.external-event').attr('data-id');
		if($(this).attr('checked')){
			jsonReq.post('/json/memo',"mark",{id:memoid,tag:2},function(data){
				that.closest('.external-event').prepend('<em class="icon-remove" style="float:right;cursor:pointer;"></em>').removeClass('btn-primary btn-danger').addClass('label-success').find('.checker').remove().end().prependTo($('#overEvContent'))
			})
		}
				
	})

	$('#overEvContent').on('click','.icon-remove',function(){
		var p = $(this).closest('.external-event');
		jsonReq.post('/json/memo',"remove",{id:p.data('id')},function(data){
			if(data.result){
				p.remove();
			}
		})
	})
});


