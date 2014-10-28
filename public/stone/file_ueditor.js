var editor = UE.getEditor('editor');
$(window).resize(function(){
	var width = $('.gallery').width();
	$('.edui-editor,.edui-editor-toolbarboxinner,.edui-editor-iframeholder').width(width)
})