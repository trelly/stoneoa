$(document).ready(function() {

    // uniform
    $('[data-form=uniform]').uniform()

   // var editor = UE.getEditor('editor');

	$('.box-body').on('click','[node-id="btn-del"]',function(){
		var mailid = $(this).parent().data('mailbox-id'),id = $(this).parent().data('mail-id');
		jsonReq.post('/open/mail','remove',{mailid:mailid,id:id},function(d){
			if(d.result){
				$('#btn-back')[0].click();
			}
		})
	})

});

