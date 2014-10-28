var oDataTable;
    $(document).ready(function() {
        // try your js

        // uniform
        $('[data-form=uniform]').uniform();

        // datatables table tools
        oDataTable = $('#datatables').dataTable({
            "sDom": "<'row-fluid'<'tbl'l><'tbr'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": Global.oLanguage,
			"aaSorting": [
					[ 1, "desc" ]
			]
        });

		$('#datatables').on('click','[node-act="del"]',function(){
			var mailid = $(this).data('mailbox-id'),id = $(this).data('mail-id');
			jsonReq.post('/open/mail','remove',{mailid:mailid,id:id},function(d){
				if(d.result){
					location.reload();
				}
			})
		})

		/*oDataTable.$('.checker input').change(function(e){
				var checker = $(this).parent('span');
				if(checker.hasClass('checked')){
						$(this).closest('tr').removeClass('row_selected')
						checker.removeClass('checked');
				}else{
						$(this).closest('tr').addClass('row_selected')
						checker.addClass('checked');
				}
		})

		$('#datatables').delegate('th .checker input','change',function(){
				var checker = $(this).parent('span');
				if(checker.hasClass('checked')){
						$('tr').removeClass('row_selected')
						checker.removeClass('checked');
						$('.checker span').removeClass('checked');
				}else{
						$('tr').addClass('row_selected')
						checker.addClass('checked');
						$('.checker span').addClass('checked');
				}
		})*/

    });