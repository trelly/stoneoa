var id = location.hash.substr(1);
var oHash = formatHash2Object();

jsonReq.post('/api/json/class/group',"getById",{did:oHash.id},function(data){
	var res = data.result;
	$('input[name="name"]').val(res.name);
	$('[name="discription"]').val(res.description);
	$('select[name="status"]').select2("val",res.status);
	$('select[name="pgroup"]').select2("val",res.pid);
})

$('#submit').click(function(){

	var name = $('input[name="name"]').val(),
		desc = $('[name="discription"]').val(),
		status = $('select[name="status"]').val(),
		pid = $('[name="pgroup"]').select2('val');

	jsonReq.post('/api/json/class/group',"update",[{
		name : name,
		description : desc,
		status : status,
		pid : pid
	},{id : oHash.id}],function(data){
		location.href = "/group/list"
	})
	
	return false;
});

$('#cancel').click(function(){
	location.href = "/group/list"
})

$('[data-form=select2]').select2();