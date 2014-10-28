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
		row = rows[i];
		pids = row.pid.split('-');
		pId = pids[pids.length-1];

		zNodes.push({
			id : row.id,
			pId : pId == 0?-1:pId,
			name : row.name,
			open : false
		})
	}

	$.fn.zTree.init($("#groupTree"), setting, zNodes);
	groupTree = $.fn.zTree.getZTreeObj("groupTree");
})

$('#submit').click(function(){
	var username = $('input[name="username"]').val(),
		email = $('input[name="email"]').val(),
		status = $('select[name="status"]').val(),
		name = $('input[name="name"]').val(),
		smartcard = $('[name="smartcard"]').val(),
        group = groupTree.getCheckedNodes()[0].id;
	jsonReq.post('/api/json/class/user',"insertInfo",[{
		username : username,
		email : email,
		smartcard : smartcard,
		status : status,
		name : name
	},{
        group_id:group
    }],function(data){
		location.href = "/user/list"
	})
	
	return false;
})


/*jsonReq.post('/api/json/class/group',"listByPid2",{},function(data){
	var rows = data.result,tpl='',row,i=1;
	for(var i=0;i<rows.length;i++){
		row = rows[i];
		tpl += '<option value="'+row.group.id+'">'+row.group.name+'</option>';
		tpl += '<optgroup label="'+row.group.name+'">';
		for(var j=0;j<row.children.length;j++){
			var g = row.children[j];
			tpl += '<option value="'+g.id+'">'+g.name+'</option>';
		}
		tpl += '</optgroup>';
	}
	$('[name="group"]').html(tpl).select2();
})*/


$('[data-form=select2]').select2();

// datepicker
//$('[data-form=datepicker]').datepicker();

// coloricker
//$('[data-form=colorpicker]').colorpicker();


// uniform
//$('[data-form=uniform]').uniform()

// wysihtml5
//$('[data-form=wysihtml5]').wysihtml5();
