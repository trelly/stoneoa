var id = location.hash.substr(1);
var oHash = formatHash2Object();

jsonReq.post('/api/json/class/role',"getById",{rid:oHash.id},function(data){
	var res = data.result;
	$('input[name="name"]').val(res.name);
	$('[name="discription"]').val(res.description);
	//$('[name="startpage"]').val(res.startpage);
	$('select[name="status"]').select2("val",res.status);
})

$('#submit').click(function(){

	var name = $('input[name="name"]').val(),
		desc = $('[name="discription"]').val(),
		//startpage = $('[name="startpage"]').val(),
		status = $('select[name="status"]').val();

	jsonReq.post('/json/role',"edit",{
		name : name,
		desc : desc,
		status : status,
		//startpage : startpage,
		rid : oHash.id
	},function(data){
		location.href = "/role/list"
	})
	
	return false;
});

$('#cancel').click(function(){
	location.href = "/role/list"
})

$('[data-form=select2]').select2();