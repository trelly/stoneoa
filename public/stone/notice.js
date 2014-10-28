$(document).ready(function() {
	jsonReq.post('/open/announce','fetch',{},function(d){
		if(!d.result) return;
		var list = d.result;
		var item = list.shift();
		setToper(item)
		setNoticeList(list)
	})
	
	function setToper(notice){
		$("#notice-top").html('<h2>'+notice.title+'</h2><p>'+notice.content+'</p>')
	}
	
	function setNoticeList(list){
		var tmpl = '<div class="span6">'
					+'    <div class="box corner-all">'
					+'	<div class="{{$color(ann_type)}}">'
					+'	    <span>{{title}}</span>'
					+'	</div>'
					+'	<div class="box-body corner-bottom">'
					+'	    <p>{{content}}</p>'
					+'	</div>'
					+'   </div>'
					+'</div>';
		var render = template.compile(tmpl);
		template.helper('$color', function(v1){
			if(v1 == 0){
				return "box-header grd-white color-silver-dark corner-top"
			}else{
				return "box-header grd-red color-white corner-top"
			}
		})
		
		var str = '<div class="row-fluid">';
		for(var i=0;i<list.length;i++){
			var tpl = render(list[i]);
			str += tpl;
			if(i%2 == 1){
				str += '</div><div class="row-fluid">';
			}
		}
		str += '</div>'
		$('#notice-last').html(str);
		
	}

});

