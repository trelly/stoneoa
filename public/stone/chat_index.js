;(function(){
	var BOSH_SERVICE = '/http-bind';
	var SERVER = "www.stone.com";
	
	var connection = null;

	function notifyUser(msg) 
	{
	   // if (msg.getAttribute('from') == "testuser@127.0.0.1/pingstream") {
			var elems = msg.getElementsByTagName('body');
			var body = elems[0];
			var from = msg.getAttribute('from').split('@')[0];
			//alert(Strophe.getText(body));
			
			//console.log(msg)

			$('#full-contact-list').find('li a[data-id="'+from+'"]').trigger('click');

			var time = new Date(),strTime = time.getHours()+":"+time.getMinutes();
			var tpl = '<div class="msg-out">'
				 +'	<span class="msg-time">'+strTime+'</span>'
                 +'	<strong class="msg-user">'+contact_object[from]+': </strong>'
                 +'	<div class="msg-text">'+Strophe.getText(body)+'</div>'
                 +'</div>';
			$('.chat-content').find('#'+chatObject.to).append(tpl).scrollTop(10000);
	  //  }
		return true;
	}

	function onConnect(status)
	{
		if (status == Strophe.Status.CONNECTED) {
			connection.addHandler(notifyUser, null, 'message', null, null,  null);
			connection.send($pres().tree());
			$('#ubtn').val('登录成功').attr('disabled','disabled')
		}		
	}

	/*$(document).ready(function () {
		connection = new Strophe.Connection(BOSH_SERVICE);
		connection.connect(	"qinjie@www.stone.com",
								"111111",
								onConnect);
		});*/


	var chatObject = {
		entersend : true
	};
	var cur_user = $.cookie('username');

	//jsonReq.post('/api/json/class/user',"lists",[1,200],function(data){
	function setContactList(){
		if(contact_list.length < 1){
			setTimeout(function(){
				setContactList();
			},500);
			return;
		}
		var rows = contact_list,tpl='',row,i=1;
		for(var o in rows){
			row = rows[o];			
			if(cur_user == row['username']){
				continue;
			}
			tpl += '<li class="contact-alt">'
				+'	<a href="#'+row["username"]+'" data-toggle="tab" data-id="'+row["username"]+'">'
				+'		<div class="contact-item">'
				+'			<div class="pull-left">'
				+'				<img onerror=javascript:this.src="http://www.stone.com/public/img/user-thumb.jpg" class="contact-item-object" style="width: 48px;height: 48px;" src="/profile/photoView/?path=/photo/'+row["id"]+'">'
				+'			</div>'
				+'			<div class="contact-item-body">'
			//	+'				<div class="status">08:18pm</div>'
				+'				<p class="contact-item-heading bold">'+row["name"]+'<img class="contact-item-object" style="" src="http://www.stone.com:9090/plugins/presence/status?jid='+row["username"]+'@www.stone.com" /></p>'
			//	+'				<p class="help-block"><small class="muted">Quisque convallis justo...</small></p>'
				+'			</div>'
				+'		</div>'
				+'	</a>'
				+'</li>';
			i++;
		}	
		$('#full-contact-list').html(tpl);
	//})
	}
	setContactList();

	$('#full-contact-list').delegate('li a','click',function(){
		chatObject.to = $(this).attr('data-id');
		var toname = $(this).find('.contact-item-heading').text();
		$('#chat_to_name').html('To: '+toname)
		if(!$('.chat-content').find('#'+chatObject.to).length){
			$('.chat-content').append('<div class="msg-body fade" id="'+chatObject.to+'"></div>').scrollTop(10000);
		}
	})

	//var reply = $msg({to: toId, from: fromId , type: 'chat'}).cnode(Strophe.xmlElement('body', '' ,msg));
//connection.send(reply.tree());

	function replaceScript(str){
		return str.replace(/[\<\>]/g,function(s){
			return {"<":'&lt;',">":'&gt;'}[s]
		})
	}

	function sendMsg(){
		var toId = chatObject.to+"@"+SERVER,
			fromId = chatObject.from+"@"+SERVER,
			msg = replaceScript($('[name="message-writer"]').val());
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
		var time = new Date(),strTime = time.getHours()+":"+time.getMinutes();
		var tpl = '<div class="msg-in">'
				 +'	<span class="msg-time">'+strTime+'</span>'
                 +'	<strong class="msg-user">'+contact_object[chatObject.from]+': </strong>'
                 +'	<div class="msg-text">'+msg+'</div>'
                 +'</div>';
		$('.chat-content').find('#'+chatObject.to).append(tpl).scrollTop(10000);
		$('[name="message-writer"]').val('');
		
	}

	$('[name="message-writer"]').keydown(function(e){
		if(chatObject.entersend){
			if(e.keyCode == 13 &&!e.ctrlKey){
				sendMsg();
				return false;
			}
		}else{
			if(e.keyCode == 13 &&e.ctrlKey){
				sendMsg();
				return false;
			}
		}
	})

	$('#sendEnter').change(function(){
		chatObject.entersend = !!$(this).attr("checked");
	})
	
	
	function login(username,password){
		chatObject.from = username;
		connection = new Strophe.Connection(BOSH_SERVICE);
		connection.connect(	username+"@www.stone.com",
								password,
								onConnect);
	}

	//$('#ubtn').click(login)
	
	jsonReq.post('/json/user',"getInfo",{},function(data){
		var username = data.result.username,
			password = data.result.opcode;
		login(username,password)
	})

	var init_u = '',init_count = 0;
	if(location.hash != ""){
		init_u = location.hash.substr(1);
		setInit(init_u);
	}
	
	function setInit(id){
		var node = $('#full-contact-list li a[data-id="'+init_u+'"]');
		init_count++;
		if(node.length > 0){
			node.trigger('click');
		}else if(init_count < 5){
			setTimeout(function(){
				setInit(id);
			},500)
		}
	}
	
	$('.sidebar-right-control [node-id="fileupload"] a').trigger('click');
	$('.sidebar-right-control [node-id="contact"],.sidebar-right-control [node-id="fullscreen"]').hide();

	$('#search-contact').keyup(function(e){
		var key = $(this).val();
		if($.trim(key) !== ""){
			$('#full-contact-list').find('li').hide();
			$('#full-contact-list').find('li:contains("'+key+'")').show();
		}else{
			$('#full-contact-list').find('li').show();
		}
	})

})();


//<iq from='jane@longbourn.lit/garden'  type='get' id='roster2'>  <query xmlns='jabber:iq:roster'/> </iq>