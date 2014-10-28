var id = location.hash.substr(1);
var oHash = formatHash2Object();

var groupTree;
var setting = {
	check: {
		enable: true,
		chkStyle: "radio",
		radioType: "all"
	},
	data: {
		simpleData: {
			enable: true
		}
	}
};


jsonReq.post('/api/json/class/user',"getEditById",{id:oHash.id},function(data){
	var res = data.result,checked = false;
	$('input[name="username"]').val(res.username);
	$('input[name="name"]').val(res.name);
	$('input[name="email"]').val(res.email);
	$('select[name="status"]').select2("val",res.status);
	$('[name="smartcard"]').val(res.smartcard);

	jsonReq.post('/api/json/class/group',"lists",{},function(data){
		var rows = data.result,pids=[],pId,row;
		var zNodes = [{
			id : -1,
			pId : 0,
			name : "全部",
			open : false,
			chkDisabled:true
		}];
		for(var i=0;i<rows.length;i++){
			checked = false;
			row = rows[i];
			pids = row.pid.split('-');
			pId = pids[pids.length-1];

			if(row.id == res.group){
				checked = true;
			}

			zNodes.push({
				id : row.id,
				pId : pId == 0?-1:pId,
				name : row.name,
				open : false,
				checked:checked
			})
		}

		$.fn.zTree.init($("#groupTree"), setting, zNodes);
		groupTree = $.fn.zTree.getZTreeObj("groupTree");
	})
})




//$('[data-form=select2]').select2();

$('#submit').click(function(){

	var username = $('input[name="username"]').val(),
		email = $('input[name="email"]').val(),
		status = $('select[name="status"]').val(),
		name = $('input[name="name"]').val(),
		group = groupTree.getCheckedNodes()[0].id,
		smartcard = $('[name="smartcard"]').val();

	jsonReq.post('/api/json/class/user',"updateInfo",[{
		username : username,
		email : email,
		smartcard : smartcard,
		status : status,
		name : name
	},{id : oHash.id},{group_id:group}],function(data){
		location.href = "/user/list"
	})
	
	return false;
});

$('#cancel').click(function(){
	location.href = "/user/list"
})

$('[name="status"]').select2();