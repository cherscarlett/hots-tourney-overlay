$(document).ready(function() {
	resizeStream();
});
$(window).resize(function(e) {
	resizeStream();
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

function resizeStream(e) {
	var $s = $(".stream"), 
		w = $s.innerWidth(),
		h = w*(9/16);
	$s.css("height", h+"px");
}