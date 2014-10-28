var contact_list = [];
var contact_object = {};

;(function(){
	var BOSH_SERVICE = '/http-bind';
	var SERVER = "www.stone.com";
	var connection = null;


	function formatTime(time){
		function f(num){
			return num<10?'0'+num:num+'';
		}
		return f(time.getHours())+":"+f(time.getMinutes())
	}
	

	function notifyUser(msg) 
	{
		var elems = msg.getElementsByTagName('body');
		var body = elems[0];
		var from = msg.getAttribute('from').split('@')[0];

		if(!$('#chat-content-r').find('[node-id="'+from+'-r"]').length){
			$('#chat-content-r').append('<div class="chat-content" node-id="'+from+'-r"></div>');
		}
		
		//if($('#chat-content-r').find('[node-id="'+from+'-r"]').css('display') != "block"){
			$('.contact-list').find('[data-id="'+from+'"] .status').show();
		//}

		var time = new Date(),strTime = formatTime(time);;	
		
		if(elems.getElementsByTagName('delay').length >0){
			var str = elems.getElementsByTagName('x')[0].getAttribute('stamp');
			//	arr = str.match(/(^\d{4})(\d{2})(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
			//arr.shift();
			strTime = str.replace('T',' ');
		}
		var tpl = '<div class="chat-in">'
				 +'	<span class="chat-time">'+strTime+'</span>'
				 +'	<strong class="chat-user">'+contact_object[from]+': </strong>'
				 +'	<div class="chat-text">'+replaceScript(Strophe.getText(body))+'</div>'
				 +'</div>'
		$('#chat-content-r').find('[node-id="'+from+'-r"]').append(tpl).scrollTop(10000);
		return true;
	}

	function onConnect(status)
	{
		if (status == Strophe.Status.CONNECTED) {
			//console.log('<p class="welcome">Hello! Any new posts will appear below.</p>');
			connection.addHandler(notifyUser, null, 'message', null, null,  null);
			connection.addTimedHandler(1000,function(){
				connection.flush()
			})
			connection.send($pres().tree());
			$('#ubtn-r').val('已登录').attr('disabled',true)
		}		
	}

	var chatObject = {
		entersend : true
	};

	var cur_user = $.cookie('username');

	$('#chat-right .contact-list').delegate('li a','click',function(){
		chatObject.to = $(this).attr('data-id');
		$('[node-id="fullscreen"] a').attr('href','/chat/index#'+chatObject.to);
		$('#contact').removeClass("active in");
		$('#chat').addClass("active in").find('.chat-header h5 span').text($(this).find('.contact-item-heading').text());
		$('#chat').find('[node-id="full"]').attr('href','/chat#'+chatObject.to);
		$('#chat-content-r .chat-content').hide();
		if(!$('#chat-content-r').find('[node-id="'+chatObject.to+'-r"]').length){
			$('#chat-content-r').append('<div class="chat-content" node-id="'+chatObject.to+'-r"></div>').scrollTop(10000);
		}else{
			$('#chat-content-r').find('[node-id="'+chatObject.to+'-r"]').show().scrollTop(10000);
		}
		$('.contact-list').find('[data-id="'+chatObject.to+'"] .status').hide();
	})

	function replaceScript(str){
		return str.replace(/[\<\>]/g,function(s){
			return {"<":'&lt;',">":'&gt;'}[s]
		})
	}

	function sendMsg(){
		var toId = chatObject.to+"@"+SERVER,
			fromId = chatObject.from+"@"+SERVER,
			msg = replaceScript($('#chat-text-right').val());
		var reply = $msg({to: toId, from: fromId , type: 'chat'}).cnode(Strophe.xmlElement('body', '' ,msg));
		if(!chatObject.to){
			alert('您要发给谁?');
			return false;
		}
		if(!connection){
			alert('请先登录');
			return false;
		}
		if($.trim(msg) === ""){
			return false;
		}
		connection.send(reply.tree());
		var time = new Date(),strTime = formatTime(time);
		var tpl = '<div class="chat-in">'
				 +'	<span class="chat-time">'+strTime+'</span>'
				 +'	<strong class="chat-user">'+contact_object[chatObject.from]+': </strong>'
				 +'	<div class="chat-text">'+msg+'</div>'
				 +'</div>'
		$('#chat-content-r').find('[node-id="'+chatObject.to+'-r"]').append(tpl).scrollTop(10000);
		$('#chat-text-right').val('');
		
	}

	$('#chat-text-right').keydown(function(e){
		if(e.keyCode == 13 &&!e.ctrlKey){
			sendMsg();
			return false;
		}
	})

	$('#chat-right .icofont-remove-sign').click(function(){
		$('[node-id="fullscreen"] a').attr('href','/chat');
		$('#chat-right .contact-list li').removeClass('active')
	})

	$('input[name="contact-search"]').keyup(function(e){
		var key = $(this).val();
		if($.trim(key) !== ""){
			$('#chat-right .contact-list').find('li').hide();
			$('#chat-right .contact-list').find('li:contains("'+key+'")').show();
		}else{
			$('#chat-right .contact-list').find('li').show();
		}
	})
	
	function login(username,password){
		chatObject.from = username;
		connection = new Strophe.Connection(BOSH_SERVICE);
		connection.connect(	username+"@www.stone.com",
								password,
								onConnect);
	}

	//$('#ubtn-r').click(login)

	jsonReq.post('/json/user',"getInfo",{},function(data){
		var username = data.result.username,
			password = data.result.opcode;
		cur_user = username;
		login(username,password)

		jsonReq.post('/api/json/class/user',"lists",[1,200],function(data){
			var rows = data.result,tpl='',row,i=1;
			contact_list = data.result;
			for(var o in rows){
				row = rows[o];
				contact_object[row['username']] = row["name"];
				if(cur_user == row['username']){
					$('#contact h5 span').text(row["name"]);
					continue;
				}
				tpl += '<li class="contact-alt grd-white">'
					+'	<a href="#'+row["username"]+'-r" data-toggle="tab" data-id="'+row["username"]+'">'
					+'		<div class="contact-item">'
					+'			<div class="pull-left">'
					+'				<img class="contact-item-object" style="" src="http://www.stone.com:9090/plugins/presence/status?jid='+row["username"]+'@www.stone.com" />'
					+'			</div>'
					+'			<div class="contact-item-body">'
					+'				<div class="status" title="新消息" style="display:none;"><i class="icofont-certificate color-green"></i></div>'
					+'				<p class="contact-item-heading bold">'+row["name"]+'</p>'
					//+'				<p class="help-block"><small class="muted">Team Leader</small></p>'
					+'			</div>'
					+'		</div>'
					+'	</a>'
					+'</li>';
				i++;
			}	
			$('#chat-right .contact-list').html(tpl);
		})
	})

})();