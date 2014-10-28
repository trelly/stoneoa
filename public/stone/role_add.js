$('#submit').click(function(){

	var name = $('input[name="name"]').val(),
		desc = $('[name="discription"]').val(),
		//startpage = $('[name="startpage"]').val(),
		status = $('select[name="status"]').val();

	jsonReq.post('/api/json/class/role',"add",{
		name : name,
		desc : desc,
		status : status//,
		//startpage : startpage
	},function(data){
		location.href = "/role/list";
	})
	
	return false;
});

$('#cancel').click(function(){
	location.href = "/role/list"
})

$('[data-form=select2]').select2();