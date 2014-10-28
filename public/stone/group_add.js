$('#submit').click(function(){

	var name = $('input[name="name"]').val(),
		desc = $('[name="discription"]').val(),
		status = $('select[name="status"]').val(),
		pid = $('[name="pgroup"]').select2('val');

	jsonReq.post('/json/group',"insert",[{
		name : name,
		description : desc,
		status : status,
		pid : pid
	}],function(data){
		location.href = "/group/list";
	})
	
	return false;
});

$('#cancel').click(function(){
	location.href = "/group/list"
})

$('[data-form=select2]').select2();