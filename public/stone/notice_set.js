;(function(){
	var groupTree;
	var setting = {
		check: {
			enable: true
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
			id : 0,
			pId : 0,
			name : "全部",
			open : false
		}];
		for(var i=0;i<rows.length;i++){
			row = rows[i];
			pids = row.pid.split('-');
			pId = pids[pids.length-1];

			zNodes.push({
				id : row.id,
				pId : pId,
				name : row.name,
				open : false
			})
		}

		$.fn.zTree.init($("#groupTree"), setting, zNodes);
		groupTree = $.fn.zTree.getZTreeObj("groupTree");
		groupTree.setting.check.chkboxType = { "Y" : "s", "N" : "ps" };
		if(edit_announce){
			var recid = {};
			$(edit_announce.receiver).each(function(i,item){
				recid["id_"+item.receiver_id] = true;
			})
			groupTree.getNodesByFilter(function(node){
				if(recid["id_"+node.id]){
					groupTree.checkNode(node,true,true);
				}
			})
		}
	})

	$('[data-form="select2"]').select2()
	$('[data-form=uniform]').uniform();
	//$('[data-form=wysihtml5]').wysihtml5();

	/*$('#alldep').change(function(){
		var checked = this.checked;

		if(checked){
			$('#group_selector').select2('disabled');
			$('#group_selector').attr('disabled','disabled')
		}else{
			$('#group_selector').removeAttr('disabled')
		}
	})
	*/

	function initEdit(){
		$('#type_selector').select2('val',edit_announce.ann_type);
		$('#notice_title').val(edit_announce.title);
		$('#notice_content').val(edit_announce.content);
	}
	edit_announce&&initEdit();

	function getSelectGroup(){
		var root = groupTree.getNodes()[0];
		var arr = [],id=0;
		function getSelected(pnode){
			if(pnode.checked){
				id = pnode.id == "-1"?0:pnode.id;
				arr.push(id);
			}else{
				if(!pnode.children) return;
				for(var i=0;i<pnode.children.length;i++){
					var child = pnode.children[i];
					if(child.checked){
						arr.push(child.id)
					}else{
						getSelected(child)	
					}
				} 
			}
		}
		getSelected(root);
		return arr;
	}

	$('#btn-publish').click(function(){
		var title = $.trim($('#notice_title').val()),
			content = $.trim($('#notice_content').val()),
			department = getSelectGroup(),
			type = $('[name="type"]').select2('val');
		
		if(!title||!content){
			alert("请输入公告内容和标题");
			return false;
		}

		if(edit_announce){
			jsonReq.post('/open/announce','edit',{
				title : title,
				content : content,
				department : department,
				type : type,
				id:edit_announce.id
			},function(d){
				if(d.result){
					location.href = '/notice/manages'
				}
			})
		}else{
			jsonReq.post('/open/announce','publish',{
				title : title,
				content : content,
				department : department,
				type : type
			},function(d){
				if(d.result){
					location.href = '/notice/list'
				}
			})
		}
	})
})()
