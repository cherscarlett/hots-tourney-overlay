$(document).ready(function() {
});
$("a.about").on("click", function(e) {
	$("a.about").after("<div id='about-data'></div>");
	$.get('/about', function(data){
		$("#about-data").html(data);
	});
});
$(".contents").on("click", ".close", function(e) {
	closeWindow(e, this);
});

function closeWindow(e, object) {
	$(object).parent().remove();
}